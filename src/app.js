document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Ikan Tuna Sirip Kuning",
        img: "1.jpg",
        price: 20000,
        description:
          "Ikan Tuna Sirip Kuning adalah salah satu jenis tuna yang terkenal karena dagingnya yang lembut dan kaya akan omega-3. Warna kuning pada siripnya menandakan keunikannya. Cocok untuk berbagai masakan seperti Tuna bakar, steak Tuna, atau Ikan Kuah Kuning",
      },
      {
        id: 2,
        name: "Ikan Selar",
        img: "2.jpg",
        price: 25000,
        description:
          "Ikan Selar adalah ikan kecil yang populer di kalangan masyarakat karena rasanya yang gurih dan teksturnya yang lembut. Biasanya digoreng atau dibakar, ikan ini juga kaya akan protein dan vitamin B12.",
      },
      {
        id: 3,
        name: "Ikan Kerapu",
        img: "3.jpg",
        price: 30000,
        description:
          "Ikan Kerapu dikenal dengan dagingnya yang tebal dan rasa yang lezat. Biasanya digunakan dalam hidangan mewah seperti ikan bakar atau sup ikan. Ikan ini juga kaya akan nutrisi seperti protein, vitamin D, dan kalsium.",
      },
      {
        id: 4,
        name: "Ikan Jerungga",
        img: "4.jpg",
        price: 35000,
        description:
          "Ikan Jerungga adalah jenis ikan yang memiliki daging putih dan lembut. Rasanya yang manis dan teksturnya yang halus membuatnya cocok untuk dikukus atau dibuat menjadi kari ikan. Ikan ini juga mengandung banyak omega-3 dan vitamin E.",
      },
      {
        id: 5,
        name: "Ikan Neon Tetra",
        img: "5.jpg",
        price: 40000,
        description:
          "Ikan Neon Tetra adalah ikan kecil yang populer di kalangan masyarakat karena rasanya yang gurih dan teksturnya yang lembut. Biasanya digoreng atau dibakar, ikan ini juga kaya akan protein dan vitamin B12.",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika kalau barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;

            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;

            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true; // Menonaktifkan tombol saat halaman dimuat

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let allFilled = true; // Variabel untuk melacak apakah semua elemen terisi

  for (let i = 0; i < form.elements.length; i++) {
    if (
      form.elements[i].value.length === 0 &&
      form.elements[i].type !== "hidden"
    ) {
      // Jika ada elemen yang kosong
      allFilled = false; // Set variabel menjadi false
      break; // Keluar dari loop
    }
  }

  if (allFilled) {
    checkoutButton.disabled = false; // Mengaktifkan tombol jika semua elemen terisi
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true; // Menonaktifkan tombol jika ada elemen yang kosong
    checkoutButton.classList.add("disabled");
  }
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // console.log("Data form:", objData);
  const message = formatMessage(objData);
  window.open("http://wa.me/6281247768431?text=" + encodeURIComponent(message));
});

// format pesan whatshapp
const formatMessage = (obj) => {
  const items = JSON.parse(obj.items)
    .map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)
    .join("");
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
  Data Pesanan
  ${items}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.
  `;
};

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
