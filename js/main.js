function renderProjects() {
  const list = document.getElementById("work-list");
  if (!list || !projects.length) return;

  list.innerHTML = projects
    .map((project, index) => {
      const number = String(index + 1).padStart(2, "0");

      const links = [];
      if (project.liveUrl) {
        links.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener">Live demo</a>`);
      }
      if (project.githubUrl) {
        links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener">Code</a>`);
      }
      if (project.clientUrl) {
        links.push(
          `<a href="${project.clientUrl}" target="_blank" rel="noopener">${project.clientLabel || "Client site"}</a>`
        );
      }

      const tools = (project.tools || [])
        .map((tool) => `<li>${tool}</li>`)
        .join("");

      const previewHtml = project.image
        ? `<img class="work-preview" src="${project.image}" alt="${project.title} preview" loading="lazy">`
        : `<div class="work-preview work-preview-placeholder">Preview coming soon</div>`;

      return `
        <article class="work-item">
          <div class="work-item-header">
            <span class="work-number">${number}</span>
            <div class="work-item-titles">
              <h3 class="work-title">${project.title}</h3>
              <p class="work-context">${project.context || ""}</p>
            </div>
          </div>
          <div class="work-item-details">
            <div class="work-details-inner">
              ${previewHtml}
              <div class="work-details-text">
                <p class="work-desc">${project.description}</p>
                ${tools ? `<ul class="work-tools">${tools}</ul>` : ""}
                ${links.length ? `<div class="work-links">${links.join("")}</div>` : ""}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
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
    link.addEventListener("click", () => links.classList.remove("open"));
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
renderSkills();
renderContact();
setupContact();
setupNav();
