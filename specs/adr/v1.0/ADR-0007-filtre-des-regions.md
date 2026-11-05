# ADR-0007 : Filtre des régions

## Statut
Remplacé par ADR-0010 (2026-11-05) — accepté le même jour (choix de Koya parmi deux options, plan, Q6) ; remarque FM R2 (`prefer-native-element`) : les règles de la plateforme s'imposent.

## Contexte
FM dessine une liste ouverte sur mesure (blanche, ombre, 14 px, sans bordure) sous un bouton « Filter by Region ». Les tests visent le rôle `combobox` « Filter by Region » et les options (S13, S16, S17) ; ils marchent avec les deux options.

## Options
| Option | Pour | Contre |
|---|---|---|
| **Liste sur mesure, motif « select-only combobox » de l'APG (choisie)** | Reproduit la liste ouverte des images FM (S34, S36) ; « Filter by Region » affiché tant qu'aucune région n'est choisie | Clavier à écrire : flèches, Entrée, Échap, Début / Fin, lettres ; tests de clavier en plus |
| `<select>` natif stylé | Clavier et lecteurs d'écran gérés par le navigateur ; très peu de code | La liste ouverte garde l'aspect du système (non conforme aux images FM, absente des captures) ; l'option « All regions » s'affiche à la place de « Filter by Region » |

## Décision
- Un élément focalisable (`<div tabindex="0">`, comme l'exemple de l'APG) `role="combobox"` (`aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`), nommé par un libellé masqué « Filter by Region » ; il affiche « Filter by Region » tant que « All regions » est choisi, sinon la région. Pas de `<button>` : Entrée et Espace y produisent un clic qui se mêlerait au clavier, et ignorer ces clics casserait l'ouverture par un lecteur d'écran (vu en Phase 8).
- Une liste `role="listbox"` d'options `role="option"` (`aria-selected`) ; l'option active est signalée par `aria-activedescendant`, le focus reste sur le bouton.
- Clavier (APG) : fermé, flèche bas / haut, Entrée ou Espace ouvrent ; ouvert, flèches, Début, Fin et une lettre déplacent l'option active ; Entrée, Espace ou Tab choisissent ; Échap ferme sans changer. Un clic dehors ferme.
- Choisir une région met à jour l'adresse (ADR-0006) ; la liste se ferme et le focus reste sur le bouton.

## Conséquences
- La liste ouverte reproduit les images FM (S34, S36).
- Fitness functions « ADR-0007 » (`tests/accueil.spec.js`) : Échap ferme sans changer la région, Fin puis Entrée choisit « Oceania », l'état `aria-expanded` suit l'ouverture ; un clic sans souris ouvre la liste et choisit une région.
