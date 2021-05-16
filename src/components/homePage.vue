<template>
	<div class="hello">
		<img id="logo" alt="Annotation logo" src="../assets/labenlp_logo.png">
		<h1>{{ msg }}</h1>
		<p>Please choose for which task you want to make your annotations</p>
		<router-link to="/ner">NER Annotation</router-link>
		<router-link to="/question-answer">Q&#38;A Annotation</router-link>
	</div>
</template>

<script>
export default {
	name: "HomePage",
	props: {
		msg: String,
	},
};
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
a {
	text-decoration: none;
	background-color: rgb(177, 114, 20);
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
