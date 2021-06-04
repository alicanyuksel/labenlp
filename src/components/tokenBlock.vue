<template>
	<div>
		<span
			v-for="token in allTokenNames"
			:key="token.index"
		>
			{{ token }}
		</span>
	</div>
</template>

<script>
import { mapState } from "vuex"
 
export default {
	name: "tokenBlock",
	props: {

	},
	computed: {
		...mapState(["allTokenDetails", "allTokenNames"])
	}
};
</script>

<style>
</style>