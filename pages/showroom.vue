<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import ShowroomChapter from '~/components/ShowroomChapter.vue'
import SpecLightboxModal from '~/components/SpecLightboxModal.vue'
import type { Product } from '~/components/ShowroomChapter.vue'

useHead({
  title: 'Digital Showroom // Tech Packs & Garment Archives | NEXUS SOURCING',
  meta: [
    {
      name: 'description',
      content:
        'Explore verified garment silhouettes available for rapid customization, Clo3D digital avatar fitting, and direct mill fabric procurement. FOB benchmarks in BDT.',
    },
  ],
})

const products = ref<Product[]>([])
const isLoading = ref(true)
const activeCategory = ref('All')
const searchQuery = ref('')
const selectedProduct = ref<Product | null>(null)

const categories = ref<string[]>([
  'All',
  'Outerwear',
  'Tailored Shirts',
  'Linen & Resort',
  'Contemporary Overshirts',
  'Denim',
])

onMounted(async () => {
  try {
    isLoading.value = true
    const [prodsRes, catsRes]: any = await Promise.all([
      $fetch('/api/products').catch(() => null),
      $fetch('/api/categories').catch(() => null),
    ])

    if (prodsRes && (prodsRes.data || prodsRes.products)) {
      products.value = prodsRes.data || prodsRes.products
    }

    if (catsRes && catsRes.names && catsRes.names.length > 0) {
      categories.value = ['All', ...catsRes.names]
    }
  } catch (err) {
    console.error('Failed to stream products from Neon DB:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="subpage-wrapper">
    <div class="container breadcrumb-container">
      <NuxtLink to="/" class="breadcrumb-back-link font-mono">
        <ArrowLeft :size="14" />
        <span>Back to Main Overview</span>
      </NuxtLink>
    </div>

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

    <SpecLightboxModal
      :selected-product="selectedProduct"
      @close="selectedProduct = null"
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
