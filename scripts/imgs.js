let contenido = [];
// base de datos
  // base de datos
  const base = indexedDB.open("baseAnimes",1);

  base.addEventListener("upgradeneeded",()=>{
    const db = base.result;
    db.createObjectStore("animes",{
      autoIncrement: true
    });
  });
  const showObjects=async()=>{
    leerObjeto();
  }
  base.addEventListener("success",()=>{
    showObjects()
  })
  base.addEventListener("error",()=>console.log("hubo un error"));

  const agregarObjetos=(objeto) =>{
    const datos = getData("readwrite","objeto agregado");
    datos.add(objeto);
  }

  const editarObjeto=(objeto,key) =>{
    const datos = getData("readwrite","objeto editado");
    datos.put(objeto,key);
  }


  const eliminarObjeto=(key) =>{
    const datos = getData("readwrite","objeto eliminado");
    datos.delete(key);
  }

  const getData=(tipo,msg)=>{
    const db = base.result;
    const transaccion = db.transaction("animes",tipo);
    const almacen = transaccion.objectStore("animes");
    transaccion.addEventListener("complete",()=>{
      console.log(msg);
    })
    return almacen;
  }

  const leerObjeto=()=>{
      const db = base.result;
      const transaccion = db.transaction("animes","readwrite")
      const almacen = transaccion.objectStore("animes");
      const cursor = almacen.openCursor();
      cursor.addEventListener("success",()=>{
        if (cursor.result) {
          // console.log(cursor.result.value)
          contenido.push(cursor.result.value)
          cursor.result.continue();
        } else {
          loadData(contenido);
          RecuperarVistas()
        }
      })
  }



const btnAdd = document.querySelector(".animesContent__btn"); // boton para agregar imagenes y datos del anime.
// formulario
const contentForm = document.querySelector(".formularioAddAnime"); // contenedor principal
const contentForm_ = document.querySelector(".formularioAddAnime__forn"); // contenedor del forn
// inputs
  const nombre = document.querySelector(".formularioAddAnime__forn--nombre");
  const seleccionarImg = document.querySelector(".formularioAddAnime__forn--img");
  const linkImg = document.querySelector(".formularioAddAnime__forn--linkImg");
  const localImg = document.getElementById("formularioAddAnime__imgLocal");
  const formularioAddAnime__imgLocalLabel = document.querySelector(".formularioAddAnime__imgLocalLabel");
  const descripcion = document.querySelector(".formularioAddAnime__forn--descripcion");
  const capitulos = document.querySelector(".formularioAddAnime__forn--caps");
  const vistos = document.querySelector(".formularioAddAnime__forn--vistos")
  const crearAnimeBtn = document.querySelector(".formularioAddAnime__forn--btn");
  const formularioAddAnime__btnClose = document.querySelector(".formularioAddAnime__btnClose"); // boton para cerrar el formulario.
  const formularioAddAnime__err = document.querySelector(".formularioAddAnime__err"); // mostrar si hay error.


function resetearValores(){
  seleccionarImg.style.display = "block";
  linkImg.style.display = "none"
  formularioAddAnime__imgLocalLabel.style.display = "none";
  setTimeout(() => {
    seleccionarImg.value = "indefinido"
    nombre.value = "";
    linkImg.value = "";
    descripcion.value = "";
    capitulos.value = "";
    vistos.value = "";
  }, 1000);
}
// cerrar formulario para agregar anime
formularioAddAnime__btnClose.addEventListener("click",(e)=>{
  e.preventDefault();
  contentForm.classList.add("formularioAddAnimeHide");
  contentForm_.classList.add("formularioAddAnime__fornHide");
  resetearValores();
})




// leer archivos locales
let ruta = "";
localImg.addEventListener("change",(e)=>{
  leerArchivo(localImg.files)
})
const leerArchivo = ar => {
  for(let i=0;i < ar.length;i++){
    const reader = new FileReader();
    reader.readAsDataURL(ar[i]); 
    reader.addEventListener("load",(e)=>{
      ruta = e.currentTarget.result
    })
  }
}

// seleccionar que tipo de imagen se usara.
seleccionarImg.addEventListener("change",()=>{
  if (seleccionarImg.value == "link") {
    linkImg.style.display = "block"
    seleccionarImg.style.display = "none"
  } else if(seleccionarImg.value == "local") {
    formularioAddAnime__imgLocalLabel.style.display = "block"
    seleccionarImg.style.display = "none"
  }
})


