<script setup lang="ts">
import { ref } from 'vue'
import { ShieldCheck, Lock, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Admin Gate // Authenticate Clearance | NEXUS SOURCING',
})

const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!password.value) {
    error.value = 'Please enter security passkey.'
    return
  }

  isLoading.value = true
  error.value = ''

  setTimeout(async () => {
    if (password.value === 'admin777' || password.value === 'nexus2026' || password.value === 'admin') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nexus_admin_authenticated', 'true')
      }
      await navigateTo('/admin')
    } else {
      error.value = 'Access Denied: Invalid security passkey.'
    }
    isLoading.value = false
  }, 400)
}
</script>

<template>
  <div class="admin-login-wrapper">
    <div class="admin-login-card">
      <div class="login-header">
        <div class="security-badge-icon">
          <ShieldCheck :size="26" />
        </div>
        <div class="header-text">
          <span class="auth-level font-mono">RESTRICTED CONTROL PLANE</span>
          <h1 class="auth-title">Admin Terminal Access</h1>
        </div>
      </div>

      <p class="auth-desc">
        Internal administrative console for Nexus Sourcing Group executives and merchandisers. Enter your authorized passkey to proceed.
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-wrapper">
          <Lock :size="16" class="input-icon" />
          <input
            v-model="password"
            type="password"
            placeholder="Enter encrypted security passkey..."
            class="security-input font-mono"
            autocomplete="current-password"
            autofocus
          />
        </div>

        <p v-if="error" class="error-msg font-mono">
          <AlertTriangle :size="13" />
          <span>{{ error }}</span>
        </p>

        <button type="submit" class="submit-auth-btn font-mono" :disabled="isLoading">
          <span>{{ isLoading ? 'Verifying Credentials...' : 'Unlock Admin Console' }}</span>
          <ArrowRight :size="15" />
        </button>
      </form>

      <div class="login-footer font-mono">
        <NuxtLink to="/" class="back-link">
          <ArrowLeft :size="13" />
          <span>Return to Storefront</span>
        </NuxtLink>
        <span class="db-pill">NEON POSTGRESQL SECURED</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-login-wrapper {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.admin-login-card {
  width: 100%;
  max-width: 460px;
  background: #121418;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  padding: 2.75rem 2.25rem;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 255, 0, 0.08);
  color: #f1f5f9;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.security-badge-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(212, 255, 0, 0.12);
  border: 1px solid rgba(212, 255, 0, 0.3);
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.auth-level {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #d4ff00;
}

.auth-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.auth-desc {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.55;
  margin: 0 0 2rem 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #64748b;
  pointer-events: none;
}

.security-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.88rem;
  outline: none;
  transition: all 0.2s ease;
}

.security-input:focus {
  border-color: #d4ff00;
  box-shadow: 0 0 0 2px rgba(212, 255, 0, 0.2);
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #ef4444;
  font-size: 0.76rem;
  margin: 0;
}

.submit-auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  background: #d4ff00;
  color: #0a0b0d;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-auth-btn:hover {
  background: #bce600;
  transform: translateY(-1px);
}

.login-footer {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.25rem;
  font-size: 0.72rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #ffffff;
}

.db-pill {
  color: #64748b;
}
</style>
