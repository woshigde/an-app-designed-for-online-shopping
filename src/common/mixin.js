import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin ={
    component:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false

        }
    },
    methods:{
        backClick(){
            //console.log('回到顶部')
           // console.log(this.$refs.scroll.message)
            this.$refs.scroll.scrollTo(0,0,300)
        }
    }
}