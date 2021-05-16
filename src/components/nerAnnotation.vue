<template>
	<div class="nerAnnotation">
		<ner-sidebar />
		<p v-if="inputReceived == false">
			This is a tool to annotate your NER models.
		</p>
		<load-text-file v-if="inputReceived == false"> </load-text-file>
		<h1>{{ getInputText }}</h1>
		<br />
	</div>
</template>

<script>
import loadTextFile from "./loadTextFile.vue";
import nerSidebar from "./nerSidebar.vue";
import { mapState, mapGetters } from "vuex";

export default {
	name: "NerAnnotation",
	components: {
		loadTextFile,
		nerSidebar,
	},
	computed: {
		...mapState(["inputText", "inputReceived"]),
		...mapGetters(["getInputText"])
	},


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nerAnnotation {
	position: relative;
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

</style>
