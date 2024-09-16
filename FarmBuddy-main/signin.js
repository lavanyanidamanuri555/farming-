const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");
const userInfoDiv = document.getElementById("user-info");
const userNameSpan = document.getElementById("user-name");
const logoutButton = document.getElementById("logoutButton");

signUpButton.addEventListener("click", function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

signInButton.addEventListener("click", function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

// Show the logged-in user name and logout button
function displayUserInfo(name) {
  userInfoDiv.style.display = "block";
  signInForm.style.display = "none";
  signUpForm.style.display = "none";
  userNameSpan.textContent = `Hello, ${name}`;
}

// Log out and clear localStorage
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("loggedInUserId");
  localStorage.removeItem("userName");
  location.reload();  // Reload to show login form again
});

// On page load, check if the user is already logged in
window.onload = function () {
  const userName = localStorage.getItem("userName");
  if (userName) {
    displayUserInfo(userName);
  }
};
