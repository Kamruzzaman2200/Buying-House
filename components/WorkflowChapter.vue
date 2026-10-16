<script setup lang="ts">
import { Cpu, Scissors, ShieldAlert, Truck } from 'lucide-vue-next'

const STAGES = [
  {
    num: '01',
    icon: Cpu,
    title: 'Digital Clo3D Prototyping',
    timeline: 'Day 01 - 03',
    desc: 'Upload your 2D CAD tech packs or sketches. Our 3D pattern engineers construct photorealistic Clo3D simulation twins with accurate fabric weight, elasticity, and tension heatmaps.',
  },
  {
    num: '02',
    icon: Scissors,
    title: 'Textile Sourcing & Lab Dips',
    timeline: 'Day 04 - 12',
    desc: 'Direct mill procurement in Dhaka or Porto. Custom Pantone lab dips, yarn spinning, and OEKO-TEX Standard 100 chemical safety tests approved digitally.',
  },
  {
    num: '03',
    icon: ShieldAlert,
    title: 'Automated Factory Assembly',
    timeline: 'Day 13 - 28',
    desc: 'Computerized laser cutting tables, automated stitch balancing, and inline quality checkpoints across certified WRAP Gold facilities.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'AQL 2.5 Audit & Freight Dispatch',
    timeline: 'Day 29 - 35',
    desc: 'Strict final carton inspection report streamed to your dashboard with photographic proof. Customs export clearance and direct air or ocean dispatch.',
  },
]
</script>

<template>
  <section id="supply-chain" class="section-padding bg-surface-white">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[06]</span>
        <span class="badge-label">PRODUCTION WORKFLOW</span>
      </div>

      <div class="workflow-header">
        <h2 class="chapter-h2">
          4-STAGE AUTONOMOUS<br />
          <span class="text-gradient">SOURCING PROTOCOL.</span>
        </h2>
        <p class="chapter-lead">
          From initial 3D digital pattern to final container export — fully tracked, audited, and delivered with surgical precision.
        </p>
      </div>

      <div class="workflow-timeline-grid">
        <div v-for="stage in STAGES" :key="stage.num" class="workflow-timeline-card">
          <div class="card-timeline-top font-mono">
            <span class="stage-tag">[STAGE {{ stage.num }}]</span>
            <span class="stage-time">{{ stage.timeline }}</span>
          </div>

          <div class="workflow-icon-wrap">
            <component :is="stage.icon" :size="22" />
          </div>

          <h3 class="stage-title">{{ stage.title }}</h3>
          <p class="stage-desc">{{ stage.desc }}</p>
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

.workflow-header {
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

.workflow-timeline-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;
}

.workflow-timeline-card {
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.25rem;
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
}

.workflow-timeline-card:hover {
  background: #ffffff;
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
}

.card-timeline-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 1.5rem;
}

.stage-tag {
  color: #10b981;
  font-weight: 800;
}

.stage-time {
  color: #64748b;
  font-weight: 700;
}

.workflow-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.stage-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.18rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.75rem 0;
}

.stage-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

@media (max-width: 1024px) {
  .workflow-timeline-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .workflow-timeline-grid {
    grid-template-columns: 1fr;
  }
}
</style>
