# Soumission Frontend Mentor

> SDL-FM 1.4.0 Phase 13. Textes préparés pour le formulaire « Submit solution » du challenge. La soumission est publique et faite au nom de Koya : elle n'est envoyée qu'avec son accord, au moment de l'envoi.
>
> **Envoyée le 2026-11-05** avec l'accord de Koya, textes ci-dessous inchangés (les 5 tags existent sur FM) ; titre et 2 réponses mis à jour avec « Edit solution » après la v1.0.2 (accord de Koya) : https://www.frontendmentor.io/solutions/rest-countries-api-with-tailwind-v4-hash-routing-and-apg-combobox-vn9b1fV3r1

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | REST Countries API with Tailwind v4, hash routing & native radios (v1.0.2 ; à la soumission : « … & APG combobox ») |
| Repository URL | https://github.com/ounokoya/rest-countries-api |
| Live site URL | https://ounokoya.github.io/rest-countries-api/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `fetch`, `playwright` |
| Visibilité | Public |

Rapports IA : aucun crédit en novembre ; le crédit de décembre va d'abord au Multi-step form (SDL-FM 1.4.0, ordre du crédit). La soumission donne les points (Advanced : +100) sans rapport IA ; les vérifications automatiques sont gratuites.

## What are you most proud of, and what would you do differently next time?

I'm most proud of making the address the single source of truth. Every screen comes from `location.hash` (`#/country/BEL`, `#/?search=bel&region=Europe`), so a filtered list can be shared, "Back" and the browser's back button both return to it, and focus goes back to the card you left. The region filter is a popup of native radio buttons, and the 73 Playwright tests were written before the code and also pass on the live site; Frontend Mentor's automated checks now report 0 issues.

Next time, I'd test with realistic data earlier. My test flags all had the card's proportions, so two real problems only showed up with the real flags: a nearly square flag (Belgium) stretched its card, and all 250 flags were downloaded at once because `loading="lazy"` was set after `src`.

## What challenges did you encounter, and how did you overcome them?

- **Accent-insensitive search**: "aland" should find "Åland Islands", so names and queries are compared after `normalize('NFD')` without diacritics, and trimmed.
- **Frontend Mentor's checks**: my first filter was a custom APG combobox, with a screen-reader bug and a remark asking for a native element. It is now a button that opens a `<fieldset>` of native radio buttons styled like the design: the browser handles the group, the arrow keys and screen readers. I reproduce the checks locally with html-validate, so the report went from 4 issues to 0.
- **No theme flash**: a short inline script sets `data-theme` on `<html>` before the stylesheet applies (saved choice, otherwise `prefers-color-scheme`).
- **Design inconsistencies**: the light detail page differs from the dark one (smaller text, white background) — both themes follow the style guide; the filter says "America" but the cards say "Americas"; three polar territories belong to no listed region, so I added "All regions".
- **Data vs. design**: the design starts with Germany and shows older populations; the page keeps the data's alphabetical order. For the pixel comparisons only, the tests load a small data set that reproduces the design (1.1–3.1 % difference).

## What specific areas of your project would you like help with?

1. Search and region only replace the current history entry (`history.replaceState`), while opening a country adds one. Does that match what you would expect when pressing the browser's back button?
2. When a country page opens, I move focus to its `h1` and update the document title; when you come back, focus returns to the card you left. Is that helpful for keyboard and screen-reader users, or too much?
3. The result count ("3 countries") is announced in a visually hidden status region on every keystroke. Would you debounce it, or announce it differently?
