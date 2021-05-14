<template>
	<div class="wrapper">
        <nav id="sidebar">
            <router-link to="/">Back to home</router-link>
        </nav>
    </div>
</template>

<script>
export default {
	components: {},
	
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