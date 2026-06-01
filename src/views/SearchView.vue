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
        <div class="search-input-wrap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="search-icon">
            <circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
            <path d="M10.5 10.5L14 14" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            placeholder="キーワードで検索..."
            class="search-input"
            @input="onInput"
          />
          <button v-if="query" @click="query = ''" class="clear-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Results -->
    <div class="results-wrapper">
      <!-- Empty state -->
      <div v-if="!query" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="22" cy="22" r="14" stroke="#C0D0E0" stroke-width="2.5"/>
            <path d="M32 32L42 42" stroke="#C0D0E0" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="empty-title">キーワードを入力してください</p>
        <p class="empty-sub">記事タイトルや内容から検索できます</p>
      </div>

      <!-- No results -->
      <div v-else-if="results.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="22" cy="22" r="14" stroke="#C0D0E0" stroke-width="2.5"/>
            <path d="M32 32L42 42" stroke="#C0D0E0" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M17 22H27M22 17V27" stroke="#C0D0E0" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="empty-title">「{{ query }}」の検索結果はありません</p>
        <p class="empty-sub">別のキーワードをお試しください</p>
      </div>

      <!-- Results list -->
      <div v-else>
        <div class="results-header">
          <span class="results-count">{{ results.length }}件の結果</span>
        </div>
        <div class="results-list">
          <RouterLink
            v-for="result in results"
            :key="`${result.categoryId}-${result.id}`"
            :to="`/article/${result.categoryId}/${result.id}`"
            class="result-item"
          >
            <div class="result-cat">{{ result.categoryTitle }}</div>
            <div class="result-title" v-html="highlightText(result.title)"></div>
            <div class="result-snippet" v-if="result.snippet" v-html="result.snippet"></div>
            <svg class="result-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#8FA8C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { categories } from '../data/categories.js'

const query = ref('')
const inputRef = ref(null)

onMounted(() => {
  inputRef.value?.focus()
})

function onInput() {
  // reactive via v-model
}

// Build flat list of all articles
const allArticles = categories.flatMap(cat =>
  cat.articles.map(art => ({
    ...art,
    categoryId: cat.id,
    categoryTitle: cat.title,
  }))
)

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return allArticles.filter(art => {
    return (
      art.title.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.categoryTitle.toLowerCase().includes(q)
    )
  }).map(art => {
    // Extract snippet from content
    const contentLower = art.content.toLowerCase()
    const idx = contentLower.indexOf(q)
    let snippet = ''
    if (idx !== -1) {
      const start = Math.max(0, idx - 30)
      const end = Math.min(art.content.length, idx + q.length + 60)
      snippet = (start > 0 ? '...' : '') + art.content.slice(start, end).replace(/[#*`]/g, '') + (end < art.content.length ? '...' : '')
    }
    return { ...art, snippet }
  })
})

function highlightText(text) {
  const q = query.value.trim()
  if (!q) return text
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
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
  gap: 10px;
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

.search-input-wrap {
  flex: 1;
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font);
}

.search-input::placeholder {
  color: rgba(255,255,255,0.6);
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

.clear-btn {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.results-wrapper {
  width: 100%;
  padding: 16px;
  padding-bottom: calc(16px + var(--safe-bottom));
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.empty-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.results-header {
  margin-bottom: 12px;
}

.results-count {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  background: var(--card-bg);
  border-radius: var(--radius-card);
  padding: 12px 14px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  gap: 3px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.result-cat {
  grid-column: 1;
  font-size: 0.72rem;
  color: var(--accent);
  font-weight: 600;
}

.result-title {
  grid-column: 1;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.result-snippet {
  grid-column: 1;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-arrow {
  grid-column: 2;
  grid-row: 1 / 4;
  align-self: center;
  margin-left: 8px;
}

:deep(mark) {
  background: #FFF3CD;
  color: var(--text-primary);
  padding: 0 2px;
  border-radius: 2px;
}
</style>
