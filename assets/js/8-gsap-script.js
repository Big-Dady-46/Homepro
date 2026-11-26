(function ($) {
  "use strict";

  // Register GSAP Plugins safely
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. GSAP Animations Function
  const gsapanim = function () {
    // SVG Animation
    document.querySelectorAll(".svg-animate").forEach((box) => {
      const paths = box.querySelectorAll("path");

      paths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          visibility: "visible",
          opacity: 1,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // SplitType - Themeht Anim Text
    if (typeof SplitType !== "undefined") {
      const splitTypes = document.querySelectorAll(".faltu-anim-text");
      splitTypes.forEach((element) => {
        const splitText = new SplitType(element, { types: "chars, words" });

        gsap.from(splitText.chars, {
          opacity: 0.2,
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top -10%",
            scrub: true,
          },
        });
      });

      // SplitType - Text Anime Style
      const textAnimeElements = document.querySelectorAll(".text-anime-style");
      if (textAnimeElements.length > 0) {
        textAnimeElements.forEach((el) => {
          const split = new SplitType(el, { types: "words" });

          if (split.words && split.words.length > 0) {
            gsap.from(split.words, {
              clipPath: "inset(0 100% 0 0)",
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      }
    }

    // BG GSAP Animation
    if (document.querySelector(".bg-gsap")) {
      gsap.to(".bg-gsap", {
        backgroundPosition: "center 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".bg-gsap",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Slide Left/Right Animation
    gsap.utils.toArray([".slide-left", ".slide-right"]).forEach((elem) => {
      if (elem) {
        gsap.fromTo(
          elem,
          { x: elem.classList.contains("slide-left") ? -100 : 100 },
          {
            x: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      }
    });

    // Title Icon Rotation
    if (document.querySelector(".title-icon")) {
      gsap.to(".title-icon", {
        rotation: 720,
        duration: 10,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }
  };

  // 2. Lenis Smooth Scroll Setup
  const initLenis = () => {
    if (typeof Lenis !== "undefined" && window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  };

  // 3. Header & Breadcrumb Dynamic Classes Setup
  const setupHeaderClasses = () => {
    const body = document.body;
    const headerDiv = document.querySelector("#masthead div.header");

    if (headerDiv) {
      headerDiv.classList.forEach((cls) => {
        if (cls.startsWith("header-")) {
          body.classList.add(cls);
        }
      });
    }

    const headerClasses = ["header-2", "header-3", "header-4", "header-5"];
    headerClasses.forEach((hClass) => {
      if (body.classList.contains(hClass)) {
        body.classList.add("breadcrumb-" + hClass.split("-")[1]);
      }
    });
  };

  // Initialization on DOM Ready
  $(function () {
    setupHeaderClasses();
    gsapanim();
    initLenis();
  });

  // Elementor Frontend Hooks Support
  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/title.default", gsapanim);
    elementorFrontend.hooks.addAction("frontend/element_ready/feature.default", gsapanim);
    elementorFrontend.hooks.addAction("frontend/element_ready/ht-anim-title.default", gsapanim);
    elementorFrontend.hooks.addAction("frontend/element_ready/image.default", gsapanim);
  });
})(jQuery);