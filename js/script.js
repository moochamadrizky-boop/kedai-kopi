// ================= Navbar toggle =================
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// ================= Search toggle =================
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  e.preventDefault();
  searchForm.classList.toggle("active");
  searchBox.focus();
};

// ================= Shopping Cart toggle =================
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartButton = document.querySelector("#shopping-cart-button");
shoppingCartButton.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCart.classList.toggle("active");
});

// ================= Klik di luar untuk close =================
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", (e) => {
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

// ================= Modal produk =================
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "flex";
  };
});

// Close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

// ================= Form kontak =================
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

// ================= Search Function =================
searchBox.addEventListener("input", function () {
  const keyword = searchBox.value.toLowerCase().trim();
  let found = false;

  const menuCards = document.querySelectorAll(".menu-card");
  const productCards = document.querySelectorAll(".products-card");
  const allItems = [...menuCards, ...productCards];

  allItems.forEach((item) => {
    const name = item.dataset.name?.toLowerCase() || "";
    const match = name.includes(keyword);
    item.style.display = match ? "block" : "none";
    if (match) found = true;
  });

  if (keyword && found) {
    const firstMatch = allItems.find((item) => item.style.display === "block");
    firstMatch?.scrollIntoView({ behavior: "smooth" });
  }
});

// ================= Tombol beli hero =================
const waNumber = "6285888602504"; // ganti WA
const buyNowBtn = document.getElementById("buy-now");

buyNowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const product = buyNowBtn.dataset.product || "produk kopi";
  const message = `Halo Ruang Kopi, saya ingin memesan ${product}`;
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// ================= Rating bintang =================
const modalStars = document.querySelectorAll(".modal-star");
const modalRating = document.querySelector(".modal-rating");

modalStars.forEach((star) => {
  star.addEventListener("click", () => {
    const ratingValue = parseInt(star.dataset.value);
    modalRating.setAttribute("data-rating", ratingValue);

    modalStars.forEach((s) => {
      if (parseInt(s.dataset.value) <= ratingValue) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  });
});

// ================= Shopping Cart =================
let cartItems = [];

function renderCart() {
  shoppingCart.innerHTML = "";

  if (cartItems.length === 0) {
    const empty = document.createElement("p");
    empty.innerText = "Keranjang kosong";
    empty.style.padding = "1rem";
    shoppingCart.appendChild(empty);
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.dataset.index = index;
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="item-detail">
        <h3>${item.name}</h3>
        <div class="item-price">${item.price}</div>
      </div>
      <i data-feather="trash-2" class="remove-item"></i>
    `;
    shoppingCart.appendChild(div);
  });

  // Tombol checkout
  const checkoutBtn = document.createElement("button");
  checkoutBtn.classList.add("btn");
  checkoutBtn.style.width = "100%";
  checkoutBtn.style.marginTop = "1rem";
  checkoutBtn.innerText = "Checkout via WhatsApp";
  shoppingCart.appendChild(checkoutBtn);

  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) return alert("Keranjang kosong!");
    let message = "Halo Ruang Kopi, saya ingin memesan:\n";
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} - ${item.price}\n`;
    });
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });

  // Refresh feather icons
  feather.replace();
}

// Tambah item dari produk
document.querySelectorAll(".products-icons a:first-child").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".products-card");
    const name = card.querySelector("h3").innerText;
    const price = card.querySelector(".products-price").innerText;
    const img = card.querySelector("img").src;
    cartItems.push({ name, price, img });
    renderCart();
    shoppingCart.classList.add("active");
  });
});

// Tambah item dari menu
document.querySelectorAll(".menu-card img").forEach((img) => {
  img.addEventListener("click", () => {
    const card = img.closest(".menu-card");
    const name =
      card.dataset.name || card.querySelector(".menu-card-title").innerText;
    const price = card.querySelector(".menu-card-price").innerText;
    const imgSrc = card.querySelector("img").src;
    cartItems.push({ name, price, img: imgSrc });
    renderCart();
    shoppingCart.classList.add("active");
  });
});

// Hapus item (delegasi)
shoppingCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = parseInt(e.target.closest(".cart-item").dataset.index);
    cartItems.splice(index, 1);
    renderCart();
  }
});
