// Work grid reveal transition — change to try a different style:
// "soft-rise" | "blur-in" | "scale-settle" | "clip-up" | "stagger"
const WORK_REVEAL_TRANSITION = "stagger";

function applyWorkRevealTransition() {
  document.body.classList.add(`reveal-${WORK_REVEAL_TRANSITION}`);
}

function metaList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderProjectMetaList(project) {
  return `
    <dl class="work-detail-meta-list">
      <div class="work-meta-field">
        <dt>Client</dt>
        <dd>${project.client || project.context || "—"}</dd>
      </div>
      <div class="work-meta-field">
        <dt>Year</dt>
        <dd>${project.year || "—"}</dd>
      </div>
      <div class="work-meta-field">
        <dt>Project type</dt>
        <dd><ul class="work-meta-list">${metaList(project.projectType || [])}</ul></dd>
      </div>
      <div class="work-meta-field">
        <dt>Role</dt>
        <dd><ul class="work-meta-list">${metaList(project.role || [])}</ul></dd>
      </div>
      <div class="work-meta-field">
        <dt>Tech</dt>
        <dd><ul class="work-meta-list">${metaList(project.tools || [])}</ul></dd>
      </div>
    </dl>
  `;
}

function renderStoryBlock(label, content) {
  if (!content) return "";
  return `
    <section class="work-story-block">
      <h4 class="work-story-label">${label}</h4>
      <p class="work-story-text">${content}</p>
    </section>
  `;
}

function renderPresentationSlideshow(slides) {
  if (!slides?.length) return "";

  const slideItems = slides
    .map((slide, index) => {
      if (slide.type === "video") {
        const poster = slide.poster ? ` poster="${slide.poster}"` : "";
        return `<div class="presentation-slide${index === 0 ? " is-active" : ""}" data-slide-index="${index}" data-slide-type="video">
          <video class="presentation-slide-video" controls playsinline preload="metadata"${poster} aria-label="${slide.alt || `Presentation slide ${index + 1}`}">
            <source src="${slide.src}" type="video/mp4">
          </video>
        </div>`;
      }

      return `<div class="presentation-slide${index === 0 ? " is-active" : ""}" data-slide-index="${index}" data-slide-type="image">
        <img class="presentation-slide-image" src="${slide.src}" alt="${slide.alt || `Presentation slide ${index + 1}`}" loading="lazy">
      </div>`;
    })
    .join("");

  return `
    <section class="presentation-slideshow" aria-label="Capstone presentation" tabindex="0">
      <div class="presentation-slideshow-header">
        <h4 class="presentation-slideshow-title">Capstone presentation</h4>
        <span class="presentation-slideshow-counter"><span class="presentation-current">1</span> / ${slides.length}</span>
      </div>
      <div class="presentation-slideshow-frame">
        <button type="button" class="presentation-arrow presentation-arrow-prev" aria-label="Previous slide">‹</button>
        <div class="presentation-slideshow-viewport">
          <div class="presentation-slideshow-track">${slideItems}</div>
        </div>
        <button type="button" class="presentation-arrow presentation-arrow-next" aria-label="Next slide">›</button>
      </div>
    </section>
  `;
}

function setupPresentationSlideshow(root) {
  const slideshow = root?.querySelector(".presentation-slideshow");
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll(".presentation-slide"));
  const prevBtn = slideshow.querySelector(".presentation-arrow-prev");
  const nextBtn = slideshow.querySelector(".presentation-arrow-next");
  const counter = slideshow.querySelector(".presentation-current");
  const viewport = slideshow.querySelector(".presentation-slideshow-viewport");
  let current = 0;
  let touchStartX = 0;

  function pauseVideos(exceptIndex = -1) {
    slides.forEach((slide, index) => {
      if (index === exceptIndex) return;
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
    });
    if (counter) counter.textContent = String(current + 1);
    pauseVideos(current);
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  slideshow.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    }
  });

  viewport?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.screenX ?? 0;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.screenX ?? 0;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) < 40) return;
      goTo(current + (deltaX < 0 ? 1 : -1));
    },
    { passive: true }
  );

  goTo(0);
}

function renderHoverPanel(project) {
  const repoBtn = project.githubUrl
    ? `<a class="btn btn-secondary work-hover-btn" href="${project.githubUrl}" target="_blank" rel="noopener">View Repository</a>`
    : "";
  const siteBtn = project.liveUrl
    ? `<a class="btn btn-primary work-hover-btn" href="${project.liveUrl}" target="_blank" rel="noopener">View Website</a>`
    : "";

  return `
    <div class="work-hover-panel-inner">
      <p class="work-hover-blurb">${project.summary || ""}</p>
      <div class="work-hover-actions">${repoBtn}${siteBtn}</div>
    </div>
  `;
}

