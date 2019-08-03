const baseUrl = process.env.API_PREFIX;
const urls = {
    getShareInfo:``,
    getWXConfig:``,
    getOpenId:``
};

export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$urls", {value: urls});
    }
};
