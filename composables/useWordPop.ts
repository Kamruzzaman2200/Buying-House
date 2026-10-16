import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export function splitElementIntoWords(element: HTMLElement): HTMLElement[] {
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

export function initWordPopAnimations(scope: HTMLElement | Document = document) {
  if (typeof window === 'undefined') return

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }

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

  // Hero section words pop
  const heroNarrative = document.querySelector('.hero-narrative-col')
  if (heroNarrative) {
    const heroTitleWords = heroNarrative.querySelectorAll('.hero-editorial-h1 .word-pop')
    if (heroTitleWords.length > 0) {
      gsap.fromTo(
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
          delay: 0.15,
          clearProps: 'opacity,scale,y,rotateZ',
        }
      )
    }

    const heroSubleadWords = heroNarrative.querySelectorAll('.hero-sublead-text .word-pop')
    if (heroSubleadWords.length > 0) {
      gsap.fromTo(
        heroSubleadWords,
        { opacity: 0, scale: 0.75, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.012,
          ease: 'back.out(1.8)',
          delay: 0.35,
          clearProps: 'opacity,scale,y',
        }
      )
    }
  }
}

export function useWordPop() {
  return {
    initWordPopAnimations,
    splitElementIntoWords,
  }
}
