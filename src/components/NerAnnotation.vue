<template>
	<div class="nerAnnotation">
		<navigation-bar/>
		<p>This is a tool to annotate your NER models.</p>
		<load-text-file />
		<br />
	</div>
</template>

<script>
import loadTextFile from "./loadTextFile";
import navigationBar from "./navigationBar.vue"

export default {
	name: "NerAnnotation",
	components: {
		loadTextFile,
		navigationBar
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nerAnnotation {
	margin-left: 10%;
}

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
	text-decoration: none;
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
