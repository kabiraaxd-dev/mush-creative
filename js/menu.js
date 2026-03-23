// Wait for FULL page load (not just DOM)
window.addEventListener("load", () => {
  if (!window.gsap) {
    console.error("GSAP not loaded");
    return;
  }
  // theme toggle
  const toggles = document.querySelectorAll(".theme-toggle");

  if (toggles.length) {
    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const imgs = document.querySelectorAll("img[data-theme]");
        imgs.forEach((img) => {
          const temp = img.src;
          img.src = img.dataset.theme;
          img.dataset.theme = temp;
        });
      });
    });
  }
  /* document.querySelectorAll("#theme-toggle").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // console.log("Theme toggle clicked", event.target);

      document.body.classList.toggle("dark-theme");

      const imgs = document.querySelectorAll("img[data-theme]");
      imgs.forEach((img) => {
        const temp = img.src;
        img.src = img.dataset.theme;
        img.dataset.theme = temp;
      });
    });
  }); */

  console.log("Page fully loaded");
  console.log("gsap.version:", gsap.version);
  gsap.set(".navbar", { visibility: "visible" });

  const mm = gsap.matchMedia();

  // MOBILE
  mm.add("(max-width: 767px)", () => {
    console.log("mobile");

    const menu = document.querySelector(".navbar");
    const openBtn = document.getElementById("open-menu");
    const closeBtn = document.querySelector(".close");

    const menuItems = document.querySelectorAll(".navbar li");
    const socials = document.querySelectorAll(".socials span");
    const legal = document.querySelectorAll(".legal span");

    gsap.set(menu, { y: "-100%" });

    const tl = gsap.timeline({ paused: true });

    tl.to(menu, {
      y: "0%",
      zIndex: 49,
      duration: 0.6,
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

    openBtn?.addEventListener("click", () => {
      document.body.classList.add("menu-open");
      tl.play();
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
  mm.add("(min-width: 768px)", () => {
    console.log("desktop");

    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
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
  });
});
