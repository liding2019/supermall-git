<template>
  <swiper class="topSwiper">
  <swiper-item v-for="item in topImages">
    <a>
      <img :src="item" alt="">
    </a>
  </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper';
    export default {
        name: "DetailSwiper",
        props:{
          topImages:{
            type:Array,
            default(){
              return []
            }
          }
        },
        components:{
          Swiper,
          SwiperItem
        }
    }
</script>

<style scoped>
  .topSwiper{
    height: 300px;
    overflow: hidden;
  }
</style>
