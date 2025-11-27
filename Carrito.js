// carrito.js

// Estado del carrito en memoria + persistencia en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar +1 a un producto
export function agregarAlCarrito(productId) {
    carrito[productId] = (carrito[productId] || 0) + 1;
    guardarCarrito();
}

// Restar 1 (y eliminar si llega a 0)
export function quitarDelCarrito(productId) {
    if (!carrito[productId]) return;
    carrito[productId]--;
    if (carrito[productId] <= 0) delete carrito[productId];
    guardarCarrito();
}

// Establecer cantidad exacta (para botones +/-)
export function setCantidad(productId, cantidad) {
    const n = Math.max(0, parseInt(cantidad ?? 0, 10) || 0);
    if (n === 0) {
        delete carrito[productId];
    } else {
        carrito[productId] = n;
    }
    guardarCarrito();
}

// Vaciar carrito completo
export function vaciarCarrito() {
    carrito = {};
    guardarCarrito();
}

// Leer carrito (objeto {id: qty})
export function leerCarrito() {
    return { ...carrito };
}


// metodo fech
async function cargarCategoria(slug) {
    const grid = document.querySelector(`#${slug} .categoria-grid`);
    if (!grid) return;

    // Evita recargar si ya tiene contenido
    if (grid.dataset.loaded === '1') return;

    grid.innerHTML = '<p>Cargando...</p>';
    try {
        const res = await fetch(`/metazona/api/products.php?category=${encodeURIComponent(slug)}`);
        const productos = await res.json();

        grid.innerHTML = '';
        productos.forEach(p => {
            const art = document.createElement('article');
            art.className = 'product-card';
            art.dataset.id = p.id;
            art.dataset.nombre = p.name;
            art.dataset.precio = p.price;
            art.innerHTML = `
        <div class="media">
          <img src="${p.image_url || 'img/placeholder.jpg'}" alt="${p.name}" class="product-img" />
        </div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">${Number(p.price).toFixed(2)}</p>
        <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
      `;
            grid.appendChild(art);
        });

        grid.dataset.loaded = '1';
        renderCarrito(); // refresca para que nombres y precios se vean bien

        // (Importante) dar vida a los nuevos botones con el listener de app.js:
        // si tus botones no reaccionan tras cargar, llama a esta línea para re-conectar:
        import('./app.js').then(() => {/* los listeners de add se vuelven a enlazar si tu app.js los inicializa por selector */ });
    } catch (err) {
        grid.innerHTML = '<p style="color:#c00">Error cargando productos.</p>';
        console.error(err);
    }
}

// Engánchalo a tu navegación ya existente
document.addEventListener('DOMContentLoaded', () => {
    // al cambiar de hash, cargar esa categoría
    window.addEventListener('hashchange', () => {
        const slug = location.hash.replace('#', '').trim();
        if (slug) cargarCategoria(slug);
    });
    // si ya hay hash al abrir
    const first = location.hash.replace('#', '').trim();
    if (first) cargarCategoria(first);
});
