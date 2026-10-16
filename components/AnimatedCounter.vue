<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    target: number
    suffix?: string
    prefix?: string
    duration?: number
    decimals?: number
    delay?: number
  }>(),
  {
    suffix: '',
    prefix: '',
    duration: 1800,
    decimals: 0,
    delay: 350,
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

// Initial display string
const displayString = ref(formatNumber(0))

const startCount = (immediate = false) => {
  if (animFrameId) cancelAnimationFrame(animFrameId)

  const delayMs = immediate ? 0 : (props.delay || 0)
  const startTime = performance.now() + delayMs
  const duration = immediate ? Math.min(props.duration, 1400) : props.duration
  const target = props.target

  if (immediate) {
    displayString.value = formatNumber(0)
  }

  const step = (now: number) => {
    if (now < startTime) {
      animFrameId = requestAnimationFrame(step)
      return
    }

    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Quartic-out easing: rapid initial acceleration with ultra-smooth gliding landing
    const ease = 1 - Math.pow(1 - progress, 4)
    const current = ease * target

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

  displayString.value = formatNumber(0)

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
      { threshold: 0.1 }
    )
    observer.observe(counterEl.value)
  } else {
    setTimeout(startCount, props.delay || 350)
  }
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
  cursor: default;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.animated-counter-root:hover {
  transform: translateY(-1px) scale(1.03);
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
