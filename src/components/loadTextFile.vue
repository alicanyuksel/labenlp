<template>
	<div>
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
h3 {
	margin: 40px 0 0;
}
</style>
