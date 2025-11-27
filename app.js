// app.js
import {
    agregarAlCarrito,
    quitarDelCarrito,
    leerCarrito,
    vaciarCarrito,
    setCantidad
} from '/Carrito.js';

// Índice de productos tomado del HTML
const productIndex = {};
function buildProductIndex() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const nombre =
            card.dataset.nombre ||
            card.querySelector('.product-title')?.textContent?.trim() ||
            '';
        const precio =
            parseFloat(
                (card.dataset.precio ||
                    card.querySelector('.product-price')?.textContent ||
                    '0'
                ).replace(',', '.')
            ) || 0;
        if (id) productIndex[id] = { nombre, precio };
    });
}

// Pintar carrito
function renderCarrito() {
    const ul = document.getElementById('items-carrito');
    const totalSpan = document.getElementById('total');
    if (!ul || !totalSpan) return;

    const cart = leerCarrito();
    ul.innerHTML = '';

    let total = 0;

    // Cabecera tipo ticket
    const header = document.createElement('li');
    header.className = 'carrito-header';
    header.innerHTML = `
      <span class="ch-nombre">Producto</span>
      <span class="ch-unidades">Unid.</span>
      <span class="ch-precio">Precio</span>
      <span class="ch-total">Total</span>
    `;
    ul.appendChild(header);

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
        <span class="ci-precio">${price.toFixed(2)} €</span>
        <span class="ci-subtotal">${subtotal.toFixed(2)} €</span>
        <button class="ci-btn ci-remove" aria-label="Quitar">✕</button>
      </div>
    `;
        ul.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}


// ocultar el carrito
function wireCartToggle() {
    const btn = document.getElementById('btn-ver-carrito');
    const carrito = document.getElementById('carrito');
    if (!btn || !carrito) return;

    // Ocultar de inicio
    carrito.classList.add('oculto');

    btn.addEventListener('click', () => {
        const hidden = carrito.classList.toggle('oculto');
        btn.textContent = hidden ? 'Ver carrito' : 'Ocultar carrito';
    });
}

// Click en “Agregar al carrito”
function wireAddButtons() {
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.currentTarget.dataset.id;
            if (!id) return;
            agregarAlCarrito(id);
            renderCarrito();
        });
    });
}

// Acciones dentro del carrito (+ / − / quitar)
function wireCartActions() {
    const ul = document.getElementById('items-carrito');
    if (!ul) return;

    ul.addEventListener('click', e => {
        const li = e.target.closest('.carrito-item');
        if (!li) return;
        const id = li.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('ci-plus')) {
            agregarAlCarrito(id);
            renderCarrito();
        } else if (e.target.classList.contains('ci-minus')) {
            const cart = leerCarrito();
            const current = parseInt(cart[id] || 0, 10);
            const next = Math.max(0, current - 1);
            setCantidad(id, next);
            renderCarrito();
        } else if (e.target.classList.contains('ci-remove')) {
            quitarDelCarrito(id);
            renderCarrito();
        }
    });
}

// Botón “Vaciar carrito”
function wireEmptyButton() {
    const btn = document.getElementById('vaciar-carrito');
    if (!btn) return;
    btn.addEventListener('click', () => {
        vaciarCarrito();
        renderCarrito();
    });
}

// Arranque
document.addEventListener('DOMContentLoaded', () => {
    wireMenu();
    wireCartDelegation();
    wireCartToggle();   // ⬅️ NUEVO
    renderCarrito();

});

