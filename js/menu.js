const boton = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

boton.addEventListener("click", () => {

    menu.classList.toggle("activo");

    boton.textContent =
        menu.classList.contains("activo")
        ? "✖"
        : "☰";

});

// Cerrar el menú al pulsar una opción
document.querySelectorAll("#menu a").forEach(enlace=>{

    enlace.addEventListener("click",()=>{

        menu.classList.remove("activo");

        boton.textContent="☰";

    });

});