<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {getUrlQuery} from "./utils/util";
    import wx from 'weixin-js-sdk';
    import VConsole from 'vconsole';
    import paramsMixin from "./common/paramsMixin";
    import {baseUrl,isDebug,appId} from "./config";
    import {getStore, setStore, removeStore} from "./utils/storage";

    export default {
        name: 'App',
        mixins: [paramsMixin],
        data() {
            return {
                id: "",
                url: '',
                sharingTitle: "",
                sharingDesc: "",
                sharingImg: "",
                mapInfo: {
                    longitude: "",
                    latitude: "",
                    signUpAddress: "",
                },
            }
        },
        mounted() {
            if(isDebug){
                new VConsole();
            }
            this.getSharingInfo();
            this.setUrl();
            this.refine();
            this.getWxAuth();
            this.getConfig();
            this.wxReady();
        },
        methods: {
            setUrl() {
                this.url = window.location.href;
            },
            getSharingInfo(cb) {
                let id = getStore('id');
                this.$api.post(this.$urls.getShareInfo, {id}).then(res => {
                    document.title = res.data.theme;
                    this.sharingTitle = res.data.theme;
                    this.sharingDesc = res.data.meetingTime;
                    this.sharingImg = res.data.pictureUrl;
                    setStore('themeTitle',res.data.theme);
                    removeStore('parameter_changed');
                    cb && cb();
                });
            },
            getShareUrl() {
                let id = getStore('id');
                return `${baseUrl}/index?id=${id}`;
            },
            getAddress() {
                console.log("执行getAddress")
                let that = this;
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        that.mapInfo.longitude = res.longitude;
                        that.mapInfo.latitude = res.latitude;
                        let geocoder = new qq.maps.Geocoder({
                            complete: function (result) {
                                that.mapInfo.signUpAddress = result.detail.address;
                                console.log('set-mapInfo', JSON.stringify(that.mapInfo));
                                setStore('mapInfo', JSON.stringify(that.mapInfo))
                            }
                        });
                        let coord = new qq.maps.LatLng(res.latitude, res.longitude);
                        geocoder.getAddress(coord);
                    }
                });
            },
            wxReady() {
                wx.error(err => {
                    console.log('wx err', err);
                });
                wx.ready(() => {
                    this.getAddress();
                    let link = this.getShareUrl();
                    let protocol = window.location.protocol;
                    let host = window.location.host;
                    wx.updateAppMessageShareData({
                        title: this.sharingTitle, // 分享标题
                        desc: this.sharingDesc, // 分享描述
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.sharingImg, // 分享图标
                    });
                    wx.updateTimelineShareData({
                        title: this.sharingTitle, // 分享标题
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.sharingImg, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: this.sharingTitle, // 分享标题
                        desc: this.sharingDesc, // 分享描述
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.sharingImg, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
// 用户点击了分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: this.sharingTitle, // 分享标题
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.sharingImg, // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        },
                    });
                })
            },
            getConfig() {
                let url = location.href;
                this.$api.post(this.$urls.getWXConfig, {url}).then(res => {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appid, // 必填，公众号的唯一 标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo',
                            'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                            'updateAppMessageShareData',//分享给好友
                            'updateTimelineShareData',//分享到朋友圈
                            'openLocation',//使用微信内置地图查看位置接口
                            'getLocation',//获取地理位置接口
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                })

            },
            getWxAuth() {
                if (getStore('wx_openid')) {
                    return
                }
                this.code = getUrlQuery('code');
                if (this.code) {
                    this.getOpenId(this.code);
                } else {
                    if (!isDebug) {
                        window.location.href =
                            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(this.url)}&response_type=code&scope=snsapi_base`;
                    }
                }
            },
             getOpenId(code) {
                this.$api.post(this.$urls.getOpenId, {code}).then(res => {
                    this.openid = res.openid
                    setStore('wx_openid', this.openid);
                    location.href = this.url;
                })
            },
            refine() {
                window.alert = function (name) {
                    let iframe = document.createElement("IFRAME");
                    iframe.style.display = "none";
                    iframe.setAttribute("src", 'data:text/plain,');
                    document.documentElement.appendChild(iframe);
                    window.frames[0].window.alert(name);
                    iframe.parentNode.removeChild(iframe);
                };
                window.confirm = function (message) {
                    let iframe = document.createElement("IFRAME");
                    iframe.style.display = "none";
                    iframe.setAttribute("src", 'data:text/plain,');
                    document.documentElement.appendChild(iframe);
                    let alertFrame = window.frames[0];
                    let result = alertFrame.window.confirm(message);
                    iframe.parentNode.removeChild(iframe);
                    return result;
                };
            }
        },
        watch: {
            $route() {
                //这是Android平台下浏览器
                if (/android/i.test(navigator.userAgent)) {
                    // 安卓平台下路由改变时，重新配置微信分享
                    this.getConfig();
                }

                let flag = getStore('parameter_changed');
                if (flag) {
                    this.getSharingInfo(() => {
                        this.wxReady();
                    });
                } else {
                    this.wxReady();
                }
            }
        },
    }
</script>

<style>
    @import "../static/css/main.css";
</style>
