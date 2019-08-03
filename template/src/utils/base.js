function parseImg(imgSrc) {
    try{
        if(imgSrc){
            return imgSrc
        }else{
            return "static/img/home/store-default.png"
        }

    }catch (e) {
        return ""
    }
}
function parseSex(sex) {
    let sexList = [
            {id: 0, text: "女"},
            {id: 1, text: "男"},
            {id: 2, text: "保密"}
            ];
    try{
        if(sex){
            return sexList.find(i=>{
                return i.id === parseInt(sex)
            }).text;
        }else{
            return ""
        }

    }catch (e) {
        return ""
    }
}

export default function install(Vue, options) {
    Vue.prototype.parseImg = parseImg;
    Vue.prototype.parseSex = parseSex;
}
