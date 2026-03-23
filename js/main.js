window.addEventListener("load", function () {
  //Preloader
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    preventDefault: true,
  });
  
});