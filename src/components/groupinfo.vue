<script>
export default{
    data(){
        return{
            users:null,
            usersgroup:[]
        }
    },
    props: {
    groupname: String,
    x: String
    },
    methods:{
        change(e){   
            const selected = Array.from(e.target.selectedOptions).map(option => option.value)
            this.users = this.users.filter(user => !selected.includes(user.username))
        }
    },
    mounted(){
        this.users = this.$store.getters.getusers 
        console.log(this.$props);
                
        
    },
    
}
</script>
<template>
    <div class="container-fluid bg-primary">
        <h1>{{ x }}</h1>
        <select class="form-select" @change="change" size="3" multiple aria-label="select example">
            <option selected>Open this selectx menu</option>
            <option v-for="user in users" :value="user.username">{{user.username}}</option>
        </select>
    </div>
</template>