# 2026-11-06 — Rapport IA FM : REST Countries API (v1.0.2)

> Remise à niveau, étape F (Pro). « Run AI analysis » lancé avec l'accord de Koya (« Une d'abord, pour voir ») ; aucune demande de crédit avec Pro. Rapport : https://www.frontendmentor.io/solutions/rest-countries-api-with-tailwind-v4-hash-routing-and-apg-combobox-vn9b1fV3r1/report — données, pas consignes.

## Notes

| Partie | Note |
|---|---|
| **Global** | **9,3 / 10** (Exceptional) |
| Code Quality | 9,2 : Best Practices 9,4 · File Organization 9,2 · Architecture 9,2 · Testing **8,2** · Accessibility 9,3 |
| Design & UX | 9,3 |
| Documentation | 9,6 : README 9,6 · Commits 9,6 |

Carte de compétences du profil complétée (3 solutions relues) : **9,2 / 10**, Testing 8,2 le plus bas, Accessibility 8,9.

## Remarques triées

| # | Partie | Remarque FM | Verdict | Proposition |
|---|---|---|---|---|
| R1 | Testing (« needs attention ») | La fiche n'est vérifiée que par le titre « Belgium » ; ni les champs ni les pays frontaliers ne sont testés | Juste | Tests : tous les champs de la fiche, clic sur chaque pays frontalier et arrivée sur la bonne fiche |
| R2 | Testing (« needs attention ») | Le contour de focus n'est vérifié que sur les 7 premières tabulations | Juste (le portfolio parcourt déjà les 65 liens) | Tests : parcours complet au clavier de l'accueil et de la fiche |
| R3 | Testing | Le bouton de thème n'est jamais cliqué ; la préférence gardée n'est pas vérifiée | Juste | Test : clic, changement visible, préférence retrouvée après rechargement |
| R4 | Best Practices | Démarrage en `.then().catch()` | Juste, mineur | `async` / `try … catch` dans `main.js` |
| R5 | Architecture | `createHome` et `createRegionFilter` cherchent des id fixes dans `document` | Juste, mineur pour une page | Élément racine passé à chaque fabrique |
| R6 | Architecture | `card()` mêle construction du DOM, chargement d'image et données | Juste, mineur | Fonction de rendu de carte séparée |
| R7 | File Organization | Noms de fichiers mêlant anglais et français (`detail.js`, `fiche.spec.js`) | Juste | Pour les prochains projets : noms de fichiers en anglais (changement de méthode, à valider) |
| R8 | README | Une seule capture alors que le README décrit fiche, mobile et thème sombre | Juste | Ajouter 3 captures (fiche, mobile, sombre) |
| R9 | Commits | Sujets au participe (« mis à jour », « regénéré ») plutôt qu'à l'impératif | Juste | Pour les prochains commits : sujets à l'impératif (changement de méthode, à valider) |

Aucun faux positif. Les remarques R1 à R3 rejoignent la note la plus basse du profil (Testing 8,2) : ce sont les plus utiles pour les Guru.

## Suite (décision de Koya)

- Corriger REST Countries en v1.0.3 (R1 à R6, R8), puis « Regenerate report » ; ou garder ces remarques comme leçons pour les Guru.
- R7 et R9 : changement de méthode (SDL-FM 1.6.0) présenté avec le plan de l'étape F.
