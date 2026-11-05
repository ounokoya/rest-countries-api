# Soumission Frontend Mentor

> SDL-FM 1.4.0 Phase 13. Textes préparés pour le formulaire « Submit solution » du challenge. La soumission est publique et faite au nom de Koya : elle n'est envoyée qu'avec son accord, au moment de l'envoi.

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | REST Countries API with Tailwind v4, hash routing & APG combobox |
| Repository URL | https://github.com/ounokoya/rest-countries-api |
| Live site URL | https://ounokoya.github.io/rest-countries-api/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `fetch`, `playwright` |
| Visibilité | Public |

Rapports IA : aucun crédit en novembre ; le crédit de décembre va d'abord au Multi-step form (SDL-FM 1.4.0, ordre du crédit). La soumission donne les points (Advanced : +100) sans rapport IA ; les vérifications automatiques sont gratuites.

## What are you most proud of, and what would you do differently next time?

I'm most proud of making the address the single source of truth. Every screen comes from `location.hash` (`#/country/BEL`, `#/?search=bel&region=Europe`), so a filtered list can be shared, "Back" and the browser's back button both return to it, and focus goes back to the card you left. The region filter follows the WAI-ARIA select-only combobox pattern, and the 72 Playwright tests were written before the code and also pass on the live site.

Next time, I'd test with realistic data earlier. My test flags all had the card's proportions, so two real problems only showed up with the real flags: a nearly square flag (Belgium) stretched its card, and all 250 flags were downloaded at once because `loading="lazy"` was set after `src`.

## What challenges did you encounter, and how did you overcome them?

- **Accent-insensitive search**: "aland" should find "Åland Islands", so names and queries are compared after `normalize('NFD')` without diacritics, and trimmed.
- **A custom select that works for everyone**: arrows, Home, End, letters, Enter, Space, Tab and Escape, with `aria-activedescendant`. I first used a `<button>` and ignored keyboard-generated clicks, which also ignored the clicks screen readers send; a focusable `<div>`, as in the APG example, fixed both.
- **No theme flash**: a short inline script sets `data-theme` on `<html>` before the stylesheet applies (saved choice, otherwise `prefers-color-scheme`).
- **Design inconsistencies**: the light detail page differs from the dark one (smaller text, white background) — both themes follow the style guide; the filter says "America" but the cards say "Americas"; three polar territories belong to no listed region, so I added "All regions".
- **Data vs. design**: the design starts with Germany and shows older populations; the page keeps the data's alphabetical order. For the pixel comparisons only, the tests load a small data set that reproduces the design (1.1–3.1 % difference).

## What specific areas of your project would you like help with?

1. Search and region only replace the current history entry (`history.replaceState`), while opening a country adds one. Does that match what you would expect when pressing the browser's back button?
2. When a country page opens, I move focus to its `h1` and update the document title; when you come back, focus returns to the card you left. Is that helpful for keyboard and screen-reader users, or too much?
3. The result count ("3 countries") is announced in a visually hidden status region on every keystroke. Would you debounce it, or announce it differently?