function renderProjectPreview(project, className, options = {}) {
  const { lazy = false } = options;
  const label = `${project.title} preview`;

  if (project.previewVideo) {
    const poster = project.image ? ` poster="${project.image}"` : "";
    return `<video class="${className}" autoplay loop muted playsinline${poster} aria-label="${label}">
      <source src="${project.previewVideo}" type="video/mp4">
    </video>`;
  }

  if (project.image) {
    const lazyAttr = lazy ? ' loading="lazy"' : "";
    return `<img class="${className}" src="${project.image}" alt="${label}"${lazyAttr}>`;
  }

  return `<div class="${className} ${className}-placeholder">No preview</div>`;
}

function renderDetailView(project, index) {
  const previewHtml = renderProjectPreview(project, "work-detail-image");

  const siteBtn = project.liveUrl
    ? `<a class="btn btn-primary" href="${project.liveUrl}" target="_blank" rel="noopener">View Website</a>`
    : "";
  const repoBtn = project.githubUrl
    ? `<a class="btn btn-secondary" href="${project.githubUrl}" target="_blank" rel="noopener">View Repository</a>`
    : "";
  const presentationBtn = project.presentationDownload
    ? `<a class="btn btn-secondary" href="${project.presentationDownload}" target="_blank" rel="noopener">Download PDF</a>`
    : "";
  const presentationHtml = project.presentationSlides?.length
    ? renderPresentationSlideshow(project.presentationSlides)
    : "";

  const dots = projects
    .map(
      (_, dotIndex) =>
        `<button type="button" class="work-detail-dot${dotIndex === index ? " is-active" : ""}" data-project-index="${dotIndex}" aria-label="View project ${dotIndex + 1}"></button>`
    )
    .join("");

  return `
    <button type="button" class="work-detail-back" aria-label="Back to projects">← Back</button>
    <article class="work-detail-card">
      <div class="work-detail-top">
        <div class="work-detail-preview">${previewHtml}</div>
        <div class="work-detail-meta">${renderProjectMetaList(project)}</div>
      </div>
      <div class="work-detail-bottom">
        <p class="work-detail-summary">${project.summary || ""}</p>
        ${project.detail ? `<p class="work-detail-text">${project.detail}</p>` : ""}
        ${presentationHtml}
        <div class="work-detail-story">
          ${renderStoryBlock("Task", project.Task)}
          ${renderStoryBlock("Impact", project.Impact)}
          ${renderStoryBlock("Problems", project.problems)}
          ${renderStoryBlock("Challenges", project.challenges)}
          ${renderStoryBlock("Solutions", project.solutions)}
        </div>
        <div class="work-detail-actions">${siteBtn}${repoBtn}${presentationBtn}</div>
      </div>
      <nav class="work-detail-dots" aria-label="Project navigation">${dots}</nav>
    </article>
  `;
}

function renderProjects() {
  const list = document.getElementById("work-list");
  if (!list || !projects.length) return;

  const midPanel = document.createElement("div");
  midPanel.id = "work-hover-panel-mid";
  midPanel.className = "work-hover-panel work-hover-panel--mid";
  midPanel.setAttribute("aria-hidden", "true");

  const cards = projects.map((project, index) => {
    const row = index < 2 ? 0 : 1;
    const previewHtml = renderProjectPreview(project, "work-card-image", { lazy: true });

    return `
      <article class="work-card" data-project-index="${index}" data-row="${row}" tabindex="0">
        <div class="work-card-media">${previewHtml}</div>
        <div class="work-card-info">
          <h3 class="work-title">${project.title}</h3>
          <p class="work-context">${project.context || ""}</p>
        </div>
      </article>
    `;
  });

  list.innerHTML = cards.slice(0, 2).join("") + midPanel.outerHTML + cards.slice(2).join("");

  list.querySelectorAll(".work-card").forEach((card, index) => {
    if (index === 0) card.style.gridArea = "1 / 1";
    if (index === 1) card.style.gridArea = "1 / 2";
    if (index === 2) card.style.gridArea = "3 / 1";
    if (index === 3) card.style.gridArea = "3 / 2";
  });

  const mid = document.getElementById("work-hover-panel-mid");
  if (mid) mid.style.gridArea = "2 / 1 / 3 / 3";
}

