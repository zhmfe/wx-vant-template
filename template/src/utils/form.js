import validator from './validator';

export default {
    data() {
        return {
            data: {},
            errorMsg: {},
        };
    },
    methods: {
        focusIn() {
            // ios键盘弹出底部留白问题
            const body = document.querySelector('.van-field__body'); // input所在的容器
            body.scrollTop = body.scrollHeight
        },
        blurIn() {
            // ios键盘弹出底部留白问题
            window.scroll(0, 0)
        },
        /**
         * 清除验证提示
         * @param attrs
         */
        resetField(attrs) {
            attrs = !attrs ? Object.keys(this.errorMsg) : ( Array.isArray(attrs) ? attrs : [attrs]);
            attrs.forEach(attr => {
                this.errorMsg[attr] = ''
            })
        },
        /**
         * 验证方法
         * @param callback
         * @param data
         */
        validate(callback, data) {
            this.validator.validate((errors, fields) => {
                this.resetField();
                if (errors) {
                    fields.forEach(item => {
                        this.errorMsg[item.field] = item.message
                    })
                }
                callback && callback(errors, fields)
            }, data);
        },
        submit() {
            return new Promise((resolve, reject) => {
                this.validate((errors, fields) => {
                    if (errors) {
                        reject(errors);
                    }
                    resolve(fields);
                });
            });
        },
        reset() {
            this.data = {};
            this.validator.setData(this.data);
            this.resetField();
        },
        getForm() {
            return this.data;
        },
        getError() {
            return this.errorMsg;
        }
    },
    created() {
        this.validator = validator(this.rules, this.data);
    },
};
