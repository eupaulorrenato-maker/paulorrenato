import { PROFILE } from "./data.js";

export const ROUTES = [
  { id: "home", href: "index.html", label: "Início" },
  { id: "quem-sou", href: "quem-sou.html", label: "Quem Sou" },
  { id: "especialidades", href: "especialidades.html", label: "Especialidades" },
  { id: "experiencia", href: "experiencia.html", label: "Experiência" },
  { id: "portfolio", href: "portfolio.html", label: "Portfólio" },
  { id: "contato", href: "contato.html", label: "Contato" }
];

export const HOME_SECTIONS = [
  { id: "como-atuamos", label: "Como atuo", href: "index.html#como-atuamos" },
  { id: "metodo", label: "Método", href: "index.html#metodo" },
  { id: "especialidades-home", label: "Especialidades", href: "index.html#especialidades-home" },
  { id: "portfolio-home", label: "Portfólio (23)", href: "index.html#portfolio-home" },
  { id: "trajetoria-link", label: "Experiência", href: "experiencia.html" },
  { id: "quem-sou-link", label: "Quem Sou", href: "quem-sou.html" }
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
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    ext: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><polyline points="7 7 17 7 17 17"/></svg>',
    left: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    web: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    compass: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    sliders: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    pen: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
    spark: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  };
  return map[name] || "";
}

export function hexStampSvg() {
  return `
    <svg class="hc-hex-stamp" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="40,5 70,22 70,58 40,75 10,58 10,22" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2"/>
      <polygon points="40,12 64,26 64,54 40,68 16,54 16,26" stroke="currentColor" stroke-width="1"/>
      <text x="40" y="38" text-anchor="middle" fill="currentColor" font-size="8.5" font-weight="700" letter-spacing="1.5">GROWTH</text>
      <text x="40" y="49" text-anchor="middle" fill="currentColor" font-size="7.5" font-weight="600" letter-spacing="1.2">BR &amp; EUA</text>
    </svg>
  `;
}

export function globeWatermarkSvg() {
  return `
    <svg class="hc-globe-watermark" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="100" r="88" stroke="#111213" stroke-width="1.2"/>
      <ellipse cx="100" cy="100" rx="58" ry="88" stroke="#111213" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="26" ry="88" stroke="#111213" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="88" ry="54" stroke="#111213" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="88" ry="22" stroke="#111213" stroke-width="1"/>
      <line x1="12" y1="100" x2="188" y2="100" stroke="#111213" stroke-width="1"/>
      <line x1="100" y1="12" x2="100" y2="188" stroke="#111213" stroke-width="1"/>
    </svg>
  `;
}

