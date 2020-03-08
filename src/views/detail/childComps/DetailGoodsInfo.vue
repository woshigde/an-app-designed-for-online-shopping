<template>
<div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
        <div class="start">
        </div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
        :src="item" @load="imgLoad" alt="">
    </div>
</div>
</template>

<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailInfo:{
            type:Object
        }
    },
    data(){
        return {
            counter:0,
            imagesLenfth:0
        }
    },
    methods:{
        imgLoad(){
            //counter记录图片加载到第几张
            //判断所有图片都记载完了，进行一次回调，刷新只需要刷新一次就可以了
            if(++this.counter === this.imagesLenfth){
                this.$emit('imageLoad')
            }
        }
    },
    watch:{
        detailInfo(){
            //获取图片的个数
            this.imagesLenfth=this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style>

</style>