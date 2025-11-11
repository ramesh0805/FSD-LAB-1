// Handle Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (password !== confirmPassword) {
      message.textContent = "❌ Passwords do not match!";
      message.style.color = "red";
      return;
    }

    if (password.length < 6) {
      message.textContent = "❌ Password must be at least 6 characters!";
      message.style.color = "red";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    message.textContent = "✅ Registration successful!";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      message.textContent = "❌ Invalid email or password!";
      message.style.color = "red";
      return;
    }

    message.textContent = "✅ Login successful!";
    message.style.color = "green";
    setTimeout(() => {
      window.location.href = "survey.html";
    }, 1000);
  });
}
