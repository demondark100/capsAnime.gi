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
      let contador = 0
      cursor.addEventListener("success",()=>{
        if (cursor.result) {
          contenido.push(cursor.result.value)
          contenido[contador].id = cursor.result.key
          contador += 1;
          cursor.result.continue();
        } else {
          loadData(contenido);
          console.log(contenido)
        }
      })
  }




// selectores globales de html.

  // seleccion de formularios
    const btnAdd = document.querySelector(".animesContent__btn"); // boton para agregar imagenes y datos del anime.
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
    const formularioAddAnime__btnClose = document.querySelector(".formularioAddAnime__btnClose"); // boton para cerrar el formulario.
    const formularioAddAnime__err = document.querySelector(".formularioAddAnime__err"); // mostrar si hay error.
    const crearAnimeBtn = document.querySelector(".formularioAddAnime__forn--btn"); // boton para crear un nuevo anime.
    const editAnimeBtn = document.querySelector(".formularioAddAnimeHide__btnEdit") // boton para eliminar un anime.


  // crear los animes que veremos
    const animesContent__animesContent = document.querySelector(".animesContent__animesContent");
    const more = document.querySelector(".animesContent__btn");

  // opciones de los animes para editar o eliminar.
    const contentOptions = document.querySelector(".optionsContent"); // contenedor principal.
    const opcionEdit = document.querySelector(".optionsContentBnsEdit"); // btn editar
    const opcionDel = document.querySelector(".optionsContentBnsDel"); // btn eliminar


  // contenido de cada anime.
    const ContenidoAnime = document.querySelector(".ContenidoAnime"); // contenedor
    const closeContent = document.querySelector(".ContenidoAnime__btnClose") ;// cerrar
    // informacion
    const ContenidoAnime__img = document.querySelector(".ContenidoAnime__img"); // img
    const ContenidoAnime__title = document.querySelector(".ContenidoAnime__title") // titulo
    const ContenidoAnime__descripcion = document.querySelector(".ContenidoAnime__descripcion") // descripcion
    const ContenidoAnime__caps = document.querySelector(".ContenidoAnime__caps"); // capitulos de los animes.

  // variables para usar mas edelante
    let ruta = ""; // cambiar las rutas de los archivos locales.
    let objeto = {}; // objeto que se modificara para agregar en la base de datos.
    let indexOption = 0; // obtener el indice de los animes para trabjar con la base de datos.




