<script setup lang="ts">
import { ShieldCheck, Award, HeartHandshake, Leaf, Droplets, Sun } from 'lucide-vue-next'

const AUDITS = [
  {
    icon: ShieldCheck,
    tag: 'SOCIAL AUDIT',
    title: 'WRAP Gold Certified',
    desc: 'Worldwide Responsible Accredited Production ensuring 100% human-dignified workplace safety, zero forced or child labor, and lawful fair compensation.',
  },
  {
    icon: Leaf,
    tag: 'FIBER INTEGRITY',
    title: 'GOTS Organic Standard',
    desc: 'Certified organic origin tracing for combed cotton yarns, ensuring minimal pesticide impact and closed-loop wastewater processing.',
  },
  {
    icon: Award,
    tag: 'CHEMICAL SAFETY',
    title: 'OEKO-TEX Standard 100',
    desc: 'Independent testing on every button, zipper, and dye lot ensuring zero presence of banned heavy metals, azo colorants, or hazardous toxins.',
  },
  {
    icon: HeartHandshake,
    tag: 'WORKER WELFARE',
    title: 'BSCI Social Audited',
    desc: 'Regular European third-party inspections auditing maximum work hours, gender-equal remuneration, and ergonomic floor health standards.',
  },
  {
    icon: Droplets,
    tag: 'ZERO DISCHARGE',
    title: 'ZDHC Level 3 ETP',
    desc: 'Biological and membrane effluent treatment plants recycling up to 85% of dye wash water back into high-grade spinning processes.',
  },
  {
    icon: Sun,
    tag: 'CLEAN ENERGY',
    title: 'LEED Platinum Infrastructure',
    desc: 'Partnered industrial campuses in Bangladesh equipped with rooftop solar micro-grids generating 4.2 MW of clean renewable energy.',
  },
]
</script>

<template>
  <section id="sustainability" class="section-padding bg-surface-white">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[08]</span>
        <span class="badge-label">ESG & COMPLIANCE</span>
      </div>

      <div class="compliance-header">
        <h2 class="chapter-h2">
          RADICAL TRANSPARENCY.<br />
          <span class="text-gradient">ETHICAL CERTIFIED SUPPLY.</span>
        </h2>
        <p class="chapter-lead">
          Sustainability is not a marketing checkbox — it is our baseline operational requirement. All partnered factory floors are third-party audited with real-time audit certificates available for enterprise brand review.
        </p>
      </div>

      <div class="compliance-cards-grid">
        <div v-for="audit in AUDITS" :key="audit.title" class="compliance-card">
          <div class="card-top-row">
            <span class="audit-tag font-mono">{{ audit.tag }}</span>
            <div class="audit-icon-box">
              <component :is="audit.icon" :size="20" />
            </div>
          </div>
          <h3 class="audit-title">{{ audit.title }}</h3>
          <p class="audit-desc">{{ audit.desc }}</p>
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

.compliance-header {
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

.compliance-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.compliance-card {
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1.25rem;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
}

.compliance-card:hover {
  background: #ffffff;
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.audit-tag {
  font-size: 0.68rem;
  font-weight: 800;
  color: #10b981;
  letter-spacing: 0.08em;
}

.audit-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audit-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.75rem 0;
}

.audit-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

@media (max-width: 980px) {
  .compliance-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
