<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'

const isScrolled = ref(false)
const activeSection = ref('')
const mobileMenuOpen = ref(false)
const scrollProgress = ref(0)

const NAV_LINKS = [
  { id: 'story', label: 'Story', href: '/story' },
  { id: 'solutions', label: 'Capabilities', href: '/capabilities' },
  { id: 'showroom', label: 'Showroom', href: '/showroom' },
  { id: 'estimator', label: 'Estimator', href: '/estimator' },
  { id: 'sustainability', label: 'ESG Audits', href: '/sustainability' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

const handleScroll = () => {
  if (typeof window === 'undefined') return
  const y = window.scrollY
  isScrolled.value = y > 20

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  if (totalHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (y / totalHeight) * 100))
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="floating-navbar-root" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar-capsule">
      <!-- Brand Monogram & Logo -->
      <NuxtLink to="/" class="brand-cluster" @click="mobileMenuOpen = false">
        <div class="brand-monogram" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4.5V19.5L14.5 8V19.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="19" cy="5.5" r="2.5" fill="var(--accent-volt, #d4ff00)" />
          </svg>
        </div>
        <div class="brand-copy">
          <span class="brand-name">NEXUS</span>
          <span class="brand-tag">SOURCING</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <nav class="desktop-nav">
        <NuxtLink
          v-for="link in NAV_LINKS"
          :key="link.id"
          :to="link.href"
          class="desktop-nav-link"
          active-class="is-active"
        >
          <span class="nav-text">{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Action Cluster -->
      <div class="actions-cluster">
        <NuxtLink to="/contact" class="quote-cta-pill">
          <span>Get a Quote</span>
          <ArrowUpRight :size="13" class="cta-arrow-icon" />
        </NuxtLink>

        <!-- Mobile Hamburger Toggle -->
        <button
          class="mobile-toggle-btn"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle navigation"
        >
          <X v-if="mobileMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>

      <!-- Embedded Scroll Progress Bar -->
      <div
        class="capsule-progress-bar"
        :style="{ transform: `scaleX(${scrollProgress / 100})` }"
      />
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-dropdown-card">
        <div class="mobile-links-stack">
          <NuxtLink
            v-for="link in NAV_LINKS"
            :key="link.id"
            :to="link.href"
            class="mobile-link-item"
            @click="mobileMenuOpen = false"
          >
            <span>{{ link.label }}</span>
            <ArrowUpRight :size="14" class="mobile-link-arrow" />
          </NuxtLink>
        </div>

        <div class="mobile-actions-divider" />

        <div class="mobile-bottom-stack">
          <NuxtLink
            to="/contact"
            class="quote-cta-pill w-full justify-center"
            @click="mobileMenuOpen = false"
          >
            <span>Request Instant Sourcing Quotation</span>
            <ArrowUpRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.floating-navbar-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 1.15rem 1.5rem 0.5rem;
  pointer-events: none;
  transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-navbar-root.is-scrolled {
  padding-top: 0.75rem;
}

.navbar-capsule {
  pointer-events: auto;
  max-width: 1160px;
  margin: 0 auto;
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 9999px;
  padding: 0.42rem 0.55rem 0.42rem 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow:
    0 16px 36px -10px rgba(0, 0, 0, 0.08),
    0 2px 8px -2px rgba(0, 0, 0, 0.04);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.floating-navbar-root.is-scrolled .navbar-capsule {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow:
    0 20px 48px -8px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

.brand-cluster {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: #0a0b0d;
  user-select: none;
  flex-shrink: 0;
}

.brand-monogram {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: #0a0b0d;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  transition: transform 0.25s ease;
}

.brand-cluster:hover .brand-monogram {
  transform: scale(1.05);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--font-display, sans-serif);
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
  color: #0a0b0d;
}

.brand-tag {
  font-family: var(--font-body, sans-serif);
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  color: #64748b;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.desktop-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.95rem;
  font-family: var(--font-body, sans-serif);
  font-size: 0.84rem;
  font-weight: 500;
  color: #525c6e;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.desktop-nav-link:hover {
  color: #0a0b0d;
  background: rgba(0, 0, 0, 0.05);
}

.desktop-nav-link.is-active {
  color: #0a0b0d;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.06);
}

.actions-cluster {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.quote-cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.48rem 1.15rem;
  border-radius: 9999px;
  background: #0a0b0d;
  color: #ffffff;
  font-family: var(--font-body, sans-serif);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.quote-cta-pill:hover {
  background: #000000;
  border-color: rgba(212, 255, 0, 0.35);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
}

.cta-arrow-icon {
  transition: transform 0.2s ease;
}

.quote-cta-pill:hover .cta-arrow-icon {
  transform: translate(1.5px, -1.5px);
}

.mobile-toggle-btn {
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f1f5f9;
  color: #0a0b0d;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.capsule-progress-bar {
  position: absolute;
  bottom: 0;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background: linear-gradient(90deg, #d4ff00, #10b981);
  transform-origin: 0%;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.floating-navbar-root.is-scrolled .capsule-progress-bar {
  opacity: 1;
}

.mobile-dropdown-card {
  pointer-events: auto;
  width: calc(100% - 1.5rem);
  max-width: 460px;
  margin: 0.6rem auto 0;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-links-stack {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mobile-link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  font-family: var(--font-body, sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.mobile-link-item:hover {
  background: #f1f5f9;
  color: #0a0b0d;
}

.mobile-actions-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
}

.mobile-bottom-stack {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.97);
}

@media (max-width: 980px) {
  .desktop-nav { display: none; }
  .mobile-toggle-btn { display: flex; }
  .floating-navbar-root { padding: 0.75rem 1rem 0; }
  .navbar-capsule { padding: 0.38rem 0.5rem 0.38rem 0.85rem; gap: 0.75rem; }
}

@media (max-width: 520px) {
  .brand-tag { display: none; }
  .quote-cta-pill { padding: 0.42rem 0.85rem; font-size: 0.74rem; }
}

@media (max-width: 380px) {
  .navbar-capsule {
    padding: 0.32rem 0.45rem 0.32rem 0.65rem;
    gap: 0.45rem;
  }
  .quote-cta-pill {
    padding: 0.38rem 0.65rem;
    font-size: 0.7rem;
  }
  .brand-monogram {
    width: 28px;
    height: 28px;
  }
}
</style>
