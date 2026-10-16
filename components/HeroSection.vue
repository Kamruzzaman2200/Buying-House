<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowUpRight, Sparkles } from 'lucide-vue-next'
import AnimatedCounter from '~/components/AnimatedCounter.vue'

const videoRef = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      if (videoRef.value) {
        videoRef.value.muted = true
        videoRef.value.play()
      }
    })
  }
})
</script>

<template>
  <section class="hero-editorial-section">
    <!-- Atmospheric Ambient Backlight -->
    <div class="hero-ambient-glow" aria-hidden="true" />

    <div class="container hero-container">
      <div class="hero-split-grid">
        <!-- Left Column: High-Fashion Narrative & Actions -->
        <div class="hero-narrative-col">
          <!-- Chapter Eyebrow -->
          <div class="hero-eyebrow font-mono">
            <span class="live-status-dot" />
            <span class="eyebrow-tag">CHAPTER [00]</span>
            <span class="eyebrow-sep">//</span>
            <span class="eyebrow-title">AUTONOMOUS SOURCING INFRASTRUCTURE</span>
          </div>

          <!-- Editorial Headline (Pure Luxury Typography - No Highlighter) -->
          <div class="hero-title-wrap">
            <h1 class="hero-editorial-h1">
              <span class="h1-lead">The Modern Operating System</span>
              <span class="h1-sub">for Global Apparel Production.</span>
            </h1>
          </div>

          <!-- Refined Sublead -->
          <p class="hero-sublead-text">
            Connecting visionary global fashion brands directly to certified smart garment factories across Bangladesh, Portugal, and Japan. High-fidelity Clo3D digital twins, mill-direct transparency, and live factory FOB benchmarks in BDT.
          </p>

          <!-- Action Buttons Cluster -->
          <div class="hero-actions-cluster">
            <NuxtLink to="/showroom" class="hero-cta-primary">
              <span>Explore Digital Showroom</span>
              <ArrowUpRight :size="16" class="cta-arrow" />
            </NuxtLink>

            <NuxtLink to="/estimator" class="hero-cta-secondary">
              <Sparkles :size="15" class="cta-sparkle" />
              <span>Calculate Instant RFQ</span>
            </NuxtLink>
          </div>

          <!-- Integrated Telemetry Grid -->
          <div class="hero-telemetry-dock">
            <div class="telemetry-cell">
              <div class="telemetry-num font-display">
                <AnimatedCounter :target="14" suffix="+" :duration="1600" :delay="120" />
              </div>
              <div class="telemetry-meta font-mono">VERIFIED ARCHIVES</div>
            </div>

            <div class="telemetry-cell">
              <div class="telemetry-num font-display">
                <AnimatedCounter :target="48" suffix="H" :duration="1800" :delay="220" />
              </div>
              <div class="telemetry-meta font-mono">CLO3D TURNAROUND</div>
            </div>

            <div class="telemetry-cell">
              <div class="telemetry-num font-display">
                <AnimatedCounter :target="99.4" suffix="%" :decimals="1" :duration="2000" :delay="320" />
              </div>
              <div class="telemetry-meta font-mono">AQL 2.5 PASS RATE</div>
            </div>

            <div class="telemetry-cell">
              <div class="telemetry-num font-display">
                <AnimatedCounter :target="3350" prefix="৳" suffix="+" :duration="2200" :delay="420" />
              </div>
              <div class="telemetry-meta font-mono">BDT VOLUME FOB</div>
            </div>
          </div>
        </div>

        <!-- Right Column: Pure 4K Clo3D Video Showcase Stage (No Media Controls) -->
        <div class="hero-visual-col">
          <div class="hero-stage-card">
            <div class="video-container">
              <video
                ref="videoRef"
                autoplay
                muted
                loop
                playsinline
                class="ambient-banner-video"
              >
                <source src="/banner.mp4" type="video/mp4" />
                <source src="/Product Pic/Banner/gemini_generated_video_c20cb600.mp4" type="video/mp4" />
              </video>

              <!-- Subtle Ambient Edge Gradients -->
              <div class="stage-overlay" />

              <!-- Technical HUD Tags (Passive only, NO interactive buttons) -->
              <div class="stage-top-hud font-mono">
                <div class="hud-capsule">
                  <span class="hud-green-dot" />
                  <span>CLO3D SIMULATION ENGINE • 60 FPS</span>
                </div>
              </div>

              <div class="stage-bottom-hud font-mono">
                <div class="hud-location">
                  <span>DHAKA // TOKYO // PORTO PROTOCOL</span>
                </div>
                <div class="hud-quality">
                  <span>4K DIGITAL TWIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-editorial-section {
  position: relative;
  padding: 6.25rem 0 2.5rem;
  background: #ffffff;
  overflow: hidden;
}

