import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(ScrollTrigger)

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  nuxtApp.provide('refreshAnimations', () => {
    setTimeout(initScrollAnimations, 60)
  })

  // Initialize animations on Nuxt app mount and route finish
  nuxtApp.hook('app:mounted', () => {
    setTimeout(initScrollAnimations, 60)
  })

  nuxtApp.hook('page:finish', () => {
    setTimeout(initScrollAnimations, 80)
  })

  // Fallback for document ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initScrollAnimations, 60)
  } else {
    window.addEventListener('DOMContentLoaded', () => setTimeout(initScrollAnimations, 60))
  }

  setupDynamicCardsObserver()
})

let observerAttached = false
function setupDynamicCardsObserver() {
  if (typeof window === 'undefined' || observerAttached) return
  observerAttached = true

  const observer = new MutationObserver((mutations) => {
    let shouldRefresh = false
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i] as HTMLElement
          if (
            node.classList &&
            (node.classList.contains('product-catalog-card') ||
              node.classList.contains('products-catalog-grid') ||
              node.classList.contains('admin-cat-tag'))
          ) {
            shouldRefresh = true
            break
          }
        }
      }
      if (shouldRefresh) break
    }

    if (shouldRefresh) {
      setTimeout(() => {
        applyTiltEffects()
        ScrollTrigger.refresh()
      }, 50)
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

function initScrollAnimations() {
  if (typeof window === 'undefined') return

  // Kill old triggers to avoid duplicates on route changes
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  ScrollTrigger.refresh()

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  // 1. Hero Narrative Entrance (Silky Smooth, Staggered Reveal)
  const heroNarrative = document.querySelector('.hero-narrative-col')
  if (heroNarrative) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      heroNarrative.querySelector('.hero-eyebrow'),
      { opacity: 0, y: -10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out', clearProps: 'all' }
    )
      .fromTo(
        heroNarrative.querySelectorAll('.hero-editorial-h1 span'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
        '-=0.25'
      )
      .fromTo(
        heroNarrative.querySelector('.hero-sublead-text'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        heroNarrative.querySelectorAll('.hero-actions-cluster a'),
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        heroNarrative.querySelectorAll('.telemetry-cell'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
        '-=0.25'
      )
  }

  // Hero Video Stage reveal
  const heroVisual = document.querySelector('.hero-visual-col .hero-stage-card')
  if (heroVisual) {
    gsap.fromTo(
      heroVisual,
      { opacity: 0, scale: 0.95, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.15, clearProps: 'all' }
    )
  }

  // 2. Animate Chapter Badges (Clean single elements only)
  const badges = document.querySelectorAll(
    '.page-chapter, .chapter-badge:not(.error-badge), .badge-capsule, .card-tag-badge, .audit-tag, .stage-tag, .breadcrumb-back-link, .verified-routes-header'
  )
  badges.forEach((b) => {
    if (b.classList.contains('hero-eyebrow')) return
    gsap.fromTo(
      b,
      { opacity: 0, y: 14, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: b,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 3. Animate Section Header Blocks as cohesive, fluid units (NO double transforms)
  const sectionHeaders = document.querySelectorAll(
    '.chapter-header-grid, .pathway-headline-box, .beliefs-header, .pillars-header, .showroom-header-grid, .workflow-header, .estimator-header, .compliance-header, .needs-header, .subpage-header, .pane-header-row'
  )
  sectionHeaders.forEach((header) => {
    gsap.fromTo(
      header,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 4. Staggered Entrance for ALL Grid Cards
  const cardGrids = document.querySelectorAll(
    '.products-catalog-grid, .story-cards-grid, .story-telemetry-ribbon, .pillars-grid, .comparison-grid, .workflow-timeline-grid, .compliance-cards-grid, .audience-tabs-bar, .category-pills-bar, .pathway-tabs-bar, .needs-content-grid, .estimator-calculator-box, .footer-top-grid, .pathway-points-grid, .options-pills-wrap, .verified-routes-grid, .admin-metrics-row'
  )
  cardGrids.forEach((grid) => {
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 26, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: grid,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 5. Staggered List Items (Comparisons, Perks, Checklists, Footer lists)
  const listContainers = document.querySelectorAll(
    '.comparison-list, .audience-perks-list, .checklist-items-wrap, .footer-list, .error-diagnostic-dock'
  )
  listContainers.forEach((list) => {
    gsap.fromTo(
      list.children,
      { opacity: 0, x: -12 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: list,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 6. Apply 3D perspective tilt micro-interactions
  applyTiltEffects()

  // 7. Buttons & Interactive Pills Magnetic Hover
  const buttons = document.querySelectorAll(
    '.hero-cta-primary, .hero-cta-secondary, .quote-cta-pill, .cat-filter-btn, .pathway-tab-btn, .audience-tab-btn, .option-pill-btn, .rfq-submit-btn, .inspect-spec-btn, .btn, .btn-primary, .btn-secondary, .btn-accent, .btn-error-primary, .btn-error-secondary, .category-toggle-btn'
  )
  buttons.forEach((btnEl) => {
    const btn = btnEl as HTMLElement
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -2, duration: 0.2, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, duration: 0.25, ease: 'power2.out' })
    })
  })
}

function applyTiltEffects() {
  if (typeof window === 'undefined') return

  const tiltCards = document.querySelectorAll(
    '.product-catalog-card, .story-feature-card, .pillar-card, .compliance-card, .workflow-timeline-card, .comparison-card, .pathway-showcase-card, .audience-info-card, .rfq-form-card, .price-result-card, .verified-route-card, .admin-stat-card'
  )

  tiltCards.forEach((cardEl) => {
    const card = cardEl as HTMLElement
    if (card.dataset.tiltBound === 'true') return
    card.dataset.tiltBound = 'true'

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const rotateX = -(y / rect.height) * 4
      const rotateY = (x / rect.width) * 4

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.25,
        ease: 'power1.out',
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: 'power2.out',
      })
    })
  })
}
