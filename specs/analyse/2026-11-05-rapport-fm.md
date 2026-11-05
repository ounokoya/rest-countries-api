# 2026-11-05 — Rapport FM : REST Countries API

> SDL-FM 1.4.0 Phase 13. Solution : https://www.frontendmentor.io/solutions/rest-countries-api-with-tailwind-v4-hash-routing-and-apg-combobox-vn9b1fV3r1 (v1.0.0). Pas de rapport IA (aucun crédit en novembre) ; vérifications automatiques gratuites : **4 remarques** (Accessibility 0, HTML 3, CSS 0, JavaScript 1).

Reproduites en local : `html-validate` (préréglage recommandé sans les règles de style `doctype-style` et `void-style`, que FM n'applique pas) donne les mêmes 3 remarques HTML.

| # | Remarque FM | Verdict | Correctif proposé |
|---|---|---|---|
| R1 | HTML, accessibilité (`wcag/h32`) : « `<form>` element must have a submit button » sur `<form role="search">` | ✅ Juste : la recherche filtre pendant la frappe, il n'y a rien à envoyer | `<div role="search">` au lieu de `<form>` ; le repère `search` et les tests restent les mêmes |
| R2 | HTML, bonne pratique (`prefer-native-element`) : « Prefer to use the native `<select>` element » sur `<ul role="listbox">` | ⚖️ Conséquence directe de l'ADR-0007 (liste sur mesure, choix de Koya) : la règle signale tout rôle `listbox` | Gardée en v1.0.1, puis **corrigée en v1.0.2** (décision de Koya : les règles de la plateforme s'imposent) : bouton + boutons radio natifs (ADR-0010) |
| R3 | HTML, accessibilité (`empty-heading`, 2) : titres vides `<h1 id="country-name">` (fiche) et `<h2>` du gabarit de carte | ✅ Juste dans le HTML servi, même s'ils sont remplis avant d'être affichés | Texte par défaut dans les deux titres, remplacé par le nom du pays |
| R4 | JavaScript (`no-unsafe-optional-chaining`) : `(el.selectedOptions[0]?.text).trim()` dans `tests/helpers.js` | ✅ Juste (fichier de test, mais FM lit tout le dépôt) | Lecture sans chaînage optionnel |

## Suite donnée : v1.0.1 (2026-11-05)

- R1, R3 : commit `fix(html)` ; R4 et test de garde « Règles FM — html-validate » (rouge avant les correctifs) : commit `test` ; 73 / 73 en local et en ligne ; tag `v1.0.1`, poussé et déployé (accord de Koya).
- Aucun changement visuel : pas de « Regenerate screenshot ».

## Regénération du rapport (SDL-FM 1.4.0)

| Date | Version relue par FM | Résultat |
|---|---|---|
| 2026-11-05 | v1.0.0 (soumission) | Vérifications automatiques : 4 remarques (R1 à R4) ; pas de rapport IA (aucun crédit) |
| 2026-11-05 | v1.0.1 | « Regenerate report » (gratuit, sans rapport IA) : **1 remarque** (Accessibility 0, HTML 1, CSS 0, JavaScript 0) — R2, gardée par Koya |
| 2026-11-05 | v1.0.2 | R2 corrigée (boutons radio natifs, ADR-0010 ; règle de Koya : les règles de la plateforme s'imposent) ; 73 / 73 en local et en ligne ; « Regenerate report » : **0 remarque** (Accessibility 0, HTML 0, CSS 0, JavaScript 0) |
| 2026-11-05 | v1.0.2 + test eslint | « Regenerate report » : **0 remarque** |
| plus tard | v1.0.2 | Rapport IA avec un crédit mensuel, après le Multi-step form (ordre du crédit) |
