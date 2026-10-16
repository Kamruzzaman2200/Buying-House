<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import HeroSection from '~/components/HeroSection.vue'
import MarqueeRibbon from '~/components/MarqueeRibbon.vue'
import StoryChapter from '~/components/StoryChapter.vue'
import DualPathwaysChapter from '~/components/DualPathwaysChapter.vue'
import BeliefsChapter from '~/components/BeliefsChapter.vue'
import PillarsChapter from '~/components/PillarsChapter.vue'
import ShowroomChapter from '~/components/ShowroomChapter.vue'
import WorkflowChapter from '~/components/WorkflowChapter.vue'
import EstimatorChapter from '~/components/EstimatorChapter.vue'
import ComplianceChapter from '~/components/ComplianceChapter.vue'
import NeedsChapter from '~/components/NeedsChapter.vue'
import SpecLightboxModal from '~/components/SpecLightboxModal.vue'
import type { Product } from '~/components/ShowroomChapter.vue'

useHead({
  title: 'NEXUS SOURCING | Autonomous Apparel Buying House & Global Production',
  meta: [
    {
      name: 'description',
      content:
        'Next-generation apparel buying house and digital manufacturing platform inspired by Nitex. 3D Clo3D sampling, certified factory network, powered by Neon PostgreSQL.',
    },
  ],
})

const products = ref<Product[]>([])
const isLoading = ref(true)
const activeCategory = ref('All')
const searchQuery = ref('')
const selectedProduct = ref<Product | null>(null)

// Estimator State
const calcCategory = ref('Outerwear')
const calcTier = ref('Premium Organic / Mill-Direct')
const calcQuantity = ref(500)

const estimatedUnitPrice = computed(() => {
  let base = 4200 // BDT base
  if (calcCategory.value === 'Outerwear') base = 8150
  if (calcCategory.value === 'Tailored Shirts') base = 3350
  if (calcCategory.value === 'Linen & Resort') base = 4080
  if (calcCategory.value === 'Denim') base = 5520

  if (calcQuantity.value >= 2000) base *= 0.78
  else if (calcQuantity.value >= 1000) base *= 0.85
  else if (calcQuantity.value >= 500) base *= 0.92

  if (calcTier.value === 'Luxury Italian / Japanese Mills') base *= 1.35
  if (calcTier.value === 'Standard Combed Cotton') base *= 0.88

  return Math.round(base)
})

const estimatedTotal = computed(() => estimatedUnitPrice.value * calcQuantity.value)

const categories = ['All', 'Outerwear', 'Linen & Resort', 'Tailored Shirts', 'Contemporary Overshirts']

onMounted(async () => {
  try {
    isLoading.value = true
    const res: any = await $fetch('/api/products')
    if (res && (res.data || res.products)) {
      products.value = res.data || res.products
    }
  } catch (err) {
    console.error('Failed to stream products from Neon DB:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="homepage-wrapper">
    <!-- Chapter Hero -->
    <HeroSection />

    <!-- Ticker Ribbon -->
    <MarqueeRibbon />

    <!-- Chapter 01: Our Story -->
    <StoryChapter />

    <!-- Chapter 02: What We Do (Dual Pathways) -->
    <DualPathwaysChapter />

    <!-- Chapter 03: What We Believe -->
    <BeliefsChapter />

    <!-- Chapter 04: How We Help (5 Pillars) -->
    <PillarsChapter />

    <!-- Chapter 05: Digital Showroom -->
    <ShowroomChapter
      :products="products"
      :is-loading="isLoading"
      :active-category="activeCategory"
      :search-query="searchQuery"
      :categories="categories"
      @update:active-category="activeCategory = $event"
      @update:search-query="searchQuery = $event"
      @select-product="selectedProduct = $event"
    />

    <!-- Chapter 06: Production Workflow Timeline -->
    <WorkflowChapter />

    <!-- Chapter 07: Real-Time RFQ Cost Estimator -->
    <EstimatorChapter
      :calc-category="calcCategory"
      :calc-tier="calcTier"
      :calc-quantity="calcQuantity"
      :estimated-unit-price="estimatedUnitPrice"
      :estimated-total="estimatedTotal"
      @update:calc-category="calcCategory = $event"
      @update:calc-tier="calcTier = $event"
      @update:calc-quantity="calcQuantity = $event"
    />

    <!-- Chapter 08: ESG & Sustainability Compliance -->
    <ComplianceChapter />

    <!-- Chapter 09: Your Needs Audience Tabs & RFQ Form -->
    <NeedsChapter />

    <!-- Product Technical Spec Sheet Lightbox Modal -->
    <SpecLightboxModal
      :selected-product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>

<style scoped>
.homepage-wrapper {
  width: 100%;
}
</style>
