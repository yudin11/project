    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const userType = document.getElementById('userType').value;
      const userId = document.getElementById('userId').value;
      const password = document.getElementById('password').value;
      const messageDiv = document.getElementById('message');

      try {
        const response = await fetch('../backend/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userType, userId, password })
        });

        const data = await response.json();

        if (data.success) {
          messageDiv.className = 'alert alert-success';
          messageDiv.textContent = 'Login successful! Redirecting...';
          messageDiv.style.display = 'block';
          
          setAuthData(data.user, data.token);
          
          setTimeout(() => {
            if (userType === 'student') {
              window.location.href = 'student-dashboard.html';
            } else {
              window.location.href = 'admin-dashboard.html';
            }
          }, 1000);
        } else {
          messageDiv.className = 'alert alert-error';
          messageDiv.textContent = data.message || 'Login failed!';
          messageDiv.style.display = 'block';
        }
      } catch (error) {
        messageDiv.className = 'alert alert-error';
        messageDiv.textContent = 'Error: ' + error.message;
        messageDiv.style.display = 'block';
      }
    });