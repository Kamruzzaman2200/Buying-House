<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import StoryChapter from '~/components/StoryChapter.vue'
import BeliefsChapter from '~/components/BeliefsChapter.vue'

useHead({
  title: 'Our Story & Radical Transparency | NEXUS SOURCING',
  meta: [
    {
      name: 'description',
      content:
        'Transforming apparel manufacturing through radical transparency, ethical production, and global supply chain intelligence.',
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

    <StoryChapter />
    <BeliefsChapter />
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
