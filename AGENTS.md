# Nexus Sourcing - Nuxt 4 Architecture

This project is built with **Nuxt 4** and **Vue 3** utilizing a modular directory structure:

- `layouts/`:
  - `default.vue`: Public storefront layout (Floating Navbar, Secret Admin Gate, Global Footer)
  - `admin.vue`: Control plane layout (Live DB Status, Secured Badge, Admin Header/Footer)
- `pages/`:
  - `index.vue`: Master homepage orchestrating the 9 Nitex-style chapters
  - `showroom.vue`: Dedicated Digital Showroom Catalog & Spec Lightbox
  - `estimator.vue`: Dedicated Real-Time B2B RFQ Cost Estimator (BDT)
  - `capabilities.vue`: Dedicated Capabilities & Dual Sourcing Pathways
  - `story.vue`: Dedicated Our Story & Vision Page
  - `sustainability.vue`: Dedicated ESG Audits & Factory Certifications
  - `contact.vue`: Dedicated Audience Tabs & Neon DB RFQ Form
  - `admin/index.vue`: Admin Control Plane & Inquiry Manager
  - `admin/login.vue`: Admin Security Gate
- `components/`: Reusable Vue 3 SFC section components
- `server/api/`: Nitro serverless endpoints integrating with Neon PostgreSQL
- `assets/css/`: Global design tokens, typography, and chapter layout styles