// funciones de addEventListener

  // leer archivos locales
  // detectar cuando el contenido del input cambie
    localImg.addEventListener("change",(e)=>{
      leerArchivo(localImg.files)
    })


  // seleccionar que tipo de imagen se usara y reemplazar el input dependiendo si elige local o por link.
    seleccionarImg.addEventListener("change",()=>{
      if (seleccionarImg.value == "link") {
        linkImg.style.display = "block"
        seleccionarImg.style.display = "none"
      } else if(seleccionarImg.value == "local") {
        formularioAddAnime__imgLocalLabel.style.display = "block"
        seleccionarImg.style.display = "none"
      }
    })

  // cerrar formulario para agregar anime
    formularioAddAnime__btnClose.addEventListener("click",(e)=>{
      e.preventDefault();
      contentForm.classList.add("formularioAddAnimeHide");
      contentForm_.classList.add("formularioAddAnime__fornHide");
      resetearValores();
    })


  // crear un nuevo anime para apuntar sus capitulos pidiendo datos a travez de un formulario, luego rellenamos un objeto vacio para poder agregarlo en un arreglo que guardara esos datos, una vez rellenado se creara una base de datos indexedb.
    crearAnimeBtn.addEventListener("click",(e)=>createEdit(e,"create"))
    editAnimeBtn.addEventListener("click",(e)=>createEdit(e,"edit"))


  // agregar mas animes para apuntar capitulos o editar los animes
    more.addEventListener("click",()=>openCloseForm("open","create"));
  // funcion para cerrar las opciones del anime.
    contentOptions.addEventListener("click",()=>contentOptions.classList.add("optionsContentHide"))
    opcionEdit.addEventListener("click",()=>editContent(indexOption))


  // cerrar el contenido de cada anime.
    closeContent.addEventListener("click",()=>ContenidoAnime.classList.add("ContenidoAnimeHide"))





  // funciones


  // funcion para validar los campos del formularios para agregar o editar algun anime.
  function createEdit(e,type) {
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
      if (type == "create") {
        objeto.nombre = nombre.value
        objeto.capitulos = capitulos.value || 0
        objeto.descripcion = descripcion.value
        objeto.localImg = ruta
        objeto.linkImg = linkImg.value
        objeto.capsVistos = vistos.value || 0
        objeto.arrVistos = [];
        agregarObjetos(objeto)
      } else{
        contenido[indexOption].nombre = nombre.value
        contenido[indexOption].capitulos = capitulos.value
        contenido[indexOption].descripcion = descripcion.value
        contenido[indexOption].localImg = ruta
        contenido[indexOption].linkImg = linkImg.value
        contenido[indexOption].vistos = vistos.value || 0
        editarObjeto(contenido[indexOption],contenido[indexOption].id)
      }
      openCloseForm("close","create")
      resetearValores();
      
      animesContent__animesContent.innerHTML = "";
      contenido = []
      showObjects()
    } else{
      formularioAddAnime__err.classList.add("formularioAddAnime__errShow")
      setTimeout(() => {
        formularioAddAnime__err.classList.remove("formularioAddAnime__errShow")
      }, 5000);
    }
  }

  // ire a jugar un rato left 4 dead, el objetivo ahora es preguntar si desea eliminar un anime, si es asi entonces usamos la funcion delete de la base de datos para eliminar ese dato usando los id de la base de datos, regreso en 15 min aqui abajo estara la funcion para lograr este objetivo.


