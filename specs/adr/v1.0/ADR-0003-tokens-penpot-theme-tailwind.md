# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`), deux thèmes par variables

## Statut
Accepté (2026-11-05) — même décision que les challenges précédents, adaptée aux deux thèmes.

## Contexte
La bibliothèque Penpot (validée G3, `specs/visuel/penpot/maquette.md`) fixe les 6 couleurs FM, la couleur dérivée de G2 (Q-A1), les survols de G3 et les rôles de chaque couleur dans les thèmes clair et sombre. Décisions communes : ADR-0001, ADR-0002 (`frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans un seul bloc `@theme` et vide la palette par défaut (`--color-*: initial`).
- Couleurs FM : `--color-blue-900`, `--color-blue-950`, `--color-grey-950`, `--color-grey-400`, `--color-grey-50`, `--color-white` (valeurs `hsl()` du style-guide) ; dérivées : `--color-grey-placeholder` (Q-A1), `--color-hover-light`, `--color-hover-dark` (G3).
- Couleurs **par rôle** (`--color-page`, `--color-element`, `--color-text`, `--color-placeholder`, `--color-hover`, `--color-focus`) : définies pour le thème clair, redéfinies pour le thème sombre (ADR-0008). Le code n'utilise que les rôles ; un thème = un jeu de valeurs.
- `--font-sans: "Nunito Sans", sans-serif` (chargement : ADR-0004). Tailles de texte, rayons et ombres : un token par valeur répétée, d'après `maquette.md`.

## Conséquences
- Changer une couleur du design = changer une ligne ; ajouter un thème = un bloc de rôles.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`) dans `index.html`, `src/*.js`, ni dans `src/style.css` hors des blocs `@theme` et des rôles.
