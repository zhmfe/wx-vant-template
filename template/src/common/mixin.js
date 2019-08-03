const mixin = {
    data(){
        return {
            symptomList:[],
            bgList:[
                {
                    color: "rgba(255,112,82,0.2)",
                    active: "static/img/symptom/symptom-active-icon1.png",
                    default: "static/img/symptom/symptom-icon1.png"
                },
                {
                    color: "rgba(138,198,68,0.2)",
                    active: "static/img/symptom/symptom-active-icon2.png",
                    default: "static/img/symptom/symptom-icon2.png"
                },
                {
                    color: "rgba(155, 89, 182, 0.2)",
                    active: "static/img/symptom/symptom-active-icon3.png",
                    default: "static/img/symptom/symptom-icon3.png"
                },
                {
                    color: "rgba(245, 152, 5, 0.2)",
                    active: "static/img/symptom/symptom-active-icon4.png",
                    default: "static/img/symptom/symptom-icon4.png"
                },
                {
                    color: "rgba(62, 127, 250, 0.2)",
                    active: "static/img/symptom/symptom-active-icon5.png",
                    default: "static/img/symptom/symptom-icon5.png"
                },
                {
                    color: "rgba(250, 206, 27, 0.2)",
                    active: "static/img/symptom/symptom-active-icon6.png",
                    default: "static/img/symptom/symptom-icon6.png"
                },
                {
                    color: "rgba(81, 176, 181, 0.2)",
                    active: "static/img/symptom/symptom-active-icon7.png",
                    default: "static/img/symptom/symptom-icon7.png"
                },
                {
                    color: "rgba(251, 51, 83, 0.2)",
                    active: "static/img/symptom/symptom-active-icon8.png",
                    default: "static/img/symptom/symptom-icon8.png"
                },
                {
                    color: "rgba(29, 169, 255, 0.2)",
                    active: "static/img/symptom/symptom-active-icon9.png",
                    default: "static/img/symptom/symptom-icon9.png"
                },
                {
                    color: "rgba(153, 203, 43, 0.2)",
                    active: "static/img/symptom/symptom-active-icon10.png",
                    default: "static/img/symptom/symptom-icon10.png"
                },
                {
                    color: "rgba(161, 91, 255, 0.2)",
                    active: "static/img/symptom/symptom-active-icon11.png",
                    default: "static/img/symptom/symptom-icon11.png"
                },
            ]
        }
    },
    mounted() {

    },
    methods: {
        async getSymptomList() {
            let res = await this.$api.post(this.$urls.symptomList);
            let list = [];
            res.symptomList.map(i=>{
                list.push({
                    id:i.symptomId,
                    name:i.symptomName,
                    checked:false
                })
            });
            this.symptomList = list;
        }
    }
};

export default mixin;
