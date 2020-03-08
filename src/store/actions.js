import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default{
    addCart(context,payload){
        return new Promise((resolve,reject) =>{
        //payload新添加的商品
        //查找之前数组中是否有该商品 
        // let oldProduct = null
        // for(let item of state.cardList){
        //     if(item.iid ===payload.iid){
        //         oldProduct=item
        //     }
        // }
        let oldProduct = context.cardList.find(item => item.iid === payload.iid)

        //2.判断oldProduct的数量是否需要增加
        if(oldProduct){
            //oldProduct.count +=1
            context.commit('ADD_COUNTER',oldProduct)
            resolve('当前的商品数量+1')
        }else{
            payload.count=1
        //context.state.cartList.push(payload) 
            context.commit('ADD_TO_CART',payload)
            resolve('添加了新的商品')
        }
        })

    }
}