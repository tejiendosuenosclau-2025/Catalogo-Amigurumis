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
    "Disponibles": '<svg class="cat-icono c-Disponibles" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.6"/><path d="m8.9 12 2.1 2.1 4-4.2"/></svg>',
    "Animales": '<svg class="cat-icono c-Animales" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.8" cy="9.8" r="1.7"/><circle cx="16.2" cy="9.8" r="1.7"/><circle cx="10.2" cy="7.2" r="1.7"/><circle cx="13.8" cy="7.2" r="1.7"/><path d="M12 14.6c-2.8 0-4.9 1.9-4.9 3.7 0 1.1.8 1.9 1.9 1.9h6c1.1 0 1.9-.8 1.9-1.9 0-1.8-2.1-3.7-4.9-3.7z"/></svg>',
    "Personajes": '<svg class="cat-icono c-Personajes" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3.5 2.4 5.1 5.6.6-4.1 3.8 1.1 5.5L12 15.9l-5 2.6 1.1-5.5L4 9.2l5.6-.6z"/><path d="M19.6 4.4l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z"/><path d="M5.2 2.6l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"/></svg>',
    "Llaveros": '<svg class="cat-icono c-Llaveros" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="16" r="4"/><path d="M10.5 13 21 3.5"/><path d="M16.8 6.3 19 8.5M13.8 8.8l2.2 2.2M18.3 11l1.2 1.2"/></svg>',
    "Personalizados": '<svg class="cat-icono c-Personalizados" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a8 8 0 0 0-8 8c0 4.4 3.6 8 8 8 1.4 0 2.2-1 2.2-2.2 0-1-.6-1.7-.6-2.7 0-1.3 1.2-2.1 2.7-2.1h1.4c2.3 0 3.8-1.6 3.8-3.6C21.5 6.4 17.3 4 12 4z"/><circle cx="8.5" cy="9.5" r="1.1"/><circle cx="12" cy="7.6" r="1.1"/><circle cx="15.4" cy="9.2" r="1.1"/></svg>'
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

        // Scroll automático al catálogo al hacer clic en una categoría
        const destinoCatalogo = document.getElementById("catalogo");
        if (destinoCatalogo) {
            destinoCatalogo.scrollIntoView({ behavior: "smooth", block: "start" });
        }

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