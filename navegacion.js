// navegacion.js
// Navegación por categorías + carga dinámica desde /api/products.php

import {
    agregarAlCarrito,
    leerCarrito,
    setCantidad,
    quitarDelCarrito,
    vaciarCarrito
} from './carrito.js';

const MENU_ID = 'menu-categorias';
const CATEGORIA_SELECTOR = 'section.categoria';
const TITULO_ID = 'titulo-categoria';

// índice en memoria: { id: { name, price } }
const productIndex = {};

// ---------- Utilidades ----------
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const BASE = `${location.origin}/metazona/`;   // carpeta real del proyecto

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = mensaje;
    toast.classList.add('visible');

    // Ocultar después de 2 segundos
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 2000);
}

function resolveImagePath(url) {
    try {
        if (!url) return new URL('img/placeholder.jpg', BASE).href;
        const safe = String(url).trim().replace(/\\/g, '/');
        return new URL(safe, BASE).href;
    } catch {
        return new URL('img/placeholder.jpg', BASE).href;
    }
}

function getSlugFromLink(a) {
    const href = a.getAttribute('href') || '';
    return href.startsWith('#') ? decodeURIComponent(href.slice(1)) : null;
}

function setActiveLink(slug) {
    const menu = document.getElementById(MENU_ID);
    if (!menu) return;
    $$('a', menu).forEach(a =>
        a.classList.toggle('is-active', getSlugFromLink(a) === slug)
    );
}

function showOnly(slug) {
    $$(CATEGORIA_SELECTOR).forEach(sec => (sec.style.display = 'none'));
    const sec = document.getElementById(slug);
    if (sec) {
        sec.style.display = 'block';
        const t = document.getElementById(TITULO_ID);
        if (t) t.textContent = sec.querySelector('h2')?.textContent || 'Categoría';
    }
    setActiveLink(slug);
    history.replaceState(null, '', `#${slug}`);
}

// ---------- Carrito ----------
function renderCarrito() {
    const ul = document.getElementById('items-carrito');
    const totalSpan = document.getElementById('total');
    if (!ul || !totalSpan) return;

    const cart = leerCarrito();
    ul.innerHTML = '';

    let total = 0;

    Object.entries(cart).forEach(([id, qty]) => {
        const info = productIndex[id] || {};
        const name = info.name || `Producto ${id}`;
        const price = typeof info.price === 'number' ? info.price : 0;

        const subtotal = price * qty;
        total += subtotal;

        const li = document.createElement('li');
        li.className = 'carrito-item';
        li.dataset.id = id;

        li.innerHTML = `
      <span class="ci-nombre">${name}</span>
      <div class="ci-row">
        <div class="ci-unidades">
          <button class="ci-btn ci-minus" aria-label="Restar">−</button>
          <span class="ci-qty">${qty}</span>
          <button class="ci-btn ci-plus" aria-label="Sumar">+</button>
        </div>
        <span class="ci-subtotal">${subtotal.toFixed(2)} €</span>
        
      </div>
    `;
        ul.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

function wireCartDelegation() {
    const ul = document.getElementById('items-carrito');
    if (!ul) return;

    ul.addEventListener('click', (e) => {
        const li = e.target.closest('.carrito-item');
        if (!li) return;
        const id = li.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('ci-plus')) {
            agregarAlCarrito(id);
            renderCarrito();
        } else if (e.target.classList.contains('ci-minus')) {
            const cart = leerCarrito();
            const next = Math.max(0, (cart[id] || 0) - 1);
            setCantidad(id, next);
            renderCarrito();
        } else if (e.target.classList.contains('ci-remove')) {
            quitarDelCarrito(id);
            renderCarrito();
        }
    });

    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            vaciarCarrito();
            renderCarrito();
        });
    }
}

