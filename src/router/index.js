import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/userList.vue'
import GroupList from '@/components/groupList.vue'
import Groupinfo from '@/components/groupinfo.vue'
import Files from '@/components/files.vue'
import Fileinfo from '@/components/fileinfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Files
    },
    {
      path: '/userlist',
      name:'userlist',
      component: UserList
    },
    {
      path: '/grouplist',
      name:'grouplist',
      component: GroupList
    },
    {
      path: '/grouplist/:name',
      name:'groupinfo',
      component: Groupinfo,
      props: route => ({name:route.params.name, group: JSON.parse(route.query.group)})
    },
    {
      path:'/files',
      name:'files',
      component:Files
      
    },
    {
      path: '/files/:name',
      name:'fileinfo',
      component: Fileinfo,
      props: route => ({name:route.params.name})
    },
  ]
})


export default router
