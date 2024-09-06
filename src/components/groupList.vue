<script>

export default{
    data(){
        return{
            isopen:false,
            iseditmode:false,
            catchedgroup:{},
            newgroup:{
                username: '',
                users:[],
                unselected:[],
                creator:null,
                creationtime:null,
                lastmodifier:null,
                lastmodificationtime:null,
            }   
        }
    },
    methods:{
        deletegroup(x){
            this.$store.state.groups = this.$store.state.groups.filter(group => group.username !== x.username)
        },
        change(){
            if(this.iseditmode){
                this.$store.state.groups = this.$store.state.groups.map(group =>
                group.username === this.catchedgroup.username ? this.catchedgroup : group)
                this.iseditmode = !this.iseditmode
                this.isopen = !this.isopen
            }else{                
                this.newgroup.creator = this.$store.getters.getcurrentuser.username
                this.newgroup.creationtime = new Date().getTime()
                this.newgroup.lastmodifier = this.$store.getters.getcurrentuser.username
                this.newgroup.lastmodificationtime = new Date().getTime()
                if(this.newgroup.username.length >= 5 && this.newgroup.username.length < 48){
                    this.$store.state.groups.push(this.newgroup)
                    this.isopen = !this.isopen
                }
                this.newgroup={username: '', users:[], unselected:[]} 
            }
        },
        editmode(group){
            this.catchedgroup = group
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
                                <div v-if="iseditmode" class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <label for="name" class="w-25 text-center">name</label>
                                    <input type="text" class="w-25" v-model="catchedgroup.username">
                                    <button class="btn btn-primary" @click="change">edit</button>
                                </div>
                                <div v-else class="col d-flex justify-content-center flex-wrap row-gap-3">
                                    <label for="name" class="w-25 text-center">name</label>
                                    <input type="text" class="w-25" v-model="newgroup.username">
                                    <button class="btn btn-primary ms-5 me-5" @click="change">add</button>
                                </div>
                            </div>
                        </form>
                    </dialog>
                    <thead>
                        <tr>
                            <th scope="col" class="align-middle">name</th>
                            <th scope="col" class="align-middle">creator</th>
                            <th scope="col" class="align-middle"><button class="btn btn-danger" @click="isopen=true">add group</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="group in this.$store.state.groups">
                            <td><RouterLink :to="{name:'groupinfo',params:{name:group.username}, query:{group: JSON.stringify(group)}}" class="nav-link">{{ group.username }}</RouterLink></td>
                            <td>{{ group.creator }}</td>
                            <td>
                            <button class="btn btn-danger" @click="deletegroup(group)">delete</button>
                            <button class="btn btn-primary" @click="editmode(group)">edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>