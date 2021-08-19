<template>
  <div class="recoment">
    <div v-for="item in recommends" class="recoment-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props:{
          recommends:{
            type:Array,
            default() {
              return [];
            }
          }
        }
    }
</script>

<style scoped>
  .recoment{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recoment-item{
    flex: 1;
  }
  .recoment-item img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

</style>
