/* ==========================================================================
   Vivenza Sob Medida — V2 "Bordô" — script.js
   JavaScript vanilla, sem dependências. Carregado com `defer`.

   Conteúdo editável fica no topo deste arquivo:
   - CONFIG ........ contatos, mapa, links legais e endpoint do formulário
   - PROJECTS ...... galeria de projetos
   - TESTIMONIALS .. depoimentos reais (vazio até haver autorização)
   ========================================================================== */

/**
 * CONFIG — preencha somente com dados CONFIRMADOS pelo cliente.
 * Enquanto um valor for null, o site mostra "a confirmar" e mantém o botão correspondente desabilitado.
 */
const CONFIG = {
  // TODO: telefone fixo no formato exibido, ex.: '(11) 0000-0000'. (O site atual exibe um número que precisa ser confirmado.)
  phone: null,
  // TODO: WhatsApp apenas com dígitos, incluindo DDI e DDD, ex.: '5511900000000'.
  whatsapp: null,
  whatsappMessage: 'Olá! Gostaria de conversar sobre um projeto sob medida com a Vivenza.',
  // TODO: e-mail de atendimento, ex.: 'contato@vivenzasobmedida.com.br'.
  email: null,
  // TODO: link do perfil oficial no Google Maps. Se null, o botão "Abrir rota" usa uma busca pelo endereço.
  mapsUrl: null,
  // TODO: URLs dos documentos legais quando existirem, ex.: '/politica-de-privacidade.html'.
  privacyUrl: null,
  accessibilityUrl: null,
  // TODO: endpoint real do formulário (API própria, Formspree, RD Station, CRM etc.).
  // Enquanto for null, o envio é SIMULADO localmente e nenhum dado sai do navegador.
  formEndpoint: null,
};

const CATEGORIES = {
  cozinha: 'Cozinhas',
  dormitorio: 'Dormitórios',
  living: 'Salas e livings',
  'home-office': 'Home offices',
  closet: 'Closets',
  corporativo: 'Corporativo',
};

/**
 * PROJECTS — galeria.
 * TODO: substituir pelos projetos reais da Vivenza. Para cada item:
 *   image: 'assets/img/projetos/nome-do-arquivo.webp' (1200×900, < 200 KB)
 *   alt:   descrição objetiva do que aparece na foto
 *   placeholder: false
 * Itens com placeholder: true exibem uma ilustração e o aviso de conteúdo ilustrativo.
 */
const PROJECTS = [
  {
    id: 'exemplo-cozinha-integrada',
    category: 'cozinha',
    title: 'Exemplo · Cozinha integrada',
    description: 'Espaço reservado para um projeto de cozinha. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de cozinha integrada.',
    placeholder: true,
  },
  {
    id: 'exemplo-suite-casal',
    category: 'dormitorio',
    title: 'Exemplo · Suíte de casal',
    description: 'Espaço reservado para um projeto de dormitório. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de dormitório de casal.',
    placeholder: true,
  },
  {
    id: 'exemplo-living-painel',
    category: 'living',
    title: 'Exemplo · Living com painel',
    description: 'Espaço reservado para um projeto de sala e living. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de living com painel de TV.',
    placeholder: true,
  },
  {
    id: 'exemplo-home-office',
    category: 'home-office',
    title: 'Exemplo · Home office',
    description: 'Espaço reservado para um projeto de home office. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de home office.',
    placeholder: true,
  },
  {
    id: 'exemplo-closet',
    category: 'closet',
    title: 'Exemplo · Closet',
    description: 'Espaço reservado para um projeto de closet. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de closet.',
    placeholder: true,
  },
  {
    id: 'exemplo-recepcao-corporativa',
    category: 'corporativo',
    title: 'Exemplo · Recepção corporativa',
    description: 'Espaço reservado para um projeto corporativo. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de recepção corporativa.',
    placeholder: true,
  },
  {
    id: 'exemplo-cozinha-ilha',
    category: 'cozinha',
    title: 'Exemplo · Cozinha com ilha',
    description: 'Espaço reservado para um segundo projeto de cozinha. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de cozinha com ilha.',
    placeholder: true,
  },
  {
    id: 'exemplo-living-estante',
    category: 'living',
    title: 'Exemplo · Estar com estante',
    description: 'Espaço reservado para um segundo projeto de living. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de sala de estar com estante.',
    placeholder: true,
  },
  {
    id: 'exemplo-dormitorio-infantil',
    category: 'dormitorio',
    title: 'Exemplo · Dormitório jovem',
    description: 'Espaço reservado para um segundo projeto de dormitório. Substitua pelo nome, descrição e foto de um projeto real.',
    image: null,
    alt: 'Espaço reservado para foto de dormitório jovem.',
    placeholder: true,
  },
];

