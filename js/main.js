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

function renderProjectDetail(project) {
  const links = projectLinks(project);
  const previewHtml = project.image
    ? `<img class="work-detail-hero" src="${project.image}" alt="${project.title} preview">`
    : `<div class="work-detail-hero work-detail-hero-placeholder">Preview coming soon</div>`;

  return `
    <button type="button" class="work-back-btn">← All work</button>
    <header class="work-detail-header">
      <h2 class="work-detail-title">${project.title}</h2>
      <p class="work-context">${project.context || ""}</p>
    </header>
    ${previewHtml}
    <div class="work-panel">
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
      <div class="work-panel-content">
        <p class="work-summary">${project.summary || ""}</p>
        ${project.detail ? `<p class="work-detail">${project.detail}</p>` : ""}
        ${links.length ? `<div class="work-tags">${links.join("")}</div>` : ""}
      </div>
    </div>
  `;
}

function renderProjects() {
  const list = document.getElementById("work-list");
  if (!list || !projects.length) return;

  list.innerHTML = projects
    .map((project, index) => {
      const slug = projectSlug(project.title);
      const previewHtml = project.image
        ? `<img class="work-list-preview" src="${project.image}" alt="" loading="lazy">`
        : `<div class="work-list-preview work-list-preview-placeholder">No preview</div>`;

      const tools = (project.tools || [])
        .map((tool) => `<li>${tool}</li>`)
        .join("");

      const links = projectLinks(project);

      return `
        <article class="work-item" data-project-index="${index}" data-project-slug="${slug}" tabindex="0">
          <div class="work-item-row">
            ${previewHtml}
            <div class="work-item-titles">
              <h3 class="work-title">${project.title}</h3>
              <p class="work-context">${project.context || ""}</p>
            </div>
            <span class="work-item-hint">View project</span>
          </div>
          <div class="work-item-expand">
            <div class="work-item-expand-inner">
              <p class="work-expand-summary">${project.summary || ""}</p>
              ${tools ? `<ul class="work-expand-tools">${tools}</ul>` : ""}
              ${links.length ? `<div class="work-expand-links">${links.join("")}</div>` : ""}
            </div>
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

  const slug = projectSlug(project.title);
  history.replaceState(null, "", `#work/${slug}`);

  detailView.querySelector(".work-back-btn")?.addEventListener("click", closeProject);
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
  history.replaceState(null, "", "#work");
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
}

function setupWorkList() {
  const list = document.getElementById("work-list");
  if (!list) return;

  list.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const item = event.target.closest(".work-item");
    if (!item) return;
    openProject(Number(item.dataset.projectIndex));
  });

  list.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target.closest(".work-item");
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
setupWorkList();
renderSkills();
renderContact();
setupContact();
setupNav();
