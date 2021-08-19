<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.png">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active:currentTitle===index}" @click="itemClick(index)">{{item}}</div>
      </div>
      <div slot="right">...</div>
    </nav-bar>
  </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components:{
          NavBar
        },
        data(){
          return {
            titles:['商品','参数','评论','推荐'],
            currentTitle:0
          }
        },
        methods:{
          itemClick(index){
            this.currentTitle=index;
          },
          backClick(){
            this.$router.back();
          }
        }
    }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }
  .back{
    margin-top: 8px;
  }
  .back img{
    width: 24px;
    height: 24px;
  }
</style>
