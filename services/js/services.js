// const gallery = document.querySelector(".showcase");
// const wrapper = document.querySelector(".showcase-wrapper");

gsap.registerPlugin(SplitText);

function slide1anim(device = "desktop") {
  SplitText.create(".services-hd h2", {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        duration: 1,
        yPercent: 100,
        autoAlpha: 0,
        delay: 0.6,
        stagger: 0.25,
        ease: "expo.out",
        onComplete: () => self.revert(), // revert the element to its original (unsplit) state
      });
    },
  });
  /* gsap.from(".services-hd p", {
    opacity: 0,
    y:-20,
    delay: 2,
    ease: "power2.out"
  }); */
  /* if (device == "desktop") {
    gsap.from(".services-hd button", {
      y: 20,
      opacity: 0,
      delay: 4,
    });
  } */ /* else {
    gsap
      .to(".services-hd button", {
        display: "none",
      })
      .from(".scroll-indicator", {
        y: 20,
        opacity: 0,
      });
  } */
}

/* const mm = gsap.matchMedia();

mm.matchMedia("(max-width: 800px)", () => {
  slide1anim("mobile");
})
mm.matchMedia("(min-width:801px)", () => {
  slide1anim("desktop");
}) */