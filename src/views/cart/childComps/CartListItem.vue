<template>
<div>
    <CheckButton :is-checked='itemInfo.checked' @click.native="checkClick"></CheckButton>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name:"CartListItem",
    components:{
        CheckButton
    },
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        checkClick(){
            this.product.checked=!this.product.checked
        }
    }
}
</script>

<style>

</style>