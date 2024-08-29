<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import { RouterLink } from 'vue-router';
export default{
    data(){
        return{
            options:['house','file','person']
        }
    },
    computed:{
        usertype(){
            return this.$store.state.currentuser.type === "admin"
        }
    },
    methods:{
        changeuser(user){
            this.$store.state.currentuser = user
            console.log(this.$store.state.currentuser);
            
        }
    }

}
</script>


<template>
    <div class="row h-100">
        <div class="col-2 p-3">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item my-2">
                    <RouterLink :to="{name:'userlist'}" class="nav-link">userlist</RouterLink>
                </li>
                <li class="nav-item my-2">
                    <RouterLink :to="{name:'grouplist'}" class="nav-link">grouplist</RouterLink>
                </li>
                <li class="nav-item my-2">
                    <a href="/" class="nav-link">user</a>
                </li>
                <li class="nav-item my-2">
                    <a class="dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">ropdown</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item" v-for="user in $store.state.users" @click="changeuser(user)">{{ user.username }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col-10 p-0">
            <slot></slot>
        </div>
        
    </div>
</template>

<style scoped>

</style>