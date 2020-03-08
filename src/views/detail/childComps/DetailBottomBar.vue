<template>
<div class="bottom-bar">
    <div class="bar-item bar-left">
        <div>
            <i class="icon service"></i>
            <span class="text">客服</span>
        </div>
        <div>
            <i class="icon shop"></i>
            <span class="text">店铺</span>
        </div>
        <div>
            <i class="icon select"></i>
            <span class="text">收藏</span>
        </div>
    </div>
    <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">购买</div>
    </div>
</div>
</template>

<script>
export default {
    name:"DetailBottomBar",
    methods:{
        addToCart(){
            this.$emit('addCart')
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 49px;
    background: red;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0
}

.bar-item{
    flex:1;
    display: flex
}
</style>