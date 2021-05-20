<template>
	<div class="nerAnnotation">
		<ner-sidebar />
		<p v-if="inputReceived == false">
			This is a tool to annotate your NER models.
		</p>
		<load-text-file v-if="inputReceived == false"> </load-text-file>

		<div class="card" v-if="inputReceived == true">
			<div id="input-classes" class="card-header">
				Add your classes
				<input type="text" id="inputClasse" value=""/>
				<input type="submit" value="Ajoute" @click="saveClasse"/>
			</div>
			<div class="card-body">
				<p class="card-text" v-if="anyClasseAdded == true">{{ getAllClasses }}</p>
			</div>
		</div>

		<div class="card" v-if="inputReceived == true">
			<div class="card-header">Your input</div>
			<div class="card-body">
				<p class="card-text">{{ getInputText }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import loadTextFile from "./loadTextFile.vue";
import nerSidebar from "./nerSidebar.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
	name: "nerAnnotation",
	components: {
		loadTextFile,
		nerSidebar,
	},
	computed: {
		...mapState(["inputText", "inputReceived", "allClasses","anyClasseAdded"]),
		...mapGetters(["getInputText", "getAllClasses"]),
	},
	methods: {
		...mapMutations(["addClasse"]),
		saveClasse() {
			var input = document.getElementById("inputClasse").value;
			this.addClasse({value:input});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nerAnnotation {
	position: absolute;
	left: 20%;
	width: 70%;
	height: 100%;
}

#input-classes {
	background: transparent;
}

.card-text {
	font-size: 20px;
}

.card-header {
	background: rgb(250, 210, 146);
}

.card {
	border-color: rgb(177, 114, 20);
	margin-bottom: 15px;
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
table,
th,
td {
	border: 1px solid black;
}
</style>
