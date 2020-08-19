export default function (blockType:number[],setBlockType:Function){
// #######################
//  FILE READER STUFF
// #######################
// const canvas = document.createElement('canvas')
// document.body.append(canvas)


const canvas = <HTMLCanvasElement> document.getElementById('tex-canvas')!
const c = <CanvasRenderingContext2D> canvas!.getContext('2d')//** type {CanvasRenderingContext2D } */ canvas!.getContext('2d')


const displayTextureInput = document.getElementById('display-texture-input') as HTMLInputElement


setCavasSize(100,100)

const fileReader = new FileReader()



const otherCanvas = {
    fWidth:0,
    fHeight:0,
    bDiameter:0,
}

// ##################
//  FUNCTIONS
// ##################

function setCavasSize(w:number,h:number){
    canvas.width = w
    canvas.height = h
    canvas.style.width = w+'px'
    canvas.style.height = h+'px'
}

function findFileType(dataURL:string):string|number{
    const jpegPos = dataURL.search(/jpeg/)
    const pngPos = dataURL.search(/png/)
    let posMin = Math.min(jpegPos, pngPos)
    let posMax = Math.max(jpegPos, pngPos)
    let pos
    console.log('posMin',posMin,'posMax',posMax)
    if(posMin===-1){
        pos = posMax
    }else{
        pos = posMin
    }
    console.log('pos',pos)
    if(pos !== -1 && pos < 16){
        return jpegPos ? '.jpeg' : '.png'
    }
    return -1
}


// ##################
//  EVENTLISTENERS
// ##################

fileReader.onload = function(e:any){
    console.log(e.currentTarget?.result)
    if(e.currentTarget !== undefined){
        // If input file is valid type

        const result = e.currentTarget?.result
        const fileType = findFileType(result)

        if(fileType !== -1){
            // If input file is valid type check 2
            const img = new Image()
            img.onload = function(){
                console.log('draw img on canvas')
                setCavasSize(img.naturalWidth,img.naturalHeight)
                c.drawImage(img,0,0)
                state.imported = true
            }
            console.log('setting image src')
            img.src = result
        }
    }
}

window.addEventListener('dragover',e=>{
    e.preventDefault()
    e.stopPropagation()
})

window.addEventListener('drop',e=>{
    e.preventDefault()
    e.stopPropagation()
    const fileObj = e.dataTransfer?.files[0]
    if(fileObj){
        fileReader.readAsDataURL(fileObj)
    }
    console.log(fileObj)
})

displayTextureInput?.addEventListener('change',function(){
    if(this.checked){
        canvas.classList.remove('hidden')
    }else{
        canvas.classList.add('hidden')
    }
})



canvas.addEventListener('mousedown',e=>{
    processMouseDown(e)
})
function processMouseDown(e:MouseEvent):void{
    const mX = e.offsetX
    const mY = e.offsetY
    if(mX<canvas.width && mY<canvas.height && mX>=0 && mY>=0){
        Other(mX,mY)
    }
}

function Other(mX:number,mY:number){
    const indexX:number = Math.floor(mX/otherCanvas.bDiameter)
    const indexY:number = Math.floor(mY/otherCanvas.bDiameter)
    setBlockType(indexX,indexY)
}


const state = {
    canvas,
    update:function(w:number,h:number,bDiameter:number){
        otherCanvas.fWidth = w
        otherCanvas.fHeight = h
        otherCanvas.bDiameter = bDiameter
    },
    imported:false
}

return state

}