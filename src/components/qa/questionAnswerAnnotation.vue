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
					v-model="currentQuestion"
					placeholder="Type your question here..."
					autocomplete='off'
				/>
				<input
					type="text"
					id="input-answer"
					disabled="disabled"
					v-model="currentAnswer"
					placeholder="Select your answer..."
				/>
				<input
					type="submit"
					id="submit-button"
					value="Ajoute"
					@click="saveAnnotation"
				/>
			</div>
		</div>

		<question-table v-if="isAnyAnnotationAdded" />
		<input
			v-if="isAnyAnnotationAdded"
			type="submit"
			id="export-button"
			value="Export"
			@click="exportAnnotation"
		/>
	</div>
</template>

<script>
import qaSidebar from "./qaSidebar.vue";
import qaLoadFile from "./qaLoadFile.vue";
import questionTable from "./questionTable.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
	name: "qaAnnotation",
	components: {
		qaSidebar,
		qaLoadFile,
		questionTable,
	},
	data: function () {
		return {
			currentQuestion: "",
			currentAnswer: "",
			currentAnswerStartIndex: null,
			currentAnswerEndIndex: null,
		};
	},
	computed: {
		...mapState("qa", ["counterId"]),
		...mapGetters("qa", [
			"isInputReceived",
			"isAnyAnnotationAdded",
			"getInputText",
			"getCurrentQuestion",
		]),
	},
	methods: {
		...mapMutations("qa", ["addAnnotation", "exportAnnotation"]),
		selectAnswer() {
			let selection = document.getSelection();

			if (selection.anchorOffset === selection.focusOffset) return;
			else if (this.currentQuestion.length === 0) {
				alert("You didn't write any question to start.");
				selection.empty();
				return;
			}

			// Get the first, end index of the text chosen by user
			let startIndex = selection.anchorOffset;
			let endIndex = selection.focusOffset;

			let userAnswer = this.getInputText.substring(startIndex, endIndex);
			this.currentAnswer = userAnswer;
			this.currentAnswerStartIndex = startIndex;
			this.currentAnswerEndIndex = endIndex;
		},
		initializeData() {
			// to initialize the data
			this.currentQuestion = "";
			this.currentAnswer = "";
			this.currentAnswerStartIndex = "";
			this.currentAnswerEndIndex = "";
		},
		saveAnnotation() {
			let questionInfo = {
				id: this.counterId,
				question: this.currentQuestion,
				answer: this.currentAnswer,
				answerStartIndex: this.currentAnswerStartIndex,
				answerEndIndex: this.currentAnswerEndIndex
			};
			this.addAnnotation(questionInfo);

			// to initialize the data
			this.initializeData();
		},
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

#export-button {
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
	font-weight: bold;
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
