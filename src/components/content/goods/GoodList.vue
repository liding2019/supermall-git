<template>
    <div class="good">
      <goods-list-item v-for="item in goods" :goods-item="item"/>


    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
      name: "GoodList",
      components:{
        GoodsListItem
      },
      props:{
        goods:{
          type:Array,
          default(){
            return []
          }
        }
      }


    }
</script>

<style scoped>
  .good{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
