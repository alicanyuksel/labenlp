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
				<input type="text" id="inputClass" value="" />
				<input type="submit" value="Ajoute" @click="saveClass" />
			</div>
			<div class="card-body" v-if="anyClasseAdded == true && getNumberOfClasses > 0">
				<p>You have {{ getNumberOfClasses }} classes.</p>
				<span class="tag" v-for="label in allClassesInfos" :key="label.id" @click="setCurrentClass(label)">
					<class-block
						:idClass="label.id"
						:className="label.name"
						:bgColor="label.bgColor"
					/>
				</span>
				
			</div>
		</div>

		<div class="card" v-if="inputReceived == true">
			<div class="card-header">Your input</div>
			<div class="card-body">
				<p class="card-text" @click="deneme">{{ getInputText }}</p>
				<!-- <p v-for="token in allTokens" :key="token">{{ token }}</p> -->
				<!-- <span v-for="token in allTokens" :key="token.index" @click="deneme">
					<token-block
						:token="token"
						bgColor="red"
					></token-block>
				</span> -->
			</div>
		</div>
	</div>
</template>

<script>
import loadTextFile from "./loadTextFile.vue";
import nerSidebar from "./nerSidebar.vue";
import classBlock from "./classBlock.vue";
// import tokenBlock from "./tokenBlock.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
	name: "nerAnnotation",
	components: {
		loadTextFile,
		nerSidebar,
		classBlock,
		// tokenBlock,
	},
	computed: {
		...mapState([
			"inputReceived",
			"allClassesInfos",
			"anyClasseAdded",
			"allTokens",
			"currentClass",
			"someColors"
		]),
		...mapGetters(["getInputText", "getNumberOfClasses"]),
	},
	methods: {
		...mapMutations(["addClass", "setCurrentClass"]),
		saveClass() {
			var input = document.getElementById("inputClass").value;
			this.addClass({
				name: input.toUpperCase(),
				color: this.someColors[this.allClassesInfos.length % this.someColors.length],
			});

			// to initialize the input
			document.getElementById("inputClass").value = '';
		},
		deneme() {
			let selection = document.getSelection();
			let token, startIndex, endIndex;

			token = selection.toString();
			startIndex = parseInt(selection.anchorOffset);
			endIndex = parseInt(selection.focusOffset);

			if (startIndex === endIndex || token === " ") return;

			var tr = selection.getRangeAt(0);
            var span = document.createElement("mark");
            span.style.cssText = "background-color:#ff0000";
            tr.surroundContents(span);

			let data = {
				token: selection.toString(),
				startIndex: startIndex,
				endIndex: endIndex,
			};
			console.log(data);
		},
	},
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

li {
	display: inline-block;
	margin: 0 10px;
}
</style>
