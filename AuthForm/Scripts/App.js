// Get the elements for switching between Register and Login forms
const switchFrom = document.getElementById("SwitchForm");
const loginSwitchForm = document.getElementById("LoginSwitchForm");

// Event listener to switch from Register to Login form
switchFrom.addEventListener("click", () => {
  document.getElementById("regform").style.display = "none";

  document.getElementById("loginform").style.display = "block";
});

// Event listener to switch from Login to Register form
loginSwitchForm.addEventListener("click", () => {
  document.getElementById("regform").style.display = "block";

  document.getElementById("loginform").style.display = "none";
});

// Get the registration form element
const form = document.getElementById("form");

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  // Get input values from the registration form
  const firstname = document.getElementById("firs_name").value;

  const lastname = document.getElementById("last_name").value;

  const emailInput = document.getElementById("email");

  const password = document.getElementById("password").value;

  const conPasswordInput = document.getElementById("confirm_password");

  const conPassword = conPasswordInput.value;

  const emailError = document.querySelector(".email-error");

  conPasswordInput.addEventListener("input", () => {
    if (conPasswordInput.value === "") {
      document.querySelector(".error").innerHTML = "Confirm password";
      document.querySelector(".error").style.color = "";
    } else {
      document.querySelector(".error").innerHTML = "Confirm password";
      document.querySelector(".error").style.color = "green";
    }
  });

  // Validate if passwords match
  if (password !== conPassword) {
    conPasswordInput.focus(); // Focus on the confirm password field
    document.querySelector(".error").innerHTML = "Password doesn't match";
    document.querySelector(".error").style.color = "red";

    // Add shake animation to the confirm password field
    conPasswordInput.classList.add("shake");
    setTimeout(() => conPasswordInput.classList.remove("shake"), 300);
    return;
  }

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!Array.isArray(users)) {
    users = [];
  }

  // Check if the email already exists
  const existingUser = users.find((user) => user.email === emailInput.value);
  // Reset error message when the user starts typing (Move this outside)
  emailInput.addEventListener("input", () => {
    if (emailInput.value === "") {
      emailError.innerHTML = "Email"; // Reset to default
      emailError.style.color = ""; // Reset color
    } else {
      emailError.innerHTML = "Email"; // Reset to default
      emailError.style.color = "green"; // Reset color
    }
  });

  // Check if the email already exists
  if (existingUser) {
    emailInput.focus(); // Focus on the email field
    emailInput.classList.add("shake");
    emailError.innerHTML = "Email already exists";
    emailError.style.color = "red";

    setTimeout(() => emailInput.classList.remove("shake"), 300);

    return;
  }

  // Create an object with form data
  const newUser = {
    firstname,
    lastname,
    email: emailInput.value,
    password, // ⚠️ In production, store hashed passwords!
  };

  // Add the new user to the array
  users.push(newUser);

  // Save updated user data back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Success Message with SweetAlert
  Swal.fire({
    icon: "success",
    title: "Registration Successful!",
    text: "You can now log in.",
    confirmButtonText: "OK",
  }).then(() => {
    // Reset form fields
    form.reset();
    // Hide the registration form and show the login form
    document.getElementById("regform").style.display = "none";
    document.getElementById("loginform").style.display = "block";
  });
});

// Get the login form element
const loginForm = document.getElementById("login-form");

// Event listener for form submission
loginForm.addEventListener("submit", (e) => {
  // Prevent form from refreshing the page
  e.preventDefault();
  const loginemail = document.getElementById("Login-email").value;

  const loginpassword = document.getElementById("Login-password").value;

  const loginError = document.getElementById("login-error");

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email and password match
  const user = users.find(
    (user) => user.email === loginemail && user.password === loginpassword
  );
  if (user) {
    localStorage.setItem("isAuthenticated", "true");
    // Store only the logged-in user's name
    localStorage.setItem("userName", user.firstname);

    window.location.href = "/Routs/Dashboard.html";
    loginForm.reset();
  } else {
    loginError.classList.add("shake");

    loginError.style.display = "block";
    loginForm.reset();

    setTimeout(function () {
      loginError.style.display = "none";

      loginError.classList.remove("shake");
    }, 3000);
  }
});
