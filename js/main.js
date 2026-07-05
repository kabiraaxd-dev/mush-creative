// window.addEventListener("load", function () {
  // console.log("Window loaded");
  // Preloader
  /* const preloader = document.getElementById("preloader");
  if (preloader) {
    // fade out using CSS transition, then remove from flow
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 700);
  } */

  /* gsap.registerPlugin(ScrollTrigger);

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
  } */
// });

function setupMediaLoaders() {
  document.querySelectorAll(".media-loader").forEach((wrapper) => {
    const media = wrapper.querySelector("img, video");
    if (!media) return;

    const markLoaded = () => {
      wrapper.classList.add("loaded");
    };

    if (media.tagName === "IMG") {
      if (media.complete) {
        markLoaded();
      } else {
        media.addEventListener("load", markLoaded, { once: true });
        media.addEventListener("error", markLoaded, { once: true });
      }
    }

    if (media.tagName === "VIDEO") {
      if (media.readyState >= 2) {
        markLoaded();
      } else {
        media.addEventListener("loadeddata", markLoaded, { once: true });
        media.addEventListener("canplay", markLoaded, { once: true });
        media.addEventListener("error", markLoaded, { once: true });
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", setupMediaLoaders);

function waitForWindowLoad() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      console.log("Window already loaded");
      resolve();
    } else {
      window.addEventListener("load", resolve, { once: true });
    }
  });
}

function waitForFonts() {
  if (!document.fonts) return Promise.resolve();
  return document.fonts.ready;
}

function waitForVideos() {
  const videos = Array.from(document.querySelectorAll("video"));

  return Promise.allSettled(
    videos.map((video) => {
      return new Promise((resolve) => {
        if (video.readyState >= 3) {
          resolve();
          return;
        }

        const done = () => resolve();

        video.addEventListener("canplay", done, { once: true });
        video.addEventListener("error", done, { once: true });
      });
    }),
  );
}

function hidePreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.style.display = "none";
    console.log("Preloader hidden");
  }, 700);
}

/* Promise.all([waitForWindowLoad(), waitForFonts(), waitForVideos()]).then(
  hidePreloader,
); */

const fallback = new Promise((resolve) => {
  setTimeout(resolve, 8000);
});

Promise.race([
  Promise.all([waitForWindowLoad(), waitForFonts(), waitForVideos()]),
  fallback,
  console.log("Preloader fallback triggered"),
]).then(hidePreloader);