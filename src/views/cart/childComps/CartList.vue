<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <CartListItem v-for="(item,index) in cartList" :product="item" :key="index"></CartListItem>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
    name:"CartList",
    components:{
        Scroll,
        CartListItem
    },
    data(){
        return{
            cartList:$store.state.cartList
        }
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list{
    height: calc(100%-44px-49px-40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>