const imagenes = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYm79yYedy_B9wipGaWFqfGqruVhz2guilA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tSp5M4UxuSyeqgBOtkAYhq8xP9GiqSVs_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUyny0iwZYQl9M_DUaDPu-_zo1aD5frw35w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkxSMC1ELgtcazGgMKz9hh4oq5zWL6Faufg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6kdEQdayEw8IcJobPRLR9INrsoeMrF7b3Sg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkiaD3PA9wGRXpAc58bvvqyDiuT6pLDOWCPw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXyusp28n5OmO18dcAY63UCGmpYyhlCAIPdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmrlD7nkTOb2cbmGuLCeFaVtImpMB1icPfhw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJLUooBCSZXUUf733B-DiVtX_Wm5JPDRlPQ&s"
]
localStorage.setItem("ImgsBackground",JSON.stringify(imagenes))

const imagenInicio = document.querySelector(".inicioContent__imgs"); // imagen del inicio

// funcion para cambiar imagenes de forma aleatoria
function cambioAleatorio() {
    const cantidadExacta = imagenes.length - 1
    const aleatorio = Math.round(Math.random()*cantidadExacta); // imagen aleatoria.
    imagenInicio.style.backgroundImage = `url(${imagenes[aleatorio]})`;
}

// empezar con el cambio aleatorio
cambioAleatorio()

// funcion para cambiar a una nueva imagen cada 5 segundos 
function startChange() {
    changeImage = setInterval(() => {
        cambioAleatorio()
    }, 5000);
}

// empezar cambio cada 5 segundos
startChange()

// cambiar el fondo segun sea la configuracion.
let backgroundChange = JSON.parse(localStorage.getItem("changeBackground"))
if (backgroundChange != null) {
    if (!backgroundChange) {
        clearInterval(changeImage)
    }
}