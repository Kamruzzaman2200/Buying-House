<script setup lang="ts">
import { computed } from 'vue'
import { clearError } from '#app'
import type { NuxtError } from '#app'
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  Home 
} from 'lucide-vue-next'
import Navbar from '~/components/Navbar.vue'
import GlobalFooter from '~/components/GlobalFooter.vue'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error?.statusCode || 404)
const errorMessage = computed(() => {
  if (statusCode.value === 404) {
    return 'Pattern Specification Not Found in Production Archive.'
  }
  return props.error?.statusMessage || 'An unexpected technical deviation occurred.'
})

const handleClearError = () => {
  clearError({ redirect: '/' })
}

useHead({
  title: '404 // Archive Not Located | NEXUS SOURCING',
  meta: [
    {
      name: 'description',
      content: 'The requested fashion production spec or route does not exist in the Nexus Sourcing autonomous archive.',
    },
  ],
})
</script>

<template>
  <div class="site-app-shell error-page-shell">
    <!-- Floating Navigation Bar -->
    <Navbar />

    <!-- Main 404 Stage -->
    <main class="error-main-stage">
      <!-- Atmospheric Ambient Backlight -->
      <div class="error-ambient-glow" aria-hidden="true" />

      <div class="container error-container">
        <!-- Chapter Eyebrow -->
        <div class="chapter-badge font-mono error-badge">
          <span class="badge-num">[ERR:{{ statusCode }}]</span>
          <span class="badge-label">ARCHIVE ANOMALY // ROUTE DISCONNECTED</span>
        </div>

        <!-- Giant Sculptural 404 Display -->
        <div class="error-hero-meter">
          <div class="error-num-wrap">
            <span class="error-giant-num font-display">4</span>
            <div class="error-monogram-zero">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="none" class="zero-stitch-svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2" stroke-dasharray="4 3" />
                <path d="M12 7V13L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="12" r="2.5" fill="#d4ff00" />
              </svg>
            </div>
            <span class="error-giant-num font-display">4</span>
          </div>
        </div>

        <!-- Editorial Headline & Copy -->
        <div class="error-header-block">
          <h1 class="error-headline font-display">
            {{ errorMessage }}
          </h1>
          <p class="error-subtext">
            The technical silhouette, tech pack spec, or URL endpoint you attempted to inspect is not registered in our Neon PostgreSQL inventory. The collection may have been archived, re-indexed, or relocated.
          </p>
        </div>

        <!-- Technical Telemetry Diagnostic Box -->
        <div class="error-diagnostic-dock font-mono">
          <div class="diagnostic-row">
            <span class="diag-key">HTTP STATUS</span>
            <span class="diag-val font-bold text-red-600">{{ statusCode }} NOT_FOUND</span>
          </div>
          <div class="diagnostic-row">
            <span class="diag-key">SYSTEM ROUTER</span>
            <span class="diag-val">NUXT 4 NITRO RUNTIME // EDGE DISPATCH</span>
          </div>
          <div class="diagnostic-row">
            <span class="diag-key">SPEC RESOLUTION</span>
            <span class="diag-val text-muted">TERMINATED (ZERO GARMENT MATCH)</span>
          </div>
        </div>

        <!-- Primary Action Navigation -->
        <div class="error-actions-cluster">
          <button @click="handleClearError" class="btn-error-primary font-mono">
            <Home :size="16" />
            <span>Return to Main Overview</span>
          </button>

          <NuxtLink to="/showroom" class="btn-error-secondary font-mono">
            <Sparkles :size="15" />
            <span>Explore Digital Showroom</span>
          </NuxtLink>
        </div>

        <!-- Quick Directory Navigation Cards -->
        <div class="verified-routes-box">
          <div class="verified-routes-header font-mono">
            <span class="verified-dot" />
            <span>VERIFIED DIRECTORY DESTINATIONS</span>
          </div>

          <div class="verified-cards-grid">
            <NuxtLink to="/showroom" class="verified-route-card">
              <div class="route-card-top font-mono">
                <span class="route-step">[01]</span>
                <Sparkles :size="16" class="route-icon" />
              </div>
              <h3 class="route-title">Digital Showroom</h3>
              <p class="route-desc font-mono">Verified garment tech packs & BDT FOB pricing</p>
            </NuxtLink>

            <NuxtLink to="/estimator" class="verified-route-card">
              <div class="route-card-top font-mono">
                <span class="route-step">[02]</span>
                <Calculator :size="16" class="route-icon" />
              </div>
              <h3 class="route-title">Cost Estimator</h3>
              <p class="route-desc font-mono">Real-time BDT manufacturing cost calculator</p>
            </NuxtLink>

            <NuxtLink to="/capabilities" class="verified-route-card">
              <div class="route-card-top font-mono">
                <span class="route-step">[03]</span>
                <Layers :size="16" class="route-icon" />
              </div>
              <h3 class="route-title">Sourcing Pathways</h3>
              <p class="route-desc font-mono">Fast-track capsules & enterprise volume scale</p>
            </NuxtLink>

            <NuxtLink to="/sustainability" class="verified-route-card">
              <div class="route-card-top font-mono">
                <span class="route-step">[04]</span>
                <ShieldCheck :size="16" class="route-icon" />
              </div>
              <h3 class="route-title">ESG & Compliance</h3>
              <p class="route-desc font-mono">WRAP Gold, GOTS, BSCI certified ethical audits</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <!-- Global Footer -->
    <GlobalFooter />
  </div>
