const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (navToggle && siteNav) {
  const setNavState = (isOpen) => {
    siteNav.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
  };

  navToggle.addEventListener("click", () => {
    setNavState(navToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setNavState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("open")) {
      setNavState(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      setNavState(false);
    }
  });

  siteNav.addEventListener("focusout", (event) => {
    if (!siteNav.contains(event.relatedTarget) && event.relatedTarget !== navToggle) {
      setNavState(false);
    }
  });

  window.matchMedia("(max-width: 760px)").addEventListener("change", () => {
    setNavState(false);
  });
}

// Only enhance below-the-fold content; the document is visible without JavaScript.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealSelector = "[data-reveal], .reveal-up, .service-card, .gallery-card, .feature-item, .intro-ribbon article, .real-photo-strip img";
  const revealItems = Array.from(document.querySelectorAll(revealSelector)).filter(
    (item) => !item.querySelector(revealSelector),
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.06,
      rootMargin: "0px 0px -24px 0px",
    },
  );

  revealItems.forEach((item, index) => {
    if (item.getBoundingClientRect().top >= window.innerHeight) {
      item.style.setProperty("--reveal-delay", `${(index % 3) * 60}ms`);
      item.classList.add("reveal-pending");
      observer.observe(item);
    }
  });

  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    revealItems.forEach((item) => item.classList.remove("reveal-pending"));
  });
}

// V2.4 real-photo lightbox
(function setupRealPhotoLightbox() {
  const realPhotos = Array.from(document.querySelectorAll("img")).filter(
    (img) => {
      const src = img.getAttribute("src") || "";
      return src.includes("assets/real-") || src.includes("/real-");
    },
  );

  if (!realPhotos.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded photo view");

  lightbox.innerHTML = `
    <div class="photo-lightbox__dialog">
      <button class="photo-lightbox__close" type="button" aria-label="Close expanded photo">×</button>
      <div class="photo-lightbox__image-wrap">
        <img class="photo-lightbox__image" alt="" />
      </div>
      <p class="photo-lightbox__caption"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".photo-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".photo-lightbox__caption");
  const closeButton = lightbox.querySelector(".photo-lightbox__close");

  function getCaptionForImage(img) {
    const figure = img.closest("figure");
    const figcaption = figure?.querySelector("figcaption")?.textContent?.trim();
    return figcaption || img.getAttribute("alt") || "";
  }

  function openLightbox(img) {
    lightboxImage.src = img.dataset.fullSrc || img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "";
    lightboxCaption.textContent = getCaptionForImage(img);

    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-lock");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-lock");
    lightboxImage.removeAttribute("src");
  }

  realPhotos.forEach((img) => {
    img.dataset.lightboxRealPhoto = "true";
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute(
      "aria-label",
      `Open larger photo: ${img.alt || "home photo"}`,
    );

    img.addEventListener("click", () => openLightbox(img));

    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
