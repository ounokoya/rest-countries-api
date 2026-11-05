# ADR-0006 : Adresses en `#/…` et données lues par `fetch`

## Statut
Accepté (2026-11-05) — décidé au plan (G1 : Q2, Q3, Q4).

## Contexte
Chaque pays doit avoir une adresse partageable, le retour du navigateur doit marcher et « Back » doit retrouver la recherche et la région (S16, S20 à S22). Le site est servi par GitHub Pages, qui ne sait pas renvoyer `index.html` pour un chemin inconnu. Les données doivent être lues comme une API, avec un message de chargement et un message d'erreur (S7, S8).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Adresses `#/…` (retenue au plan)** | Aucune règle de serveur ; un rechargement ou un lien partagé marche sur GitHub Pages | Le `#` reste visible dans l'adresse |
| Chemins `/country/BEL` (History API) | Adresses plus propres | GitHub Pages renvoie une 404 : copie de `index.html` en `404.html` et redirection à écrire |

## Décision
- Accueil : `#/`, avec `?search=…&region=…` quand un choix est fait ; fiche : `#/country/<alpha3Code>`. L'adresse est la seule source de vérité de l'écran : un changement d'adresse (`hashchange`) redessine l'écran.
- Recherche et filtre remplacent l'entrée d'historique (`history.replaceState`) pour ne pas empiler une entrée par lettre ; ouvrir une fiche ajoute une entrée.
- `data.json` est déplacé dans `public/` (servi tel quel par Vite) et lu une fois par `fetch` relatif à la base du site ; « Loading countries… » pendant la lecture, alerte en cas d'échec.

## Conséquences
- Back : retour d'historique quand la page précédente est la liste, sinon `#/`.
- Les tests remplacent `data.json` (jeu FM des tests visuels, erreurs, lenteur) sans toucher au code.
