import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(ScrollTrigger)

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)

  // Initialize animations directly on Nuxt page transitions
  nuxtApp.hook('page:finish', () => {
    setTimeout(initScrollAnimations, 60)
  })

  // Immediate initialization on page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initScrollAnimations, 60)
  } else {
    window.addEventListener('DOMContentLoaded', () => setTimeout(initScrollAnimations, 60))
  }
})

function initScrollAnimations() {
  if (typeof window === 'undefined') return

  // Kill old triggers to avoid duplicates on route changes
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  ScrollTrigger.refresh()

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  // 1. Hero Narrative Entrance (Staggered Cinematic Entrance)
  const heroNarrative = document.querySelector('.hero-narrative-col')
  if (heroNarrative) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      heroNarrative.querySelector('.hero-eyebrow'),
      { opacity: 0, y: -25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, clearProps: 'transform' }
    )
      .fromTo(
        heroNarrative.querySelectorAll('.hero-editorial-h1 span, .hero-editorial-h1'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, clearProps: 'transform' },
        '-=0.45'
      )
      .fromTo(
        heroNarrative.querySelector('.hero-sublead-text'),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, clearProps: 'transform' },
        '-=0.5'
      )
      .fromTo(
        heroNarrative.querySelectorAll('.hero-actions-cluster a'),
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, clearProps: 'transform' },
        '-=0.4'
      )
      .fromTo(
        heroNarrative.querySelectorAll('.telemetry-cell'),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, clearProps: 'transform' },
        '-=0.3'
      )
  }

  // Hero Video Stage reveal
  const heroVisual = document.querySelector('.hero-visual-col .hero-stage-card')
  if (heroVisual) {
    gsap.fromTo(
      heroVisual,
      { opacity: 0, scale: 0.92, y: 35 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15, clearProps: 'transform' }
    )
  }

  // 2. Animate Chapter Badges, Eyebrows & Status Pills across EVERY section
  const badges = document.querySelectorAll(
    '.page-chapter, .chapter-badge, .hero-eyebrow, .badge-capsule, .card-tag-badge, .audit-tag, .stage-tag, .breadcrumb-back-link'
  )
  badges.forEach((b) => {
    gsap.fromTo(
      b,
      { opacity: 0, y: 20, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'back.out(1.6)',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: b,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 3. Animate ALL Section Headlines & Header Blocks (h2, .chapter-h2, .section-headline, etc.)
  const sectionHeadings = document.querySelectorAll(
    'section h2, .section-headline, .chapter-h2, .page-title, .section-header-block, .chapter-header-grid, .subpage-header, .needs-header, .estimator-header, .workflow-header, .compliance-header, .pillars-header, .beliefs-header, .pathway-headline-box, .showroom-header-grid'
  )
  sectionHeadings.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 4. Animate Subtitles, Leads, Descriptions, and Paragraphs
  const paragraphs = document.querySelectorAll(
    'section p:not(.hero-sublead-text), .section-subtext, .chapter-lead, .story-card-text, .pillar-desc, .stage-desc, .audit-desc, .pathway-desc, .comparison-text, .audience-card-desc, .footer-desc'
  )
  paragraphs.forEach((p) => {
    gsap.fromTo(
      p,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: p,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 5. Animate Card Titles (h3, h4) across all chapters
  const cardTitles = document.querySelectorAll(
    '.story-card-title, .pathway-title, .comparison-title, .pillar-title, .card-title, .stage-title, .audit-title, .audience-card-title, .col-title'
  )
  cardTitles.forEach((t) => {
    gsap.fromTo(
      t,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: t,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 6. Staggered Entrance for ALL Grid Cards
  const cardGrids = document.querySelectorAll(
    '.showroom-grid, .story-cards-grid, .pillars-grid, .comparison-grid, .workflow-timeline-grid, .compliance-cards-grid, .audience-tabs-bar, .category-pills-bar, .pathway-tabs-bar, .needs-content-grid, .estimator-calculator-box, .footer-top-grid'
  )
  cardGrids.forEach((grid) => {
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 45, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: grid,
          start: 'top 87%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 7. Staggered List Items (Comparisons, Perks, Checklists, Footer lists)
  const listContainers = document.querySelectorAll(
    '.comparison-list, .audience-perks-list, .checklist-items-wrap, .footer-list'
  )
  listContainers.forEach((list) => {
    gsap.fromTo(
      list.children,
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: list,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 8. Interactive 3D Card Hover Tilt Micro-Interactions
  const tiltCards = document.querySelectorAll(
    '.showroom-card, .story-feature-card, .pillar-card, .compliance-card, .workflow-timeline-card, .comparison-card, .pathway-showcase-card, .audience-info-card, .rfq-form-card, .price-metric-card'
  )
  tiltCards.forEach((cardEl) => {
    const card = cardEl as HTMLElement
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const rotateX = -(y / rect.height) * 6
      const rotateY = (x / rect.width) * 6

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

  // 9. Buttons & Interactive Pills Magnetic Hover
  const buttons = document.querySelectorAll(
    '.hero-cta-primary, .hero-cta-secondary, .quote-cta-pill, .cat-filter-btn, .pathway-tab-btn, .audience-tab-btn, .option-pill-btn, .rfq-submit-btn, .view-spec-btn'
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

  // 10. Subtle Ambient Breathing Animation for Status Indicators
  const floatingElements = document.querySelectorAll('.hero-eyebrow, .page-chapter, .stage-top-hud, .system-pill')
  floatingElements.forEach((el) => {
    gsap.to(el, {
      y: '-3px',
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: 'sine.inOut',
    })
  })
}

