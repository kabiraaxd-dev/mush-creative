window.addEventListener("load", function () {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }

  gsap.registerPlugin(ScrollTrigger);

  if (typeof ScrollSmoother !== "undefined") {
    gsap.registerPlugin(ScrollSmoother);

    if (document.querySelector("#smooth-wrapper") && document.querySelector("#smooth-content")) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        preventDefault: true,
      });
    }
  }

});