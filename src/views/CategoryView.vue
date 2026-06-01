<template>
  <div class="page-wrapper">
    <!-- Header -->
    <header class="page-header">
      <div class="header-inner">
        <RouterLink to="/" class="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
        <div class="header-title">{{ category?.title }}</div>
        <RouterLink to="/search" class="search-btn-sm">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.5"/>
            <path d="M12.5 12.5L16 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </RouterLink>
      </div>
    </header>

    <!-- Category hero -->
    <div class="cat-hero" v-if="category">
      <div class="cat-hero-icon" :class="`icon-${category.iconType}`">
        <component :is="getIcon(category.iconType)" />
      </div>
      <div class="cat-hero-info">
        <h1 class="cat-hero-title">{{ category.title }}</h1>
        <p class="cat-hero-desc">{{ category.desc }}</p>
        <span class="cat-hero-count">{{ category.count }}件の記事</span>
      </div>
    </div>

    <!-- Articles list -->
    <div class="articles-section" v-if="category">
      <div class="section-header">
        <h2 class="section-title">記事一覧</h2>
      </div>
      <div class="articles-list">
        <RouterLink
          v-for="(article, idx) in category.articles"
          :key="article.id"
          :to="`/article/${category.id}/${article.id}`"
          class="article-item"
        >
          <div class="article-num">{{ idx + 1 }}</div>
          <div class="article-title">{{ article.title }}</div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#8FA8C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="not-found">
      <p>カテゴリが見つかりませんでした。</p>
      <RouterLink to="/" class="back-link">ホームに戻る</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { categories } from '../data/categories.js'

const route = useRoute()
const category = computed(() => categories.find(c => c.id === route.params.id))

const icons = {
  clock: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M11 7V11L14 13', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  listing: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 2, y: 6, width: 18, height: 14, rx: 2.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('circle', { cx: 11, cy: 13, r: 3.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 6V5C7 4.4 7.4 4 8 4H14C14.6 4 15 4.4 15 5V6', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  products: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 3, y: 3, width: 16, height: 16, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 8H15M7 11H15M7 14H11', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  orders: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('rect', { x: 3, y: 2, width: 16, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M7 7H15M7 11H15M7 15H11', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('path', { d: 'M14 14L16 16L19 12', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  platforms: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M2 11H20M11 2C8.5 5 7 8 7 11C7 14 8.5 17 11 20M11 2C13.5 5 15 8 15 11C15 14 13.5 17 11 20', stroke: 'currentColor', 'stroke-width': 1.5 })
  ]),
  inventory: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('path', { d: 'M11 2L20 7V15L11 20L2 15V7L11 2Z', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
    h('path', { d: 'M11 2V20M2 7L11 12L20 7', stroke: 'currentColor', 'stroke-width': 1.5 })
  ]),
  points: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M11 6V11L14 14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('path', { d: 'M8 16H14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
  ]),
  faq: () => h('svg', { width: 24, height: 24, viewBox: '0 0 22 22', fill: 'none' }, [
    h('circle', { cx: 11, cy: 11, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
    h('path', { d: 'M9 9C9 7.9 9.9 7 11 7C12.1 7 13 7.9 13 9C13 10.1 11 11 11 12', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    h('circle', { cx: 11, cy: 15, r: 0.8, fill: 'currentColor' })
  ])
}

function getIcon(type) {
  return icons[type] || icons.clock
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  width: 100%;
  background: var(--bg);
  overflow-x: hidden;
}

.page-header {
  background: linear-gradient(160deg, #1565D8 0%, #2979FF 100%);
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: var(--safe-top);
}

.header-inner {
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-title {
  flex: 1;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.search-btn-sm {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cat-hero {
  background: linear-gradient(160deg, #1565D8 0%, #2979FF 100%);
  padding: 16px 16px 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.cat-hero-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255,255,255,0.2);
  color: white;
}

.cat-hero-info {
  flex: 1;
}

.cat-hero-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.cat-hero-desc {
  color: rgba(255,255,255,0.8);
  font-size: 0.82rem;
  margin-bottom: 6px;
}

.cat-hero-count {
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 10px;
}

.articles-section {
  width: 100%;
  padding: 20px 16px 32px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-item {
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

.article-item:active {
  transform: scale(0.98);
}

.article-num {
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, var(--primary), var(--primary-end));
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.article-title {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.back-link {
  display: inline-block;
  margin-top: 12px;
  color: var(--primary);
  font-size: 0.9rem;
}
</style>
