// togel class acvtie
const navbarNav = document.querySelector(".navbar-nav");
// ketika humberger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
// togle shopping
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// klik luar
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// togle search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// modal box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// klik close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// diluar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

const form = document.querySelector("#contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nama: document.querySelector("#nama").value,
    email: document.querySelector("#email").value,
    nohp: document.querySelector("#nohp").value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbw4Z1uGI7mjrmmUgXaGlMuZiNMYLMXTiNr-pXoCCdTrJW-Wbbm_7aEWBAa4d4xn4LIS/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  )
    .then((res) => res.json())
    .then((res) => {
      alert("Pesan berhasil dikirim 👍");
      form.reset();
    })
    .catch(() => {
      alert("Gagal mengirim data ❌");
    });
});
