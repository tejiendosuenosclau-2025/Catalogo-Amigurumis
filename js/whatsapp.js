export function abrirWhatsApp(p,numero){
const m=`Hola, estoy interesado en ${p.nombre} ($${p.precio}).`;
window.open(`https://wa.me/${numero}?text=${encodeURIComponent(m)}`,'_blank');
}