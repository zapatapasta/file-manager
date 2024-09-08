<script>
export default{
    data(){
        return{
            files:null,
            adminfiles:null,
            folders:[],
            error:false,
            path:'',
            isopen:false,
            newfile:null,
            addfolder:false,
            addusermode:false,
            newfoldername:'',
            showmode:false,
            shared:[],
            unselected:[],
            selectedsharedfile:null
        }
    },
    mounted(){
        if(this.$store.getters.isadmin){
            this.$store.state.currentfolder = this.$store.state.currentuser.files
            this.files = this.$store.state.files
            this.adminfiles = this.$store.state.currentuser.files.names
            this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names')
            this.$store.state.currentfoldername = ''
            this.path = this.$store.state.currentfoldername
        }else{
            this.files = this.$store.state.currentuser.files.names
            this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
            this.$store.state.currentfoldername = ''
            this.path = this.$store.state.currentfoldername
        }        
    },
    computed:{
        usertype(){
            return this.$store.getters.isadmin
        },
        usernamechange(){
            return this.$store.state.currentuser.username
        },
        currentfoldername(){
            return this.$store.state.currentfoldername
        },
        checklan(){
            return this.$store.getters.checkLanguage
        },
        changepath(){
            if(this.path === ''){
                return '/'
            }else{                
                return this.path
            }
        }
    },
    watch:{
        usernamechange(){
            if(this.$store.getters.isadmin){
                this.files = this.$store.state.files
                this.adminfiles = this.$store.state.currentfolder.names
                this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
            }else{
                this.files = this.$store.state.currentuser.files.names
                this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
            }
        },
        currentfoldername(){
            if(this.$store.getters.isadmin){
                if(this.$store.state.currentfoldername === '/'){
                    this.path = ''
                }
                this.files = this.$store.state.files
                this.adminfiles = this.$store.state.currentfolder.names
                this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
            }else{
                if(this.$store.state.currentfoldername === '/'){
                    this.path = ''
                }
                this.files = this.$store.state.currentfolder.names
                this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
            }
            
        }
    },
    methods:{
        sharedusers(file){
            let z = ''
            file.shared.map(value=>{
                z+=` ${value.username}`
            })
            return z
        },
        deletefile(file){
            
            this.$store.commit('deletefile',{filename:file})
            this.files = this.$store.state.currentfolder.names
            
            this.adminfiles = this.$store.state.currentfolder.names
            this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names') 
        },
        selectedfile(e){
            this.newfile = e.target.files[0]
        },
        addfile(){
            if(this.newfile === null){
                this.error = true
            }else{
                this.$store.commit('addfile',{newfile:this.newfile, path:this.path === ''?'/':this.path})
                this.isopen = false
                this.newfile = null
                this.files = [...this.files]
                this.folders = Object.keys(this.$store.state.currentfolder).filter(key=> key!=='names')
                this.error = false
            }
        },
        addmode(){
            this.addfolder = true
            this.isopen = true
        },
        addnewfolder(){
            if(this.newfoldername.length >0){
                this.$store.commit('addfolder',{foldername:this.newfoldername})
                this.isopen = false
                let folder = Object.keys(this.$store.state.currentfolder).filter(key => key !== 'names');
                this.folders = folder;
                this.newfoldername =''
                this.addfolder = false
            }else{
                this.error = true
            }
        },
        changefolder(file){
            this.path = this.path+'/'+file
            
            this.$store.commit('setcurrentfolder', { foldername: file });
            let folder = Object.keys(this.$store.state.currentfolder).filter(key => key !== 'names');
            this.folders = folder;
            this.files = this.$store.state.currentfolder.names
        },
        copyfile(file){
            this.$store.commit('setcopyfile',{file:file})
        },
        pastefile(){
            this.$store.dispatch('pastefile')
            this.$store.commit('setcopyfile',{file:null})
        },
        movefile(file){
            this.$store.commit('movefile',{filename:file})
            this.files = this.$store.state.currentuser.files.length > 0?this.$store.state.currentuser.files:null;           
        },
        share(file){
            this.unselected = file.unselected
            this.selectedsharedfile = file            
            this.addusermode = true
        },
        selecteduser(e){
            const selected = Array.from(e.target.selectedOptions).map(option => option.value)
            this.shared.push(this.unselected.find(user => user.username === selected[0]))
            let file = this.$store.state.files.find(file=> file.name === this.selectedsharedfile.name)
            this.unselected = this.unselected.filter(user => !selected.includes(user.username))
            this.$store.commit('addshareduser',{file: file, share: this.shared[0], unselected: this.unselected})
            this.shared = []
        }
    },
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row p-2 m-0">
            <div class="d-flex">
                <label for="tree mode" :class="`${checklan?'me-1':'ms-1'}`">{{ $t('message.treemode') }}</label>
                <input type="radio" :class="`${checklan?'me-2':'ms-2'}`" id="treemode" :value="true" v-model="showmode">
                <label for="list mode" :class="`${checklan?'me-1':'ms-1'}`">{{ $t('message.listmode') }}</label>
                <input type="radio" id="listmode" :value="false" v-model="showmode">
            </div>
        </div>
        <div class="row p-2">
            <div class="col d-block justify-content-start flex-wrap">
                <dialog :open="addusermode">
                    <div class="d-flex align-items-center flex-column">
                        <select class="form-select" @change="selecteduser" size="3" multiple aria-label="select example">
                            <option selected>Open this selectx menu</option>
                            <option class="dropdown-item" v-for="user in unselected" :value="user.username">{{user.username}}</option>
                        </select>
                        <button class="btn btn-primary mt-2 w-25 text-center p-1" @click="addusermode = false">done</button>
                    </div>
                </dialog>
                <dialog :open="isopen" class="w-50 mt-5">
                    <form class="d-flex flex-column" @submit.prevent>
                        <div class="row">
                            <div v-if="addfolder" class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <div class="w-50 d-flex align-items-center flex-column">
                                        <div>
                                            <label for="foldername" class="w-25 text-center">foldername</label>
                                            <input type="text" class="w-50 ms-5" v-model="newfoldername">
                                        </div>
                                        <span v-if="error" class="ms-5 text-danger small">more than 1 char</span>
                                    </div>
                                    <button :class="`btn btn-primary ${error?'h-75':''}`" @click="addnewfolder">add</button>
                                </div>
                                <div v-else class="col d-flex justify-content-around flex-wrap row-gap-3">
                                    <div class="w-75 d-flex justify-content-around">
                                        <!-- <div> -->
                                            <input type="file" class="w-25" @change="selectedfile">
                                        <!-- </div> -->
                                        <span v-if="error" class="ms-2 text-danger d-flex align-items-center mb-2 small">not selected</span>
                                    </div>
                                    <button class="btn btn-primary" @click="addfile">add</button>
                                 </div>
                        </div>
                    </form>
                </dialog>
                <div v-if="showmode" class="d-flex justify-content-start w-75">
                    <ul class="w-75">
                        <li>{{ changepath }}</li>
                        <ul>
                            <li v-for="file in folders" class="mt-2">
                                <a @click="changefolder(file)">{{ file }}</a>
                            </li>
                        </ul>
                        <ul>
                            <li v-for="file in files" class="d-flex justify-content-start text-end mt-2">
                                <p class="w-50 d-flex justify-content-start">{{ file.name }}</p>
                                <div class="w-50">
                                    <button v-if="usertype === false" class="btn btn-light" @click="deletefile(file)">delete</button>
                                    <button v-if="usertype === false" class="btn btn-light mx-1" @click="copyfile(file)">copy</button>
                                    <button v-if="usertype === false" class="btn btn-light" @click="movefile(file)">move</button>
                                    <button v-if="usertype === false" class="btn btn-secondary mx-1" type="button" @click="share(file)">add user</button>
                                </div>
                            </li>
                        </ul>
                    </ul>
                    <div v-if="usertype === false">
                        <button class="btn btn-light" @click="addmode">add folder</button>
                        <button class="btn btn-light mx-2" @click="isopen = true">add file</button>
                        <button class="btn btn-light" @click="pastefile">paste</button>

                    </div>
                </div>
                <table v-else class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="row" class="align-middle">{{ changepath }}</th>
                            <th scope="col" class="align-middle text-white">filename</th>
                            <th scope="col" class="align-middle">shared</th>
                            <th></th>
                            <th  scope="col" class="align-middle d-flex justify-content-end">
                                <button class="btn btn-light" @click="addmode">add folder</button>
                                <button class="btn btn-light mx-2" @click="isopen = true">add file</button>
                                <button class="btn btn-light" @click="pastefile">paste</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="usertype" v-for="file in adminfiles">
                            <td></td>
                            <td><a href="data:text/plain;charset=utf-8," class="nav-link" :download="file.name.split('.')[0]+`.txt`">{{ file.name }}</a></td>
                            <!-- <td><RouterLink :to="{name:'fileinfo',params:{name:file.name},query:{file:JSON.stringify(file)}}" class="nav-link">{{ file.name }}</RouterLink></td> -->
                            <td v-if="file.shared.length > 0">{{sharedusers(file)}}</td>
                            <td v-else></td>
                            <td></td>
                            <td class="d-flex justify-content-end">
                                <button class="btn btn-light mx-1" @click="deletefile(file)">delete</button>
                                <button class="btn btn-light" @click="copyfile(file)">copy</button>
                                <button class="btn btn-light mx-1" @click="movefile(file)">move</button>
                                <button class="btn btn-secondary" type="button" @click="share(file)">add user</button>
                            </td>
                        </tr>
                        <tr v-else v-for="file in files">
                            <td></td>
                            <td><a :href="file.name.split('.')[0]+`.txt`" class="nav-link" :download="file.name.split('.')[0]+`.txt`">{{ file.name }}</a></td>
                            <!-- <td><RouterLink :to="{name:'fileinfo',params:{name:file.name},query:{file:JSON.stringify(file)}}" class="nav-link">{{ file.name }}</RouterLink></td> -->
                            <td v-if="file.shared.length > 0">{{sharedusers(file)}}</td>
                            <td v-else></td>
                            <td></td>
                            <td class="d-flex justify-content-end">
                                <button class="btn btn-light mx-1" @click="deletefile(file)">delete</button>
                                <button class="btn btn-light" @click="copyfile(file)">copy</button>
                                <button class="btn btn-light mx-1" @click="movefile(file)">move</button>
                                <button class="btn btn-secondary" type="button" @click="share(file)">add user</button>
                            </td>
                        </tr>
                    </tbody>
                    <thead v-if="this.folders.length > 0">
                        <tr>
                            <th></th>
                            <th scope="row" class="align-middle">foldername</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="file in folders">
                            <td></td>
                            <td><a @click="changefolder(file)" class="nav-link">{{ file }}</a></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <thead v-if="usertype">
                        <tr>
                            <th scope="col" class="align-middle text-white">all files</th>
                            <th scope="col" class="align-middle">shared</th>
                            <th scope="col" class="align-middle">owner</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="usertype" v-for="file in files">
                            <td><a :href="file.name.split('.')[0]+`.txt`" class="nav-link" :download="file.name.split('.')[0]+`.txt`">{{ file.name }}</a></td>
                            <td>{{sharedusers(file)}}</td>
                            <td>{{ file.owner }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
