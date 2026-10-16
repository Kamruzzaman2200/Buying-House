<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import EstimatorChapter from '~/components/EstimatorChapter.vue'

useHead({
  title: 'Real-Time RFQ Cost Estimator | NEXUS SOURCING',
  meta: [
    {
      name: 'description',
      content:
        'Calculate live FOB garment manufacturing costs in Bangladeshi Taka (BDT) with volume tiers and mill-direct textile options.',
    },
  ],
})

const calcCategory = ref('Outerwear')
const calcTier = ref('Premium Organic / Mill-Direct')
const calcQuantity = ref(500)

const estimatedUnitPrice = computed(() => {
  let base = 4200
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
</script>

<template>
  <div class="subpage-wrapper">
    <div class="container breadcrumb-container">
      <NuxtLink to="/" class="breadcrumb-back-link font-mono">
        <ArrowLeft :size="14" />
        <span>Back to Main Overview</span>
      </NuxtLink>
    </div>

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
  </div>
</template>

<style scoped>
.subpage-wrapper {
  padding-top: 5.5rem;
}

.breadcrumb-container {
  margin-bottom: 1.5rem;
}

.breadcrumb-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-back-link:hover {
  color: #0a0b0d;
}
</style>
