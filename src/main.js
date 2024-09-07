import './assets/main.css'
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  const router = createRouter()
  app.use(router)

  const preFetchedData = {}

  const addPreFetchedData = ({ key, newVal }) => {
    preFetchedData[key] = newVal
  }

  app.provide('addPreFetchedData', addPreFetchedData)

  return { app, router, preFetchedData }
}
