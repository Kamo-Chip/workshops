const container = document.querySelector("#container");
const body = document.querySelector("body");
const clear = document.querySelector(".clear-btn");
const colorPick = document.querySelector("#color");
const rainbow = document.querySelector("#rainbow");
const erase = document.querySelector("#erase");
const slider = document.querySelector(".slider");

let grid = 0;
let squares;

slider.oninput = function(){
grid = slider.value;
for(let i = 0; i < squares.length; i++){
    container.removeChild(squares[i]);
}
initialise(grid);
}

function initialise(gridNumber){
    let gridArea = gridNumber * gridNumber;
    squares = new Array(gridArea);
    for(let i = 0; i < gridArea; i++){
        squares[i] = document.createElement("div");
        squares[i].classList.add("block");
        container.style.gridTemplateColumns = `repeat(${gridNumber},auto)`;
        container.style.gridTemplateRows = `repeat(${gridNumber}, auto)`;
        container.appendChild(squares[i]);
    }
} 

function rainbowColor(){
    let randomColor = "#"+Math.floor(Math.random()*16600000).toString(16);
    return randomColor;
}

rainbow.addEventListener("click",changeColor);

function changeColor(e){
    if(e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "rgb(255, 255, 255)"){
        if(rainbow.checked == true){
            erase.checked = false;
            e.target.style.backgroundColor = rainbowColor();
        }else{
            e.target.style.backgroundColor = colorPick.value;
        }
    }
    
}

function eraseBlock(e){
    e.target.style.backgroundColor = "#fff";
    rainbow.checked = false;
}

window.addEventListener("mouseover", function(e){
    if((e.target.style.backgroundColor != "rgb(255, 255, 255)" || e.target.style.backgroundColor != "") && e.target.className == "block" && erase.checked == true){
        eraseBlock(e);
    }
})
function clearColor(){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = "#fff";
    }
}

clear.onclick = clearColor;
document.addEventListener("mouseover", function(e){
    if(e.target.className == "block"){
        changeColor(e);
    }else if(e.target.class != "block"){
    }
});

initialise(4);

