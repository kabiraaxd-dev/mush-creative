
gsap.registerPlugin(SplitText);

// slide1 splitText
var split1 = SplitText.create("#section1 h1", {
  type: "chars",
  mask: "lines",
  autoSplit: true,
});

// slide1 timeline
let tl1 = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

tl1.from(split1.chars, {
  // duration: 0.8,
  y: 50,
  autoAlpha: 0,
  stagger: 0.08,
  onComplete: () => {
    split1.revert();
    // console.info("split1 complete");
  },
});
tl1.from("#section1 .mag-zone", {
  y: 20,
  opacity: 0,
});

// slide 2 animations
var split2 = SplitText.create("#section2 h1", {
  type: "chars",
  mask: "lines",
  autoSplit: true,
});

let tl2 = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

tl2.from("#section2 p", {
  y: 20,
  opacity: 0,
  delay: 1
});
tl2.from(split2.chars, {
  // duration: 0.8,
  y: 50,
  autoAlpha: 0,
  stagger: 0.08,
  onComplete: () => {
    split2.revert();
    // console.info("split2 complete");
  },
});

// slide 3 Animation
let tl3 = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

tl3.from(".gridarticle h4", {
  y: 50,
  opacity: 0,
  delay: 1,
});
tl3.from(".gridarticle p", {
  y: 40,
  opacity: 0,
  stagger: 0.2
})
tl3.from(".gridarticle .webp-image", {
  y: 100,
  opacity: 0,
});


// slide 3 Animation
let tl5 = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

tl5.from(".wall-of-fame h2", {
  y: 50,
  opacity: 0,
  delay: 1,
});
tl5.from(".wall-of-fame p", {
  y: 40,
  opacity: 0,
});
tl5.from(".wall-of-fame .team-card", {
  y: 40,
  opacity: 0,
  stagger: 0.2,
});

// slide 5 animations
var split6 = SplitText.create(".cta-section h2", {
  type: "chars",
  mask: "lines",
  autoSplit: true,
});

let tl6 = gsap.timeline({
  paused: true,
  defaults: {
    ease: "back",
  }
})
  tl6.from(split6.chars, {
    y: 50,
    autoAlpha: 0,
    stagger: 0.08,
    onComplete: () => {
      split6.revert()
    }
  })
  tl6.from(".mag-zone", {
    y: 50,
    opacity: 0,
  });