// funcion para resetear los valores de los inputs en el formulario.
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


  // funcion para leer la primera imagen y obtener la ruta de la imagen local.
  const leerArchivo = ar => {
    for(let i=0;i < ar.length;i++){
      const reader = new FileReader();
      reader.readAsDataURL(ar[i]); 
      reader.addEventListener("load",(e)=>{
        ruta = e.currentTarget.result
      })
    }
  }

 
  // funcion que sirve para abrir el formulario, este se puede usar para abrir el formulario para editar o crear un nuevo anime.
  function openCloseForm(make,option) {
    if (option == "create") {
      changeDisplay(crearAnimeBtn,"b")
      changeDisplay(editAnimeBtn,"n")
    } else {
      changeDisplay(crearAnimeBtn,"n")
      changeDisplay(editAnimeBtn,"b") 
    }
    if (make === "open") {
      contentForm.classList.remove("formularioAddAnimeHide");
      contentForm_.classList.remove("formularioAddAnime__fornHide");
    } else {
      contentForm.classList.add("formularioAddAnimeHide");
      contentForm_.classList.add("formularioAddAnime__fornHide");
    }
  }


  // funcion para abrir el formulario para editar.
  function OpenOptionsAnime(index){
    contentOptions.classList.remove("optionsContentHide");
    indexOption = index;
  }


  // renderizar los capitulos en de cada capitulo para poder marcarlos como vistos o no.
  function loadData(arr) {
    for(let content in arr){
      const fragment = document.createDocumentFragment();
      const contenedor = document.createElement("div");
      const imgAnime = document.createElement("img");
      const titulo = document.createElement("p");
      const btnOptions = document.createElement("button");

      contenedor.classList.add("animesContent__animes")
      btnOptions.classList.add("animesContent__animesBtnOptions")
      
      titulo.textContent = `${arr[content].capitulos}. ${arr[content].nombre}`;
      imgAnime.src = arr[content].linkImg || arr[content].localImg;    
      btnOptions.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;

      contenedor.appendChild(imgAnime);
      contenedor.appendChild(titulo)
      contenedor.appendChild(btnOptions)
      fragment.appendChild(contenedor);
      animesContent__animesContent.appendChild(fragment)
      contenedor.addEventListener("click",(e)=>addCaps(content))
      
      btnOptions.addEventListener("click",(e)=>{
        e.stopPropagation();
        OpenOptionsAnime(content)
      }); // funcion para avrir las opciones de cada anime.
    }
  }



  // editar eñ contenido de un anime y guardarlo en la base de datos
  function editContent(index) {
    openCloseForm("open","edit")

    nombre.value = contenido[index].nombre;
    // localImg.value = contenido[index].localImg;
    linkImg.value = contenido[index].linkImg;
    descripcion.value = contenido[index].descripcion
    capitulos.value = contenido[index].capitulos
    vistos.value = contenido[index].capsVistos

  }



  function addCaps(index) {
    ContenidoAnime.classList.remove("ContenidoAnimeHide");
    ContenidoAnime__img.src = contenido[index].linkImg || contenido[index].localImg
    ContenidoAnime__title.textContent = contenido[index].nombre
    ContenidoAnime__descripcion.textContent = contenido[index].descripcion
    let cantidad = parseInt(contenido[index].capitulos);
    ContenidoAnime__caps.innerHTML = ""
    addCapitulosDom(cantidad,index)
    recuperarDatos(index)
  }




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





  // con esta funcion vamos a cambiar el display de los botones de forma mas sensilla.
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
      contenido[indAni].arrVistos[cap] = [inputCap[cap].value,mrc,"show"]
      if (contenido[indAni].arrVistos[mrc] == undefined) {
        contenido[indAni].arrVistos[mrc] = ["#",mrc,"show"]
      }
      setTimeout(() => {
        if (contenido[indAni].arrVistos[mrc][0] == "#") {
          contenido[indAni].arrVistos[mrc] = ["#",mrc,"show"]
        }
      }, 100);
    }
    link[cap].href = inputCap[cap].value;
    link[cap].style.color = "#f6ffdf"
    link[cap].style.textShadow = "0 0 15px #f6ffdf"
    let indice = parseInt(indAni) + 1;
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
    for (let i = 0; i < contenido[indAni].arrVistos.length; i++) {
      if (contenido[indAni].arrVistos[i][1] >= cap) {
        contenedor[contenido[indAni].arrVistos[i][1]].style.backgroundColor = "#0e0e0e"
        changeDisplay(delete_[contenido[indAni].arrVistos[i][1]],"n")
        changeDisplay(marcadores[contenido[indAni].arrVistos[i][1]],"b")
        contenido[indAni].arrVistos[i] = ["#",i,"hide"]
        link[i].style.textShadow = "none"
        link[i].style.color = "#b7bea4"
        link[i].removeAttribute("href")
      }
    }
    let indice = parseInt(indAni) + 1
    editarObjeto(contenido[indAni],indice)
  }


  // Con esta funcion vamos a recuperar los animes que ya han sido marcados como vistos, con esto recuperaremos el redireccionamiento claro si el usuario puso algun link del cap del anime.
  function recuperarDatos(i){
    const marcadores = document.querySelectorAll(".ContenidoAnime__capVisto");
    const confirmar = document.querySelectorAll(".ContenidoAnime__capLink");
    const contenedor = document.querySelectorAll(".ContenidoAnime__capitulos");
    const inputCap = document.querySelectorAll(".ContenidoAnime__capInput");
    const link = document.querySelectorAll(".ContenidoAnime__capLinkA");
    const delete_ = document.querySelectorAll(".ContenidoAnime__capNoVisto")
    contenido[i].arrVistos.forEach((cap,rec) => {
      if (cap[2] == "show") {
        contenedor[rec].style.backgroundColor = "#003100"
        changeDisplay(marcadores[rec],"n")
        changeDisplay(delete_[rec],"b")
        if (cap[0] != "#") {
          link[rec].href = cap[0];
          link[rec].style.color = "#f6ffdf"
          link[rec].style.textShadow = "0 0 15px #f6ffdf"
        }
      } else {
        contenedor[rec].style.backgroundColor = "#0e0e0e"
        changeDisplay(marcadores[rec],"b")
        changeDisplay(delete_[rec],"n")
      }
    });
  }