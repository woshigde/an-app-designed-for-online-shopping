<template>
    <div  ref="wrapper" class="wrapper">
        <!-- <div class="content"> -->
            <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:"Scroll",

    //因为不确定某些模块是否需要监听滚动位置，所以封装scroll组件时，probetype设置成属性值
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false 
        }
    },
    data(){
        return {
            scroll:null,
            message:111
        }
    },
    mounted(){
        // 万一有不止一个类是wrapper，则通过query取元素不准确
        // this.scroll = new BScroll(document.querySelector('.wrapper'),{
        // })

        // 1.创建BScroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        this.$nextTick(() => {
    if (!this.scroll) {
	this.scroll = new BScroll(this.$refs.wrapper, {})
	console.log(this.scroll)
    }
        })
        
        // 2.监听滚动的位置
        this.scroll.on('scroll',(position) => {
            //console.log(position)
            //将scoll里面的position发送出去
            this.$emit('scroll',position)
            
        })

        //Better-scroll在决定有多少区域可以滚动时，是根据scrollHeight属性决定
        //scrollHeight属性是根据放Better-Scroll的content中的子组件的高度
        //但在首页中。刚开始计算scrollHeight属性时，是没有将图片计算在内的
        //监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次refresh()
        this.scroll.refresh()

        //3. 监听上拉事件，滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
        })
        }

    }, 
    methods:{
         // 默认在300毫秒之内回到顶部
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
    }
}
</script>

<style scoped>


</style>