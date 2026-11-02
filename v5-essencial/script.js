/* ==========================================================================
   Vivenza Sob Medida — V5 "Essencial" — script.js
   JavaScript vanilla, sem dependências. Carregado com `defer`.
   Tudo aqui é aprimoramento progressivo: sem JS, o conteúdo continua completo.

   Conteúdo editável fica no topo deste arquivo:
   - CONFIG ........ contatos (o WhatsApp também recebe o formulário), mapa e links legais
   - HOURS ......... horário de funcionamento (usado no status "aberto agora")
   - PROJECTS ...... galeria de projetos
   - TESTIMONIALS .. depoimentos reais (vazio até haver autorização)
   ========================================================================== */

/**
 * CONFIG — preencha somente com dados CONFIRMADOS pelo cliente.
 * Enquanto um valor for null, o site mostra "a confirmar" e mantém o botão correspondente desabilitado.
 */
const CONFIG = {
  // TODO: telefone fixo no formato exibido, ex.: '(11) 0000-0000'.
  phone: '1130009999',
  // TODO: WhatsApp apenas com dígitos, incluindo DDI e DDD, ex.: '5511900000000'.
  // Também é o destino do formulário de orçamento.
  whatsapp: '5511912345678',
  whatsappMessage: 'Olá! Gostaria de conversar sobre um projeto sob medida com a Vivenza.',
  // TODO: e-mail de atendimento, ex.: 'contato@vivenzasobmedida.com.br'.
  email: 'contato@vivenza.com.br',
  // TODO: link do perfil oficial no Google Maps. Se null, o botão "Abrir rota" usa uma busca pelo endereço.
  mapsUrl: 'https://maps.app.goo.gl/59jBuJRfhtRZ9ySc9',
  // TODO: URLs dos documentos legais quando existirem, ex.: '/politica-de-privacidade.html'.
  privacyUrl: null,
  accessibilityUrl: null,
};

/**
 * HOURS — horário informado pelo cliente: segunda a sábado, das 9h às 20h (fuso de São Paulo).
 * Dias: 0 = domingo … 6 = sábado. TODO: considerar feriados e horários especiais, se o cliente quiser.
 */
const HOURS = { days: [1, 2, 3, 4, 5, 6], open: 9 * 60, close: 20 * 60, timeZone: 'America/Sao_Paulo' };

const CATEGORIES = {
  cozinha: 'Cozinhas',
  dormitorio: 'Dormitórios',
  living: 'Salas e livings',
  'home-office': 'Home offices',
  closet: 'Closets',
  corporativo: 'Corporativo',
};

/**
 * PROJECTS — galeria em mosaico.
 * TODO: substituir pelos projetos reais da Vivenza. Para cada item:
 *   image: 'assets/img/projetos/nome-do-arquivo.webp' (1600×1200, < 250 KB)
 *   alt:   descrição objetiva do que aparece na foto
 *   placeholder: false
 * Itens com placeholder: true exibem uma ilustração e o aviso de conteúdo ilustrativo.
 */
