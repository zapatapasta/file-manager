<script>
import HomeView from './views/HomeView.vue';
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterView } from 'vue-router';
import "bootstrap"

export default {
  components:{
    HomeView
  },
  data(){
    return{
      x: 1
    }
  },
  computed:{
    check(){
      return this.$store.getters.checkLanguage? 'ltr' :'rtl';
    },
    checklan(){
      return this.$store.getters.checkLanguage
    },
    themechange(){
      return this.$store.state.currentuser.theme
    }
  },
  methods:{
    changelanguage(language){
      this.$store.commit('changelanguage',{language:language})
      this.$i18n.locale = language
      console.log(this.$i18n.locale);
      
    },
    changetheme(color){
      this.$store.commit('changetheme',{color:color})
    }
  }
}
</script>

<template>
  <div :class="`container-fluid vh-100 bg-${themechange}`" :dir="check">
    <div class="row h-100">
        <div class="col-2 p-3 border border-top-0 border-bottom-0 border-left-0 border-white">
          <HomeView />
        </div>
        <div class="col-10 p-0">
            <div :class="`row bg-${themechange} m-0 d-flex flex-column border-bottom  border-white pb-3`">
              <div class="d-flex justify-content-center">
                <h3 class="w-50 m-0 align-middle pt-2">{{ $store.getters.getcurrentuser.firstname }}</h3>
                <div class="w-50 d-flex">
                  <a :class="`dropdown-toggle nav-link d-flex align-items-center pt-2 ${checklan?'me-5':'ms-5'}`" data-bs-toggle="dropdown" aria-expanded="false">{{ $t('message.theme') }}</a>
                  <ul class="dropdown-menu p-0">
                      <li class="dropdown-item" v-for="color in ['danger','primary','info']" @click="changetheme(color)">{{ color }}</li>
                  </ul>
                  <a class="dropdown-toggle nav-link d-flex align-items-center pt-2"  data-bs-toggle="dropdown" aria-expanded="false">{{ $t('message.language') }}</a>
                  <ul class="dropdown-menu p-0">
                      <li class="dropdown-item" v-for="language in ['en','pr']" @click="changelanguage(language)">{{ language }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <RouterView />
        </div>   
    </div>
  </div>
</template>

<style>

</style>
