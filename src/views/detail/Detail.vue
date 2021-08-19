<template>
    <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :topImages="topImages"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import {getGoodsDetail} from "../../network/detail";
    export default {
        name: "Detail",
        components:{
          DetailNavBar,
          DetailSwiper
        },
        data(){
          return {
            id:null,
            topImages: []
          }
        },
        created(){
          this.id=this.$route.params.id;
          console.log(this.id);
          this.loadDetail(this.id);
        },
        methods:{
          loadDetail(id) {
            getGoodsDetail(id).then(res => {
              console.log(res);
              this.$toast.show('来了，老弟！')
              this.topImages = res.data.topImg;
            })
          }
        }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 19;
    background-color: #fff;
    height: 100vh;
  }
</style>
