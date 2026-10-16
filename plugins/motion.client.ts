import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(ScrollTrigger)

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)

  // Initialize global scroll reveal triggers once the DOM is ready
  nuxtApp.hook('page:finish', () => {
    initScrollAnimations()
  })

  // Also initialize on initial mount
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initScrollAnimations, 100)
  } else {
    window.addEventListener('DOMContentLoaded', () => setTimeout(initScrollAnimations, 100))
  }
})

function initScrollAnimations() {
  if (typeof window === 'undefined') return

  // Refresh ScrollTrigger
  ScrollTrigger.refresh()

  // 1. Reveal Section Header Blocks (Badge + Headline + Subtext)
  const headers = document.querySelectorAll('.section-header-block, .chapter-header, .section-head')
  headers.forEach((header) => {
    gsap.fromTo(
      header.children,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 2. Reveal Grids and Cards with Staggered Entrance
  const cardGrids = document.querySelectorAll(
    '.showroom-grid, .telemetry-grid, .pillars-grid, .workflow-timeline, .beliefs-grid, .compliance-grid, .tabs-container'
  )
  cardGrids.forEach((grid) => {
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 3. Floating Micro-Parallax for Badges and Accents
  const floatBadges = document.querySelectorAll('.hero-header-badge, .page-chapter, .live-hud-pill')
  floatBadges.forEach((badge) => {
    gsap.to(badge, {
      y: '-4px',
      repeat: -1,
      yoyo: true,
      duration: 2.4,
      ease: 'sine.inOut',
    })
  })
}
