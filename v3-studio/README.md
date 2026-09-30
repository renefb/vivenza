# Vivenza Sob Medida: V3 · Studio

Versão 3 do site, com o alias **Studio**. Tem o mesmo conteúdo, dados e interações das versões anteriores, com uma linguagem visual **moderna, jovial e clean**. A paleta é próxima à da V2 (bordô e prata da logo). Fica no subdiretório `v3-studio/`, e o índice de versões está no `index.html` da raiz do projeto.

### O que muda em relação à V2

- **Tipografia 100% sem serifa:** *Plus Jakarta Sans* em títulos e textos, com pesos 400 a 700 e títulos com espaçamento entre letras levemente negativo.
- **Seções em painéis:** cada seção é um painel arredondado, alternando tons rosado e prateado muito claros, com respiro entre um painel e outro. O rodapé segue o mesmo padrão.
- **Uma seção por tela, só com CSS:** em telas a partir de 1024 px de largura e 700 px de altura, cada painel tem a altura útil da janela (`100svh` menos header e respiros) e centraliza o conteúdo. O `scroll-snap-type: y proximity` faz a rolagem parar no início de cada seção sem prender o usuário. Há um ajuste compacto para telas mais baixas (até 840 px de altura). Nada disso depende de JavaScript, e o snap é desligado com `prefers-reduced-motion`.
  - Verificado: todas as seções cabem inteiras em 1440×900, 1536×864 e 1280×800.
  - Em celulares e tablets, as seções seguem o fluxo natural, com respiros generosos.
- **Layouts compactos para caber na tela:**
  - Ambientes em cards horizontais (3 × 2).
  - Processo com o número ao lado do título.
  - Contato com informações em duas colunas.
  - Citação da seção "A Vivenza" ao lado do título.
- **Galeria em faixa horizontal:** a rolagem é nativa, por toque, trackpad ou setas do teclado com a faixa focada, e para em cada card (`scroll-snap-type: x`). Com JS, os botões ‹ › avançam uma "página" e ficam desabilitados nas pontas. No celular, os filtros ficam numa linha rolável.
- **Estilo dos elementos:** botões e etiquetas em formato de pílula, rótulos de seção com um ponto bordô/prata e "voltar ao topo" em bordô.

Página única, responsiva e estática para a Vivenza Sob Medida. É feita com HTML semântico, CSS moderno e JavaScript vanilla, sem frameworks nem etapa de build.

> **Status:** pronta para receber as imagens e os dados finais. Os itens marcados como *placeholder* ou *a confirmar* **não** devem ir ao ar sem validação do cliente. O site não foi publicado.

---

## Como executar

Não há dependências. Basta servir a **raiz do projeto** com qualquer servidor estático:

```bash
# Python 3
python3 -m http.server 8000
# ou Node
npx serve .
```

Depois, acesse `http://localhost:8000` (índice de versões) ou `http://localhost:8000/v3-studio/` (esta versão).

> Todos os caminhos desta versão são relativos, então ela também funciona servida de dentro da própria pasta.

> Abrir o `index.html` direto pelo sistema de arquivos (`file://`) também funciona, mas um servidor local reproduz melhor o ambiente de produção.

## Estrutura de arquivos

```
.
├── index.html          # Marcação, SEO (meta, Open Graph, JSON-LD) e ilustrações-placeholder (SVG sprite)
├── styles.css          # Tokens de tema claro/escuro, layout e componentes
├── script.js           # CONFIG, dados da galeria/depoimentos e interações
├── assets/
│   ├── logo-vivenza-v.png       # Logo enviada pelo cliente (original, fundo branco)
│   ├── logo-vivenza-v-mark.png  # Símbolo recortado, com fundo transparente (cabeçalho/rodapé)
│   ├── favicon.png              # 64×64, gerado da logo
│   ├── apple-touch-icon.png     # 180×180, gerado da logo
│   └── img/            # Destino das fotos definitivas (vazio por enquanto)
└── README.md
```

### Ordem das seções (âncoras)

