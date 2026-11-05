# ADR-0007 : Filtre des régions

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options (plan, Q6).

## Contexte
FM dessine une liste ouverte sur mesure (blanche, ombre, 14 px, sans bordure) sous un bouton « Filter by Region ». Les tests visent le rôle `combobox` « Filter by Region » et les options (S13, S16, S17) ; ils marchent avec les deux options.

## Options
| Option | Pour | Contre |
|---|---|---|
| **Liste sur mesure, motif « select-only combobox » de l'APG (choisie)** | Reproduit la liste ouverte des images FM (S34, S36) ; « Filter by Region » affiché tant qu'aucune région n'est choisie | Clavier à écrire : flèches, Entrée, Échap, Début / Fin, lettres ; tests de clavier en plus |
| `<select>` natif stylé | Clavier et lecteurs d'écran gérés par le navigateur ; très peu de code | La liste ouverte garde l'aspect du système (non conforme aux images FM, absente des captures) ; l'option « All regions » s'affiche à la place de « Filter by Region » |

## Décision
- Un bouton `role="combobox"` (`aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`), nommé par un libellé masqué « Filter by Region » ; il affiche « Filter by Region » tant que « All regions » est choisi, sinon la région.
- Une liste `role="listbox"` d'options `role="option"` (`aria-selected`) ; l'option active est signalée par `aria-activedescendant`, le focus reste sur le bouton.
- Clavier (APG) : fermé, flèche bas / haut, Entrée ou Espace ouvrent ; ouvert, flèches, Début, Fin et une lettre déplacent l'option active ; Entrée, Espace ou Tab choisissent ; Échap ferme sans changer. Un clic dehors ferme.
- Choisir une région met à jour l'adresse (ADR-0006) ; la liste se ferme et le focus reste sur le bouton.

## Conséquences
- La liste ouverte reproduit les images FM (S34, S36).
- Fitness function « ADR-0007 » (`tests/accueil.spec.js`) : Échap ferme sans changer la région, Fin puis Entrée choisit « Oceania », l'état `aria-expanded` suit l'ouverture.
