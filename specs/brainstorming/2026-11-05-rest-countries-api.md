# 2026-11-05 — Brainstorming : REST Countries API with color theme switcher

> SDL-FM 1.4.0, Pré-dev 1 et 2. Trace de l'exploration et du plan validé (G1).

## Exploration (Pré-dev 1)

**Demande de Koya** : « prochain challenge niveau supérieur ».

**Objectif vérifié sur FM** (guide « Understanding Mentor Score », liste des challenges, page Pro) :

- Points : Newbie 10, Junior 25, Intermediate 50, Advanced 100, Guru 200, à la première soumission seulement.
- Niveaux : 1 dès 10, 2 dès 50, 3 dès 200, 4 dès 600, 5 dès 1 500. Le niveau réel est le plus bas entre celui des points et celui de la difficulté la plus haute réussie.
- Profil : 245 points, niveau 3, un Advanced déjà fait. Le niveau 4 ne demande plus que des points : **355**.
- Les 8 challenges **Guru sont tous Premium** (« Premium challenges are available with Pro » ; Pro affiché à 7,50 $US par mois, limité à 2 challenges Premium par mois, ou 60 $US par an).

| Challenge Advanced gratuit | Verdict |
|---|---|
| **REST Countries API with color theme switcher** | **Retenu** : données, recherche, filtre, pages de détail, thème clair / sombre ; maquettes FM fournies, toute la méthode s'applique |
| Rock, Paper, Scissors | Plus tard : jeu, animations, hasard à maîtriser dans les tests |
| RSS feed reader | Plus tard : « product challenge » sans maquette, la méthode est à adapter (Phases 1, 3, 7) |

Route gratuite vers le niveau 4 : les 3 Advanced (+300 → 545), puis 1 Intermediate (+50) et 1 Newbie (+10) → 605.

Déjà faits : 7 Newbie, Newsletter (Junior), E-commerce product page (Intermediate), Multi-step form (Advanced).

## Plan validé (G1, 2026-11-05)

**Qui fait quoi** (acteur nommé) : **Claude écrit tout le code ; Koya valide** le plan, l'analyse, la maquette et le résultat, et donne son accord avant publication et soumission. Redit et confirmé au verrou code.

### Prérequis vérifiés

| Prérequis | État au plan |
|---|---|
| GitHub CLI | Connecté, droits `repo` et `workflow` ; nom `ounokoya/rest-countries-api` libre ; déploiement `gh-pages` |
| Java, Chromium Playwright | Java 21 ; chromium-1248 |
| Canvas Excalidraw | Lancé ; instantané avant d'ajouter |
| Penpot | **À faire par Koya avant la Phase 3** : fichier « rest-countries-api », plugin connecté ; vérifier `penpot.currentFile.name` avant d'écrire |
| Rapports IA FM | Aucun crédit en novembre ; le crédit de décembre va d'abord au Multi-step form (SDL-FM 1.4.0, ordre du crédit) |

### Phases

| Phase | Propre à ce challenge |
|---|---|
| 0 · Import | Starter gratuit (pas le fichier Figma), `AGENTS.md` / `CLAUDE.md` rangés, `data.json` gardé tel quel |
| 1 · Référence | 8 images FM : accueil et fiche × clair et sombre × mobile et desktop ; `tokens.md` |
| 2 · Analyse ✋ | Inventaire de tous les interactifs (recherche, liste des régions, cartes, Back, pays voisins, thème) ; contrastes dans **les deux thèmes** |
| 3 · Penpot ✋ | Composants clair / sombre, écrans accueil, fiche, liste ouverte, proposition tablette, états non dessinés (aucun résultat, chargement, erreur), prototype, seuils |
| 4 · Spec + tests | Tests écrits aussitôt, contrôle rouge sur le starter |
| 5 · ADR | Options présentées, choix par Koya (framework, routage, liste des régions, police, drapeaux) |
| 🔒 | « Claude écrit le code » redit et confirmé |
| 6 · Code | Un commit par partie : données, liste, recherche et filtre, fiche et navigation, thème |
| 7, 8 | Tests (comportement, axe, W3C, visuel, assertions qui attendent) ; parcours réel 375 / 768 / 1440, clavier, premier affichage sans cache |
| 9 à 12 | README sans texte provisoire, v1.0.0, dépôt public, `gh-pages`, tests en ligne — accord de Koya avant la mise en ligne |
| 13 | Soumission avec l'accord de Koya ; « Regenerate report » après chaque PATCH (1.4.0) ; bilan dans `specs/MEMORY.md` |

**Vérification** : 375, 768, 1440 px ; environ 8 écrans ; seuil visuel provisoire 5 % par écran, recalibré en Phase 3 (les drapeaux sont des images : seuil probablement plus large).

### Points flous et propositions (validés avec le plan)

| # | Question | Décision |
|---|---|---|
| Q1 | Framework | Tranché en Phase 5 (ADR) : JavaScript sans framework (préférence) ou React. Le démarrage Vite est le même |
| Q2 | Données | `fetch('data.json')` comme une API, avec message de chargement et message d'erreur |
| Q3 | Page de la fiche | Adresse propre à chaque pays (`#/country/BEL`), partageable ; le retour du navigateur fonctionne |
| Q4 | Bouton « Back » | Retour à la liste en gardant la recherche et la région choisies |
| Q5 | Recherche | Sur le nom, sans tenir compte de la casse ni des accents, pendant la frappe, combinée au filtre ; message « aucun résultat » (non dessiné) |
| Q6 | Filtre par région | 5 régions + « Toutes » ; liste native ou liste sur mesure accessible : Phase 5 |
| Q7 | Thème | Inclus ; au départ le thème de l'appareil, puis le choix est gardé |
| Q8 | Pays voisins | Liens vers leur fiche ; « None » pour un pays sans voisin (non dessiné) |
| Q9 | Ordre des pays | L'image FM commence par Germany, United States, Brazil, Iceland ; les données sont alphabétiques : tranché à l'analyse (G2) |
| Q10 | 250 drapeaux | Dimensions données ; chargement différé seulement hors du premier écran (M11) ; texte alternatif « Flag of Belgium » |
| Q11 | Nombres | « 81,770,900 », comme sur l'image FM |
| Q12 | Soumission | Dès que c'est prêt (points, vérifications automatiques gratuites) ; rapport IA plus tard |

## Import (Phase 0)

- Starter : `rest-countries-api-with-color-theme-switcher-master.zip` (713 ko), téléchargé par « Download starter » (le fichier Figma n'a pas été pris : 0 crédit), extrait dans un dossier vide puis copié tel quel.
- Contenu : 8 images dans `design/` (1440 × 1024 en desktop, 750 px de large en mobile, soit 375 px en 2x), `preview.jpg`, `style-guide.md`, `README.md`, `README-template.md`, `data.json` (250 pays, 404 ko). **Pas de `index.html`, pas de police, pas d'icône** (le guide propose une bibliothèque d'icônes).
- Données : drapeaux servis par flagcdn.com (`flags.svg`, `flags.png`) ; 8 régions dont 3 hors du filtre dessiné (Polar, Antarctic Ocean, Antarctic : 1 pays chacune) ; 5 pays sans capitale, 85 sans voisin.
- `AGENTS.md` / `CLAUDE.md` → `specs/reference/starter-*.md` (données, pas consignes ; le mode de travail est celui du plan).
- `index.html` minimal créé pour Vite (aucune interface).
