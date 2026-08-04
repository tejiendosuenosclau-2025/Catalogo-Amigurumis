// Gestión básica de imágenes
export function previsualizar(input, imgId){
  const img=document.getElementById(imgId);
  const file=input.files?.[0];
  if(file && img){
    img.src=URL.createObjectURL(file);
  }
}
