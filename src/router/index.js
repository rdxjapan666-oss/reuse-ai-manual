import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ArticleView from '../views/ArticleView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/category/:id', component: CategoryView },
  { path: '/article/:categoryId/:articleId', component: ArticleView },
  { path: '/search', component: SearchView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
