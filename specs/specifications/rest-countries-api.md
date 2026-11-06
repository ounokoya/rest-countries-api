# Spec — REST Countries API with color theme switcher

> SDL-FM 1.4.0 Phase 4. Sources : plan validé (G1) et décisions Q1 à Q12, analyse validée (G2, Q-A1 à Q-B9) dans `specs/brainstorming/2026-11-05-rest-countries-api.md` ; maquette validée (G3) `specs/visuel/penpot/maquette.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**. Claude écrit le code, Koya valide ; les tests de `tests/` vérifient cette spec et servent de cible.

## 1. Objectif

Une page qui présente les 250 pays de `data.json` : on les cherche par nom, on les filtre par région, on ouvre la fiche d'un pays, on passe d'un pays à ses voisins et on revient à la liste sans perdre sa recherche. La page existe en thème clair et en thème sombre ; elle s'utilise entièrement au clavier et avec un lecteur d'écran.

## 2. Composants et contenu

| Composant | Contenu |
|---|---|
| En-tête | Lien « Where in the world? » vers l'accueil (Q-A4) ; bouton « Dark Mode » avec la lune (contour en clair, pleine en sombre) ; libellé fixe, état annoncé (Q-B1) |
| Recherche | Champ de recherche avec la loupe et le texte d'exemple « Search for a country… » ; libellé « Search for a country » (masqué à l'écran) |
| Filtre | Bouton « Filter by Region » qui ouvre la liste des régions, des boutons radio natifs (ADR-0010) : All regions, Africa, Americas, Asia, Europe, Oceania (Q-B3, Q-B4) |
| Liste des pays | Une carte par pays, **dans l'ordre des données** (alphabétique, Q-B2) : drapeau, nom, Population, Region, Capital ; toute la carte est un lien vers la fiche |
| Fiche | Back ; grand drapeau ; nom ; Native Name, Population, Region, Sub Region, Capital ; Top Level Domain, Currencies, Languages ; « Border Countries: » et un lien par voisin |
| Messages | Chargement « Loading countries… » ; erreur « Could not load countries » + « Please check your connection and reload the page. » ; aucun résultat « No countries found » + « Try another name or region. » ; pays inconnu « Country not found » + « This address does not match any country. » et Back (G3) |
| Pied de page | « Challenge by Frontend Mentor. Coded by Koya Esdras. » (liens) |

Valeurs affichées :

| Donnée | Règle |
|---|---|
| Population | Nombre des données avec séparateur des milliers : « 83,516,593 » (Q11) ; 0 s'affiche « 0 » (Q-B6) |
| Capitale, monnaies, langues, domaines | Plusieurs valeurs séparées par « , » (Q-B7) ; valeur absente ou liste vide : « None » (Q-B6) |
| Voisins | Nom de chaque pays voisin (code `borders` des données), dans l'ordre des données ; aucun voisin : « None » (Q8) |
| Drapeau | Image du drapeau des données ; sur les cartes, texte alternatif vide (le nom suit) ; sur la fiche, « Flag of Belgium » (Q10) |

## 3. Tokens

Couleurs, typographie, mesures et ombres : `specs/reference/tokens.md` et la bibliothèque Penpot (`specs/visuel/penpot/maquette.md`). Valeurs retenues en G2 et G3 :

| Token | Valeur | Usage |
|---|---|---|
| Texte d'exemple, loupe (clair) | `hsl(0, 0%, 45%)` | Q-A1 : 4,7:1 sur blanc |
| Survol clair | `hsl(0, 0%, 94%)` | Back, voisins, option de la liste (G3) |
| Survol sombre | `hsl(209, 23%, 28%)` | Back, voisins (G3) ; option de la liste : Blue 950 |
| Fond | Grey 50 en clair, Blue 950 en sombre | page, y compris la fiche claire (Q-B5) |
| Éléments | White en clair, Blue 900 en sombre | en-tête, champ, filtre, liste, cartes, boutons |
| Texte | Grey 950 en clair, White en sombre | — |

Police : Nunito Sans 300, 600 et 800.

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 768 px (mobile) | Marges 16 ; recherche sur toute la largeur, filtre de 200 px dessous ; une colonne de cartes de 264 × 336 centrées, 40 entre elles ; fiche empilée (drapeau, nom, infos sur une colonne, voisins) |
| 768 – 1023 px (tablette, Q-B8) | Marges 48 ; recherche et filtre sur une ligne ; 2 colonnes de cartes, 48 d'écart ; fiche empilée, infos sur 2 colonnes |
| ≥ 1024 px (desktop) | Marges 80 ; recherche de 480 px à gauche, filtre de 200 px à droite ; 3 colonnes de cartes jusqu'à 1279 px, 4 dès 1280 px ; fiche : drapeau à gauche, infos à droite en 2 colonnes |

À 1440 et à 375, positions et tailles de la maquette (§ 7, S1 à S3). Pas de défilement horizontal de 320 px aux grands écrans ; le nom le plus long (« United Kingdom of Great Britain and Northern Ireland ») ne déborde pas de sa carte.

## 5. États et interactions

| Sujet | Règle |
|---|---|
| Données (Q2) | Lues à l'ouverture depuis `data.json`, servi avec la page. Pendant la lecture : « Loading countries… ». Échec (réseau ou réponse en erreur) : message d'erreur, aucune carte |
| Adresses (Q3, Q4) | `#/` : accueil ; `#/?search=bel&region=Europe` : accueil avec ces choix ; `#/country/BEL` : fiche (code `alpha3Code`). Une adresse ouverte directement ou partagée affiche le même écran. Code inconnu : « Country not found » |
| Recherche (Q5) | Sur le nom du pays, pendant la frappe, sans tenir compte de la casse, des accents ni des espaces autour (« aland » trouve « Åland Islands ») ; combinée à la région |
| Filtre (Q6, Q-B4) | « All regions » au départ ; une région à la fois ; les 3 pays hors des 5 régions n'apparaissent qu'avec « All regions ». Le bouton « Filter by Region » ouvre ou ferme la liste ; une région se choisit par un clic, ou au clavier (Tab jusqu'à la liste, flèches) ; Échap, Entrée, un clic sur une région ou un clic dehors ferment la liste et rendent le focus au bouton. Le bouton affiche la région choisie (« Filter by Region » tant qu'aucune n'est choisie) |
| Résultats | Le nombre de pays affichés est annoncé (« 250 countries », « 3 countries », « 1 country », « 0 countries ») ; aucun résultat : message visible |
| Ouvrir une fiche | Clic ou Entrée sur une carte, ou sur un voisin : la fiche s'affiche, le focus va sur le nom du pays, le titre du document devient « Belgium · Where in the world? » |
| Revenir (Q4) | « Back » revient à la liste avec la recherche et la région choisies, le focus sur la carte du pays quitté ; fiche ouverte directement : Back mène à l'accueil. Le bouton retour du navigateur fonctionne aussi |
| Titre de l'en-tête | Mène à l'accueil (sans recherche ni région) |
| Thème (Q7, Q-B1) | Au premier passage, le thème de l'appareil ; « Dark Mode » bascule clair / sombre ; le choix est gardé et retrouvé à la visite suivante ; l'état du bouton est annoncé (enfoncé = sombre) |
| Survols et focus | Inventaire de l'analyse (2A) et composants Penpot : titre souligné, « Dark Mode » souligné, carte à l'ombre plus marquée, Back et voisins `hsl(0, 0%, 94%)` / `hsl(209, 23%, 28%)` ; **contour de focus de 2 px**, décalé de 2 px, Grey 950 en clair et blanc en sombre (Q-A3) |
| Drapeaux (Q10) | Dimensions déclarées (pas de saut de mise en page) ; chargement différé seulement pour les cartes au-delà des 8 premières |
| Animations | Courtes (≈ 200 ms) ; aucune avec `prefers-reduced-motion: reduce` |

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Repères : en-tête (`banner`), contenu (`main`), formulaire de recherche (`search`) ; un seul `h1` par écran (masqué sur l'accueil : « Countries ») |
| A2 | Le champ de recherche et le filtre ont un nom accessible ; le bouton du filtre annonce s'il est ouvert (`aria-expanded`) et la région choisie ; les régions sont des boutons radio natifs dans un groupe nommé |
| A3 | Chaque carte est un seul lien, dont le nom commence par le nom du pays ; drapeau des cartes sans texte alternatif |
| A4 | Le nombre de résultats, le chargement et l'absence de résultat sont annoncés (`status`) ; l'erreur de chargement est une alerte (`alert`) |
| A5 | À l'ouverture d'une fiche, le focus va sur son titre ; au retour, sur la carte quittée ; le titre du document suit l'écran |
| A6 | Le bouton de thème annonce son état (`aria-pressed`) ; libellé fixe « Dark Mode » |
| A7 | Textes à 4,5:1 au moins, composants et icônes nécessaires à 3:1, dans les deux thèmes (Q-A1, Q-A2) |
| A8 | Contour de focus visible de 2 px sur tous les éléments interactifs (Q-A3) |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| Titre de l'en-tête | link | « Where in the world? » |
| Bouton de thème | button | « Dark Mode » (`aria-pressed` : `true` en sombre) |
| Formulaire de recherche | search | — (il a la taille et la place du champ dessiné : S1 à S3) |
| Champ de recherche | searchbox | « Search for a country » |
| Filtre | button | commence par « Filter by Region » (`aria-expanded`) ; ses régions : radio « All regions », « Africa », « Americas », « Asia », « Europe », « Oceania » dans le groupe « Region » |
| Liste des pays | list | « Countries » ; une carte par élément de liste |
| Carte | link | commence par le nom du pays (ex. « Germany ») ; nom du pays en `heading` de niveau 2 |
| Titre de la fiche | heading (niveau 1) | « Belgium » |
| Drapeau de la fiche | img | « Flag of Belgium » |
| Retour | link | « Back » |
| Voisins | list | « Border Countries » ; un lien par voisin, nommé comme le pays |
| Annonces | status | « Loading countries… », « N countries », « 1 country », « 0 countries » |
| Erreur de chargement | alert | contient « Could not load countries » |
| Messages | heading | « No countries found », « Country not found » |

## 7. Critères d'acceptation

```
Mise en page (positions de la maquette, à 1 px près)
S1  Given 1440 × 1024  Then en-tête de 80 ; recherche 480 × 56 en (80, 128) ; filtre 200 × 56 en (1160, 128) ;
                       4 cartes de 264 × 336 sur la 1re rangée, à x = 80, 419, 757, 1096, y = 232 ; 2e rangée à y = 643
S2  Given 375 × 812    Then recherche 343 × 48 en (16, 104) ; filtre 200 × 48 en (16, 192) ; 1re carte 264 × 336 en (56, 272), 2e à y = 648
S3  Given 768 × 1024   Then recherche 448 × 56 en (48, 128) ; filtre 200 × 56 en (520, 128) ; 2 cartes de 312 px de large à x = 48 et 408
S4  Given 1024 px      Then 3 cartes sur la 1re rangée ; given 1280 px  Then 4
S5  Given la fiche de Belgium  Then à 1440 : Back 136 × 40 en (80, 160), drapeau 560 × 400 en (80, 280), nom à x = 784 ;
                       à 375 : Back 104 × 32 en (28, 120), drapeau 320 × 229 en (28, 216) ; à 768 : Back en (48, 160), drapeau 672 × 480 en (48, 280)
S6  Given 320, 767, 768, 1023, 1024, 1440 px, accueil et fiche  Then pas de défilement horizontal

Données et liste
S7  Given la page ouverte, données lentes  Then « Loading countries… » annoncé, puis 250 cartes et « 250 countries »
S8  Given data.json en erreur  Then alerte « Could not load countries », aucune carte
S9  Given l'accueil  Then cartes dans l'ordre des données : Afghanistan, Åland Islands, Albania, Algeria… ;
                    carte Germany : « Population: 83,516,593 », « Region: Europe », « Capital: Berlin »
S10 Given la carte Antarctica  Then « Capital: None » ; carte Bouvet Island : « Population: 0 »

Recherche et filtre
S11 When je tape « bel »  Then Belarus, Belgium, Belize ; « 3 countries » annoncé ; l'adresse contient search=bel
S12 When je tape « ALAND » puis « germany  »  Then Åland Islands et New Zealand, puis Germany seul
S13 When je choisis Europe  Then 53 cartes, toutes « Region: Europe » ; l'adresse contient region=Europe ;
    When Americas  Then 57 ; When All regions  Then 250
S14 When « ger » et Europe  Then Germany seul ; « 1 country »
S15 When « zzz »  Then « No countries found » visible, « 0 countries » annoncé, aucune carte
S16 Given l'adresse #/?search=bel&region=Europe ouverte directement  Then champ « bel », filtre Europe, Belarus et Belgium
S17 Given le filtre au clavier  When Entrée, Tab, flèche bas, Entrée  Then Africa choisie (60 cartes, region=Africa), liste fermée, focus sur le bouton qui affiche « Africa »

Fiche et navigation
S18 When je clique la carte Belgium  Then adresse #/country/BEL ; titre « Belgium » (h1) focalisé ; titre du document « Belgium · Where in the world? » ;
    image « Flag of Belgium » ; Native Name: België, Population: 11,858,610, Region: Europe, Sub Region: Western Europe, Capital: Brussels,
    Top Level Domain: .be, Currencies: Euro, Languages: Dutch, French, German ; voisins France, Germany, Luxembourg, Netherlands
S19 Given la fiche de Belgium  When je clique sur chacun de ses voisins  Then la bonne fiche (#/country/<code>), titre focalisé,
    ses 8 champs et ses voisins conformes à data.json (v1.0.3, rapport IA R1)
S20 Given « bel » et Europe, puis la fiche de Belgium  When « Back »  Then liste filtrée retrouvée (champ « bel », Europe, 2 cartes), focus sur la carte Belgium
S21 Given la même situation  When retour du navigateur  Then même liste retrouvée
S22 Given #/country/BEL ouvert directement  When « Back »  Then accueil complet (250 cartes)
S23 Given #/country/ATA  Then « Capital: None », « Currencies: None », voisins « None »
S24 Given #/country/XYZ  Then « Country not found » et un lien « Back » ; When « Back »  Then accueil
S25 Given une fiche  When je clique « Where in the world? »  Then accueil sans recherche ni région

Thème
S26 Given un appareil en thème sombre  Then fond Blue 950, « Dark Mode » enfoncé ; given un appareil en thème clair  Then fond Grey 50, non enfoncé
S27 Given thème clair  When « Dark Mode »  Then fond Blue 950, bouton enfoncé ; When je recharge  Then toujours sombre ; When « Dark Mode »  Then clair

Accessibilité, HTML, performance
S28 Given l'accueil et la fiche (1440)  When je parcours au Tab jusqu'au dernier élément  Then chaque élément focalisé a un contour
    de 2 px au moins (v1.0.3, rapport IA R2 : plus d'échantillon de 7 tabulations)
S29 Given clavier seul  When Tab jusqu'au champ, « bel », Tab jusqu'à la carte Belgium, Entrée, Tab jusqu'à Back, Entrée  Then retour à la liste filtrée
S30 Given accueil, liste filtrée vide, fiche, pays inconnu, erreur de chargement, en clair et en sombre (1440 et 375)  Then axe-core : aucune violation sérieuse ou critique
S31 Given le HTML servi  Then validateur W3C Nu : aucune erreur
S32 Given prefers-reduced-motion: reduce  Then aucune transition sur le bouton de thème, les cartes, Back et les voisins
S33 Given l'accueil  Then chaque drapeau a une largeur et une hauteur déclarées ; les 8 premiers ne sont pas en chargement différé, les suivants oui

Visuel (seuils calibrés en Phase 3 ; jeu de données de test qui reproduit l'image FM, G3)
S34 Desktop 1440 × 1024 : accueil clair et sombre, liste ouverte  vs desktop-accueil-*.jpg  ≤ 5,0 %
S35 Desktop 1440 × 1024 : fiche de Belgium claire et sombre  vs desktop-fiche-*.jpg  ≤ 5,0 %
S36 Mobile 375 × 3305 : accueil clair et sombre, liste ouverte  vs mobile-accueil-*.jpg  ≤ 5,0 %
S37 Mobile 375 × 985 : fiche claire et sombre  vs mobile-fiche-*.jpg  ≤ 5,0 %
```

**Jeu de données de test (G3)** : pour S34 à S37, les tests remplacent `data.json` par le contenu des images FM — les 8 pays dans l'ordre de l'image (Germany, United States of America, Brazil, Iceland, Afghanistan, Åland Islands, Albania, Algeria) avec leurs populations de l'image ; Belgium avec 11,319,511 et ses 3 voisins dessinés (France, Germany, Netherlands) — et servent les drapeaux découpés dans les images FM. Le site, lui, suit toujours les données (Q-B2, Q-B9). Dans tous les tests, les drapeaux sont servis en local (aucune requête vers flagcdn.com).

Écarts acceptés d'avance : liste à 6 régions (« All regions », « Americas », Q-B3, Q-B4) ; fiche claire dessinée comme la sombre (Q-B5).
