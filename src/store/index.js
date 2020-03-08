import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store =new Vuex.Store({
    state:{
        cartList:[]
    },
    //mutation唯一的目的就是修改state中的状态
    //mutation中的每个方法尽可能完成的事情比较单一，下面的mutation就完成了两件事，一件是增加购物车的新种类一件是赠加旧种类的数量
    // mutations:{
    //     // addCart(state,payload){
    //     //     //payload新添加的商品
    //     //     //查找之前数组中是否有该商品 
    //     //     // let oldProduct = null
    //     //     // for(let item of state.cardList){
    //     //     //     if(item.iid ===payload.iid){
    //     //     //         oldProduct=item
    //     //     //     }
    //     //     // }
    //     //     let oldProduct = state.cardList.find(item => item.iid === payload.iid)
 
    //     //     //2.判断oldProduct的数量是否需要增加
    //     //     if(oldProduct){
    //     //         oldProduct.count +=1
    //     //     }else{
    //     //         payload.count=1
    //     //     state.cartList.push(payload) 
    //     //     }
    //     // }

    //     addCounter(state,payload){
    //         payload.count++
    //     },
    //     addToCart(state,payload){
    //         state.cartList.push(payload)
    //     }
    // },

    mutations,

    actions,

    // actions:{
    //     addCart(context,payload){
    //         //payload新添加的商品
    //         //查找之前数组中是否有该商品 
    //         // let oldProduct = null
    //         // for(let item of state.cardList){
    //         //     if(item.iid ===payload.iid){
    //         //         oldProduct=item
    //         //     }
    //         // }
    //         let oldProduct = context.cardList.find(item => item.iid === payload.iid)

    //         //2.判断oldProduct的数量是否需要增加
    //         if(oldProduct){
    //             //oldProduct.count +=1
    //             context.commit('addCounter',oldProduct)
    //         }else{
    //             payload.count=1
    //         //context.state.cartList.push(payload) 
    //             context.commit('addToCart',payload)
    //         }
    //     }
    // }
})

//3.挂载Vue实例上
export default store 