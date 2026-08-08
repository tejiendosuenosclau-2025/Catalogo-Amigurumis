-- TEJIENDO SUEÑOS CLAU — BASE DE DATOS
create extension if not exists pgcrypto;

create table if not exists public.clientes (
 id uuid primary key default gen_random_uuid(),
 nombre text not null,
 identificacion text unique,
 telefono text,
 correo text,
 direccion text,
 created_at timestamptz not null default now()
);

create table if not exists public.facturas (
 id uuid primary key default gen_random_uuid(),
 numero text not null unique,
 fecha date not null default current_date,
 cliente_id uuid not null references public.clientes(id) on delete restrict,
 forma_pago text not null default 'Contado',
 estado text not null default 'Pagada',
 observaciones text,
 subtotal numeric(14,2) not null default 0,
 descuento_porcentaje numeric(5,2) not null default 0,
 iva_porcentaje numeric(5,2) not null default 0,
 total numeric(14,2) not null default 0,
 usuario_id uuid not null references auth.users(id) on delete restrict,
 created_at timestamptz not null default now()
);

create table if not exists public.factura_detalle (
 id uuid primary key default gen_random_uuid(),
 factura_id uuid not null references public.facturas(id) on delete cascade,
 producto_id text,
 producto_nombre text not null,
 cantidad numeric(12,2) not null default 1,
 precio_unitario numeric(14,2) not null default 0,
 descuento_porcentaje numeric(5,2) not null default 0,
 total numeric(14,2) not null default 0,
 created_at timestamptz not null default now()
);

create index if not exists idx_facturas_fecha on public.facturas(fecha desc);
create index if not exists idx_facturas_cliente on public.facturas(cliente_id);
create index if not exists idx_detalle_factura on public.factura_detalle(factura_id);

alter table public.clientes enable row level security;
alter table public.facturas enable row level security;
alter table public.factura_detalle enable row level security;

drop policy if exists clientes_auth on public.clientes;
create policy clientes_auth on public.clientes for all to authenticated using (true) with check (true);

drop policy if exists facturas_auth on public.facturas;
create policy facturas_auth on public.facturas for all to authenticated using (true) with check (true);

drop policy if exists detalle_auth on public.factura_detalle;
create policy detalle_auth on public.factura_detalle for all to authenticated using (true) with check (true);
