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

                <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}" loading="lazy" decoding="async">

                <div class="card-body">

                    <h3>${producto.nombre}</h3>

                    <p><strong>Categoría:</strong> ${producto.categoria.join(", ")}</p>

                    <p><strong>Tamaño:</strong> ${producto.tamano}</p>

                    <h2>$${producto.precio.toLocaleString()} ${producto.unidad ? producto.unidad : ""}</h2>

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
    "Disponibles": '<svg class="cat-icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/></svg>',
    "Animales": '<svg class="cat-icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="11" r="1.9"/><circle cx="15.5" cy="11" r="1.9"/><circle cx="12" cy="7.5" r="1.9"/><path d="M12 14.5c-3.1 0-5.3 2-5.3 3.9 0 1.1.8 1.9 1.9 1.9h6.8c1.1 0 1.9-.8 1.9-1.9 0-1.9-2.2-3.9-5.3-3.9z"/></svg>',
    "Personajes": '<svg class="cat-icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 4 2.4 5.2 5.6.6-4.1 3.9 1.1 5.6L12 16.5 7 19.3l1.1-5.6L4 9.8l5.6-.6z"/></svg>',
    "Llaveros": '<svg class="cat-icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="16" r="4"/><path d="M10.5 13 21 3"/><path d="M16 5l3 3M13.5 7.5 16 10"/></svg>',
    "Personalizados": '<svg class="cat-icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="9.5" r="1.2"/><circle cx="13" cy="7.8" r="1.2"/><circle cx="15.5" cy="11.5" r="1.2"/><path d="M12 21c1.6 0 2.2-3.4.2-3.4-1.2 0-1.9-1.2-1.9-2.3 0-1.7 2-2.2 4.6-2.2 1.9 0 2.8 1.2 2.8 2.5C17.7 18.3 15.3 21 12 21z"/></svg>'
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

                <img src="${producto.imagen}" class="producto-img" loading="lazy" decoding="async">

                <div class="card-body">

                    <h3>${producto.nombre}</h3>

                    <p><strong>Categoría:</strong> ${producto.categoria.join(", ")}</p>

                    <p><strong>Tamaño:</strong> ${producto.tamano}</p>

                    <h2>$${producto.precio.toLocaleString()} ${producto.unidad ? producto.unidad : ""}</h2>
		    
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