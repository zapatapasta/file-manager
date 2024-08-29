import {createStore} from 'vuex'

export default createStore({
    state: {
        users: [
            {type: 'admin', username: 'aliaaaaaaaaaaaaaa', firstname:'ali', lastname:'lal', usergroup:[]},
            {type: 'user', username: 'aliasd', firstname:'ali', lastname:'lal', usergroup:[]},
            {type: 'user', username: 'aliasddssd', firstname:'ali', lastname:'lal', usergroup:[]},
            {type: 'user', username: 'aliasd', firstname:'ali', lastname:'lal', usergroup:[]},
            {type: 'user', username: 'aliaxzxzsd', firstname:'ali', lastname:'lal', usergroup:[]},
        ],
        groups:[
            {name:"xyz",x:"szzd", users:{}},
            {name:"xyz",x:"sxxd", users:{}},
            {name:"xyz",x:"sd", users:{}},
        ],
        currentuser:{type: 'admin', username: 'alia', firstname:'ali', lastname:'lal', usergroup:[]},
        language:'en',
    },
    getters: {
        checkLanguage (state) {
            return state.language === 'en'            
        },
        getusers(state){
            return state.users
        }
    },
    mutations:{
        deleteuser (state, x){
            state.users = state.users.filter(user => user.username !== x.username)
        },
        change(state,tempuser){ 
            console.log(state.users);
            state.users = state.users.map(user =>
            user.username === tempuser.username ? tempuser : user)
        },
        add(state,newuser){
            state.users.push(newuser)
        }
    }
})
