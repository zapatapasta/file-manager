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
                // file:null
            }   
        }
    },
    methods:{
        deleteuser(x){
            this.$store.commit('deleteuser', x)
        },
        change(){
            if(this.iseditmode){
                this.$store.commit('change',this.tempuser)
                this.iseditmode = !this.iseditmode
            }else{
                this.$store.commit('add', this.newuser)
                console.log(this.$store.state.users);
                
            }
                
            this.isopen = !this.isopen
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
                <table class="table table-hover">
                    <dialog :open="isopen" class="w-50 mt-5">
                        <form class="d-flex flex-column" @submit.prevent>
                            <div class="row">
                                <div v-if="iseditmode" class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <label for="firstname" class="w-25 text-center">firstname</label>
                                    <input type="text" class="w-25" v-model="tempuser.firstname">
                                    <label for="lastname" class="w-25 text-center">lastname</label>
                                    <input type="text" class="w-25" v-model="tempuser.lastname">
                                    <label for="firstname" class="w-25 text-center">username</label>
                                    <input type="text" class="w-25" v-model="tempuser.username">
                                    <label for="firstname" class="w-25 text-center">type</label>
                                    <input type="text" class="w-25" v-model="tempuser.type">
                                    <button class="btn btn-primary" type="submit" @click="change">edit</button>
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
                        <tr  v-for="user in this.$store.state.users">
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