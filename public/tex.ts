export default a
// #######################
//  FILE READER STUFF
// #######################
function a(c:any){

const fileReader = new FileReader()

function findFileType(dataURL:string):string|number{
    const jpegPos = dataURL.search(/jpeg/)
    const pngPos = dataURL.search(/png/)
    const pos = Math.max(jpegPos, pngPos)
    console.log(jpegPos,pngPos)
    if(pos !== -1 && pos < 16){
        return jpegPos ? '.jpeg' : '.png'
    }
    return -1
}

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
                c?.drawImage(img,0,0)
            }
            console.log('setting image src')
            img.src = result
        }
    }
}

// EVENT LISTENERS
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


    
}