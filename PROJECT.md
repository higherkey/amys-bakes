# Amy's Bakes ✦ Project Documentation

## 1. Project Vision
Amy's Bakes ([Live Site](https://higherkey.github.io/amys-bakes/)) is designed to bridge the gap between a local home-based bakery and a premium digital experience. The brand identity is centered around "Artisan Quality" and "Handcrafted Care," which is reflected in the high-contrast Navy & Gold aesthetic.

### Core Values
- **Authenticity**: 100% scratch-made, no shortcuts.
- **Elegance**: A digital presence that mirrors the beauty of a custom-decorated cake.
- **Community**: Specifically tailored for the Tulsa, Oklahoma community.

## 2. Technical Architecture

### 🎨 Design System
The site uses a "Styled Realism" approach, combining modern web techniques with classical artisan motifs.

- **Typography**:
  - **Brand**: `Pinyon Script` (Elegant, handcrafted feel)
  - **Headers**: `Playfair Display` (Sophisticated serif)
  - **Body**: `Lato` (Clean, readable sans-serif)
- **Palette**:
  - `Navy (#1a2540)`: Provides a deep, premium foundation.
  - `Gold (#c9a843)`: Used for highlights, borders, and brand elements.
  - `Cream (#f5edd6)`: Used for secondary text and soft backgrounds to maintain a "warm kitchen" feel.
- **UI Components**:
  - Glassmorphism: Utilized in the navbar and modals (`backdrop-filter: blur`).
  - Ornate Utilities: Custom CSS classes for filigree corners and double-ring borders.

### 🏗️ Application Logic
- **Inquiry Engine (`js/cart.js`)**: Manages a local state for the "Inquiry Bag." It allows users to "collect" product examples and send a consolidated inquiry, avoiding the complexity of a full e-commerce checkout while providing a similar UX.
- **Interaction Layer**: Uses an Intersection Observer API for "Animate-on-Scroll" effects, ensuring a dynamic and alive feeling as the user explores the site.

## 3. Development Roadmap

### Phase 1: MVP (Current)
- [x] Responsive layout and design system.
- [x] Basic product catalog with placeholders.
- [x] Functional Inquiry Bag and checkout modal.
- [x] Contact form and Review system structure.

### Phase 2: Content Finalization
- [ ] Replace placeholder images with professional photography.
- [ ] Finalize product pricing and descriptions.
- [ ] SEO optimization for local Tulsa keywords.

### Phase 3: Enhanced Features
- [ ] Social media integration (Instagram feed).
- [ ] Automated email confirmation for inquiries.
- [ ] Client login for order tracking.

## 4. Maintenance Notes
- **Updating Products**: Modify the product objects in the relevant page scripts or HTML articles.
- **Styles**: Global tokens are managed via CSS Variables in `css/styles.css`.
- **Deployment**: The project is configured for GitHub Pages. Any push to the `main` branch will trigger a deployment.

---

**Internal Reference**: This document serves as a supplement to the [README.md](README.md).
