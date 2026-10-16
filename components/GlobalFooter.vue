<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="global-footer">
    <div class="container footer-content">
      <div class="footer-top-grid">
        <div class="footer-brand-box">
          <div class="footer-brand-header">
            <div class="brand-mark">
              <span>NX</span>
            </div>
            <h3 class="footer-logo">NEXUS SOURCING</h3>
          </div>
          <p class="footer-desc">
            Real-time apparel buying house & on-demand production engine. We unite Clo3D digital sampling, direct mill textile contracts, and certified manufacturing hubs across Bangladesh, Portugal, and Japan into one high-velocity sourcing network.
          </p>
          <div class="system-pill">
            <span class="system-dot"></span>
            <span>Neon PostgreSQL Engine • Cloudflare Edge • Nuxt 4 Architecture</span>
          </div>
        </div>

        <div class="footer-links-col">
          <h4 class="col-title font-mono">[01] Solutions</h4>
          <ul class="footer-list">
            <li>3D Digital Sampling & Clo3D Prototyping</li>
            <li>Direct Fabric Mill Procurement</li>
            <li>Private-Label Outerwear & Denim</li>
            <li>Fine Tailored Shirts & Suiting</li>
            <li>GOTS-Certified Sustainable Knits</li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 class="col-title font-mono">[02] Global Hubs</h4>
          <ul class="footer-list font-mono text-xs">
            <li><strong>DHAKA:</strong> Sourcing HQ & Merchandising</li>
            <li><strong>HONG KONG:</strong> Material Logistics & Trims</li>
            <li><strong>MILAN:</strong> Textile Atelier & Design Studio</li>
            <li><strong>NEW YORK:</strong> Client Accounts & Showroom</li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 class="col-title font-mono">[03] Compliance & ESG</h4>
          <ul class="footer-list">
            <li>OEKO-TEX Standard 100 Certified</li>
            <li>WRAP & BSCI Social Compliance Audits</li>
            <li>AQL 2.5 Strict Inline & Final Inspection</li>
            <li>Cloudflare Secured Infrastructure</li>
            <li>Neon PostgreSQL Real-time Telemetry</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-bar font-mono">
        <div class="footer-copy">
          © {{ currentYear }} NEXUS SOURCING GROUP LTD. ALL RIGHTS RESERVED.
        </div>
        <div class="footer-legal">
          <span>CONFIDENTIAL B2B SOURCING PROTOCOL</span>
          <span class="sep">•</span>
          <span>GLOBAL ETHICAL APPAREL PRODUCTION</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.global-footer {
  background: #f6f6f4;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 5rem 0 2.5rem;
  position: relative;
}

.footer-top-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 4rem;
}

.footer-brand-box {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  width: 34px;
  height: 34px;
  background: #0a0b0d;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display, sans-serif);
  font-weight: 800;
  font-size: 0.85rem;
  border-radius: 8px;
}

.footer-logo {
  font-family: var(--font-display, sans-serif);
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: #0a0b0d;
  margin: 0;
}

.footer-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #555e6d;
  margin: 0;
}

.system-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #e9ecef;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: #495057;
  width: fit-content;
}

.system-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.col-title {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0a0b0d;
  margin: 0 0 1.25rem 0;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #555e6d;
}

.footer-list strong {
  color: #0a0b0d;
}

.footer-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 2rem;
  font-size: 0.75rem;
  color: #717b8a;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sep {
  color: #cbd5e1;
}

@media (max-width: 980px) {
  .footer-top-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .footer-top-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
