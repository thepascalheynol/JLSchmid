# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for the law firm "J.L. Schmid & Kollegen" (Rechtsanwälte · Steuerberatung) in Kempten, Germany. The site replaces the previous website at kanzlei-schmid.eu.

**Client:** Rechtsanwalt Josef Leonhard Schmid, founder (1980) and managing partner.

## Architecture

Static single-page website with vanilla HTML, CSS, and JavaScript:

- `index.html` - Main page with all sections (Hero, Kanzlei, Anwalt, Rechtsgebiete, Philosophie, Kontakt, Footer with Impressum/Datenschutz)
- `styles.css` - CSS with custom properties, responsive design, traditional/conservative aesthetic
- `script.js` - Mobile navigation, smooth scrolling, form validation
- `favicon.svg` - SVG favicon with "JLS" initials

## Design Guidelines

- **Color Palette:** Primary navy blue (#1a365d), accent warm brown/gold (#8b7355), cream/off-white backgrounds
- **Typography:** Cormorant Garamond (serif) for headings, Inter (sans-serif) for body text
- **Tone:** Traditional, conservative, professional - reflecting the firm's 45+ year history and values
- **Images:** Currently using placeholder/icons; real photos should maintain the professional, conservative aesthetic

## Key Legal Requirements (German Law)

The site includes legally required sections for German law firms:
- Impressum with full contact details, Steuernummer (127/268/70193), and responsible person (§ 18 Abs. 2 MStV)
- Berufsrechtliche Angaben: RAK München, BRAO, BORA, RVG, FAO, EuRAG references
- Steuerberatung references: StBerG, BOStB, StBGebV
- Datenschutzerklärung (DSGVO compliant)
- Streitschlichtung information

## Development

Open `index.html` directly in a browser for development. No build step required.

For a local server:
```bash
python3 -m http.server 8000
```
