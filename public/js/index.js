import "@babel/polyfill";
import { login, logout, signup } from "./login";
//import { logout } from '../../authController';uploadmeme
import { uploadmeme } from "./upload";
//import { memelikess } from "./memelikes";
//import { memelikess } from "./memelikes";
const loginForm = document.querySelector(".form--login");
const SingupForm = document.querySelector(".form--signup");
const logOutBtn = document.querySelector(".nav__el--logout");
const memegenrator = document.querySelector(".nav__el--meme");
const uploadmemeopen = document.querySelector(".nav__el--uploadmeme");
const uploadform = document.querySelector(".form-user-data");
const memecount = document.querySelector(".nav__el.nav__el--memec");

if (loginForm)
  loginForm.addEventListener("submit", (eve) => {
    eve.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
if (logOutBtn) logOutBtn.addEventListener("click", logout);
if (memegenrator)
  memegenrator.addEventListener("click", () => {
    window.open("https://adityasunny1189.github.io/meme-generator/");
  });
if (uploadmemeopen)
  uploadmemeopen.addEventListener("click", () => {
    window.location = "/upload";
  });
if (SingupForm)
  SingupForm.addEventListener("submit", (eve) => {
    eve.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    signup(name, email, password, passwordConfirm);
  });
if (uploadform)
  uploadform.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("photo", document.getElementById("photo").files[0]);

    uploadmeme(form, "data");
  });
 
//memelikess;