// --- Modal del carrito ---
function wireCartModal() {
    const btnVer = document.getElementById('btn-ver-carrito');
    const modal = document.getElementById('carrito-modal');
    const btnComprar = document.getElementById('btn-comprar');
    const btnVolver = document.getElementById('btn-volver-tienda');
    const btnCancelar = document.getElementById('btn-cancelar-pedido');

    if (!btnVer || !modal) return;

    const abrirModal = () => {
        renderCarrito();
        modal.classList.add('activo');
        document.body.classList.add('carrito-abierto');
    };

    const cerrarModal = () => {
        modal.classList.remove('activo');
        document.body.classList.remove('carrito-abierto');
    };

    // Abrir modal solo si hay productos
    btnVer.addEventListener('click', () => {
        const cart = leerCarrito();
        const hayProductos = cart && Object.keys(cart).length > 0;

        if (!hayProductos) {
            alert('No puedes entrar al carrito porque aún no compraste nada.');
            return;
        }

        abrirModal();
    });

    // Cerrar con "Volver a la tienda"
    if (btnVolver) {
        btnVolver.addEventListener('click', () => {
            cerrarModal();
        });
    }

    // "Cancelar pedido": vacía carrito y cierra
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            vaciarCarrito();
            renderCarrito();
            cerrarModal();
        });
    }

    // "Comprar": simulamos compra, vaciamos y cerramos
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            alert('¡Compra realizada! (simulado)');
            vaciarCarrito();
            renderCarrito();
            cerrarModal();
        });
    }

    // Cerrar haciendo clic fuera del panel
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// ---------- Renderizado de productos ----------
function crearTarjeta(p) {
    const art = document.createElement('article');
    art.className = 'product-card';
    art.dataset.id = p.id;

    art.innerHTML = `
    <div class="media">
      <img src="${resolveImagePath(p.image_url)}"
           alt="${p.name}"
           class="product-img"
           onerror="this.onerror=null; this.src='${new URL('img/placeholder.jpg', BASE).href}';">
    </div>

    <h3 class="product-title">${p.name}</h3>
    <p class="product-price">${Number(p.price).toFixed(2)}</p>
    <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
  `;

    // guardamos nombre y precio en el índice para usarlo en el carrito
    productIndex[p.id] = {
        name: p.name,
        price: Number(p.price ?? 0),
    };

    art.querySelector('.btn-agregar').addEventListener('click', () => {
        agregarAlCarrito(String(p.id));
        renderCarrito();
        mostrarToast(`${p.name} añadido al carrito`);
    });

    return art;
}

async function cargarCategoria(slug) {
    const grid = document.querySelector(`#${slug} .categoria-grid`);
    if (!grid) return;

    if (grid.dataset.loaded === '1') return;

    grid.innerHTML = '<p>Cargando...</p>';

    try {
        const res = await fetch(`api/products.php?category=${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const productos = await res.json();

        grid.innerHTML = '';
        productos.forEach(p => grid.appendChild(crearTarjeta(p)));

        grid.dataset.loaded = '1';

        // al cargar productos, refrescamos carrito para que aparezcan nombres/precios
        renderCarrito();
    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p style="color:#c00">Error cargando productos.</p>';
    }
}

// ---------- Menú ----------
function wireMenu() {
    const menu = document.getElementById(MENU_ID);
    if (!menu) return;

    menu.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;

        const slug = getSlugFromLink(a);
        if (!slug) return;

        e.preventDefault();
        showOnly(slug);
        cargarCategoria(slug);
    });
}

// ---------- Inicialización ----------
document.addEventListener('DOMContentLoaded', () => {
    wireMenu();
    wireCartDelegation();
    wireCartModal();   // ⬅️ usamos el modal, no el antiguo toggle
    renderCarrito();

    const initial = (location.hash || '').replace('#', '').trim();
    if (initial) {
        showOnly(initial);
        cargarCategoria(initial);
    }

    window.addEventListener('hashchange', () => {
        const slug = (location.hash || '').replace('#', '').trim();
        if (slug) {
            showOnly(slug);
            cargarCategoria(slug);
        }
    });
});


