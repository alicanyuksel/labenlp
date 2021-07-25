<template>
	<div class="qaAnnotation">
		<qa-sidebar />
		<p v-if="!isInputReceived">
			This is a tool to annotate your Q&#38;A models.
		</p>
		<qa-load-file v-if="!isInputReceived"> </qa-load-file>

		<div class="card" v-if="isInputReceived">
			<div class="card-header">Your text</div>
			<div class="card-body" @mouseup="selectAnswer">
				<p>{{ getInputText }}</p>
			</div>
		</div>

		<div class="card" v-if="isInputReceived">
			<div id="input-question-answer-box" class="card-header">
				<input
					type="text"
					id="input-question"
					v-model="question"
					placeholder="Type your question here..."
				/>
				<input
					type="text"
					id="input-answer"
					disabled="disabled"
					value=""
					placeholder="Select your answer..."
				/>
				<input
					type="submit"
					id="submit-button"
					value="Ajoute"
					@click="saveQuestion"
				/>
			</div>
			<div
				class="card-body"
				v-if="isAnyQuestionAdded == true && getNumberOfClasses > 0"
			>
				<class-block />
			</div>
		</div>
	</div>
</template>

<script>
import qaSidebar from "./qaSidebar.vue";
import qaLoadFile from "./qaLoadFile.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "qaAnnotation",
	components: {
		qaSidebar,
		qaLoadFile,
	},
	data: function () {
		return {
			question: '',
		}
	},
	computed: {
		...mapGetters("qa", [
			"isInputReceived",
			"isAnyQuestionAdded",
			"getInputText",
			"getCurrentQuestion"
		]),
	},
	methods: {
		...mapMutations("qa", ["addQuestion"]),
		saveQuestion() {
			let input = document.getElementById("input-question").value;
			let questionInfo = {
				question: input,
				answer: null,
			};
			this.addQuestion(questionInfo);

			// to initialize the input
			document.getElementById("input-question").value = "";
		},
		selectAnswer() {
			let selection = document.getSelection();
			
			// Get the first, end index of the text chosen by user
			let startIndex = selection.anchorOffset;
			let endIndex = selection.focusOffset;

			if (selection.anchorOffset === selection.focusOffset) return;
			else if (this.question.length === 0) {
				alert("You didn't write any question to start.");
				selection.empty();
				return;
			}

			let userAnswer = this.getInputText.substring(startIndex, endIndex)
			document.getElementById("input-answer").value = userAnswer;
			
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qaAnnotation {
	position: absolute;
	left: 20%;
	width: 70%;
	height: 100%;
}

input#input-question {
	padding-left: 12px;
	width: 100%;
	text-decoration: none;
}

input#input-answer {
	margin-top: 8px;
	padding-left: 12px;
	width: 100%;
}

#input-question-answer-box {
	background: transparent;
}

#submit-button {
	margin-top: 8px;
	margin-left: 10px;
	background-color: rgb(228, 180, 103);
	border-style: none;
	color: black;
	border-radius: 8px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
	cursor: pointer;
}

#footer-button {
	text-decoration: none;
	margin-left: 10px;
	background-color: rgb(228, 180, 103);
	padding: 4px;
	border-style: none;
	color: black;
	font-size: 13px;
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
