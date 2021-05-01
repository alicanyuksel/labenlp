<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Please choose for which task you want to make your annotations
    </p>
    <button id="button" @click="nerButtonClicked">NER Annotation</button>
    <button id="button" @click="qaButtonClicked">Q&#38;A Annotation</button>
    
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  data() {
    return {
      isNerButtonClicked: false,
      isQaButtonClicked: false
    }
  },
  methods: {
    nerButtonClicked() {
      this.isNerButtonClicked = true
      console.log("Tıklandı NER")
    },
    qaButtonClicked() {
      this.isQaButtonClicked = true
      console.log("Tıklandı QA")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button { 
  background-color: #f44336;
  margin-left: 5px;
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;

}
</style>