/**
 * TESTIMONIALS — somente depoimentos reais, com autorização de publicação.
 * Formato: { quote: 'Texto do depoimento', name: 'Nome do cliente', context: 'Cozinha · São Paulo' }
 * Com a lista vazia, a seção mostra o bloco "Por que nossos clientes escolhem a Vivenza".
 */
const TESTIMONIALS = [];

/* ------------------------------------------------------------------------ */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const THEME_KEY = 'vivenza-theme';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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

/* Menu mobile ------------------------------------------------------------ */
function initMenu() {
  const toggle = $('[data-menu-toggle]');
  const panel = $('[data-nav-panel]');
  const mobile = window.matchMedia('(max-width: 1080px)');
  const focusables = () => [toggle, ...$$('a[href], button:not([disabled])', panel)];

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      close();
      toggle.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    // O botão fica depois do painel no DOM, então o ciclo é controlado manualmente.
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
    panel.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    document.removeEventListener('keydown', onKeydown);
  }

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  mobile.addEventListener('change', (e) => { if (!e.matches) close(); });
}

/* Header, link ativo e voltar ao topo ------------------------------------ */
function initScrollUI() {
  const header = $('[data-header]');
  const toTop = $('[data-to-top]');
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 900);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  const links = $$('.site-nav__list a');
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const link = byId.get(entry.target.id);
      if (link) link.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));

  // Remove o destaque quando o hero volta à área visível.
  const hero = $('#inicio');
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) links.forEach((a) => a.removeAttribute('aria-current'));
  }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
}

/* Pré-seleção do ambiente no formulário ---------------------------------- */
function preselectAmbiente(value) {
  const select = $('#f-ambiente');
  if (select && value && select.querySelector(`option[value="${value}"]`)) select.value = value;
}

function initAmbienteLinks() {
  $$('[data-ambiente]').forEach((link) => {
    link.addEventListener('click', () => preselectAmbiente(link.dataset.ambiente));
  });
}

