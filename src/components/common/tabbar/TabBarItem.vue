<template>
<div class="tab-bar-item" @click="itemClick">
   <!-- //下面这句点击后字体不变红，因为插槽替换只是把app.vue中<div slot=></div>给换掉 -->
    <!-- <slot :class="{active:isActive}"    name="item-text"></slot>  -->

    <!-- 下面这句话的后果是颜色是写死的
    <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->

    <div :style="activeStyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default{
    name: "TabBarItem",
    props:{
        path:String,//当前item的path,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return {
            //isActive:true
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)  !==-1 //this.$route是当前最活跃的路径
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}

</script>

<style scoped>

.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;

  /* background-position: 0px -30px */
}

.tar-bar-item img{
    width: 14px;
    height: 14px;
}

.active{
    color: red;
}

</style>