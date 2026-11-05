# ADR-0009 : Images des drapeaux

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options (plan, Q10).

## Contexte
Chaque pays des données a deux images sur flagcdn.com : `flags.svg` et `flags.png` (320 px de large). Les cartes affichent le drapeau en 264 × 160 (312 × 189 en tablette), la fiche en 560 × 400. Les dimensions sont déclarées et les drapeaux au-delà des 8 premières cartes se chargent en différé (S33).

## Options
| Option | Pour | Contre |
|---|---|---|
| **`flags.svg` (choisie)** | Net à toutes les tailles, y compris la fiche (560 px) et les écrans haute densité ; souvent plus léger | Quelques SVG détaillés pèsent plus (armoiries) |
| `flags.png` (320 px) | Poids régulier | Flou sur la fiche (560 px) et sur les écrans haute densité |

## Décision
- `<img src="flags.svg">` ; dimensions déclarées (`width` / `height` : 264 × 160 sur les cartes, 560 × 400 sur la fiche), recadrage sans déformation (`object-fit: cover`), comme sur les images FM.
- Cartes : `loading="lazy"` à partir de la 9e ; texte alternatif vide (le nom suit). Fiche : chargement immédiat, « Flag of <nom> ».

## Conséquences
- Drapeaux nets partout ; pas de saut de mise en page pendant le chargement (S33).
- Fitness function « ADR-0009 » (`tests/statique.spec.js`) : les drapeaux affichés sont ceux de `flags.svg`.
