import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import nerAnnotation from './components/ner/nerAnnotation.vue'
import questionAnswerAnnotation from './components/qa/questionAnswerAnnotation.vue'
import homePage from './components/homePage.vue'

import { store } from "./store";

Vue.use(VueRouter)

const routes = [
    { path: "/", component: homePage },
    { path: "/ner", component: nerAnnotation },
    { path: "/question-answer", component: questionAnswerAnnotation }
  ]

const router = new VueRouter({
  mode: "history",
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')