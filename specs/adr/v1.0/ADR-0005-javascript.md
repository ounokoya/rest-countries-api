# ADR-0005 : JavaScript de la page

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options (plan, Q1).

## Contexte
La page lit 250 pays, filtre pendant la frappe, affiche deux écrans (accueil, fiche) selon l'adresse (ADR-0006) et garde un thème (ADR-0008). L'ADR-0002 commun dit : « modules ES natifs, sans framework, tant que le challenge ne demande pas de gestion d'état complexe ». Le démarrage Vite est le même dans les deux cas.

## Options
| Option | Pour | Contre |
|---|---|---|
| **JavaScript sans framework (choisie)** | Suit l'ADR-0002 ; l'état tient dans l'adresse (recherche, région, pays) ; aucune dépendance ; page légère | Les écrans sont redessinés à la main (création des éléments, focus) |
| React (+ `@vitejs/plugin-react`) | Composants déclaratifs ; compétence très demandée ; souvent utilisé par les solutions FM de ce challenge | Dépendances et poids en plus ; s'écarte de l'ADR-0002 ; le HTML servi est vide avant le script (W3C et axe vérifient après rendu) |

## Décision
- Modules ES natifs, sans framework ni dépendance d'exécution (hors police, ADR-0004).
- Le HTML statique de `index.html` contient tout ce qui ne dépend pas des données : en-tête, recherche, filtre, messages, et des gabarits `<template>` (carte, fiche) clonés pour chaque pays.
- Modules : `src/data.js` (lecture de `data.json`, valeurs affichées : séparateurs, « None », listes), `src/router.js` (adresse ⇄ écran, ADR-0006), `src/home.js` (liste, recherche, filtre, annonces, focus au retour), `src/detail.js` (fiche, voisins, titre du document, focus), `src/region-filter.js` (liste des régions, ADR-0007), `src/theme.js` (bouton « Dark Mode », ADR-0008) ; `src/main.js` les relie.
- La recherche compare des noms ramenés en minuscules sans accents (`normalize('NFD')`), sans les espaces autour.

## Conséquences
- Tests par partie : `data.js` → S9, S10, S23 ; `home.js` → S7, S8, S11 à S16 ; `region-filter.js` → S13, S17 et la fitness function « ADR-0007 » ; `router.js` et `detail.js` → S18 à S25 ; `theme.js` → S26, S27.
- Le HTML servi contient la structure de la page : le validateur W3C (S31) la vérifie, et l'en-tête s'affiche avant les données.
