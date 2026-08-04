let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


// Agregar favorito
function agregarFavorito(id){

    id = Number(id);

    if(!favoritos.includes(id)){

        favoritos.push(id);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

    }

    actualizarContadorFavoritos();
	if(document.getElementById("seccionFavoritos").style.display==="block"){
    	mostrarFavoritos();}
}


// Contador
function actualizarContadorFavoritos(){

    const contador = document.getElementById("contadorFavoritos");

    if(contador){

        contador.textContent = favoritos.length;

    }

}


// Mostrar favoritos
function mostrarFavoritos(){

    const contenedor = document.getElementById("favoritos");

    contenedor.innerHTML = "";


    if(!window.todosLosProductos){

        contenedor.innerHTML = "Cargando productos...";

        return;

    }


    const lista = window.todosLosProductos.filter(producto =>
        favoritos.includes(Number(producto.id))
    );


    if(lista.length === 0){

        contenedor.innerHTML =
        "<p>No tienes productos favoritos ❤️</p>";

        return;

    }


    lista.forEach(producto => {

        contenedor.innerHTML += `

        <div class="card">

            <img src="${producto.imagen}" 
            class="producto-img"
            alt="${producto.nombre}">

            <div class="card-body">

                <h3>${producto.nombre}</h3>

                <p><strong>Categoría:</strong> ${producto.categoria}</p>

                <p><strong>Tamaño:</strong> ${producto.tamano}</p>

                <h2>$${producto.precio.toLocaleString()}</h2>

                <p>${producto.descripcion}</p>

            </div>

        </div>

        `;

    });

}


// Botón favoritos
document.getElementById("verFavoritos")
.addEventListener("click",()=>{


    document.getElementById("productos").style.display="none";

    document.getElementById("seccionFavoritos").style.display="block";


    mostrarFavoritos();


});


// Actualizar contador al iniciar
actualizarContadorFavoritos();