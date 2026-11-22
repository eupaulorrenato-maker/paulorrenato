import {
  PROFILE,
  TYPING_ROLES,
  EDUCATION,
  BRANDS,
  SPECIALTIES,
  STACK_LIST,
  EXPERIENCES,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_BUTTONS
} from "./data.js";
import { initShell, esc, iconSvg, copyText } from "./shell.js";

function startTyping(el) {
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    el.textContent = TYPING_ROLES[0];
    return;
  }

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const word = TYPING_ROLES[wordIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx >= word.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
      setTimeout(tick, 55);
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % TYPING_ROLES.length;
        setTimeout(tick, 280);
        return;
      }
      setTimeout(tick, 32);
    }
  }
  tick();
}

function renderHome(root) {
  const featured = [
    PORTFOLIO_BUTTONS[20],
    PORTFOLIO_BUTTONS[7],
    PORTFOLIO_BUTTONS[2],
    PORTFOLIO_BUTTONS[3]
  ];

  root.innerHTML = `
    <section class="hero-stage" aria-label="Apresentação">
      <div class="portrait-wrap">
        <div class="portrait-glow"></div>
        <img class="portrait-img" src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}">
      </div>

      <h1 class="hero-h1">Olá, eu sou <span class="gradient-text">${esc(PROFILE.name)}.</span></h1>

      <p class="typing-line">Atuo com <span id="hero-typing" class="typing-word">${esc(TYPING_ROLES[0])}</span><span class="typing-cursor">|</span></p>

      <div class="hero-ctas">
        <a class="pill-btn" href="portfolio.html">
          <span>Ver portfólio</span>
          ${iconSvg("grid")}
        </a>
        <a class="pill-btn pill-btn--secondary" href="contato.html">
          <span>Fale comigo</span>
          ${iconSvg("mail")}
        </a>
      </div>

      <div class="status-pill">
        <span class="status-dot" aria-hidden="true"></span>
        <span>${esc(PROFILE.heroStatus)}</span>
      </div>
    </section>

    <div class="content-backdrop">
      <div class="container">
        <section class="section-head">
          <span class="section-eyebrow">Visão Geral</span>
          <h2 class="section-title">Estratégia que gera venda.</h2>
          <p class="section-lead">${esc(PROFILE.intro)}</p>
          <div style="margin-top:8px">
            <a class="pill-btn pill-btn--sm" href="quem-sou.html">Conhecer minha história</a>
          </div>
        </section>

        <section style="display:flex;flex-direction:column;gap:20px">
          <div class="section-head">
            <span class="section-eyebrow">Especialidades</span>
            <h2 class="section-title">O que eu coloco no ar</h2>
          </div>
          <div class="grid-3">
            ${SPECIALTIES.slice(0, 3)
              .map(
                (sp) => `
              <article class="glass-card">
                <span class="tag-pill" style="align-self:flex-start">${esc(sp.tag)}</span>
                <h3 class="card-title">${esc(sp.title)}</h3>
                <p class="card-text">${esc(sp.summary)}</p>
              </article>
            `
              )
              .join("")}
          </div>
          <div>
            <a class="pill-btn pill-btn--sm" href="especialidades.html">Ver todas as 7 especialidades</a>
          </div>
        </section>

        <section style="display:flex;flex-direction:column;gap:20px">
          <div class="section-head">
            <span class="section-eyebrow">Portfólio Direto</span>
            <h2 class="section-title">Acesso rápido aos projetos</h2>
            <p class="section-lead">Clique e vá direto ao trabalho publicado, sem intermediários.</p>
          </div>
          <div class="portfolio-links-grid">
            ${featured
              .map(
                (item) => `
              <a class="portfolio-link-btn" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
                <div class="portfolio-link-info">
                  <span class="portfolio-link-title">${esc(item.label)}</span>
                  <span class="portfolio-link-meta">${esc(item.meta)}</span>
                </div>
                <span class="portfolio-link-arrow" aria-hidden="true">${iconSvg("arrow")}</span>
              </a>
            `
              )
              .join("")}
          </div>
          <div>
            <a class="pill-btn pill-btn--accent pill-btn--sm" href="portfolio.html">Abrir todos os 23 links do portfólio</a>
          </div>
        </section>
      </div>
    </div>
  `;

  startTyping(document.getElementById("hero-typing"));
}

