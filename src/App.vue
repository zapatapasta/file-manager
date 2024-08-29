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
    }
  }
}
</script>

<template>
  <div class="container-fluid vh-100" :dir="check">
    <HomeView>
      <RouterView/>
    </HomeView>
  </div>
</template>

<style>

</style>
