<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ShieldCheck, Lock, AlertTriangle, X, ArrowRight } from 'lucide-vue-next'

const isOpen = ref(false)
const password = ref('')
const error = ref('')
const isAuthenticating = ref(false)

const handleKeyDown = (e: KeyboardEvent) => {
  // Trigger on Shift + A
  if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault()
    isOpen.value = true
    error.value = ''
    password.value = ''
  }
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleAuthenticate = async () => {
  if (!password.value) {
    error.value = 'Please enter security passkey.'
    return
  }

  isAuthenticating.value = true
  error.value = ''

  setTimeout(async () => {
    if (password.value === 'admin777' || password.value === 'nexus2026' || password.value === 'admin') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nexus_admin_authenticated', 'true')
      }
      isOpen.value = false
      await navigateTo('/admin')
    } else {
      error.value = 'Access Denied: Invalid cryptographic security key.'
    }
    isAuthenticating.value = false
  }, 400)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="secret-modal-overlay" @click.self="isOpen = false">
        <div class="secret-modal-card" role="dialog" aria-modal="true">
          <button class="modal-close-btn" @click="isOpen = false" aria-label="Close modal">
            <X :size="18" />
          </button>

          <div class="modal-header">
            <div class="security-badge-icon">
              <ShieldCheck :size="24" />
            </div>
            <div class="modal-title-stack">
              <span class="security-level font-mono">CONFIDENTIAL GATEWAY</span>
              <h3 class="modal-title">Admin Terminal Access</h3>
            </div>
          </div>

          <p class="modal-desc">
            Restricted control plane for Nexus Sourcing Group executives and supply chain managers.
          </p>

          <form @submit.prevent="handleAuthenticate" class="modal-form">
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

            <button type="submit" class="submit-auth-btn font-mono" :disabled="isAuthenticating">
              <span>{{ isAuthenticating ? 'Decrypting Clearance...' : 'Authenticate Clearance' }}</span>
              <ArrowRight :size="15" />
            </button>
          </form>

          <div class="modal-footer-meta font-mono">
            <span>NEON POSTGRESQL SECURED RUNTIME</span>
            <span>PRESS ESC TO CANCEL</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.secret-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(10, 11, 13, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.secret-modal-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.04);
  color: #0f172a;
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.security-badge-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #0a0b0d;
  color: #d4ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.modal-title-stack {
  display: flex;
  flex-direction: column;
}

.security-level {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #059669;
}

.modal-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.modal-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  color: #0f172a;
  font-size: 0.88rem;
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
  gap: 0.4rem;
  color: #dc2626;
  font-size: 0.74rem;
  margin: 0;
}

.submit-auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  background: #0a0b0d;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
}

.submit-auth-btn:hover {
  background: #1e293b;
  transform: translateY(-1px);
}

.modal-footer-meta {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.65rem;
  color: #94a3b8;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
