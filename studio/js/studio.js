const gallery = document.querySelector(".showcase");
const wrapper = document.querySelector(".showcase-wrapper");

if (gallery && wrapper) {
  const motion = {
    current: 0,
    target: 0,
    max: 0,
    ease: 0.025,
    raf: null,
    isDesktop: window.matchMedia("(min-width: 801px)").matches,
  };

  const articles = gsap.utils.toArray(".showcase article");
  // const parallaxItems = gsap.utils.toArray("[data-parallax-speed]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /* function normalizeWheelDelta(event) {
    const axisDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      return axisDelta * 18;
    }

    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      return axisDelta * window.innerHeight;
    }

    return axisDelta;
  } */

  function setTarget(value) {
    motion.target = clamp(value, -motion.max, 0);
  }

  function measure() {
    motion.max = Math.max(0, gallery.scrollWidth - wrapper.clientWidth);
    setTarget(motion.target);
    motion.current = clamp(motion.current, -motion.max, 0);
  }

  function revealVisibleArticles() {
    const wrapperRect = wrapper.getBoundingClientRect();

    articles.forEach((article) => {
      if (article.dataset.revealed === "true") {
        return;
      }

      const rect = article.getBoundingClientRect();
      const isVisible =
        rect.right > wrapperRect.left + wrapperRect.width * 0.12 &&
        rect.left < wrapperRect.right - wrapperRect.width * 0.12;

      if (!isVisible) {
        return;
      }

      article.dataset.revealed = "true";
      // articles.forEach((article) => {
        gsap.to(article.querySelectorAll(".small-image img, .image-card img, .team-card img"), {
          x: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.2,
          duration: 3.2,
          ease: "power3.out",
        });
      // });
      /* gsap.to(article.querySelectorAll(".product-image, .product-details"), {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      }); */
    });
  }

  function render() {
    const ease = prefersReducedMotion.matches ? 1 : motion.ease;
    motion.current += (motion.target - motion.current) * ease;

    if (Math.abs(motion.target - motion.current) < 0.08) {
      motion.current = motion.target;
    }

    gsap.set(gallery, { x: motion.current });
    revealVisibleArticles();

    motion.raf = requestAnimationFrame(render);
  }

  function start() {
    if (motion.raf) {
      return;
    }

    render();
  }

  function stop() {
    if (!motion.raf) {
      return;
    }

    cancelAnimationFrame(motion.raf);
    motion.raf = null;
  }

  function enableDesktop() {
    motion.isDesktop = true;
    document.documentElement.classList.add("project-horizontal-scroll");
    measure();
    start();
  }

  function disableDesktop() {
    motion.isDesktop = false;
    document.documentElement.classList.remove("project-horizontal-scroll");
    stop();
    motion.current = 0;
    motion.target = 0;
    gsap.set(gallery, { clearProps: "transform" });
    // gsap.set(parallaxItems, { clearProps: "transform" });
    /* gsap.set(gallery.querySelectorAll(".product-image, .product-details"), {
      clearProps: "transform,opacity",
    }); */
    articles.forEach((article) => {
      article.dataset.revealed = "true";
    });
  }

  function initRevealState() {
    if (prefersReducedMotion.matches) {
      return;
    }
    // console.log('initRevealState');
    gsap.set(articles.flatMap((article) => Array.from(article.querySelectorAll(".small-image img, .image-card img, .team-card img"))), { x: -10, opacity: 0, skewX: 1.2 });

    /* articles.forEach((article) => {
      gsap.to(article.querySelectorAll(".small-image, .image-card"), {
        x: 0,
        opacity: 1,
        // skewX: 1.2,
      });
    }); */
  }

  async function waitForImages() {
    const images = Array.from(gallery.querySelectorAll("img"));
    await Promise.all(
      images.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  }

  
  let isScrolling = false;
  window.addEventListener(
  "wheel",
  (event) => {
    if (!motion.isDesktop || motion.max <= 0 || isScrolling) {
      return;
    }

    event.preventDefault();

    isScrolling = true;

    const step = wrapper.clientWidth; // screen width

    if (event.deltaY > 0 || event.deltaX > 0) {
      setTarget(motion.target - step);
    } else {
      setTarget(motion.target + step);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 700);
  },
  { passive: false }
);

  let pointerStartX = 0;
  let pointerLastX = 0;
  let isDragging = false;

  window.addEventListener(
    "pointerdown",
    (event) => {
      if (!motion.isDesktop || event.pointerType === "mouse") {
        return;
      }

      isDragging = true;
      pointerStartX = event.clientX;
      pointerLastX = event.clientX;
    },
    { passive: true },
  );

  window.addEventListener(
    "pointermove",
    (event) => {
      if (!isDragging || !motion.isDesktop) {
        return;
      }

      const delta = event.clientX - pointerLastX;
      pointerLastX = event.clientX;
      setTarget(motion.target + delta * 1.35);

      if (Math.abs(event.clientX - pointerStartX) > 4) {
        event.preventDefault();
      }
    },
    { passive: false },
  );

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });

  window.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  window.addEventListener("keydown", (event) => {
    if (!motion.isDesktop) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      setTarget(motion.target - wrapper.clientWidth * 0.7);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      setTarget(motion.target + wrapper.clientWidth * 0.7);
    }
  });

  function nextSlide(slideNumber) {
    const targetArticle = document.querySelector(`.showcase article:nth-child(${slideNumber})`);
    // console.log('Next slide:', slideNumber, targetArticle);
    if (targetArticle) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const targetRect = targetArticle.getBoundingClientRect();
      const offset = targetRect.left - wrapperRect.left;
      console.log('wrapper', wrapperRect.left, 'target', targetRect.left, 'Offset:', offset);
      setTarget(motion.target + offset);
    }
  }
  
  const resizeObserver = new ResizeObserver(() => {
    measure();
  });

  resizeObserver.observe(gallery);
  resizeObserver.observe(wrapper);

  const mediaQuery = window.matchMedia("(min-width: 801px)");

  mediaQuery.addEventListener("change", (event) => {
    if (event.matches) {
      articles.forEach((article) => {
        article.dataset.revealed = "false";
      });
      initRevealState();
      enableDesktop();
    } else {
      disableDesktop();
    }
  });

  if (mediaQuery.matches) {
    initRevealState();
  }
  waitForImages().then(() => {
    requestAnimationFrame(() => {
      if (mediaQuery.matches) {
        enableDesktop();
      } else {
        disableDesktop();
        revealVisibleArticles();
      }
    });
  });
}

