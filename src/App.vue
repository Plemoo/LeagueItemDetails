<template>
  <!-- <b-container>
    <div class="jumbotron bg-cover text-white lolbackground">
      <div class="py-5 text-center">
          <h1 class="display-4 font-weight-bold">League Items with Details</h1>
          <p class="font-italic mb-0">Hey there, I created a overview of the available Items in League of Legends, including a calculated <b>Coefficient</b></p>
          <b-button squared v-b-toggle.sidebar-1 variant="danger" class="px-5" size="lg" style="border-width:medium">Show Sidebar</b-button>
      </div>
    </div>
    <sidebar></sidebar>
    <router-view></router-view>
  </b-container> -->
      <router-view></router-view>

</template>

<script>

//import axios from "axios"
export default {
  name: 'App',
  data(){
    return {
      test:""
      }
    },
    methods:{
    }
  
}
</script>

<style>
#app {
  display: inline-flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.lolbackground{
  background-image: url("img/lolbackground.jpg");
}

</style>
