<template>
	<div class="file-upload">
		<input
			class="file-input"
			type="file"
			name="textfile"
			accept=".txt"
			@change="readFile"
		/>
	</div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	name: "loadTextFile",
	methods: {
		...mapMutations(["saveInputSentence", "isInputReceived"]),
		readFile(e) {
			let files = e.target.files;
			if (!files.length) return;
			let reader = new FileReader();
			reader.addEventListener("load", (event) => {
				this.saveInputSentence({
					value: event.target.result
				});
				this.isInputReceived({
					value: true
				});
			});
			reader.readAsText(files[0]);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file-upload {
	position: relative;
}

input.file-input {
	text-decoration: none;
	background-color: white;
	color: black;
	padding: 15px 32px;
	text-align: center;
	font-size: 15px;
	border-radius: 8px;
	border-style: dashed;
	border-color: rgb(177, 114, 20);
	cursor: pointer;
}

h3 {
	margin: 40px 0 0;
}
</style>
