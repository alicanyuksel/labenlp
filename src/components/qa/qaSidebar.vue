<template>
	<div class="wrapper">
		<nav id="sidebar">
			<router-link to="/"><i class="fa fa-home"></i> Home</router-link>
			<button v-if="inputReceived == true" @click="resetAll">
				<i class="fa fa-close"></i> Reset
			</button>
		</nav>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
	components: {},
	computed: {
		...mapState("qa",["inputReceived"]),
	},
	methods: {
		...mapMutations("qa",["resetAll"]),
	},
};
</script>

<style>
.wrapper {
	position: fixed;
	left: 0;
	top: 0;
	background-color: rgb(177, 114, 20);
	width: 10%;
	height: 100%;
}

#sidebar {
	margin-top: 30%;
}

button {
	text-decoration: none;
	border: none;
	color: white;
	background: none;
	font-size: 20px;
	border-radius: 8px;
	cursor: pointer;
}

button:hover {
	color: greenyellow;
	background-color: hotpink;
}

a {
	color: white;
	text-align: center;
	font-size: 20px;
	border-radius: 8px;
	cursor: pointer;
}

a:hover {
	text-decoration: none;
	color: white;
}
</style>