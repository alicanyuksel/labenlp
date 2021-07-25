<template>
	<table id="annotation-table" class="table table-bordered">
		<thead>
			<tr>
				<th scope="col">Question</th>
				<th scope="col">Answer</th>
				<th scope="col">Edit</th>
			</tr>
		</thead>
		<tbody v-for="annotation in getAllAnnotations" :key="annotation.id">
			<tr>
				<td>{{ annotation.question }}</td>
				<td>{{ annotation.answer }}</td>
				<td>Edit</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapGetters } from "vuex";


export default {
	name: "loadTextFile",
    computed: {
        ...mapGetters("qa", ["getAllAnnotations"])
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
    margin: 2px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

td, th {
    border-color: rgb(228, 180, 103);
}

thead {
    background-color: rgb(228, 180, 103);
}
</style>
