// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  const backToTopBtn = document.getElementById("back-to-top");
  
  lenis.on("scroll", (e) => {
    const scroll = e.scroll;
  
    if (scroll > 300) {
      gsap.to(backToTopBtn, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(backToTopBtn, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "none",
      });
    }
  });
  
  backToTopBtn.addEventListener("click", () => {
    lenis.scrollTo(0, {
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  });
  