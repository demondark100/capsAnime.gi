const inicioContent__info = document.querySelector(".inicioContent__info") // contenedor principal de la informacion 
const btnInicio = document.querySelector(".btnInicio");
// const informacion 
const informacion  = document.querySelector(".inicioContent__info"); // contenedor de la informacion.
const fondo  = document.querySelector(".inicioContent__imgs"); // fondo de la web.
const showInicio = document.querySelector(".showInicio"); // pregunta
showInicio.classList.add("hideInicio")


// botones
const showInicio__btn1 = document.querySelector(".showInicio__btn1") // boton 1 aceptar
const showInicio__btn2 = document.querySelector(".showInicio__btn2") // boton 2 denegar

const showPregunta = JSON.parse(localStorage.getItem("showPregunta"));
const showInicioInfo = JSON.parse(localStorage.getItem("showInicio"));

if (showInicioInfo || showInicioInfo != null) {
    inicioContent__info.classList.add("inicioContent__infoHide")
    fondo.classList.add("ExtendImage")
}

btnInicio.addEventListener("click",()=>{
    informacion.classList.add("inicioContent__infoHide");
    fondo.classList.add("ExtendImage");
    showInicio.classList.remove("hideInicio")
    if (showPregunta || showPregunta === null) {
        showInicio.classList.add("showInicio")
    } else{
        showInicio.classList.remove("showInicio")
    }
})

showInicio__btn1.addEventListener("click",()=>{
    localStorage.setItem("showPregunta",false)
    showInicio.classList.add("hideInicio")
})
showInicio__btn2.addEventListener("click",()=>{
    localStorage.setItem("showPregunta",false)
    showInicio.classList.add("hideInicio")
    localStorage.setItem("showInicio",false)
})