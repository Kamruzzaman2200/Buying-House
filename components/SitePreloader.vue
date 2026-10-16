<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)
const isExiting = ref(false)
const progress = ref(0)
const statusIndex = ref(0)

const statusMessages = [
  '[01/04] INITIALIZING TEXTILE REPOSITORY & MILL DIRECTORY...',
  '[02/04] CALIBRATING CLO3D 60FPS DIGITAL TWIN ENGINE...',
  '[03/04] STREAMING LIVE BDT FACTORY BENCHMARKS (NEON DB)...',
  '[04/04] NEXUS AUTONOMOUS APPAREL SOURCING PIPELINE READY'
]

const finishPreloader = () => {
  if (isExiting.value) return
  isExiting.value = true
  progress.value = 100
  statusIndex.value = 3

  setTimeout(() => {
    isVisible.value = false
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus:loaded'))
    }
  }, 750)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    finishPreloader()
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  window.addEventListener('keydown', handleKeyDown)

  const startTime = performance.now()
  const duration = 1450 // 1.45s snappy, luxury editorial pace

  const updateProgress = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const p = Math.min(100, Math.floor((elapsed / duration) * 100))
    progress.value = p

    if (p < 30) statusIndex.value = 0
    else if (p < 60) statusIndex.value = 1
    else if (p < 90) statusIndex.value = 2
    else statusIndex.value = 3

    if (elapsed < duration) {
      requestAnimationFrame(updateProgress)
    } else {
      progress.value = 100
      setTimeout(finishPreloader, 180)
    }
  }

  requestAnimationFrame(updateProgress)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <Transition name="preloader-curtain">
    <div v-if="isVisible" class="site-preloader-root" :class="{ 'is-exiting': isExiting }">
      <!-- Ambient Studio Lighting -->
      <div class="preloader-ambient-glow" aria-hidden="true" />

      <!-- Top Header Telemetry -->
      <div class="preloader-top-bar font-mono">
        <div class="top-status">
          <span class="pulse-beacon" />
          <span>SYSTEM CLEARANCE // PRODUCTION PROTOCOL</span>
        </div>
        <button class="skip-intro-btn font-mono" @click="finishPreloader">
          <span>SKIP INTRO [ESC]</span>
        </button>
      </div>

      <!-- Main Central Composition -->
      <div class="preloader-center-content">
        <!-- Animated Brand Monogram -->
        <div class="brand-monogram-stage">
          <div class="monogram-icon-box">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" class="brand-monogram-svg">
              <path
                d="M5 4.5V19.5L14.5 8V19.5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="path-stitch"
              />
              <circle cx="19" cy="5.5" r="2.5" fill="#d4ff00" class="beacon-circle" />
            </svg>
          </div>
          <div class="brand-title-wrap">
            <span class="brand-main-title">NEXUS SOURCING</span>
            <span class="brand-sub-label font-mono">AUTONOMOUS APPAREL ATELIER</span>
          </div>
        </div>

        <!-- Huge Editorial Percentage Meter -->
        <div class="preloader-meter-display">
          <span class="meter-number font-display">{{ progress }}</span>
          <span class="meter-percent font-display">%</span>
        </div>

        <!-- Status Telemetry Ticker -->
        <div class="preloader-status-strip font-mono">
          <span class="status-indicator-tag">{{ statusMessages[statusIndex] }}</span>
        </div>
      </div>

      <!-- Bottom Progress Hairline -->
      <div class="preloader-bottom-dock">
        <div class="dock-meta font-mono">
          <span>DHAKA // TOKYO // PORTO</span>
          <span>CLO3D SIMULATION ENGINE • 60 FPS</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.site-preloader-root {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: #ffffff;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem 3rem;
  overflow: hidden;
  transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.6s ease;
}

.site-preloader-root.is-exiting {
  transform: translateY(-100%);
  pointer-events: none;
}

/* Ambient Backlight */
.preloader-ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle at 50% 50%, rgba(212, 255, 0, 0.08) 0%, rgba(200, 163, 50, 0.04) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Top Bar */
.preloader-top-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
}

.top-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.pulse-beacon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: preloaderBeacon 1.4s infinite;
}

@keyframes preloaderBeacon {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.skip-intro-btn {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  color: #475569;
  font-size: 0.68rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.skip-intro-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: rgba(0, 0, 0, 0.2);
}

/* Center Content */
.preloader-center-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto 0;
}

.brand-monogram-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 2rem;
}

.monogram-icon-box {
  width: 68px;
  height: 68px;
  border-radius: 18px;
  background: #0f172a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.16);
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

.path-stitch {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: stitchDraw 1.2s ease forwards;
}

@keyframes stitchDraw {
  to {
    stroke-dashoffset: 0;
  }
}

.beacon-circle {
  animation: voltGlow 1.5s ease-in-out infinite alternate;
}

@keyframes voltGlow {
  from {
    filter: drop-shadow(0 0 2px #d4ff00);
  }
  to {
    filter: drop-shadow(0 0 8px #d4ff00);
  }
}

.brand-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.brand-main-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: #0f172a;
}

.brand-sub-label {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  color: #64748b;
  font-weight: 700;
}

/* Percentage Meter */
.preloader-meter-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  line-height: 0.95;
  margin-bottom: 1.5rem;
}

.meter-number {
  font-size: clamp(4.5rem, 9vw, 7.5rem);
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.meter-percent {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: #94a3b8;
  margin-left: 0.25rem;
}

/* Status Strip */
.preloader-status-strip {
  display: inline-flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.45rem 1.15rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.04em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* Bottom Progress Hairline */
.preloader-bottom-dock {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dock-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
}

.progress-track {
  width: 100%;
  height: 3px;
  background: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0f172a;
  border-radius: 9999px;
  transition: width 0.08s linear;
}

/* Curtain Transitions */
.preloader-curtain-leave-active {
  transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1);
}

.preloader-curtain-leave-to {
  transform: translateY(-100%);
}

@media (max-width: 768px) {
  .site-preloader-root {
    padding: 1.5rem 1.5rem;
  }
  .dock-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}
</style>
