# Imonovo — 5 propositions de refonte

Concepts de refonte complète de [imonovo.pt](https://imonovo.pt) (agence immobilière, Caldas da Rainha). **Ce n'est pas le site officiel** : chaque page porte la mention « conceito, não é o site oficial », et les pages sont en `noindex`.

**Site en ligne :** https://valeriongg.github.io/imonovo-redesign/

| # | Direction | Esprit |
|---|---|---|
| 1 | Atlântico | Cinématographique, océan nocturne — Bodoni Moda · Manrope |
| 2 | Lagoa | Lumière, chaux et arches de la Lagoa de Óbidos — Instrument Serif · Figtree |
| 3 | Caldas | Typographie cinétique, index d'architecte — Archivo Expanded · JetBrains Mono |
| 4 | Azulejo | Magazine d'artisanat portugais, cobalt et terracotta — Gloock · Work Sans |
| 5 | Noir Concierge | Bureau privé noir et champagne — Italiana · Jost |

Chaque direction comprend 6 pages interactives : Início, Imóveis (filtres, favoris, empreendimentos), Imóvel T5 Nadadouro (galerie, simulateur de crédit, prise de visite), Vender (estimation en 4 étapes), Serviços (acompanhamento et conciergerie), Contactos & Recrutamento. Bouton PT/FR. Les formulaires n'envoient rien.

## Structure

- `project/` — sources des artboards (`*.dc.html` + `canvas.json`) du canvas Design.
- `docs/` — site statique publié par GitHub Pages (généré).
- `docs/dc.js` — mini-runtime autonome (gabarit `{{…}}`, `<sc-for>`, `<sc-if>`, état, événements) rendu par Preact (`docs/vendor/preact.min.js`, MIT).
- `assets/` — photos (Unsplash, illustratives).
- `BRIEF.md` — brief commun des 5 directions (contenus réels, règles).

## Régénérer le site

```bash
node build.mjs
```

Contenus et biens repris de imonovo.pt ; les informations manquantes sont des marqueurs visibles (`[HORÁRIO]`, `[NOME CONSULTOR]`…). Imonovo est une marque de MAJBI Lda · AMI 10355.
