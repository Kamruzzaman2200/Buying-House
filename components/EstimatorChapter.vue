<script setup lang="ts">
import { computed } from 'vue'
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  calcCategory: string
  calcTier: string
  calcQuantity: number
  estimatedUnitPrice: number
  estimatedTotal: number
}>()

const emit = defineEmits<{
  (e: 'update:calcCategory', val: string): void
  (e: 'update:calcTier', val: string): void
  (e: 'update:calcQuantity', val: number): void
}>()

const categories = [
  'Outerwear',
  'Tailored Shirts',
  'Linen & Resort',
  'Denim',
  'Contemporary Overshirts',
]

const fabricTiers = [
  'Standard Combed Cotton',
  'Premium Organic / Mill-Direct',
  'Luxury Italian / Japanese Mills',
]
</script>

<template>
  <section id="estimator" class="section-padding bg-surface-clean">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[07]</span>
        <span class="badge-label">COST ESTIMATOR</span>
      </div>

      <div class="estimator-header">
        <h2 class="chapter-h2">
          REAL-TIME B2B<br />
          <span class="text-gradient">RFQ COST ENGINE.</span>
        </h2>
        <p class="chapter-lead">
          Direct factory wholesale FOB calculations in Bangladeshi Taka (BDT). Real-time volume scaling and textile tier transparency with zero hidden agent fees.
        </p>
      </div>

      <div class="estimator-calculator-box">
        <div class="calculator-inputs-col">
          <!-- Category Selection -->
          <div class="input-group-row">
            <label class="input-label font-mono">01 // SELECT GARMENT CATEGORY</label>
            <div class="options-pills-wrap">
              <button
                v-for="cat in categories"
                :key="cat"
                class="option-pill-btn"
                :class="{ 'is-selected': calcCategory === cat }"
                @click="emit('update:calcCategory', cat)"
              >
                <span>{{ cat }}</span>
              </button>
            </div>
          </div>

          <!-- Fabric Tier Selection -->
          <div class="input-group-row">
            <label class="input-label font-mono">02 // SELECT FABRIC & YARN TIER</label>
            <div class="options-pills-wrap">
              <button
                v-for="tier in fabricTiers"
                :key="tier"
                class="option-pill-btn"
                :class="{ 'is-selected': calcTier === tier }"
                @click="emit('update:calcTier', tier)"
              >
                <span>{{ tier }}</span>
              </button>
            </div>
          </div>

          <!-- Volume Slider -->
          <div class="input-group-row">
            <div class="slider-header font-mono">
              <label class="input-label">03 // PRODUCTION VOLUME (MOQ SLIDER)</label>
              <span class="slider-current-val">{{ calcQuantity.toLocaleString() }} UNITS</span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              :value="calcQuantity"
              @input="emit('update:calcQuantity', parseInt(($event.target as HTMLInputElement).value))"
              class="volume-range-slider"
            />
            <div class="slider-ticks-row font-mono">
              <span>100 MOQ (Capsule)</span>
              <span>1,000 (Mid-Run)</span>
              <span>2,500 (Bulk)</span>
              <span>5,000+ (Enterprise)</span>
            </div>
          </div>
        </div>

        <!-- Real-Time Calculation Output Card -->
        <div class="calculator-output-col">
          <div class="output-card-inner">
            <div class="output-top-tag font-mono">
              <Calculator :size="15" />
              <span>ESTIMATED FOB BENCHMARK</span>
            </div>

            <div class="unit-price-box">
              <span class="price-currency-sign">৳</span>
              <span class="price-big-num">{{ estimatedUnitPrice.toLocaleString() }}</span>
              <span class="price-unit-tag font-mono">BDT / PC</span>
            </div>

            <div class="calculation-breakdown-list font-mono">
              <div class="calc-row">
                <span class="calc-label">CATEGORY:</span>
                <span class="calc-val">{{ calcCategory }}</span>
              </div>
              <div class="calc-row">
                <span class="calc-label">FABRIC GRADE:</span>
                <span class="calc-val">{{ calcTier }}</span>
              </div>
              <div class="calc-row">
                <span class="calc-label">BATCH QUANTITY:</span>
                <span class="calc-val">{{ calcQuantity.toLocaleString() }} units</span>
              </div>
              <div class="calc-row highlight-row">
                <span class="calc-label">TOTAL ESTIMATED BATCH:</span>
                <span class="calc-val-bdt">৳{{ estimatedTotal.toLocaleString() }} BDT</span>
              </div>
            </div>

            <div class="audit-guarantee-pill font-mono">
              <ShieldCheck :size="14" />
              <span>AQL 2.5 INSPECTION & EXPORT CRATING INCLUDED</span>
            </div>

            <NuxtLink to="/contact" class="transfer-rfq-cta font-mono">
              <span>TRANSFER ESTIMATE TO FORMAL RFQ</span>
              <ArrowRight :size="15" />
            </NuxtLink>
          </div>
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

.estimator-header {
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

.estimator-calculator-box {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.75rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  overflow: hidden;
}

.calculator-inputs-col {
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.input-group-row {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.input-label {
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #64748b;
}

.options-pills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-pill-btn {
  padding: 0.55rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f8fafc;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-pill-btn:hover {
  background: #f1f5f9;
  color: #0a0b0d;
  border-color: rgba(0, 0, 0, 0.2);
}

.option-pill-btn.is-selected {
  background: #0a0b0d;
  color: #ffffff;
  border-color: #0a0b0d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slider-current-val {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0a0b0d;
  background: #d4ff00;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.volume-range-slider {
  width: 100%;
  accent-color: #0a0b0d;
  cursor: pointer;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
}

.slider-ticks-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  color: #94a3b8;
}

.calculator-output-col {
  background: #0a0b0d;
  color: #ffffff;
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.output-card-inner {
  display: flex;
  flex-direction: column;
}

.output-top-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #d4ff00;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
}

.unit-price-box {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 2rem;
}

.price-currency-sign {
  font-family: var(--font-display, sans-serif);
  font-size: 2.2rem;
  font-weight: 700;
  color: #d4ff00;
}

.price-big-num {
  font-family: var(--font-display, sans-serif);
  font-size: 3.8rem;
  font-weight: 900;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.price-unit-tag {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-left: 0.25rem;
}

.calculation-breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.75rem;
  font-size: 0.76rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
}

.calc-label {
  color: #94a3b8;
}

.calc-val {
  color: #ffffff;
  font-weight: 700;
}

.highlight-row {
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
}

.calc-val-bdt {
  color: #d4ff00;
  font-weight: 800;
  font-size: 0.88rem;
}

.audit-guarantee-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #10b981;
  font-size: 0.68rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.transfer-rfq-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.95rem 1.5rem;
  background: #d4ff00;
  color: #0a0b0d;
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.transfer-rfq-cta:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(212, 255, 0, 0.3);
}

@media (max-width: 980px) {
  .estimator-calculator-box {
    grid-template-columns: 1fr;
  }
  .calculator-inputs-col,
  .calculator-output-col {
    padding: 2.25rem 1.75rem;
  }
}
</style>
