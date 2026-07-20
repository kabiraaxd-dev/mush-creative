gsap.registerPlugin(SplitText);

let split1 = SplitText.create("#section1 h2", {
  type: "words",
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

tl1.from(split1.words, {
  yPercent: 80,
  autoAlpha: 0,
  stagger: 0.08,
  ease: "expo.out",
  onComplete: () => split1.revert(), // revert the element to its original (unsplit) state
});
tl1.from("#section1 .mag-zone", {
  y: 50,
  opacity: 0,
});

// brand sections
let btl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

function brandAnim(sectionId = 2) { 
  const section = document.querySelector("#"+sectionId)
  const h4 = section.querySelector("h4")
  const pr = section.querySelector("p")
  // const col = section.querySelectorAll(".service-table .col")
  // console.info(section, h4, pr, col)
  
  btl.from(h4, {
    yPercent: 90,
    opacity: 0,
    rotateX: 90,
    delay: 1,
  });
  btl.from(pr, {
    y: 40,
    opacity: 0,
    stagger: 0.2,
  });
  /* btl.from(col, {
    x: 100,
    opacity: 0,
    stagger: 0.1,
  }); */

  btl.play()
}

// logo slide animation
var split5 = SplitText.create(".glob-section h3", {
  type: "words",
  mask: "lines",
  autoSplit: true
});

// logo timeline
let logoTl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "expo.out",
    // ease: "power2.out",
  },
});

logoTl.from(split5.words, {
  yPercent: 80,
  autoAlpha: 0,
  stagger: 0.08,
  onComplete: () => split1.revert(), // revert the element to its original (unsplit) state
});
logoTl.from(".brandlogo img", {
  // y: 50,
  scaleX: 1.25,
  scaleY: 1.1,
  opacity: 0,
  stagger: 0.08,
});


// slide 5 animations
var split6 = SplitText.create(".cta-section h2", {
  type: "chars",
  mask: "lines",
  autoSplit: true,
});

let ctaTl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "back",
  }
})
  ctaTl.from(split6.chars, {
    y: 50,
    autoAlpha: 0,
    stagger: 0.08,
    onComplete: () => {
      split6.revert()
    }
  })
  ctaTl.from(".mag-zone", {
    y: 50,
    opacity: 0,
  });