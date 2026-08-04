const modal=document.createElement('div');
modal.id='modalProducto';
modal.innerHTML=`<div class="modal-contenido">
<button id="cerrarModal">&times;</button>
<img id="modalImg"><h2 id="modalTitulo"></h2>
<p id="modalDesc"></p><div id="modalPrecio"></div>
</div>`;
document.body.appendChild(modal);

export function abrirModal(p){
modal.style.display='flex';
modal.querySelector('#modalImg').src=p.imagen;
modal.querySelector('#modalTitulo').textContent=p.nombre;
modal.querySelector('#modalDesc').textContent=p.descripcion||'';
modal.querySelector('#modalPrecio').textContent='$'+Number(p.precio).toLocaleString('es-CO');
}
document.addEventListener('click',e=>{
 if(e.target.id==='cerrarModal'||e.target.id==='modalProducto') modal.style.display='none';
});
