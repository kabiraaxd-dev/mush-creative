const gallery = document.querySelector(".showcase");
// const galleryItems = document.querySelectorAll(".showcase article");
const wrapper = document.querySelector(".showcase-wrapper");
const galleryImages = document.querySelectorAll(".showcase img");
const parallaxElements = document.querySelectorAll("[data-parallax-speed]");

let xPos = 0; // Current scroll position
let maxScroll = 0;

function updateMaxScroll() {
  maxScroll = Math.max(0, gallery.scrollWidth - wrapper.clientWidth);
}

function clampPosition() {
  xPos = Math.max(-maxScroll, Math.min(0, xPos));
}

/* function updateParallax() {
  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-parallax-speed")) || 1;
    const parallaxOffset = xPos * speed;
    gsap.set(el, { x: parallaxOffset });
  });
} */

function updateGalleryPosition() {
  clampPosition();
  gsap.set(gallery, { x: xPos });
  // updateParallax();
}

function scrollGallery(delta) {
  xPos += delta;
  clampPosition();
  gsap.to(gallery, { 
    x: xPos, 
    duration: 1, 
    ease: "power2.out",
    // onUpdate: updateParallax
  });
}

// Mouse wheel horizontal scroll
window.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY !== 0) {
      scrollGallery(-e.deltaY); // Invert for natural feel
      e.preventDefault();
    }
  },
  { passive: false },
);

// Touch swipe support
let touchStartX = 0;
window.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
window.addEventListener("touchmove", (e) => {
  let touchDelta = e.touches[0].clientX - touchStartX;
  scrollGallery(touchDelta);
  touchStartX = e.touches[0].clientX;
});

const resizeObserver = new ResizeObserver(() => {
  updateMaxScroll();
  updateGalleryPosition();
});

resizeObserver.observe(gallery);
resizeObserver.observe(wrapper);

function initGallery() {
  updateMaxScroll();
  updateGalleryPosition();
}

function waitForImagesToLoad() {
  return new Promise((resolve) => {
    // Wait for lazy-loaded images (data-src) to be processed
    const checkImages = () => {
      const lazyImages = document.querySelectorAll(".showcase img[data-src]");
      if (lazyImages.length === 0) {
        // All lazy images have been loaded or processed
        resolve();
      } else {
        // Still waiting, check again
        requestAnimationFrame(checkImages);
      }
    };
    checkImages();
  });
}

// Init
initGallery();
window.addEventListener("load", async () => {
  // Wait for lazy-loaded images to start loading
  await waitForImagesToLoad();
  // Then give them time to render with 2 more RAF frames
  requestAnimationFrame(() => requestAnimationFrame(initGallery));
  // Plus a safety timeout
  setTimeout(initGallery, 500);
});
window.addEventListener("resize", initGallery);

// product image Animation
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "article",
    // markers: true,
    // horizontal: true,
    fastScrollEnd: true,
  },
});

gsap.utils.toArray("article").forEach((el, i) => {
  let img = el.querySelector(".product-image");
  let details = el.querySelector(".product-details");
  tl.from(img, {
    x: 60,
    opacity: 0,
    skewX: 2,
    duration: 0.5,
  });
  tl.from(details, {
    x: 60,
    opacity: 0,
    duration: 0.5,
  });
});

// custom cursor figure inside product-image
const productImages = document.querySelectorAll(".cursor-hover");
productImages.forEach((container) => {
  const cursor = document.createElement("figure");
  cursor.textContent = "Discover";
  cursor.className = "cursor-figure";
  container.appendChild(cursor);

  container.addEventListener("mouseenter", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(cursor, { x, y, scale: 1 });
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(cursor, {
      x,
      y,
      duration: 1,
      ease: "back.out(3)",
      // ease: "elastic.out(1,0.2)",
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      opacity: 0,
      scale: 0.85,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
