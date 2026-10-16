<script setup lang="ts">
import SecretAdminTrigger from '~/components/SecretAdminTrigger.vue'
import Navbar from '~/components/Navbar.vue'
import GlobalFooter from '~/components/GlobalFooter.vue'
</script>

<template>
  <div class="site-app-shell">

    <!-- Stealth Shift + A Admin Gate -->
    <SecretAdminTrigger />

    <!-- Modern Floating Capsule Island Dock -->
    <Navbar />

    <!-- Page Content Slot -->
    <main class="site-main-stage">
      <slot />
    </main>

    <!-- Nitex Architectural Light Footer -->
    <GlobalFooter />
  </div>
</template>

<style scoped>
.site-app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #0a0b0d;
}

.site-main-stage {
  flex: 1;
}
</style>
