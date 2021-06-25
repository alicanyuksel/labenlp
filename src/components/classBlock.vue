<template>
	<div>
		<div
			v-for="label in allClassesInfos"
			:key="label.id"
			class="color-box"
			:class="{ 'color-box-linked': label.id === currentClass.id }"
		>
			<span @click="setCurrentClass(label)">
				<span
					class="tag-box"
					:style="{ backgroundColor: label.bgColor }"
				></span>
				{{ label.name }}
			</span>
			<!-- <a id="is-delete" @click="deleteClassAndAnnotations(label)" -->
			<a id="is-delete" @click="deleteClassAndAnnotations(label)"
				>&#x2715;</a
			>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	name: "classBlock",
	computed: {
		...mapState(["currentClass", "allClassesInfos", "allTokenDetails"]),
	},
	methods: {
		...mapMutations([
			"deleteClass",
			"setCurrentClass",
			"removeToken",
			"removeTokenBlock",
		]),
		deleteClassAndAnnotations(label) {
			// delete the class selected
			this.deleteClass(label.id);

			// to find annotations belongs to label tag (class) and initialize them
			for (const token in this.allTokenDetails) {
				// check if token exists 
				// because the length will change while for loop 
				// once we remove the tokens tagged with the label selected
				if (this.allTokenDetails[token] !== undefined) {
					if (this.allTokenDetails[token].label === label.name) {
						if (this.allTokenDetails[token].type === "token") {
							this.removeToken([
								this.allTokenDetails[token].startIndex,
							]);
						} else if (
							this.allTokenDetails[token].type === "tokenBlock"
						) {
							this.removeTokenBlock([
								this.allTokenDetails[token].tokenBlockId,
							]);
						}
					}
				}
			}
		},
	},
};
</script>

<style>
.color-box {
	display: inline-block;
	background-color: rgb(231, 231, 231);
	padding: 10px 10px 10px 10px;
	margin-right: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	font-weight: lighter;
	color: black;
	font-size: 15px;
	cursor: pointer;
}

.color-box-linked {
	display: inline-block;
	background-color: rgb(218, 156, 63);
	padding: 10px 10px 10px 10px;
	margin-right: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	font-weight: lighter;
	color: black;
	font-size: 15px;
}

.tag-box {
	display: inline-block;
	height: 11px;
	width: 11px;
}

#is-delete {
	display: inline-block;
	color: rgb(44, 43, 43);
	padding: 1px 1px 1px 1px;
	border-radius: 50%;
	background-color: rgb(221, 221, 221);
	width: 1.5em;
	font-size: 12px;
	transform-origin: center;
}

#is-delete:hover {
	background-color: rgb(183, 184, 183);
}
</style>