</template>

<style scoped>
.error-page-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #0a0b0d;
}

.error-main-stage {
  flex: 1;
  position: relative;
  padding: 8.5rem 0 6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.error-ambient-glow {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 550px;
  background: radial-gradient(circle, rgba(212, 255, 0, 0.08) 0%, rgba(200, 163, 50, 0.04) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.error-container {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0.38rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.error-badge .badge-num {
  color: #e11d48;
}

/* Giant 404 Display */
.error-hero-meter {
  margin-bottom: 1.5rem;
}

.error-num-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  line-height: 0.9;
}

.error-giant-num {
  font-size: clamp(6.5rem, 15vw, 11rem);
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.06em;
  line-height: 0.85;
}

.error-monogram-zero {
  width: clamp(75px, 12vw, 115px);
  height: clamp(75px, 12vw, 115px);
  border-radius: 28px;
  background: #f8fafc;
  border: 2px dashed rgba(15, 23, 42, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
  animation: zeroSpinFloat 8s ease-in-out infinite alternate;
}

.error-badge {
  animation: errorFadeDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.error-hero-meter {
  animation: errorScaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
}

.error-header-block {
  animation: errorFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
}

.error-diagnostic-dock {
  animation: errorFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
}

.error-actions-cluster {
  animation: errorFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
}

.verified-routes-box {
  animation: errorFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
}

@keyframes errorFadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes errorFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes errorScaleIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes zeroSpinFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(4deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.zero-stitch-svg {
  width: 58%;
  height: 58%;
}

/* Editorial Headline */
.error-header-block {
  max-width: 680px;
  margin-bottom: 2rem;
}

.error-headline {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.error-subtext {
  font-size: 1rem;
  color: #475569;
  line-height: 1.65;
  max-width: 620px;
  margin: 0 auto;
}

/* Technical Diagnostic Box */
.error-diagnostic-dock {
  width: 100%;
  max-width: 600px;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  padding: 1rem 1.4rem;
  margin-bottom: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.diagnostic-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  font-weight: 600;
}

.diag-key {
  color: #64748b;
}

.diag-val {
  color: #0f172a;
}

.text-red-600 {
  color: #e11d48;
}

.text-muted {
  color: #94a3b8;
}

/* Action Buttons */
.error-actions-cluster {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

.btn-error-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #0f172a;
  color: #ffffff;
  padding: 0.85rem 1.7rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.22s ease;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
}

.btn-error-primary:hover {
  background: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
}

.btn-error-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #f1f5f9;
  color: #0f172a;
  padding: 0.85rem 1.7rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.22s ease;
}

.btn-error-secondary:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

/* Verified Routes Grid */
.verified-routes-box {
  width: 100%;
  max-width: 820px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  padding-top: 2.2rem;
}

.verified-routes-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.verified-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.verified-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.verified-route-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  padding: 1.25rem 1.1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.verified-route-card:hover {
  border-color: rgba(15, 23, 42, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
}

.route-card-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
}

.route-icon {
  color: #0f172a;
}

.route-title {
  font-family: var(--font-display, sans-serif);
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.35rem;
}

.route-desc {
  font-size: 0.68rem;
  color: #64748b;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .verified-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .verified-cards-grid {
    grid-template-columns: 1fr;
  }
  .error-actions-cluster {
    flex-direction: column;
    width: 100%;
  }
  .btn-error-primary,
  .btn-error-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
