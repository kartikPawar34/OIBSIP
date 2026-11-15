function showMessage(text, type) {
  const msgBox = document.getElementById('messageBox');
  if (!msgBox) return;
  msgBox.textContent = text;
  msgBox.className = `message ${type}`;
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!username || !password) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    if (password.length < 8 || !/\d/.test(password)) {
      showMessage('Password must be at least 8 characters long and include at least 1 number.', 'error');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message, 'error');
        return;
      }

      showMessage(data.message, 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } catch (err) {
      showMessage('Server error. Make sure Node server is running.', 'error');
    }
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  fetch('/api/session')
    .then((res) => {
      if (res.ok) window.location.replace('dashboard.html');
    });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
      showMessage('Please enter both username/email and password.', 'error');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message, 'error');
        return;
      }

      window.location.href = 'dashboard.html';
    } catch (err) {
      showMessage('Server error. Make sure Node server is running.', 'error');
    }
  });
}

const dashboardContent = document.getElementById('dashboardContent');
if (dashboardContent) {
  fetch('/api/session')
    .then((res) => {
      if (!res.ok) {
        window.location.replace('index.html');
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (data && data.authenticated) {
        document.getElementById('displayUser').textContent = data.user.username;
        document.getElementById('loginTime').textContent = data.user.loggedInAt;
        dashboardContent.style.display = 'block';
      }
    })
    .catch(() => window.location.replace('index.html'));

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.replace('index.html');
  });
}