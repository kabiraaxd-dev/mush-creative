/* function preloadImages() {
  const images = document.querySelectorAll("img");
  const imagePromises = Array.from(images).map((img) => {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = reject;
      }
    });
  });
  return Promise.allSettled(imagePromises);
} */

// Fallback: hide preloader after 5 seconds if images take too long or fail
/* setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains("hide")) {
    preloader.classList.add("hide");
  }
}, 5000); */

// Wait for FULL page load (not just DOM)
window.addEventListener("load", () => {
  // theme toggle
  
  const toggles = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  
  function swapThemeImages() {
    const imgs = document.querySelectorAll("img[data-theme]");
    imgs.forEach((img) => {
      const temp = img.src;
      img.src = img.dataset.theme;
      img.dataset.theme = temp;
    });
  }
  
  function setTheme(theme, save = false) {
    console.info(...arguments)
    const shouldUseDarkTheme = theme === "dark";
    const isDarkTheme = document.body.classList.contains("dark-theme");
    
    if (shouldUseDarkTheme !== isDarkTheme) {
      document.body.classList.toggle("dark-theme", shouldUseDarkTheme);
      swapThemeImages();
    }
    
    if (save) {
      localStorage.setItem("theme", shouldUseDarkTheme ? "dark" : "light");
    }
  }
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("dark", true);
  }

  if (toggles.length) {
    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-theme")
          ? "light"
          : "dark";
        setTheme(nextTheme, true);
      });
    });
  }

  // console.log("Page fully loaded");
  // console.log("gsap.version:", gsap.version);
  gsap.set(".navbar, .book-appointment-btn", { visibility: "visible" });

  const mm = gsap.matchMedia();

  // MOBILE
  mm.add("(max-width: 800px)", () => {
    console.log("mobile");

    const menu = document.querySelector(".navbar");
    const openBtn = document.getElementById("open-menu");
    const closeBtn = document.querySelector(".close");

    const menuItems = document.querySelectorAll(".navbar li");
    const socials = document.querySelectorAll(".navbar .socials span");
    const legal = document.querySelectorAll(".legal span");

    gsap.set(menu, { y: "-100%" });

    const tl = gsap.timeline({ paused: true });

    tl.to(menu, {
      y: "0%",
      zIndex: 99,
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.from(
      menuItems,
      {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      },
      "-=0.3",
    );

    tl.from(
      socials,
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.3",
    );

    tl.from(
      legal,
      {
        opacity: 0,
      },
      "-=0.3",
    );

    openBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("menu-open");
      tl.restart();
    });

    function closeMenu() {
      tl.reverse();
      document.body.classList.remove("menu-open");
    }

    closeBtn?.addEventListener("click", closeMenu);

    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  });

  // DESKTOP
  mm.add("(min-width: 801px)", () => {
    console.log("desktop");

    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    gsap.from(".navbar li", {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(".socials span, .legal span", {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      delay: 0.4,
    });
    gsap.from(".book-appointment-btn", {
      opacity: 0,
      y: -100,
      delay: 0.8,
      ease: "power2.out",
    });
  });
});
