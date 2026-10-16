<script setup lang="ts">
import { computed } from 'vue'
import { Search, Filter, Eye, ArrowUpRight } from 'lucide-vue-next'

export interface Product {
  id: string
  title: string
  category: string
  vibe?: string
  season?: string
  description?: string
  image_url: string
  fabric_details?: string
  cut_silhouette?: string
  moq?: number
  lead_time?: string
  fob_price?: string
  featured?: boolean
}

const props = defineProps<{
  products: Product[]
  isLoading?: boolean
  activeCategory: string
  searchQuery: string
  categories: string[]
}>()

const emit = defineEmits<{
  (e: 'update:activeCategory', val: string): void
  (e: 'update:searchQuery', val: string): void
  (e: 'selectProduct', p: Product): void
}>()

const filteredProducts = computed(() => {
  return props.products.filter((p) => {
    const matchesCategory =
      props.activeCategory === 'All' || p.category === props.activeCategory
    const matchesSearch =
      !props.searchQuery ||
      p.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      (p.fabric_details &&
        p.fabric_details.toLowerCase().includes(props.searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section id="showroom" class="section-padding bg-surface-clean">
    <div class="container">
      <div class="chapter-badge font-mono">
        <span class="badge-num">[05]</span>
        <span class="badge-label">DIGITAL SHOWROOM</span>
      </div>

      <div class="showroom-header-grid">
        <div class="header-left">
          <h2 class="chapter-h2">
            LIVE PRODUCTION ARCHIVE &<br />
            <span class="text-gradient">TECH PACK SAMPLES.</span>
          </h2>
          <p class="chapter-lead">
            Explore verified garment silhouettes available for rapid customization, Clo3D digital avatar fitting, and direct mill fabric procurement. FOB benchmarks calibrated in Bangladeshi Taka (BDT).
          </p>
        </div>

        <!-- Search Bar -->
        <div class="header-right">
          <div class="search-input-wrapper">
            <Search :size="16" class="search-icon" />
            <input
              type="text"
              :value="searchQuery"
              @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
              placeholder="Search fabrics, silhouettes, categories..."
              class="showroom-search-input font-mono"
            />
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-pills-bar font-mono">
        <button
          v-for="cat in categories"
          :key="cat"
          class="cat-filter-btn"
          :class="{ 'is-active': activeCategory === cat }"
          @click="emit('update:activeCategory', cat)"
        >
          <span>{{ cat }}</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="catalog-loading-state font-mono">
        <span class="loading-spinner-ring" />
        <span>STREAMING GARMENT ARCHIVES FROM NEON POSTGRESQL...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="catalog-empty-state">
        <p class="empty-title">No garment styles matched your criteria</p>
        <p class="empty-desc">Try resetting your search query or choosing another category filter.</p>
        <button class="reset-filter-btn font-mono" @click="emit('update:activeCategory', 'All'); emit('update:searchQuery', '')">
          Reset All Filters
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else class="products-catalog-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-catalog-card"
          @click="emit('selectProduct', product)"
        >
          <div class="product-media-stage">
            <img
              :src="product.image_url"
              :alt="product.title"
              class="product-image"
              loading="lazy"
            />
            <div class="media-hover-overlay">
              <span class="inspect-spec-btn font-mono">
                <Eye :size="14" />
                <span>INSPECT TECH PACK</span>
              </span>
            </div>

            <!-- Vibe Badge -->
            <div class="card-vibe-pill font-mono">
              <span>{{ product.vibe || 'Contemporary' }}</span>
            </div>
          </div>

          <div class="product-info-panel">
            <div class="product-category-row font-mono">
              <span class="prod-cat">{{ product.category }}</span>
              <span class="prod-season">{{ product.season || 'SS26 Capsule' }}</span>
            </div>

            <h3 class="prod-title">{{ product.title }}</h3>

            <div class="prod-specs-box font-mono">
              <div class="spec-row">
                <span class="spec-label">FABRIC:</span>
                <span class="spec-val truncate">{{ product.fabric_details || '100% Cotton' }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">MOQ:</span>
                <span class="spec-val">{{ product.moq || 100 }} PCS</span>
              </div>
            </div>

            <div class="product-pricing-footer">
              <div class="fob-price-stack font-mono">
                <span class="price-label">FOB BENCHMARK</span>
                <span class="price-val">{{ product.fob_price || '৳3,800 - ৳5,200 BDT' }}</span>
              </div>

              <div class="inspect-action-arrow" title="Inspect Full Technical Specifications">
                <ArrowUpRight :size="16" />
              </div>
            </div>
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

.showroom-header-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: flex-end;
  margin-bottom: 2.5rem;
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
  font-size: 1.02rem;
  line-height: 1.65;
  color: #525c6e;
  margin: 0;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.15rem;
  color: #94a3b8;
  pointer-events: none;
}

.showroom-search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  font-size: 0.82rem;
  color: #0a0b0d;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.showroom-search-input:focus {
  border-color: #0a0b0d;
  box-shadow: 0 0 0 2px rgba(10, 11, 13, 0.1);
}

.category-pills-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.cat-filter-btn {
  padding: 0.5rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #525c6e;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.cat-filter-btn:hover {
  border-color: rgba(0, 0, 0, 0.2);
  color: #0a0b0d;
}

.cat-filter-btn.is-active {
  background: #0a0b0d;
  color: #ffffff;
  border-color: #0a0b0d;
}

.catalog-loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 6rem 0;
  font-size: 0.8rem;
  color: #64748b;
  letter-spacing: 0.08em;
}

.loading-spinner-ring {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #0a0b0d;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.catalog-empty-state {
  text-align: center;
  padding: 5rem 1rem;
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px dashed rgba(0, 0, 0, 0.15);
}

.empty-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: #0a0b0d;
}

.empty-desc {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.reset-filter-btn {
  padding: 0.6rem 1.25rem;
  background: #0a0b0d;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.products-catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.product-catalog-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.product-catalog-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 0, 0, 0.18);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.12);
}

.product-media-stage {
  position: relative;
  width: 100%;
  height: 360px;
  background: #f1f5f9;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-catalog-card:hover .product-image {
  transform: scale(1.05);
}

.media-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 11, 13, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.product-catalog-card:hover .media-hover-overlay {
  opacity: 1;
}

.inspect-spec-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #ffffff;
  color: #0a0b0d;
  padding: 0.6rem 1.15rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.card-vibe-pill {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #0a0b0d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.product-info-panel {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  margin-bottom: 0.5rem;
}

.prod-cat {
  color: #10b981;
  font-weight: 700;
  text-transform: uppercase;
}

.prod-season {
  color: #94a3b8;
}

.prod-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.22rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.prod-specs-box {
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.72rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.spec-label {
  color: #64748b;
  flex-shrink: 0;
}

.spec-val {
  color: #0a0b0d;
  font-weight: 700;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-pricing-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 1rem;
  margin-top: auto;
}

.fob-price-stack {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.62rem;
  color: #64748b;
  letter-spacing: 0.06em;
}

.price-val {
  font-size: 0.94rem;
  font-weight: 800;
  color: #0a0b0d;
}

.inspect-action-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #0a0b0d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.product-catalog-card:hover .inspect-action-arrow {
  background: #0a0b0d;
  color: #ffffff;
  transform: translate(2px, -2px);
}

@media (max-width: 880px) {
  .showroom-header-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
