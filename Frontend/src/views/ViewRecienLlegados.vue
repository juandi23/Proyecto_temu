<template>
    <div class="view-mas-vendidos">
      <MainHeader />  
      <BannerRecienLlegados />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '@/components/MainHeader.vue'
  import TheFooter from '@/components/TheFooter.vue'
  import BannerRecienLlegados from '@/components/BannerRecienLlegados.vue';
  
  export default {
    name: 'ViewAmorAmistad',
    components: {
        MainHeader,
        BannerRecienLlegados,
        TheFooter
    }
  }
  </script>
  
  <style scoped>
 
  </style>