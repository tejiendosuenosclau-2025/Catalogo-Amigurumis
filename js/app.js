const contenedor = document.getElementById("productos");

let todosLosProductos = [];

// Cargar productos
fetch("data/productos.json")
    .then(res => res.json())
    .then(datos => {

    todosLosProductos = datos;
    window.todosLosProductos = datos;

    // Avisar que los productos ya cargaron
    window.dispatchEvent(new Event("productosCargados"));

	actualizarContadores();
	mostrarProductos("Todos");

    

});

// Mostrar productos
function mostrarProductos(categoria = "Todos") {

    contenedor.innerHTML = "";

    let productosMostrar = todosLosProductos;

    if (categoria !== "Todos") {

        productosMostrar = todosLosProductos.filter(producto =>
            producto.categoria.includes(categoria)
        );

    }

    productosMostrar.forEach(producto => {

        contenedor.innerHTML += `<div class="card">

                <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">

                <div class="card-body">

                    <h3>${producto.nombre}</h3>

                    <p><strong>Categorías:</strong> ${producto.categoria.join(", ")}</p>

                    <p><strong>Tamaño:</strong> ${producto.tamano}</p>

                    <h2>$${producto.precio.toLocaleString()}</h2>

		    <a href="https://wa.me/573011810933?text=Hola,%20estoy%20interesado%20en%20el%20amigurumi%20${encodeURIComponent(producto.nombre)}" target="_blank"
                    class="btn-whatsapp">
                      	<img src="img/boton.png" alt="Comprar por WhatsApp">
    		    </a>

                 </div>

            </div>
        `;

    });

}

const iconos = {
    "Disponibles": "✅",
    "Animales": "🐻",
    "Personajes": "🦸",
    "Llaveros": "🔑",
    "Personalizados": "🎨"
};

function actualizarContadores() {

    // Contador total para Inicio
    const total = todosLosProductos.length;

    const contadorTotal = document.getElementById("totalProductos");

    if (contadorTotal) {
        contadorTotal.textContent = total;
    }


    // Contadores de categorías
    document.querySelectorAll(".categoria").forEach(categoria => {

        const nombre = categoria.dataset.categoria;

        if (nombre !== "Todos") {

            const cantidad = todosLosProductos.filter(producto =>
            producto.categoria.includes(nombre)).length;

            categoria.innerHTML = `${iconos[nombre] || ""} ${nombre} (${cantidad})`;

        }

    });

}

document.querySelectorAll(".categoria").forEach(categoria => {

    categoria.addEventListener("click", () => {

        document.querySelectorAll(".categoria").forEach(c =>
            c.classList.remove("activa")
        );

        categoria.classList.add("activa");

        contenedor.classList.add("oculto");

        setTimeout(() => {

            mostrarProductos(categoria.dataset.categoria);

            contenedor.classList.remove("oculto");
            contenedor.classList.add("visible");

        },300);

    });

});
//========================
// BUSCADOR
//========================

const buscador = document.getElementById("buscar");

if (buscador) {

    buscador.addEventListener("input", function () {

        const texto = this.value.toLowerCase();

        const productosFiltrados = todosLosProductos.filter(producto => {

        return (producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.some(cat =>
            cat.toLowerCase().includes(texto)
        )
    );

});

        contenedor.innerHTML = "";

        productosFiltrados.forEach(producto => {

            contenedor.innerHTML += `
            <div class="card">

                <img src="${producto.imagen}" class="producto-img">

                <div class="card-body">

                    <h3>${producto.nombre}</h3>

                    <p><strong>Categorías:</strong> ${producto.categoria.join(", ")}</p>

                    <p><strong>Tamaño:</strong> ${producto.tamano}</p>

                    <h2>$${producto.precio.toLocaleString()}</h2>
		    
                    <a href="https://wa.me/573011810933?text=Hola,%20estoy%20interesado%20en%20el%20amigurumi%20${encodeURIComponent(producto.nombre)}" target="_blank"
                    class="btn-whatsapp">
                      	<img src="img/boton.png" alt="Comprar por WhatsApp">
    		    </a>

                </div>

            </div>
            `;

        });

    });

}