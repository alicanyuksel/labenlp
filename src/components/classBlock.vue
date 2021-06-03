<template>
	<div class="color-box" :class="{ 'color-box-linked' : idClass === currentClass.id}">
		<span>
			<span class="tag-box" :style="{ backgroundColor: bgColor }"></span>
			{{ className }}
		</span>
		<a id="is-delete" @click="deleteClass(idClass)">&#x2715;</a>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: "classBlock",
	props: {
		idClass: Number,
		className: String,
		bgColor: String,
	},
	computed: {
		...mapState(["currentClass"])
	},
	methods: {
		...mapMutations(["deleteClass"]),
	},
};
</script>

<style>
.color-box {
	display: inline-block;
	background-color: rgb(231, 231, 231);;
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