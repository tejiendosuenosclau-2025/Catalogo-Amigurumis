
let productos = JSON.parse(localStorage.getItem('productos') || '[]');

export function guardarProductos(){
  localStorage.setItem('productos', JSON.stringify(productos));
}

export function agregarProducto(producto){
  producto.id = Date.now();
  productos.push(producto);
  guardarProductos();
}

export function eliminarProducto(id){
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
}

export function editarProducto(id, datos){
  const i = productos.findIndex(p => p.id === id);
  if(i >= 0){
    productos[i] = {...productos[i], ...datos};
    guardarProductos();
  }
}

export function obtenerProductos(){
  return productos;
}
