// password toggle eye icon
function setupPasswordToggles() {
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      const targetSelector = toggleButton.dataset.toggleTarget || toggleButton.getAttribute("toggle");
      const passwordField = document.querySelector(targetSelector);

      if (!passwordField) {
        return;
      }

      const isPasswordHidden = passwordField.type === "password";
      passwordField.type = isPasswordHidden ? "text" : "password";

      toggleButton.classList.toggle("fa-eye-slash", !isPasswordHidden);
      toggleButton.classList.toggle("fa-eye", isPasswordHidden);
    });
  });
}

setupPasswordToggles();


// save user
const USERS_STORAGE_KEY = "users";
const LOGGED_IN_USER_KEY = "loggedInUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function setText(id, message) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = message;
  }
}

// get signup form
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get each field values
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    // get each field errors
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const locationError = document.getElementById("locationError");
    const passwordError = document.getElementById("passwordError");
    const cpassError = document.getElementById("cpassError");

    // set blank errors first
    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    locationError.textContent = "";
    passwordError.textContent = "";
    cpassError.textContent = "";

    let isValid = true;

    // validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const locationRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // name validation
    if (fullname === "" || /\d/.test(fullname)) {
      nameError.textContent = "Enter your name properly";
      isValid = false;
    }
    // email validation
    if (username === "" || !emailRegex.test(username)) {
      emailError.textContent = "Email should be in correct format";
      isValid = false;
    }
    // phone number validation
    if (phone === "" || !phoneRegex.test(phone)) {
      phoneError.textContent = "Must be exactly 10 digits";
      isValid = false;
    }
    // location validation
    if (location === "" || !locationRegex.test(location)) {
      locationError.textContent = "Enter your location properly";
      isValid = false;
    }
    // password validation
    if (password === "" || !passwordRegex.test(password)) {
      passwordError.textContent = "must be at least 8 characters mix of letters and numbers";
      isValid = false;
    }
    // confirm password validation
    if (cpassword !== password) {
      cpassError.textContent = "Passwords must match";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const users = getUsers();
    const userExists = users.find((user) => user.username === username);

    // check email duplication
    if (userExists) {
      setText("emailError", "Email already registered");
      return;
    }

    const newUser = {
      fullname,
      username,
      phone,
      location,
      password
    };

    // add to array
    users.push(newUser);
    saveUsers(users);

    alert("Signup successful!");
    window.location.href = "index.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginUsername").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    setText("loginError", "");

    const users = getUsers();
    const validUser = users.find(
      (user) => user.username === email && user.password === password
    );

    if (!validUser) {
      setText("loginError", "Invalid email or password");
      return;
    }

    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(validUser));
    window.location.href = "landing.html";
  });
}

