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
            placeholder="Enter Admin Passkey (e.g. admin777)"
            class="security-input font-mono"
            autocomplete="current-password"
            autofocus
          />
        </div>

        <div v-if="error" class="error-msg font-mono">
          <AlertTriangle :size="14" />
          <span>{{ error }}</span>
        </div>

        <button type="submit" class="submit-auth-btn font-mono" :disabled="isLoading">
          <span v-if="isLoading">VERIFYING CLEARANCE...</span>
          <template v-else>
            <span>AUTHENTICATE & ENTER</span>
            <ArrowRight :size="16" />
          </template>
        </button>
      </form>

      <div class="login-footer font-mono">
        <NuxtLink to="/" class="back-link">
          <ArrowLeft :size="12" />
          <span>Back to Storefront</span>
        </NuxtLink>
        <span class="db-pill">US-EAST-2 // NEON SECURE</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-login-wrapper {
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: radial-gradient(circle at 50% 20%, rgba(212, 255, 0, 0.06) 0%, transparent 60%), #f8fafc;
}

.admin-login-card {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  padding: 2.75rem 2.25rem;
  box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.login-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.security-badge-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.header-text {
  display: flex;
  flex-direction: column;
}

.auth-level {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #059669;
}

.auth-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.4rem;
  font-weight: 800;
  color: #0a0b0d;
  margin: 0;
  letter-spacing: -0.02em;
}

.auth-desc {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.6;
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
  color: #94a3b8;
  pointer-events: none;
}

.security-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.85rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  color: #0a0b0d;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}

.security-input:focus {
  background: #ffffff;
  border-color: #0a0b0d;
  box-shadow: 0 0 0 3px rgba(10, 11, 13, 0.08);
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #dc2626;
  font-size: 0.78rem;
  margin: 0;
}

.submit-auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  background: #0a0b0d;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.84rem;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.submit-auth-btn:hover {
  background: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.login-footer {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1.25rem;
  font-size: 0.72rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #0a0b0d;
}

.db-pill {
  color: #94a3b8;
}
</style>
