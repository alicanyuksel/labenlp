<template>
	<span class="color-box" :style="{ backgroundColor: bgColor }">
		{{ className }}
	</span>
</template>

<script>
export default {
	name: "classBlock",
	props: {
		className: String,
		bgColor: String,
	},
};
</script>

<style>
.color-box {
	border-radius: 5px;
	padding: 5px;
	font-weight: bold;
	color: black;
	width: 1rem;
	height: 1rem;
	margin-right: 1rem;
}

.color-box:active {
	background-color: red;
}
</style>