function setupWorkGrid() {
  const section = document.getElementById("work-section");
  const list = document.getElementById("work-list");
  const midPanel = document.getElementById("work-hover-panel-mid");
  const bottomPanel = document.getElementById("work-hover-panel-bottom");
  if (!section || !list || !midPanel || !bottomPanel) return;

  let activeCard = null;
  let hideTimer = null;

  function getPanelForCard(card) {
    return Number(card.dataset.row) === 0 ? midPanel : bottomPanel;
  }

  function hideAllPanels() {
    [midPanel, bottomPanel].forEach((panel) => {
      panel.classList.remove("is-visible");
      panel.setAttribute("aria-hidden", "true");
      panel.innerHTML = "";
    });
  }

  function showPanel(card) {
    const project = projects[Number(card.dataset.projectIndex)];
    if (!project) return;

    clearTimeout(hideTimer);

    const panel = getPanelForCard(card);
    const otherPanel = panel === midPanel ? bottomPanel : midPanel;

    otherPanel.classList.remove("is-visible");
    otherPanel.setAttribute("aria-hidden", "true");
    otherPanel.innerHTML = "";

    panel.innerHTML = renderHoverPanel(project);
    panel.classList.add("is-visible");
    panel.setAttribute("aria-hidden", "false");

    activeCard = card;
    section.classList.add("is-previewing");

    list.querySelectorAll(".work-card").forEach((entry) => {
      entry.classList.toggle("is-hovered", entry === card);
      entry.classList.toggle("is-dimmed", entry !== card);
    });
  }

  function hidePanel() {
    hideTimer = window.setTimeout(() => {
      activeCard = null;
      section.classList.remove("is-previewing");
      hideAllPanels();
      list.querySelectorAll(".work-card").forEach((entry) => {
        entry.classList.remove("is-hovered", "is-dimmed");
      });
    }, 140);
  }

  list.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    clearTimeout(hideTimer);
    if (card === activeCard) return;
    showPanel(card);
  });

  section.addEventListener("mouseleave", hidePanel);
  section.addEventListener("mouseenter", () => clearTimeout(hideTimer));

  [midPanel, bottomPanel].forEach((panel) => {
    panel.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    panel.addEventListener("mouseleave", hidePanel);
  });

  list.addEventListener("click", (event) => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    openProject(Number(card.dataset.projectIndex));
  });

  list.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".work-card");
    if (!card) return;
    event.preventDefault();
    openProject(Number(card.dataset.projectIndex));
  });
}

let activeProjectIndex = null;

function openProject(index, options = {}) {
  const project = projects[index];
  const detailView = document.getElementById("work-detail-view");
  const workSection = document.getElementById("work-section");
  const workHeading = document.querySelector("#work .section-title");
  if (!project || !detailView || !workSection) return;

  showWorkSection();

  activeProjectIndex = index;
  detailView.innerHTML = renderDetailView(project, index);
  detailView.hidden = false;
  workSection.hidden = true;
  if (workHeading) workHeading.hidden = true;

  document.body.classList.add("work-showing-detail");

  if (!options.skipHistory) {
    window.history.pushState({ projectIndex: index }, "", `#project-${index}`);
  }

  detailView.querySelector(".work-detail-back")?.addEventListener("click", () => closeProject());
  detailView.querySelectorAll(".work-detail-dot").forEach((dot) => {
    dot.addEventListener("click", () => openProject(Number(dot.dataset.projectIndex)));
  });

  setupPresentationSlideshow(detailView);

  smoothScrollTo(0);
}

function closeProject(options = {}) {
  const detailView = document.getElementById("work-detail-view");
  const workSection = document.getElementById("work-section");
  const workHeading = document.querySelector("#work .section-title");
  if (!detailView || !workSection) return;

  activeProjectIndex = null;
  detailView.hidden = true;
  detailView.innerHTML = "";
  workSection.hidden = false;
  if (workHeading) workHeading.hidden = false;

  document.body.classList.remove("work-showing-detail");

  if (!options.skipHistory) {
    window.history.pushState(null, "", "#work");
  }
}

