import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_INTERACTIVE_SELECTOR =
  ".system-carousel, [data-carousel-prev], [data-carousel-next], [data-carousel-dot], [data-carousel-viewport], a, button, input, label, select, textarea, summary";
let systemsSelectionHashHandler: (() => void) | null = null;

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-nav-menu]");
  if (!toggle || !menu || toggle.dataset.mobileNavInitialized === "true") return;

  toggle.dataset.mobileNavInitialized = "true";

  const openIcon = toggle.querySelector<HTMLElement>("[data-mobile-nav-open-icon]");
  const closeIcon = toggle.querySelector<HTMLElement>("[data-mobile-nav-close-icon]");
  const menuLinks = Array.from(menu.querySelectorAll<HTMLAnchorElement>("[data-mobile-nav-link]"));
  const desktopMedia = window.matchMedia("(min-width: 768px)");
  let isOpen = false;

  const syncState = (): void => {
    menu.classList.toggle("hidden", !isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Zamknij menu główne" : "Otwórz menu główne");
    openIcon?.classList.toggle("hidden", isOpen);
    closeIcon?.classList.toggle("hidden", !isOpen);
  };

  const closeMenu = (restoreFocus = false): void => {
    if (!isOpen) {
      syncState();
      return;
    }

    isOpen = false;
    syncState();

    if (restoreFocus) {
      toggle.focus();
    }
  };

  const toggleMenu = (): void => {
    isOpen = !isOpen;
    syncState();
  };

  toggle.addEventListener("click", () => {
    toggleMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!isOpen || desktopMedia.matches) return;

    const target = event.target as Node | null;
    if (!target || menu.contains(target) || toggle.contains(target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen) return;

    event.preventDefault();
    closeMenu(true);
  });

  const handleViewportChange = (): void => {
    isOpen = false;
    syncState();
  };

  desktopMedia.addEventListener("change", handleViewportChange);
  window.addEventListener("resize", handleViewportChange);

  syncState();
}

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

class SystemCarousel {
  private activeIndex = 0;
  private readonly slides: HTMLElement[];
  private readonly dots: HTMLButtonElement[];
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;
  private readonly viewport: HTMLElement | null;
  private readonly counter: HTMLElement | null;
  private readonly status: HTMLElement | null;
  private readonly systemName: string;

  constructor(private readonly root: HTMLElement) {
    this.slides = Array.from(root.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
    this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]"));
    this.prevButton = root.querySelector<HTMLButtonElement>("[data-carousel-prev]");
    this.nextButton = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
    this.viewport = root.querySelector<HTMLElement>("[data-carousel-viewport]");
    this.counter = root.querySelector<HTMLElement>("[data-carousel-counter]");
    this.status = root.querySelector<HTMLElement>("[data-carousel-status]");
    this.systemName = root.dataset.systemName ?? "systemu";

    if (this.slides.length <= 1) {
      this.update();
      return;
    }

    this.prevButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      this.show(this.activeIndex - 1);
    });

    this.nextButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      this.show(this.activeIndex + 1);
    });

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        this.show(index);
      });
    });

    this.viewport?.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.viewport?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.show(this.activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        this.show(this.activeIndex + 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        this.show(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        this.show(this.slides.length - 1);
      }
    });

    this.update();
  }

  private show(index: number): void {
    const total = this.slides.length;
    this.activeIndex = (index + total) % total;
    this.update();
  }

  private update(): void {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    this.dots.forEach((dot, index) => {
      const isActive = index === this.activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    if (this.counter) {
      this.counter.textContent = `${this.activeIndex + 1} / ${this.slides.length}`;
    }

    if (this.status) {
      this.status.textContent = `${this.systemName}: zdjęcie ${this.activeIndex + 1} z ${this.slides.length}`;
    }
  }
}

function updateHash(hash: string | null): void {
  const url = new URL(window.location.href);
  url.hash = hash ? `#${hash}` : "";
  window.history.replaceState(window.history.state, "", url);
}

function initSystemsSelection(page: HTMLElement): void {
  if (page.dataset.systemsSelectionInitialized === "true") return;
  page.dataset.systemsSelectionInitialized = "true";

  const pills = Array.from(page.querySelectorAll<HTMLElement>(".system-pill[id]"));
  if (!pills.length) return;

  const pillMap = new Map(pills.map((pill) => [pill.id, pill]));
  let selectedId: string | null = null;

  const setSelected = (pill: HTMLElement | null): void => {
    selectedId = pill?.id ?? null;
    pills.forEach((item) => {
      const isSelected = item === pill;
      item.classList.toggle("is-selected", isSelected);
      if (isSelected) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  };

  const applyHashSelection = (): void => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    setSelected(hash ? pillMap.get(hash) ?? null : null);
  };

  const clearSelection = (): void => {
    if (!selectedId && !window.location.hash) return;
    setSelected(null);
    updateHash(null);
  };

  page.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const pill = target.closest<HTMLElement>(".system-pill[id]");
    if (pill) {
      if (target.closest(CAROUSEL_INTERACTIVE_SELECTOR)) {
        return;
      }

      if (selectedId !== pill.id) {
        setSelected(pill);
        updateHash(pill.id);
      }
      return;
    }

    clearSelection();
  });

  page.addEventListener("change", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.matches('input[name="systems-filter"]')) {
      clearSelection();
    }
  });

  if (systemsSelectionHashHandler) {
    window.removeEventListener("hashchange", systemsSelectionHashHandler);
  }

  systemsSelectionHashHandler = applyHashSelection;
  window.addEventListener("hashchange", systemsSelectionHashHandler);
  applyHashSelection();
}

function initSystemsPage(): void {
  const page = document.querySelector<HTMLElement>("#systems-page");
  if (!page || page.dataset.systemsInitialized === "true") return;
  page.dataset.systemsInitialized = "true";

  page.querySelectorAll<HTMLElement>("[data-system-carousel]").forEach((carouselRoot) => {
    new SystemCarousel(carouselRoot);
  });

  initSystemsSelection(page);
}

function init(): void {
  initMobileNav();
  animateHero();
  animateOnScroll(".section-card");
  animateOnScroll(".system-button");
  animateOnScroll(".system-card");
  initSystemsPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
