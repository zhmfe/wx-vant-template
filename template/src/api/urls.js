const baseUrl = process.env.API_PREFIX;
const urls = {
 
};

export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$urls", {value: urls});
    }
};
