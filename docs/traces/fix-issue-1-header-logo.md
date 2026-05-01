# Trace: Fix Issue #1 - Header Logo

## Problem
The header logo in the navbar has several issues:
1. It uses a square image (`assets/logo.jpg`) with ornate corners that are visible or poorly cut off in the circular container.
2. It creates a "triple ring" effect because the image has a double ring and the container has a gold border.
3. The logo contains the text "Amy's Bakes", which is redundant with the `navbar-brand-text` next to it.

## Proposed Changes
1. Update `.navbar-logo-ring` styling to remove the redundant border and shadow, avoiding the "triple ring" effect since the logo image already has a double ring.
2. Adjust the `img` styling to scale the logo by 1.1x, effectively hiding the ornate square corners in the circular container.
3. Cleaned up `contact.html` which had a massive duplication bug (two different versions of the page concatenated).
4. Restored proper footer and closing tags to `contact.html`.

## Implementation Steps
1. Modified `css/styles.css` to refine `.navbar-logo-ring` and its child `img`.
2. Updated media queries for responsive logo sizing.
3. Fixed `contact.html` structure and removed dead/duplicate HTML.
5. Replaced Bag emoji with professional SVG icon across all pages.
6. Generated `assets/logo.svg` (removing "EST.") and `assets/favicon.svg` using Satori.
7. Updated all pages to use the new SVG assets and added favicon links.
8. Refined `.navbar-logo-ring` CSS for optimal SVG display.


