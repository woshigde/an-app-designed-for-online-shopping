<template>
<div class="bottom-bar">
    <div class="check-content">
    <CheckButton :is-checked="isSeletAll"   class="check-button"
    @click.native="checkClick"></CheckButton>
    <span>全选</span>
    </div>

    <div>
        合计:{{totalPrrice}}
    </div>

    <div class="calculate" @click="calClick">
        去计算:{{checkLength}}
    </div>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter(item =>{
                return item.checked
            }).reduce((preValue,item) =>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSeletAll(){
           // return !(this.$store.state.cartList.filter(item => !item.checked).length)
           return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods:{
        checkClick(){
            if(this.isSeletAll){//全部选中
                this.$store.state.cartList.forEach(item => item.checked=false)}
            else{//部分或全部不选中
                this.$store.state.cartList.forEach(item =>item.checked =true)
        }
        } ,
        calClick(){
            if(!this.isSeletAll){
                this.$toast.show('请选择购买的商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    position: relative;
    bottom: 40px;
    display: flex
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px
}
.check-button{
    width:20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px
}
</style>