<script setup lang="ts">
import { ArrowLeft, Database, ShieldCheck, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div class="admin-app-wrapper">
    <!-- Dedicated Enterprise Admin Header Bar -->
    <header class="admin-app-header">
      <div class="admin-header-container">
        <div class="admin-brand-cluster">
          <NuxtLink to="/" class="admin-back-btn" title="Return to Main Storefront">
            <ArrowLeft :size="16" />
            <span>Back to Storefront</span>
          </NuxtLink>

          <div class="admin-header-divider" />

          <div class="admin-brand-badge font-mono">
            <span class="admin-brand-icon">NX</span>
            <span class="admin-brand-title">ADMIN CONTROL PLANE</span>
          </div>
        </div>

        <div class="admin-meta-cluster font-mono">
          <div class="admin-db-status">
            <span class="live-db-dot" />
            <Database :size="13" />
            <span>NEON POSTGRESQL (US-EAST-2)</span>
          </div>

          <div class="admin-security-pill">
            <ShieldCheck :size="13" />
            <span>SECURED</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            class="admin-preview-link"
            title="Open Live Website in New Tab"
          >
            <span>Live Site</span>
            <ExternalLink :size="12" />
          </a>
        </div>
      </div>
    </header>

    <!-- Main Admin Page Content -->
    <main class="admin-main-stage">
      <slot />
    </main>

    <!-- Admin Clean Footer -->
    <footer class="admin-app-footer font-mono">
      <div class="admin-footer-container">
        <span>NEXUS SOURCING GROUP LTD. • CONFIDENTIAL & ENCRYPTED INTERNAL SYSTEM</span>
        <span>NEON POSTGRESQL LIVE RUNTIME</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.admin-app-wrapper {
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
  display: flex;
  flex-direction: column;
}

.admin-app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.75rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.admin-header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-brand-cluster {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.admin-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono, monospace);
  font-size: 0.76rem;
  font-weight: 700;
  color: #475569;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.admin-back-btn:hover {
  color: #0f172a;
  background: #f1f5f9;
  border-color: rgba(0, 0, 0, 0.18);
}

.admin-header-divider {
  width: 1px;
  height: 22px;
  background: rgba(0, 0, 0, 0.1);
}

.admin-brand-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #0f172a;
}

.admin-brand-icon {
  background: #d4ff00;
  color: #0a0b0d;
  font-weight: 900;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.admin-meta-cluster {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.72rem;
}

.admin-db-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #334155;
  background: #ffffff;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.live-db-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.admin-security-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #059669;
  background: #ecfdf5;
  padding: 0.35rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid #a7f3d0;
  font-weight: 700;
}

.admin-preview-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #475569;
  text-decoration: none;
  background: #ffffff;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  font-weight: 700;
  transition: all 0.2s ease;
}

.admin-preview-link:hover {
  color: #0f172a;
  background: #f8fafc;
  border-color: rgba(0, 0, 0, 0.16);
}

.admin-main-stage {
  flex: 1;
}

.admin-app-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1.25rem 0;
  font-size: 0.7rem;
  color: #64748b;
}

.admin-footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .admin-header-container,
  .admin-footer-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
