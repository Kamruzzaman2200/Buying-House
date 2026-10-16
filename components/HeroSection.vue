<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowUpRight, Sparkles, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-vue-next'
import AnimatedCounter from '~/components/AnimatedCounter.vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const isPaused = ref(false)
const isMuted = ref(true)
const isHoveringStage = ref(false)

const togglePlay = () => {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPaused.value = false
  } else {
    videoRef.value.pause()
    isPaused.value = true
  }
}

const toggleAudio = () => {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
}

const toggleFullscreen = () => {
  if (!videoRef.value) return
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    videoRef.value.requestFullscreen?.()
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      // Browser autoplay policy requires muted
      if (videoRef.value) {
        videoRef.value.muted = true
        isMuted.value = true
        videoRef.value.play()
      }
    })
  }
})
</script>

<template>
  <section class="banner-hero-section">
    <!-- Atmospheric Ambient Light Layer -->
    <div class="hero-ambient-glow" aria-hidden="true" />

    <div class="container hero-container">
      <!-- Animated Chapter Badge -->
      <div class="hero-header-badge font-mono">
        <span class="live-beacon" />
        <span class="badge-tag">CHAPTER [00]</span>
        <span class="badge-divider">//</span>
        <span class="badge-title">AUTONOMOUS SOURCING INFRASTRUCTURE</span>
      </div>

      <!-- Animated High-Fashion Typographic Headline -->
      <div class="hero-headline-block">
        <h1 class="hero-masked-h1">
          <span class="hero-line hero-line-top">THE NEW OPERATING SYSTEM</span>
          <span class="hero-line hero-line-bottom">
            <span class="hero-volt-capsule">FOR GLOBAL APPAREL PRODUCTION.</span>
          </span>
        </h1>
        <p class="hero-sublead">
          Direct cloud-integrated manufacturing connecting modern fashion houses directly to certified smart factories across Bangladesh, Portugal, and Japan. Real-time Clo3D digital prototyping, mill-direct transparency, and live FOB pricing in BDT.
        </p>
      </div>

      <!-- Action Cluster -->
      <div class="hero-cta-cluster">
        <NuxtLink to="/showroom" class="hero-btn-primary">
          <span>Explore Digital Showroom</span>
          <ArrowUpRight :size="16" class="btn-icon" />
        </NuxtLink>

        <NuxtLink to="/estimator" class="hero-btn-secondary">
          <span>Calculate Instant RFQ</span>
          <Sparkles :size="15" class="btn-sparkle" />
        </NuxtLink>
      </div>

      <!-- 4K Cinematic Video Simulation Stage -->
      <div
        class="hero-stage-card"
        @mouseenter="isHoveringStage = true"
        @mouseleave="isHoveringStage = false"
      >
        <div class="hero-video-wrapper">
          <video
            ref="videoRef"
            autoplay
            muted
            loop
            playsinline
            class="hero-video-element"
          >
            <source src="/banner.mp4" type="video/mp4" />
            <source src="/Product Pic/Banner/gemini_generated_video_c20cb600.mp4" type="video/mp4" />
          </video>

          <!-- Subtle Top & Bottom Cinematic Vignette (Preserves Light Vibe) -->
          <div class="video-overlay-subtle" />

          <!-- Top HUD: Live Telemetry & Quick Controls -->
          <div class="video-hud-bar">
            <div class="hud-pill font-mono">
              <span class="live-dot" />
              <span>CLO3D SIMULATION ENGINE • 60 FPS • LIVE FABRIC PHYSICS</span>
            </div>

            <!-- Video Player Controls -->
            <div class="hud-controls-cluster font-mono">
              <button
                class="hud-control-btn"
                :title="isPaused ? 'Resume Video' : 'Pause Video'"
                @click="togglePlay"
              >
                <Play v-if="isPaused" :size="13" />
                <Pause v-else :size="13" />
                <span class="btn-label">{{ isPaused ? 'PLAY' : 'PAUSE' }}</span>
              </button>

              <button
                class="hud-control-btn"
                :class="{ 'is-active-sound': !isMuted }"
                :title="isMuted ? 'Unmute Audio' : 'Mute Audio'"
                @click="toggleAudio"
              >
                <Volume2 v-if="!isMuted" :size="13" />
                <VolumeX v-else :size="13" />
                <span class="btn-label">{{ isMuted ? 'MUTED' : 'AUDIO ON' }}</span>
              </button>

              <button
                class="hud-control-btn"
                title="Fullscreen Preview"
                @click="toggleFullscreen"
              >
                <Maximize2 :size="13" />
              </button>
            </div>
          </div>

          <!-- Bottom HUD: Active Location & Capability Badge -->
          <div class="video-bottom-hud font-mono">
            <div class="location-badge">
              <span class="loc-indicator" />
              <span>DHAKA HUB // TOKYO // PORTO PROTOCOL</span>
            </div>
            <div class="resolution-badge">
              <span>ULTRA-HD 4K // COLOR ACCURATE</span>
            </div>
          </div>
        </div>

        <!-- Telemetry Metrics Grid (Luminous Light Theme) -->
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
            <span class="telemetry-caption">Clo3D Digital Turnaround</span>
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
.banner-hero-section {
  position: relative;
  padding: 8.5rem 0 5.5rem;
  background: #ffffff;
  overflow: hidden;
}

