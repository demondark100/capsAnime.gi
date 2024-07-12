const imagenes = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYm79yYedy_B9wipGaWFqfGqruVhz2guilA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tSp5M4UxuSyeqgBOtkAYhq8xP9GiqSVs_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUyny0iwZYQl9M_DUaDPu-_zo1aD5frw35w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkxSMC1ELgtcazGgMKz9hh4oq5zWL6Faufg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6kdEQdayEw8IcJobPRLR9INrsoeMrF7b3Sg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkiaD3PA9wGRXpAc58bvvqyDiuT6pLDOWCPw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkiaD3PA9wGRXpAc58bvvqyDiuT6pLDOWCPw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXyusp28n5OmO18dcAY63UCGmpYyhlCAIPdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmrlD7nkTOb2cbmGuLCeFaVtImpMB1icPfhw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJLUooBCSZXUUf733B-DiVtX_Wm5JPDRlPQ&s"
]

const imagenInicio = document.querySelector(".inicioContent__imgs"); // imagen del inicio
function cambioAleatorio() {
    const cantidadExacta = imagenes.length - 1
    const aleatorio = Math.round(Math.random()*cantidadExacta); // imagen aleatoria.
    imagenInicio.style.backgroundImage = `url(${imagenes[aleatorio]})`;
}
cambioAleatorio()
const changeImage = setInterval(() => {
    cambioAleatorio()
}, 5000);