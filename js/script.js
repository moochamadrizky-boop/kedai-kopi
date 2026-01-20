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

  const formData = new URLSearchParams();
  formData.append("nama", document.querySelector("#nama").value);
  formData.append("email", document.querySelector("#email").value);
  formData.append("nohp", document.querySelector("#nohp").value);

  fetch(
    "https://script.google.com/macros/s/AKfycbw5xB3NYyyGZoh6ILSPxMwzebK_FbxkNUq6lt7Tu7v2o7cHLpXRXgaz7j_6Q6GGHjHR/exec",
    {
      method: "POST",
      body: formData,
    },
  )
    .then((res) => res.text())
    .then((res) => {
      if (res.trim() === "success") {
        alert("Pesan berhasil dikirim 👍");
        form.reset();
      } else {
        alert("Gagal menyimpan data ❌");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Koneksi bermasalah ❌");
    });
});
