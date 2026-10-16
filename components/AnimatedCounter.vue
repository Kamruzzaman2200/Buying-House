<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    target: number
    from?: number
    suffix?: string
    prefix?: string
    duration?: number
    decimals?: number
    delay?: number
  }>(),
  {
    from: 0,
    suffix: '',
    prefix: '',
    duration: 1800,
    decimals: 0,
    delay: 200,
  }
)

const counterEl = ref<HTMLElement | null>(null)
let hasAnimated = false
let animFrameId: number | null = null

const formatNumber = (val: number): string => {
  if (props.decimals > 0) {
    const parts = val.toFixed(props.decimals).split('.')
    const intPart = parseInt(parts[0] ?? '0', 10).toLocaleString('en-US')
    return `${intPart}.${parts[1] ?? ''}`
  }
  return Math.round(val).toLocaleString('en-US')
}

// Initial display string starts from fromVal (or 0)
const displayString = ref(formatNumber(props.from ?? 0))

const startCount = (immediate = false) => {
  if (animFrameId) cancelAnimationFrame(animFrameId)

  const delayMs = immediate ? 0 : (props.delay || 0)
  const startTime = performance.now() + delayMs
  const duration = immediate ? Math.min(props.duration, 1400) : props.duration
  const target = props.target
  const fromVal = props.from ?? 0

  displayString.value = formatNumber(fromVal)

  const step = (now: number) => {
    if (now < startTime) {
      animFrameId = requestAnimationFrame(step)
      return
    }

    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Exponential ease-out: energetic launch with smooth precision glide into final value
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = fromVal + ease * (target - fromVal)

    displayString.value = formatNumber(current)

    if (progress < 1) {
      animFrameId = requestAnimationFrame(step)
    } else {
      displayString.value = formatNumber(target)
      animFrameId = null
    }
  }

  animFrameId = requestAnimationFrame(step)
}

const replay = () => {
  startCount(true)
}

defineExpose({ replay, startCount })

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  // Check if element is already inside viewport on mount
  const checkAndStartIfInView = () => {
    if (hasAnimated || !counterEl.value) return false
    const rect = counterEl.value.getBoundingClientRect()
    const inView = rect.top < window.innerHeight + 50 && rect.bottom > -50
    if (inView) {
      hasAnimated = true
      startCount()
      return true
    }
    return false
  }

  // 1. Immediate in-view check after initial paint
  setTimeout(() => {
    checkAndStartIfInView()
  }, 40)

  // 2. IntersectionObserver with 0 threshold for any scroll entry
  if ('IntersectionObserver' in window && counterEl.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!hasAnimated) {
            hasAnimated = true
            startCount()
          }
        }
      },
      { threshold: 0, rootMargin: '40px' }
    )
    observer.observe(counterEl.value)
  }

  // 3. Fallback safety timer: guarantees counter will NEVER sit stuck at 0
  setTimeout(() => {
    if (!hasAnimated) {
      hasAnimated = true
      startCount()
    }
  }, (props.delay || 0) + 350)
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
  if (observer) observer.disconnect()
})

// Re-animate if target changes
watch(
  () => props.target,
  () => {
    hasAnimated = false
    startCount()
  }
)
</script>

<template>
  <span
    ref="counterEl"
    class="animated-counter-root"
    @mouseenter="replay"
    :title="`Hover to re-animate: ${prefix}${formatNumber(target)}${suffix}`"
  >
    <span v-if="prefix" class="counter-prefix font-display">{{ prefix }}</span>
    <span class="counter-numeric font-display">{{ displayString }}</span>
    <span v-if="suffix" class="counter-suffix font-display">{{ suffix }}</span>
  </span>
</template>

<style scoped>
.animated-counter-root {
  font-variant-numeric: tabular-nums;
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
  letter-spacing: -0.03em;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.animated-counter-root:hover {
  transform: translateY(-2px) scale(1.05);
}

.counter-numeric {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
  font-weight: 800;
}

.counter-prefix {
  margin-right: 1px;
  font-weight: 800;
}

.counter-suffix {
  margin-left: 1px;
  font-weight: 800;
}
</style>
