<template>
    <div class="view-mas-vendidos">
      <MainHeader />  
      <BannerAyuda />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '@/components/MainHeader.vue'
  import BannerAyuda from '@/components/BannerAyuda.vue'
  import TheFooter from '@/components/TheFooter.vue'
 
  
  export default {
    name: 'ViewAmorAmistad',
    components: {
        MainHeader,
        BannerAyuda,
        TheFooter
    }
  }
  </script>
  
  <style scoped>
 
  </style>