import {getUrlQuery} from "../utils/util";
import {getStore, setStore,removeStore} from "../utils/storage";

const paramsMixin = {
    mounted: function() {
        this.setIdsMixin();
    },
    methods: {
        setIdsMixin() {
            let id = this.getQueryByKeyMixin('id');
            let idCache = getStore('id');
            if (id && id != idCache) {
                setStore('id', id);
                setStore('parameter_changed', '1');
            
            }

        },
        getQueryByKeyMixin(key) {
            let val;
            if (this.$route.query[key]) {
                val = this.$route.query[key];
            } else {
                val = getUrlQuery(key);
            }
            return val;
        }
    }
};

export default paramsMixin;
