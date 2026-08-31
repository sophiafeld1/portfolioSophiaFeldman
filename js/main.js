function metaList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function projectSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function projectLinks(project) {
  const links = [];
  if (project.liveUrl) {
    links.push(`<a class="work-tag" href="${project.liveUrl}" target="_blank" rel="noopener">Live demo</a>`);
  }
  if (project.githubUrl) {
    links.push(`<a class="work-tag" href="${project.githubUrl}" target="_blank" rel="noopener">Code</a>`);
  }
  if (project.clientUrl) {
    links.push(
      `<a class="work-tag" href="${project.clientUrl}" target="_blank" rel="noopener">${project.clientLabel || "Client site"}</a>`
    );
  }
  return links;
}

function renderProjectMeta(project) {
  return `
    <div class="work-panel-meta">
      <dl class="work-meta-group">
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
      </dl>
      <dl class="work-meta-group">
        <div class="work-meta-field">
          <dt>Role</dt>
          <dd><ul class="work-meta-list">${metaList(project.role || [])}</ul></dd>
        </div>
        <div class="work-meta-field">
          <dt>Tech</dt>
          <dd><ul class="work-meta-list">${metaList(project.tools || [])}</ul></dd>
        </div>
      </dl>
    </div>
  `;
}

function renderExpandPanel(project) {
  const links = projectLinks(project);
  return `
    <div class="work-panel">
      ${renderProjectMeta(project)}
      <div class="work-panel-content">
        <p class="work-summary">${project.summary || ""}</p>
        ${project.detail ? `<p class="work-detail">${project.detail}</p>` : ""}
        ${links.length ? `<div class="work-tags">${links.join("")}</div>` : ""}
      </div>
    </div>
  `;
}
function renderStorySection(label, content) {
  if (!content) return "";
  return `
    <section class="project-story-row">
      <h3 class="project-story-label">${label}</h3>
      <div class="project-story-body"><p>${content}</p></div>
    </section>
  `;
}

function renderProjectDetail(project) {
  const links = projectLinks(project);
  const previewHtml = project.image
    ? `<img class="project-detail-hero" src="${project.image}" alt="${project.title} preview">`
    : `<div class="project-detail-hero project-detail-hero-placeholder">Preview coming soon</div>`;

  return `
    <div class="project-detail">
      <div class="project-story">
        ${renderStorySection("Problems", project.problems)}
        ${renderStorySection("Challenges", project.challenges)}
        ${renderStorySection("Solutions", project.solutions)}
      </div>
      ${previewHtml}
      ${links.length ? `<div class="project-detail-links">${links.join("")}</div>` : ""}
    </div>
  `;
}

function setDetailHeader(project) {
  const logo = document.querySelector(".nav-logo");
  const backBtn = document.querySelector(".nav-back-btn");
  if (!logo || !backBtn) return;

  if (project) {
    logo.textContent = `${siteConfig.name} — ${project.title}`;
    backBtn.hidden = false;
    document.title = `${project.title} — ${siteConfig.name}`;
  } else {
    logo.textContent = siteConfig.name;
    backBtn.hidden = true;
    document.title = `${siteConfig.name} — Portfolio`;
  }
}

function renderProjects() {
  const list = document.getElementById("work-list");
  if (!list || !projects.length) return;

  list.innerHTML = projects
    .map((project, index) => {
      const slug = projectSlug(project.title);
      const previewHtml = project.image
        ? `<img class="work-card-image" src="${project.image}" alt="${project.title} preview" loading="lazy">`
        : `<div class="work-card-image work-card-image-placeholder">No preview</div>`;

      return `
        <article class="work-card" data-project-index="${index}" data-project-slug="${slug}" tabindex="0">
          <div class="work-card-media">${previewHtml}</div>
          <div class="work-card-info">
            <h3 class="work-title">${project.title}</h3>
            <p class="work-context">${project.context || ""}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function openProject(index) {
  const project = projects[index];
  if (!project) return;

  const listView = document.getElementById("work-list-view");
  const detailView = document.getElementById("work-detail-view");
  if (!listView || !detailView) return;

  detailView.innerHTML = renderProjectDetail(project);
  detailView.hidden = false;
  listView.hidden = true;
  document.body.classList.add("work-showing-detail");
  setDetailHeader(project);

  const slug = projectSlug(project.title);
  history.replaceState(null, "", `#work/${slug}`);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeProject() {
  const listView = document.getElementById("work-list-view");
  const detailView = document.getElementById("work-detail-view");
  if (!listView || !detailView) return;

  detailView.hidden = true;
  detailView.innerHTML = "";
  listView.hidden = false;
  document.body.classList.remove("work-showing-detail");
  setDetailHeader(null);
  history.replaceState(null, "", "#work");
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
}

function setupWorkExpandPanel() {
  const list = document.getElementById("work-list");
  const panel = document.getElementById("work-expand-panel");
  if (!list || !panel) return;

  let activeIndex = null;
  let hideTimer = null;

  function showPanel(index) {
    const project = projects[index];
    if (!project) return;
    clearTimeout(hideTimer);
    activeIndex = index;
    panel.innerHTML = renderExpandPanel(project);
    panel.hidden = false;
    list.querySelectorAll(".work-card").forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
    });
  }

  function hidePanel() {
    hideTimer = setTimeout(() => {
      activeIndex = null;
      panel.hidden = true;
      panel.innerHTML = "";
      list.querySelectorAll(".work-card").forEach((card) => card.classList.remove("is-active"));
    }, 120);
  }

  list.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    showPanel(Number(card.dataset.projectIndex));
  });

  list.addEventListener("mouseleave", hidePanel);
  panel.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  panel.addEventListener("mouseleave", hidePanel);
}

function setupWorkList() {
  const list = document.getElementById("work-list");
  if (!list) return;

  list.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const item = event.target.closest(".work-card");
    if (!item) return;
    openProject(Number(item.dataset.projectIndex));
  });

  list.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target.closest(".work-card");
    if (!item) return;
    event.preventDefault();
    openProject(Number(item.dataset.projectIndex));
  });

  const hash = window.location.hash;
  if (hash.startsWith("#work/")) {
    const slug = hash.slice(6);
    const index = projects.findIndex((p) => projectSlug(p.title) === slug);
    if (index >= 0) openProject(index);
  }
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

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  document.querySelector(".nav-back-btn")?.addEventListener("click", closeProject);

  toggle?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      if (link.getAttribute("href") === "#work" && document.body.classList.contains("work-showing-detail")) {
        closeProject();
      }
    });
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
}

document.getElementById("year").textContent = new Date().getFullYear();

renderSiteConfig();
renderProjects();
setupWorkExpandPanel();
setupWorkList();
renderSkills();
renderContact();
setupContact();
setupNav();