const PROJECTS = [
  { id: 'exemplo-cozinha-integrada', category: 'cozinha', title: 'Exemplo · Cozinha integrada', description: 'Espaço reservado para um projeto de cozinha. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de cozinha integrada.', placeholder: true },
  { id: 'exemplo-suite-casal', category: 'dormitorio', title: 'Exemplo · Suíte de casal', description: 'Espaço reservado para um projeto de dormitório. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de dormitório de casal.', placeholder: true },
  { id: 'exemplo-living-painel', category: 'living', title: 'Exemplo · Living com painel', description: 'Espaço reservado para um projeto de sala e living. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de living com painel de TV.', placeholder: true },
  { id: 'exemplo-home-office', category: 'home-office', title: 'Exemplo · Home office', description: 'Espaço reservado para um projeto de home office. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de home office.', placeholder: true },
  { id: 'exemplo-closet', category: 'closet', title: 'Exemplo · Closet', description: 'Espaço reservado para um projeto de closet. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de closet.', placeholder: true },
  { id: 'exemplo-recepcao-corporativa', category: 'corporativo', title: 'Exemplo · Recepção corporativa', description: 'Espaço reservado para um projeto corporativo. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de recepção corporativa.', placeholder: true },
  { id: 'exemplo-cozinha-ilha', category: 'cozinha', title: 'Exemplo · Cozinha com ilha', description: 'Espaço reservado para um segundo projeto de cozinha. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de cozinha com ilha.', placeholder: true },
  { id: 'exemplo-living-estante', category: 'living', title: 'Exemplo · Estar com estante', description: 'Espaço reservado para um segundo projeto de living. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de sala de estar com estante.', placeholder: true },
  { id: 'exemplo-dormitorio-jovem', category: 'dormitorio', title: 'Exemplo · Dormitório jovem', description: 'Espaço reservado para um segundo projeto de dormitório. Substitua pelo nome, descrição e foto de um projeto real.', image: null, alt: 'Espaço reservado para foto de dormitório jovem.', placeholder: true },
];

/**
 * TESTIMONIALS — somente depoimentos reais SOBRE A VIVENZA, com autorização de publicação.
 * Formato: { quote: 'Texto do depoimento', name: 'Nome do cliente', context: 'Cozinha · São Paulo' }
 * Atenção: as avaliações do PDF do cliente citam a "SmartHome" e não devem ser usadas aqui sem validação.
 */
const TESTIMONIALS = [];

/* ------------------------------------------------------------------------ */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const THEME_KEY = 'vivenza-theme';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const ILLUSTRATION = { 'home-office': 'office' };

/* Tema ------------------------------------------------------------------- */
function initTheme() {
  const btn = $('[data-theme-toggle]');
  const storedTheme = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  };

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* armazenamento indisponível */ }
  });

  // Acompanha o sistema enquanto a pessoa não escolher manualmente.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!storedTheme()) apply(e.matches ? 'dark' : 'light');
  });

  // Habilita a transição de cores só depois da primeira pintura.
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-ready')));
}

/* Menu em tela cheia ----------------------------------------------------- */
function initMenu() {
  const toggle = $('[data-menu-toggle]');
  const label = $('[data-menu-label]');
  const panel = $('[data-nav-panel]');
  const focusables = () => [toggle, ...$$('a[href], button:not([disabled])', panel)];

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      close();
      toggle.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    // O botão fica antes do painel no DOM, mas o ciclo é controlado manualmente para incluir só botão + painel.
    e.preventDefault();
    const items = focusables();
    const current = items.indexOf(document.activeElement);
    const step = e.shiftKey ? -1 : 1;
    const next = current === -1 ? 0 : (current + step + items.length) % items.length;
    items[next].focus();
  };

  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    label.textContent = 'Fechar';
    panel.classList.add('is-open');
    document.body.classList.add('menu-open');
    document.addEventListener('keydown', onKeydown);
    const firstLink = $('a[href]', panel);
    if (firstLink) firstLink.focus();
  }

  function close() {
    if (!isOpen()) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    label.textContent = 'Menu';
    panel.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    document.removeEventListener('keydown', onKeydown);
  }

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
}

