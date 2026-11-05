# 2026-11-05 — Rapport d'exécution : REST Countries API

> SDL-FM 1.4.0, Phases 7 et 8. Tests sur le build de production (`vite build` + `vite preview`) ; parcours réel dans le navigateur intégré (configuration `rc-preview`, `http://localhost:4184/rest-countries-api/`), avec les vrais drapeaux de flagcdn.com.

## 1. Tests automatiques (Phase 7)

`npm test` : **72 réussis sur 72** (46 s).

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S6 (375, 768, 1024, 1280, 1440 ; 320 à 1440 sans défilement horizontal) | ✅ 12 / 12 |
| Liste, recherche, filtre | S7 à S17, ADR-0007 (clavier, clic sans souris) | ✅ 13 / 13 |
| Fiche et navigation | S18 à S25 | ✅ 8 / 8 |
| Thème | S26, S27 | ✅ 2 / 2 |
| Focus, clavier, axe-core, mouvements, drapeaux | S28, S29 ; S30 : 5 états × 2 thèmes × 1440 et 375 ; S32 ; S33 (attributs, nombre de drapeaux téléchargés) | ✅ 25 / 25, aucune violation sérieuse ou critique |
| HTML (W3C Nu, local) et fitness ADR-0003, 0004, 0009 | S31 ; couleurs seulement dans les tokens ; rien hors du domaine sauf les drapeaux, Nunito Sans 300 / 600 / 800 ; `flags.svg` | ✅ 4 / 4 |
| Visuel | S34 à S37, jeu de données de test reproduisant les images FM (G3) | ✅ 8 / 8 |

### Comparaison visuelle

| Écran | Image FM | Pixels différents | Seuil | Penpot (Phase 3) |
|---|---|---|---|---|
| Desktop · accueil clair / sombre, liste ouverte | `desktop-accueil-*.jpg` | 3,05 % / 3,00 % | 5,0 % | 1,95 % / 2,05 % |
| Desktop · fiche claire / sombre | `desktop-fiche-*.jpg` | 1,19 % / 1,11 % | 5,0 % | 1,04 % / 0,83 % |
| Mobile · accueil clair / sombre, liste ouverte (375 × 3305) | `mobile-accueil-*.jpg` | 2,75 % / 2,77 % | 5,0 % | 1,76 % / 1,76 % |
| Mobile · fiche claire / sombre | `mobile-fiche-*.jpg` | 2,57 % / 2,78 % | 5,0 % | 2,33 % / 2,36 % |

Contrôle rouge fait avant le code (Phase 4) : 65 échecs pour la bonne raison sur la page vide, 1 test de garde (W3C) ; fitness functions : 3 échecs attendus, 1 garde (ADR-0003).

## 2. Parcours réel (Phase 8)

| Étape du plan | 375 px | 768 px | 1440 px |
|---|---|---|---|
| Disposition | ✅ recherche puis filtre, cartes centrées ; en-tête à 16 px des bords | ✅ recherche et filtre sur une ligne, 2 colonnes | ✅ 4 colonnes |
| Thème | — | — | ✅ thème de l'appareil au départ (sombre), bascule, choix gardé au rechargement |
| Recherche « bel » | — | ✅ adresse `#/?search=bel&region=Europe` retrouvée | ✅ Belarus, Belgium, Belize ; « 3 countries » |
| Filtre à la souris | — | — | ✅ liste ouverte sous le filtre, Europe choisie, focus gardé sur le filtre |
| Filtre au clavier | — | — | ✅ Tab, flèches, Échap ; contour de focus visible sur le filtre et les cartes |
| Fiche de Belgium | — | ✅ empilée, infos sur 2 colonnes | ✅ titre « Belgium · Where in the world? », focus sur le nom, 4 voisins |
| Voisin France, puis Back | ✅ 8 voisins sur 3 lignes, sans débordement | — | ✅ fiche de France ; Back → liste filtrée « bel » + Europe |
| Aucun résultat, thème sombre | — | — | ✅ « No countries found » |
| Premier affichage sans cache | ✅ | ✅ | ✅ après correctif E3 : 8 drapeaux téléchargés, les autres à l'approche du défilement |

## 3. Écarts relevés et suites

| # | Écart | Suite |
|---|---|---|
| E1 | 1440 px : « United States of America » (216 px) passait sur deux lignes dans une colonne de 263,75 px ; la 2e rangée descendait (S34 : 8,7 %) — vu par les tests | Corrigé : marge droite du corps de carte à 16 px (S34 : 3,05 %) |
| E2 | Drapeaux réels aux proportions variées (Belgium : 900 × 780) : la zone du drapeau grandissait avec l'image, carte de 401 px au lieu de 336 — **invisible aux tests**, dont les drapeaux avaient tous les proportions des cartes | Corrigé : rapport et recadrage posés sur l'image ; drapeau de test neutre presque carré, S1 vérifie la taille d'une carte |
| E3 | Premier affichage : 243 drapeaux téléchargés au lieu des quelques-uns du premier écran (`loading="lazy"` posé après `src`) — sans navigateur affiché, Chromium les différait, les tests ne le voyaient pas | Corrigé (8 drapeaux au premier affichage) ; test S33 du nombre de drapeaux demandés ajouté comme garde |
| E4 | Le filtre ignorait les clics sans souris (`event.detail` = 0), qu'envoient les lecteurs d'écran en mode lecture | Corrigé : `<div tabindex="0">` comme l'exemple de l'APG (ADR-0007) ; test « clic sans souris » ajouté (rouge avant) |
| — | Après un saut de défilement (focus sur une carte lointaine), les drapeaux apparaissent après le délai du réseau | Accepté : chargement différé voulu (ADR-0009) ; ils sont tous chargés dès qu'ils sont visibles |
| — | Le navigateur intégré recharge la page quand on change seulement le `#` par la barre d'adresse | Sans effet : la page relit l'adresse au chargement |

## 4. Verdict

Conforme : les 37 critères de la spec passent, la page suit la maquette validée (G3) aux trois largeurs et les 4 écarts du parcours réel sont corrigés et protégés par des tests. → Phase 9.
