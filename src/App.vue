<template>
  <div id="app">
    <img id="logo" alt="Annotation logo" src="./assets/logo_annotation.png">
    <home-page 
    v-if="currentPage === 'home'"
    msg="Welcome to NLP annotation tool" 
    @ner-button-clicked="nerButtonStatus" 
    @qa-button-clicked="qaButtonStatus"
    />
    
    <ner-annotation v-if="currentPage === 'NerAnnotation'"/>
    <qa-annotation v-if="currentPage === 'QaAnnotation'"/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import NerAnnotation from './components/NerAnnotation.vue'
import QaAnnotation from './components/QuestionAnswerAnnotation.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    NerAnnotation,
    QaAnnotation
  },
  data() {
    return {
      currentPage: "home"
    }
  },
  methods: {
    nerButtonStatus() {
      this.currentPage = "NerAnnotation"
    },
    qaButtonStatus () {
      this.currentPage = "QaAnnotation"
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
