<template>
	<div class="nerAnnotation">
		<ner-sidebar />
		<p v-if="inputReceived == false">
			This is a tool to annotate your NER models.
		</p>
		<load-text-file v-if="inputReceived == false"> </load-text-file>

		<div class="card" v-if="inputReceived == true">
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
				<span
					class="tag"
					v-for="label in allClassesInfos"
					:key="label.id"
					@click="setCurrentClass(label)"
				>
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
				<token-block/>
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
			"inputReceived",
			"allClassesInfos",
			"anyClasseAdded",
			"allTokenNames",
			"allTokenDetails",
			"currentClass",
			"counterIdToken",
			"someColors",
		]),
		...mapGetters(["getInputText", "getNumberOfClasses"]),
	},
	methods: {
		...mapMutations(["addClass", "setCurrentClass", "saveTokenLabeled"]),
		saveClass() {
			var input = document.getElementById("input-class").value;
			this.addClass({
				name: input.toUpperCase(),
				color: this.someColors[
					this.allClassesInfos.length % this.someColors.length
				],
			});

			// to initialize the input
			document.getElementById("input-class").value = "";
		},
		deneme() {
			let selection = document.getSelection();
			let token, startIndex, endIndex;

			token = selection.toString();
			startIndex = parseInt(selection.anchorOffset);
			endIndex = parseInt(selection.focusOffset);

			if (startIndex === endIndex || token === " ") return;

			let data = {
				tokenId: this.counterIdToken,
				token: token,
				startIndex: startIndex,
				endIndex: endIndex,
			};

			console.log(data);

			this.saveTokenLabeled(data);
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
