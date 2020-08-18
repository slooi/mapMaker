import tex from './tex'
const canvas = document.createElement('canvas')
const canvas2 = document.createElement('canvas')
const app = document.getElementById('app')
let bDiameter = 16
let bMapWidth = 10
let bMapHeight = 10
canvas.width = bDiameter*bMapWidth
canvas.height = bDiameter*bMapHeight
let fWidth = canvas.width//bDiameter*10//
let fHeight = canvas.height//bDiameter*10//
app!.style.width = fWidth+'px'
app!.style.height = fHeight+'px'
canvas.style.width = fWidth+'px'
canvas.style.height = fHeight+'px'
document.getElementById('app')!.append(canvas)
document.getElementById('app')!.append(canvas2)

var c = canvas.getContext('2d')
tex(c)

let blockType = 1

let map:number[][]


createMap(bMapWidth,bMapHeight)

interface Mouse{
    down: boolean,
    x: undefined|number,
    y:undefined|number
}

const mouse:Mouse = {
    down: false,
    x: undefined,
    y:undefined
}

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


function processMouseDown(mouseDown:boolean|undefined,e:MouseEvent):void{
    if(mouseDown!==undefined){
        mouse.down = mouseDown
    }
    const mX = e.offsetX
    const mY = e.offsetY
    if(mX<fWidth && mY<fHeight){
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

function loop(){
    
    render()
    requestAnimationFrame(loop)
}
loop()

function placeBlock(offX:number,offY:number){
    const indexX:number = Math.floor(offX/bDiameter)
    const indexY:number = Math.floor(offY/bDiameter)
    console.log(indexX,indexY)
    map[indexY][indexX] = blockType
}

const type = document.getElementById('type')
type!.innerText = String(blockType)




