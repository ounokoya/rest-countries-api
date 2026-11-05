# Maquette Penpot — REST Countries API

> SDL-FM 1.4.0 Phase 3. Fichier Penpot : « API REST Countries » (créé par Koya ; nom vérifié avant chaque écriture), page « REST Countries ». **En attente de G3.**
> Décisions G2 appliquées : texte d'exemple et loupe en gris AA (Q-A1), limites par ombre seule (Q-A2), contour de focus 2 px décalé de 2 px (Q-A3), titre en lien vers l'accueil (Q-A4), libellé fixe « Dark Mode » et lune pleine en sombre (Q-B1), « Americas » (Q-B3), « All regions » en tête de liste (Q-B4), fiche claire dessinée comme la fiche sombre (Q-B5), proposition tablette (Q-B8).

## Rendu des exports

L'exportateur PNG de Penpot n'a pas les polices (M16). Chaque écran est exporté en **SVG**, ses `<style>` sont retirés, ses images (adresse interne de Penpot) sont remplacées par les drapeaux découpés dans les images FM, puis il est rendu dans Chromium avec **Nunito Sans** chargée depuis Google Fonts (300, 600, 800). Dans le fichier Penpot, les textes sont en Nunito Sans (police Google de Penpot).

## Bibliothèque

### Couleurs

| Groupe | Nom | Valeur |
|---|---|---|
| FM | Blue 900, Blue 950, Grey 950, Grey 400, Grey 50, White | valeurs de `tokens.md` |
| Dérivée G2 | Grey texte d'exemple AA (Q-A1) | `#737373` = `hsl(0, 0%, 45%)`, 4,7:1 sur blanc |
| Proposée G3 | Survol clair (Back, voisins, option de la liste) | `#F0F0F0` = `hsl(0, 0%, 94%)` |
| Proposée G3 | Survol sombre (Back, voisins) | `#374858` = `hsl(209, 23%, 28%)` |

| Thème | Fond | Éléments | Texte, icônes | Texte d'exemple, loupe |
|---|---|---|---|---|
| Clair | Grey 50 | White | Grey 950 | `#737373` |
| Sombre | Blue 950 | Blue 900 | White | White |

### Typographie (Nunito Sans, interligne 1,364 ; tailles calées sur la largeur des textes dans Chromium)

| Usage | Desktop | Mobile |
|---|---|---|
| Titre de l'en-tête | 800, 24 px | 800, 14 px |
| « Dark Mode » | 600, 16 px | 600, 12 px |
| Recherche, filtre, régions | 300, 14 px | 300, 12 px |
| Nom sur la carte | 800, 18 px | 800, 18 px |
| Lignes de la carte | 14 px, libellé 600 et valeur 300 | idem |
| Back | 300, 16 px | 300, 14 px |
| Nom sur la fiche | 800, 32 px | 800, 22 px |
| Lignes de la fiche | 16 px, libellé 600 et valeur 300 | 14 px |
| « Border Countries: » | 600, 16 px | 600, 16 px |
| Voisins | 300, 14 px | 300, 12 px |
| Messages des états | 800, 18 px + 300, 16 px | — |

### Mesures (px)

| Élément | Desktop 1440 | Mobile 375 |
|---|---|---|
| En-tête | 1440 × 80, marges 80 | 375 × 80, marges 16 |
| Recherche | 480 × 56 à (80, 128), rayon 5 ; loupe 18 px à 32 du bord ; texte à 75 | 343 × 48 à (16, 104) ; loupe 16 px |
| Filtre | 200 × 56 aligné à droite ; chevron 10 × 6 | 200 × 48 à (16, 192) ; chevron 8 × 5 |
| Liste des régions | 200 × 192, 4 sous le filtre, une région tous les 28 | 200 × 165, une tous les 24 |
| Cartes | 264 × 336 (drapeau 264 × 160), rayon 5 ; colonnes à x 80, 419, 757, 1096 ; rangées tous les 411 | x 56, tous les 376 |
| Corps de carte | marge 24 ; nom à 30 sous le drapeau (haut des capitales) ; lignes tous les 24 | idem |
| Back | 136 × 40 à (80, 160), rayon 6 ; flèche 18 × 12 | 104 × 32 à (28, 120), rayon 4 ; flèche 16 × 11 |
| Drapeau de la fiche | 560 × 400 à (80, 280) | 320 × 229 à (28, 216) |
| Infos de la fiche | nom à x 784 ; colonne 2 à x 1107 ; lignes tous les 32 | x 28 ; lignes tous les 32 ; 2e groupe 64 plus bas |
| Voisins | 96 × 28, 10 d'écart, rayon 2 | idem |

Tablette 768 (proposition Q-B8) : marges 48 ; recherche 448 × 56 et filtre 200 × 56 sur une ligne ; 2 colonnes de cartes de 312 × 365 (drapeau 312 × 189), 48 d'écart ; fiche empilée : drapeau 672 × 480, infos en 2 colonnes (x 48 et 408).

### Ombres

