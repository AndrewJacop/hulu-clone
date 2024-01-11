// MODEL FOCUS
// const myModal = document.getElementById("loginModel");
// const myInput = document.getElementById("myEmail");

// myModal.addEventListener("shown.bs.modal", () => {
//   myInput.focus();
// });

// VALIDATE FORMS
(function () {
  "use strict";
  const forms = document.querySelectorAll(".requires-validation");
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// CHECK FOR USER INFO ON LOAD
const buttons = [
  document.getElementById("navbar-login-btn"),
  document.getElementById("header-btn-1"),
  document.getElementById("header-btn-2"),
  document.getElementById("header-btn-3"),
  document.getElementById("live-btn"),
];

let myListener;

function refreshFunction() {
  if (localStorage.getItem("isLogged") == "true") {
    buttons.forEach((b) => {
      if (b) {
        b.removeAttribute("data-bs-toggle");
        b.removeAttribute("data-bs-target");
        myListener = b.addEventListener("click", () => {
          location.href = "./main-page.html";
        });
      }
    });
  } else if (localStorage.getItem("isRegistered") == "true") {
    buttons.forEach((b) => {
      if (b) {
        b.removeAttribute("data-bs-target");
        b.setAttribute("data-bs-target", "#loginModal");
      }
    });
  } else {
    buttons.forEach((b) => {
      if (b) {
        b.removeAttribute("data-bs-target");
        b.setAttribute("data-bs-target", "#signUpModal");
      }
    });
  }
}

window.onload = refreshFunction;

// SIGN UP
function signMeUp() {
  console.log("object");
  const sN = document.getElementById("rEmail").value;
  const sP = document.getElementById("rPassword").value;

  localStorage.setItem("r-user", sN);
  localStorage.setItem("r-pass", sP);
  localStorage.setItem("isRegistered", true);

  location.href = "./main-page.html";
}
// SIGN IN
function signMeIn() {
  const lN = document.getElementById("lEmail").value;
  const lP = document.getElementById("lPassword").value;
  const rememberMe = document.getElementById("saveCheck").checked;
  console.log(lN);
  console.log(lP);
  console.log(rememberMe);

  if (
    lN == localStorage.getItem("r-user") &&
    lP == localStorage.getItem("r-pass")
  ) {
    if (rememberMe) {
      localStorage.setItem("l-user", lN);
      localStorage.setItem("l-pass", lP);
      localStorage.setItem("isLogged", true);
    } else {
      sessionStorage.setItem("l-user", lN);
      sessionStorage.setItem("l-pass", lP);
    }

    location.href = "./main-page.html";
  } else {
    alert("Something went Wrong while signing in! Check Your Credentials!");
  }
}
// SIGN OUT
function signMeOut() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem("l-user");
    localStorage.removeItem("l-pass");
    localStorage.setItem("isLogged", false);
    sessionStorage.clear();
    location.href = "./index.html";
  }
}
