<template>
	<div class="nerAnnotation">
		<ner-sidebar />
		<p v-if="!isInputReceived">
			This is a tool to annotate your NER models.
		</p>
		<load-text-file v-if="!isInputReceived"> </load-text-file>

		<div class="card" v-if="isInputReceived">
			<div id="input-classes" class="card-header">
				Add your labels :
				<input type="text" id="input-class" value="" />
				<input
					type="submit"
					id="submit-button"
					value="Ajoute"
					@click="saveClass"
				/>
			</div>
			<div
				class="card-body"
				v-if="anyClasseAdded == true && getNumberOfClasses > 0"
			>
				<class-block />
			</div>
		</div>

		<div class="card" v-if="isInputReceived">
			<div class="card-header">Your input</div>
			<div class="card-body">
				<token-block
					v-for="token in allTokenDetails"
					:key="token.id"
					:tokenId="token.startIndex"
					:label="token.label"
					:token="token.token"
					:bgColor="token.bgColor"
					:type="token.type"
					:isActive="token.isActive"
					:tokenBlockId="token.type === 'tokenBlock' ? token.tokenBlockId : null"
					:tokensSelectedForBlock="token.type === 'tokenBlock' ? token.tokensSelectedForBlock : null"
				></token-block>
			</div>
		</div>
	</div>
</template>

<script>
import loadTextFile from "./loadTextFile.vue";
import nerSidebar from "./nerSidebar.vue";
import classBlock from "./classBlock.vue";
import tokenBlock from "./tokenBlock.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
	name: "nerAnnotation",
	components: {
		loadTextFile,
		nerSidebar,
		classBlock,
		tokenBlock,
	},
	computed: {
		...mapState([
			"allClassesInfos",
			"anyClasseAdded",
			"allTokenDetails",
			"currentClass",
			"allTokensIdsSelected",
			"someColors",
		]),
		...mapGetters([
			"isInputReceived",
			"getInputText",
			"getNumberOfClasses",
			"getCurrentClass",
		]),
	},
	created() {
		document.addEventListener("mouseup", this.selectTokens);
	},
	methods: {
		...mapMutations(["addClass", "setCurrentClass","saveToken","saveTokenBlock"]),
		saveClass() {
			let input = document.getElementById("input-class").value;
			let classInfo = {
				name: input.toUpperCase(),
				color: this.someColors[
					this.allClassesInfos.length % this.someColors.length
				],
			};
			this.addClass(classInfo);

			// to initialize the input
			document.getElementById("input-class").value = "";
		},
		selectTokens() {
			let selection = document.getSelection();

			if (selection.anchorOffset === selection.focusOffset) return;
			else if (Object.keys(this.getCurrentClass).length === 0) {
				alert("You didn't choose any tag to start.");
				selection.empty();
				return;
			}

			var startIndexSelected = parseInt(
				selection.anchorNode.parentElement.id
			);
			var endIndexSelected = parseInt(
				selection.focusNode.parentElement.id
			);

			// check if the user clicks the right place
			if (isNaN(startIndexSelected)) return;
		
			if (startIndexSelected === endIndexSelected) {
				// if startIndex and endIndex are the same, that means the user selected only one token
				// we send it to our function to save it in our objects array
				this.saveToken([startIndexSelected]);
				selection.empty();

			} else {
				this.saveTokenBlock([startIndexSelected, endIndexSelected]);
				selection.empty();
			}
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

#submit-button {
	margin-left: 10px;
	background-color: rgb(228, 180, 103);
	border-style:none;
	color: black;
	border-radius: 8px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  	cursor: pointer;
}

.card-text {
	font-size: 20px;
}

.card-header {
	background: rgb(228, 180, 103);
}

.card {
	border-color: rgb(177, 114, 20);
	margin-bottom: 15px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

li {
	display: inline-block;
	margin: 0 10px;
}
</style>
