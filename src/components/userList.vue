<script>

export default{
    data(){
        return{
            isopen:false,
            iseditmode:false,
            catcheduser:{},
            tempuser:{},
            newuser:{
                type: '',
                username: '',
                firstname:'', 
                lastname:'', 
                usergroup:[],
                creator:null,
                creationtime:null,
                lastmodifier:null,
                lastmodificationtime:null,
                theme:'',
                language:'',
                files:{names:[]}
            }   
        }
    },
    methods:{
        deleteuser(x){
            this.$store.commit('deleteuser', x)
        },
        change(){
            
            if(this.iseditmode){
                this.tempuser.lastmodifier = this.$store.getters.getcurrentuser.username
                this.tempuser.lastmodificationtime = new Date().getTime()
                console.log(this.newuser);
                this.$store.commit('change',this.tempuser)
                this.iseditmode = !this.iseditmode
                this.isopen = !this.isopen
            }else{
                this.newuser.creator = this.$store.getters.getcurrentuser.username
                this.newuser.creationtime = new Date().getTime()
                this.newuser.lastmodifier = this.$store.getters.getcurrentuser.username
                this.newuser.lastmodificationtime = new Date().getTime()
                this.newuser.theme = 'primary'
                this.newuser.language = 'en'
                if(this.newuser.username.length >= 5 && this.newuser.username.length < 48){
                    if(this.newuser.firstname.length < 48 && this.newuser.lastname.length < 48){
                        if(this.newuser.type === 'admin' || this.newuser.type === 'user'){
                            if(this.$store.commit('add', this.newuser)){
                                alert("not accepted")
                                return
                            }
                            this.isopen = false
                            this.newuser={
                            type: '',
                            username: '',
                            firstname:'', 
                            lastname:'', 
                            usergroup:[],
                            } 
                        }
                    }
                }
            }
            
        },
        editmode(user){
            this.catcheduser = user
            this.tempuser = {...user}
            this.isopen = !this.isopen
            this.iseditmode = !this.iseditmode
        },
        // file(e){
            
        //     this.newuser.file = Array.from(e.target.files)
        //     console.log(typeof(Array.from(e.target.files)));
        //     console.log(this.newuser.file[0]);
            
        // }

    }
}
</script>



<template>
    <div class="container-fluid bg-primary p-0">
        <div class="row p-3">
            <div class="col">
                <table class="table table-hover table-dark">
                    <dialog :open="isopen" class="w-50 mt-5">
                        <form class="d-flex flex-column" @submit.prevent>
                            <div class="row bg-white text-dark">
                                <div v-if="iseditmode" class="col d-flex justify-content-start flex-wrap row-gap-3">
                                    <label for="firstname" class="w-25 text-center">firstname</label>
                                    <input type="text" class="w-25" v-model="tempuser.firstname">
                                    <label for="lastname" class="w-25 text-center">lastname</label>
                                    <input type="text" class="w-25" v-model="tempuser.lastname">
                                    <label for="firstname" class="w-25 text-center">type</label>
                                    <input type="text" class="w-25" v-model="tempuser.type">
                                    <button class="btn btn-primary ms-5" type="submit" @click="change">edit</button>
                                </div>
                                <div v-else class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <label for="firstname" class="w-25 text-center">firstname</label>
                                    <input type="text" class="w-25" v-model="newuser.firstname">
                                    <label for="lastname" class="w-25 text-center">lastname</label>
                                    <input type="text" class="w-25" v-model="newuser.lastname">
                                    <label for="firstname" class="w-25 text-center">username</label>
                                    <input type="text" class="w-25" v-model="newuser.username">
                                    <label for="firstname" class="w-25 text-center">type</label>
                                    <input type="text" class="w-25" v-model="newuser.type">
                                    <!-- <label for="firstname" class="w-25 text-center">file</label>
                                    <input type="file" class="w-25" @change="file"> -->
                                    <button class="btn btn-primary" @click="change">add</button>
                                </div>
                            </div>
                        </form>
                    </dialog>
                    <thead>
                        <tr>
                            <th scope="col" class="align-middle">firstname</th>
                            <th scope="col" class="align-middle">lastname</th>
                            <th scope="col" class="align-middle">type</th>
                            <th scope="col" class="align-middle"><button class="btn btn-danger" @click="isopen=true">add user</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="user in this.$store.getters.getusers">
                            <td><p>{{ user.firstname }}</p></td>
                            <td><p>{{ user.lastname }}</p></td>
                            <td><p>{{ user.type }}</p></td>
                            <td>
                            <button class="btn btn-danger" @click="deleteuser(user)">delete</button>
                            <button class="btn btn-primary" @click="editmode(user)">edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>

<style scoped>
a{
    color: black;
}
</style>