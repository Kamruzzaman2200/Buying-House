<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, CheckCircle2, Sparkles, Building, Briefcase, GraduationCap } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

type AudienceTab = 'brands' | 'partners' | 'talent'
const activeAudienceTab = ref<AudienceTab>('brands')

const rfqName = ref('')
const rfqEmail = ref('')
const rfqCompany = ref('')
const rfqInterest = ref('Full Capsule Sourcing (For Brands)')
const rfqMessage = ref('')
const isSubmitting = ref(false)
const rfqSubmitted = ref(false)

const AUDIENCE_INFO = {
  brands: {
    title: 'For Fashion Labels & Direct-to-Consumer Brands',
    desc: 'Bypass legacy agents. Access Clo3D rapid prototyping, direct factory FOB rates in BDT, and end-to-end transparent logistics.',
    icon: Building,
  },
  partners: {
    title: 'For Certified Fabric Mills & Assembly Factories',
    desc: 'Connect your production lines to verified global brands. Receive scheduled purchase orders with guaranteed payment security.',
    icon: Briefcase,
  },
  talent: {
    title: 'For 3D Digital Pattern Makers & Sourcing Specialists',
    desc: 'Join the premier autonomous sourcing platform. Work remotely on high-profile collections with Clo3D and digital twin supply chains.',
    icon: GraduationCap,
  },
}

const handleRfqSubmit = async () => {
  if (!rfqName.value || !rfqEmail.value) return

  isSubmitting.value = true

  try {
    const res = await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        client_name: rfqName.value,
        email: rfqEmail.value,
        company: rfqCompany.value || 'Independent Brand',
        product_interest: rfqInterest.value,
        target_quantity: 500,
        message:
          rfqMessage.value ||
          `Direct RFQ inquiry submitted for audience tab: ${activeAudienceTab.value.toUpperCase()}`,
      },
    })

    if (res.success) {
      rfqSubmitted.value = true
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#d4ff00', '#0a0b0d', '#2563eb', '#10b981'],
        })
      } catch {
        // confetti fallback
      }
    }
  } catch (err) {
    console.error('Failed to submit RFQ inquiry to Neon DB:', err)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  rfqSubmitted.value = false
  rfqName.value = ''
  rfqEmail.value = ''
  rfqCompany.value = ''
  rfqMessage.value = ''
}
</script>

