const tbody=document.querySelector('#tabla tbody');
const productos=JSON.parse(localStorage.getItem('productos')||'[]');
function render(lista=productos){
tbody.innerHTML='';
lista.forEach(p=>{
tbody.innerHTML+=`<tr><td>${p.nombre||''}</td><td>${p.categoria||''}</td><td>${p.precio||''}</td><td><button>Editar</button> <button>Eliminar</button></td></tr>`;
});
}
document.getElementById('buscar').addEventListener('input',e=>{
const t=e.target.value.toLowerCase();
render(productos.filter(p=>(p.nombre||'').toLowerCase().includes(t)));
});
render();
