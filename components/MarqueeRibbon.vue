<template>
  <div class="nitex-marquee-ribbon font-mono">
    <div class="marquee-track">
      <div class="marquee-content" v-for="n in 3" :key="n" aria-hidden="true">
        <span class="ribbon-item">CLO3D DIGITAL SAMPLING</span>
        <span class="ribbon-star">★</span>
        <span class="ribbon-item">DIRECT MILL TEXTILES</span>
        <span class="ribbon-star">★</span>
        <span class="ribbon-item">ZERO DEADSTOCK WASTE</span>
        <span class="ribbon-star">★</span>
        <span class="ribbon-item">RADICAL BDT TRANSPARENCY</span>
        <span class="ribbon-star">★</span>
        <span class="ribbon-item">AQL 2.5 CERTIFIED PROTOCOL</span>
        <span class="ribbon-star">★</span>
        <span class="ribbon-item">NEON POSTGRESQL ENGINE</span>
        <span class="ribbon-star">★</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nitex-marquee-ribbon {
  width: 100%;
  background: #d4ff00;
  color: #0a0b0d;
  padding: 0.85rem 0;
  overflow: hidden;
  user-select: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.marquee-track {
  display: flex;
  width: fit-content;
  animation: marqueeScroll 25s linear infinite;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-right: 2rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.ribbon-star {
  font-size: 0.95rem;
  color: rgba(10, 11, 13, 0.4);
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}
</style>