<template>
  <section id="rfq-contact" class="section-padding bg-surface-clean">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[09]</span>
        <span class="badge-label">YOUR NEEDS</span>
      </div>

      <div class="needs-header">
        <h2 class="chapter-h2">
          LET'S BUILD THE FUTURE OF<br />
          <span class="text-gradient">FASHION, TOGETHER.</span>
        </h2>
        <p class="chapter-lead">
          Whether you are launching your next seasonal drop, joining our vetted manufacturing network, or collaborating on digital textiles.
        </p>
      </div>

      <!-- Audience Tabs Bar -->
      <div class="audience-tabs-bar font-mono">
        <button
          class="audience-tab-btn"
          :class="{ 'is-active': activeAudienceTab === 'brands' }"
          @click="activeAudienceTab = 'brands'; rfqInterest = 'Full Capsule Sourcing (For Brands)'"
        >
          <Building :size="15" />
          <span>[01] BRANDS & LABELS</span>
        </button>

        <button
          class="audience-tab-btn"
          :class="{ 'is-active': activeAudienceTab === 'partners' }"
          @click="activeAudienceTab = 'partners'; rfqInterest = 'Factory & Mill Partnership'"
        >
          <Briefcase :size="15" />
          <span>[02] FACTORIES & MILLS</span>
        </button>

        <button
          class="audience-tab-btn"
          :class="{ 'is-active': activeAudienceTab === 'talent' }"
          @click="activeAudienceTab = 'talent'; rfqInterest = 'Textile Specialist Career'"
        >
          <GraduationCap :size="15" />
          <span>[03] SOURCING TALENT</span>
        </button>
      </div>

      <div class="needs-content-grid">
        <!-- Audience Narrative Card -->
        <div class="audience-info-card">
          <div class="audience-icon-badge">
            <component :is="AUDIENCE_INFO[activeAudienceTab].icon" :size="24" />
          </div>
          <h3 class="audience-card-title">{{ AUDIENCE_INFO[activeAudienceTab].title }}</h3>
          <p class="audience-card-desc">{{ AUDIENCE_INFO[activeAudienceTab].desc }}</p>

          <div class="audience-perks-list font-mono">
            <div class="perk-item">
              <CheckCircle2 :size="15" class="perk-icon" />
              <span>Direct factory contact with no middle broker markups</span>
            </div>
            <div class="perk-item">
              <CheckCircle2 :size="15" class="perk-icon" />
              <span>Full AQL 2.5 quality assurance with video audit proofs</span>
            </div>
            <div class="perk-item">
              <CheckCircle2 :size="15" class="perk-icon" />
              <span>Instant FOB quotations in BDT with volume tier discounts</span>
            </div>
          </div>
        </div>

        <!-- RFQ Form Box -->
        <div class="rfq-form-card">
          <div v-if="rfqSubmitted" class="rfq-success-box">
            <div class="success-icon-wrap">
              <CheckCircle2 :size="36" />
            </div>
            <h3 class="success-title">Sourcing Inquiry Transmitted</h3>
            <p class="success-text">
              Your technical requirements have been logged into our Neon PostgreSQL database. Our Lead Merchandiser in Dhaka will reach out within 1 business day.
            </p>
            <button class="reset-rfq-btn font-mono" @click="resetForm">
              Submit Another Inquiry
            </button>
          </div>

          <form v-else @submit.prevent="handleRfqSubmit" class="rfq-form">
            <div class="form-title-row">
              <h3 class="form-card-title">Request Formal B2B Sourcing Quote</h3>
              <span class="form-status-tag font-mono">NEON POSTGRESQL CONNECTED</span>
            </div>

            <div class="form-fields-grid">
              <div class="form-field-group">
                <label class="field-label font-mono">YOUR FULL NAME *</label>
                <input
                  v-model="rfqName"
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  class="field-input font-mono"
                />
              </div>

              <div class="form-field-group">
                <label class="field-label font-mono">BUSINESS EMAIL *</label>
                <input
                  v-model="rfqEmail"
                  type="email"
                  required
                  placeholder="name@fashionlabel.com"
                  class="field-input font-mono"
                />
              </div>
            </div>

            <div class="form-fields-grid">
              <div class="form-field-group">
                <label class="field-label font-mono">COMPANY / BRAND NAME</label>
                <input
                  v-model="rfqCompany"
                  type="text"
                  placeholder="e.g. Atelier Noir Paris"
                  class="field-input font-mono"
                />
              </div>

              <div class="form-field-group">
                <label class="field-label font-mono">SOURCING INTEREST</label>
                <select v-model="rfqInterest" class="field-input font-mono">
                  <option value="Full Capsule Sourcing (For Brands)">Full Capsule Sourcing (For Brands)</option>
                  <option value="Clo3D 3D Digital Prototyping Only">Clo3D 3D Digital Prototyping Only</option>
                  <option value="Heavyweight Outerwear & Jackets">Heavyweight Outerwear & Jackets</option>
                  <option value="Fine Tailored Poplin Shirts">Fine Tailored Poplin Shirts</option>
                  <option value="French Flax Linen Capsule">French Flax Linen Capsule</option>
                  <option value="Factory & Mill Partnership">Factory & Mill Partnership</option>
                </select>
              </div>
            </div>

            <div class="form-field-group">
              <label class="field-label font-mono">PROJECT SPECIFICATIONS / COMMENTS</label>
              <textarea
                v-model="rfqMessage"
                rows="3"
                placeholder="Target quantities, fabric preferences, launch timeline..."
                class="field-input font-mono"
              />
            </div>

            <button type="submit" class="submit-rfq-btn font-mono" :disabled="isSubmitting">
              <span>{{ isSubmitting ? 'Logging to Neon DB...' : 'Transmit Sourcing Request' }}</span>
              <ArrowRight :size="16" />
            </button>
          </form>
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

.needs-header {
  max-width: 860px;
  margin-bottom: 3rem;
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

.audience-tabs-bar {
  display: inline-flex;
  background: #ffffff;
  padding: 0.35rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 2.5rem;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.audience-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.audience-tab-btn:hover {
  color: #0a0b0d;
}

.audience-tab-btn.is-active {
  background: #0a0b0d;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.needs-content-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 2.5rem;
}

.audience-info-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.audience-icon-badge {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
}

.audience-card-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.5rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.audience-card-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #525c6e;
  margin: 0 0 2rem 0;
}

.audience-perks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1.75rem;
}

.perk-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.76rem;
  color: #334155;
  font-weight: 600;
}

.perk-icon {
  color: #10b981;
  flex-shrink: 0;
}

.rfq-form-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.04);
}

.form-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.form-card-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0;
}

.form-status-tag {
  font-size: 0.68rem;
  color: #10b981;
  font-weight: 700;
}

.rfq-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #64748b;
}

.field-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 0.82rem;
  color: #0a0b0d;
  outline: none;
  transition: all 0.2s ease;
}

.field-input:focus {
  border-color: #0a0b0d;
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(10, 11, 13, 0.1);
}

.submit-rfq-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.95rem 1.5rem;
  background: #0a0b0d;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
}

.submit-rfq-btn:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.rfq-success-box {
  text-align: center;
  padding: 3rem 1rem;
}

.success-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #dcfce7;
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
}

.success-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.5rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 0.75rem 0;
}

.success-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #64748b;
  max-width: 480px;
  margin: 0 auto 2rem auto;
}

.reset-rfq-btn {
  padding: 0.75rem 1.5rem;
  background: #0a0b0d;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 980px) {
  .needs-content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .audience-tabs-bar {
    display: flex;
    width: 100%;
    border-radius: 14px;
    padding: 0.35rem;
  }
  .audience-tab-btn {
    flex: 1;
    justify-content: center;
    padding: 0.55rem 0.5rem;
    font-size: 0.72rem;
    border-radius: 10px;
  }
  .rfq-form-card {
    padding: 1.5rem 1.15rem;
    border-radius: 1.25rem;
  }
  .audience-info-card {
    padding: 1.5rem 1.15rem;
    border-radius: 1.25rem;
  }
  .form-fields-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
