<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import { RouterLink } from 'vue-router';
export default{
    data(){
        return{
            options:['house','file','person'],
            userchanged:false
        }
    },computed:{
        usertype(){
            return this.$store.getters.isadmin
        },

    },
    methods:{
        changeuser(user){
            this.$store.state.currentuser = user
            this.$store.state.currentfolder = this.$store.state.currentuser.files
            this.$store.state.currentfoldername = '/'
            this.userchanged = true
            this.$i18n.locale = this.$store.state.currentuser.language
            
        },
        clicked(){
            this.$store.state.currentfolder = this.$store.state.currentuser.files
            console.log(this.$store.state.currentfolder );
            this.$store.state.currentfoldername = '/'
            
        }
    },  
    updated() {
        if(this.userchanged){
            this.$router.push({ name: 'files' });
            this.userchanged = false
        }
    },

}
</script>


<template>
    <ul class="nav nav-pills flex-column" v-if="usertype">
        <li class="nav-item my-2">
            <RouterLink :to="{name:'userlist'}" class="nav-link text-black">{{ $t('message.users') }}</RouterLink>
        </li>
        <li class="nav-item my-2">
            <RouterLink :to="{name:'grouplist'}" class="nav-link text-black">{{ $t('message.groups') }}</RouterLink>
        </li>
        <li class="nav-item my-2">
            <RouterLink :to="{name:'files'}" class="nav-link text-black">{{ $t('message.files') }}</RouterLink>
        </li>
        <li class="nav-item my-2">
            <a class="dropdown-toggle nav-link text-black" data-bs-toggle="dropdown" aria-expanded="false">{{ $t('message.changeuser') }}</a>
            <ul class="dropdown-menu">
                <li class="dropdown-item" v-for="user in $store.state.users" @click="changeuser(user)">{{ user.username }}</li>
            </ul>
        </li>
    </ul>
    <ul class="nav nav-pills flex-column" v-else>
        <li class="nav-item my-2">
            <RouterLink :to="{name:'files'}" @click="clicked" class="nav-link text-black">{{ $t('message.files') }}</RouterLink>
        </li>
        <li class="nav-item my-2">
            <a class="dropdown-toggle nav-link text-black" data-bs-toggle="dropdown" aria-expanded="false">{{ $t('message.changeuser') }}</a>
            <ul class="dropdown-menu">
                <li class="dropdown-item" v-for="user in $store.state.users" @click="changeuser(user)">{{ user.username }}</li>
            </ul>
        </li>
    </ul>
</template>

<style scoped>

</style>