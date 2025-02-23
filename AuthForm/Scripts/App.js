const switchFrom = document.getElementById("SwitchForm");
const loginSwitchForm = document.getElementById("LoginSwitchForm");

switchFrom.addEventListener("click", () => {
  document.getElementById("regform").style.display = "none";
  document.getElementById("loginform").style.display = "block";
});

loginSwitchForm.addEventListener("click", () => {
  document.getElementById("regform").style.display = "block";
  document.getElementById("loginform").style.display = "none";
});

// Registration form
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firs_name").value;
  const lastname = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const conPasswordInput = document.getElementById("confirm_password");
  const emailInput = document.getElementById("email");
  const conPassword = conPasswordInput.value;

  if (password !== conPassword) {
    // alert("Password doesn't match");
    conPasswordInput.focus();
    document.querySelector(".error").innerHTML = "Password doesn't match";
    document.querySelector(".error").style.color = "red";
    conPasswordInput.classList.add("shake");

    setTimeout(() => conPasswordInput.classList.remove("shake"), 300);
    return;
  }

  const formData = {
    firstname,
    lastname,
    email,
    password,
  };

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    // alert("Email already exists");
    emailInput.focus();
    document.querySelector(".email-error").innerHTML = "Email already exists";
    document.querySelector(".email-error").style.color = "red";
    emailInput.classList.add("shake");

    setTimeout(() => emailInput.classList.remove("shake"), 300);
    return;
    return;
  }

  // Add the new user to the array
  users.push(formData);
  localStorage.setItem("user", JSON.stringify(formData));
  alert("Registration successful!");
  form.reset();
  form.style.display = "none";
  document.getElementById("login-form").style.display = "block";
});