// crear un nuevo anime para apuntar sus capitulos
let objeto = {}
crearAnimeBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(
    nombre.value != "" &&
    capitulos.value != "" &&
    parseInt(capitulos.value) > 0 &&
    parseInt(vistos.value) >= 0 &&
    parseInt(capitulos.value) >= parseInt(vistos.value) &&
    descripcion.value != "" &&
    localImg.files.length !== 0 ||
    linkImg.value != ""
  ){
    objeto.nombre = nombre.value
    objeto.capitulos = capitulos.value || 0
    objeto.descripcion = descripcion.value
    objeto.localImg = ruta
    objeto.linkImg = linkImg.value
    objeto.capsVistos = vistos.value || 0
    objeto.arrVistos = [];
    contentForm.classList.add("formularioAddAnimeHide");
    contentForm_.classList.add("formularioAddAnime__fornHide");
    resetearValores();
    agregarObjetos(objeto)
    const clonMore = more.cloneNode(true);
    animesContent__animesContent.innerHTML = "";
    animesContent__animesContent.appendChild(clonMore)
    clonMore.addEventListener("click",()=>openForm())
    contenido = []
    showObjects()
  } else{
    formularioAddAnime__err.classList.add("formularioAddAnime__errShow")
    setTimeout(() => {
      formularioAddAnime__err.classList.remove("formularioAddAnime__errShow")
    }, 5000);
  }
  
})


const animesContent__animesContent = document.querySelector(".animesContent__animesContent");
// crear los animes que veremos
const more = document.querySelector(".animesContent__btn");
// agregar mas animes para apuntar capitulos
more.addEventListener("click",()=>openForm())
// abrir formulario
function openForm() {
  contentForm.classList.remove("formularioAddAnimeHide");
  contentForm_.classList.remove("formularioAddAnime__fornHide");
}

function loadData(arr) {
  for(let content in arr){
    const fragment = document.createDocumentFragment();
    const contenedor = document.createElement("div");
    const imgAnime = document.createElement("img");
    const titulo = document.createElement("p");
    contenedor.classList.add("animesContent__animes")
    titulo.textContent = `${arr[content].capitulos}. ${arr[content].nombre}`;
    imgAnime.src = arr[content].linkImg || arr[content].localImg;
    contenedor.appendChild(imgAnime);
    contenedor.appendChild(titulo)
    fragment.appendChild(contenedor);
    animesContent__animesContent.appendChild(fragment)
    contenedor.addEventListener("click",(e)=>addCaps(e,content))
  }
}



// funcion para abrir el contenido de cada anime.
const ContenidoAnime = document.querySelector(".ContenidoAnime"); // contenedor
const closeContent = document.querySelector(".ContenidoAnime__btnClose") ;// cerrar
// informacion
  const ContenidoAnime__img = document.querySelector(".ContenidoAnime__img"); // img
  const ContenidoAnime__title = document.querySelector(".ContenidoAnime__title") // titulo
  const ContenidoAnime__descripcion = document.querySelector(".ContenidoAnime__descripcion") // descripcion
    const ContenidoAnime__caps = document.querySelector(".ContenidoAnime__caps"); // capitulos de los animes.
function addCaps(e,index) {
  ContenidoAnime.classList.remove("ContenidoAnimeHide");
  ContenidoAnime__img.src = contenido[index].linkImg || contenido[index].localImg
  ContenidoAnime__title.textContent = contenido[index].nombre
  ContenidoAnime__descripcion.textContent = contenido[index].descripcion
  let cantidad = parseInt(contenido[index].capitulos);
  ContenidoAnime__caps.innerHTML = ""
  addCapitulosDom(cantidad,index)
}
// cerrar el contenido de cada anime.
closeContent.addEventListener("click",()=>ContenidoAnime.classList.add("ContenidoAnimeHide"))


// agregar capitulos al contenido.
function addCapitulosDom(num,index) {
  for (let caps = 0; caps < num; caps++) {
    const fragment = document.createDocumentFragment();
    const contenedor = document.createElement("div");
    const redireccion = document.createElement("a");
    const marcador = document.createElement("button");
    const linkCap = document.createElement("input");
    const deleteMarcador = document.createElement("button");
    const btnHecho = document.createElement("button");
    
    contenedor.classList.add("ContenidoAnime__capitulos");
    marcador.classList.add("ContenidoAnime__capVisto");
    btnHecho.classList.add("ContenidoAnime__capLink");
    deleteMarcador.classList.add("ContenidoAnime__capNoVisto");
    linkCap.classList.add("ContenidoAnime__capInput")
    redireccion.classList.add("ContenidoAnime__capLinkA")
    
    btnHecho.textContent = "Enviar";
    linkCap.placeholder = "Link del capitulo";
    redireccion.target = "_blank";
    redireccion.textContent = `capitulo ${caps + 1}`;
    marcador.textContent = "Marcar visto";
    deleteMarcador.textContent = "Quitar visto";
    
    contenedor.appendChild(redireccion);
    contenedor.appendChild(marcador);
    contenedor.appendChild(linkCap);
    contenedor.appendChild(btnHecho);
    contenedor.appendChild(deleteMarcador);
    fragment.appendChild(contenedor);
    ContenidoAnime__caps.appendChild(fragment);
    
    
    marcador.addEventListener("click",()=>addLinks(caps))
    btnHecho.addEventListener("click",()=>sendLink(index,caps))
    deleteMarcador.addEventListener("click",()=>deleteVista(index,caps))
  }
}

