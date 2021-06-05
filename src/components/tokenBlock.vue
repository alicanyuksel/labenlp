<template>
	<mark>
		<span
			v-for="token in detail"
			:key="token.start_index"
			:id="token.start_index"
		>
			{{ token.token }}
		</span>
	</mark>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "tokenBlock",
	props: {
		detail: Array,
	},
	computed: {
		...mapState(["allTokenDetails", "allTokenNames"]),
	},
	methods: {
		
	},
};
</script>

<style>
mark {
	background-color: unset;
}
</style>