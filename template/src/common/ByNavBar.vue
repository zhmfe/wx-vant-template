<template>
    <div class="ByNavBar" style="height: 46px">
        <van-nav-bar :title="title" :left-text="leftTitle" :left-arrow="leftArrow" :right-text="rightTitle"
                     fixed @click-left="leftAction" @click-right="rightAction">
            <van-icon name="weapp-nav" slot="right" v-if="rightIcon" />
        </van-nav-bar>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getStore} from "../utils/storage";
    import bus from './bus';

    export default {
        name: "ByNavBar",
        props:{
            title:{
                type:String,
                default:"标题"
            },
            leftArrow:{
              type:Boolean,
              default:true
            },
            rightIcon:{
                type:Boolean,
                default:false
            },
            leftTitle:{
                type:String,
                default:""
            },
            rightTitle:{
                type:String,
                default:""
            },
            rightMethod:{
                type:String,
                default:""
            },
            leftMethod:{
                type:String,
                default:""
            }
        },
        methods:{
            rightAction(){
                this.$emit(this.rightMethod)
            },
            leftAction(){
                if(this.leftMethod){
                    this.$emit(this.leftMethod)
                }else{
                    this.goBack()
                }
            },
            goBack(){
                this.$router.back()
            },
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .ByNavBar
        background #F2F3F6
    >>>.van-nav-bar--fixed
        z-index 999!important
</style>
