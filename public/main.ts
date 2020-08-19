// ##################
// IMPORTS
// ##################

// Import modules
import tex from './tex'
import sidebar from './sidebar'
import './style.css'

// ##################
//  SCHEMA
// ##################

let map:number[][][]

interface Mouse{
    down: boolean,
    x: undefined|number,
    y:undefined|number
}

// ##################
// INITIALISATION
// ##################

// Get DOM elements
/** @type {HTMLCanvasElement} */
const canvas = <HTMLCanvasElement> document.getElementById('canvas')
// const type = document.getElementById('type')
// const mapWidthInput = document.getElementById('map-width-input') as HTMLInputElement
// const mapHeightInput = document.getElementById('map-height-input') as HTMLInputElement


const inputs = document.getElementsByTagName('input')

var c = <CanvasRenderingContext2D>canvas.getContext('2d')

// Initalise user-accessible variables
let bDiameter = 16      // block diameter
let bMapWidth = 20      // map witdth in blocks
let bMapHeight = 20     // map height in blocks
let blockType = [0,0]

// Adjust canvas dimensions
let fWidth = 0
let fHeight = 0

//  Canvas
setCanvasSize()
function setCanvasSize(){
    canvas.width = bDiameter*bMapWidth
    canvas.height = bDiameter*bMapHeight
    canvas.style.width = canvas.width+'px'
    canvas.style.height = canvas.height+'px'
    fWidth = canvas.width 
    fHeight = canvas.height
}


// Initialise System Variables/Constants

const mouse:Mouse = {
    down: false,
    x: undefined,
    y:undefined
}


// Initialise tex
const texObj = tex(blockType,setBlockType)
texObj.update(fWidth,fHeight,bDiameter)
sidebar()

// ##################
//  MAIN
// ##################


// setBlockType(blockType)

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
    if(texObj.imported === true){
        const indexX:number = Math.floor(offX/bDiameter)
        const indexY:number = Math.floor(offY/bDiameter)
        map[indexY][indexX] = [...blockType]
    }
}


// function setBlockType(blockType:number){
    // type!.innerText = String(blockType)
// }



function processMouseDown(mouseDown:boolean|undefined,e:MouseEvent|undefined):void{
    if(mouseDown!==undefined){
        mouse.down = mouseDown
    }
    if(e!==undefined){
        const mX = e.offsetX
        const mY = e.offsetY
        if(mX<bMapWidth*bDiameter && mY<bMapHeight*bDiameter && mX>=0 && mY>=0){
            mouse.x = mX
            mouse.y = mY
            if(mouse.down){
                placeBlock(mouse.x,mouse.y)
            }
        }
    }
}

function createMap(width:number,height:number){
    map = new Array(height).fill(0).map(()=>new Array(width).fill(-1))
}
function changeMapWidth(newWidth:number){
    const dx = newWidth-bMapWidth
    if(dx>0){
        // Longer width
        for(let i=0;i<map.length;i++){
            map[i].push(...new Array(dx).fill(-1))
        }
    }else{
        // SHorter width
        for(let i=0;i<map.length;i++){
            for(let j=0;j<Math.abs(dx);j++){
                map[i].pop()
            }
        }
    }


    bMapWidth= newWidth
    setCanvasSize()
}
function changeMapHeight(newHeight:number){
    const dy = newHeight-bMapHeight
    if(dy>0){
        // Longer Height
        for(let i=0;i<dy;i++){
            map.push(new Array(map[0].length).fill(-1))
        }
    }else{
        // Shorter Height
        map.length = newHeight
    }


    bMapHeight= newHeight
    setCanvasSize() 
}

// Re-renders canvas
function render(){
    c!.clearRect(0,0,fWidth,fHeight)
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){
            const blockType = map[i][j]
            const rowI = blockType[0]
            const colI = blockType[1]
            // if(val===1){
            //     c!.fillStyle = 'green'
            // }
            // if(val===2){
            //     c!.fillStyle = 'yellow'
            // }
            // if(val !==-1){
            //     c!.fillRect(j*bDiameter,i*bDiameter,bDiameter,bDiameter)
            // }
            c.drawImage(texObj.canvas,rowI*bDiameter,colI*bDiameter,bDiameter,bDiameter,j*bDiameter,i*bDiameter,bDiameter,bDiameter)
        }
    }
}




// ##################
//  EVENTLISTENERS
// ##################

window.addEventListener('mousedown',()=>{
    processMouseDown(true,undefined)
})
window.addEventListener('mouseup',()=>{
    processMouseDown(false,undefined)
})
canvas.addEventListener('mousedown',e=>{
    processMouseDown(true,e)
})
canvas.addEventListener('mouseup',e=>{
    processMouseDown(false,e)
})
canvas.addEventListener('mousemove',e=>{
    processMouseDown(undefined,e)
})

window.addEventListener('keydown',e=>{
    const key = e.key
    const keyCode = e.keyCode
    if(keyCode>=48 && keyCode<=57){
        blockType = [Number(key),0]
        // setBlockType(blockType)
    }
})


function updateMapInputs(width:number,height:number){
    inputs[3].value = String(bMapWidth)
    inputs[4].value = String(bMapHeight)
}
updateMapInputs(bMapWidth,bMapHeight)


inputs[0].oninput = function(e:any){
    const val = Number(e.target.value)
    blockType[0] = val
}
inputs[1].oninput = function(e:any){
    const val = Number(e.target.value)
    blockType[1] = val
}

inputs[3].oninput = function(e:any){
    let val = Number(e.target.value)
    if(val===0){
        e.target.value = 1
    }else if(val<800){
    }else{
        e.target.value = 800
    }
    val = Number(e.target.value)
    changeMapWidth(val)
}
inputs[4].oninput = function(e:any){
    let val = Number(e.target.value)
    if(val===0){
        e.target.value = 1
    }else if(val<800){

    }else{
        e.target.value = 800
    }
    val = Number(e.target.value)
    changeMapHeight(val)
}
inputs[3].max = String(800)
inputs[4].max = String(800)

function setBlockType(x:number,y:number){
    blockType[0] = x
    blockType[1] = y
}



function download(){
    let outputMap = []
    for(let i=0;i<map.length;i++){
        outputMap[i] = new Array(map[0].length)
        for(let j=0;j<map[0].length;j++){
            const xI = map[i][j][0]
            const yI = map[i][j][1]

            // RULES
            if(xI === 5 && yI === 0){
                outputMap[i][j] = 1
            }else if(xI === 0 && yI === 1){
                outputMap[i][j] = 2
            }else{
                outputMap[i][j] = 0
            }
        }
    }
    console.log(outputMap)
}