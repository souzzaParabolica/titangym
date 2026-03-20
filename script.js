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

// Carousel for hero section (Mobile Only) - Dots only version
let heroCurrent = 0;
let heroSlides = [];
let heroInterval = null;
function showHeroSlide(idx) {
  heroSlides.forEach((el, i) => {
    if (i === idx) {
      el.style.opacity = "1";
      el.style.zIndex = "2";
      el.style.pointerEvents = "auto";
    } else {
      el.style.opacity = "0";
      el.style.zIndex = "1";
      el.style.pointerEvents = "none";
    }
  });
  // update dots
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, i) => {
    dot.style.opacity = idx === i ? "0.8" : "0.3";
  });
}
function nextHeroSlide() {
  heroCurrent = (heroCurrent + 1) % heroSlides.length;
  showHeroSlide(heroCurrent);
}
window.goToHeroCarouselSlide = function (idx) {
  clearInterval(heroInterval);
  heroCurrent = idx;
  showHeroSlide(heroCurrent);
  restartHeroCarouselInterval();
};
function restartHeroCarouselInterval() {
  heroInterval = setInterval(nextHeroSlide, 3500);
}
// Touch swipe support
document.addEventListener("DOMContentLoaded", () => {
  heroSlides = Array.from(document.querySelectorAll(".hero-carousel-slide"));
  showHeroSlide(heroCurrent);

  // Swipe/touch for mobile
  let touchStartX = null;
  const wrapper = document.querySelector(".md\\:hidden .w-full");
  if (wrapper) {
    wrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    wrapper.addEventListener("touchend", (e) => {
      if (touchStartX !== null) {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 40) {
          // Only dots visible, so swipe advances
          heroCurrent =
            (heroCurrent + (diff < 0 ? 1 : -1) + heroSlides.length) %
            heroSlides.length;
          showHeroSlide(heroCurrent);
          clearInterval(heroInterval);
          restartHeroCarouselInterval();
        }
        touchStartX = null;
      }
    });
  }
  // autoplay
  heroInterval = setInterval(nextHeroSlide, 3500);
});

// Menu toggle logic
const menuBtn = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById("navbar-menu");
function closeMenu() {
  navbarMenu.classList.add("-translate-x-full");
}
function openMenu() {
  navbarMenu.classList.remove("-translate-x-full");
}
menuBtn.addEventListener("click", function () {
  if (navbarMenu.classList.contains("-translate-x-full")) {
    openMenu();
  } else {
    closeMenu();
  }
});
// Close menu on link click (mobile only)
document.querySelectorAll("#navbar-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) closeMenu();
  });
});
// Ensure menu closes on screen resize to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navbarMenu.classList.remove("-translate-x-full");
  } else {
    closeMenu();
  }
});
// Start closed on page load if mobile
if (window.innerWidth < 768) closeMenu();
