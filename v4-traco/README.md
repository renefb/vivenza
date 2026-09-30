# Vivenza Sob Medida: V4 · Traço

A versão 4 do site, com o alias **Traço**, fica em `v4-traco/` e está listada no `index.html` da raiz do projeto. Nesta versão, a direção criativa foi livre. As referências foram o PDF "SITE VIVENZA", enviado pelo cliente, e o site de um concorrente.

> **Status:** protótipo para apresentação, pronto para receber imagens e dados finais. Os itens marcados como *ilustrativo*, *a receber* ou *a confirmar* **não** devem ir ao ar sem validação do cliente. O site não foi publicado.

## Conceito

A casa é tratada como um projeto técnico que ganha vida. A frase "do primeiro traço ao último detalhe" virou a linguagem visual, que usa estes elementos:

- **cotas** em milímetros;
- **carimbo de prancha**, com "Projeto: o seu ambiente · Escala 1:1";
- **régua** lateral;
- **fita métrica** no processo;
- **planta esquemática** na fábrica.

O contraponto ao concorrente (layout branco e genérico) é uma página editorial com cara de estúdio de design.

- **Tipografia:**
  - *Fraunces* nos títulos e destaques: serifa de contraste baixo, com itálico expressivo.
    - O tamanho óptico (`opsz`) fica fixo: 36 nos títulos e 18 nos textos menores (`--serif-opsz` e `--serif-opsz-sm` em `styles.css`). Isso evita os traços finíssimos dos tamanhos ópticos altos.
    - A primeira versão usava *Bodoni Moda*, trocada porque as hastes e terminações finas prejudicavam a leitura.
  - *Instrument Sans* nos textos.
  - *Geist Mono* nas anotações técnicas.
- **Paleta:**
  - **Claro:** papel `#F4F0EA`, papel alternado `#ECE6DD`, superfície `#FBF9F6`, tinta `#1B1516` e bordô da logo `#7A1027`.
  - **Escuro:** `#110D0E`, com destaque rosé `#EE9FAE` e botões `#9A1E38`.
  - **Fábrica e rodapé:** blocos invertidos. No tema escuro, a fábrica usa o bordô profundo `#2A0B14`.

## Elementos e interações

| Área | O que faz | Sem JS ou com movimento reduzido |
|---|---|---|
| **Hero** | O desenho técnico de uma cozinha (SVG, ilustrativo) se desenha na tela e depois recebe o acabamento: madeira, laca bordô e pedra. O botão **Traço / Acabamento** alterna as duas vistas. | Mostra direto o acabamento, e o botão continua funcionando. |
| **Régua lateral** (≥ 1280 px) | Índice das 8 seções. Cada marco fica na altura proporcional da seção, e o preenchimento bordô mostra o progresso da leitura. | Sem JS, os marcos ficam espaçados por igual. |
| **Status "Aberto agora"** | Calculado no fuso de São Paulo a partir do horário confirmado (seg. a sáb., 9h–20h). Aparece no header e no contato, e marca o dia de hoje na semana. | Oculto. O horário em texto sempre aparece. |
| **A Vivenza** | Texto "Quem somos" do PDF, na íntegra. Tem a foto dos fundadores fixa ao rolar (placeholder), a rota Itália → São Paulo, os números e o manifesto. | Igual. |
| **Ambientes** | Índice editorial com prévia fixa, que troca conforme o mouse, o foco ou a rolagem. | A lista é completa, e a prévia mostra o primeiro item. |
| **Como funciona** | Os 5 passos do PDF numa **trilha horizontal fixada**: a página rola na vertical, a trilha anda na horizontal e a fita métrica se preenche. | Vira uma grade de 5 colunas (desktop) ou uma linha do tempo vertical (celular). |
| **Fábrica VITTA** | Texto do PDF, contadores 28.000 / 75.000 m², **planta proporcional** (√ das áreas, identificada como esquemática), espaço para o vídeo `fabricavitta.mp4` e etiquetas técnicas. | Os números aparecem já finais. |
| **Projetos** | Grade em mosaico ("bento") com filtros, `aria-live` e visualização ampliada em `<dialog>`. | Aviso de que a galeria requer JS. |
| **Orçamento** | Formulário como "ficha de projeto", com a data do dia. O ambiente é escolhido em opções clicáveis (radiogroup), pré-selecionadas pelos links "Orçar" e pela galeria. | O formulário é HTML real. O envio precisa de JS e continua simulado. |
| **Contato** | Endereço em tipografia monumental, semana de funcionamento, dados pendentes e mapa ilustrativo com pulso. | Igual, sem o status. |
| **Rodapé** | Frase de assinatura, colunas e a palavra "Vivenza" gigante em contorno. | Igual. |

