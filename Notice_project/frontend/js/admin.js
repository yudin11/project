let allNotices = [];
    let editingNoticeId = null;
    let selectedFilters = {
      faculty: 'All',
      semester: 'All',
      category: 'All'
    };

    function formatDateTime(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
      return date.toLocaleString('en-US', options);
    }

    // Initialize page
    document.addEventListener('DOMContentLoaded', () => {
      checkAuth('admin');
      displayUserInfo();
      loadNotices();
      setupEventListeners();
    });

    function displayUserInfo() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      document.getElementById('userName').textContent = user.fullName || 'Admin';
    }

    function setupEventListeners() {
      document.getElementById('noticeForm').addEventListener('submit', saveNotice);
      
      document.getElementById('facultyFilter').addEventListener('change', (e) => {
        selectedFilters.faculty = e.target.value;
        displayNotices();
      });

      document.getElementById('semesterFilter').addEventListener('change', (e) => {
        selectedFilters.semester = e.target.value;
        displayNotices();
      });

      document.getElementById('categoryFilter').addEventListener('change', (e) => {
        selectedFilters.category = e.target.value;
        displayNotices();
      });
    }

    async function loadNotices() {
      try {
        const response = await fetch('../backend/get-notices.php');
        const data = await response.json();
        
        if (data.success) {
          allNotices = data.notices;
          displayNotices();
        }
      } catch (error) {
        console.error('Error loading notices:', error);
      }
    }

    function displayNotices() {
      const filtered = allNotices.filter(notice => {
        const facultyMatch = selectedFilters.faculty === 'All' || notice.faculty === selectedFilters.faculty;
        const semesterMatch = selectedFilters.semester === 'All' || notice.semester === selectedFilters.semester;
        const categoryMatch = selectedFilters.category === 'All' || notice.category === selectedFilters.category;
        
        return facultyMatch && semesterMatch && categoryMatch;
      });

      const grid = document.getElementById('noticesGrid');
      const emptyState = document.getElementById('emptyState');

      if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        grid.innerHTML = filtered.map(notice => `
          <div class="notice-card">
            <div class="notice-header">
              <h3 class="notice-title">${notice.title}</h3>
              <span class="notice-badge badge-${notice.category.toLowerCase()}">${notice.category}</span>
            </div>
            <div class="notice-meta">
              <span> ${formatDateTime(notice.date)}</span>
              <span> ${notice.faculty}</span>
              <span> ${notice.semester}</span>
            </div>
            <p class="notice-content">${notice.content}</p>
            <div class="notice-actions">
              <button class="btn-view" onclick="viewNotice(${notice.id})">View</button>
              <button class="btn-edit" onclick="editNotice(${notice.id})">Edit</button>
              <button class="btn-delete" onclick="deleteNotice(${notice.id})">Delete</button>
            </div>
          </div>
        `).join('');
      }
    }

    function openAddModal() {
      editingNoticeId = null;
      document.getElementById('modalTitle').textContent = 'Add New Notice';
      document.getElementById('noticeForm').reset();
      openModal('noticeModal');
    }

    function viewNotice(id) {
      const notice = allNotices.find(n => parseInt(n.id) === parseInt(id));
      if (!notice) {
        console.error('Notice not found:', id);
        return;
      }

      document.getElementById('viewModalTitle').textContent = notice.title;
      document.getElementById('viewModalBody').innerHTML = `
        <div>
          <div style="margin-bottom: 15px;">
            <span class="notice-badge badge-${notice.category.toLowerCase()}">${notice.category}</span>
          </div>
          <div class="notice-meta" style="margin-bottom: 15px;">
            <span> <strong>${formatDateTime(notice.date)}</strong></span>
            <span> <strong>${notice.faculty}</strong></span>
            <span> <strong>${notice.semester}</strong></span>
          </div>
          <div style="line-height: 1.6; color: #555;">
            ${notice.content}
          </div>
        </div>
      `;
      
      openModal('viewModal');
    }

    function editNotice(id) {
      const notice = allNotices.find(n => parseInt(n.id) === parseInt(id));
      if (!notice) {
        console.error('Notice not found:', id);
        return;
      }

      editingNoticeId = id;
      document.getElementById('modalTitle').textContent = 'Edit Notice';
      document.getElementById('noticeTitle').value = notice.title;
      document.getElementById('noticeContent').value = notice.content;
      document.getElementById('noticeCategory').value = notice.category;
      document.getElementById('noticeFaculty').value = notice.faculty;
      document.getElementById('noticeSemester').value = notice.semester;
      
      openModal('noticeModal');
    }

    function saveNotice(e) {
      e.preventDefault();

      const title = document.getElementById('noticeTitle').value;
      const content = document.getElementById('noticeContent').value;
      const category = document.getElementById('noticeCategory').value;
      const faculty = document.getElementById('noticeFaculty').value;
      const semester = document.getElementById('noticeSemester').value;

      const method = editingNoticeId ? 'UPDATE' : 'CREATE';

      try {
        const response = fetch('../backend/manage-notices.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method,
            id: editingNoticeId,
            title,
            content,
            category,
            faculty,
            semester
          })
        });

        response.then(res => res.json()).then(data => {
          if (data.success) {
            closeModal('noticeModal');
            loadNotices();
            alert(editingNoticeId ? 'Notice updated successfully!' : 'Notice created successfully!');
            editingNoticeId = null;
            document.getElementById('noticeForm').reset();
            document.getElementById('modalTitle').textContent = 'Add New Notice';
          } else {
            alert(data.message || 'Failed to save notice');
          }
        }).catch(error => {
          console.error('Error:', error);
          alert('Error saving notice');
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving notice');
      }
    }

    function deleteNotice(id) {
      if (!confirm('Are you sure you want to delete this notice?')) return;

      try {
        const response = fetch('../backend/manage-notices.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method: 'DELETE',
            id
          })
        });

        response.then(res => res.json()).then(data => {
          if (data.success) {
            loadNotices();
            alert('Notice deleted successfully!');
          } else {
            alert(data.message || 'Failed to delete notice');
          }
        }).catch(error => {
          console.error('Error:', error);
          alert('Error deleting notice');
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting notice');
      }
    }

    function logout() {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
      }
    }

    function openModal(modalId) {
      document.getElementById(modalId).classList.add('active');
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('active');
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      const noticeModal = document.getElementById('noticeModal');
      const viewModal = document.getElementById('viewModal');
      
      if (e.target === noticeModal) {
        closeModal('noticeModal');
      }
      if (e.target === viewModal) {
        closeModal('viewModal');
      }
    });