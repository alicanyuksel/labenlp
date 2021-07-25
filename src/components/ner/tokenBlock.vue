<template>
	<mark v-bind:style="{ backgroundColor: bgColor }" v-if="isActive">
		<span class="token" :id="tokenId">
			{{ token }}
		</span>

		<span id="label" v-if="label">
			{{ label }}
			<a
				id="is-delete"
				@click="
					'token' === type
						? removeToken([tokenId])
						: removeTokenBlock([tokenBlockId, tokensSelectedForBlock])
				"
				>&#x2715;</a
			>
		</span>
	</mark>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	name: "tokenBlock",
	props: {
		detail: Array,
		bgColor: String,
		tokenId: Number,
		tokenBlockId: Array,
		token: String,
		tokensSelectedForBlock: Array,
		label: String,
		type: String,
		isActive: Boolean
	},
	computed: {
		...mapState("ner",["allTokenDetails", "allTokenNames"]),
	},
	methods: {
		...mapMutations("ner",["removeToken","removeTokenBlock"]),
	},
};
</script>

<style>
#label {
	display: inline-block;
	background-color: rgb(231, 231, 231);
	padding: 2px 3px 2px 3px;
	margin-right: 5px;
	margin-bottom: 10px;
	border-radius: 15px;
	color: black;
	font-size: 11px;
}

mark {
	display:inline-block;
	background-color: unset;
	padding: 5px 0 0 0;
	margin-bottom: 3px;
	margin-left: 2px;
	border-radius: 13px;
}

span.token {
	padding-left: 5px;
	
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