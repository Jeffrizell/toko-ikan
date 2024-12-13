// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
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

// Modal Box
window.onclick = function () {
  const itemDetailModal = document.querySelector("#item-detail-modal");
  const itemDetailButtons = document.querySelectorAll(".item-detail-button");

  // itemDetailButtons.forEach((button) => {
  //   button.onclick = (e) => {
  //     itemDetailModal.style.display = "flex";
  //     e.preventDefault();
  //   };
  // });

  // Event listener untuk setiap tombol detail item
  itemDetailButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const productCard = button.closest(".product-card");

      // Ambil data dari elemen product-card
      const productId = productCard.getAttribute("data-id");
      const productName =
        productCard.getAttribute("data-name") || "Nama tidak tersedia";
      const productImg = productCard.getAttribute("data-img") || "defauld.jpg";
      const productPrice =
        productCard.getAttribute("data-price") || "Harga tidak tersedia";
      const productDescription =
        productCard.getAttribute("data-description") ||
        "Deskripsi tidak tersedia";

      // Update konten modal
      itemDetailModal.querySelector("img").src = `img/products/${productImg}`;
      itemDetailModal.querySelector("h3").textContent = productName;
      itemDetailModal.querySelector(
        ".product-price"
      ).textContent = `IDR ${productPrice}`;
      itemDetailModal.querySelector("p").textContent = productDescription;

      // Tampilkan modal
      itemDetailModal.style.display = "flex";
      event.preventDefault();
    });
  });

  // klik tombol close modal!
  document.querySelector(".modal .close-icon").onclick = (e) => {
    itemDetailModal.style.display = "none";
    e.preventDefault();
  };

  // klik di luar modal!
  window.onclick = (e) => {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
  };
};
