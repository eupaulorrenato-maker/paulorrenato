import {
  PROFILE,
  EDUCATION,
  BRANDS,
  SPECIALTIES,
  STACK_LIST,
  EXPERIENCES,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_BUTTONS
} from "./data.js";
import {
  initShell,
  esc,
  iconSvg,
  hexStampSvg,
  globeWatermarkSvg,
  heroSculptureSvg,
  voxelCubeSvg,
  boltCapsuleSvg,
  copyText
} from "./shell.js";

const SPEC_ICONS = ["web", "compass", "search", "sliders", "mail", "pen", "spark"];
const HERO_WORDS = ["sites.", "funis.", "anúncios.", "negócios."];

function startHeroWordRotation() {
  const el = document.getElementById("hero-rot-word");
  if (!el) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % HERO_WORDS.length;
    el.textContent = HERO_WORDS[idx];
  }, 2400);
}

function bindCarousel(trackId, prevBtnId, nextBtnId, counterId, totalCount) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const counter = document.getElementById(counterId);
  if (!track || !prevBtn || !nextBtn) return;

  function getStep() {
    const firstCard = track.firstElementChild;
    if (!firstCard) return 300;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16") || 16;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateCounter() {
    if (!counter) return;
    const step = getStep();
    const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    if (track.scrollLeft >= maxScroll - 8) {
      counter.textContent = `${totalCount} / ${totalCount}`;
      return;
    }
    const idx = Math.min(totalCount, Math.max(1, Math.round(track.scrollLeft / step) + 1));
    counter.textContent = `${idx} / ${totalCount}`;
  }

  nextBtn.addEventListener("click", () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 8) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 8) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    }
  });

  track.addEventListener("scroll", updateCounter, { passive: true });
  window.addEventListener("resize", updateCounter);
  updateCounter();
}