## Conteúdo usado do PDF do cliente

- **"Quem somos"** foi usado na íntegra. Isso inclui os fundadores Fernanda Fernandes e Arthur Fernandes, que também foram adicionados ao JSON-LD como `founder`.
- **"Passo a passo"** entrou com as 5 etapas e os títulos e textos do cliente. Elas substituem as 6 etapas genéricas das versões anteriores.
- **"Fábrica"** usa o texto do cliente. O vídeo **fabricavitta.mp4** não veio junto: o espaço está reservado, com o markup pronto num comentário `TODO`.
- **"Unidade"** e o horário foram usados no status "aberto agora" e no JSON-LD.
- **"Avaliações" não foram publicadas.** As duas capturas do Google (Vera Rodrigues e Geovane) elogiam a **"SmartHome"** e o atendimento de Arthur naquela empresa. Publicá-las no site da Vivenza atribuiria à marca avaliações de outra empresa. A seção mantém o bloco "Por que nossos clientes escolhem a Vivenza" até haver avaliações da própria Vivenza, com autorização (array `TESTIMONIALS` em `script.js`).

## Como executar

```bash
# na raiz do projeto
python3 -m http.server 8000
# http://localhost:8000/v4-traco/
```

## Estrutura

```
v4-traco/
├── index.html   # Marcação, SEO, JSON-LD, desenho do hero (SVG inline) e sprite de ilustrações
├── styles.css   # Tokens claro/escuro, componentes e seções
├── script.js    # CONFIG, HOURS, PROJECTS, TESTIMONIALS e interações
├── assets/      # Logo (PNG), favicon, apple-touch-icon e img/ (fotos definitivas)
└── README.md
```

## Onde trocar conteúdo

- **Contatos, mapa, links legais e endpoint do formulário:** objeto `CONFIG` em `script.js`, igual às versões anteriores.
  - Com o valor `null`, o site mostra "a confirmar" e mantém "Falar com a equipe" desabilitado.
  - O envio do formulário é **simulado** enquanto `formEndpoint` for `null`.
- **Horário:** objeto `HOURS` em `script.js`. Se o cliente quiser, dá para prever feriados.
- **Projetos:** array `PROJECTS`. O mosaico se ajusta sozinho à quantidade de itens.
- **Fotos:**
  - Cada placeholder tem um `TODO` com o nome de arquivo e o `alt` sugeridos: fundadores, ambientes, vídeo e poster da fábrica, Open Graph e mapa.
  - O desenho do hero pode continuar como assinatura visual ou virar foto (`assets/img/hero-vivenza.webp`).

Para listar todas as pendências:

```bash
grep -n "TODO" index.html script.js
```

## Pendências para validação do cliente

- [ ] **Dados de contato:**
  - [ ] telefone, WhatsApp e e-mail;
  - [ ] perfil do Google Maps;
  - [ ] redes sociais;
  - [ ] razão social e CNPJ;
  - [ ] domínio definitivo.
