import { PROFILE } from "./data.js";

const THEME_KEY = "pr_site_theme";
const FOCUS_KEY = "pr_site_focus";

export const ROUTES = [
  { id: "home", href: "index.html", label: "Início", navLabel: "Início", icon: "home" },
  { id: "quem-sou", href: "quem-sou.html", label: "Quem Sou Eu", navLabel: "Quem Sou", icon: "user" },
  { id: "especialidades", href: "especialidades.html", label: "Especialidades", navLabel: "Especialidades", icon: "layers" },
  { id: "experiencia", href: "experiencia.html", label: "Formação & Experiência", navLabel: "Experiência", icon: "briefcase" },
  { id: "portfolio", href: "portfolio.html", label: "Portfólio", navLabel: "Portfólio", icon: "grid" },
  { id: "contato", href: "contato.html", label: "Contato", navLabel: "Contato", icon: "mail" }
];

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function iconSvg(name) {
  const map = {
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
    layers: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>',
    briefcase: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>',
    grid: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><polyline points="7 7 17 7 17 17"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };
  return map[name] || "";
}

export function showToast(msg) {
  let el = document.getElementById("site-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "site-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.style.display = "none";
  }, 2400);
}

export async function copyText(text, successMsg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMsg);
  } catch {
    const tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
    showToast(successMsg);
  }
}

function getTheme() {
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeBtn = document.getElementById("fab-theme-btn");
  if (themeBtn) {
    const isLight = theme === "light";
    themeBtn.innerHTML = `<span>${isLight ? "Modo Escuro" : "Modo Claro"}</span>${iconSvg(isLight ? "moon" : "sun")}`;
  }
}

function isFocusMode() {
  return localStorage.getItem(FOCUS_KEY) === "true";
}

function applyFocusMode(active) {
  document.body.classList.toggle("focus-mode", active);
  localStorage.setItem(FOCUS_KEY, String(active));
  const focusBtn = document.getElementById("fab-focus-btn");
  if (focusBtn) {
    focusBtn.innerHTML = `<span>${active ? "Mostrar Fundo" : "Modo Foco"}</span>${iconSvg("eye")}`;
  }
}

function startStarfield() {
  const canvas = document.getElementById("starfield-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let w = 0;
  let h = 0;
  let rafId = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(78, Math.max(32, Math.floor((w * h) / 18000)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      r: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.65 + 0.25
    }));
  }

  function draw() {
    if (document.body.classList.contains("focus-mode")) {
      ctx.clearRect(0, 0, w, h);
      rafId = requestAnimationFrame(draw);
      return;
    }

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const starColor = isLight ? "79, 57, 246" : "210, 214, 255";
    const lineColor = isLight ? "79, 57, 246" : "125, 135, 255";

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      if (!prefersReduced) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > w) s.vx *= -1;
        if (s.y < 0 || s.y > h) s.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starColor}, ${s.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dx = s.x - s2.x;
        const dy = s.y - s2.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${(1 - dist / 135) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (!prefersReduced) {
      rafId = requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
    if (prefersReduced) draw();
  });

  return () => cancelAnimationFrame(rafId);
}

export function initShell(pageId) {
  const shell = document.getElementById("app-shell");
  const main = document.getElementById("page-root");
  if (!shell || !main) return;

  // Starfield canvas
  const canvas = document.createElement("canvas");
  canvas.id = "starfield-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  // Top navigation bar across all pages
  const routeObj = ROUTES.find((r) => r.id === pageId);
  const header = document.createElement("header");
  header.className = "subpage-header";
  header.innerHTML = `
    <div class="subpage-header-inner">
      <a class="brand-chip" href="index.html">
        <img class="brand-chip-img" src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}">
        <span>${esc(PROFILE.name)}</span>
      </a>
      <nav class="top-links" aria-label="Páginas do portfólio">
        ${ROUTES.map(
          (r) => `<a class="top-link ${r.id === pageId ? "is-active" : ""}" href="${r.href}">${esc(r.navLabel)}</a>`
        ).join("")}
      </nav>
      <span class="mobile-page-tag">${esc(routeObj ? routeObj.navLabel : "")}</span>
    </div>
  `;
  shell.prepend(header);

  // Footer
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span>${esc(PROFILE.name)} · Head de Marketing · Aracaju, SE</span>
      <div class="footer-links">
        <a href="portfolio.html">Portfólio (23)</a>
        <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${esc(PROFILE.behance)}" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  `;
  shell.appendChild(footer);

  // Floating Action Button Menu (exact visual pattern from heikkihellgren.dev)
  const fabRoot = document.createElement("div");
  fabRoot.className = "fab-root";
  fabRoot.innerHTML = `
    <div id="fab-menu" class="fab-menu" aria-hidden="true">
      ${ROUTES.map(
        (r) => `
        <a class="fab-pill ${r.id === pageId ? "is-active" : ""}" href="${r.href}">
          <span>${esc(r.label)}</span>
          ${iconSvg(r.icon)}
        </a>
      `
      ).join("")}
      <div class="fab-divider"></div>
      <button type="button" class="fab-pill fab-pill--utility" id="fab-focus-btn"></button>
      <button type="button" class="fab-pill fab-pill--utility" id="fab-theme-btn"></button>
    </div>
    <button type="button" class="fab-trigger" id="fab-toggle" aria-expanded="false" aria-label="Alternar navegação">
      ${iconSvg("menu")}
    </button>
  `;
  document.body.appendChild(fabRoot);

  applyTheme(getTheme());
  applyFocusMode(isFocusMode());
  startStarfield();

  const fabToggle = document.getElementById("fab-toggle");
  const fabMenu = document.getElementById("fab-menu");

  function setMenuOpen(open) {
    if (!fabToggle || !fabMenu) return;
    fabMenu.classList.toggle("is-open", open);
    fabMenu.setAttribute("aria-hidden", String(!open));
    fabToggle.classList.toggle("is-open", open);
    fabToggle.setAttribute("aria-expanded", String(open));
    fabToggle.innerHTML = iconSvg(open ? "close" : "menu");
  }

  fabToggle?.addEventListener("click", () => {
    const isOpen = fabMenu?.classList.contains("is-open");
    setMenuOpen(!isOpen);
  });

  document.getElementById("fab-focus-btn")?.addEventListener("click", () => {
    applyFocusMode(!isFocusMode());
  });

  document.getElementById("fab-theme-btn")?.addEventListener("click", () => {
    applyTheme(getTheme() === "dark" ? "light" : "dark");
  });

  document.addEventListener("click", (e) => {
    if (!fabRoot.contains(e.target) && fabMenu?.classList.contains("is-open")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  });
}