/* Atmospheric Ambient Light Reflection */
.hero-ambient-glow {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 500px;
  background: radial-gradient(circle at 50% 30%, rgba(212, 255, 0, 0.08) 0%, rgba(200, 163, 50, 0.04) 40%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Floating Chapter Badge */
.hero-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #f7f7f5;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  animation: floatSlow 4s ease-in-out infinite;
}

.hero-header-badge:hover {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.16);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.live-beacon {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  animation: badgeLivePulse 2s infinite;
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

/* Typographic Headline */
.hero-headline-block {
  max-width: 1040px;
  margin-bottom: 2.25rem;
}

.hero-masked-h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.4rem, 5.2vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #0a0b0d;
  margin: 0 0 1.35rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-transform: uppercase;
}

.hero-line {
  display: inline-block;
  transition: transform 0.4s ease;
}

.hero-volt-capsule {
  position: relative;
  display: inline-block;
  color: #0a0b0d;
  z-index: 1;
  padding: 0 0.08em;
  white-space: nowrap;
}

.hero-volt-capsule::before {
  content: '';
  position: absolute;
  left: 0.04em;
  right: 0.04em;
  bottom: 0.12em;
  height: 0.32em;
  background: var(--accent-volt, #d4ff00);
  z-index: -1;
  border-radius: 2px;
  box-shadow: 0 0 16px rgba(212, 255, 0, 0.38);
}

.hero-sublead {
  font-size: clamp(1.02rem, 1.3vw, 1.2rem);
  line-height: 1.65;
  color: #4b5563;
  max-width: 820px;
  margin: 0 auto;
}

/* CTA Buttons */
.hero-cta-cluster {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: #0a0b0d;
  color: #ffffff;
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-btn-primary:hover {
  background: #181a20;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.24);
}

.hero-btn-primary .btn-icon {
  transition: transform 0.3s ease;
}

.hero-btn-primary:hover .btn-icon {
  transform: translate(2px, -2px);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: #ffffff;
  color: #0a0b0d;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 9999px;
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-btn-secondary:hover {
  background: #fbfbfa;
  border-color: rgba(0, 0, 0, 0.22);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.btn-sparkle {
  color: #d4a310;
  animation: pulseGlow 2s infinite ease-in-out;
}

/* 4K Stage Card (Ultra Modern Light Architectural Aesthetic) */
.hero-stage-card {
  width: 100%;
  max-width: 1260px;
  background: #ffffff;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.4s ease, transform 0.4s ease;
}

.hero-stage-card:hover {
  box-shadow: 0 32px 80px -10px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

/* Cinematic Video Container */
.hero-video-wrapper {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
  background: #f1f2f5;
}

.hero-video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(104%) brightness(98%);
  display: block;
}

/* Subtle Film Vignette (Keeps Video Brilliant and Clean) */
.video-overlay-subtle {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
}

/* Video HUD Top Bar */
.video-hud-bar {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 2;
  flex-wrap: wrap;
}

.hud-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.45rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: badgeLivePulse 1.8s infinite;
}

/* Player Controls Cluster */
.hud-controls-cluster {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hud-control-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  color: #0f172a;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
}

.hud-control-btn:hover {
  background: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.2);
}

.hud-control-btn.is-active-sound {
  background: #d4ff00;
  color: #0a0b0d;
  border-color: #d4ff00;
  box-shadow: 0 4px 14px rgba(212, 255, 0, 0.35);
}

.btn-label {
  letter-spacing: 0.04em;
}

/* Bottom HUD Badges */
.video-bottom-hud {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 2;
  font-size: 0.7rem;
  font-weight: 700;
  color: #ffffff;
}

.location-badge, .resolution-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(10, 11, 13, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  letter-spacing: 0.05em;
}

.loc-indicator {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 6px #38bdf8;
}

/* Telemetry Dashboard (Crisp Light Theme) */
.hero-telemetry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #fafaf8;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.telemetry-box {
  padding: 2.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  transition: all 0.3s ease;
}

.telemetry-box:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

.telemetry-box:last-child {
  border-right: none;
}

.telemetry-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.telemetry-val {
  font-family: var(--font-display, sans-serif);
  font-size: 2.35rem;
  font-weight: 800;
  color: #0a0b0d;
  line-height: 1.1;
  margin-bottom: 0.35rem;
  letter-spacing: -0.03em;
}

.telemetry-caption {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

/* Responsive Rules */
@media (max-width: 1024px) {
  .hero-video-wrapper {
    height: 420px;
  }
  .hero-telemetry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .telemetry-box:nth-child(2) {
    border-right: none;
  }
  .telemetry-box:nth-child(-n+2) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
}

@media (max-width: 640px) {
  .banner-hero-section {
    padding: 7rem 0 3.5rem;
  }
  .hero-volt-capsule {
    white-space: normal;
  }
  .hero-video-wrapper {
    height: 300px;
  }
  .video-bottom-hud {
    display: none;
  }
  .hero-telemetry-grid {
    grid-template-columns: 1fr;
  }
  .telemetry-box {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding: 1.6rem 1rem;
  }
  .telemetry-box:last-child {
    border-bottom: none;
  }
  .hud-pill {
    font-size: 0.65rem;
    padding: 0.35rem 0.65rem;
  }
}
</style>