| Âncora | Seção |
|---|---|
| `#inicio` | Hero |
| `#a-vivenza` | Posicionamento: "Mais do que móveis" |
| `#ambientes` | Ambientes (6 cards) |
| `#como-funciona` | Processo em 6 etapas |
| `#a-fabrica` | Fábrica VITTA (bloco técnico escuro) |
| `#projetos` | Galeria com filtros + visualização ampliada |
| `#avaliacoes` | Depoimentos / "Por que nossos clientes escolhem a Vivenza" |
| `#orcamento` | Formulário de orçamento |
| `#contato` | Unidade, horário e canais |

## Onde substituir imagens

Hoje, todas as áreas de imagem usam **ilustrações vetoriais identificadas com o selo "Imagem ilustrativa"**. Nenhuma delas se apresenta como projeto real. Cada uma tem um comentário `TODO` no `index.html` com o nome de arquivo e o texto alternativo sugeridos.

| Seção | Arquivo sugerido | Observação |
|---|---|---|
| Hero | `assets/img/hero-vivenza.webp` | Use `fetchpriority="high"` e **sem** `loading="lazy"`. Descomente também o `preload` no `<head>`. |
| Ambientes | `ambiente-cozinha.webp`, `ambiente-dormitorio.webp`, `ambiente-living.webp`, `ambiente-home-office.webp`, `ambiente-closet.webp`, `ambiente-corporativo.webp` | Com `loading="lazy" decoding="async"` |
| Fábrica | `assets/img/fabrica-vitta.webp` | Somente com autorização de uso |
| Projetos | `assets/img/projetos/*.webp` | Edite o array `PROJECTS` em `script.js` |
| Open Graph | `assets/img/og-vivenza.jpg` (1200×630) | Descomente as metas `og:image` |
| Mapa | `assets/img/mapa-vivenza.webp` ou `<iframe>` | Veja o comentário na seção `#contato` |

**Como trocar:** substitua o bloco `<div class="ph ...">…</div>` por:

```html
<img class="media-img" src="assets/img/ambiente-cozinha.webp"
     alt="Cozinha planejada com armários superiores e bancada, projeto Vivenza"
     width="1200" height="900" loading="lazy" decoding="async">
```

Recomendações: use WebP/AVIF, 1200 a 1600 px de largura e menos de 250 KB por imagem. Sempre informe `width`/`height` para evitar *layout shift*.

### Galeria de projetos

Os projetos vêm do array `PROJECTS` em `script.js`. Para cada projeto real, preencha:

```js
{
  id: 'cozinha-perdizes',
  category: 'cozinha',   // cozinha | dormitorio | living | home-office | closet | corporativo
  title: 'Cozinha integrada em Perdizes',
  description: 'Texto curto sobre o projeto.',
  image: 'assets/img/projetos/cozinha-perdizes.webp',
  alt: 'Descrição objetiva do que aparece na foto',
  placeholder: false,
}
```

Quando nenhum item tiver `placeholder: true`, o aviso "exemplos ilustrativos" some automaticamente.

### Depoimentos

Preencha o array `TESTIMONIALS` em `script.js` **apenas com depoimentos reais e autorizados**:

```js
{ quote: 'Texto do depoimento', name: 'Nome do cliente', context: 'Cozinha · São Paulo' }
```

Com a lista vazia, a seção mostra o bloco "Por que nossos clientes escolhem a Vivenza".

## Onde configurar telefone, WhatsApp, e-mail e mapa

Tudo fica no objeto `CONFIG`, no topo de `script.js`:

```js
const CONFIG = {
  phone: '(11) 0000-0000',          // exibido e convertido em link tel:
  whatsapp: '5511900000000',        // só dígitos, com DDI + DDD → link wa.me
  whatsappMessage: 'Olá! ...',
  email: 'contato@dominio.com.br',  // link mailto:
  mapsUrl: 'https://maps.app.goo.gl/...', // perfil oficial no Google
  privacyUrl: '/politica-de-privacidade.html',
  accessibilityUrl: '/acessibilidade.html',
  formEndpoint: null,
};
```

- Enquanto um valor for `null`, o site mostra **"a confirmar"** e o botão "Falar com a equipe" fica desabilitado, com uma explicação ao lado.
- O botão **"Abrir rota"** usa, por padrão, uma busca do Google Maps pelo endereço confirmado (Rua Clélia, 2003). Quando `mapsUrl` for preenchido, ele passa a apontar para o perfil oficial.
- Ao preencher telefone e e-mail, adicione também `telephone` e `email` ao JSON-LD no `<head>` do `index.html`.

