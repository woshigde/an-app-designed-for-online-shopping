
<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       
      <!-- 滚动障眼法
      两个问题：①下面的商品内容会突然上移 ②tabControl虽然设置了fixed，但也随着Better-Scroll一起滚动出去了
      解决方法：1.在最上面多复制了一份TabControl组件对象，利用它来实现停留效果
      2.当用户滚动到一定位置时，TabControl显示出来
      3.当用户滚动没有到达一定位置时，就隐藏 -->
      <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" v-show="isTabFixed"></TabControl>

      <!-- Home.vue和Scoll.vue之间进行通信，Home.vue将probetye设置为3，Scroll.vue需要通过$emit,实时将事件发送到home.vue -->
      <!-- <Scroll class="content" ref="scroll" :probe-type="3"
              @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"> -->
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatureView></FeatureView>
        <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></TabControl>
        <GoodList :goods="showGoods"></GoodList>
      <!-- </Scroll> -->
      <!-- //native 监听组件根事件的原生事件 -->
      <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>

      <ul>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
                <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
                <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>
        <li>hahaha</li>


      </ul> 
    </div>
</template>
 
<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home" //只有default导出才能省去大括号

  export default{
      name:"Home",
      components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop,
      },
      data(){
        return{
          banners:[],
          recommends:[],
          //设计数据结构，用于保存数据
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType:'pop',
          isShowBackTop:false,
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0

        }
      },
      //在home.js中封装getHomeGoods(type,page)
      //在Home.vue中又在methods中getHomeGoods(type)
      //调用getHomeGoods('pop')等
      //page:动态的获取对应的page
      //获取到数据：res  this.goods[type].list.push(...res.data.list)  this.goods[type].page +=1

      created(){
        //`1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      mounted(){
        //3.监听item中图片加载完成
        this.$bus.$on('itemImageLoad',()=>{
          this.$refs.scroll.scroll.refresh()
        })
      },
      activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0),
        this.$refs.scroll.refresh()
      },
      deactivated(){
        this.saveY=this.$refs.scroll.getScrollY
      },
      methods:{
        //事件监听相关的方法
        tabClick(index){
          switch(index){
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='sell'
              break
          }
        },

        //position是坐标形式，检测下滑到什么位置出现返回顶部的图标
        contentScroll(position){
          console.log(position)
          //1.判断BackTop是否显示
          this.isShowBackTop=-(position.y)>1000

          //2.tabControl是否吸顶（position:fixed）
          this.isTabFixed =(-position.y)>this.tabOffsetTop
        },

        loadMore(){
          console.log('上拉加载更多')
          this.getHomeGoods  (this.currentType)

          this.$refs.scroll.refresh()
        },
        SwiperImageLoad(){
                  //1.获取tabControl的offsetTop
        //要拿的不是组件，是组件中的元素div。
        //所有组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
        },




        // 网络请求相关的方法

        getHomeMultidata(){
          getHomeMultidata().then(res =>{
          //console.log(res);
          //this.result=res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        },

        getHomeGoods(type){
          const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res =>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            //完成上拉加载更多
            this.$refs.scroll.finishPullUp()
        })
        },

        backClick(){
          //console.log('回到顶部')
         // console.log(this.$refs.scroll.message)
          this.$refs.scroll.scrollTo(0,0,300)
        }
      }
  } 
</script> 

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 针对自带的滚动的（整体滚动），但better-scroll是部分滚动（限定好范围）没必要再对导航栏单独设置固定了
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    /* 导航条移动，到某一位置停下 */
    /* 这中吸顶方法只有在自带的滚动下才起作用 */
    position: relative;  
    z-index:9px
  }
  
  .content{
    /* height: 300px;
    overflow: hidden; */

    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } 

  .fixed{
    position: fixed;
    left:0;
    right:0;
    top:44px
  }
</style> 
