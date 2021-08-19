<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-contorl class="tab-contorl"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 :class="{tabFiexd:isTabFixed}"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommend"/>
      <feature-views/>
      <tab-contorl class="tab-contorl" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" :class="{tabFiexd:isTabFixed}"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>

  </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureViews from "./childComps/FeatureViews";
    import GoodList from "components/content/goods/GoodList";

    import TabContorl from "components/content/tabControl/TabContorl";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/common/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "../../network/home";


    export default {
        name: "Home",
        components:{
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureViews,
          GoodList,
          Scroll,
          BackTop,
          TabContorl

        },
        data(){
          return {
            banners :[],
            recommend:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShow:false,
            tabOffSetTop:0,
            isTabFixed:false,
            saveY:0
          }
        },
        computed:{
          showGoods(){
            return this.goods[this.currentType].list;
          }
        },
        destroyed() {
        },
        activated() {
          this.$refs.scroll.scrollTo(0,this.saveY,0);
        },
        deactivated() {
          this.saveY=this.$refs.scroll.getScrollY();
        },
        created() {
            //1.请求多个数据
            this.getHomeMultidata();

            //2.请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');


          },
          mounted() {
            //3.监听item中图片加载完成
            const refresh=this.debounce(this.$refs.scroll.refresh,50)
            this.$bus.$on('itemImageLoad',()=>{
              refresh();
            });
          },
          methods:{
          debounce(func,delay){
            let timer=null;
            return function (...args) {
              if(timer) clearTimeout(timer);
              timer=setTimeout(()=>{
                func.apply(this,args);
              },delay)
            }
          },
          /**
           * 事件监听相关方法
           * */
          tabClick(index){
            switch (index) {
              case 0:
                this.currentType='pop';
                break;
              case 1:
                this.currentType='new';
                break;
              case 2:
                this.currentType='sell';
                break;
            }
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
          },


          backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
          },

          contentScroll(position){
            //判断backTop按钮是否显示
            this.isShow=-position.y>1000;

            //决定tabcontrol是否吸顶（position:fixed）
            this.isTabFixed=(-position.y) > this.tabOffSetTop;



          },
          loadMore(){
            this.getHomeGoods(this.currentType);
            this.$refs.scroll.refresh();
          },

          swiperImageLoad(){
            //获取tabControl组件的offsettop
            //所有组件都有一个$el属性，用于获取组件中的元素
            this.tabOffSetTop=this.$refs.tabControl2.$el.offsetTop;
          },
          /**
           * 网络请求相关方法
           */
          getHomeMultidata(){
            getHomeMultidata().then(res => {
              this.banners=res.data.banner.list;
              this.recommend=res.data.recommend.list;
            })
          },
          getHomeGoods(type){
            const page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res =>{
              this.goods[type].list.push(...res.data);
              this.goods[type].page+=1;
              this.$refs.scroll.finishPullUp();
            })
          }
        }
    }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: #ff8198;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-contorl{
    position: relative;
    z-index: 9;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