function changeDisplay(node,type) {
  if (type == "b") {
    return node.style.display = "block"
  } else {
    return node.style.display = "none"
  }
}

// funcion para agregar el link del anime.
function addLinks(cap) {
  const marcadores = document.querySelectorAll(".ContenidoAnime__capVisto");
  const confirmar = document.querySelectorAll(".ContenidoAnime__capLink");
  const inputCap = document.querySelectorAll(".ContenidoAnime__capInput");
  const link = document.querySelectorAll(".ContenidoAnime__capLinkA");
  changeDisplay(marcadores[cap],"n")
  changeDisplay(confirmar[cap],"b")
  changeDisplay(link[cap],"n")
  changeDisplay(inputCap[cap],"b")

  marcadores.forEach(i=>{
    i.style.color = "#3f403f"
    i.style.pointerEvents = "none"
  }) 
}

// funcion para marcar hasta que capitulo del anime se ha visto y guardarlo en la basse de datos.
function sendLink(indAni,cap) {
  const marcadores = document.querySelectorAll(".ContenidoAnime__capVisto");
  const confirmar = document.querySelectorAll(".ContenidoAnime__capLink");
  const contenedor = document.querySelectorAll(".ContenidoAnime__capitulos");
  const inputCap = document.querySelectorAll(".ContenidoAnime__capInput");
  const link = document.querySelectorAll(".ContenidoAnime__capLinkA");
  const delete_ = document.querySelectorAll(".ContenidoAnime__capNoVisto")
  changeDisplay(confirmar[cap],"n")
  changeDisplay(delete_[cap],"b")
  changeDisplay(inputCap[cap],"n")
  changeDisplay(link[cap],"b")
  contenedor[cap].style.backgroundColor = "#003100"
  link[cap].href = inputCap[cap].value

  marcadores.forEach(i=>{
    i.style.color = "#0f0";
    i.style.pointerEvents = "auto";
  })
  for (let mrc = 0; mrc <= cap; mrc++) {
    contenedor[mrc].style.backgroundColor = "#003100"
    changeDisplay(marcadores[mrc],"n")
    changeDisplay(delete_[mrc],"b")
    contenido[indAni].arrVistos[cap] = [inputCap[cap].value,mrc]
    if (contenido[indAni].arrVistos[mrc] === undefined) {
      contenido[indAni].arrVistos[mrc] = ["#",mrc]
    }
  }
  link[cap].href = inputCap[cap].value;
  link[cap].style.color = "#f6ffdf"
  link[cap].style.textShadow = "0 0 15px #f6ffdf"

  let indice = parseInt(indAni) + 1;
  console.log(indice)
  editarObjeto(contenido[indAni],indice)
}


// funcion para quitar capitulos que se han visto
function deleteVista(indAni,cap) {
  const marcadores = document.querySelectorAll(".ContenidoAnime__capVisto");
  const confirmar = document.querySelectorAll(".ContenidoAnime__capLink");
  const contenedor = document.querySelectorAll(".ContenidoAnime__capitulos");
  const inputCap = document.querySelectorAll(".ContenidoAnime__capInput");
  const link = document.querySelectorAll(".ContenidoAnime__capLinkA");
  const delete_ = document.querySelectorAll(".ContenidoAnime__capNoVisto")
  changeDisplay(delete_[cap],"n")
  changeDisplay(marcadores[cap],"b")

  contenedor[cap].style.backgroundColor = "#0e0e0e"

  contenido[indAni].arrVistos.forEach(i=>{
    if (i[1] >= cap) {
      contenedor[i[1]].style.backgroundColor = "#0e0e0e"
      changeDisplay(delete_[i[1]],"n")
      changeDisplay(marcadores[i[1]],"b")
    }
  })
}



function RecuperarVistas() {
  const marcadores = document.querySelectorAll(".ContenidoAnime__capVisto");
  const confirmar = document.querySelectorAll(".ContenidoAnime__capLink");
  const contenedor = document.querySelectorAll(".ContenidoAnime__capitulos");
  const inputCap = document.querySelectorAll(".ContenidoAnime__capInput");
  const link = document.querySelectorAll(".ContenidoAnime__capLinkA");
  const delete_ = document.querySelectorAll(".ContenidoAnime__capNoVisto")
  contenido.forEach((i)=>{
    // queda pendiente recuperar los datos de los animes que ya han sido marcados como vistos.
  })
}