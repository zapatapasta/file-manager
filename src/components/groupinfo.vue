<script>
export default{
    data(){
        return{
            isopen:false,
            selecteduser:null,
            unselected:null,
            users:[]
        }
    },
    props: {
    name: String,
    group: Object
    },
    methods:{
        change(e){   
            const selected = Array.from(e.target.selectedOptions).map(option => option.value)
            
            this.selecteduser = this.unselected.find(user => user.username === selected[0])
            
            this.group.unselected = this.unselected.filter(user => !selected.includes(user.username))
            this.unselected = this.unselected.filter(user => !selected.includes(user.username))
            
            this.$store.commit('addusergroup',{ group: this.group, newuser: this.selecteduser}) 
            const gr = this.$store.getters.getgroup(this.name);
            console.log(gr);
            
            this.users = gr.users
        },
        deleteuser(user){
            const gr = this.$store.getters.getgroup(this.name);
            this.$store.commit('deletegroupuser',{name:this.name, deleteduser:user})
            this.users = gr.users
            this.unselected = gr.unselected
        }
    },
    mounted(){
        console.log(this.name);
                
        const gr = this.$store.getters.getgroup(this.name);
        if(gr.unselected.length > 0){
            this.unselected = gr.unselected
            this.users = gr.users
        }else{
            this.users = []
            this.unselected = this.$store.getters.getusers
        }
    },
    
}
</script>
<template>
    <!-- <div class="container-fluid bg-primary">
        <h1>{{ group.name }}</h1>
    </div> -->
    <div class="container-fluid bg-primary p-0">
        <div class="row p-3">
            <div class="col">
                <table class="table table-hover table-dark">
                    <dialog :open="isopen" class="w-50 mt-5">
                        <form class="d-flex flex-column" @submit.prevent>
                            <div class="row">
                                <div class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <select class="form-select" @change="change" size="3" multiple aria-label="select example">
                                        <option selected>Open this selectx menu</option>
                                        <option v-for="user in unselected" :value="user.username">{{user.username}}</option>
                                    </select>
                                    <button class="btn btn-primary" @click="isopen = false">add</button>
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
                        <tr  v-for="user in users">
                            <td><p>{{ user.firstname }}</p></td>
                            <td><p>{{ user.lastname }}</p></td>
                            <td><p>{{ user.type }}</p></td>
                            <td>
                            <button class="btn btn-danger" @click="deleteuser(user)">delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>