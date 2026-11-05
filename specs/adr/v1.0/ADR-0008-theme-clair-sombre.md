# ADR-0008 : Thème posé sur `<html>` avant le premier affichage, choix gardé dans le navigateur

## Statut
Accepté (2026-11-05) — décidé au plan (G1 : Q7) et à l'analyse (Q-B1).

## Contexte
Au premier passage, la page suit le thème de l'appareil ; ensuite le choix du visiteur est gardé (S26, S27). Un thème appliqué après le chargement du script ferait clignoter la page en clair avant de passer en sombre.

## Décision
- Attribut `data-theme="light|dark"` sur `<html>`, posé par un court script en ligne dans `<head>`, avant les styles : choix gardé (`localStorage`) sinon `prefers-color-scheme`.
- Variante Tailwind `dark` liée à cet attribut (`@custom-variant dark`) ; les rôles de couleur de l'ADR-0003 changent de valeur sous `[data-theme="dark"]`.
- Bouton « Dark Mode » (libellé fixe, Q-B1) avec `aria-pressed` ; un clic bascule l'attribut et enregistre le choix. Lune en contour (clair) ou pleine (sombre).

## Conséquences
- Pas de clignotement au chargement ; la page reste utilisable si `localStorage` est bloqué (thème de l'appareil).
- Le script en ligne est la seule exception au « JS en modules » ; il tient en quelques lignes.
