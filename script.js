// togel class acvtie
const navbarNav = document.querySelector(".navbar-nav");
// ketika humberger di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik luar
const humberger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!humberger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
