<template>
    <div class="wrapper">
        <div class="content" style="margin-bottom: 50px">
            <transition name="move" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vFoot from "./Footer.vue";

    export default {
        data() {
            return {};
        },
        components: {
            vFoot
        },
        created() {

        },
        methods: {}
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .wrapper
        height 100vh
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
        overflow scroll
        background #F4F4F4
    .content
        width: 100vw;
        /*position fixed*/
</style>
