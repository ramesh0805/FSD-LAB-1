const form = document.getElementById("registerForm");
if (form) {
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const strength = document.getElementById("password-strength");
  const message = document.getElementById("message");

  password.addEventListener("input", () => {
    const val = password.value;
    let strengthValue = "";

    if (val.length < 6) {
      strengthValue = "Weak 😟";
      strength.style.color = "red";
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.length >= 8) {
      strengthValue = "Strong 💪";
      strength.style.color = "green";
    } else {
      strengthValue = "Medium 🙂";
      strength.style.color = "orange";
    }

    strength.textContent = "Password Strength: " + strengthValue;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const pass = password.value;
    const conf = confirm.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      message.textContent = "❌ Invalid email format!";
      message.style.color = "red";
      return;
    }

    if (pass !== conf) {
      message.textContent = "❌ Passwords do not match!";
      message.style.color = "red";
      return;
    }

    // Save user data locally
    const userData = { name, email, password: pass };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    message.textContent = "✅ Registration Successful! Redirecting to Login...";
    message.style.color = "green";

    form.reset();
    strength.textContent = "";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}
