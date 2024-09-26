<template>
    <div class="view-mas-vendidos">
      <MainHeader />  
      <BannerCincoEstrellas />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '@/components/MainHeader.vue'
  import BannerCincoEstrellas from '@/components/BannerCincoEstrellas.vue'
  import TheFooter from '@/components/TheFooter.vue'
  
  export default {
    name: 'ViewCincoEstrellas',
    components: {
        MainHeader,
        BannerCincoEstrellas,
        TheFooter
    }
  }
  </script>
  
  <style scoped>
 
  </style>