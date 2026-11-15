# Full-Stack Login Authentication System

A secure, full-stack web application featuring user registration, login validation, session management, and a protected dashboard. Built as part of web development training (Task 4).

## Features

- **User Registration**: Register with a unique username/email and a secure password.
- **Password Validation**: Enforces a minimum of 8 characters and at least 1 number during registration.
- **Duplicate Prevention**: Checks for existing users case-insensitively and returns a clear error message.
- **Secure Password Hashing**: Passwords are securely hashed using **`bcryptjs`** before being saved to a JSON store.
- **Login Validation**: Authenticates users and returns generic error messaging on failure to prevent user enumeration.
- **Session Management**: Uses **`express-session`** with HTTP-only cookies to maintain secure server-side sessions.
- **Protected Routes**: The dashboard is restricted and redirects unauthenticated users back to the login page.
- **Logout Functionality**: Safely destroys the session and redirects the user to the login screen.

---

## Tech Stack

- **Backend**: Node.js, Express.js, `express-session`, `bcryptjs`, `fs` (JSON file store)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (`fetch` API)

---

##  Project Structure

```text
WebDev-L2-LoginAuthenticationSystem/
├── Backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── users.json         (Generated automatically on first registration)
└── Frontend/
    ├── dashboard.html
    ├── index.html         (Login page)
    ├── Register.html      (Registration page)
    ├── script.js
    └── style.css