# Vivenza Sob Medida: V5 · Essencial

A versão 5 fica em `v5-essencial/` e é derivada da [V4 · Traço](../v4-traco/README.md). O layout é o mesmo da V4, que o cliente aprovou. As mudanças atendem ao retorno da apresentação: menos texto e menos elementos.

> **Status:** protótipo para apresentação. O site não foi publicado. Itens marcados como *ilustrativo*, *a receber* ou *a confirmar* precisam de validação do cliente.

## O que mudou em relação à V4

| Área | V4 | V5 |
|---|---|---|
| **Textos** | Textos longos, incluindo o "Quem somos" do PDF na íntegra. | Textos curtos em todas as seções visíveis. Os textos das seções ocultas não foram alterados. |
| **Hero** | Desenho técnico em SVG com animação e botão **Traço / Acabamento**. | Uma foto do móvel (`assets/img/hero-photo-1.jpeg`). O botão, o SVG e a animação foram removidos. O carimbo foi mantido. |
| **Cabeçalhos das seções** | Numeração "01" a "08". | Sem numeração. Os números também saíram do menu e da régua lateral, porque a sequência teria saltos com três seções ocultas. |
| **Fábrica, Projetos e Avaliações** | Visíveis. | Ocultas com `style="display: none"`. O HTML continua na página. |
| **Orçamento** | Formulário com 6 campos e envio simulado. | Só ambiente, nome e mensagem (opcional). O envio abre o WhatsApp da Vivenza com a mensagem pronta. |

## Foto do hero

A foto atual é `assets/img/hero-photo-1.jpeg` (2400×1792 px), gerada a partir do prompt abaixo. É uma imagem ilustrativa, não um projeto real. Se o arquivo faltar, a página mostra um quadro vazio com o aviso "Foto do móvel · a receber".

Prompt para o gerador de imagens (Google Gemini/Imagen, OpenAI ou Microsoft Designer). O texto em inglês costuma dar resultados mais fiéis:

```text
Photorealistic studio product photograph of a custom-built modern kitchen furniture unit,
shot perfectly straight-on in frontal elevation: orthographic look, no perspective distortion,
camera centered at mid-height, long telephoto lens.

The unit: on the left, a tall pantry column in light natural oak veneer (900 mm wide, 2280 mm tall).
To the right, a row of oak upper cabinets with slim handles above a plain light backsplash.
Below, base cabinets with deep burgundy (#7A1027) matte lacquer fronts, a thin light-grey stone
countertop and a recessed black plinth. Minimal handles, precise joinery.

Isolated on a seamless, very light warm off-white background (#F4F0EA). Soft, even studio
lighting with only a subtle contact shadow on the floor. No room, no walls, no props,
no appliances, no decor, no people.

Technical drawing overlay: thin, crisp dark outlines tracing the furniture contours, and
architectural dimension lines in burgundy with small 45° tick marks: overall width "3.180"
across the top; "900" and "2.220" along the bottom; overall height "2.280" on the left side;
counter height "970" on the right side. Numbers in a small, clean monospace font.
Leave generous margins so every dimension line fits inside the frame.

Aspect ratio 4:3, at least 1600×1200 px, sharp focus, editorial furniture catalog style.
Avoid: any text other than the dimension numbers, logos, watermarks, perspective, clutter.
```

Os geradores costumam errar números e textos. Se as cotas saírem distorcidas, gere a imagem sem o parágrafo "Technical drawing overlay". As cotas podem então ser desenhadas em SVG sobre a foto, como na V4, e ficam nítidas em qualquer tamanho.

## Formulário de orçamento

- Não há servidor. Ao enviar, o site monta a mensagem e abre `wa.me` em nova aba, com o texto pronto. Exemplo:

  ```text
  Olá, Vivenza! Gostaria de um orçamento.

  Nome: Maria Silva
  Ambiente: Closet

  Parede de 3 m, estilo clean.
  ```

- O número fica em `CONFIG.whatsapp` (`script.js`), só com dígitos, incluindo DDI e DDD (ex.: `5511900000000`). O mesmo número alimenta os links de WhatsApp do contato e do rodapé.
- Enquanto `CONFIG.whatsapp` for `null`, o envio mostra o aviso "O número de WhatsApp da Vivenza ainda não foi configurado".
- Os links "Orçar" da seção Ambientes continuam pré-selecionando o ambiente no formulário.
- Se o navegador bloquear a nova aba, a mensagem de confirmação traz o link "toque aqui".

## Como restaurar as seções ocultas

1. Em `index.html`, remova `style="display: none"` das seções `#a-fabrica`, `#projetos` e `#avaliacoes`.
2. Descomente os links dessas seções no menu (`.menu__list`), na régua lateral (`.rail__list`) e no rodapé.

O JavaScript e o CSS dessas seções (contadores, galeria, lightbox e depoimentos) foram mantidos e funcionam assim que elas voltarem a aparecer.

## Como executar

```bash
# na raiz do projeto
python3 -m http.server 8000
# http://localhost:8000/v5-essencial/
```

## Pendências

- [ ] Número de WhatsApp da Vivenza (`CONFIG.whatsapp`).
- [ ] Demais pendências da V4: contatos, fotos dos ambientes, vídeo e autorização da fábrica VITTA, avaliações, logotipo em SVG, política de privacidade e domínio.

## Testes realizados

Chrome headless (Playwright), em 1440 px (tema claro) e 375 px (tema escuro):

- sem erros de console;
- sem rolagem horizontal;
- as três seções ocultas têm `display: none`, e o menu e a régua listam só as seções visíveis;
- formulário: erros de validação, aviso de número não configurado e, com um número fictício, abertura do `wa.me` com a mensagem acima e o ambiente pré-selecionado pelo link "Orçar".
