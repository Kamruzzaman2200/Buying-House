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

  // Expose to window for global access
  if (typeof window !== 'undefined') {
    ;(window as any).__refreshWordPop = initScrollAnimations
  }

  // Run on startup and post-hydration intervals
  initScrollAnimations()
  setTimeout(initScrollAnimations, 50)
  setTimeout(initScrollAnimations, 200)
  setTimeout(initScrollAnimations, 600)

  // Initialize animations on Nuxt app mount and route finish
  nuxtApp.hook('app:mounted', () => {
    setTimeout(initScrollAnimations, 50)
  })

  nuxtApp.hook('page:finish', () => {
    setTimeout(initScrollAnimations, 80)
  })

  // Fallback for window load
  if (document.readyState === 'complete') {
    setTimeout(initScrollAnimations, 100)
  } else {
    window.addEventListener('load', () => setTimeout(initScrollAnimations, 100))
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
          if (node.nodeType === Node.ELEMENT_NODE) {
            initWordPop(node)
            if (
              node.classList &&
              (node.classList.contains('product-catalog-card') ||
                node.classList.contains('products-catalog-grid') ||
                node.classList.contains('admin-cat-tag'))
            ) {
              shouldRefresh = true
            }
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

/**
 * Text selectors across the entire website that receive Word Pop Animation
 */
const WORD_POP_SELECTORS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  '.hero-editorial-h1 span',
  '.hero-sublead-text',
  '.chapter-h2',
  '.chapter-lead',
  '.story-card-title',
  '.story-card-text',
  '.pathway-title',
  '.pathway-desc',
  '.point-text',
  '.pillar-title',
  '.pillar-desc',
  '.comparison-title',
  '.comparison-text',
  '.stage-title',
  '.stage-desc',
  '.compliance-card-title',
  '.compliance-card-desc',
  '.audience-title',
  '.audience-desc',
  '.perk-text',
  '.estimator-title',
  '.estimator-desc',
  '.prod-title',
  '.empty-title',
  '.empty-desc',
  '.eyebrow-title',
  '.footer-desc',
  '.col-title',
  '.footer-list li',
  '.route-title',
  '.route-desc',
  '.subpage-title',
  '.subpage-lead',
  '.metric-desc',
  '.telemetry-meta',
  'p:not(.no-pop)',
]

/**
 * Splits text nodes inside target element into individual .word-pop spans.
 * Preserves all nested tags, whitespace, line breaks, and event listeners.
 */
function splitElementIntoWords(element: HTMLElement): HTMLElement[] {
  if (element.dataset.wordPopped === 'true') {
    return Array.from(element.querySelectorAll<HTMLElement>('.word-pop'))
  }

  // Guard against splitting dynamic inputs, forms, svgs, or reactive counters
  if (
    element.closest('input, textarea, select, button, .animated-counter-root, pre, code, .no-word-pop') ||
    element.querySelector('input, textarea, select, .animated-counter-root')
  ) {
    return []
  }

  const createdWordSpans: HTMLElement[] = []

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ''
      if (!text.trim()) return

      const fragment = document.createDocumentFragment()
      const parts = text.split(/(\s+)/)

      for (const part of parts) {
        if (!part) continue
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part))
        } else {
          const span = document.createElement('span')
          span.className = 'word-pop'
          span.textContent = part

          // Micro-spring hover interaction
          span.addEventListener('mouseenter', () => {
            gsap.to(span, {
              scale: 1.15,
              y: -3.5,
              duration: 0.2,
              ease: 'back.out(2.8)',
              overwrite: 'auto',
            })
          })
          span.addEventListener('mouseleave', () => {
            gsap.to(span, {
              scale: 1,
              y: 0,
              duration: 0.32,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          })

          fragment.appendChild(span)
          createdWordSpans.push(span)
        }
      }

      node.parentNode?.replaceChild(fragment, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      if (
        el.classList.contains('word-pop') ||
        el.classList.contains('animated-counter-root') ||
        el.tagName === 'SVG' ||
        el.tagName === 'BUTTON'
      ) {
        return
      }

      const children = Array.from(el.childNodes)
      for (const child of children) {
        processNode(child)
      }
    }
  }

  const initialChildren = Array.from(element.childNodes)
  for (const child of initialChildren) {
    processNode(child)
  }

  element.dataset.wordPopped = 'true'
  return createdWordSpans
}

/**
 * Initializes Word Pop for all matching text elements on the page
 */
function initWordPop(scope: HTMLElement | Document = document) {
  if (typeof window === 'undefined') return

  const isReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const selectorQuery = WORD_POP_SELECTORS.join(', ')
  const elements = scope.querySelectorAll<HTMLElement>(selectorQuery)

  elements.forEach((el) => {
    // Skip hero elements - they are orchestrated by hero entrance timeline
    const isHero = el.closest('.hero-editorial-section') !== null

    const words = splitElementIntoWords(el)
    if (words.length === 0 || isHero || isReducedMotion) return

    // Bouncy Word Pop ScrollTrigger Reveal
    gsap.fromTo(
      words,
      {
        opacity: 0,
        scale: 0.65,
        y: 15,
        rotateZ: (i) => (i % 2 === 0 ? -2.5 : 2.5),
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.52,
        stagger: Math.min(0.024, 0.65 / Math.max(words.length, 1)),
        ease: 'back.out(2.2)',
        clearProps: 'opacity,scale,y,rotateZ',
        scrollTrigger: {
          trigger: el,
          start: 'top 93%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    )
  })
}

function initScrollAnimations() {
  if (typeof window === 'undefined') return

  // Kill old triggers to avoid duplicates on route changes
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  ScrollTrigger.refresh()

  // Initialize Word Pop across all text elements on page
  initWordPop()

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  // 1. Hero Narrative Entrance with cascading Word Pop
  const heroNarrative = document.querySelector('.hero-narrative-col')
  if (heroNarrative) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      heroNarrative.querySelector('.hero-eyebrow'),
      { opacity: 0, y: -10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out', clearProps: 'all' }
    )

    const heroTitleWords = heroNarrative.querySelectorAll('.hero-editorial-h1 .word-pop')
    if (heroTitleWords.length > 0) {
      tl.fromTo(
        heroTitleWords,
        { opacity: 0, scale: 0.58, y: 18, rotateZ: (i) => (i % 2 === 0 ? -3 : 3) },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.58,
          stagger: 0.035,
          ease: 'back.out(2.2)',
          clearProps: 'opacity,scale,y,rotateZ',
        },
        '-=0.2'
      )
    } else {
      tl.fromTo(
        heroNarrative.querySelectorAll('.hero-editorial-h1 span'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
        '-=0.25'
      )
    }

    const heroSubleadWords = heroNarrative.querySelectorAll('.hero-sublead-text .word-pop')
    if (heroSubleadWords.length > 0) {
      tl.fromTo(
        heroSubleadWords,
        { opacity: 0, scale: 0.75, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.012,
          ease: 'back.out(1.8)',
          clearProps: 'opacity,scale,y',
        },
        '-=0.25'
      )
    } else {
      tl.fromTo(
        heroNarrative.querySelector('.hero-sublead-text'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
      )
    }

    tl.fromTo(
      heroNarrative.querySelectorAll('.hero-actions-cluster a'),
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
      '-=0.3'
    ).fromTo(
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

  // 2. Animate Chapter Badges
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

  // 3. Staggered Entrance for ALL Grid Cards
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

  // 4. Staggered List Items
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

  // 5. Apply 3D perspective tilt micro-interactions
  applyTiltEffects()

  // 6. Buttons & Interactive Pills Magnetic Hover
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
