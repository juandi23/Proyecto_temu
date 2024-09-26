<template>
    <div class="view-mas-vendidos">
      <MainHeader />  
      <BannerMasVendidos />
      <TheFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '@/components/MainHeader.vue'
  import BannerMasVendidos from '@/components/BannerMasVendidos.vue'
  import TheFooter from '@/components/TheFooter.vue'
  
  export default {
    name: 'ViewMasVendidos',
    components: {
        MainHeader,
        BannerMasVendidos,
        TheFooter
    }
  }
  </script>
  
  <style scoped>
 
  </style>