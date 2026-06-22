const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

menuToggle?.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    navList?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const gallery = document.querySelector(".gallery-frame");
const mainImage = document.querySelector(".gallery-main");
const sideImages = [...document.querySelectorAll(".gallery-side")];
const previousButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");
const galleryBadge = document.querySelector(".gallery-badge");

const galleryItems = [
  { src: "assets/gallery-main.jpg", alt: "Cumpleaños", label: "Cumpleaños" },
  { src: "assets/gallery-1.jpg", alt: "Inspiraciones", label: "Inspiraciones" },
  { src: "assets/gallery-2.jpg", alt: "Inspiraciones", label: "Inspiraciones" },
  { src: "assets/gallery-3.jpg", alt: "Inspiraciones", label: "Inspiraciones" },
  { src: "assets/gallery-4.jpg", alt: "Inspiraciones", label: "Inspiraciones" },
];

let activeGalleryIndex = 0;

function wrapIndex(index) {
  return (index + galleryItems.length) % galleryItems.length;
}

function renderGallery(direction = 0) {
  if (!gallery || !mainImage || sideImages.length === 0) return;

  gallery.classList.add("is-animating");

  window.setTimeout(() => {
    const active = galleryItems[activeGalleryIndex];
    mainImage.src = active.src;
    mainImage.alt = active.alt;
    if (galleryBadge) galleryBadge.textContent = active.label;

    const sideIndexes = [
      wrapIndex(activeGalleryIndex - 2),
      wrapIndex(activeGalleryIndex - 1),
      wrapIndex(activeGalleryIndex + 1),
      wrapIndex(activeGalleryIndex + 2),
    ];

    sideImages.forEach((image, index) => {
      const item = galleryItems[sideIndexes[index]];
      image.src = item.src;
      image.alt = item.alt;
      image.dataset.galleryIndex = String(sideIndexes[index]);
    });

    mainImage.style.transform = `translateX(${direction * 8}px) scale(1.02)`;
    window.setTimeout(() => {
      gallery.classList.remove("is-animating");
      mainImage.style.transform = "";
    }, 80);
  }, 150);
}

previousButton?.addEventListener("click", () => {
  activeGalleryIndex = wrapIndex(activeGalleryIndex - 1);
  renderGallery(-1);
});

nextButton?.addEventListener("click", () => {
  activeGalleryIndex = wrapIndex(activeGalleryIndex + 1);
  renderGallery(1);
});

sideImages.forEach((image) => {
  image.addEventListener("click", () => {
    const nextIndex = Number(image.dataset.galleryIndex);
    if (Number.isNaN(nextIndex)) return;
    const direction = nextIndex > activeGalleryIndex ? 1 : -1;
    activeGalleryIndex = nextIndex;
    renderGallery(direction);
  });
});

renderGallery();
