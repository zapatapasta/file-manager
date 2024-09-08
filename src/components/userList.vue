<script>

export default{
    data(){
        return{
            isopen:false,
            iseditmode:false,
            catcheduser:{},
            tempuser:{},
            namecorrect:false,
            typecorrect:false,
            usernamecorrect:false,
            nameerror:false,
            usernameerror:false,
            typeerror:false,
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
                if(this.tempuser.type === 'admin' || this.tempuser.type === 'user'){
                    this.typeerror = false
                    this.$store.commit('change',this.tempuser)
                    alert("edited successfully")
                    this.iseditmode = !this.iseditmode
                    this.isopen = !this.isopen
                }else{
                    this.typeerror = true
                }
            }else{
                this.newuser.creator = this.$store.getters.getcurrentuser.username
                this.newuser.creationtime = new Date().getTime()
                this.newuser.lastmodifier = this.$store.getters.getcurrentuser.username
                this.newuser.lastmodificationtime = new Date().getTime()
                this.newuser.theme = 'primary'
                this.newuser.language = 'en'
                if(this.newuser.username.length >= 5 && this.newuser.username.length < 48){
                    this.usernamecorrect = true
                    this.usernameerror = false
                    if(this.newuser.firstname.length < 48 && this.newuser.lastname.length < 48){
                        this.namecorrect = true
                        this.nameerror = false
                        if(this.newuser.type === 'admin' || this.newuser.type === 'user'){
                            this.typecorrect = true
                            this.typeerror = false
                            if(this.$store.commit('add', this.newuser)){
                                alert("not accepted")
                                return
                            }
                            alert('added successfully')
                            this.isopen = false
                            this.newuser={
                            type: '',
                            username: '',
                            firstname:'', 
                            lastname:'', 
                            usergroup:[],
                            } 
                        }else{
                            this.typeerror = true
                        }
                    }else{
                        this.nameerror = true
                    }
                }else{
                    this.usernameerror = true
                }
            }
            
        },
        editmode(user){
            this.catcheduser = user
            this.tempuser = {...user}
            this.isopen = !this.isopen
            this.iseditmode = !this.iseditmode
        },

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
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="firstname" class="w-25 text-center">firstname</label>
                                            <input type="text" class="w-50 ms-5" v-model="tempuser.firstname">
                                        </div>
                                        <span v-if="nameerror" class="ms-5 text-danger small">less than 48 char</span>
                                        <span v-else class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="lastname" class="w-25 text-center">lastname</label>
                                            <input type="text" class="w-50 ms-5" v-model="tempuser.lastname">
                                        </div>
                                        <span v-if="nameerror" class="ms-5 text-danger small">less than 48 char</span>
                                        <span v-else class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="firstname" class="w-25 text-center">usertype</label>
                                            <input type="text" class="w-50 ms-5" v-model="tempuser.type">
                                        </div>
                                        <span v-if="typeerror" class="ms-4 text-danger small">user or admin</span>
                                        <span v-else class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex justify-content-center">
                                        <button class="btn btn-primary w-25 h-75" type="submit" @click="change">edit</button>
                                        
                                    </div>
                                </div>
                                <div v-else class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="firstname" class="w-25 text-center">firstname</label>
                                            <input type="text" class="w-50 ms-5" v-model="newuser.firstname">
                                        </div>
                                        <span v-if="nameerror" class="ms-5 text-danger small">less than 48 char</span>
                                        <span v-else-if="namecorrect" class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="lastname" class="w-25 text-center">lastname</label>
                                            <input type="text" class="w-50 ms-5" v-model="newuser.lastname">
                                        </div>
                                        <span v-if="nameerror" class="ms-5 text-danger small">less than 48 char</span>
                                        <span v-else-if="namecorrect" class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="username" class="w-25 text-center">username</label>
                                            <input type="text" class="w-50 ms-5" v-model="newuser.username">
                                        </div>
                                        <span v-if="usernameerror" class="ms-5 text-danger small">more 5 less 48 char</span>
                                        <span v-else-if="usernamecorrect"class="text-success">correct</span>
                                    </div>
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="firstname" class="w-25 text-center">usertype</label>
                                            <input type="text" class="w-50 ms-5" v-model="newuser.type">
                                        </div>
                                        <span v-if="typeerror" class="ms-4 text-danger small">user or admin</span>
                                        <span v-else-if="typecorrect"class="text-success">correct</span>
                                    </div>
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