export function heroSculptureSvg() {
  return `
    <svg viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="g-pink" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFF5F7"/>
          <stop offset="55%" stop-color="#F5D0FE"/>
          <stop offset="100%" stop-color="#E2B6CF"/>
        </radialGradient>
        <radialGradient id="g-amber" cx="32%" cy="28%" r="68%">
          <stop offset="0%" stop-color="#FFF3B0"/>
          <stop offset="50%" stop-color="#FFD13B"/>
          <stop offset="100%" stop-color="#E09F00"/>
        </radialGradient>
        <radialGradient id="g-peach" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFE5D0"/>
          <stop offset="60%" stop-color="#FFA366"/>
          <stop offset="100%" stop-color="#E06D2B"/>
        </radialGradient>
      </defs>

      <!-- Bottom Architectural Wireframe Mesh Sphere & Cube -->
      <g opacity="0.65" stroke="#111213" stroke-width="1">
        <circle cx="235" cy="390" r="118"/>
        <ellipse cx="235" cy="390" rx="86" ry="118"/>
        <ellipse cx="235" cy="390" rx="48" ry="118"/>
        <ellipse cx="235" cy="390" rx="118" ry="74"/>
        <ellipse cx="235" cy="390" rx="118" ry="34"/>
        <rect x="378" y="365" width="96" height="106" fill="none"/>
        <line x1="398" y1="365" x2="398" y2="471"/>
        <line x1="418" y1="365" x2="418" y2="471"/>
        <line x1="438" y1="365" x2="438" y2="471"/>
        <line x1="458" y1="365" x2="458" y2="471"/>
        <line x1="378" y1="388" x2="474" y2="388"/>
        <line x1="378" y1="412" x2="474" y2="412"/>
        <line x1="378" y1="436" x2="474" y2="436"/>
      </g>

      <!-- Upper Arch of Pastel & Frosted 3D Spheres -->
      <circle cx="145" cy="145" r="38" fill="url(#g-pink)"/>
      <circle cx="195" cy="95" r="44" fill="url(#g-pink)"/>
      <circle cx="268" cy="76" r="48" fill="url(#g-pink)"/>
      <circle cx="342" cy="92" r="42" fill="url(#g-pink)"/>
      <circle cx="398" cy="135" r="46" fill="url(#g-pink)"/>
      <circle cx="428" cy="195" r="36" fill="url(#g-pink)"/>

      <!-- Left & Right Golden 3D Voxel / Sphere Cluster -->
      <rect x="82" y="298" width="54" height="54" rx="10" fill="url(#g-amber)"/>
      <rect x="116" y="336" width="48" height="48" rx="10" fill="url(#g-amber)"/>
      <circle cx="115" cy="272" r="30" fill="url(#g-amber)"/>
      <circle cx="442" cy="264" r="34" fill="url(#g-amber)"/>
      <circle cx="462" cy="316" r="26" fill="url(#g-amber)"/>
      <rect x="424" y="332" width="56" height="36" rx="8" fill="url(#g-peach)"/>
    </svg>
  `;
}

export function voxelCubeSvg() {
  return `
    <svg viewBox="0 0 280 200" width="240" height="170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="margin-left:auto">
      <defs>
        <linearGradient id="vc-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFE0B2"/>
          <stop offset="100%" stop-color="#FFA366"/>
        </linearGradient>
        <linearGradient id="vc-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF9E5E"/>
          <stop offset="100%" stop-color="#D95B18"/>
        </linearGradient>
      </defs>
      <rect x="44" y="26" width="166" height="122" rx="16" fill="url(#vc-body)" fill-opacity="0.88" stroke="#FFE0B2" stroke-opacity="0.55" stroke-width="1.5"/>
      <rect x="58" y="14" width="138" height="22" rx="8" fill="url(#vc-top)"/>
      <circle cx="88" cy="78" r="18" fill="#FFF3E0" fill-opacity="0.75"/>
      <circle cx="132" cy="92" r="22" fill="#FFB74D" fill-opacity="0.85"/>
      <circle cx="172" cy="74" r="16" fill="#FFE0B2" fill-opacity="0.7"/>
      <rect x="68" y="122" width="26" height="36" rx="5" fill="#111213"/>
      <rect x="114" y="122" width="26" height="36" rx="5" fill="#111213"/>
      <rect x="164" y="146" width="38" height="32" rx="6" fill="url(#vc-top)"/>
      <rect x="200" y="38" width="34" height="104" stroke="#FFFFFF" stroke-opacity="0.28" stroke-dasharray="4 3"/>
    </svg>
  `;
}