/* Header, régua lateral, link ativo e voltar ao topo --------------------- */
function initScrollUI() {
  const header = $('[data-header]');
  const toTop = $('[data-to-top]');
  const railFill = $('[data-rail-fill]');
  const railList = $('.rail__list');
  let ticking = false;

  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 900);
    if (railFill) railFill.style.setProperty('--progress', String(clamp(y / maxScroll(), 0, 1)));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  // Posiciona cada marco da régua na altura proporcional ao ponto em que a seção começa.
  const placeRail = () => {
    if (!railList || !railList.offsetParent) return;
    const max = maxScroll();
    const headerH = header.offsetHeight;
    let last = -Infinity;
    const minGap = 30 / railList.clientHeight;
    $$('li', railList).forEach((li) => {
      const target = document.getElementById(li.querySelector('a').getAttribute('href').slice(1));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      let p = clamp(top / max, 0, 1);
      if (p - last < minGap) p = last + minGap; // evita sobreposição de rótulos próximos
      last = p;
      li.style.top = `${clamp(p, 0, 1) * 100}%`;
    });
    railList.classList.add('is-positioned');
    update();
  };
  placeRail();
  window.addEventListener('resize', placeRail);
  window.addEventListener('load', placeRail);
  if ('ResizeObserver' in window) new ResizeObserver(placeRail).observe(document.body);

  // Link ativo nas duas navegações (menu e régua).
  const links = $$('[data-nav-list] a');
  const ids = [...new Set(links.map((a) => a.getAttribute('href').slice(1)))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const setCurrent = (id) => {
    links.forEach((a) => {
      if (id && a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setCurrent(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setCurrent(null);
  }, { rootMargin: '-45% 0px -50% 0px' }).observe($('#inicio'));
}

/* Ambientes: prévia que acompanha a lista -------------------------------- */
function initRooms() {
  const wrap = $('[data-rooms]');
  if (!wrap) return;
  const rows = $$('[data-room]', wrap);
  const previews = $$('[data-preview]', wrap);
  const caption = $('[data-preview-caption]', wrap);

  const activate = (row) => {
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    previews.forEach((p) => p.classList.toggle('is-active', p.dataset.preview === row.dataset.room));
    if (caption) caption.textContent = `${$('.room__num', row).textContent} · ${$('.room__title', row).textContent}`;
  };

  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => activate(row));
    row.addEventListener('focusin', () => activate(row));
  });

  // Ao rolar, a linha que passa pelo centro da tela assume a prévia.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) activate(entry.target); });
  }, { rootMargin: '-48% 0px -48% 0px' });
  rows.forEach((r) => io.observe(r));

  activate(rows[0]);
}

