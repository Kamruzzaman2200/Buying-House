<script setup lang="ts">
import { Cpu, Scissors, Factory, CheckCircle, Truck } from 'lucide-vue-next'

const PILLARS = [
  {
    num: '01',
    icon: Cpu,
    title: '3D Clo3D Digital Sampling',
    desc: 'Bypass months of sampling delays. Approve photorealistic drape, stitch tension, and grading on digital avatars within 48 hours.',
  },
  {
    num: '02',
    icon: Scissors,
    title: 'Direct Mill Procurement',
    desc: 'Contract custom yarn counts, Japanese selvedge denim, French flax linen, and combed Egyptian cotton directly at mill wholesale rates.',
  },
  {
    num: '03',
    icon: Factory,
    title: 'Certified Smart Factories',
    desc: 'Allocated to WRAP Gold and LEED Platinum certified smart factories in Dhaka, Gazipur, and Porto with robotic pattern cutters.',
  },
  {
    num: '04',
    icon: CheckCircle,
    title: 'AQL 2.5 Quality Inspection',
    desc: 'Zero tolerance for defective stitching. Independent inline quality controllers inspect every 500 units before container carton packing.',
  },
  {
    num: '05',
    icon: Truck,
    title: 'Global Freight Logistics',
    desc: 'Customs cleared door-to-door delivery. Air express capsules in 4 days or cost-optimized ocean freight to Rotterdam, LA, or Felixstowe.',
  },
]
</script>

<template>
  <section class="section-padding bg-surface-white">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[04]</span>
        <span class="badge-label">HOW WE HELP</span>
      </div>

      <div class="pillars-header">
        <h2 class="chapter-h2">
          LAUNCH FASTER. OPERATE LEANER.<br />
          <span class="text-gradient">SELL SMARTER.</span>
        </h2>
        <p class="chapter-lead">
          Our 5 transformation pillars re-engineer apparel manufacturing into a predictable, transparent digital pipeline.
        </p>
      </div>

      <div class="pillars-grid">
        <div v-for="pillar in PILLARS" :key="pillar.num" class="pillar-card">
          <div class="pillar-card-top">
            <span class="pillar-num font-mono">{{ pillar.num }}</span>
            <div class="pillar-icon-box">
              <component :is="pillar.icon" :size="20" />
            </div>
          </div>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-desc">{{ pillar.desc }}</p>
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

.pillars-header {
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

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
}

.pillar-card {
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1.25rem;
  padding: 2.25rem 2rem;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.pillar-card:hover {
  background: #ffffff;
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
}

.pillar-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.pillar-num {
  font-size: 0.85rem;
  font-weight: 800;
  color: #94a3b8;
}

.pillar-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pillar-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.75rem 0;
}

.pillar-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}
</style>
