<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    target: number
    suffix?: string
    prefix?: string
    duration?: number
    decimals?: number
  }>(),
  {
    suffix: '',
    prefix: '',
    duration: 1600,
    decimals: 0,
  }
)

const displayValue = ref(0)
const counterEl = ref<HTMLElement | null>(null)
let hasAnimated = false

const startCount = () => {
  if (hasAnimated) return
  hasAnimated = true

  const startTime = performance.now()
  const duration = props.duration
  const target = props.target

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    displayValue.value = Number((ease * target).toFixed(props.decimals))

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      displayValue.value = target
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  if (typeof window === 'undefined') return

  if ('IntersectionObserver' in window && counterEl.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCount()
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(counterEl.value)
  } else {
    startCount()
  }
})
</script>

<template>
  <span ref="counterEl" class="animated-counter-num">
    {{ prefix }}{{ displayValue.toLocaleString() }}{{ suffix }}
  </span>
</template>

<style scoped>
.animated-counter-num {
  font-variant-numeric: tabular-nums;
  display: inline-block;
}
</style>
