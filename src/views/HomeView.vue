<template>
  <div class="home-wrapper">
    <!-- Header -->
    <header class="home-header">
      <div class="header-inner">
        <button type="button" class="back-btn" @click="goHome" aria-label="Go Back">
          <svg width="19" height="19" viewBox="0 0 22 22" fill="none">
            <path d="M13 5L6.5 11L13 17" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="logo-area">
          <div>
            <div class="logo-title">Reuse AI</div>
            <div class="logo-sub">ヘルプセンター</div>
          </div>
          <div class="logo-icon" @click="goHome">
            <img src="./icon_logo.png" alt="Reuse AI logo" class="logo-image">
          </div>
        </div>
      </div>
    </header>

    <!-- Hero search -->
    <div class="hero-section">
      <h1 class="hero-title">何をお探しですか？</h1>
      <RouterLink to="/search" class="hero-search-box">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="11.5" cy="11.5" r="6.8" stroke="#8AA0B7" stroke-width="2.2"/>
          <path d="M16.5 16.5L22 22" stroke="#8AA0B7" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
        <span class="search-placeholder">キーワードで検索...</span>
      </RouterLink>
    </div>
            
    <!-- Categories -->
    <div class="categories-section">
      <div class="section-header">
        <h2 class="section-title">カテゴリ一覧</h2>
        <span class="section-count">{{ categories.length }} カテゴリ</span>
      </div>
      <div class="categories-grid">
        <RouterLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/category/${cat.id}`"
          class="category-card"
        >
          <div class="cat-icon-wrap" :class="`icon-${cat.iconType}`">
            <component :is="getIcon(cat.iconType)" />
          </div>
          <div class="cat-info">
            <div class="cat-title">{{ cat.title }}</div>
            <div class="cat-desc">{{ cat.desc }}</div>
          </div>
          <div class="cat-meta">
            <span class="cat-count">{{ cat.count }}件</span>
            <svg class="cat-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#8FA8C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- Popular articles -->
    <div class="popular-section">
      <div class="section-header">
        <h2 class="section-title">よく読まれる記事</h2>
      </div>
      <div class="popular-list">
        <RouterLink
          v-for="art in popularArticles"
          :key="art.id"
          :to="`/article/${art.categoryId}/${art.id}`"
          class="popular-item"
        >
          <div class="popular-badge">人気</div>
          <div class="popular-text">
            <div class="popular-cat">{{ art.categoryTitle }}</div>
            <div class="popular-title">{{ art.title }}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#8FA8C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="home-footer">
      <div class="footer-logo">Reuse AI ヘルプセンター</div>
      <div class="footer-note">© 2025 Reuse AI. All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { categories } from '../data/categories.js'

const router = useRouter()

const icons = {
  clock: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M11 7V11L14 13', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  listing: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 2, y: 6, width: 18, height: 14, rx: 2.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('circle', { cx: 11, cy: 13, r: 3.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 6V5C7 4.4 7.4 4 8 4H14C14.6 4 15 4.4 15 5V6', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  products: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 3, y: 3, width: 16, height: 16, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 8H15M7 11H15M7 14H11', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  orders: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 3, y: 2, width: 16, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 7H15M7 11H15M7 15H11', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('path', { d: 'M14 14L16 16L19 12', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  platforms: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M2 11H20M11 2C8.5 5 7 8 7 11C7 14 8.5 17 11 20M11 2C13.5 5 15 8 15 11C15 14 13.5 17 11 20', stroke: 'currentColor', 'stroke-width': 1.5 })
  ]),
  inventory: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('path', { d: 'M11 2L20 7V15L11 20L2 15V7L11 2Z', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
    h('path', { d: 'M11 2V20M2 7L11 12L20 7', stroke: 'currentColor', 'stroke-width': 1.5 })
  ]),
  points: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M11 6V11L14 14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('path', { d: 'M8 16H14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  faq: () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M9 9C9 7.9 9.9 7 11 7C12.1 7 13 7.9 13 9C13 10.1 11 11 11 12', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('circle', { cx: 11, cy: 15, r: 0.8, fill: 'currentColor' })
  ])
}

function getIcon(type) {
  return icons[type] || icons.clock
}

function postToNative(message) {
  const bridge = window?.webkit?.messageHandlers?.nativeBridge
  if (!bridge?.postMessage) return false
  bridge.postMessage(message)
  return true
}

function goBack() {
  if (postToNative('goBack')) return
  router.back()
}

function goHome() {
  if (postToNative('goHome')) return
  router.push('/')
}

const popularArticles = computed(() => {
  const picks = [
    { categoryId: 'getting-started', articleId: 'gs-1' },
    { categoryId: 'listing', articleId: 'ls-1' },
    { categoryId: 'points', articleId: 'pt-1' },
    { categoryId: 'platforms', articleId: 'pl-1' },
    { categoryId: 'orders', articleId: 'or-2' },
  ]
  return picks.map(p => {
    const cat = categories.find(c => c.id === p.categoryId)
    const art = cat?.articles.find(a => a.id === p.articleId)
    return { ...art, categoryId: p.categoryId, categoryTitle: cat?.title }
  }).filter(Boolean)
})
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  width: 100%;
  background: var(--bg);
  overflow-x: hidden;
}

.home-header {
  background: linear-gradient(135deg, #145fcf 0%, #2f79f6 55%, #3982ff 100%);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  /* Safe area for notch */
  padding-top: var(--safe-top);
}

.header-inner {
  width: 100%;
  padding: 12px 16px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #f3f7ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-title {
  color: white;
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: right;
}

.logo-sub {
  color: rgba(255,255,255,0.88);
  font-size: 0.5rem;
  font-weight: 600;
  text-align: right;
  margin-top: 2px;
  letter-spacing: 0.01em;
}

.hero-section {
  background: linear-gradient(135deg, #145fcf 0%, #2f79f6 55%, #3982ff 100%);
  padding: 14px 16px 24px;
}

.hero-title {
  color: white;
  font-size: clamp(1.72rem, 7.2vw, 2.02rem);
  font-weight: 700;
  text-align: center;
  line-height: 1.18;
  margin-bottom: 14px;
}

.hero-search-box {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f2f3f5;
  border-radius: 19px;
  padding: 12px 18px;
  box-shadow: 0 6px 18px rgba(13, 44, 98, 0.18);
}

.search-placeholder {
  color: #8aa0b7;
  font-size: 0.74rem;
  font-weight: 700;
}

.categories-section,
.popular-section {
  width: 100%;
  padding: 20px 16px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section-count {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-card {
  background: var(--card-bg);
  border-radius: var(--radius-card);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  width: 100%;
  min-width: 0;
}

.category-card:active {
  opacity: 0.85;
}

.cat-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-clock { background: #EEF3FF; color: #3A7BD5; }
.icon-listing { background: #FFF0F0; color: #E05555; }
.icon-products { background: #F0FFF4; color: #2D9E5F; }
.icon-orders { background: #FFF8E8; color: #D4860A; }
.icon-platforms { background: #F0F4FF; color: #5B6EF5; }
.icon-inventory { background: #F5F0FF; color: #8B5CF6; }
.icon-points { background: #FFF5E8; color: #E07A20; }
.icon-faq { background: #F0FAFA; color: #0E9E9E; }

.cat-info {
  flex: 1;
  min-width: 0;
}

.cat-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.cat-desc {
  font-size: 0.74rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cat-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.cat-count {
  font-size: 0.74rem;
  color: var(--text-muted);
}

.cat-arrow {
  flex-shrink: 0;
}

.popular-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.popular-item {
  background: var(--card-bg);
  border-radius: var(--radius-card);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  width: 100%;
  min-width: 0;
}

.popular-badge {
  background: linear-gradient(135deg, #FF6B35, #FF3B30);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  flex-shrink: 0;
}

.popular-text {
  flex: 1;
  min-width: 0;
}

.popular-cat {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.popular-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home-footer {
  width: 100%;
  padding: 20px 16px;
  padding-bottom: calc(20px + var(--safe-bottom));
  text-align: center;
  border-top: 1px solid var(--border);
}

.footer-logo {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.footer-note {
  font-size: 0.72rem;
  color: var(--text-muted);
}
</style>
