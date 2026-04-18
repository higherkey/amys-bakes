/* ============================
   Amy's Bakes — Cart & Shared JS
   cart.js
   ============================ */

// ── Cart State ──
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('amys-bakes-cart') || '[]');
    this.listeners = [];
  }

  save() {
    localStorage.setItem('amys-bakes-cart', JSON.stringify(this.items));
    this.listeners.forEach(fn => fn(this.items));
  }

  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) this.removeItem(id);
    else this.save();
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  }

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }

  onChange(fn) { this.listeners.push(fn); }
}

// ── Global Cart Instance ──
const cart = new Cart();

// ── Navbar ──
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const cartBtn = document.getElementById('cart-btn');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }

  // Mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  updateCartBadge();
  cart.onChange(updateCartBadge);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const count = cart.getCount();
  badge.textContent = count;
  badge.classList.toggle('has-items', count > 0);
}

// ── Cart Drawer ──
function initCartDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('cart-close');

  if (!overlay || !drawer) return;

  overlay.addEventListener('click', closeCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      openCheckoutModal();
    });
  }

  cart.onChange(() => renderCartDrawer());
  renderCartDrawer();
}

function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-amount');
  const emptyEl = document.getElementById('cart-empty');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!itemsEl) return;

  const items = cart.items;
  const total = cart.getTotal();

  if (items.length === 0) {
    itemsEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (checkoutBtn) checkoutBtn.disabled = false;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  itemsEl.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="cartQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="cartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          <button class="cart-item-remove" onclick="cartRemove('${item.id}')" aria-label="Remove item">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

function cartQty(id, delta) { cart.updateQty(id, delta); }
function cartRemove(id) { cart.removeItem(id); }

// ── Add To Cart ──
function addToCart(product) {
  cart.addItem(product);
  showToast(`✓ ${product.name} added to bag`, 'success');
}

// ── Checkout Modal ──
function initCheckoutModal() {
  const overlay = document.getElementById('checkout-overlay');
  const closeBtn = document.getElementById('checkout-modal-close');
  const form = document.getElementById('checkout-form');

  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCheckoutModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCheckoutModal);

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Simulate order placement
      const successEl = document.getElementById('checkout-success');
      if (successEl) {
        form.style.display = 'none';
        successEl.style.display = 'block';
        cart.clear();
      }
    });
  }

  // Reopen success close
  document.getElementById('success-close-btn')?.addEventListener('click', () => {
    closeCheckoutModal();
    const form = document.getElementById('checkout-form');
    const success = document.getElementById('checkout-success');
    if (form) form.style.display = 'block';
    if (success) success.style.display = 'none';
  });
}

function openCheckoutModal() {
  if (cart.items.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCheckoutSummary();
  }
}

function closeCheckoutModal() {
  document.getElementById('checkout-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  el.innerHTML = cart.items.map(i => `
    <div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.06)">
      <span style="color:var(--text-light)">${i.name} × ${i.qty}</span>
      <span style="color:var(--gold)">$${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('') + `
    <div style="display:flex;justify-content:space-between;font-family:var(--font-serif);font-size:1.05rem;padding-top:0.75rem;margin-top:0.25rem">
      <span style="color:var(--cream)">Total</span>
      <span style="color:var(--gold-light);font-weight:700">$${cart.getTotal().toFixed(2)}</span>
    </div>
  `;
}

// ── Toast ──
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✦' : 'ℹ'}</span> ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ── Scroll Animations ──
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCartDrawer();
  initCheckoutModal();
  initScrollAnimations();
});
