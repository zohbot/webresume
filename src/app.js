const app = document.querySelector("#app");
const resume = window.resume;

const icon = {
  print:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></svg>',
  theme:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 6.5 6.5 0 0 1-9-9Z"/></svg>',
  external:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>'
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function section(title, content, className = "") {
  return `
    <section class="section ${className}" aria-labelledby="${slug(title)}">
      <h2 id="${slug(title)}">${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function renderContacts() {
  return resume.contacts
    .map(
      (contact) => `
        <a class="contact-link" href="${escapeHtml(contact.href)}">
          <span>${escapeHtml(contact.label)}</span>
          <strong>${escapeHtml(contact.value)}</strong>
        </a>
      `
    )
    .join("");
}

function renderHighlights() {
  return resume.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderExperience() {
  return resume.experience
    .map(
      (job) => `
        <article class="timeline-item">
          <div class="item-heading">
            <div>
              <h3>${escapeHtml(job.title)}</h3>
              <p>${escapeHtml(job.company)} / ${escapeHtml(job.location)}</p>
            </div>
            <time>${escapeHtml(job.period)}</time>
          </div>
          <ul>${job.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  return resume.projects
    .map(
      (project) => `
        <article class="project-card">
          <a href="${escapeHtml(project.url)}" class="project-title">
            <span>${escapeHtml(project.name)}</span>
            ${icon.external}
          </a>
          <p>${escapeHtml(project.description)}</p>
          <small>${escapeHtml(project.stack)}</small>
        </article>
      `
    )
    .join("");
}

function renderSkills() {
  return resume.skills
    .map(
      (skillSet) => `
        <article class="skill-group">
          <h3>${escapeHtml(skillSet.group)}</h3>
          <div class="pills">
            ${skillSet.items.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderEducation() {
  return resume.education
    .map(
      (item) => `
        <article class="education-item">
          <div>
            <h3>${escapeHtml(item.school)}</h3>
            <p>${escapeHtml(item.credential)}</p>
          </div>
          <time>${escapeHtml(item.period)}</time>
        </article>
      `
    )
    .join("");
}

function render() {
  document.title = `${resume.name} Resume`;
  document.querySelector('meta[name="description"]').setAttribute("content", `${resume.role} resume for ${resume.name}.`);

  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="https://zohbot.net" aria-label="${escapeHtml(resume.name)} home">
        <span class="character-sprite character-sprite--nav" aria-hidden="true"></span>
        <span>${escapeHtml(resume.name)}</span>
      </a>
      <div class="actions">
        <button class="icon-button" type="button" data-theme-toggle aria-label="Toggle color theme" title="Toggle color theme">
          ${icon.theme}
        </button>
        <button class="icon-button" type="button" data-print aria-label="Print resume" title="Print resume">
          ${icon.print}
        </button>
      </div>
    </header>

    <article id="resume" class="resume">
      <header class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(resume.availability)}</p>
          <h1>${escapeHtml(resume.name)}</h1>
          <p class="role">${escapeHtml(resume.role)}</p>
          <p class="summary">${escapeHtml(resume.summary)}</p>
        </div>
        <aside class="contact-panel" aria-label="Contact details">
          <div class="character-stage" aria-hidden="true">
            <span class="character-sprite character-sprite--profile"></span>
          </div>
          <p>${escapeHtml(resume.location)}</p>
          <div class="contact-list">${renderContacts()}</div>
        </aside>
      </header>

      <div class="resume-grid">
        <div class="primary-column">
          ${section("Highlights", `<ul class="highlight-list">${renderHighlights()}</ul>`)}
          ${section("Experience", renderExperience(), "timeline")}
          ${section("Projects", `<div class="projects-grid">${renderProjects()}</div>`)}
        </div>
        <aside class="secondary-column">
          ${section("Skills", renderSkills())}
          ${section("Education", renderEducation())}
        </aside>
      </div>
    </article>
  `;

  document.querySelector("[data-print]").addEventListener("click", () => window.print());
  document.querySelector("[data-theme-toggle]").addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("resume-theme", nextTheme);
}

function hydrateTheme() {
  const storedTheme = localStorage.getItem("resume-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  document.documentElement.dataset.theme = storedTheme || (prefersLight ? "light" : "dark");
}

hydrateTheme();
render();
