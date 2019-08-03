// 基准大小
const baseSize = 32;

function setRem () {
    const scale = document.documentElement.clientWidth / 750;
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}

setRem();

window.onresize = function () {
    setRem()
};
