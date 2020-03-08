<template>
  <!-- <h2>购物车</h2> -->
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>

    <!-- 商品的列表 -->
    <CartList></CartList>

    <!-- 商品汇总 -->
    <CartBottomBar></CartBottomBar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}

  .nav-bar{
    background-color: var(--color-tint);
    color:#fff
  }
</style>
