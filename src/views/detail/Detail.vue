<template>
<div id="detail">
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <DetailSwiper :top-images="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
    <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
    <DetailParamInfo ref="params"   :param-info="paramInfo"></DetailParamInfo>
    <DetailCommmentInfo ref="comment" :comment-info="commnetInfo"></DetailCommmentInfo>
    <goodsList ref="recommend"  :goods="recommends"></goodsList>
</scroll>
<DetailBottomBar @addCart="addToCart"></DetailBottomBar>

<BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
<Toast :message="message" :show="show"></Toast>

</div>
</template>
 

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottemBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodsList'
//import Toast from 'components/common/toast/Toast'

import {getDetail,Goods,Shop,GoodsParm,getRecommend} from "network/detail"
import {backTopMixin} from "common/mixin"

export default {
    name:"Detail",
    components:{
        DetailNavBar,  
        DetailSwiper,
        DetailBaseInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottemBar,
        Scroll,
        GoodList,
        //Toast
    },
    mixins:[backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
           // message:'',
            //show:false
        }
    },
    created(){
        //1.保存传入的iid
        this.iid=this.$route.params.iid

        //2，根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            const data=res.result
            //1.获取顶部的图片轮播数据
            this.topImages=res.result.itemInfo.topImages

            //2.获取商品信息
            this.goods=new Goods(data.itemInfo,data.columns,data.showInfo.services )

            //3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //4.保存商品的详情数据
            this.detailInfo=data.detailInfo

            //5.获取参数信息
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //6.取出评论的信息
            if (data.rate.cRate !==0){
                this.commentInfo =data.rate.list[0]
            } 

            this.$nextTick( () => {
                // 根据最新的数据，对应的DOM是已经被渲染出来了
                // 但是图片亦然没有加载完（目前获取的offsettop不包含图片）
                //offsettop值不对，都是图片没加载完
        // this.themeTopYs=[]

        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            })
        })

        //3.请求推荐数据
        getRecommend().then(res =>{
            this.recommends=res.data.list
        })
    },
    mounted(){

    },
    updated(){

    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()

                    this.themeTopYs=[]

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[INDEX],200)
        },
        contentScroll(position){
            console.log(position)
            //1.获取y值
            const positionY = -position.y

            //2.positionY和主题中值进行对比
            //[0,7938,9120,9452]
            //positionY 在 0和7938之间，index=0
            //positionY 在 7938和9120之间，index=1
            //positionY 超过9120，index=3
            let length = this.themeTopYs.length
            for(let i=0;i<length;i++){
                //防止i+1越界
                if(this.currentIndex !== i &&((i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
                || (i=== length-1 && positionY > this.themeTopYs[i])))
                this.currentIndex = i
                //传入导航条组件中的currentIndex
                this.$refs.nav.currentIndex=this.currentIndex
            }

            //3.是否显示回到顶部
            this.isShowBackTop=-(position.y)>1000

        },
        //监听购物车的点击
        addToCart(){
            //1.获取购物车需要展示的信息
            const product ={}
            product.image=this.topImages[0];
            product.title=this.goods.title;
            product.desc=this.goods.desc;
            product.iid=this.iid;
            product.price=this.goods.realPrice

            //2.将商品添加到购物车里
            // this.$store.cardList.push(prodect)
            //addCart在Mutation中的写法
            //this.$store.commit('addCart',product)
            //addCart在action中的写法
            this.$store.dispatch('addCart',product).then(res =>{
                //这里打印的是resolve传来的内容
                console.log(res)
                // this.show=true;
                // this.message=res;

                // setTimeout(() => {
                //     this.show=false;
                //     this.message=''
                // },1500)

                this.$toast.show(res,1500)
            })
        }

    }
}
</script>

<style scoped> 
#detail{
    position: relative;
    z-index:9;
    background-color: #fff; 
    height: 100vh;
}

.content{
    height:calc(100%-44px)
}

.detail-nav{
    position: relative;
    z-index:9
}
</style>