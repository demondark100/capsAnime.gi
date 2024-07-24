// apartado de configuracion de la web.
const contentSetting = document.querySelector(".settingContent") // contenedor de las configuraciones. 
const openSettingBtn = document.querySelector(".openSetting") // boton para abrir el apartado de configuracion
const btnCloseSetting = document.querySelector(".settingContentClose") // boton para cerrar los settings
const btnShowStartSetting = document.querySelector(".settingContent__btnShowStart"); // boton para configurar si mostrar el inicio o no.
const btnChangeBackSetting = document.querySelector(".settingContent__btnChangeBack"); // boton para configurar el fondo de pantalla.

// selectores de la bolita de los botones para indicar si es activo o no.
const indicadorSetting = document.querySelectorAll(".settingContent__setCont span") // bolita de los botones.

// opciones del cambio del fondo de pantalla
const btnBackgroundOptions1 = document.querySelector(".settingContent__setContBtn1") // boton para abrir las opciones de fondo de pantalla
const btnBackgroundOptions2 = document.querySelector(".settingContent__setContBtn2") // cerrar las opciones de background.
const contenedorBackCont = document.querySelector(".settingContent__setContBack"); // contenedor de las opciones.
const contentOptionsExtraSet = document.querySelector(".settingContent__setContOptions") // contenedor de las opciones extra

// abrir apartado de configuracion.
  openSettingBtn.addEventListener("click",()=>contentSetting.classList.remove("settingContentHide"))
  btnCloseSetting.addEventListener("click",()=>contentSetting.classList.add("settingContentHide"))



// variables de cambio de botones
let cambio1 = true;
let cambio2 = true;



// funciones de evento.

// boton para configurar si se mostrara el inicio o no.
btnShowStartSetting.addEventListener("click",()=>{
  cambio1 = !cambio1;
  localStorage.setItem("setting1",JSON.stringify(cambio1))
  moveSetting(cambio1,indicadorSetting[0])

  cambio1 ? configInicio("open"):configInicio("close")
})

// boton que configurara si se cambiara e fondo de pantalla o no.
btnChangeBackSetting.addEventListener("click",()=>{
  cambio2 = !cambio2;
  localStorage.setItem("setting2",JSON.stringify(cambio2))
  moveSetting(cambio2,indicadorSetting[1])
  let cambioReal = JSON.parse(localStorage.getItem("setting2"))
  if (cambioReal) {
    backgroundSetting("dinamic")
    contenedorBackCont.classList.add("contenedorBackContHide")
  } else{
    backgroundSetting("static")
    contenedorBackCont.classList.remove("contenedorBackContHide")
  }
})


// boton para las opciones del cambio del fondo de pantalla
btnBackgroundOptions1.addEventListener("click",()=>optionsBackContSetting("show"))
btnBackgroundOptions2.addEventListener("click",()=>optionsBackContSetting("hide"))



// funciones

// funcion para poder expandir o poner de forma normal el contenido
function optionsBackContSetting(option) {
  if (option === "show") {
    contenedorBackCont.classList.add("settingContent__setContBackShow")
    btnBackgroundOptions1.style.display = "none";
    btnBackgroundOptions2.style.display = "block";
    contentOptionsExtraSet.style.visibility = "visible";
  } else{
    contenedorBackCont.classList.remove("settingContent__setContBackShow")
    btnBackgroundOptions1.style.display = "block";
    btnBackgroundOptions2.style.display = "none";
    contentOptionsExtraSet.style.visibility = "hidden";
  }
}


// funcion para mover las bolitas de los botones
function settingPosition(span,position){
  if (position === "a") {
    span.classList.add("settingActive")
    span.classList.remove("settingDesactive")
  } else {
    span.classList.remove("settingActive")
    span.classList.add("settingDesactive")
  }
}

// funcion para mover las bolitas de los botones segun sea.
function moveSetting(cambio,node) {
  if (cambio) {
    settingPosition(node,"a")
  } else{
    settingPosition(node,"d")
  }
}


// funcion para poner la posision de las bolitas segun sea.
let change = [
  JSON.parse(localStorage.getItem("setting1")),
  JSON.parse(localStorage.getItem("setting2"))
]
if (change != null) {
  for (let i = 0; i < change.length; i++) {
    if (change[i]) {
      settingPosition(indicadorSetting[i],"a")
    } else{
      settingPosition(indicadorSetting[i],"d")
    }
  }
}


// funciones para las configuraciones.
// configuracion del inicio.
function configInicio(make) {
  if (make == "open") {
    localStorage.setItem("showInicio",null)
  } else {
    localStorage.setItem("showInicio",false)
  }
}


// configuracion del cambio dinamico del background.
function backgroundSetting(option) {
  if (option == "dinamic") {
    localStorage.setItem("changeBackground",true)
    startChange();
  } else{
    localStorage.setItem("changeBackground",false)
    clearInterval(changeImage)
  }
}


// recuperar data
let setting2Back = JSON.parse(localStorage.getItem("setting2"));
if (setting2Back !== null) {
  if (setting2Back) {
    contenedorBackCont.classList.remove("settingContent__setContBackShow")
    contenedorBackCont.classList.add("contenedorBackContHide")
  } else {
    contenedorBackCont.classList.remove("contenedorBackContHide")
    
    // agregar fondo de pantalla seleccionado cuando la configuracion dos sea false
    let fondoGuardado = JSON.parse(localStorage.getItem("fondo"));
    if (fondoGuardado != null) {
      const img = new Image();
      img.onload=()=>imagenInicio.style.backgroundImage = `url(${fondoGuardado})`  
      img.onerror=()=>imagenInicio.style.backgroundColor = `${fondoGuardado}`
      img.src = fondoGuardado
    }
  }
}