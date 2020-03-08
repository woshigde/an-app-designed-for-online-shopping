<template>
    <div class="comment-time">
        <span class="date">{{commentInfo.created | showDate}}</span>
    </div>
</template>

<script>
import {formatDate} from "common/utils"

export default {
    name:"DefaultCommentInfo",
    props:{
        commentInfo:{
            type: Object,
            default(){
                return{}
            }
        }
    },
    filters:{
        showDate(value){
            //1.将时间戳转成Date对象
            const date = new Date(value*1000)

            //2.将date进行格式化
            return formatDate(date,'yyyy-MM-dd')
        }
    }
}
</script>

<style>

</style>