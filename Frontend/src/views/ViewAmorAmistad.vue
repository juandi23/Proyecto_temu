<template>
    <div class="view-mas-vendidos">
      <MainHeader />  
      <MainBanner />
      <BannerAmorAmistad />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '@/components/MainHeader.vue'
  import BannerAmorAmistad from '@/components/BannerAmorAmistad.vue'
  import TheFooter from '@/components/TheFooter.vue'
  import MainBanner from '@/components/MainBanner.vue';
  
  export default {
    name: 'ViewAmorAmistad',
    components: {
        MainHeader,
        MainBanner,
        BannerAmorAmistad,
        TheFooter
    }
  }
  </script>
  
  <style scoped>
 
  </style>