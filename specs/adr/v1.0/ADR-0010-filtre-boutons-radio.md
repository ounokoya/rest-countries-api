# ADR-0010 : Filtre des régions en boutons radio natifs, ouverts par un bouton

## Statut
Accepté (2026-11-05) — choix de Koya (option 2 parmi deux) ; remplace l'ADR-0007.

## Contexte
L'ADR-0007 avait retenu une liste sur mesure (`role="combobox"` + `role="listbox"`, motif de l'APG). Les vérifications automatiques de FM la signalent (R2, `prefer-native-element` : « Prefer to use the native `<select>` element »). Règle de Koya : **les règles de la plateforme s'imposent**, on ne garde aucune remarque par choix de design. Il faut aussi garder la liste ouverte des images FM (S34, S36).

## Options
| Option | Pour | Contre |
|---|---|---|
| `<select>` natif | Le plus simple, 0 remarque | Liste ouverte à l'aspect du système (non conforme aux images FM) ; « All regions » à la place de « Filter by Region » |
| **Bouton + boutons radio natifs (choisie)** | 0 remarque : aucun rôle ARIA de widget ; aspect FM gardé ; groupe, flèches et lecteurs d'écran gérés par le navigateur | Clavier différent d'une liste déroulante : Tab jusqu'à la liste, puis flèches |

## Décision
- `<button aria-expanded aria-controls>` qui affiche la région choisie (« Filter by Region » sinon) ; nom accessible « Filter by Region », suivi de la région choisie (`aria-labelledby`).
- `<fieldset>` caché par défaut, `<legend>` « Region » (masquée), 6 `<label>` contenant un `<input type="radio" name="region">` ; le bouton radio, invisible, couvre toute la ligne (M17) ; ligne survolée ou focalisée en `hover`, région choisie en 600.
- Une région choisie (clic, flèches) filtre aussitôt. Un clic de souris sur une région, Entrée, Échap, un clic ou un focus hors du filtre ferment la liste ; Entrée et Échap rendent le focus au bouton. Un clic sans souris (lecteur d'écran) choisit sans fermer.

## Conséquences
- Plus de clavier écrit à la main (flèches, Début, Fin, lettres) : `src/region-filter.js` ne gère qu'ouvrir, fermer et afficher le choix.
- Tests : S13, S16, S17 et les fitness functions « ADR-0010 » (`tests/accueil.spec.js`) ; test de garde « Règles FM — html-validate » **sans exception**.
