const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("cnfrm-pass");
const errorMessages = document.querySelectorAll(".error");
const form = document.getElementById("my-form")

nameInput.addEventListener("input", function () {
  let inputVal = nameInput.value.trim();
  let nameRegExp = /^[a-zA-Z ]{3,}$/;
  if (!nameRegExp.test(inputVal)) {
    errorMessages[0].textContent =
      "Name must be at least 3 letters and only alphabets.";
  } else {
    errorMessages[0].textContent = "";
  }
});

emailInput.addEventListener("input", function () {
  let inputVal = emailInput.value;
  let emailRegExp = /^\S+@\S+\.\S+$/;

  if (!emailRegExp.test(inputVal)) {
    errorMessages[1].textContent =
      "Your email must follow this structure:- username@domain.extension";
  } else {
    errorMessages[1].textContent = "";
  }
});

passwordInput.addEventListener("input", function () {
  const inputVal = passwordInput.value;
  let message = "";

  if (inputVal.length < 8) {
    message += "• At least 8 characters long\n";
  }
  if (!/[A-Z]/.test(inputVal)) {
    message += "• Include a capital letter\n";
  }
  if (!/\d/.test(inputVal)) {
    message += "• Include at least one number\n";
  }
  if (!/[^a-zA-Z0-9]/.test(inputVal)) {
    message += "• Include at least one special character\n";
  }

  if (message !== "") {
    errorMessages[2].textContent = message;
  } else {
    errorMessages[2].textContent = "";
  }
});

confirmPasswordInput.addEventListener("input", function () {
  const confirmPass = confirmPasswordInput.value;
  const originalPass = passwordInput.value;

  if (confirmPass !== originalPass) {
    errorMessages[3].textContent = "Password do not match!";
  } else {
    errorMessages[3].textContent = "";
  }
});

form.addEventListener("submit", function (e) {
  if (
    errorMessages[0].textContent ||
    errorMessages[1].textContent ||
    errorMessages[2].textContent ||
    errorMessages[3].textContent
  ) {
    e.preventDefault(); // Stop form submission
    alert("Please fix the errors before submitting.");
  }
});
