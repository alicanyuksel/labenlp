import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import NerAnnotation from './components/NerAnnotation.vue'
import QuestionAnswerAnnotation from './components/QuestionAnswerAnnotation.vue'
import HomePage from './components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
    { path: "/", component: HomePage },
    { path: "/ner", component: NerAnnotation },
    { path: "/question-answer", component: QuestionAnswerAnnotation }
  ]

const router = new VueRouter({
  mode: "history",
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')