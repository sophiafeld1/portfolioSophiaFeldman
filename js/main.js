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

function renderDetailView(project, index) {
  const previewHtml = project.image
    ? `<img class="work-detail-image" src="${project.image}" alt="${project.title} preview">`
    : `<div class="work-detail-image work-detail-image-placeholder">No preview</div>`;

  const siteBtn = project.liveUrl
    ? `<a class="btn btn-primary" href="${project.liveUrl}" target="_blank" rel="noopener">View Website</a>`
    : "";
  const repoBtn = project.githubUrl
    ? `<a class="btn btn-secondary" href="${project.githubUrl}" target="_blank" rel="noopener">View Repository</a>`
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
        <div class="work-detail-story">
          ${renderStoryBlock("Problems", project.problems)}
          ${renderStoryBlock("Challenges", project.challenges)}
          ${renderStoryBlock("Solutions", project.solutions)}
        </div>
        <div class="work-detail-actions">${siteBtn}${repoBtn}</div>
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
    const previewHtml = project.image
      ? `<img class="work-card-image" src="${project.image}" alt="${project.title} preview" loading="lazy">`
      : `<div class="work-card-image work-card-image-placeholder">No preview</div>`;

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

  window.scrollTo({ top: 0, behavior: "smooth" });
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

function setupHeroScroll() {
  const hero = document.getElementById("hero");
  const work = document.getElementById("work");
  const sidebar = document.querySelector(".work-identity-sidebar");

  function measureScrollState() {
    let heroScrolled = false;
    let workVisible = false;

    if (hero) {
      const rect = hero.getBoundingClientRect();
      heroScrolled = rect.bottom <= window.innerHeight * 0.85;
      document.body.classList.toggle("hero-scrolled", heroScrolled);
    }

    if (work) {
      const rect = work.getBoundingClientRect();
      workVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.2;
    }

    const show = heroScrolled && workVisible;
    document.body.classList.toggle("work-identity-visible", show);
    if (sidebar) sidebar.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function scheduleMeasure() {
    measureScrollState();
    requestAnimationFrame(measureScrollState);
    window.setTimeout(measureScrollState, 120);
  }

  window.addEventListener("scroll", measureScrollState, { passive: true });
  window.addEventListener("resize", measureScrollState);
  window.addEventListener("load", scheduleMeasure);
  window.addEventListener("hashchange", scheduleMeasure);
  scheduleMeasure();
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
    link.addEventListener("click", () => {
      links.classList.remove("open");
      if (document.body.classList.contains("work-showing-detail")) {
        closeProject({ skipHistory: true });
      }
    });
  });

  document.querySelector(".nav-logo")?.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.body.classList.contains("work-showing-detail")) {
      closeProject({ skipHistory: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  });
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
