<script setup lang="ts">
import AnimatedCounter from '~/components/AnimatedCounter.vue'
import { Globe, Shield, Zap, TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <section id="story" class="section-padding bg-surface-clean">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[01]</span>
        <span class="badge-label">OUR STORY</span>
      </div>

      <div class="chapter-header-grid">
        <div class="header-left">
          <h2 class="chapter-h2">
            FROM VISION TO<br />
            <span class="text-gradient">GLOBAL IMPACT.</span>
          </h2>
        </div>
        <div class="header-right">
          <p class="chapter-lead">
            Traditional apparel buying houses are slow, opaque, and laden with hidden markups. We built Nexus Sourcing to automate fashion production — bridging global design brands directly with high-performance manufacturing hubs.
          </p>
        </div>
      </div>

      <!-- Story Narrative Cards -->
      <div class="story-cards-grid">
        <div class="story-feature-card">
          <div class="story-icon-wrap">
            <Globe :size="22" />
          </div>
          <h3 class="story-card-title">Direct Mill Integration</h3>
          <p class="story-card-text">
            We bypass middlemen brokers and procure textiles directly from certified spinning and weaving mills across Bangladesh, Japan, and Portugal, ensuring peak yarn quality and genuine cost savings in BDT.
          </p>
        </div>

        <div class="story-feature-card">
          <div class="story-icon-wrap">
            <Zap :size="22" />
          </div>
          <h3 class="story-card-title">Digital Clo3D Prototyping</h3>
          <p class="story-card-text">
            Physical fit sample iterations traditionally take 6 to 8 weeks. Our Clo3D digital atelier renders photorealistic drape physics, tension maps, and grading specs within 48 hours.
          </p>
        </div>

        <div class="story-feature-card">
          <div class="story-icon-wrap">
            <Shield :size="22" />
          </div>
          <h3 class="story-card-title">Ethical Audit Standards</h3>
          <p class="story-card-text">
            Every partnered production floor complies with WRAP Gold, GOTS Organic Textile Standard, and BSCI social compliance guidelines. We uphold fair living wages and transparent worker protections.
          </p>
        </div>
      </div>

      <!-- Story Telemetry Impact Ribbon -->
      <div class="story-telemetry-ribbon font-mono">
        <div class="ribbon-metric">
          <div class="metric-num font-display">
            <AnimatedCounter :target="100" suffix="%" :duration="1800" :delay="200" />
          </div>
          <div class="metric-desc">MILL-DIRECT TRACEABILITY</div>
        </div>
        <div class="ribbon-metric">
          <div class="metric-num font-display">
            <AnimatedCounter :target="18" suffix="+" :duration="1600" :delay="300" />
          </div>
          <div class="metric-desc">COMPLIANT FACTORY HUBS</div>
        </div>
        <div class="ribbon-metric">
          <div class="metric-num font-display">
            <AnimatedCounter :target="0" suffix="%" :duration="1200" :delay="400" />
          </div>
          <div class="metric-desc">BROKER SURCHARGES</div>
        </div>
        <div class="ribbon-metric">
          <div class="metric-num font-display">
            <AnimatedCounter :target="100" suffix="%" :duration="2000" :delay="500" />
          </div>
          <div class="metric-desc">ON-TIME AUDIT COMMITMENT</div>
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

.chapter-header-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: flex-end;
  margin-bottom: 4rem;
}

.chapter-h2 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #0a0b0d;
  margin: 0;
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

.story-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.story-feature-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1.25rem;
  padding: 2.25rem 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.story-feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
}

.story-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.story-card-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.75rem 0;
}

.story-card-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

/* Telemetry Impact Ribbon */
.story-telemetry-ribbon {
  margin-top: 3.5rem;
  padding: 1.75rem 2rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.ribbon-metric {
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
}

.ribbon-metric:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.metric-num {
  font-size: clamp(1.6rem, 2.2vw, 2.1rem);
  font-weight: 900;
  color: #0a0b0d;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 0.35rem;
}

.metric-desc {
  font-size: 0.68rem;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .chapter-header-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .story-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .story-telemetry-ribbon {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .ribbon-metric:nth-child(2) {
    border-right: none;
  }
}

@media (max-width: 640px) {
  .story-feature-card {
    padding: 1.75rem 1.25rem;
    border-radius: 1.15rem;
  }
  .story-telemetry-ribbon {
    grid-template-columns: 1fr 1fr;
    padding: 1.25rem 1rem;
    gap: 1rem;
  }
  .metric-num {
    font-size: 1.45rem;
  }
  .metric-desc {
    font-size: 0.6rem;
  }
}
</style>