## Onde integrar o formulário real

- Configure `CONFIG.formEndpoint` em `script.js`. A função `sendLead()` já faz `POST` em JSON e trata falhas (respostas diferentes de 2xx mostram a mensagem de erro).
- **Enquanto `formEndpoint` for `null`, o envio é SIMULADO:** nenhum dado sai do navegador. Apenas uma linha informativa aparece no console.
- Ajuste o formato (JSON ou `FormData`), os cabeçalhos e a autenticação conforme o serviço escolhido (API própria, CRM, Formspree etc.). Veja o `TODO` dentro de `sendLead()`.
- Há um campo *honeypot* (`website`) contra spam. Se ele vier preenchido, o envio é descartado em silêncio.
- Os campos enviados são `nome`, `telefone`, `email`, `ambiente`, `cidade`, `mensagem` e `origem`.
- Recomenda-se validar os dados também no servidor.

## Pendências para validação do cliente

**Dados de contato**
- [ ] Telefone. O site atual exibe *(11) 4004-0101*, mas o número não foi usado sem confirmação.
- [ ] WhatsApp
- [ ] E-mail de atendimento
- [ ] Link oficial do Google Maps / Perfil da Empresa
- [ ] Redes sociais oficiais. O site atual tem ícones sem URLs.
- [ ] Estacionamentos parceiros (Stop Seguro, Rua Clélia, 1876; Estacione Aqui, Rua Monjolo, 254), vindos do site atual
- [ ] Razão social e CNPJ para o rodapé
- [ ] Domínio definitivo (`canonical` e `og:url` apontam para `https://vivenzasobmedida.com.br/`)

**Conteúdo institucional**
- [ ] Números da fábrica VITTA (28.000 m² de parque fabril; 75.000 m² de área total)
- [ ] Relação institucional entre Vivenza e VITTA e a forma correta de citá-la
- [ ] Autorização de uso de imagens da fábrica
- [ ] Etapas do processo: se a montagem é feita por equipe própria ou parceira e se há etapas extras (medição, 3D). Nenhum prazo ou garantia foi incluído.

**Materiais**
- [ ] Logotipo oficial em SVG. Hoje o site usa o símbolo recortado de um PNG de 375 px, com o nome "Vivenza / Sob Medida" composto em texto ao lado.
- [ ] Confirmar a composição oficial da logo (símbolo + nome, fonte do nome) e os códigos de cor da marca. O bordô `#5A0518` e o prata foram amostrados da imagem.
- [ ] Favicon oficial em SVG
- [ ] Fotos reais do hero, dos ambientes, da fábrica e dos projetos
- [ ] Imagem Open Graph
- [ ] Depoimentos reais com autorização
- [ ] Política de privacidade e declaração de acessibilidade. Os links aparecem como "(em elaboração)".

Todos os pontos acima estão marcados no código com comentários `TODO`. Para listá-los:

```bash
grep -n "TODO" index.html script.js
```

## Decisões de acessibilidade

- **Estrutura:** um único `h1`, hierarquia `h2`/`h3` sem saltos, marcos `header`/`nav`/`main`/`section`/`footer` e seções rotuladas por `aria-labelledby`.
- **Skip link** "Ir para o conteúdo principal", visível no foco.
- **Foco visível:** contorno azul de 3 px em todos os elementos interativos, com contraste nos dois temas.
- **Menu mobile:** botão com `aria-label` dinâmico ("Abrir menu"/"Fechar menu"), `aria-expanded` e `aria-controls`. O menu fecha com Esc ou ao clicar em um link e **prende o foco** enquanto está aberto. O foco volta ao botão ao fechar com Esc.
- **Link ativo** na navegação indicado com `aria-current="location"`, sublinhado e cor (não só cor).
- **Tema:** o botão tem rótulo que descreve a ação ("Ativar modo escuro/claro").
- **Filtros da galeria:** botões com `aria-pressed` e marca "✓" no filtro ativo (não só cor). O resultado é anunciado em uma região `aria-live`.
- **Visualização ampliada:** usa o `<dialog>` nativo com `showModal()`, que garante foco preso, Esc para fechar e fundo inerte. O foco volta ao item de origem. As setas ← → navegam entre projetos.
- **Cards:** a área clicável cobre o card inteiro, mas o link tem texto descritivo com complemento oculto ("Solicitar orçamento para cozinha").
- **Formulário:** `label` real para cada campo, dicas ligadas por `aria-describedby` e `aria-invalid` nos campos com erro. As mensagens aparecem por campo (texto e ícone ⚠, não só cor), junto de um resumo de erros focado com `role="alert"` e links para cada campo. A mensagem de sucesso usa `role="status"`.
- **Imagens:** placeholders com `role="img"` e `aria-label` que informam tratar-se de imagem ilustrativa. Ilustrações e ícones decorativos têm `aria-hidden`.
- **Contraste** verificado nos dois temas: todos os pares de texto medidos ficam acima de 4,5:1.
- **Alvos de toque** com no mínimo 44×44 px.
- **Movimento reduzido:** com `prefers-reduced-motion`, rolagem suave, revelações e transições (inclusive a de tema) são desativadas.
- **Modo de alto contraste do Windows** (`forced-colors`) considerado nos botões e filtros.