/* Atmospheric Ambient Light Reflection */
.hero-ambient-glow {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 650px;
  height: 650px;
  background: radial-gradient(circle at 50% 50%, rgba(212, 255, 0, 0.09) 0%, rgba(200, 163, 50, 0.04) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
}

/* 2-Column Split Grid for Above-the-Fold Luxury */
.hero-split-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 3.25rem;
  align-items: center;
}

/* Left Narrative Column */
.hero-narrative-col {
  display: flex;
  flex-direction: column;
  text-align: left;
}

/* Eyebrow Badge */
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 1.15rem;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.live-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: beaconPulse 2s infinite;
}

@keyframes beaconPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.eyebrow-tag {
  color: #0f172a;
}

.eyebrow-sep {
  color: #cbd5e1;
}

.eyebrow-title {
  color: #64748b;
  letter-spacing: 0.04em;
}

/* Editorial Headline */
.hero-title-wrap {
  margin-bottom: 1rem;
}

.hero-editorial-h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.2rem, 3.4vw, 3.35rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: #0f172a;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.h1-lead {
  display: block;
  color: #0f172a;
}

.h1-sub {
  display: block;
  color: #475569;
  font-weight: 600;
}

/* Subtext */
.hero-sublead-text {
  font-size: 0.98rem;
  line-height: 1.6;
  color: #475569;
  max-width: 560px;
  margin: 0 0 1.65rem 0;
}

/* Action Buttons Cluster */
.hero-actions-cluster {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.75rem;
  background: #0f172a;
  color: #ffffff;
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.16);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-cta-primary:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.24);
}

.cta-arrow {
  transition: transform 0.25s ease;
}

.hero-cta-primary:hover .cta-arrow {
  transform: translate(2px, -2px);
}

.hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 1.75rem;
  background: #ffffff;
  color: #0f172a;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-cta-secondary:hover {
  background: #f8fafc;
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.cta-sparkle {
  color: #d97706;
}

/* Telemetry Dock below CTAs */
.hero-telemetry-dock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.telemetry-cell {
  display: flex;
  flex-direction: column;
}

.telemetry-num {
  font-size: clamp(1.75rem, 2.5vw, 2.15rem);
  font-weight: 900;
  color: #0a0b0d;
  line-height: 1.05;
  margin-bottom: 0.35rem;
  letter-spacing: -0.03em;
}

.telemetry-meta {
  font-size: 0.68rem;
  font-weight: 800;
  color: #525c6e;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Right Visual Column */
.hero-visual-col {
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero-stage-card {
  position: relative;
  width: 100%;
  max-width: 540px;
  border-radius: 1.75rem;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.hero-stage-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 75px -15px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 4.6;
  background: #f1f5f9;
  overflow: hidden;
}

.ambient-banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(103%) brightness(99%);
  display: block;
}

/* Subtle Film Edge Vignette */
.stage-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.35) 100%);
  pointer-events: none;
}

/* Top Technical Badge */
.stage-top-hud {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  z-index: 2;
}

.hud-capsule {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.hud-green-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

/* Bottom Passive Badges */
.stage-bottom-hud {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  z-index: 2;
  font-size: 0.68rem;
  font-weight: 700;
  color: #ffffff;
}

.hud-location,
.hud-quality {
  display: inline-flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  letter-spacing: 0.04em;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .hero-editorial-section {
    padding: 6.5rem 0 3.5rem;
  }
  .hero-split-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-narrative-col {
    align-items: center;
    text-align: center;
  }
  .hero-sublead-text {
    max-width: 650px;
  }
  .hero-actions-cluster {
    justify-content: center;
  }
  .hero-telemetry-dock {
    width: 100%;
    max-width: 540px;
  }
  .hero-stage-card {
    max-width: 500px;
  }
  .video-container {
    aspect-ratio: 16 / 11;
  }
}

@media (max-width: 640px) {
  .hero-editorial-section {
    padding: 5.5rem 0 2.5rem;
  }
  .hero-editorial-h1 {
    font-size: 2.1rem;
  }
  .hero-actions-cluster {
    flex-direction: column;
    width: 100%;
  }
  .hero-cta-primary,
  .hero-cta-secondary {
    width: 100%;
    justify-content: center;
  }
  .hero-telemetry-dock {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  .video-container {
    aspect-ratio: 16 / 12;
  }
  .hud-location {
    font-size: 0.6rem;
  }
  .hud-quality {
    display: none;
  }
}
</style>
