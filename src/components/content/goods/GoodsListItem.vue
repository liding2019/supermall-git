<template>
    <div class="goods-item" @click="itemClick">
      <img :src="goodsItem.image" alt="" @load="imageLoad">
      <div class="good-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="stars">{{goodsItem.stars}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props:{
        goodsItem:{
          type:Object,
          default(){
            return {}
          }
        }
      },
      methods:{
        imageLoad(){
          this.$bus.$emit('itemImageLoad');
        },
        itemClick(){
          this.$router.push('/detail/'+this.goodsItem.id)
        }
      }
    }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .good-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .good-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .good-info .price{
    color: #ff5577;
    margin-right: 20px;
  }
  .good-info .stars{
     position: relative;
  }
  .good-info .stars::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;

  }
</style>
