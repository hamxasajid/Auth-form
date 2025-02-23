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

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const conPasswordInput = document.getElementById("confirm_password");

  const emailInput = document.getElementById("email");
  
  const conPassword = conPasswordInput.value;

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

  // Create an object with form data
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
    emailInput.focus(); // Focus on the email field
    document.querySelector(".email-error").innerHTML = "Email already exists";
    document.querySelector(".email-error").style.color = "red";
    
    // Add shake animation to the email field
    emailInput.classList.add("shake");
    setTimeout(() => emailInput.classList.remove("shake"), 300);
    return;
  }

  // Add the new user to the array
  users.push(formData);

  // Save user data to localStorage
  localStorage.setItem("user", JSON.stringify(formData));

  alert("Registration successful!");

  // Reset form fields
  form.reset();

  // Hide the registration form and show the login form
  form.style.display = "none";
  document.getElementById("login-form").style.display = "block";
});
