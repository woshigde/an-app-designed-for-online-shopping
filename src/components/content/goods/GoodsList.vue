<template>
    <div class="goods">
        <!-- <ul>
            <li>商品列表1</li>
            <li>商品列表2</li>
            <li>商品列表3</li>
            <li>商品列表4</li>
            <li>商品列表5</li>
            <li>商品列表6</li>
            <li>商品列表7</li>
            <li>商品列表8</li>
            <li>商品列表9</li>
            <li>商品列表10</li>
        </ul> -->
        <GoodsListItem v-for="item in goods" :goodsItem="item"></GoodsListItem>
        {{goods}}
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
  
export default { 
    name:"GoodsList",
    components:{
        GoodsListItem
    },
    props:{
        type:Array,
        defalt(){
            return []
        }
    }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap
    }
</style>