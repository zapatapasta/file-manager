import {createStore} from 'vuex'

export default createStore({
    state: {
        users: [
            {type: 'admin', username: 'alia', firstname:'ali', lastname:'lal', usergroup:[], files:{names:[]}, theme:'primary',language:'en'},
            {type: 'user', username: 'aliasd', firstname:'ali', lastname:'lal', usergroup:[], files:{names:[]}, theme:'primary',language:'en'},
            {type: 'user', username: 'aliasddssd', firstname:'ali', lastname:'lal', usergroup:[], files:{names:[]}, theme:'primary',language:'en'},
            {type: 'user', username: 'aliaxzxzsd', firstname:'ali', lastname:'lal', usergroup:[], files:{names:[]}, theme:'primary',language:'en'},
        ],
        groups:[
            {username:"xyz", users:[], unselected:[]},
            {username:"xsssyz", users:[], unselected:[]},
            {username:"xyaaaz", users:[], unselected:[]},
        ],
        currentuser:{type: 'admin', username: 'alia', firstname:'ali', lastname:'lal', usergroup:[], files:{names:[]},theme:'primary',language:'en'},
        files:[],
        currentfolder:null,
        currentfoldername:"/",
        copyfile:null,
        movemode:false
    },
    getters: {
        checkLanguage (state) {
            return state.currentuser.language === 'en'            
        },
        getusers(state){
            return state.users
        },
        getcurrentuser:(state) =>{
            return state.currentuser
        },
        getgroup: (state) => (groupname) => {
            return state.groups.find(group => group.username === groupname);
        },
        isadmin(state){
            return state.currentuser.type === 'admin'
        },
        getfiles(state){
            return state.files
        },
    },
    mutations:{
        changelanguage(state,{language}){
            let user = state.users.find(user => user.username === state.currentuser.username);
            user.language = language
            state.currentuser.language = language

        },
        deleteuser (state, x){
            state.users = state.users.filter(user => user.username !== x.username)
            state.groups.map(group=>{
                group.users = group.users.filter(user => user.username !== x.username)
                group.unselected = group.unselected.filter(user => user.username !== x.username)
            })
        },
        change(state,tempuser){ 
            state.users = state.users.map(user =>
                user.username === tempuser.username ? tempuser : user)
        },
        changegroup(state,{tempgroup,catchedgroup}){
            state.groups = state.groups.map(group =>
                group.username === catchedgroup.username ? tempgroup : group)
        },
        add(state,newuser){

            if(state.users.find(user=> user.username === newuser.username)){
                return false
            }            
            state.users.push(newuser)
            state.groups.map((item, index) =>{
                console.log(item.unselected);
                
                state.groups[index].unselected.push(newuser)
                console.log(state.groups);
                
            })
            return true
        },
        addusergroup(state, {group,newuser}){
            state.groups.map((item, index) =>{
                if(item.username === group.username){
                    state.groups[index].users.push(newuser)
                    state.groups[index].unselected = group.unselected
                } 
            })
            
        },
        deleteusergroup(state, {group,deleteduser}){
            state.groups.map((item, index) =>{
                if(item.username === group.username){
                    state.groups[index].unselected.push(deleteduser)
                    state.groups[index].users = group.users
                    console.log(state.groups[index].unselected);
                } 
            })
            
        },
        
        addshareduser(state, {file ,share, unselected}){
            let user = state.users.find(user => user.username === state.currentuser.username);
            let currentFile = state.currentuser.files.names.find(filename => filename.name === file.name)
            let allfiles = state.files.find(filename=> filename.name === file.name)
            if(state.currentfolder === state.currentuser.files){
                allfiles.shared.push(share)
                allfiles.unselected = unselected
                currentFile.shared.push(share)
                currentFile.unselected = unselected
                user.files = state.currentuser.files;
                state.currentuser = user
                return
            }else{
                allfiles.shared.push(share)
                allfiles.unselected = unselected
                currentFile = findKey(state);
                currentFile = currentFile.names.find(filename => filename.name === file.name)
                currentFile.shared.push(share)
                currentFile.unselected = unselected
                user.files = state.currentuser.files;
                state.currentuser = user
            }
            // let statefile = state.files.find(filename => filename.name === file.name) 
            // statefile = file
        },
        deletegroupuser(state,{name, deleteduser}){
            
            state.groups.map((item)=>{
                if (item.username === name) {
                    item.users = item.users.filter(user => user.username !== deleteduser.username)
                    item.unselected.push(deleteduser)
                }
            })
        },
        deletefile(state,{filename}){
            state.files = state.files.filter(file => file.name !== filename.name)
            
            let user = state.users.find(user => user.username === state.currentuser.username);
            // let currentFiles = state.currentuser.files;
            let currentFiles = user.files;
            function searchAndDelete(obj) {
                if (obj.hasOwnProperty('names')) {
                    if(obj.names.length > 0){
                        obj.names = obj.names.filter(file => file.name !== filename.name);
                        if(state.currentfoldername === ''){
                            user.files = obj
                            state.currentfolder = user.files
                        }else{
                            user.files[state.currentfoldername] = obj
                            state.currentfolder = user.files[state.currentfoldername]
                        }
                        state.currentuser = user
                        // state.currentfoldername = '/'
                        // return true
                    }
                }
                
                for (let key in obj) {
                    if (typeof obj[key] === 'object') {
                        if (searchAndDelete(obj[key])) {
                            return true;
                        }
                    }
                }
                return false;
            }
            searchAndDelete(currentFiles)
        },
        addfile(state,{newfile,path}){
            if(state.movemode === false){
                state.files.push({name:newfile.name,owner:state.currentuser.username,size:newfile.size, uploadtime:newfile.lastModified,filepath:path, shared:[], unselected:[...state.users, ...state.groups]})
            }
            state.movemode = false
            
            let user = state.users.find(user => user.username === state.currentuser.username);
            let currentFiles = state.currentuser.files;
            
            if(state.currentfolder === state.currentuser.files){
                currentFiles.names.push({name:newfile.name,owner:state.currentuser.username,size:newfile.size, uploadtime:newfile.lastModified,filepath:path, shared:[], unselected:[...state.users, ...state.groups]})
                user.files = state.currentuser.files;
                state.currentuser = user
                return
            }else{
                currentFiles = findKey(state);
                currentFiles.names.push({name:newfile.name,owner:state.currentuser.username,size:newfile.size, uploadtime:newfile.lastModified,filepath:path, shared:[], unselected:[...state.users, ...state.groups]})
                user.files = state.currentuser.files;
                state.currentuser = user
            }
        },
        setcurrentfolder(state,{foldername}){
            state.currentfoldername = foldername
            state.currentfolder = state.currentfolder[foldername]
        },
        addfolder(state,{foldername}){            
            let user = state.users.find(user => user.username === state.currentuser.username);
            let currentFiles = state.currentuser.files;
            
            if(state.currentfolder === state.currentuser.files){
                if (!currentFiles[foldername]) {
                    currentFiles[foldername] = {names:[]};
                    user.files = state.currentuser.files;
                    state.currentuser = user
                    return
                }
            }else{
                currentFiles = findKey(state);
                if (!currentFiles[foldername]) {
                    currentFiles[foldername] = {names:[]};
                }
                user.files = state.currentuser.files;
                state.currentuser = user
                
            }
            
            
        },
        setcopyfile(state,{file}){
            state.copyfile = file
            
        },
        movefile(state,{filename}){
            state.movemode = true
            state.copyfile = filename
            let user = state.users.find(user => user.username === state.currentuser.username);
            let currentFiles = state.currentuser.files;
            
            if(state.currentfolder === state.currentuser.files){
                currentFiles.names = currentFiles.names.filter(file => file.name !== filename.name)
                user.files = state.currentuser.files;
                state.currentuser = user
                return
            }else{
                currentFiles = findKey(state);
                currentFiles.names =currentFiles.names.filter(file => file.name !== filename.name)
                user.files = state.currentuser.files;
                state.currentuser = user
            }
            
        },
        changetheme(state,{color}){
            let user = state.users.find(user => user.username === state.currentuser.username);
            user.theme = color
            state.currentuser.theme = color
        }
        
    },
    actions:{
        pastefile(context){
            context.commit('addfile',{newfile:context.state.copyfile})
            
            context.state.copyfile = null
            
        },
    }
})

function findKey(state) {
    let result = null;
    
    function search(obj) {
        if (obj.hasOwnProperty(state.currentfoldername)) {
            result = obj[state.currentfoldername];
            return;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                search(obj[key]);
            }
        }
    }
    
    search(state.currentuser.files);
    
    return result;
}
