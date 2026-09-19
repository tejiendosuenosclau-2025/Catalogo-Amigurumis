/* ============================================================
   CATÁLOGO — Tejiendo Sueños Clau
   ------------------------------------------------------------
   Este archivo SOLO se ocupa del catálogo:
     · pedir los productos (Supabase o data/productos.json)
     · pintar las tarjetas
     · filtrar por categoría y por texto

   Los iconos de las pastillas viven en el HTML: aquí solo se
   actualiza el número de cada contador (.cat-num), sin reescribir
   las pastillas enteras. Eso era lo que hacía parpadear los iconos.
   ============================================================ */

const contenedor = document.getElementById("productos");

const TELEFONO_WHATSAPP = "573011810933";
const ENLACE_WHATSAPP = "https://wa.me/" + TELEFONO_WHATSAPP;
const SALUDO_WHATSAPP = "Hola, estoy interesado en el amigurumi ";

const ICONO_WHATSAPP =
    '<svg class="btn-icono" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
    '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.1 8.1 0 0 1-1.25-4.29c0-4.48 3.65-8.12 8.13-8.12s8.12 3.64 8.12 8.12-3.64 8.16-8.12 8.16zm4.47-6.1c-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.7 4.1 3.68 2.41.98 2.41.65 2.85.61.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>';

let todosLosProductos = [];
let categoriaActiva = "Todos";

/* ============================================================
   UTILIDADES
   ============================================================ */

/* Los datos vienen de la base de datos y de un JSON: se escapan antes
   de meterlos en el HTML. */
