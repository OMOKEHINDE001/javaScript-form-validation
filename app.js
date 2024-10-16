const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

// add a submit event listener on the form
// prevent the default behaviour
// event propagation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkInputs() {
  const usernameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const captchaValue = captcha.value.trim();
  //   console.log(
  //     usernameValue,
  //     emailValue,
  //     passwordValue,
  //     password2Value,
  //     captchaValue
  //   );

  //validate the username ( empty fields, min length is 5)
  if (usernameValue === "") {
    //username is required
    setError(userName, "username is required");
  } else if (usernameValue.length < 5) {
    //minimum username length is 5
    setError(userName, "minimum username length is 5");
  } else {
    // success
    setSuccess(userName);
  }

  //validate email (email must not be empty, email must include @)

  if (emailValue === "") {
    //email is required
    setError(email, "email is required");
  } else if (!emailValue.includes("@")) {
    //email must include @
    setError(email, "email must include @");
  } else {
    //success
    setSuccess(email);
  }

  //password must not be empty and the minimum password length is 7

  if (passwordValue === "") {
    //password is required
    setError(password, "password is required");
  } else if (passwordValue.length < 7) {
    //minimum password length is 7
    setError(password, "minimum password length is 7");
  } else {
    // success
    setSuccess(password);
  }

  //

  if (password2Value === "") {
    //password must not be empty
    setError(password2, "password must not be empty");
  } else if (password2Value !== passwordValue) {
    //must be equal
    setError(password2, "confirmation wrong");
  } else {
    //success
    setSuccess(password2);
  }
  console.log(password2Value, passwordValue);

  if (captchaValue === "") {
    setError(captcha, "please kindly fill");
  } else setSuccess(captcha);
}

//select that button using the class show-btn
const btn = document.querySelector(".show-btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputType = password.getAttribute("type");
  if (inputType === "password") {
    password.setAttribute("type", "text");
    btn.value = "Hide";
  } else {
    password.setAttribute("type", "password");
    btn.value = "show";
  }
});

captcha.addEventListener("input", (e) => {
  //select the img
  const img = document.querySelector("img");
  const text = e.target.value;
  const blurValue = 20 - text.length;
  //blur(blury)px
  img.style.filter = `blur(${blurValue}px)`;

  if (blurValue < -0) {
    setSuccess(captcha);
  } else {
    setError(captcha, "Text is not long enough");
  }
});