- [ ] Estacionamentos parceiros, vindos do site atual.
- [ ] O passo 1 ("Contato pelo WhatsApp") promete "atendimento imediato". Confirmar a expressão e o número de WhatsApp.
- [ ] Relação Vivenza × VITTA e autorização de uso das imagens e do vídeo da fábrica.
- [ ] Arquivo `fabricavitta.mp4`.
- [ ] Foto dos fundadores.
- [ ] Fotos reais dos ambientes e dos projetos.
- [ ] Avaliações da própria Vivenza, com autorização (ver a observação sobre "SmartHome" acima).
- [ ] Logotipo oficial em SVG e códigos de cor da marca.
- [ ] Política de privacidade e declaração de acessibilidade.

## Acessibilidade

- **Estrutura:**
  - um único `h1` e headings sem saltos;
  - seções na ordem pedida pelo briefing, rotuladas por `aria-labelledby`;
  - skip link e foco visível azul de 3 px.
- **Menu em tela cheia (todas as larguras):**
  - `aria-expanded`/`aria-controls` e rótulo dinâmico;
  - foco preso enquanto aberto, Esc fecha e devolve o foco ao botão;
  - fecha ao clicar num link.
  - A régua lateral é uma segunda navegação, rotulada "Índice das seções". As duas marcam a seção atual com `aria-current="location"`.
- **Trilha horizontal do processo:**
  - o conteúdo está todo no DOM, em ordem de leitura;
  - o contêiner usa `overflow: clip`, para que o foco não role a trilha por dentro;
  - ao focar o botão final pelo teclado, a página rola até ele ficar visível;
  - com `prefers-reduced-motion` ou em telas menores, a trilha vira uma lista comum.
- **Desenho do hero:** `role="img"` com título que o declara ilustrativo. O botão de vista usa `aria-pressed`.
- **Contadores:** leitores de tela recebem só o valor final. O número animado fica numa camada `aria-hidden`.
- **Formulário:**
  - o ambiente é um `fieldset` com `legend` e `role="radiogroup"`, e recebe `aria-invalid` no grupo;
  - o resumo de erros tem links que levam o foco à primeira opção;
  - os demais campos seguem o padrão das versões anteriores.
- **Galeria:** `aria-pressed` com "✓", anúncio em `aria-live`, `<dialog>` nativo e retorno do foco.
- **Contraste:** mais de 4,5:1 em todos os pares de texto medidos (25 seletores por tema).
- **Movimento reduzido:** com `prefers-reduced-motion`, animações, transições, a trilha fixada e a rolagem suave são desativadas.

## SEO

- `title`, `description`, `canonical` e Open Graph básico.
- JSON-LD `FurnitureStore` só com dados confirmados: nome, endereço, horário e fundadores.
- Todo o texto é HTML real. Só a galeria e os depoimentos vêm de dados em JS.
- Nenhuma biblioteca externa além das Google Fonts, e o JS é carregado com `defer`.

## Testes realizados

Chrome headless (Playwright), em 375, 768, 1024 e 1440 px, temas claro e escuro, **com e sem** movimento reduzido:

- **Página:**
  - sem erros de console nem requisições com falha;
  - sem rolagem horizontal;
  - estrutura de headings, âncoras, IDs, labels, JSON-LD e ordem das seções.
- **Tema:** alternância e persistência.
- **Hero:** botão Traço / Acabamento.
- **Ambientes:** a prévia troca ao passar o mouse.
- **Galeria:** filtros, dialog por teclado e CTA que pré-seleciona o ambiente.
- **Formulário:** erros, radiogroup, formatação do telefone, envio simulado e limpeza.
- **Menu:** em 375 e 1440 px, com foco preso, Esc e fechamento ao clicar em link.
- **Régua:** link ativo e marcos sem sobreposição.
- **Contraste:** nos dois temas.
- **Com animação:**
  - desenho do hero;
  - trilha fixada em quatro pontos da rolagem;
  - foco no botão final da trilha.
  - Todas as âncoras param logo abaixo do header.
