import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/userList.vue'
import GroupList from '@/components/groupList.vue'
import Groupinfo from '@/components/groupinfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/grouplist/:groupname',
      name:'groupinfo',
      component: Groupinfo,
      props: true
    }
  ]
})

export default router