## Decisões de SEO

- `lang="pt-BR"`, `title` e `meta description` conforme o briefing, `canonical` e Open Graph básico. A `og:image` fica pendente até haver foto real.
- **JSON-LD** `FurnitureStore` apenas com dados confirmados: nome, endereço e horário. Telefone, e-mail, geo e redes sociais devem ser adicionados após a confirmação.
- Todo o texto é HTML real, sem texto dentro de imagens. As âncoras são descritivas (`#como-funciona`, `#a-fabrica` etc.).
- O conteúdo principal é estático no HTML. Apenas a galeria e os depoimentos são renderizados via JS, a partir de dados editáveis.
- **Performance:** nenhuma biblioteca externa além das Google Fonts (com `preconnect` e `display=swap`). O JS é carregado com `defer`, sem vídeo. O layout reserva proporções (`aspect-ratio`) para evitar *layout shift*. O tema é aplicado antes da primeira pintura por um script inline mínimo, sem flash de cor.
- `sitemap.xml` e `robots.txt` não foram criados, pois é uma página única sem ambiente de publicação definido. Crie-os ao configurar a hospedagem.

## Tema claro/escuro

- **Paleta V3:** claro com página `#FCFBFB`, painéis `#F6F0F1` (rosado) e `#F1F2F4` (prateado), superfícies brancas, texto `#1D1A1C` e bordô `#7A1027` (hover `#5A0518`). Escuro com página `#121011`, painéis `#1C1719` e `#19191B`, destaque rosé `#EE9FAE` e botões em bordô `#9A1E38`.
- No tema escuro, o símbolo "V" fica sobre um selo circular claro para preservar o bordô e o prata da logo.
- Os tokens de cor ficam em `:root` (claro) e `:root[data-theme="dark"]` (escuro) no início do `styles.css`.
- Na primeira visita, o tema segue `prefers-color-scheme`. A escolha manual é salva em `localStorage` (chave `vivenza-theme`) e tem prioridade.
- Sem JavaScript, a página segue a preferência do sistema pelo bloco `@media (prefers-color-scheme: dark)`.
- A seção da fábrica usa um bloco bordô profundo e técnico nos dois temas, para reforçar a mudança de ritmo.

## Testes realizados

A página foi verificada em Chrome headless (Playwright), em 375, 768, 1024 e 1440 px, nos temas claro e escuro e com e sem movimento reduzido:

- ausência de erros de console, de requisições com falha e de rolagem horizontal;
- `h1` único, headings sem saltos, âncoras válidas, IDs únicos, labels em todos os campos e JSON-LD válido;
- menu mobile: abertura, foco no primeiro link, foco preso, Esc, fechamento ao clicar em link e seção não coberta pelo header;
- tema: alternância, persistência após recarregar e rótulo do botão;
- galeria: filtros, `aria-pressed`, anúncio em `aria-live`, abertura e fechamento do dialog por teclado, retorno do foco e CTA que pré-seleciona o ambiente no formulário;
- formulário: resumo de erros, validação de telefone e e-mail, formatação do telefone, envio simulado, mensagem de sucesso e limpeza do formulário;
- contraste dos principais pares de texto nos dois temas.
