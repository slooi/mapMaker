export default function(){

const backgroundColorInput = document.getElementById('background-color-input')!
const mainContent = document.getElementById('main-content')!

setMainContenBackgroundColor('#7a444a')

backgroundColorInput.oninput = function(e:any){
    console.log(e.target?.value)
    const val = e.target?.value
    setMainContenBackgroundColor(val)
}











function setMainContenBackgroundColor(color:string){
    mainContent.style.backgroundColor = color
}






    
}

