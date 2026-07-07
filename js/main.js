window.addEventListener("load", function () {
  // console.log("Window loaded");
  // Preloader
  // const preloader = document.getElementById("preloader");

  /*if (preloader) {
    // fade out using CSS transition, then remove from flow
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 700);
  } */

 // const preloader = document.getElementById("preloader");
 // const preloaderContent = preloader.querySelector(".preloader-content");
 // const preloaderTitle = preloader.querySelector(".preloader-title");
 // const preloaderText = preloader.querySelector(".preloader-text em");
 
 
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
    });
    
function showPreloader() {
  // gsap.registerPlugin(TextPlugin);
  // gsap.set(".preloader-title, .preloader-text", { visibility: "visible" });
  // const preloaderText = preloader.querySelector(".preloader-text em");

  /* let gt = gsap.timeline({ defaults: { duration: 1.2, ease: "power2.out" } })
  .from(".preloader-title", {
    opacity: 0, y: -20
  },
  ).from(
    ".preloader-text", { opacity: 0, y: 20 },
    "-=0.2",
  ) */

  // Animate the preloader content
  /* let pt = gsap
  .timeline({ repeat: -1, defaults: { duration: 1.8, delay: 0.6, ease: "sine.inOut" } })
    .to(preloaderText, {
      text: "OOOOOOOO",
      ease: "sine.inOut",
    })
    .to(preloaderText, {
      text: "OO",
      ease: "sine.inOut",
    }); */
  
}

function setupMediaLoaders() {

  // showPreloader();

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

const MIN_PRELOADER_VISIBLE_MS = 6000;
const preloaderStartTime = Date.now();

function waitForWindowLoad() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      console.log("Window already loaded");
      resolve("true");
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

function doHidePreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.style.display = "none";
    console.log("Preloader hidden");
  }, 700);
}

function hidePreloader() {
  const elapsed = Date.now() - preloaderStartTime;
  const remaining = MIN_PRELOADER_VISIBLE_MS - elapsed;

  if (remaining > 0) {
    setTimeout(doHidePreloader, remaining);
  } else {
    doHidePreloader();
  }
}

const fallback = new Promise((resolve) => {
  setTimeout(resolve, 12000);
});

Promise.race([
  Promise.all([waitForWindowLoad(), waitForFonts(), waitForVideos()]),
  fallback,
])
  .then((value) => {
    console.log("preloader ready", value);
    hidePreloader();
  })
  .catch((error) => {
    console.error("Error during preloader wait:", error);
    hidePreloader();
  });