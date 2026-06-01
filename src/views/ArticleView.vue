<template>
  <div class="page-wrapper">
    <!-- Header -->
    <header class="page-header">
      <div class="header-inner">
        <RouterLink :to="`/category/${route.params.categoryId}`" class="back-btn">
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

    <!-- Breadcrumb -->
    <div class="breadcrumb-bar" v-if="article">
      <RouterLink to="/" class="bc-link">ホーム</RouterLink>
      <span class="bc-sep">›</span>
      <RouterLink :to="`/category/${route.params.categoryId}`" class="bc-link">{{ category?.title }}</RouterLink>
      <span class="bc-sep">›</span>
      <span class="bc-current">{{ article.title }}</span>
    </div>

    <!-- Article content -->
    <div class="article-wrapper" v-if="article">
      <div class="article-card">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-cat">{{ category?.title }}</span>
        </div>
        <div class="article-body" v-html="renderedContent"></div>
      </div>

      <!-- Navigation -->
      <div class="article-nav">
        <RouterLink
          v-if="prevArticle"
          :to="`/article/${route.params.categoryId}/${prevArticle.id}`"
          class="nav-btn nav-prev"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div>
            <div class="nav-label">前の記事</div>
            <div class="nav-title">{{ prevArticle.title }}</div>
          </div>
        </RouterLink>
        <div v-else class="nav-spacer"></div>
        <RouterLink
          v-if="nextArticle"
          :to="`/article/${route.params.categoryId}/${nextArticle.id}`"
          class="nav-btn nav-next"
        >
          <div>
            <div class="nav-label">次の記事</div>
            <div class="nav-title">{{ nextArticle.title }}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>

      <!-- Back to category -->
      <div class="back-to-cat">
        <RouterLink :to="`/category/${route.params.categoryId}`" class="back-cat-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          「{{ category?.title }}」の記事一覧に戻る
        </RouterLink>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="not-found">
      <p>記事が見つかりませんでした。</p>
      <RouterLink to="/" class="back-link">ホームに戻る</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import { categories } from '../data/categories.js'

const route = useRoute()

const category = computed(() => categories.find(c => c.id === route.params.categoryId))
const article = computed(() => category.value?.articles.find(a => a.id === route.params.articleId))

const renderedContent = computed(() => {
  if (!article.value) return ''
  return marked.parse(article.value.content)
})

const currentIndex = computed(() => {
  if (!category.value || !article.value) return -1
  return category.value.articles.findIndex(a => a.id === article.value.id)
})

const prevArticle = computed(() => {
  if (currentIndex.value <= 0) return null
  return category.value.articles[currentIndex.value - 1]
})

const nextArticle = computed(() => {
  if (!category.value || currentIndex.value < 0) return null
  if (currentIndex.value >= category.value.articles.length - 1) return null
  return category.value.articles[currentIndex.value + 1]
})
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.breadcrumb-bar {
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  overflow: hidden;
}

.bc-link {
  font-size: 0.78rem;
  color: var(--accent);
}

.bc-sep {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.bc-current {
  font-size: 0.78rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.article-wrapper {
  width: 100%;
  padding: 0 16px 32px;
  padding-bottom: calc(32px + var(--safe-bottom));
}

.article-card {
  background: var(--card-bg);
  border-radius: var(--radius-card);
  padding: 20px 16px;
  box-shadow: var(--shadow-card);
  margin-bottom: 16px;
  overflow: hidden;
  word-break: break-word;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 10px;
}

.article-meta {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-cat {
  background: linear-gradient(135deg, var(--primary), var(--primary-end));
  color: white;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 10px;
}

.article-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.nav-btn {
  flex: 1;
  background: var(--card-bg);
  border-radius: var(--radius-card);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  color: var(--text-primary);
  min-width: 0;
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
  justify-content: flex-end;
}

.nav-spacer {
  flex: 1;
}

.nav-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.nav-title {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--accent);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.back-to-cat {
  text-align: center;
}

.back-cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-size: 0.88rem;
  font-weight: 500;
  padding: 10px 20px;
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: var(--shadow-card);
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
