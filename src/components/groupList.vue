<script>

export default{
    data(){
        return{
            isopen:false,
            iseditmode:false,
            catchedgroup:{},
            newgroup:{
                name: '',
                users:[]
            }   
        }
    },
    methods:{
        deletegroup(x){
            this.$store.state.groups = this.$store.state.groups.filter(group => group.name !== x.name)
        },
        change(){
            if(this.iseditmode){
                this.$store.state.groups = this.$store.state.groups.map(group =>
                group.name === this.catchedgroup.name ? this.catchedgroup : group)
                this.iseditmode = !this.iseditmode
            }else{
                this.$store.state.groups.push(this.newgroup)
                this.newgroup={name: '', users:[]} 
            }
            this.isopen = !this.isopen
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
                <table class="table table-hover">
                    <dialog :open="isopen" class="w-50 mt-5">
                        <form class="d-flex flex-column" @submit.prevent>
                            <div class="row">
                                <div v-if="iseditmode" class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <label for="name" class="w-25 text-center">name</label>
                                    <input type="text" class="w-25" v-model="catchedgroup.name">
                                    <button class="btn btn-primary" @click="change">edit</button>
                                </div>
                                <div v-else class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <label for="name" class="w-25 text-center">name</label>
                                    <input type="text" class="w-25" v-model="newgroup.name">
                                    <button class="btn btn-primary" @click="change">add</button>
                                </div>
                            </div>
                        </form>
                    </dialog>
                    <thead>
                        <tr>
                            <th scope="col" class="align-middle">name</th>
                            <th scope="col" class="align-middle"><button class="btn btn-danger" @click="isopen=true">add group</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="group in this.$store.state.groups">
                            <td><RouterLink :to="{name:'groupinfo',params:{groupname:group.name}, query:{x: group.x}}" class="nav-link">{{ group.name }}</RouterLink></td>
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