function renderQuemSou(root) {
  root.innerHTML = `
    <div class="content-backdrop" style="border-top:none">
      <div class="container">
        <section class="glass-card" style="display:flex;flex-direction:column;gap:20px">
          <div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap">
            <div class="portrait-wrap" style="width:104px;height:104px;margin-bottom:0;flex-shrink:0">
              <div class="portrait-glow"></div>
              <img class="portrait-img" src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}">
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;min-width:0;flex:1">
              <span class="section-eyebrow">Quem Sou Eu</span>
              <h1 class="section-title">${esc(PROFILE.name)}</h1>
              <p class="card-text" style="color:var(--text-muted)">${esc(PROFILE.role)}</p>
            </div>
          </div>
          <p class="card-text">${esc(PROFILE.intro)}</p>
          <p class="card-text">Tem empresa com tráfego caro, página lenta ou texto que não convence ninguém a clicar. Meu trabalho resolve exatamente essa ponta: diagnóstico real de funil, construção de páginas rápidas, SEO técnico, Google Meu Negócio e copy direta ao ponto.</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px">
            <a class="pill-btn pill-btn--accent pill-btn--sm" href="portfolio.html">Ver Portfólio (23)</a>
            <a class="pill-btn pill-btn--sm" href="experiencia.html">Formação &amp; Experiência</a>
          </div>
        </section>

        <section class="grid-2">
          <article class="glass-card">
            <span class="section-eyebrow">Produto &amp; Dados</span>
            <h2 class="card-title">Lado Analítico</h2>
            <ul class="clean-list">
              <li>Leitura de caminho de compra e funil no GA4, Search Console e Microsoft Clarity.</li>
              <li>Ciclos de Testes A/B em anúncios e páginas visando derrubar CPA.</li>
              <li>Product Ownership: requisitos, User Stories, backlog no ClickUp e validação no Figma.</li>
              <li>CRM e nutrição automatizada em HubSpot e RD Station.</li>
            </ul>
          </article>

          <article class="glass-card">
            <span class="section-eyebrow">Criação &amp; Escala</span>
            <h2 class="card-title">Lado Criativo</h2>
            <ul class="clean-list">
              <li>Mais de 600 artigos publicados em português e inglês.</li>
              <li>Autor do conceito oficial do Forró Caju 2025 (Prefeitura de Aracaju).</li>
              <li>Campanhas, slogans, roteiros de vídeo/TV e ghostwriting.</li>
              <li>Operação prática no Brasil e nos EUA, incluindo contas de iGaming.</li>
            </ul>
          </article>
        </section>

        <section class="glass-card">
          <span class="section-eyebrow">Contas &amp; Projetos</span>
          <h2 class="card-title">Marcas e frentes em que já atuei</h2>
          <div class="tag-row">
            ${BRANDS.map((b) => `<span class="tag-pill">${esc(b)}</span>`).join("")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderEspecialidades(root) {
  root.innerHTML = `
    <div class="content-backdrop" style="border-top:none">
      <div class="container">
        <section class="section-head">
          <span class="section-eyebrow">Especialidades</span>
          <h1 class="section-title">Do código da página ao texto que fecha a venda.</h1>
          <p class="section-lead">Atuação completa em estratégia digital, construção de sites, Google Meu Negócio, SEO/GEO, CRO e copywriting de performance.</p>
        </section>

        <section class="grid-2">
          ${SPECIALTIES.map(
            (sp) => `
            <article class="glass-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                <span class="tag-pill">${esc(sp.tag)}</span>
              </div>
              <h2 class="card-title">${esc(sp.title)}</h2>
              <p class="card-text">${esc(sp.summary)}</p>
              <ul class="clean-list">
                ${sp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
              </ul>
            </article>
          `
          ).join("")}
        </section>

        <section class="glass-card">
          <span class="section-eyebrow">Ferramentas &amp; Stack</span>
          <h2 class="card-title">O que uso no dia a dia</h2>
          <div class="tag-row">
            ${STACK_LIST.map((tool) => `<span class="tag-pill">${esc(tool)}</span>`).join("")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderExperiencia(root) {
  root.innerHTML = `
    <div class="content-backdrop" style="border-top:none">
      <div class="container">
        <section class="section-head">
          <span class="section-eyebrow">Trajetória Profissional</span>
          <h1 class="section-title">Formação &amp; Experiência</h1>
          <p class="section-lead">Agências, coordenação de marketing e produto, mercado norte-americano, setor público e consultoria.</p>
        </section>

        <section class="glass-card">
          <span class="section-eyebrow">Formação Acadêmica</span>
          <h2 class="card-title">${esc(EDUCATION.course)}</h2>
          <p class="card-text" style="color:var(--accent-indigo)">${esc(EDUCATION.institution)} · ${esc(EDUCATION.period)}</p>
          <p class="card-text">${esc(EDUCATION.note)}</p>
        </section>

        <section class="timeline" aria-label="Histórico de experiências">
          ${EXPERIENCES.map(
            (exp) => `
            <article class="timeline-item glass-card">
              <span class="timeline-dot" aria-hidden="true"></span>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
                <h2 class="card-title">${esc(exp.company)}</h2>
                <span class="tag-pill">${esc(exp.role)}</span>
              </div>
              <p class="card-text">${esc(exp.summary)}</p>
              <ul class="clean-list">
                ${exp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
              </ul>
            </article>
          `
          ).join("")}
        </section>
      </div>
    </div>
  `;
}

function renderPortfolio(root) {
  let activeCat = "todos";
  let query = "";

  root.innerHTML = `
    <div class="content-backdrop" style="border-top:none">
      <div class="container container--wide">
        <section class="section-head">
          <span class="section-eyebrow">Portfólio Completo</span>
          <h1 class="section-title">Trabalhos publicados (${PORTFOLIO_BUTTONS.length})</h1>
        </section>

        <section style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between">
          <div class="filter-pills" id="port-filters">
            ${PORTFOLIO_CATEGORIES.map((c) => {
              const count =
                c.id === "todos"
                  ? PORTFOLIO_BUTTONS.length
                  : PORTFOLIO_BUTTONS.filter((b) => b.category === c.id).length;
              return `<button type="button" class="filter-pill ${c.id === activeCat ? "is-active" : ""}" data-cat="${c.id}">${esc(c.label)} (${count})</button>`;
            }).join("")}
          </div>
          <div style="flex:0 1 280px;width:100%">
            <input type="search" id="port-search" class="input-field" placeholder="Buscar projeto ou setor...">
          </div>
        </section>

        <section class="portfolio-links-grid" id="port-grid"></section>
      </div>
    </div>
  `;

  function paint() {
    const grid = document.getElementById("port-grid");
    if (!grid) return;
    const q = query.toLowerCase();

    const list = PORTFOLIO_BUTTONS.filter((item) => {
      const catOk = activeCat === "todos" || item.category === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      return `${item.label} ${item.meta}`.toLowerCase().includes(q);
    });

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="glass-card" style="grid-column:1 / -1;align-items:center;text-align:center">
          <p class="card-title">Nenhum botão encontrado com "${esc(query)}".</p>
          <button type="button" class="pill-btn pill-btn--sm" id="port-reset">Mostrar todos os ${PORTFOLIO_BUTTONS.length} botões</button>
        </div>
      `;
      document.getElementById("port-reset")?.addEventListener("click", () => {
        activeCat = "todos";
        query = "";
        const s = document.getElementById("port-search");
        if (s) s.value = "";
        root.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-cat") === "todos"));
        paint();
      });
      return;
    }

    grid.innerHTML = list
      .map(
        (item) => `
      <a class="portfolio-link-btn" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
        <div class="portfolio-link-info">
          <span class="portfolio-link-title">${esc(item.label)}</span>
          <span class="portfolio-link-meta">${esc(item.meta)}</span>
        </div>
        <span class="portfolio-link-arrow" aria-hidden="true">${iconSvg("arrow")}</span>
      </a>
    `
      )
      .join("");
  }

  root.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.getAttribute("data-cat");
      root.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      paint();
    });
  });

  const searchInput = document.getElementById("port-search");
  searchInput?.addEventListener("input", () => {
    query = searchInput.value.trim();
    paint();
  });

  paint();
}

function renderContato(root) {
  root.innerHTML = `
    <div class="content-backdrop" style="border-top:none">
      <div class="container">
        <section class="section-head">
          <span class="section-eyebrow">Contato</span>
          <h1 class="section-title">Vamos tirar seu projeto do papel.</h1>
          <p class="section-lead">Escolha o canal mais prático ou mande sua mensagem direto no meu WhatsApp.</p>
        </section>

        <section class="grid-3">
          <article class="glass-card">
            <span class="section-eyebrow">WhatsApp</span>
            <h2 class="card-title">${esc(PROFILE.whatsappDisplay)}</h2>
            <p class="card-text">Resposta rápida sobre projetos, sites, SEO ou vagas.</p>
            <a class="pill-btn pill-btn--accent pill-btn--sm" style="margin-top:auto" href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
          </article>

          <article class="glass-card">
            <span class="section-eyebrow">E-mail</span>
            <h2 class="card-title" style="font-size:1.05rem;word-break:break-all">${esc(PROFILE.email)}</h2>
            <p class="card-text">Envio de escopos, propostas e documentos.</p>
            <div style="display:flex;gap:8px;margin-top:auto">
              <a class="pill-btn pill-btn--sm" style="flex:1" href="mailto:${esc(PROFILE.email)}">Abrir e-mail</a>
              <button type="button" class="pill-btn pill-btn--sm" id="copy-email-btn">Copiar</button>
            </div>
          </article>

          <article class="glass-card">
            <span class="section-eyebrow">Redes</span>
            <h2 class="card-title">LinkedIn &amp; Behance</h2>
            <p class="card-text">Conexão profissional e acervo criativo de 34 projetos.</p>
            <div style="display:flex;gap:8px;margin-top:auto">
              <a class="pill-btn pill-btn--sm" style="flex:1" href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a class="pill-btn pill-btn--sm" style="flex:1" href="${esc(PROFILE.behance)}" target="_blank" rel="noopener noreferrer">Behance</a>
            </div>
          </article>
        </section>

        <section class="glass-card">
          <span class="section-eyebrow">Mensagem Rápida</span>
          <h2 class="card-title">Mandar direto no WhatsApp</h2>
          <div class="grid-2">
            <input type="text" id="c-name" class="input-field" placeholder="Seu nome">
            <input type="text" id="c-topic" class="input-field" placeholder="Assunto (ex: site, SEO, Google Meu Negócio, copy)">
          </div>
          <textarea id="c-msg" class="textarea-field" placeholder="Conte em poucas linhas o que precisa resolver..."></textarea>
          <div style="display:flex;flex-wrap:wrap;gap:12px">
            <a class="pill-btn pill-btn--accent" id="c-send-wa" href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">Enviar no WhatsApp</a>
            <button type="button" class="pill-btn" id="c-copy-btn">Copiar texto</button>
          </div>
        </section>
      </div>
    </div>
  `;

  function buildMsg() {
    const n = document.getElementById("c-name")?.value.trim();
    const t = document.getElementById("c-topic")?.value.trim();
    const m = document.getElementById("c-msg")?.value.trim();
    const parts = ["Olá Paulo Renato!"];
    if (n) parts.push(`Meu nome é ${n}.`);
    if (t) parts.push(`Assunto: ${t}.`);
    if (m) parts.push(m);
    return parts.join("\n");
  }

  function updateLink() {
    const btn = document.getElementById("c-send-wa");
    if (btn) btn.setAttribute("href", `${PROFILE.whatsappUrl}?text=${encodeURIComponent(buildMsg())}`);
  }

  ["c-name", "c-topic", "c-msg"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", updateLink);
  });

  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    copyText(PROFILE.email, "E-mail copiado!");
  });

  document.getElementById("c-copy-btn")?.addEventListener("click", () => {
    copyText(buildMsg(), "Mensagem copiada!");
  });
}

function bootstrap() {
  const pageId = document.body.getAttribute("data-page") || "home";
  initShell(pageId);

  const root = document.getElementById("page-root");
  if (!root) return;

  switch (pageId) {
    case "quem-sou":
      renderQuemSou(root);
      break;
    case "especialidades":
      renderEspecialidades(root);
      break;
    case "experiencia":
      renderExperiencia(root);
      break;
    case "portfolio":
      renderPortfolio(root);
      break;
    case "contato":
      renderContato(root);
      break;
    default:
      renderHome(root);
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
