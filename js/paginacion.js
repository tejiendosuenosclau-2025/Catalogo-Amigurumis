const productosPorPagina = 8;
let paginaActual = 1;
let productos = [];

function renderizarPagina() {
    const contenedor = document.getElementById("productos");
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    contenedor.innerHTML = "";

    productos.slice(inicio, fin).forEach(p => {
        contenedor.innerHTML += `
        <article class="card">
            <img class="producto-img" src="${p.imagen}" alt="${p.nombre}">
            <div class="card-body">
                <h3>${p.nombre}</h3>
                <p>${p.categoria}</p>
                <div class="precio">
                    $${Number(p.precio).toLocaleString("es-CO")}
                </div>
                <a href="#" class="btn">Ver detalles</a>
            </div>
        </article>`;
    });

    crearBotones();
}

function crearBotones() {
    let paginador = document.getElementById("paginacion");

    if (!paginador) {
        paginador = document.createElement("div");
        paginador.id = "paginacion";
        document.querySelector("#catalogo").appendChild(paginador);
    }

    paginador.innerHTML = "";

    const total = Math.ceil(productos.length / productosPorPagina);

    for (let i = 1; i <= total; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === paginaActual) {
            btn.classList.add("activo");
        }

        btn.onclick = () => {
            paginaActual = i;
            renderizarPagina();
        };

        paginador.appendChild(btn);
    }
}

async function cargarProductos() {
    const respuesta = await fetch("data/productos.json");
    productos = await respuesta.json();
    renderizarPagina();
}

document.addEventListener("DOMContentLoaded", cargarProductos);