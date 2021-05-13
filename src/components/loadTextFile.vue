<template>
	<div class="file-upload">
		<input
			class="file-input"
			type="file"
			name="textfile"
			accept=".txt"
			@change="onFileSelected"
		/>
	</div>
</template>

<script>
export default {
	name: "loadTextFile",
	emits: ["file-loaded"],

	data() {
		return {
			textReceived: false
		}
	},
	methods: {
		onFileSelected(e) {
			let files = e.target.files;
			if (!files.length) return;

			var fileReader = new FileReader();
			fileReader.onload = function (fileLoadedEvent) {
				let text = fileLoadedEvent.target.result;
				console.log(text);
			};

			console.log(fileReader.readAsText(files[0], "UTF-8"));
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
	background-color:silver;
	color: black;
	padding: 15px 32px;
	text-align: center;
	font-size: 15px;
	border-radius: 8px;
	border-style: dashed;
	border-color:orangered;
	cursor: pointer;
	
}



h3 {
	margin: 40px 0 0;
}
</style>
