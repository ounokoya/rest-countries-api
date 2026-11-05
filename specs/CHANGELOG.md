# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [1.0.2] — 2026-11-05

Remarque R2 des vérifications automatiques de Frontend Mentor (`prefer-native-element`) : les règles de la plateforme s'imposent (décision de Koya).

### Changed
- Filtre des régions : un bouton ouvre une liste de **boutons radio natifs** au lieu d'une liste sur mesure `combobox` / `listbox` (ADR-0010 remplace l'ADR-0007). Même aspect ; au clavier : Tab jusqu'à la liste, flèches, Entrée ou Échap pour fermer.
- Test de garde html-validate sans exception.

## [1.0.1] — 2026-11-05

Correctifs issus des vérifications automatiques de Frontend Mentor (`specs/analyse/2026-11-05-rapport-fm.md`).

### Fixed
- La recherche n'est plus un `<form>` sans bouton d'envoi : `<div role="search">` (R1).
- Les titres de la fiche et du gabarit de carte ne sont plus vides dans le HTML servi (R3).
- `tests/helpers.js` : plus de chaînage optionnel avant `.trim()` (R4).

### Notes
- R2 (« Prefer to use the native `<select>` element ») est gardée : la liste des régions sur mesure est un choix (ADR-0007), fidèle aux images FM et testée au clavier et au lecteur d'écran.

## [1.0.0] — 2026-11-05

Première version.

### Added
- Accueil : les 250 pays de `data.json` dans l'ordre des données, une carte par pays (drapeau, nom, population, région, capitale), valeurs absentes affichées « None ».
- Recherche pendant la frappe, sans tenir compte de la casse, des accents ni des espaces autour, combinée au filtre par région ; nombre de résultats annoncé ; message « No countries found ».
- Filtre des régions sur mesure (motif « select-only combobox » de l'APG) : All regions, Africa, Americas, Asia, Europe, Oceania ; souris, clavier et lecteurs d'écran.
- Fiche d'un pays : drapeau, nom, 8 informations, voisins en liens ; titre du document et focus sur le nom ; « Country not found » pour un code inconnu.
- Adresses partageables (`#/?search=…&region=…`, `#/country/BEL`) ; « Back » et le retour du navigateur retrouvent la liste filtrée, focus rendu à la carte quittée.
- Thème clair / sombre : thème de l'appareil au premier passage, bouton « Dark Mode » (`aria-pressed`), choix gardé, aucun clignotement au chargement.
- Mises en page mobile (< 768 px), tablette (768–1023 px, proposition faute de maquette FM) et desktop (≥ 1024 px, 3 puis 4 colonnes).
- États de survol, contour de focus de 2 px partout, transitions coupées avec `prefers-reduced-motion`.
- Contraste AA du texte d'exemple de la recherche (4,7:1 au lieu de 3,95:1).
- Drapeaux `flags.svg` recadrés, dimensions déclarées, chargement différé après les 8 premiers.
- Police Nunito Sans servie avec le site (Fontsource).
- 72 tests automatiques (Playwright, axe-core, W3C Nu) écrits depuis la spec avant le code.
- Déploiement sur GitHub Pages depuis la branche `gh-pages` (`npm run deploy`).

### Known issues
- Les images FM montrent un autre ordre de pays et des populations plus anciennes : le site suit les données (comparaisons visuelles faites avec un jeu de test reproduisant les images).