| Élément | Ombre |
|---|---|
| En-tête | 0 2 4 0, noir 6 % |
| Recherche, filtre, liste, cartes | 0 0 7 2, noir 3 % |
| Carte au survol | 0 4 16 0, noir 12 % (35 % en sombre) |
| Back | 0 0 7 0, noir 29 % |
| Voisins | 0 0 4 1, noir 10 % |
| Drapeau de la fiche | 0 0 14 4, noir 3 % |

## Icônes et drapeaux

- FM ne fournit aucune icône : lune (contour en clair, pleine en sombre), loupe, chevron et flèche « Back » sont **dessinés en SVG** (traits ronds, couleur du texte). Leur forme finale dans le code (SVG en ligne ou bibliothèque) est un point de l'ADR (Phase 5).
- Les drapeaux de la maquette sont **découpés dans les images FM** (rien n'est téléchargé). Le site, lui, affiche les drapeaux des données (`flags.svg`, flagcdn.com).

## Composants (`composants.png`)

36 composants, chacun en clair et en sombre :

| Composant | États |
|---|---|
| Bouton thème | Normal · Survol (texte souligné) · Focus clavier |
| Recherche | Normal (texte d'exemple) · Focus clavier · Rempli |
| Filtre | Fermé · Focus clavier |
| Liste des régions | Option survolée ou surlignée au clavier (Africa) · région choisie en 600 (Europe) |
| Carte pays | Normal · Survol (ombre plus marquée) · Focus clavier |
| Back | Normal · Survol (`#F0F0F0` / `#374858`) · Focus clavier |
| Voisin | Normal · Survol (`#F0F0F0` / `#374858`) · Focus clavier |

Contour de focus partout : 2 px, décalé de 2 px, Grey 950 en clair, blanc en sombre (Q-A3).

## Écrans et seuils visuels (calibrage 1.1.0)

Écart = part des pixels dont un canal diffère de plus de 40 sur 255. Seuil de l'écran pour la Phase 7 = **max(5 %, écart + 1 point)**.

| Écran Penpot | Image FM | Écart | Seuil Phase 7 |
|---|---|---|---|
| Desktop · Accueil · clair · liste ouverte | `desktop-accueil-clair.jpg` | 1,95 % | 5,0 % |
| Desktop · Accueil · sombre · liste ouverte | `desktop-accueil-sombre.jpg` | 2,05 % | 5,0 % |
| Desktop · Fiche · clair | `desktop-fiche-clair.jpg` | 1,04 % | 5,0 % |
| Desktop · Fiche · sombre | `desktop-fiche-sombre.jpg` | 0,83 % | 5,0 % |
| Mobile · Accueil · clair · liste ouverte (375 × 3305) | `mobile-accueil-clair.jpg` | 1,76 % | 5,0 % |
| Mobile · Accueil · sombre · liste ouverte | `mobile-accueil-sombre.jpg` | 1,76 % | 5,0 % |
| Mobile · Fiche · clair (375 × 985) | `mobile-fiche-clair.jpg` | 2,33 % | 5,0 % |
| Mobile · Fiche · sombre | `mobile-fiche-sombre.jpg` | 2,36 % | 5,0 % |

Notes :
- Les écarts viennent surtout du lissage du texte, de la liste à 6 régions (« All regions », « Americas ») et, pour la fiche claire, de la mise en page de la fiche sombre (Q-B5) ; positions à ± 1 px.
- Pour se comparer à l'image, la maquette reprend son **contenu** : les 8 pays dans l'ordre de l'image (Germany en premier), les populations de l'image et les 3 voisins dessinés de Belgium. Le site suivra les données : ordre alphabétique (Q-B2), populations 2024 (Q-B9), 4 voisins pour Belgium (avec Luxembourg).

Écrans sans image FM : Desktop et Mobile · Accueil · clair et sombre (liste fermée) ; **Tablette · Accueil et Fiche (Q-B8)** ; **États** : aucun résultat (« No countries found »), chargement (« Loading countries… »), erreur de chargement (« Could not load countries »), pays inconnu (« Country not found » + Back).

## Prototype (fondu 200 ms)

| Parcours | Enchaînement |
|---|---|
| **Desktop · parcours (clair ⇄ sombre)** | Accueil → Filtre → liste ouverte → clic sur la liste ou le filtre → liste fermée ; clic sur une carte → Fiche ; Back ou titre → Accueil ; bouton thème → même écran dans l'autre thème |
| **Mobile · parcours (clair ⇄ sombre)** | Même enchaînement sur les écrans mobiles |
| **Tablette · proposition Q-B8** | Carte → Fiche → Back |

104 liens. Simplifications : toutes les cartes mènent à la fiche de Belgium ; la recherche et le choix d'une région ne filtrent pas (montrés par l'état « aucun résultat » et les composants) ; les survols sont montrés par les composants.

## Fichiers

- `desktop-*.png`, `mobile-*.png`, `tablette-*.png`, `etat-*.png` : rendus des 18 écrans.
- `comparaison-*.png` : image FM | maquette | écarts en rouge (moitié de la taille), pour les 8 écrans calibrés.
- `composants.png` : les 36 composants et leurs états.
- `apercu-maquette.png` : aperçu des écrans principaux.
