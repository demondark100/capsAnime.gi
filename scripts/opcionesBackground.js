// selectores
const contenedorImgSetting = document.querySelector(".fondoContentImgs");
const cerrarSettingImg = document.querySelector(".fondoContentImgsBtnClose");


const btnChangeBackground1 = document.querySelector(".settingContent__setContOptionsBtn1"); // boton para elegir una imagen de fondo.

// contenedor de selector de las imagenes que elija el usuario.
const contentImgsSetting = document.querySelector(".fondoContentImgsSystem");

// boton para agregar una nueva imagen de fondo.
const inputFondoExterno = document.querySelector(".fondoContentImgsInputText")
const btnAddSettingFondo = document.querySelector(".fondoContentImgsSend");


// funciones de evento

// abrir y cerrar el contenedor de selector de imagenes
btnChangeBackground1.addEventListener("click",()=>openCloseImgSetting("show"))
cerrarSettingImg.addEventListener("click",()=>openCloseImgSetting("hide"))

// boton para agregar un nuevo fondo de pantalla.
btnAddSettingFondo.addEventListener("click",saveFondoExterSetting)



// funciones


function openCloseImgSetting(option) {
    if (option === "show") {
        contenedorImgSetting.classList.remove("fondoContentImgsHide");
        AddiMgSettings();
    } else {
        contenedorImgSetting.classList.add("fondoContentImgsHide")
    }
}

// funcion para agregar imagenes del sistema para ponerlas como background.
function AddiMgSettings() {
    // contentImgsSetting
    contentImgsSetting.innerHTML = ""

    for(let i in imagenes){
        // creacion de elementos.
        const fragment = document.createDocumentFragment();
        const imgs = document.createElement("img");
        
        // clases y links de imagenes
        imgs.classList.add("fondoContentImgsSystemImgs")
        imgs.src = imagenes[i];

        // agregar al dom.
        fragment.appendChild(imgs);
        contentImgsSetting.appendChild(fragment);

        // funcionalidad
        imgs.addEventListener("click",()=>addImgSettingBackground(i))
    }
}



// funcion para agregar como fondo de pantalla

function addImgSettingBackground(index) {
    imagenInicio.style.backgroundImage = `url(${imagenes[index]})`;
    const imgsSetting = document.querySelectorAll(".fondoContentImgsSystemImgs");

    imgsSetting.forEach(i=>{
        i.style.filter = "none";
        i.style.boxShadow = "none";
    })
    imgsSetting[index].style.filter = "brightness(.5)"
    imgsSetting[index].style.boxShadow = "0 0 20px 2px #fff"
    localStorage.setItem("fondo",JSON.stringify(imagenes[index]))
}




// funcion para agregar un fondo de pantalla externo y guardarlo.
function saveFondoExterSetting() {
    const img = new Image();
    let url = inputFondoExterno.value;
    if (inputFondoExterno.value != "") {
        img.onload = ()=>{
            localStorage.setItem("fondo",JSON.stringify(url))
            imagenInicio.style.backgroundImage = `url(${url})`;
        }
        img.onerror = ()=>{
            localStorage.setItem("fondo",JSON.stringify("#000"))
            imagenInicio.style.backgroundColor = "#000"
        }
    }
    img.src = url;
}