/* Como funciona: trilha horizontal fixada durante a rolagem -------------- */
function initProcess() {
  const section = $('[data-process]');
  if (!section) return;
  const sticky = $('[data-process-sticky]', section);
  const viewport = $('[data-process-viewport]', section);
  const track = $('[data-process-track]', section);
  const fill = $('[data-tape-fill]', section);
  const steps = $$('.pstep:not(.pstep--end)', track);
  const wide = window.matchMedia('(min-width: 1024px) and (min-height: 620px)');
  let distance = 0;
  let pinned = false;
  let ticking = false;

  const stepIO = new IntersectionObserver((entries) => {
    if (pinned) return;
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-passed'); });
  }, { rootMargin: '0px 0px -30% 0px' });

  const onScroll = () => {
    ticking = false;
    if (!pinned) return;
    const progress = distance ? clamp(-section.getBoundingClientRect().top / distance, 0, 1) : 0;
    viewport.style.setProperty('--x', `${(-progress * distance).toFixed(1)}px`);
    fill.style.setProperty('--p', progress.toFixed(4));
    const mark = window.innerWidth * 0.62;
    steps.forEach((s) => s.classList.toggle('is-passed', s.getBoundingClientRect().left < mark));
  };

  const setup = () => {
    const shouldPin = wide.matches && !reduceMotion.matches;
    section.classList.toggle('is-pinned', shouldPin);
    pinned = shouldPin;
    if (!pinned) {
      section.style.height = '';
      viewport.style.removeProperty('--x');
      fill.style.removeProperty('--p');
      steps.forEach((s) => stepIO.observe(s));
      return;
    }
    viewport.style.setProperty('--x', '0px');
    distance = Math.max(0, viewport.scrollWidth - sticky.clientWidth);
    section.style.height = `${sticky.offsetHeight + distance}px`;
    onScroll();
  };

  window.addEventListener('scroll', () => {
    if (pinned && !ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', setup);
  wide.addEventListener('change', setup);
  reduceMotion.addEventListener('change', setup);

  // Foco por teclado dentro da trilha: rola a página até o item ficar visível.
  track.addEventListener('focusin', (e) => {
    if (!pinned) return;
    const item = e.target.closest('.pstep');
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const current = clamp(window.scrollY - sectionTop, 0, distance);
    const rect = item.getBoundingClientRect();
    const margin = 48;
    const right = sticky.clientWidth - margin;
    let delta = 0;
    if (rect.right > right) delta = rect.right - right;
    else if (rect.left < margin) delta = rect.left - margin;
    // 'instant' ignora o scroll-behavior: smooth do CSS; o rAF roda depois da rolagem nativa do foco.
    requestAnimationFrame(() => window.scrollTo({ top: sectionTop + clamp(current + delta, 0, distance), behavior: 'instant' }));
  });

  setup();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setup);
}

/* Status de funcionamento ------------------------------------------------ */
function nowInStore() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: HOURS.timeZone, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => (parts.find((p) => p.type === type) || {}).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutes = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  return { day, minutes };
}

function initOpenStatus() {
  const targets = $$('[data-open-status]');
  const week = $('[data-week]');
  if (!targets.length) return;

  const render = () => {
    const { day, minutes } = nowInStore();
    if (day < 0) return;
    const openToday = HOURS.days.includes(day);
    const isOpen = openToday && minutes >= HOURS.open && minutes < HOURS.close;
    let text;
    if (isOpen) {
      text = 'Aberto agora · até 20h';
    } else if (openToday && minutes < HOURS.open) {
      text = 'Fechado agora · abre hoje às 9h';
    } else {
      let next = (day + 1) % 7;
      while (!HOURS.days.includes(next)) next = (next + 1) % 7;
      const names = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
      text = `Fechado agora · abre ${next === (day + 1) % 7 ? 'amanhã' : names[next]} às 9h`;
    }
    targets.forEach((el) => {
      el.textContent = text;
      el.classList.toggle('is-open', isOpen);
      el.hidden = false;
    });
    if (week) $$('li', week).forEach((li) => li.classList.toggle('is-today', Number(li.dataset.day) === day));
  };

  render();
  setInterval(render, 60 * 1000);
}

/* Contadores da fábrica -------------------------------------------------- */
function initCounters() {
  const items = $$('[data-count]');
  if (!items.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const fmt = (n) => Math.round(n).toLocaleString('pt-BR');

  items.forEach((el) => {
    // Leitores de tela recebem o valor final; o número animado fica só na camada visual.
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = el.textContent;
    el.after(sr);
    el.setAttribute('aria-hidden', 'true');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el = entry.target;
      const end = Number(el.dataset.count);
      // Trava a largura final para o layout não mudar enquanto o número cresce.
      el.style.display = 'inline-block';
      el.style.minWidth = `${el.getBoundingClientRect().width}px`;
      el.style.textAlign = 'right';
      const start = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const k = clamp((t - start) / dur, 0, 1);
        el.textContent = fmt(end * (1 - Math.pow(1 - k, 4)));
        if (k < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0';
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  items.forEach((el) => io.observe(el));
}

/* Pré-seleção do ambiente no formulário ---------------------------------- */
function preselectAmbiente(value) {
  const radio = value && $(`[data-quote-form] input[name="ambiente"][value="${value}"]`);
  if (!radio) return;
  radio.checked = true;
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

function initAmbienteLinks() {
  $$('[data-ambiente]').forEach((link) => {
    link.addEventListener('click', () => preselectAmbiente(link.dataset.ambiente));
  });
}

/* Galeria em mosaico ----------------------------------------------------- */
function mediaHTML(project, { lazy = true } = {}) {
  if (project.image) {
    return `<img class="media-img" src="${esc(project.image)}" alt="${esc(project.alt)}" width="1600" height="1200"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  }
  const ill = ILLUSTRATION[project.category] || project.category;
  return `<div class="ph" role="img" aria-label="${esc(project.alt)} Imagem ilustrativa.">
      <svg class="ph__art" aria-hidden="true" focusable="false"><use href="#ill-${ill}"/></svg>
      <span class="ph__tag" aria-hidden="true">Imagem ilustrativa</span>
    </div>`;
}

// Tamanhos [colunas, linhas] numa grade de 12 colunas; o empacotamento "dense" fecha os vãos.
const BENTO = {
  1: [[12, 2]],
  2: [[7, 2], [5, 2]],
  3: [[7, 2], [5, 1], [5, 1]],
  default: [[7, 2], [5, 2], [4, 1], [4, 1], [4, 1], [5, 2], [7, 2], [6, 1], [6, 1]],
};

function initGallery() {
  const list = $('[data-gallery]');
  const status = $('[data-gallery-status]');
  const filterButtons = $$('[data-filters] [data-filter]');
  const notice = $('[data-gallery-notice]');
  let visible = PROJECTS.slice();

  if (notice) notice.hidden = !PROJECTS.some((p) => p.placeholder);

  const render = (filter, announce) => {
    visible = filter === 'todos' ? PROJECTS.slice() : PROJECTS.filter((p) => p.category === filter);
    const sizes = BENTO[visible.length] || BENTO.default;
    list.innerHTML = visible.length
      ? visible.map((p, i) => {
        const [c, r] = sizes[i % sizes.length];
        return `
        <li style="--c:${c};--r:${r}">
          <article class="project">
            <div class="project__media">${mediaHTML(p)}</div>
            <div class="project__bar">
              <div class="project__text">
                <p class="project__cat">${esc(CATEGORIES[p.category] || p.category)}</p>
                <h3 class="project__title">${esc(p.title)}</h3>
              </div>
              <button type="button" class="project__open" data-open="${i}">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                <span class="visually-hidden">Ver detalhes de ${esc(p.title)}</span>
              </button>
            </div>
          </article>
        </li>`;
      }).join('')
      : '<li class="bento__empty">Em breve, novos projetos nesta categoria. Fale com a nossa equipe para conhecer outras referências.</li>';

    if (announce) {
      const label = filter === 'todos' ? 'todas as categorias' : CATEGORIES[filter];
      status.textContent = `${visible.length} ${visible.length === 1 ? 'projeto exibido' : 'projetos exibidos'} em ${label}.`;
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      render(btn.dataset.filter, true);
    });
  });

  render('todos', false);

  /* Lightbox (dialog nativo) */
  const dialog = $('[data-lightbox]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const els = {
    media: $('[data-lightbox-media]', dialog),
    cat: $('[data-lightbox-cat]', dialog),
    title: $('[data-lightbox-title]', dialog),
    desc: $('[data-lightbox-desc]', dialog),
    count: $('[data-lightbox-count]', dialog),
    prev: $('[data-lightbox-prev]', dialog),
    next: $('[data-lightbox-next]', dialog),
    cta: $('[data-lightbox-cta]', dialog),
  };
  let index = 0;
  let trigger = null;
  let restoreFocus = true;

  const show = (i) => {
    index = (i + visible.length) % visible.length;
    const p = visible[index];
    els.media.innerHTML = mediaHTML(p, { lazy: false });
    els.cat.textContent = CATEGORIES[p.category] || p.category;
    els.title.textContent = p.title;
    els.desc.textContent = p.description;
    els.count.textContent = `Projeto ${index + 1} de ${visible.length}`;
    const single = visible.length < 2;
    els.prev.hidden = single;
    els.next.hidden = single;
  };

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (!btn) return;
    trigger = btn;
    restoreFocus = true;
    show(Number(btn.dataset.open));
    dialog.showModal();
  });

  els.prev.addEventListener('click', () => show(index - 1));
  els.next.addEventListener('click', () => show(index + 1));
  $('[data-lightbox-close]', dialog).addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (e) => {
    if (visible.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });
  // Clique no fundo escurecido fecha.
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  dialog.addEventListener('close', () => {
    if (restoreFocus && trigger) trigger.focus();
  });

  els.cta.addEventListener('click', (e) => {
    e.preventDefault();
    preselectAmbiente(visible[index].category);
    restoreFocus = false;
    dialog.close();
    $('#orcamento').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#orcamento');
    $('#f-nome').focus({ preventScroll: true });
  });
}

/* Depoimentos ------------------------------------------------------------ */
function initTestimonials() {
  if (!TESTIMONIALS.length) return;
  const list = $('[data-testimonials]');
  list.innerHTML = TESTIMONIALS.map((t) => `
    <li>
      <figure class="testimonial">
        <blockquote><p>${esc(t.quote)}</p></blockquote>
        <figcaption><strong>${esc(t.name)}</strong>${t.context ? esc(t.context) : ''}</figcaption>
      </figure>
    </li>`).join('');
  list.hidden = false;
  $('[data-testimonials-fallback]').hidden = true;
}

/* Formulário ------------------------------------------------------------- */
const onlyDigits = (v) => v.replace(/\D/g, '');

function normalizePhone(value) {
  let d = onlyDigits(value);
  if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
  return d;
}

function formatPhone(value) {
  const d = normalizePhone(value);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return value;
}

const waDigits = CONFIG.whatsapp ? onlyDigits(CONFIG.whatsapp) : '';
const whatsappUrl = (text) => `https://wa.me/${waDigits}?text=${encodeURIComponent(text)}`;

const FIELD_LABELS = {
  ambiente: 'Ambiente',
  nome: 'Nome',
};

// A ordem aqui define a ordem do resumo de erros (igual à ordem visual do formulário).
const VALIDATORS = {
  ambiente: (v) => (v ? '' : 'Selecione o ambiente.'),
  nome: (v) => (v.trim().length >= 2 ? '' : 'Informe seu nome.'),
};

function initForm() {
  const form = $('[data-quote-form]');
  if (!form) return;
  const errorBox = $('[data-form-error]');
  const errorTitle = $('[data-form-error-title]');
  const errorList = $('[data-form-error-list]');
  const successBox = $('[data-form-success]');
  const successLink = $('[data-form-whatsapp-link]');
  const group = $('#f-ambiente');
  const defaultErrorTitle = errorTitle.textContent;

  // O grupo de opções (radiogroup) recebe aria-invalid; o foco vai para a primeira opção.
  const fieldEl = (name) => (name === 'ambiente' ? group : form.elements[name]);
  const focusId = (name) => (name === 'ambiente' ? ($('input:checked', group) || $('input', group)).id || 'f-amb-cozinha' : form.elements[name].id);
  const valueOf = (name) => form.elements[name].value || '';

  const setFieldError = (name, message) => {
    const field = fieldEl(name);
    const slot = $(`[data-error-for="${name}"]`, form);
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    slot.textContent = message;
  };

  const validateField = (name) => {
    const message = VALIDATORS[name](valueOf(name));
    setFieldError(name, message);
    return message;
  };

  group.addEventListener('change', () => { if (group.hasAttribute('aria-invalid')) validateField('ambiente'); });
  const nome = form.elements.nome;
  nome.addEventListener('blur', () => { if (nome.value || nome.hasAttribute('aria-invalid')) validateField('nome'); });
  nome.addEventListener('input', () => { if (nome.hasAttribute('aria-invalid')) validateField('nome'); });

  errorList.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) target.focus();
  });

  const showErrors = (items, title = defaultErrorTitle) => {
    successBox.hidden = true;
    errorTitle.textContent = title;
    errorList.innerHTML = items.map((it) => `<li>${it.id ? `<a href="#${it.id}">${esc(it.text)}</a>` : esc(it.text)}</li>`).join('');
    errorList.hidden = !items.length;
    errorBox.hidden = false;
    errorBox.focus();
  };

  const buildMessage = () => {
    const checked = $('input:checked', group);
    const ambiente = checked.nextElementSibling.textContent.trim();
    const mensagem = form.elements.mensagem.value.trim();
    return [
      'Olá, Vivenza! Gostaria de um orçamento.',
      '',
      `Nome: ${form.elements.nome.value.trim()}`,
      `Ambiente: ${ambiente}`,
      ...(mensagem ? ['', mensagem] : []),
    ].join('\n');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = Object.keys(VALIDATORS)
      .map((name) => ({ name, message: validateField(name) }))
      .filter((r) => r.message);

    if (errors.length) {
      showErrors(errors.map((r) => ({ id: focusId(r.name), text: `${FIELD_LABELS[r.name]}: ${r.message}` })));
      return;
    }

    if (!waDigits) {
      showErrors([], 'O número de WhatsApp da Vivenza ainda não foi configurado.');
      return;
    }

    // Abre na mesma interação do clique para não ser bloqueado como pop-up.
    const url = whatsappUrl(buildMessage());
    window.open(url, '_blank', 'noopener');
    successLink.href = url;
    errorBox.hidden = true;
    successBox.hidden = false;
    successBox.focus();
  });

  const today = $('[data-today]');
  if (today) today.textContent = new Date().toLocaleDateString('pt-BR');
}

/* Contatos e links configuráveis ----------------------------------------- */
function initContacts() {
  const waUrl = waDigits ? whatsappUrl(CONFIG.whatsappMessage) : '';
  const telUrl = CONFIG.phone ? `tel:+55${normalizePhone(CONFIG.phone)}` : '';

  const values = {
    phone: CONFIG.phone && `<a href="${telUrl}">${esc(CONFIG.phone)}</a>`,
    whatsapp: waDigits && `<a href="${waUrl}" target="_blank" rel="noopener">${esc(formatPhone(waDigits))}<span class="visually-hidden"> (abre em nova aba)</span></a>`,
    email: CONFIG.email && `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>`,
  };
  $$('[data-contact]').forEach((el) => {
    const html = values[el.dataset.contact];
    if (html) el.innerHTML = html;
  });

  const talk = $('[data-talk-link]');
  const talkUrl = waUrl || telUrl;
  if (talk && talkUrl) {
    talk.href = talkUrl;
    talk.removeAttribute('aria-disabled');
    if (waUrl) { talk.target = '_blank'; talk.rel = 'noopener'; }
    const hint = $('[data-talk-hint]');
    if (hint) hint.hidden = true;
  }

  if (CONFIG.mapsUrl) $('[data-route-link]').href = CONFIG.mapsUrl;

  $$('[data-config-link]').forEach((a) => {
    const key = a.dataset.configLink;
    if (!CONFIG[key]) return;
    a.href = CONFIG[key];
    a.removeAttribute('aria-disabled');
    $$(`[data-pending-for="${key}"]`).forEach((el) => { el.hidden = true; });
  });

  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
}

/* Revelação suave -------------------------------------------------------- */
function initReveal() {
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const targets = $$('.section .shead, .process__head, .about__founders, .about__story, .manifesto, .room, .figures, .plan, .factory__story, .reasons, .sheet, .quote__intro, .contact__grid > *, .site-footer__top');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
}

/* Inicialização ---------------------------------------------------------- */
initTheme();
initMenu();
initRooms();
initProcess();
initScrollUI();
initOpenStatus();
initCounters();
initAmbienteLinks();
initGallery();
initTestimonials();
initForm();
initContacts();
initReveal();
