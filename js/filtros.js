// filtros.js
export function filtrar(productos,texto,categoria){
 return productos.filter(p=>
 (categoria==='Todos'||p.categoria===categoria) &&
 p.nombre.toLowerCase().includes(texto.toLowerCase()));
}
