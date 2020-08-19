// ##################
// IMPORTS
// ##################

// Import modules
import tex from './tex'
import './style.css'

// ##################
//  SCHEMA
// ##################

let map:number[][]

interface Mouse{
    down: boolean,
    x: undefined|number,
    y:undefined|number
}

// ##################
// INITIALISATION
// ##################

// Get DOM elements
const canvas = document.createElement('canvas')
const texCanvas = document.createElement('canvas')

const type = document.getElementById('type')


// Initalise user-accessible variables
let bDiameter = 16      // block diameter
let bMapWidth = 10      // map witdth in blocks
let bMapHeight = 10     // map height in blocks
let blockType = 1

// Adjust canvas dimensions
canvas.width = bDiameter*bMapWidth
canvas.height = bDiameter*bMapHeight
canvas.style.width = canvas.width+'px'
canvas.style.height = canvas.height+'px'

// Initialise System Variables/Constants
let fWidth = canvas.width 
let fHeight = canvas.height
const mouse:Mouse = {
    down: false,
    x: undefined,
    y:undefined
}


// Append Canvases to DOM
document.body.append(canvas)
document.body.append(texCanvas)

var c = canvas.getContext('2d')

// Initialise tex
tex(c)

// ##################
//  MAIN
// ##################


setBlockType(blockType)

createMap(bMapWidth,bMapHeight)

// Main loop
function loop(){
    
    render()
    requestAnimationFrame(loop)
}
loop()



// ##################
//  FUNCTIONS
// ##################


function placeBlock(offX:number,offY:number){
    const indexX:number = Math.floor(offX/bDiameter)
    const indexY:number = Math.floor(offY/bDiameter)
    console.log(indexX,indexY)
    map[indexY][indexX] = blockType
}


function setBlockType(blockType:number){
    type!.innerText = String(blockType)
}



function processMouseDown(mouseDown:boolean|undefined,e:MouseEvent):void{
    if(mouseDown!==undefined){
        mouse.down = mouseDown
    }
    const mX = e.offsetX
    const mY = e.offsetY
    if(mX<fWidth && mY<fHeight && mX>=0 && mY>=0){
        mouse.x = mX
        mouse.y = mY
        console.log(mouse.x,mouse.y)
        if(mouse.down){
            placeBlock(mouse.x,mouse.y)
        }
    }
}

function createMap(width:number,height:number){
    map = new Array(height).fill(0).map(()=>new Array(width).fill(-1))
}

// Re-renders canvas
function render(){
    c!.clearRect(0,0,fWidth,fHeight)
    for(let i=0;i<bMapHeight;i++){
        for(let j=0;j<bMapWidth;j++){
            const val = map[i][j]
            if(val===1){
                c!.fillStyle = 'green'
            }
            if(val===2){
                c!.fillStyle = 'yellow'
            }
            if(val !==-1){
                c!.fillRect(j*bDiameter,i*bDiameter,bDiameter,bDiameter)
            }
        }
    }
}




// ##################
//  EVENTLISTENERS
// ##################

canvas.addEventListener('mousedown',e=>{
    processMouseDown(true,e)
})
canvas.addEventListener('mousemove',e=>{
    processMouseDown(undefined,e)
})
canvas.addEventListener('mouseup',e=>{
    processMouseDown(false,e)
})

window.addEventListener('keydown',e=>{
    console.log(e)
    const key = e.key
    const keyCode = e.keyCode
    if(keyCode>=48 && keyCode<=57){
        blockType = Number(key)
    }
})