export function boltCapsuleSvg() {
  return `
    <svg viewBox="0 0 260 150" width="220" height="128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bc-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#B0B5BA" stop-opacity="0.55"/>
        </linearGradient>
      </defs>
      <g transform="rotate(-18 130 75)">
        <rect x="48" y="35" width="164" height="76" rx="38" fill="url(#bc-glass)" stroke="#111213" stroke-opacity="0.35" stroke-width="1.5"/>
        <ellipse cx="64" cy="73" rx="16" ry="34" fill="#E5E7E8" stroke="#111213" stroke-opacity="0.45" stroke-width="1.5"/>
        <polygon points="128,22 98,74 126,74 114,126 156,66 128,66" fill="#FF8C24"/>
      </g>
    </svg>
  `;
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

export function initShell(pageId) {
  const shell = document.getElementById("app-shell");
  const main = document.getElementById("page-root");
  if (!shell || !main) return;

  const subPillsHtml =
    pageId === "home"
      ? HOME_SECTIONS.map(
          (s, idx) =>
            `<a class="hc-subpill ${idx === 0 ? "is-active" : ""}" data-subpill="${s.id}" href="${s.href}">${esc(s.label)}</a>`
        ).join("")
      : ROUTES.map(
          (r) =>
            `<a class="hc-subpill ${r.id === pageId ? "is-active" : ""}" href="${r.href}">${esc(r.label)}</a>`
        ).join("");

  const headerWrap = document.createElement("div");
  headerWrap.className = "hc-header-wrap";
  headerWrap.innerHTML = `
    <header class="hc-topbar">
      <div class="hc-topbar-inner">
        <a class="hc-brand" href="index.html">
          <img class="hc-brand-avatar" src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}">
          <span class="hc-brand-word">${esc(PROFILE.name)}</span>
          <span class="hc-brand-badge">Growth</span>
        </a>

        <nav class="hc-PrimaryNav" aria-label="Menu principal">
          ${ROUTES.map(
            (r) => `<a class="hc-nav-link ${r.id === pageId ? "is-active" : ""}" href="${r.href}">${esc(r.label)}</a>`
          ).join("")}
        </nav>

        <button type="button" class="hc-mobile-toggle" id="hc-mob-btn" aria-label="Menu" aria-expanded="false">
          ${iconSvg("menu")}
        </button>
      </div>

      <div class="hc-mobile-drawer" id="hc-mob-drawer">
        ${ROUTES.map(
          (r) => `<a class="hc-mobile-link ${r.id === pageId ? "is-active" : ""}" href="${r.href}">${esc(r.label)}</a>`
        ).join("")}
      </div>
    </header>

    <div class="hc-subbar">
      <div class="hc-subbar-inner">
        <nav class="hc-subpills" aria-label="Atalhos da página">
          ${subPillsHtml}
        </nav>
        <a class="hc-cta-black" href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </a>
      </div>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "hc-footer";
  footer.innerHTML = `
    <div class="hc-footer-inner">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="hc-brand-word" style="font-size:1.1rem">${esc(PROFILE.name)}</span>
        <span class="hc-brand-badge">Growth</span>
        <span style="margin-left:6px">Aracaju, SE · Brasil &amp; EUA</span>
      </div>
      <div class="hc-footer-links">
        <a href="portfolio.html">Portfólio (23)</a>
        <a href="especialidades.html">Especialidades</a>
        <a href="experiencia.html">Experiência</a>
        <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${esc(PROFILE.behance)}" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  `;

  shell.prepend(headerWrap);
  shell.appendChild(footer);

  // Mobile toggle
  const mobBtn = document.getElementById("hc-mob-btn");
  const mobDrawer = document.getElementById("hc-mob-drawer");
  mobBtn?.addEventListener("click", () => {
    const open = mobDrawer?.classList.toggle("is-open");
    mobBtn.setAttribute("aria-expanded", String(Boolean(open)));
    mobBtn.innerHTML = iconSvg(open ? "close" : "menu");
  });

  // Scroll-spy on Home sub-bar pills
  if (pageId === "home") {
    const sectionIds = ["como-atuamos", "metodo", "especialidades-home", "portfolio-home"];
    window.addEventListener(
      "scroll",
      () => {
        let current = sectionIds[0];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 180) {
            current = id;
          }
        }
        document.querySelectorAll("[data-subpill]").forEach((pill) => {
          pill.classList.toggle("is-active", pill.getAttribute("data-subpill") === current);
        });
      },
      { passive: true }
    );
  }
}