function mountWizardForm(containerId) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  const state = {
    step: 1,
    name: "",
    focus: "Construção de Site / LP",
    goal: ""
  };

  const focusOptions = [
    "Construção de Site / LP",
    "SEO, GEO & Meu Negócio",
    "CRO & Testes A/B",
    "Copywriting & Conteúdo"
  ];

  function buildWaHref() {
    const lines = ["Olá Paulo Renato!"];
    if (state.name) lines.push(`Meu nome é ${state.name}.`);
    if (state.focus) lines.push(`Frente principal: ${state.focus}.`);
    if (state.goal) lines.push(`Objetivo: ${state.goal}`);
    return `${PROFILE.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function render() {
    const barsHtml = [1, 2, 3, 4]
      .map((n) => `<span class="hc-progress-seg ${n <= state.step ? "is-filled" : ""}"></span>`)
      .join("");

    let bodyHtml = "";
    if (state.step === 1) {
      bodyHtml = `
        <div class="hc-form-question">Como posso te chamar?</div>
        <input type="text" id="${containerId}-input" class="hc-input" value="${esc(state.name)}" placeholder="Digite seu nome ou empresa">
        <div style="display:flex;align-items:center;gap:10px">
          <button type="button" class="hc-btn-amber" id="${containerId}-next">
            <span>Continuar</span>
            ${iconSvg("arrow")}
          </button>
        </div>
      `;
    } else if (state.step === 2) {
      bodyHtml = `
        <div class="hc-form-question">Qual frente você quer destravar?</div>
        <div class="hc-choice-grid">
          ${focusOptions
            .map(
              (opt) =>
                `<button type="button" class="hc-choice-btn ${state.focus === opt ? "is-selected" : ""}" data-wiz-opt="${esc(opt)}">${esc(opt)}</button>`
            )
            .join("")}
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button type="button" class="hc-btn-amber" id="${containerId}-next">
            <span>Continuar</span>
            ${iconSvg("arrow")}
          </button>
          <button type="button" class="hc-btn-outline-light" id="${containerId}-prev">Voltar</button>
        </div>
      `;
    } else if (state.step === 3) {
      bodyHtml = `
        <div class="hc-form-question">Conte em uma linha sua meta principal</div>
        <input type="text" id="${containerId}-goal" class="hc-input" value="${esc(state.goal)}" placeholder="Ex: criar site novo, subir no Google, vender mais">
        <div style="display:flex;align-items:center;gap:10px">
          <button type="button" class="hc-btn-amber" id="${containerId}-next">
            <span>Continuar</span>
            ${iconSvg("arrow")}
          </button>
          <button type="button" class="hc-btn-outline-light" id="${containerId}-prev">Voltar</button>
        </div>
      `;
    } else {
      bodyHtml = `
        <div class="hc-form-question">Tudo pronto, ${esc(state.name || "vamos conversar")}.</div>
        <p style="font-size:0.86rem;color:var(--muted)">Frente selecionada: <strong style="color:var(--ink)">${esc(state.focus)}</strong></p>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          <a class="hc-btn-amber" href="${esc(buildWaHref())}" target="_blank" rel="noopener noreferrer">
            <span>Enviar no WhatsApp</span>
            ${iconSvg("arrow")}
          </a>
          <button type="button" class="hc-btn-outline-light" id="${containerId}-reset">Recomeçar</button>
        </div>
      `;
    }

    wrap.innerHTML = `
      <div class="hc-form-profile">
        <img class="hc-form-photo" src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}">
        <div>
          <div class="hc-kicker" style="color:var(--ink)">FALE DIRETO COM PAULO RENATO</div>
          <div style="font-size:0.84rem;color:var(--muted);margin-top:2px">Estratégia, sites, SEO/GEO, CRO e copy no Brasil e EUA.</div>
        </div>
      </div>

      <div class="hc-progress-row">
        <div class="hc-progress-bars">${barsHtml}</div>
        <span class="hc-progress-count">${state.step} de 4</span>
      </div>

      ${bodyHtml}
    `;

    const nameInput = document.getElementById(`${containerId}-input`);
    nameInput?.addEventListener("input", () => {
      state.name = nameInput.value.trim();
    });
    nameInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        state.step = 2;
        render();
      }
    });

    const goalInput = document.getElementById(`${containerId}-goal`);
    goalInput?.addEventListener("input", () => {
      state.goal = goalInput.value.trim();
    });
    goalInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        state.step = 4;
        render();
      }
    });

    wrap.querySelectorAll("[data-wiz-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.focus = btn.getAttribute("data-wiz-opt");
        render();
      });
    });

    document.getElementById(`${containerId}-next`)?.addEventListener("click", () => {
      state.step = Math.min(4, state.step + 1);
      render();
    });

    document.getElementById(`${containerId}-prev`)?.addEventListener("click", () => {
      state.step = Math.max(1, state.step - 1);
      render();
    });

    document.getElementById(`${containerId}-reset`)?.addEventListener("click", () => {
      state.step = 1;
      render();
    });
  }

  render();
}

function renderHome(root) {
  root.innerHTML = `
    <div class="hc-container">
      <section class="hc-hero" aria-label="Apresentação principal">
        <div class="hc-hero-left">
          ${hexStampSvg()}

          <h1 class="hc-h1">
            Estratégia, dados e copy que aceleram seus <span id="hero-rot-word" class="hc-highlight-word">sites.</span>
          </h1>

          <p class="hc-lead" style="max-width:46ch">
            Visão analítica de produto digital somada à escrita criativa voltada a resultado. Projetos no Brasil e nos Estados Unidos.
          </p>

          <a class="hc-split-banner" href="portfolio.html">
            <div class="hc-split-left">
              <span class="hc-live-pill"><span class="hc-live-dot"></span>ATIVO</span>
              <div class="hc-split-meta">
                <span class="hc-split-title">Portfólio Completo</span>
                <span class="hc-split-sub">23 projetos publicados · +600 artigos</span>
                <span class="hc-split-chip">BR &amp; EUA · UFS</span>
              </div>
            </div>
            <div class="hc-split-right">
              <span>VER PROJETOS</span>
              <span style="margin-left:6px">${iconSvg("arrow")}</span>
            </div>
          </a>
        </div>

        <div class="hc-hero-right">
          <div class="hc-sculpture-bg">${heroSculptureSvg()}</div>
          <div class="hc-glass-form" id="hero-wizard-card"></div>
        </div>
      </section>
    </div>

    <section class="hc-brands-strip" aria-label="Marcas atendidas">
      <div class="hc-brands-inner">
        <span class="hc-kicker">MARCAS E CONTAS COM QUE JÁ TRABALHEI</span>
        <div class="hc-brands-row">
          ${BRANDS.slice(0, 8)
            .map((b) => `<span class="hc-brand-logo">${esc(b)}</span>`)
            .join("")}
        </div>
      </div>
    </section>

    <div class="hc-container">
      <!-- BENTO SECTION (Mirrors 'Como ensinamos') -->
      <section class="hc-section" id="como-atuamos">
        <div class="hc-section-head">
          <span class="hc-kicker">COMO EU ATUO</span>
          <h2 class="hc-h2" style="max-width:18ch">Produto, mídia e site falando a mesma língua.</h2>
        </div>

        <div class="hc-bento-grid">
          <div class="hc-bento-left">
            <article class="hc-card-problem">
              <span class="hc-pill-tag hc-pill-tag--white">! O problema</span>
              <h3 class="hc-h3">Site, anúncio e conteúdo separados</h3>
              <p class="hc-plugin-desc">Tráfego pago rodando, página lenta e texto sem força de venda. O visitante chega e sai sem converter.</p>
            </article>

            <article class="hc-card-light" style="flex:1">
              <span class="hc-pill-tag">O método</span>
              <h3 class="hc-h3">Diagnóstico &amp; CRO</h3>
              <p class="hc-plugin-desc">Leitura de funil no GA4, Search Console e Microsoft Clarity, com hipóteses claras e Testes A/B em quatro etapas.</p>
              ${globeWatermarkSvg()}
            </article>
          </div>

          <article class="hc-card-light hc-card-tall">
            <span class="hc-pill-tag">A execução</span>
            <div style="margin:28px 0">
              <div class="hc-h2--giant">Growth &amp; Copy</div>
              <p class="hc-lead" style="margin-top:16px;max-width:38ch;color:var(--ink-soft)">
                Construção de sites rápidos, SEO técnico, GEO, Google Meu Negócio, automação de CRM e copywriting em português e inglês.
              </p>
            </div>
            ${globeWatermarkSvg()}
          </article>
        </div>

        <div class="hc-bento-bottom">
          <article class="hc-card-light">
            <span class="hc-starburst">BR &amp;<br>EUA</span>
            <h3 class="hc-h3">Portfólio Publicado</h3>
            <span class="hc-plugin-meta">23 links diretos · 34 projetos no Behance</span>
            <p style="font-size:0.92rem;font-weight:600;margin-top:6px">Campanhas, vídeos, landing pages e artigos em produção.</p>
            <p class="hc-plugin-desc">Acesso direto aos trabalhos reais desenvolvidos no Brasil e no mercado norte-americano.</p>
            <div style="margin-top:10px">
              <a class="hc-btn-amber" href="portfolio.html">
                <span>Abrir Portfólio</span>
                ${iconSvg("arrow")}
              </a>
            </div>
          </article>

          <article class="hc-card-light">
            <h3 class="hc-h3">Trajetória &amp; Formação</h3>
            <span class="hc-plugin-meta">9 experiências · Publicidade e Propaganda (UFS)</span>
            <p style="font-size:0.92rem;font-weight:600;margin-top:6px">Agências, produto digital, setor público e consultoria.</p>
            <p class="hc-plugin-desc">Passagens por MO4 Web, Instituto Empresariar, Escobar (EUA), Brand.it, Anova, Fullbar, Prefeitura de Aracaju e Search One Digital.</p>
            <div style="margin-top:auto;padding-top:10px">
              <a class="hc-underline-link" href="experiencia.html">
                <span>Conhecer trajetória completa</span>
                ${iconSvg("arrow")}
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- DARK SPOTLIGHT BLOCK (Mirrors 'Fundamentos') -->
      <section class="hc-dark-block" id="metodo">
        <div class="hc-dark-top">
          <div style="display:flex;flex-direction:column;gap:18px">
            <span class="hc-pill-tag hc-pill-tag--white">MÉTODO NA PRÁTICA</span>
            <h2 class="hc-h2" style="color:#FFFFFF;max-width:16ch">Do código da página ao texto que fecha a venda.</h2>
            <p style="color:var(--muted-light);max-width:48ch">
              Você não precisa contratar cinco pontas desconectadas. Uno arquitetura web, busca orgânica, dados de conversão e redação publicitária.
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:4px">
              <a class="hc-btn-amber" href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">
                <span>Chamar no WhatsApp</span>
                ${iconSvg("arrow")}
              </a>
              <a class="hc-btn-outline-dark" href="quem-sou.html">
                <span>Quem Sou Eu</span>
                ${iconSvg("arrow")}
              </a>
            </div>
          </div>
          <div>${voxelCubeSvg()}</div>
        </div>

        <div class="hc-dark-inner-grid">
          <div class="hc-dark-card">
            <div class="hc-num-list">
              <div class="hc-num-row">
                <span class="hc-num-index">01</span>
                <div>
                  <div class="hc-num-title">Diagnóstico de funil e dados</div>
                  <div class="hc-num-desc">GA4, Search Console e mapas de calor no Microsoft Clarity.</div>
                </div>
              </div>
              <div class="hc-num-row">
                <span class="hc-num-index">02</span>
                <div>
                  <div class="hc-num-title">Construção de sites e landing pages</div>
                  <div class="hc-num-desc">Páginas rápidas, responsivas e desenhadas com foco em conversão.</div>
                </div>
              </div>
              <div class="hc-num-row">
                <span class="hc-num-index">03</span>
                <div>
                  <div class="hc-num-title">SEO Técnico, GEO e Google Meu Negócio</div>
                  <div class="hc-num-desc">Posicionamento no Google, nas respostas de IA e nas buscas locais.</div>
                </div>
              </div>
              <div class="hc-num-row">
                <span class="hc-num-index">04</span>
                <div>
                  <div class="hc-num-title">Inbound Marketing, CRM e Agentes de IA</div>
                  <div class="hc-num-desc">HubSpot, RD Station e automação de rotinas com Skills e MCP.</div>
                </div>
              </div>
              <div class="hc-num-row">
                <span class="hc-num-index">05</span>
                <div>
                  <div class="hc-num-title">Copywriting BR/EUA e experimentos A/B</div>
                  <div class="hc-num-desc">Anúncios em Meta/Google Ads, roteiros e +600 artigos publicados.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="hc-dark-card">
            <div style="font-size:1.05rem;font-weight:500;color:#FFFFFF">O que entra na entrega</div>
            <ul class="hc-check-list">
              <li class="hc-check-item"><span class="hc-check-box"></span><span>Visão de Product Owner (ClickUp, User Stories e Figma).</span></li>
              <li class="hc-check-item"><span class="hc-check-box"></span><span>Escrita humana, direta e livre de clichês artificiais.</span></li>
              <li class="hc-check-item"><span class="hc-check-box"></span><span>Experiência comprovada em contas globais e setor público.</span></li>
              <li class="hc-check-item is-struck"><span class="hc-check-box"></span><span>Textão genérico sem meta de negócio.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- MID-GRAY CONTAINER: ESPECIALIDADES CAROUSEL (Mirrors 'Growth System™') -->
      <section class="hc-mid-block" id="especialidades-home">
        <div class="hc-carousel-head">
          <div style="display:flex;flex-direction:column;gap:10px">
            <span class="hc-kicker" style="color:var(--ink-soft)">ESPECIALIDADES · 7 FRENTES</span>
            <h2 class="hc-h2" style="max-width:16ch">O que eu coloco no ar.</h2>
            <p class="hc-plugin-desc" style="max-width:46ch">Gire nas setas ao lado ou deslize no celular e veja todas as 7 especialidades.</p>
          </div>
          <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
            ${boltCapsuleSvg()}
            <div class="hc-carousel-controls">
              <button type="button" class="hc-arrow-btn" id="spec-prev" aria-label="Voltar item">${iconSvg("left")}</button>
              <span class="hc-counter" id="spec-counter">1 / ${SPECIALTIES.length}</span>
              <button type="button" class="hc-arrow-btn" id="spec-next" aria-label="Avançar item">${iconSvg("right")}</button>
            </div>
          </div>
        </div>

        <div class="hc-track hc-track--specialties" id="spec-track">
          ${SPECIALTIES.map(
            (sp, i) => `
            <article class="hc-plugin-card">
              <div class="hc-plugin-top">
                <div class="hc-plugin-title-row">
                  <span>${iconSvg(SPEC_ICONS[i % SPEC_ICONS.length])}</span>
                  <span>${esc(sp.title)}</span>
                </div>
                <p class="hc-plugin-desc">${esc(sp.summary)}</p>
              </div>
              <div class="hc-plugin-foot">
                <span class="hc-plugin-meta">${esc(sp.tag)}</span>
              </div>
            </article>
          `
          ).join("")}
        </div>

        <div class="hc-summary-bar">
          <div class="hc-summary-col">
            <h3 class="hc-h3" style="font-size:1.7rem">Atuação ponta a ponta ou por frente específica.</h3>
          </div>
          <div class="hc-summary-col">
            <span style="color:var(--ink)">${iconSvg("compass")}</span>
            <div style="font-size:1.05rem;font-weight:500">Ferramentas &amp; Stack</div>
            <p class="hc-plugin-desc">GA4, Search Console, Clarity, Google Meu Negócio, HubSpot, RD Station, Figma, ClickUp, Meta Ads, Google Ads e Skills/MCP.</p>
          </div>
          <div class="hc-summary-col">
            <span style="color:var(--ink)">${iconSvg("spark")}</span>
            <div style="font-size:1.05rem;font-weight:500">Foco em conversão</div>
            <p class="hc-plugin-desc">Páginas, campanhas e textos desenhados visando reduzir custo por lead e aumentar vendas.</p>
          </div>
        </div>

        <div>
          <a class="hc-btn-amber" href="especialidades.html">
            <span>Ver detalhes das 7 especialidades</span>
            ${iconSvg("arrow")}
          </a>
        </div>
      </section>

      <!-- PORTFÓLIO DIRETO CAROUSEL (All 23 Items) -->
      <section class="hc-section" id="portfolio-home" style="padding-bottom:64px">
        <div class="hc-carousel-head" style="margin-bottom:24px">
          <div style="display:flex;flex-direction:column;gap:8px">
            <span class="hc-kicker">PORTFÓLIO DIRETO · 23 PROJETOS</span>
            <h2 class="hc-h2">Acesso rápido aos projetos.</h2>
            <p class="hc-lead">Clique e vá direto ao trabalho publicado.</p>
          </div>
          <div class="hc-carousel-controls">
            <button type="button" class="hc-arrow-btn" id="port-prev" aria-label="Voltar item">${iconSvg("left")}</button>
            <span class="hc-counter" id="port-counter">1 / ${PORTFOLIO_BUTTONS.length}</span>
            <button type="button" class="hc-arrow-btn" id="port-next" aria-label="Avançar item">${iconSvg("right")}</button>
          </div>
        </div>

        <div class="hc-track hc-track--portfolio" id="port-track">
          ${PORTFOLIO_BUTTONS.map(
            (item) => `
            <a class="hc-plugin-card" style="background:var(--bg-card)" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
              <div class="hc-plugin-top">
                <span class="hc-plugin-meta">#${item.id} · ${esc(item.meta)}</span>
                <div class="hc-plugin-title-row" style="font-size:1rem">${esc(item.label)}</div>
              </div>
              <div class="hc-plugin-foot">
                <span class="hc-pill-tag">Abrir projeto ${iconSvg("ext")}</span>
              </div>
            </a>
          `
          ).join("")}
        </div>

        <div style="margin-top:24px">
          <a class="hc-btn-amber" href="portfolio.html">
            <span>Abrir página com filtros e busca</span>
            ${iconSvg("arrow")}
          </a>
        </div>
      </section>
    </div>
  `;

  startHeroWordRotation();
  mountWizardForm("hero-wizard-card");
  bindCarousel("spec-track", "spec-prev", "spec-next", "spec-counter", SPECIALTIES.length);
  bindCarousel("port-track", "port-prev", "port-next", "port-counter", PORTFOLIO_BUTTONS.length);
}

function renderQuemSou(root) {
  root.innerHTML = `
    <div class="hc-container">
      <section class="hc-section">
        <div class="hc-bento-grid">
          <article class="hc-card-light" style="justify-content:center;align-items:flex-start;gap:18px">
            <div style="display:flex;align-items:center;gap:16px">
              <img src="${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}" style="width:84px;height:84px;border-radius:9999px;object-fit:cover;object-position:center 18%;border:2px solid var(--ink)">
              <div>
                <span class="hc-kicker">QUEM SOU EU</span>
                <h1 class="hc-h2" style="margin-top:4px">${esc(PROFILE.name)}</h1>
                <p class="hc-plugin-meta">${esc(PROFILE.location)}</p>
              </div>
            </div>
            <p class="hc-lead" style="color:var(--ink-soft)">${esc(PROFILE.intro)}</p>
            <p class="hc-plugin-desc">Tem empresa com tráfego caro, página lenta ou texto que não convence ninguém a clicar. Meu trabalho resolve exatamente essa ponta: diagnóstico real de funil, construção de páginas rápidas, SEO técnico, Google Meu Negócio e copy direta ao ponto.</p>
            <div style="display:flex;flex-wrap:wrap;gap:12px">
              <a class="hc-btn-amber" href="portfolio.html"><span>Ver Portfólio (23)</span>${iconSvg("arrow")}</a>
              <a class="hc-btn-outline-light" href="experiencia.html">Formação &amp; Experiência</a>
            </div>
          </article>

          <div class="hc-bento-left">
            <article class="hc-card-light">
              <span class="hc-pill-tag">Produto &amp; Dados</span>
              <h2 class="hc-h3">Lado Analítico</h2>
              <p class="hc-plugin-desc">Leitura de caminho de compra e funil no GA4, Search Console e Microsoft Clarity. Ciclos de Testes A/B, levantamento de requisitos, backlog no ClickUp, validação no Figma e automação em HubSpot e RD Station.</p>
              ${globeWatermarkSvg()}
            </article>

            <article class="hc-card-light">
              <span class="hc-pill-tag">Criação &amp; Escala</span>
              <h2 class="hc-h3">Lado Criativo</h2>
              <p class="hc-plugin-desc">Mais de 600 artigos publicados em português e inglês, autor do conceito oficial do Forró Caju 2025, roteiros de vídeo/TV, ghostwriting e campanhas no Brasil e nos EUA.</p>
              ${globeWatermarkSvg()}
            </article>
          </div>
        </div>

        <div class="hc-card-light" style="margin-top:20px">
          <span class="hc-kicker">CONTAS &amp; ECOSSISTEMAS</span>
          <h2 class="hc-h3">Marcas e projetos em que já atuei</h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">
            ${BRANDS.map((b) => `<span class="hc-btn-outline-light" style="padding:6px 14px;min-height:34px">${esc(b)}</span>`).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderEspecialidades(root) {
  root.innerHTML = `
    <div class="hc-container">
      <section class="hc-mid-block">
        <div class="hc-carousel-head">
          <div style="display:flex;flex-direction:column;gap:10px">
            <span class="hc-kicker" style="color:var(--ink-soft)">ESPECIALIDADES</span>
            <h1 class="hc-h1" style="max-width:18ch">Do código da página ao texto que fecha a venda.</h1>
            <p class="hc-lead" style="color:var(--ink-soft);max-width:54ch">Atuação completa em estratégia digital, construção de sites, Google Meu Negócio, SEO/GEO, CRO e copywriting de performance.</p>
          </div>
          ${boltCapsuleSvg()}
        </div>

        <div class="hc-grid-3">
          ${SPECIALTIES.map(
            (sp, i) => `
            <article class="hc-plugin-card" style="min-height:300px">
              <div class="hc-plugin-top">
                <div class="hc-plugin-title-row">
                  <span>${iconSvg(SPEC_ICONS[i % SPEC_ICONS.length])}</span>
                  <span>${esc(sp.title)}</span>
                </div>
                <p class="hc-plugin-desc">${esc(sp.summary)}</p>
                <ul style="padding-left:16px;margin-top:6px;display:flex;flex-direction:column;gap:6px;font-size:0.82rem;color:var(--ink-soft)">
                  ${sp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
                </ul>
              </div>
              <div class="hc-plugin-foot">
                <span class="hc-plugin-meta">${esc(sp.tag)}</span>
              </div>
            </article>
          `
          ).join("")}
        </div>
      </section>

      <section class="hc-dark-block">
        <span class="hc-pill-tag hc-pill-tag--white">FERRAMENTAS &amp; STACK</span>
        <h2 class="hc-h2" style="color:#FFFFFF">O que uso no dia a dia.</h2>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          ${STACK_LIST.map((tool) => `<span class="hc-btn-outline-dark" style="padding:8px 16px;min-height:38px">${esc(tool)}</span>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderExperiencia(root) {
  root.innerHTML = `
    <div class="hc-container">
      <section class="hc-section">
        <div class="hc-section-head">
          <span class="hc-kicker">TRAJETÓRIA PROFISSIONAL</span>
          <h1 class="hc-h1">Formação &amp; Experiência.</h1>
          <p class="hc-lead">Agências, coordenação de marketing e produto, mercado norte-americano, setor público e consultoria.</p>
        </div>

        <article class="hc-dark-block" style="margin-top:0">
          <span class="hc-pill-tag hc-pill-tag--white">FORMAÇÃO ACADÊMICA · ${esc(EDUCATION.period)}</span>
          <h2 class="hc-h2" style="color:#FFFFFF">${esc(EDUCATION.course)}</h2>
          <p style="font-size:1.1rem;color:var(--amber)">${esc(EDUCATION.institution)}</p>
          <p style="color:var(--muted-light);max-width:60ch">${esc(EDUCATION.note)}</p>
        </article>

        <div class="hc-grid-2">
          ${EXPERIENCES.map(
            (exp, idx) => `
            <article class="hc-plugin-card" style="background:var(--bg-card)">
              <div class="hc-plugin-top">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
                  <span class="hc-kicker">0${idx + 1}</span>
                  <span class="hc-pill-tag">${esc(exp.role)}</span>
                </div>
                <h2 class="hc-h3" style="margin-top:6px">${esc(exp.company)}</h2>
                <p class="hc-plugin-desc">${esc(exp.summary)}</p>
                <ul style="padding-left:16px;margin-top:6px;display:flex;flex-direction:column;gap:6px;font-size:0.84rem;color:var(--ink-soft)">
                  ${exp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
                </ul>
              </div>
            </article>
          `
          ).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderPortfolio(root) {
  let activeCat = "todos";
  let query = "";

  root.innerHTML = `
    <div class="hc-container">
      <section class="hc-section">
        <div class="hc-section-head">
          <span class="hc-kicker">PORTFÓLIO COMPLETO</span>
          <h1 class="hc-h1">Trabalhos publicados (${PORTFOLIO_BUTTONS.length})</h1>
        </div>

        <div class="hc-filter-row">
          <div class="hc-filter-pills" id="port-filters">
            ${PORTFOLIO_CATEGORIES.map((c) => {
              const count =
                c.id === "todos"
                  ? PORTFOLIO_BUTTONS.length
                  : PORTFOLIO_BUTTONS.filter((b) => b.category === c.id).length;
              return `<button type="button" class="hc-filter-btn ${c.id === activeCat ? "is-active" : ""}" data-cat="${c.id}">${esc(c.label)} (${count})</button>`;
            }).join("")}
          </div>
          <div style="flex:0 1 300px;width:100%">
            <input type="search" id="port-search" class="hc-input" placeholder="Buscar projeto ou setor...">
          </div>
        </div>

        <div class="hc-grid-3" id="port-grid"></div>
      </section>
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
        <div class="hc-card-light" style="grid-column:1 / -1;align-items:center;text-align:center">
          <h3 class="hc-h3">Nenhum projeto encontrado com "${esc(query)}".</h3>
          <button type="button" class="hc-btn-amber" id="port-reset">Mostrar todos os ${PORTFOLIO_BUTTONS.length} projetos</button>
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
      <a class="hc-plugin-card" style="background:var(--bg-card);min-height:210px" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
        <div class="hc-plugin-top">
          <span class="hc-plugin-meta">#${item.id} · ${esc(item.meta)}</span>
          <div class="hc-plugin-title-row">${esc(item.label)}</div>
        </div>
        <div class="hc-plugin-foot">
          <span class="hc-pill-tag">Abrir projeto ${iconSvg("ext")}</span>
        </div>
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
    <div class="hc-container">
      <section class="hc-hero">
        <div class="hc-hero-left">
          <span class="hc-kicker">CONTATO DIRETO</span>
          <h1 class="hc-h1">Vamos tirar seu projeto do papel.</h1>
          <p class="hc-lead">Escolha o canal mais prático ou responda as 4 etapas ao lado e fale comigo no WhatsApp.</p>

          <div class="hc-grid-2" style="width:100%">
            <article class="hc-card-light" style="padding:22px">
              <span class="hc-kicker">WHATSAPP</span>
              <h2 class="hc-h3" style="margin-top:4px">${esc(PROFILE.whatsappDisplay)}</h2>
              <div style="margin-top:10px">
                <a class="hc-btn-amber" href="${esc(PROFILE.whatsappUrl)}" target="_blank" rel="noopener noreferrer">
                  <span>Chamar agora</span>
                  ${iconSvg("arrow")}
                </a>
              </div>
            </article>

            <article class="hc-card-light" style="padding:22px">
              <span class="hc-kicker">E-MAIL</span>
              <h2 class="hc-h3" style="font-size:1.05rem;word-break:break-all;margin-top:4px">${esc(PROFILE.email)}</h2>
              <div style="display:flex;gap:8px;margin-top:10px">
                <a class="hc-btn-outline-light" href="mailto:${esc(PROFILE.email)}">Abrir</a>
                <button type="button" class="hc-btn-outline-light" id="copy-email-btn">Copiar</button>
              </div>
            </article>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px">
            <a class="hc-btn-outline-light" href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${iconSvg("ext")}</a>
            <a class="hc-btn-outline-light" href="${esc(PROFILE.behance)}" target="_blank" rel="noopener noreferrer">Behance (34 projetos) ${iconSvg("ext")}</a>
          </div>
        </div>

        <div class="hc-hero-right">
          <div class="hc-sculpture-bg">${heroSculptureSvg()}</div>
          <div class="hc-glass-form" id="contact-wizard-card"></div>
        </div>
      </section>
    </div>
  `;

  mountWizardForm("contact-wizard-card");
  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    copyText(PROFILE.email, "E-mail copiado!");
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
