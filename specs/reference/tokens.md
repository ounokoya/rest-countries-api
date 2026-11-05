# Tokens fournis par Frontend Mentor

> SDL-FM 1.4.0 Phase 1. Source : `style-guide.md`, `README.md` et `data.json` du starter. Seulement ce que FM fournit ; les valeurs mesurées viendront de l'analyse de la Phase 2 (`specs/visuel/`).

## Largeurs de maquette

| Maquette | Largeur | Images |
|---|---|---|
| Mobile | 375 px | `mobile-accueil-*.jpg` (375 × 3305), `mobile-fiche-*.jpg` (375 × 985) |
| Desktop | 1440 px | `desktop-*.jpg` (1440 × 1024) |

Les JPG mobiles de FM font 750 px de large (dessinés en 2x) : les copies de ce dossier sont réduites à 375 px (Lanczos) pour les comparaisons ; les originaux restent dans `design/`. FM demande une page correcte et conforme WCAG de 320 px aux grands écrans. Pas de maquette tablette (proposition en Phase 3).

## Couleurs

| Nom FM | Rôle FM | Valeur FM | Hex |
|---|---|---|---|
| Blue 900 | Éléments en mode sombre | `hsl(209, 23%, 22%)` | `#2B3945` |
| Blue 950 | Fond en mode sombre | `hsl(207, 26%, 17%)` | `#202C37` |
| Grey 950 | Texte en mode clair | `hsl(200, 15%, 8%)` | `#111517` |
| Grey 400 | Champ en mode clair | `hsl(0, 0%, 50%)` | `#808080` |
| Grey 50 | Fond en mode clair | `hsl(0, 0%, 99%)` | `#FCFCFC` |
| White | Texte en mode sombre, éléments en mode clair | `hsl(0, 100%, 100%)` | `#FFFFFF` |

| Contraste | Rapport | Remarque |
|---|---|---|
| Grey 950 sur White / Grey 50 | 18,4:1 / 17,9:1 | — |
| White sur Blue 900 / Blue 950 | 11,8:1 / 14,2:1 | — |
| Grey 400 sur White | **3,95:1** | < 4,5 si c'est la couleur d'un texte (texte d'exemple de la recherche, icône) : repris en Phase 2 |
| Blue 900 sur Blue 950 | 1,2:1 | Cartes et champs sombres sur le fond : limites non visibles sans ombre |
| White sur Grey 50 | 1,03:1 | Cartes et champs clairs sur le fond : limites visibles seulement par l'ombre |

Les contrastes du texte, des composants et de chaque icône sont vérifiés dans l'inventaire de la Phase 2, dans les deux thèmes.

## Typographie

| Élément | Valeur FM |
|---|---|
| Famille | [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) — **aucun fichier fourni** (choix du chargement en Phase 5) |
| Graisses | 300, 600, 800 |
| Texte de l'accueil (cartes) | 14 px |
| Texte de la fiche | 16 px |

## Icônes

Aucune icône fournie : FM propose une bibliothèque d'icônes (Font Awesome, IcoMoon, Ionicons) et accepte des icônes un peu différentes. Icônes dessinées : lune (contour en clair, pleine en sombre), loupe, chevron de la liste, flèche « Back ».

## Données (`data.json`)

| Fait | Valeur |
|---|---|
| Pays | 250, dans l'ordre alphabétique (Afghanistan, Åland Islands, Albania, Algeria…) |
| Champs dessinés | `name`, `nativeName`, `flags.svg` / `flags.png`, `population`, `region`, `subregion`, `capital`, `topLevelDomain`, `currencies`, `languages`, `borders` (codes `alpha3Code`) |
| Drapeaux | Servis par flagcdn.com (`https://flagcdn.com/de.svg`, `https://flagcdn.com/w320/de.png`) |
| Régions | Africa 60, Americas 57, Europe 53, Asia 50, Oceania 27 ; Polar, Antarctic Ocean, Antarctic : 1 pays chacune (Antarctica, Bouvet Island, Heard Island and McDonald Islands) |
| Valeurs vides | 5 pays sans capitale, 85 sans voisin, 1 sans monnaie, 2 avec une population de 0 |
| Codes des voisins | Tous présents dans les données (dont `UNK`, Republic of Kosovo) |
| Nom le plus long | United Kingdom of Great Britain and Northern Ireland |
| Population | Estimations 2024 : elles diffèrent des images FM (Germany 83,516,593 dans les données, 81,770,900 sur l'image) |

## Contenu (images FM)

| Écran | Contenu |
|---|---|
| En-tête | « Where in the world? » ; bouton lune + « Dark Mode » (le libellé reste « Dark Mode » sur les images sombres) |
| Accueil | Champ « Search for a country… » avec loupe ; liste « Filter by Region » : Africa, America, Asia, Europe, Oceania (ouverte sur les images) ; cartes : drapeau, nom, Population, Region, Capital |
| Ordre sur l'image | Germany, United States of America, Brazil, Iceland, puis Afghanistan, Åland Islands, Albania, Algeria |
| Fiche (Belgium) | Bouton « Back » ; drapeau ; nom ; Native Name, Population, Region, Sub Region, Capital ; Top Level Domain, Currencies, Languages ; « Border Countries: » France, Germany, Netherlands (les données en ont 4 : + Luxembourg) |

## Images de référence

| Fichier | Original dans `design/` |
|---|---|
| `desktop-accueil-clair.jpg`, `desktop-accueil-sombre.jpg` | `desktop-design-home-light.jpg`, `-dark.jpg` |
| `desktop-fiche-clair.jpg`, `desktop-fiche-sombre.jpg` | `desktop-design-detail-light.jpg`, `-dark.jpg` |
| `mobile-accueil-clair.jpg`, `mobile-accueil-sombre.jpg` | `mobile-design-home-light.jpg`, `-dark.jpg` (réduits de 750 à 375 px) |
| `mobile-fiche-clair.jpg`, `mobile-fiche-sombre.jpg` | `mobile-design-detail-light.jpg`, `-dark.jpg` (réduits de 750 à 375 px) |
| `apercu.jpg` | `preview.jpg` |
