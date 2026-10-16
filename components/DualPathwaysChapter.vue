<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, Layers, Clock, ShieldCheck } from 'lucide-vue-next'

type PathwayType = 'fast-track' | 'enterprise'
const activePathway = ref<PathwayType>('fast-track')

const PATHWAY_DATA = {
  'fast-track': {
    title: 'Fast-Track Capsule Drops',
    subtitle: 'Low MOQ agile production for direct-to-consumer and boutique labels',
    moq: '300 - 1,000 pcs',
    leadTime: '25 - 35 Days',
    idealFor: 'Emerging labels, capsule test runs, influencer collaborations',
    points: [
      'In-stock premium organic textiles pre-screened in Dhaka warehouses',
      'Rapid Clo3D 48h pattern making & fit approval without waiting weeks',
      'Dedicated micro-line factory allocation with inline digital QA',
      'Door-to-door air freight logistics tracking via DHL & FedEx Express',
    ],
  },
  'enterprise': {
    title: 'Enterprise Global Production',
    subtitle: 'High-volume scale manufacturing with mill-direct custom yarn spinning',
    moq: '2,000 - 50,000+ pcs',
    leadTime: '45 - 60 Days',
    idealFor: 'Established retail chains, multi-store brands, uniform contracts',
    points: [
      'Bespoke Pantone yarn dyeing and certified custom weave fabric engineering',
      'Tier-1 LEED Platinum certified automated factory line allocation',
      'Full AQL 1.5 / 2.5 final inspection with digital batch certificate audit',
      'Optimized ocean freight container logistics directly from Chittagong port',
    ],
  },
}
</script>

<template>
  <section id="solutions" class="section-padding bg-surface-white">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[02]</span>
        <span class="badge-label">WHAT WE DO</span>
      </div>

      <div class="pathway-headline-box">
        <h2 class="chapter-h2">
          THE NEW STANDARD IN<br />
          <span class="text-gradient">FASHION SUPPLY.</span>
        </h2>
        <p class="chapter-lead">
          Choose the sourcing pathway configured for your brand's growth phase. Whether launching limited capsules or scaling container volumes.
        </p>
      </div>

      <!-- Tab Switcher -->
      <div class="pathway-tabs-bar font-mono">
        <button
          class="pathway-tab-btn"
          :class="{ 'is-active': activePathway === 'fast-track' }"
          @click="activePathway = 'fast-track'"
        >
          <Sparkles :size="15" />
          <span>[01] FAST-TRACK CAPSULE</span>
        </button>

        <button
          class="pathway-tab-btn"
          :class="{ 'is-active': activePathway === 'enterprise' }"
          @click="activePathway = 'enterprise'"
        >
          <Layers :size="15" />
          <span>[02] ENTERPRISE SCALE</span>
        </button>
      </div>

      <!-- Pathway Content Card -->
      <div class="pathway-showcase-card">
        <div class="pathway-card-header">
          <div class="pathway-title-cluster">
            <span class="pathway-sub font-mono">{{ PATHWAY_DATA[activePathway].idealFor }}</span>
            <h3 class="pathway-title">{{ PATHWAY_DATA[activePathway].title }}</h3>
            <p class="pathway-desc">{{ PATHWAY_DATA[activePathway].subtitle }}</p>
          </div>

          <div class="pathway-metrics-strip font-mono">
            <div class="metric-pill">
              <Clock :size="14" />
              <span>LEAD TIME: {{ PATHWAY_DATA[activePathway].leadTime }}</span>
            </div>
            <div class="metric-pill">
              <ShieldCheck :size="14" />
              <span>MOQ: {{ PATHWAY_DATA[activePathway].moq }}</span>
            </div>
          </div>
        </div>

        <div class="pathway-points-grid">
          <div
            v-for="(point, idx) in PATHWAY_DATA[activePathway].points"
            :key="idx"
            class="point-box"
          >
            <div class="point-num font-mono">0{{ idx + 1 }}</div>
            <p class="point-text">{{ point }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-surface-white {
  background: #ffffff;
}

.chapter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f4f4f2;
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

.pathway-headline-box {
  max-width: 860px;
  margin-bottom: 3rem;
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

.pathway-tabs-bar {
  display: inline-flex;
  background: #f1f5f9;
  padding: 0.35rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 2.5rem;
  gap: 0.35rem;
}

.pathway-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pathway-tab-btn:hover {
  color: #0a0b0d;
}

.pathway-tab-btn.is-active {
  background: #0a0b0d;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pathway-showcase-card {
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.03);
}

.pathway-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.pathway-sub {
  font-size: 0.74rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 0.5rem;
}

.pathway-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.85rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.5rem 0;
}

.pathway-desc {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
}

.pathway-metrics-strip {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #0a0b0d;
}

.pathway-points-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
}

.point-box {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.point-num {
  font-size: 0.82rem;
  font-weight: 800;
  color: #d4ff00;
  background: #0a0b0d;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  flex-shrink: 0;
}

.point-text {
  font-size: 0.92rem;
  line-height: 1.55;
  color: #334155;
  margin: 0;
}

@media (max-width: 768px) {
  .pathway-showcase-card {
    padding: 1.75rem;
  }
  .pathway-points-grid {
    grid-template-columns: 1fr;
  }
}
</style>
