<template>
    <div class="goods-item" @click="itemClick">
        <img :src="showImage" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <!-- 收藏 -->
            <span class="collect">{{goodsItem.cfav}}</span> 
        </div>
    </div>
</template>

<script>
export default {
    name:"GoodsList",
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
        //将GoodsListItem.vue中的事件传入到home.vue中，非父子组件通信
        // $bus不存在，在main.js中声名原型
          this.$bus.$emit('itemImageLoad')
        // if(this.$route.path.indexOf('/nome')){
        //   this.$bus.$emit('itemImageLoad')
        // }else if(this.$route.path.indexOf('./detail')){
        //   this.$nus.$emit('detailImageLoad')
        // }
      },
      itemClick(){
        console.log('跳转到详情页')
        //返回某一具体商品的信息
        this.$router.push('/detail'+this.goodsItem.iid)
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }

</style> 