/* Galeria ---------------------------------------------------------------- */
function mediaHTML(project, { lazy = true } = {}) {
  if (project.image) {
    return `<img class="media-img" src="${esc(project.image)}" alt="${esc(project.alt)}" width="1200" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  }
  const ill = ILLUSTRATION[project.category] || project.category;
  return `<div class="ph ph--${ill}" role="img" aria-label="${esc(project.alt)} Imagem ilustrativa.">
      <svg class="ph__art" aria-hidden="true" focusable="false"><use href="#ill-${ill}"/></svg>
      <span class="ph__tag" aria-hidden="true">Imagem ilustrativa</span>
    </div>`;
}

function initGallery() {
  const list = $('[data-gallery]');
  const status = $('[data-gallery-status]');
  const filterButtons = $$('[data-filters] [data-filter]');
  const notice = $('[data-gallery-notice]');
  let visible = PROJECTS.slice();

  if (notice) notice.hidden = !PROJECTS.some((p) => p.placeholder);

  const render = (filter, announce) => {
    visible = filter === 'todos' ? PROJECTS.slice() : PROJECTS.filter((p) => p.category === filter);
    list.innerHTML = visible.length
      ? visible.map((p, i) => `
        <li>
          <article class="project">
            <div class="project__media">${mediaHTML(p)}</div>
            <p class="project__cat">${esc(CATEGORIES[p.category] || p.category)}</p>
            <h3 class="project__title">${esc(p.title)}</h3>
            <p class="project__desc">${esc(p.description)}</p>
            <button type="button" class="project__open link-arrow" data-open="${i}">Ver detalhes<span class="visually-hidden"> de ${esc(p.title)}</span></button>
          </article>
        </li>`).join('')
      : '<li class="gallery__empty">Em breve, novos projetos nesta categoria. Fale com a nossa equipe para conhecer outras referências.</li>';

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

const FIELD_LABELS = {
  nome: 'Nome',
  telefone: 'WhatsApp ou telefone',
  email: 'E-mail',
  ambiente: 'Tipo de ambiente',
  cidade: 'Cidade ou região',
};

const VALIDATORS = {
  nome: (v) => (v.trim().length >= 2 ? '' : 'Informe seu nome.'),
  telefone: (v) => {
    if (!v.trim()) return 'Informe um WhatsApp ou telefone.';
    const len = normalizePhone(v).length;
    return len === 10 || len === 11 ? '' : 'Informe um número com DDD, por exemplo (11) 91234-5678.';
  },
  email: (v) => {
    if (!v.trim()) return 'Informe seu e-mail.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido, por exemplo nome@exemplo.com.';
  },
  ambiente: (v) => (v ? '' : 'Selecione o tipo de ambiente.'),
  cidade: (v) => (v.trim().length >= 2 ? '' : 'Informe sua cidade ou região.'),
};

function initForm() {
  const form = $('[data-quote-form]');
  if (!form) return;
  const errorBox = $('[data-form-error]');
  const errorList = $('[data-form-error-list]');
  const successBox = $('[data-form-success]');
  const submit = $('[data-submit]', form);
  const submitLabel = $('[data-submit-label]', form);

  const setFieldError = (name, message) => {
    const field = form.elements[name];
    const slot = $(`[data-error-for="${name}"]`, form);
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    slot.textContent = message;
  };

  const validateField = (name) => {
    const message = VALIDATORS[name](form.elements[name].value);
    setFieldError(name, message);
    return message;
  };

  Object.keys(VALIDATORS).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener('blur', () => {
      if (name === 'telefone' && field.value) field.value = formatPhone(field.value);
      if (field.value || field.hasAttribute('aria-invalid')) validateField(name);
    });
    const recheck = () => { if (field.hasAttribute('aria-invalid')) validateField(name); };
    field.addEventListener('input', recheck);
    field.addEventListener('change', recheck);
  });

  errorList.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) target.focus();
  });

  const showErrors = (items) => {
    successBox.hidden = true;
    errorList.innerHTML = items.map((it) => `<li>${it.id ? `<a href="#${it.id}">${esc(it.text)}</a>` : esc(it.text)}</li>`).join('');
    errorBox.hidden = false;
    errorBox.focus();
  };

  const setBusy = (busy) => {
    submit.disabled = busy;
    submit.setAttribute('aria-busy', String(busy));
    submitLabel.textContent = busy ? 'Enviando…' : 'Quero iniciar meu projeto';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errors = Object.keys(VALIDATORS)
      .map((name) => ({ name, message: validateField(name) }))
      .filter((r) => r.message);

    if (errors.length) {
      showErrors(errors.map((r) => ({ id: form.elements[r.name].id, text: `${FIELD_LABELS[r.name]}: ${r.message}` })));
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const isBot = Boolean(data.website);
    delete data.website;
    data.telefone = formatPhone(data.telefone);
    data.origem = 'site-onepage';

    setBusy(true);
    try {
      if (!isBot) await sendLead(data);
      errorBox.hidden = true;
      form.reset();
      successBox.hidden = false;
      successBox.focus();
    } catch (err) {
      showErrors([{ text: 'Não conseguimos concluir o envio agora. Verifique sua conexão e tente novamente em instantes.' }]);
    } finally {
      setBusy(false);
    }
  });
}

async function sendLead(data) {
  if (CONFIG.formEndpoint) {
    // TODO: ajustar formato (JSON x FormData), cabeçalhos e autenticação conforme o serviço escolhido.
    const response = await fetch(CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return;
  }
  // SIMULAÇÃO LOCAL: não há backend configurado. Nenhum dado é enviado ou armazenado.
  console.info('[Vivenza] Envio de formulário simulado (CONFIG.formEndpoint não configurado).');
  await new Promise((resolve) => setTimeout(resolve, 900));
}

/* Contatos e links configuráveis ----------------------------------------- */
function initContacts() {
  const waDigits = CONFIG.whatsapp ? onlyDigits(CONFIG.whatsapp) : '';
  const waUrl = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(CONFIG.whatsappMessage)}` : '';
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
  const targets = $$('.section-head, .about__grid, .quote, .pillar, .room-card, .cta-strip, .step, .factory__grid, .stat, .reasons, .form-card, .contact__grid > *');
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
initScrollUI();
initAmbienteLinks();
initGallery();
initTestimonials();
initForm();
initContacts();
initReveal();
