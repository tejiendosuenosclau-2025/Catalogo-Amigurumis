FACTURACIÓN CON BASE DE DATOS

Este paquete ya no depende de localStorage para guardar facturas.
Usa Supabase para:
- Login seguro mediante Authentication.
- Clientes.
- Facturas.
- Detalle de factura.
- Historial compartido entre dispositivos.

PASOS:
1. Crea un proyecto en Supabase.
2. SQL Editor -> ejecuta supabase.sql.
3. Authentication -> Users -> Add user: crea el correo y contraseña para entrar.
4. Abre js/supabase-config.js y coloca Project URL y anon/public key.
5. Sube facturacion.html y la carpeta js/ a tu proyecto.
6. Mantén data/productos.json donde está.

IMPORTANTE:
No pongas la clave service_role en el proyecto.
Este sistema guarda facturas en base de datos, pero no constituye por sí solo facturación electrónica DIAN.
