<script setup lang="ts">
import { XCircle, CheckCircle2 } from 'lucide-vue-next'

const COMPARISONS = [
  {
    legacy: 'Hidden broker fees and unexplained 40-60% markups',
    nexus: 'Radical transparent BDT FOB pricing with itemized fabric and trim costs',
  },
  {
    legacy: '6-8 weeks of painful physical sampling and endless couriers',
    nexus: '48-hour Clo3D photorealistic digital twin fit approvals',
  },
  {
    legacy: 'Rigid 5,000 piece minimum order quantities that risk deadstock',
    nexus: 'Flexible 300 unit fast-track capsule runs tailored for modern brands',
  },
  {
    legacy: 'Opaque factory floors with unverified subcontractor risks',
    nexus: '100% WRAP & GOTS audited factories with direct video audit feeds',
  },
]
</script>

<template>
  <section class="section-padding bg-surface-clean">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[03]</span>
        <span class="badge-label">WHAT WE BELIEVE</span>
      </div>

      <div class="beliefs-header">
        <h2 class="chapter-h2">
          FASHION MOVES FAST,<br />
          <span class="text-gradient">SO SHOULD YOU.</span>
        </h2>
        <p class="chapter-lead">
          We reject the outdated buying house playbook. The modern apparel brand requires velocity, transparency, and architectural precision.
        </p>
      </div>

      <div class="comparison-grid">
        <!-- Old Way -->
        <div class="comparison-card legacy-card">
          <div class="card-tag-badge font-mono tag-legacy">
            <span>THE LEGACY MODEL</span>
          </div>
          <h3 class="comparison-title">Traditional Buying Houses</h3>

          <div class="comparison-list">
            <div v-for="(item, idx) in COMPARISONS" :key="idx" class="comparison-item">
              <XCircle :size="18" class="icon-legacy" />
              <p class="comparison-text text-legacy">{{ item.legacy }}</p>
            </div>
          </div>
        </div>

        <!-- Nexus Way -->
        <div class="comparison-card nexus-card">
          <div class="card-tag-badge font-mono tag-nexus">
            <span>THE NEXUS STANDARD</span>
          </div>
          <h3 class="comparison-title text-white">Autonomous Digital Sourcing</h3>

          <div class="comparison-list">
            <div v-for="(item, idx) in COMPARISONS" :key="idx" class="comparison-item">
              <CheckCircle2 :size="18" class="icon-nexus" />
              <p class="comparison-text text-nexus">{{ item.nexus }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-surface-clean {
  background: #f8f9fa;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.chapter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #0a0b0d;
  margin-bottom: 2rem;
}

.badge-num {
  color: #10b981;
}

.beliefs-header {
  max-width: 860px;
  margin-bottom: 3.5rem;
}

.chapter-h2 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #0a0b0d;
  margin: 0 0 1rem 0;
}

.text-gradient {
  background: linear-gradient(135deg, #0a0b0d 50%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chapter-lead {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #525c6e;
  margin: 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.comparison-card {
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.legacy-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.nexus-card {
  background: #0a0b0d;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.card-tag-badge {
  display: inline-flex;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  width: fit-content;
  margin-bottom: 1.25rem;
}

.tag-legacy {
  background: #fee2e2;
  color: #991b1b;
}

.tag-nexus {
  background: rgba(212, 255, 0, 0.15);
  color: #d4ff00;
  border: 1px solid rgba(212, 255, 0, 0.3);
}

.comparison-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.65rem;
  font-weight: 800;
  margin: 0 0 2rem 0;
}

.text-white {
  color: #ffffff;
}

.comparison-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comparison-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.icon-legacy {
  color: #ef4444;
  flex-shrink: 0;
  margin-top: 2px;
}

.icon-nexus {
  color: #d4ff00;
  flex-shrink: 0;
  margin-top: 2px;
}

.comparison-text {
  font-size: 0.94rem;
  line-height: 1.5;
  margin: 0;
}

.text-legacy {
  color: #64748b;
}

.text-nexus {
  color: #e2e8f0;
}

@media (max-width: 880px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
