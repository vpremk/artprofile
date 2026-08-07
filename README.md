# Saffron & Silk

A minimal art portfolio site for a contemporary artist practice centered on storytelling, texture, and expressive color.

## Project structure

- `index.html` — homepage structure
- `styles.css` — branding, layout, and responsive styling
- `script.js` — portfolio gallery filtering and rendering
- `portfolio.json` — artwork metadata used by the gallery
- `data/` — artwork image assets organized by collection

## Local preview

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The portfolio gallery loads artwork entries from `portfolio.json`.
- The hero and gallery layout are designed to highlight the painting without cropping important visual details.
- The contact section links directly to `artsyvandana@gmail.com`.
