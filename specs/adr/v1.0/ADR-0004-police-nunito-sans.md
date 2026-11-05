# ADR-0004 : Chargement de Nunito Sans

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options.

## Contexte
Le starter ne fournit **aucun fichier de police** ; le guide de style renvoie à Google Fonts (Nunito Sans 300, 600, 800). Les tests visuels comparent des pixels (S34 à S37) : la police doit être là au moment des captures.

## Options
| Option | Pour | Contre |
|---|---|---|
| **`@fontsource/nunito-sans` (choisie)** | woff2 servis avec le site, découpés par alphabet ; aucun appel à un tiers ; même méthode que les 3 challenges précédents ; tests indépendants du réseau | Une dépendance de plus |
| Lien Google Fonts | Ce que suggère le guide ; aucune dépendance | Dépend du réseau et de Google (vie privée, captures des tests) |

## Décision
- `@fontsource/nunito-sans` en dépendance d'exécution ; seules les graisses 300, 600 et 800 sont importées dans `src/style.css`.
- `font-display: swap` (valeur du paquet) : le texte reste lisible pendant le chargement.

## Conséquences
- Aucun appel à un serveur de polices ; fitness function « ADR-0004 » (`tests/statique.spec.js`) : rien n'est chargé hors du domaine sauf les drapeaux (flagcdn.com, ADR-0009), et les trois graisses se chargent.
