import axios from "axios";
import qs from "qs";
import {Toast} from 'vant';

const Axios = axios.create({
    // baseURL: isDebug ? "/" : "https://activity.baiyaodajiankang.com", // 因为我本地做了反向代理
    baseURL: "/", // 因为我本地做了反向代理
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (config.method === "post") {
            // 序列化
            if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
                // 序列化
                config.data = qs.stringify(config.data);
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error.message);
    }
);
// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res.data && res.data.success !== 1000) {
            if (res.data.success === 2000) {
                // alert(res.data.msg);
                Toast(res.data.msg);
            } else if (res.data.success === 3000) {
                // alert("内部错误,请联系平台开发人员");
                Toast("出错了,请重试或联系开发人员");
            }

            return Promise.reject(res.data);
        }
        return Promise.resolve(res.data);
    },
    error => {
        Toast("出错了,请重试或联系开发人员");
        return Promise.reject(error);
    }
);
// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$api", {value: Axios});
    }
};
