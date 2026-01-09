const categories = ['Exam', 'Event', 'Announcement', 'Holiday'];
    let allNotices = [];
    let selectedFilters = {
      category: 'All',
      faculty: 'All',
      semester: 'All'
    };

    function formatDateTime(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
      return date.toLocaleString('en-US', options);
    }

    // Initialize page
    document.addEventListener('DOMContentLoaded', () => {
      checkAuth('student');
      displayUserInfo();
      initializeCategoryFilter();
      loadNotices();
      setupEventListeners();
    });

    function displayUserInfo() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      document.getElementById('userName').textContent = user.fullName || 'Student';
    }

    function initializeCategoryFilter() {
      const filterDiv = document.getElementById('categoryFilter');
      let html = '<button class="category-btn active" onclick="filterByCategory(\'All\')">All</button>';
      
      categories.forEach(cat => {
        html += `<button class="category-btn" onclick="filterByCategory('${cat}')">${cat}</button>`;
      });
      
      filterDiv.innerHTML = html;
    }

    function filterByCategory(category) {
      selectedFilters.category = category;
      
      // Update button states
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      event.target.classList.add('active');
      
      displayNotices();
    }

    function setupEventListeners() {
      document.getElementById('facultyFilter').addEventListener('change', (e) => {
        selectedFilters.faculty = e.target.value;
        displayNotices();
      });

      document.getElementById('semesterFilter').addEventListener('change', (e) => {
        selectedFilters.semester = e.target.value;
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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userSemester = user.semester || '';

      const filtered = allNotices.filter(notice => {
        const categoryMatch = selectedFilters.category === 'All' || notice.category === selectedFilters.category;
        const facultyMatch = selectedFilters.faculty === 'All' || notice.faculty === 'All' || notice.faculty === selectedFilters.faculty;
        const semesterMatch = selectedFilters.semester === 'All' || notice.semester === 'All' || notice.semester === selectedFilters.semester;
        
        return categoryMatch && facultyMatch && semesterMatch;
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
              <button class="btn-view" onclick="viewNotice(${notice.id})">View Details</button>
            </div>
          </div>
        `).join('');
      }
    }

    function viewNotice(id) {
      const notice = allNotices.find(n => parseInt(n.id) === parseInt(id));
      if (!notice) {
        console.error('Notice not found:', id);
        return;
      }

      document.getElementById('modalTitle').textContent = notice.title;
      document.getElementById('modalBody').innerHTML = `
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
      const modal = document.getElementById('viewModal');
      if (e.target === modal) {
        closeModal('viewModal');
      }
    });