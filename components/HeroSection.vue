<script setup lang="ts">
import { ArrowUpRight, Play, Sparkles } from 'lucide-vue-next'
import AnimatedCounter from '~/components/AnimatedCounter.vue'
</script>

<template>
  <section class="nitex-hero-section">
    <div class="container hero-container">
      <!-- Chapter Badge -->
      <div class="hero-header-badge font-mono">
        <span class="badge-tag">CHAPTER [00]</span>
        <span class="badge-divider">//</span>
        <span class="badge-title">AUTONOMOUS SOURCING INFRASTRUCTURE</span>
      </div>

      <!-- Masked Headline Reveal -->
      <div class="hero-headline-block">
        <h1 class="hero-masked-h1">
          <span class="hero-line">THE NEW OPERATING SYSTEM</span>
          <span class="hero-line highlight-volt">FOR GLOBAL APPAREL PRODUCTION.</span>
        </h1>
        <p class="hero-sublead">
          Connecting progressive global fashion labels directly to certified smart factories in Bangladesh, Portugal, and Japan. Clo3D digital sampling, direct fabric mill integration, and transparent B2B pricing in BDT.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="hero-cta-cluster">
        <NuxtLink to="/showroom" class="hero-btn-primary">
          <span>Explore Digital Showroom</span>
          <ArrowUpRight :size="16" />
        </NuxtLink>

        <NuxtLink to="/estimator" class="hero-btn-secondary">
          <span>Calculate Instant RFQ</span>
          <Sparkles :size="15" />
        </NuxtLink>
      </div>

      <!-- 4K Clo3D Digital Video Simulation Stage -->
      <div class="hero-stage-card">
        <div class="hero-video-wrapper">
          <video
            autoplay
            muted
            loop
            playsinline
            class="hero-video-element"
            poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40092-large.mp4"
              type="video/mp4"
            />
          </video>
          <div class="video-overlay-gradient" />
          <div class="video-hud font-mono">
            <span class="live-dot" />
            <span>CLO3D SIMULATION ENGINE • 60 FPS • LIVE FABRIC PHYSICS</span>
          </div>
        </div>

        <!-- Telemetry Cards -->
        <div class="hero-telemetry-grid">
          <div class="telemetry-box">
            <span class="telemetry-label font-mono">DIGITAL ARCHIVES</span>
            <span class="telemetry-val">
              <AnimatedCounter :target="14" suffix="+" />
            </span>
            <span class="telemetry-caption">Verified Garment Styles</span>
          </div>

          <div class="telemetry-box">
            <span class="telemetry-label font-mono">SAMPLE VELOCITY</span>
            <span class="telemetry-val">
              <AnimatedCounter :target="48" suffix="H" />
            </span>
            <span class="telemetry-caption">Clo3D Prototyping Turnaround</span>
          </div>

          <div class="telemetry-box">
            <span class="telemetry-label font-mono">QUALITY RATING</span>
            <span class="telemetry-val">
              <AnimatedCounter :target="99.4" suffix="%" :decimals="1" />
            </span>
            <span class="telemetry-caption">AQL 2.5 Strict Pass Rate</span>
          </div>

          <div class="telemetry-box">
            <span class="telemetry-label font-mono">BDT VOLUME PRICING</span>
            <span class="telemetry-val">
              ৳<AnimatedCounter :target="3350" suffix="+" />
            </span>
            <span class="telemetry-caption">Direct Factory FOB Benchmarks</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nitex-hero-section {
  position: relative;
  padding: 8.5rem 0 5rem;
  background: #ffffff;
  overflow: hidden;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f4f4f2;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 2rem;
}

.badge-tag {
  color: #0a0b0d;
}

.badge-divider {
  color: #cbd5e1;
}

.badge-title {
  color: #64748b;
  letter-spacing: 0.06em;
}

.hero-headline-block {
  max-width: 980px;
  margin-bottom: 2.25rem;
}

.hero-masked-h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.4rem, 5.2vw, 4.4rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #0a0b0d;
  margin: 0 0 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.highlight-volt {
  background: linear-gradient(135deg, #0a0b0d 60%, #1e293b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-sublead {
  font-size: clamp(1rem, 1.25vw, 1.18rem);
  line-height: 1.6;
  color: #525c6e;
  max-width: 780px;
  margin: 0 auto;
}

.hero-cta-cluster {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  background: #0a0b0d;
  color: #ffffff;
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;
}

.hero-btn-primary:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.25);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  background: #f4f4f2;
  color: #0a0b0d;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero-btn-secondary:hover {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.hero-stage-card {
  width: 100%;
  max-width: 1240px;
  background: #0a0b0d;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 32px 80px -10px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.hero-video-wrapper {
  position: relative;
  width: 100%;
  height: 520px;
  overflow: hidden;
}

.hero-video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(108%) brightness(92%);
}

.video-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 11, 13, 0.2) 0%, rgba(10, 11, 13, 0.75) 100%);
}

.video-hud {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(10, 11, 13, 0.8);
  backdrop-filter: blur(8px);
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.hero-telemetry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #0d0e12;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.telemetry-box {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.telemetry-box:last-child {
  border-right: none;
}

.telemetry-label {
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.telemetry-val {
  font-family: var(--font-display, sans-serif);
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 0.35rem;
}

.telemetry-caption {
  font-size: 0.78rem;
  color: #64748b;
}

@media (max-width: 980px) {
  .hero-telemetry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .telemetry-box:nth-child(2) {
    border-right: none;
  }
  .telemetry-box:nth-child(-n+2) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .hero-video-wrapper {
    height: 380px;
  }
}

@media (max-width: 640px) {
  .hero-telemetry-grid {
    grid-template-columns: 1fr;
  }
  .telemetry-box {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .telemetry-box:last-child {
    border-bottom: none;
  }
  .hero-video-wrapper {
    height: 280px;
  }
}
</style>
