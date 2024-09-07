<script>
export default {
    data(){
        return{

        }
    },
    props:{
        name:String,
        file:Object
    }
}
</script>
<template>
<h1>{{file.name}}</h1>
</template>