<script setup lang="ts">
import { X, ArrowRight, ShieldCheck, Check } from 'lucide-vue-next'
import type { Product } from '~/components/ShowroomChapter.vue'

const props = defineProps<{
  selectedProduct: Product | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'selectForRfq', productTitle: string): void
}>()

const handleRequestSpec = () => {
  if (props.selectedProduct) {
    emit('selectForRfq', props.selectedProduct.title)
    emit('close')
    if (typeof window !== 'undefined') {
      const el = document.getElementById('rfq-contact')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigateTo('/contact')
      }
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="selectedProduct"
        class="spec-modal-overlay"
        @click.self="emit('close')"
        role="dialog"
        aria-modal="true"
      >
        <div class="spec-modal-card">
          <button class="spec-modal-close" @click="emit('close')" aria-label="Close modal">
            <X :size="18" />
          </button>

          <div class="spec-modal-layout">
            <!-- Left: High Res Garment Media -->
            <div class="spec-media-col">
              <img
                :src="selectedProduct.image_url"
                :alt="selectedProduct.title"
                class="spec-main-img"
              />
              <div class="spec-media-badge font-mono">
                <span class="live-dot" />
                <span>CLO3D 3D TWIN VERIFIED</span>
              </div>
            </div>

            <!-- Right: Technical Specification Panel -->
            <div class="spec-details-col">
              <div class="spec-category-row font-mono">
                <span class="spec-cat-tag">{{ selectedProduct.category }}</span>
                <span class="spec-season-tag">{{ selectedProduct.season || 'SS26 Drop' }}</span>
              </div>

              <h2 class="spec-garment-title">{{ selectedProduct.title }}</h2>

              <p class="spec-desc-text">
                {{ selectedProduct.description || 'Precision engineered garment silhouette manufactured with direct mill fabrics and audited ethical assembly.' }}
              </p>

              <!-- Technical Attributes Grid -->
              <div class="spec-attributes-grid font-mono">
                <div class="attr-box">
                  <span class="attr-label">FABRIC COMPOSITION</span>
                  <span class="attr-val">{{ selectedProduct.fabric_details || '100% Combed Cotton' }}</span>
                </div>

                <div class="attr-box">
                  <span class="attr-label">CUT & SILHOUETTE</span>
                  <span class="attr-val">{{ selectedProduct.cut_silhouette || 'Tailored Regular' }}</span>
                </div>

                <div class="attr-box">
                  <span class="attr-label">MINIMUM ORDER (MOQ)</span>
                  <span class="attr-val">{{ selectedProduct.moq || 100 }} Units</span>
                </div>

                <div class="attr-box">
                  <span class="attr-label">PRODUCTION LEAD TIME</span>
                  <span class="attr-val">{{ selectedProduct.lead_time || '30 - 45 Days' }}</span>
                </div>

                <div class="attr-box highlight-attr">
                  <span class="attr-label">FOB PRICE BENCHMARK</span>
                  <span class="attr-val-bdt">{{ selectedProduct.fob_price || '৳3,800 - ৳5,200 BDT' }}</span>
                </div>
              </div>

              <div class="spec-certification-row font-mono">
                <ShieldCheck :size="16" class="cert-icon" />
                <span>OEKO-TEX STANDARD 100 • WRAP GOLD AUDITED</span>
              </div>

              <!-- Action Button -->
              <button class="spec-cta-btn font-mono" @click="handleRequestSpec">
                <span>REQUEST SAMPLING & FORMAL RFQ</span>
                <ArrowRight :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.spec-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(10, 11, 13, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.spec-modal-card {
  position: relative;
  width: 100%;
  max-width: 980px;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
}

.spec-modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  color: #0a0b0d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.spec-modal-close:hover {
  background: #0a0b0d;
  color: #ffffff;
}

.spec-modal-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.spec-media-col {
  position: relative;
  background: #f1f5f9;
  min-height: 480px;
}

.spec-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spec-media-badge {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(10, 11, 13, 0.85);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  color: #ffffff;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.spec-details-col {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.spec-category-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.74rem;
  margin-bottom: 0.75rem;
}

.spec-cat-tag {
  color: #10b981;
  font-weight: 800;
  text-transform: uppercase;
}

.spec-season-tag {
  color: #94a3b8;
}

.spec-garment-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.85rem;
  font-weight: 900;
  color: #0a0b0d;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.spec-desc-text {
  font-size: 0.94rem;
  line-height: 1.6;
  color: #525c6e;
  margin: 0 0 1.75rem 0;
}

.spec-attributes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.attr-box {
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.attr-label {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 700;
}

.attr-val {
  font-size: 0.85rem;
  color: #0a0b0d;
  font-weight: 700;
}

.highlight-attr {
  grid-column: span 2;
  background: #0a0b0d;
  color: #ffffff;
}

.highlight-attr .attr-label {
  color: #94a3b8;
}

.attr-val-bdt {
  font-size: 1.15rem;
  font-weight: 900;
  color: #d4ff00;
}

.spec-certification-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #10b981;
  font-weight: 700;
  margin-bottom: 2rem;
}

.spec-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 1rem 1.5rem;
  background: #0a0b0d;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
}

.spec-cta-btn:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 820px) {
  .spec-modal-layout {
    grid-template-columns: 1fr;
  }
  .spec-media-col {
    min-height: 280px;
  }
  .spec-details-col {
    padding: 2rem 1.5rem;
  }
  .spec-attributes-grid {
    grid-template-columns: 1fr;
  }
  .highlight-attr {
    grid-column: span 1;
  }
}
</style>
