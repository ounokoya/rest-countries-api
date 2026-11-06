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
| R1 | Testing (« needs attention ») | La fiche n'est vérifiée que par le titre « Belgium » ; ni les champs ni les pays frontaliers ne sont testés | **En partie** : S18 (`fiche.spec.js`) vérifie déjà les 8 champs et la liste des voisins ; S19 ne suivait qu'un voisin (France) | S19 étendu : chaque voisin de Belgium ouvert, ses 8 champs et ses voisins comparés à `data.json` (vert d'emblée : test de garde) |
| R2 | Testing (« needs attention ») | Le contour de focus n'est vérifié que sur les 7 premières tabulations | Juste | S28 : parcours au Tab jusqu'au dernier élément (accueil : 253 éléments ; fiche : 6) ; vert d'emblée : test de garde |
| R3 | Testing | Le bouton de thème n'est jamais cliqué ; la préférence gardée n'est pas vérifiée | **Faux positif** : S27 (`theme.spec.js`) clique le bouton, vérifie le fond et retrouve le choix après rechargement | Aucune ; le rapport ne lit qu'une partie des fichiers (il citait `accessibilite.spec.js`) |
| R4 | Best Practices | Démarrage en `.then().catch()` | Juste, mineur | `async` / `try … catch` dans `main.js` |
| R5 | Architecture | `createHome` et `createRegionFilter` cherchent des id fixes dans `document` | Juste, mineur pour une page | Élément racine passé à chaque fabrique |
| R6 | Architecture | `card()` mêle construction du DOM, chargement d'image et données | Juste, mineur | Fonction de rendu de carte séparée |
| R7 | File Organization | Noms de fichiers mêlant anglais et français (`detail.js`, `fiche.spec.js`) | Juste | Pour les prochains projets : noms de fichiers en anglais (changement de méthode, à valider) |
| R8 | README | Une seule capture alors que le README décrit fiche, mobile et thème sombre | Juste | Ajouter 3 captures (fiche, mobile, sombre) |
| R9 | Commits | Sujets au participe (« mis à jour », « regénéré ») plutôt qu'à l'impératif | Juste | Pour les prochains commits : sujets à l'impératif (changement de méthode, à valider) |

Un faux positif (R3) et une remarque en partie couverte (R1), vus en relisant les tests avant d'en écrire : le rapport IA n'examine qu'une partie du dépôt. Premier tri fait sans relire le dépôt : corrigé le 2026-11-06. R1 et R2 rejoignent la note la plus basse du profil (Testing 8,2).

## v1.0.3 et rapport regénéré (2026-11-06, accord de Koya)

v1.0.3 publiée (`main`, tag, `gh-pages`), 74 / 74 en ligne ; « Regenerate report » : **9,4 / 10**.

| Partie | v1.0.2 | v1.0.3 |
|---|---|---|
| Global | 9,3 | **9,4** |
| Best Practices | 9,4 | 9,6 (démarrage `async` relevé) |
| Architecture | 9,2 | 9,2 (racines et `card.js` relevés, plus de remarque) |
| Testing | 8,2 | 8,4 |
| README | 9,6 | 9,8 |
| File Organization · Accessibility · Commits | 9,2 · 9,3 · 9,6 | inchangés |

Remarques restantes :

| Remarque | Verdict |
|---|---|
| Fiche : champs et voisins non vérifiés | **Faux positif** : S18 et S19 (`fiche.spec.js`) ; le relecteur ne lit que `accessibilite.spec.js` |
| Bouton de thème jamais cliqué | **Faux positif** : S27 (`theme.spec.js`) |
| Noms de fichiers anglais et français (R7) | Juste ; règle appliquée aux prochains projets (SDL-FM 1.6.0) |
| Sujets de commit au participe (R9) | Juste pour les anciens commits ; les nouveaux sont à l'impératif |

Piste si Koya le souhaite (v1.0.4) : tests renommés en anglais et une carte des tests dans le README (quel fichier vérifie la fiche, le thème, le clavier), pour que le relecteur trouve S18, S19 et S27.

## Suite (décision de Koya)

- ~~Corriger REST Countries en v1.0.3~~ : fait (voir ci-dessus).
- R7 et R9 : changement de méthode (SDL-FM 1.6.0) présenté avec le plan de l'étape F.
