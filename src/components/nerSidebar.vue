<template>
	<div class="wrapper">
        <nav id="sidebar">
            <router-link to="/">Back to home</router-link>
            <button v-if="inputReceived == true" @click="initializeInput">Reset</button>
        </nav>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
	components: {},
    computed: {
        ...mapState(["inputReceived"])
    },
    methods: {
        ...mapMutations(["initializeInput"])
    }
	
};
</script>

<style>

.wrapper {
    position: fixed;
    left: 0;
    top: 0;
    background-color:gray;
    width: 10%;
    height: 100%;   
}

#sidebar {
    margin-top: 30% ;
    
    
}

a {
	text-decoration: none;
	color: white;
	text-align: center;
	font-size: 20px;
	border-radius: 8px;
	cursor: pointer;
}

</style>