function setupAboutCarousel() {
  const images = siteConfig.aboutImages?.length
    ? siteConfig.aboutImages
    : [siteConfig.headshot].filter(Boolean);
  const track = document.getElementById("about-carousel-track");
  const dotsNav = document.getElementById("about-carousel-dots");
  if (!track || !dotsNav || !images.length) return;

  track.innerHTML = images
    .map(
      (src, index) =>
        `<img class="about-carousel-image${index === 0 ? " is-active" : ""}" src="${src}" alt="${siteConfig.name} photo ${index + 1}" data-index="${index}">`
    )
    .join("");

  dotsNav.innerHTML = images
    .map(
      (_, index) =>
        `<button type="button" class="about-carousel-dot${index === 0 ? " is-active" : ""}" data-index="${index}" aria-label="Show photo ${index + 1}"></button>`
    )
    .join("");

  let current = 0;
  let timer = null;

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.querySelectorAll(".about-carousel-image").forEach((img, i) => {
      img.classList.toggle("is-active", i === current);
    });
    dotsNav.querySelectorAll(".about-carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(() => goTo(current + 1), 2000);
  }

  dotsNav.querySelectorAll(".about-carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.index));
      startTimer();
    });
  });

  startTimer();
}

function setupProjectRouting() {
  function handleRoute() {
    const hash = window.location.hash.slice(1);
    const projectMatch = hash.match(/^project-(\d+)$/);

    if (projectMatch) {
      showWorkSection();
      openProject(Number(projectMatch[1]), { skipHistory: true });
      return;
    }

    if (document.body.classList.contains("work-showing-detail")) {
      closeProject({ skipHistory: true });
    }
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("popstate", handleRoute);

  const initial = window.location.hash.match(/^#project-(\d+)$/);
  if (initial) {
    showWorkSection();
    openProject(Number(initial[1]), { skipHistory: true });
  }
}

function setupWorkReveal() {
  const work = document.getElementById("work");
  if (!work) return;

  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) showWorkSection();
    },
    { threshold: 0.08 }
  ).observe(work);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothScrollTo(targetY, duration = 780) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    const progress = clamp((now - startTime) / duration, 0, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function setupHeroScroll() {
  const hero = document.getElementById("hero");
  const work = document.getElementById("work");
  const sidebar = document.querySelector(".work-identity-sidebar");
  let ticking = false;

  function updateIdentityProgress() {
    ticking = false;

    if (window.innerWidth <= 768 || !hero || !work) {
      document.documentElement.style.setProperty("--identity-progress", "0");
      document.body.classList.remove("identity-sidebar-active");
      if (sidebar) sidebar.setAttribute("aria-hidden", "true");
      return;
    }

    const vh = window.innerHeight;
    const heroRect = hero.getBoundingClientRect();
    const workRect = work.getBoundingClientRect();

    // Fade hero photo out as the hero leaves the viewport
    const heroFade = clamp(1 - heroRect.bottom / (vh * 0.88), 0, 1);

    // Fade sidebar in as soon as the work section enters view
    const workFocus = clamp((vh * 0.96 - workRect.top) / (vh * 0.38), 0, 1);

    // Only fade out when scrolling past work into later sections
    const workLeave = clamp((vh * 0.45 - workRect.bottom) / (vh * 0.35), 0, 1);

    const blend = Math.max(heroFade, workFocus);
    const progress = clamp(blend * (1 - workLeave), 0, 1);

    document.documentElement.style.setProperty("--identity-progress", progress.toFixed(3));

    const sidebarActive = progress > 0.08;
    document.body.classList.toggle("identity-sidebar-active", sidebarActive);
    if (sidebar) sidebar.setAttribute("aria-hidden", sidebarActive ? "false" : "true");
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateIdentityProgress);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);
  requestUpdate();
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid || !siteConfig.skillCategories?.length) return;

  grid.innerHTML = siteConfig.skillCategories
    .map(
      (category) => `
        <article class="skill-card">
          <h3 class="skill-card-title">${category.title}</h3>
          <ul class="skill-pills">
            ${category.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderContact() {
  const container = document.getElementById("contact-links");
  if (!container || !siteConfig.contact) return;
  container.innerHTML = siteConfig.contact
    .map((link) => {
      if (link.type === "email") {
        return `<button type="button" class="contact-link contact-link-copy" data-email="${link.value}">${link.label}</button>`;
      }
      return `<a class="contact-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`;
    })
    .join("");
}

async function copyEmail(button) {
  const email = button.dataset.email;
  const originalLabel = button.dataset.originalLabel || button.textContent;

  try {
    await navigator.clipboard.writeText(email);
    button.textContent = "Copied!";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove("copied");
    }, 2000);
  } catch {
    window.prompt("Copy my email:", email);
  }
}