function esc(texto) {
    return String(texto == null ? "" : texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/* "Popayán" tiene que encontrarse escribiendo "popayan" */
function sinAcentos(texto) {
    return String(texto == null ? "" : texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

/* Un producto puede traer la categoría de dos formas:
     · Supabase → array  ["Animales"]
     · productos.json → texto "Animales,Personajes"
   Antes se llamaba a .join() sin comprobar: con un texto reventaba. */
function listaCategorias(producto) {
    const categorias = producto && producto.categoria;
    if (Array.isArray(categorias)) {
        return categorias.map(function (c) { return String(c).trim(); }).filter(Boolean);
    }
    return String(categorias == null ? "" : categorias)
        .split(",")
        .map(function (c) { return c.trim(); })
        .filter(Boolean);
}

/* El precio puede llegar como número o como texto ("30000"). */
function textoPrecio(producto) {
    const numero = Number(producto && producto.precio);
    if (!isFinite(numero) || numero <= 0) return "Precio a convenir";
    return "$" + numero.toLocaleString("es-CO");
}

/* Un id por producto para poder enlazar directo (#rapunzel).
   Si dos productos se llaman igual (en el catálogo hay dos
   "Llavero Perro"), el segundo pasa a ser #llavero-perro-2. */
function anclaPara(nombre, yaUsadas) {
    let base = sinAcentos(nombre)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    if (!base) base = "amigurumi";
    let ancla = base;
    let n = 2;
    while (yaUsadas[ancla]) {
        ancla = base + "-" + n;
        n++;
    }
    yaUsadas[ancla] = true;
    return ancla;
}

function reducirMovimiento() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/* ============================================================
   TARJETAS
   ============================================================ */

function tarjetaHTML(producto, ancla) {
    const nombre = esc(producto.nombre);
    const tamano = esc(producto.tamano || "");
    const unidad = esc(producto.unidad || "");
    const imagen = producto.imagen ? esc(producto.imagen) : "";
    const descripcion = esc(producto.descripcion || "");
    const categorias = listaCategorias(producto);

    /* Una sola línea descriptiva, sin inventar datos: si la base de
       datos trae descripción se usa, y si no se compone con lo que hay. */
    const linea = descripcion || ("Tejido a mano en Popayán" + (tamano ? " · Tamaño: " + tamano : ""));

    const etiquetas = categorias.map(function (c) {
        return '<span class="etiqueta">' + esc(c) + "</span>";
    }).join("");

    const enlaceWhatsApp = ENLACE_WHATSAPP + "?text=" +
        encodeURIComponent(SALUDO_WHATSAPP + producto.nombre);

    /* La foto: si el producto no tiene imagen, se deja el hueco con el
       mismo alto (aspect-ratio del CSS) en vez de un icono roto. */
    const foto = imagen
        ? '<img src="' + imagen + '" alt="' + nombre +
          ' — amigurumi tejido a mano en Popayán" class="producto-img" loading="lazy" decoding="async">'
        : '<div class="producto-img" role="img" aria-label="' + nombre + '"></div>';

    return '' +
        '<div class="card" id="' + ancla + '">' +
            /* Elemento vacío solo para los adornos (foco de luz y
               barrido de brillo del CSS .card-efectos). Se pone aquí
               y no con un ::before de la tarjeta para no pisar los
               ::before / ::after que ya usan los CSS base. */
            '<span class="card-efectos" aria-hidden="true"></span>' +
            foto +
            '<div class="card-body">' +
                '<h3 class="nombre">' + nombre + '</h3>' +
                '<p class="descripcion">' + linea + '</p>' +
                (etiquetas ? '<div class="etiquetas">' + etiquetas + '</div>' : '') +
                '<p class="precio">' + textoPrecio(producto) +
                    (unidad ? ' <span class="unidad">' + unidad + '</span>' : '') +
                '</p>' +
                '<div class="acciones">' +
                    '<a class="btn secundario" href="' + enlaceWhatsApp +
                       '" target="_blank" rel="noopener">' +
                        ICONO_WHATSAPP + 'Pedir por WhatsApp' +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</div>';
}

function mensajeVacio() {
    const enlace = '<a href="' + ENLACE_WHATSAPP +
        '?text=' + encodeURIComponent("Hola, quiero información sobre los amigurumis") +
        '" target="_blank" rel="noopener">WhatsApp</a>';

    if (categoriaActiva !== "Todos") {
        return 'Todavía no hay productos en «' + esc(categoriaActiva) +
            '». Escríbenos por ' + enlace + ' y lo hacemos a tu medida.';
    }
    return 'El catálogo está vacío por ahora. Escríbenos por ' + enlace +
        ' y te contamos qué podemos tejer para ti.';
}

/* ============================================================
   FILTROS Y PINTADO
   ============================================================ */

/* El buscador se retiró: ahora solo filtra la categoría elegida. */
function listaParaMostrar() {
    if (categoriaActiva === "Todos") return todosLosProductos.slice();

    return todosLosProductos.filter(function (producto) {
        return listaCategorias(producto).indexOf(categoriaActiva) !== -1;
    });
}

function pintarEstadoActivo() {
    document.querySelectorAll(".categoria").forEach(function (btn) {
        /* Se limpian también los nombres antiguos por si algún otro
           script los añade: el estado activo es SOLO uno. */
        btn.classList.remove("activa", "activo", "active", "seleccionada");
        const esActiva = btn.dataset.categoria === categoriaActiva;
        if (esActiva) btn.classList.add("activa");
        btn.setAttribute("aria-pressed", esActiva ? "true" : "false");
    });
}

/* Pinta la lista que toque según la categoría elegida. */
function render() {
    if (!contenedor) return;

    const lista = listaParaMostrar();

    if (!lista.length) {
        contenedor.innerHTML = '<p class="estado-vacio">' + mensajeVacio() + "</p>";
        return;
    }

    const yaUsadas = {};
    contenedor.innerHTML = lista.map(function (producto) {
        return tarjetaHTML(producto, anclaPara(producto.nombre, yaUsadas));
    }).join("");
}

/* Se mantiene el nombre de antes para no romper nada que lo llame. */
function mostrarProductos(categoria) {
    categoriaActiva = (typeof categoria === "string" && categoria) ? categoria : "Todos";
    pintarEstadoActivo();
    render();
}

/* Solo toca el número de cada pastilla: los iconos y el texto del HTML
   se quedan intactos. */
function actualizarContadores() {
    const total = todosLosProductos.length;

    document.querySelectorAll(".categoria").forEach(function (btn) {
        const categoria = btn.dataset.categoria;
        const cantidad = categoria === "Todos"
            ? total
            : todosLosProductos.filter(function (producto) {
                return listaCategorias(producto).indexOf(categoria) !== -1;
              }).length;

        const numero = btn.querySelector(".cat-num");
        if (numero) numero.textContent = cantidad;
    });
}

/* ============================================================
   ENLACES DIRECTOS (#rapunzel)
   El JSON-LD apunta a anclas de producto. Antes no existían y el
   enlace dejaba al visitante en una sección oculta.
   ============================================================ */

function irAlAncla() {
    const hash = decodeURIComponent(String(location.hash || "")).replace(/^#/, "");
    if (!hash) return;
    const destino = document.getElementById(hash);
    if (!destino) return;
    setTimeout(function () {
        destino.scrollIntoView({
            behavior: reducirMovimiento() ? "auto" : "smooth",
            block: "center"
        });
    }, 120);
}

/* ============================================================
   ARRANQUE
   ============================================================ */

document.querySelectorAll(".categoria").forEach(function (btn) {
    btn.addEventListener("click", function () {
        categoriaActiva = btn.dataset.categoria || "Todos";
        pintarEstadoActivo();
        render();

        const destino = document.getElementById("catalogo");
        if (destino) {
            destino.scrollIntoView({
                behavior: reducirMovimiento() ? "auto" : "smooth",
                block: "start"
            });
        }
    });
});

window.addEventListener("hashchange", irAlAncla);

fetch("data/productos.json")
    .then(function (respuesta) {
        if (!respuesta.ok) throw new Error("No se pudo leer el catálogo (" + respuesta.status + ")");
        return respuesta.json();
    })
    .then(function (datos) {
        if (!Array.isArray(datos)) throw new Error("El catálogo no tiene el formato esperado");

        todosLosProductos = datos;
        window.todosLosProductos = datos;

        /* Aviso para quien quiera enterarse de que ya hay productos */
        window.dispatchEvent(new Event("productosCargados"));

        actualizarContadores();
        pintarEstadoActivo();
        render();
        irAlAncla();
    })
    .catch(function (error) {
        /* Sin datos se avisa con claridad en vez de dejar un hueco. */
        if (contenedor) {
            contenedor.innerHTML = '<p class="estado-vacio">' +
                'No pudimos cargar el catálogo ahora mismo (' + esc(error && error.message) + '). ' +
                'Recarga la página o escríbenos por ' +
                '<a href="' + ENLACE_WHATSAPP +
                '?text=' + encodeURIComponent("Hola, quiero ver el catálogo de amigurumis") +
                '" target="_blank" rel="noopener">WhatsApp</a>.</p>';
        }
        console.error("[catálogo]", error);
    });
