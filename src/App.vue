<template>
  <div id="app">
    <img id="logo" alt="Annotation logo" src="./assets/logo_annotation.png">
    <HomePage v-if="currentPage === 'home'" msg="Welcome to NLP annotation tool" @ner-button-clicked="nerButtonStatus"/>
    <NerAnnotation v-if="currentPage === 'NerAnnotation'"/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import NerAnnotation from './components/NerAnnotation.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    NerAnnotation
  },
  data() {
    return {
      currentPage: "home"
    }
  },
  methods: {
    nerButtonStatus() {
      this.currentPage = "NerAnnotation"
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  width: 150px;
  height: 150px;
}
</style>
