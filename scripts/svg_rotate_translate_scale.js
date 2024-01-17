

const svgRot = document.getElementById("svg-rotate")
const svgScale = document.getElementById("svg-scale")
const svgTrans = document.getElementById("svg-translate")

let currScale = 1;
let currRotate = 0;
let currTrans = 0;
function rotoate() {
    currRotate+=15
    svgRot.setAttribute("transform", `rotate(${currRotate} 40 40)`);
}

function bigger() {
    if(currScale >=1.1) return
    currScale *= 1.1;
    svgScale.setAttribute("transform", `scale(${currScale})`)
}

function smaller() {
    if(currScale <= 0.9) return
    currScale *= 0.9;
    svgScale.setAttribute("transform", `scale(${currScale})`)
}

function translateRight() {
    if (currTrans > 100) return
    currTrans += 5
    svgTrans.setAttribute("transform", `translate(${currTrans})`)
}

function translateLeft() {
    if (currTrans < -50) return
    currTrans -= 5
    svgTrans.setAttribute("transform", `translate(${currTrans})`)
}