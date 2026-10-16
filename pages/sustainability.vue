<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import ComplianceChapter from '~/components/ComplianceChapter.vue'

useHead({
  title: 'ESG Compliance & Ethical Audits | NEXUS SOURCING',
  meta: [
    {
      name: 'description',
      content:
        'WRAP, GOTS, BSCI, and OEKO-TEX Standard 100 certified ethical apparel manufacturing with real-time tracking.',
    },
  ],
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

    <ComplianceChapter />
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