function setupContact() {
  document.querySelectorAll(".contact-link-copy").forEach((button) => {
    button.dataset.originalLabel = button.textContent;
    button.addEventListener("click", () => copyEmail(button));
  });
}

function showWorkSection() {
  document.body.classList.add("work-visible", "work-revealed");
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      links.classList.remove("open");

      if (document.body.classList.contains("work-showing-detail")) {
        closeProject({ skipHistory: true });
      }

      const href = link.getAttribute("href");
      if (!href?.startsWith("#") || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      smoothScrollTo(Math.max(0, top));
      window.history.pushState(null, "", href);
    });
  });

  document.querySelector(".nav-logo")?.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.body.classList.contains("work-showing-detail")) {
      closeProject({ skipHistory: true });
    }
    smoothScrollTo(0);
    window.history.pushState(null, "", window.location.pathname);
  });
}

function setupHeroRotator() {
  const phrases = siteConfig.heroRotatorPhrases?.length
    ? siteConfig.heroRotatorPhrases
    : [siteConfig.name];
  const rotator = document.getElementById("hero-title-rotator");
  const viewport = document.getElementById("hero-title-rotator-viewport");
  const currentEl = document.getElementById("hero-title-current");
  const nextEl = document.getElementById("hero-title-next");
  if (!rotator || !viewport || !currentEl || !nextEl || phrases.length < 2) return;

  let index = 0;
  let timer = null;
  let animating = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 0 : 500;

  function measurePhraseWidth(text) {
    const measure = document.createElement("span");
    measure.className = "hero-title-phrase accent";
    measure.style.visibility = "hidden";
    measure.style.position = "absolute";
    measure.style.whiteSpace = "nowrap";
    measure.textContent = text;
    viewport.appendChild(measure);
    const width = measure.offsetWidth;
    measure.remove();
    return width;
  }

  function setViewportWidth(text) {
    viewport.style.minWidth = `${measurePhraseWidth(text)}px`;
  }

  const maxWidth = phrases.reduce(
    (widest, phrase) => Math.max(widest, measurePhraseWidth(phrase)),
    0
  );
  viewport.style.minWidth = `${maxWidth}px`;

  currentEl.textContent = phrases[0];

  function swapInstant(nextIndex) {
    index = nextIndex;
    currentEl.textContent = phrases[index];
    nextEl.textContent = "";
    nextEl.setAttribute("aria-hidden", "true");
    setViewportWidth(phrases[index]);
  }

  function advancePhrase() {
    if (animating) return;

    const nextIndex = (index + 1) % phrases.length;
    const nextPhrase = phrases[nextIndex];

    if (reducedMotion) {
      swapInstant(nextIndex);
      return;
    }

    animating = true;
    nextEl.textContent = nextPhrase;
    nextEl.setAttribute("aria-hidden", "false");
    setViewportWidth(nextPhrase);
    rotator.classList.add("is-animating");

    window.setTimeout(() => {
      index = nextIndex;
      currentEl.textContent = nextPhrase;
      nextEl.textContent = "";
      nextEl.setAttribute("aria-hidden", "true");
      rotator.classList.remove("is-animating");
      animating = false;
    }, duration);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = window.setInterval(advancePhrase, 2000);
  }

  startTimer();
}

function renderSiteConfig() {
  document.title = `${siteConfig.name} — Portfolio`;
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = siteConfig.name;
  });

  const tagline = document.querySelector(".hero-subtitle");
  if (tagline && siteConfig.tagline) tagline.textContent = siteConfig.tagline;

  const about = document.querySelector(".about-text");
  if (about && siteConfig.about) about.textContent = siteConfig.about;

  const headshot = siteConfig.headshot;
  if (headshot) {
    document.querySelectorAll(".hero-headshot, .work-identity-photo").forEach((img) => {
      img.src = headshot;
      img.alt = `${siteConfig.name} profile photo`;
    });
  }

  const linkedin = document.querySelector(".hero-linkedin");
  if (linkedin && siteConfig.linkedinUrl) {
    linkedin.href = siteConfig.linkedinUrl;
  }
}

document.getElementById("year").textContent = new Date().getFullYear();

applyWorkRevealTransition();
renderSiteConfig();
setupHeroRotator();
setupAboutCarousel();
renderProjects();
setupWorkGrid();
setupProjectRouting();
setupWorkReveal();
setupHeroScroll();
renderSkills();
renderContact();
setupContact();
setupNav();
