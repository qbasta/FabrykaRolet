import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animateHero(): void {
  const heading = document.querySelector(".hero h1");
  const lead = document.querySelector(".hero__lead");
  if (!heading) return;

  gsap.fromTo(
    [heading, lead].filter(Boolean),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
  );
}

function animateOnScroll(selector: string): void {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  gsap.set(elements, { opacity: 0, y: 24 });
  elements.forEach((el, index) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, delay: (index % 4) * 0.06, ease: "power2.out" }),
    });
  });
}

function init(): void {
  animateHero();
  animateOnScroll(".section-card");
  animateOnScroll(".system-button");
  animateOnScroll(".system-card");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
