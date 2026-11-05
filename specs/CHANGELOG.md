# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

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
