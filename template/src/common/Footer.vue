<template>
    <div class="Footer" v-if="showFooter">
        <van-tabbar v-model="active" active-color="#3E7FFA">
            <van-tabbar-item @click="go('index')">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? home.active : home.normal">
            </van-tabbar-item>
            <van-tabbar-item  @click="go('personal')">
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? my.active : my.normal">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import Bus from "./bus.js";

    export default {
        name: "Footer",
        data() {
            return {
                site: '',
                part: '',
                active: 0,
                home: {
                    normal: require("static/img/home/home.png"),
                    active: require("static/img/home/home-active.png")
                },
                my: {
                    normal: require("static/img/home/my.png"),
                    active: require("static/img/home/my-active.png")
                },
                showFooter: true
            };
        },
        mounted() {
            Bus.$on("footerToggle", footerSwitch => {
                this.showFooter = footerSwitch;
            });
            let path = this.$route.path;
            if (path === "/index") {
                this.active = 0;
            } else if (path === "/personal") {
                this.active = 1;
            }
        },
        methods: {
            go(pagePath){
                this.$router.replace({name:pagePath})
            }
        },
        watch:{
            $route(to,from){
                if (to.path === "/index") {
                    this.active = 0;
                } else if (to.path === "/personal") {
                    this.active = 1;
                }
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .Footer
        width: 100%
        height: 50px
        position absolute
        bottom: 0
</style>
