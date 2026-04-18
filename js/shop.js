/* ============================
   Amy's Bakes — Shop Page JS
   shop.js
   ============================ */

// ── Product Catalog ──
const PRODUCTS = [
  {
    id: 'custom-cake',
    name: 'Custom Celebration Cake',
    desc: 'Fully customized celebration cakes for any occasion — birthdays, weddings, anniversaries, and more.',
    price: null,
    image: 'images/cake.png',
    badge: 'Placeholder',
    category: 'cakes',
    tags: ['Custom', 'Made to Order'],
    from: true
  },
  {
    id: 'artisan-bread',
    name: 'Artisan Sourdough & Croissants',
    desc: 'Slow-fermented sourdough loaves and buttery, flaky croissants baked fresh to order.',
    price: null,
    image: 'images/bread.png',
    badge: 'Placeholder',
    category: 'breads',
    tags: ['Sourdough', 'Fresh Baked'],
    from: false
  },
  {
    id: 'decorated-cookies',
    name: 'Decorated Sugar Cookies',
    desc: 'Hand-painted royal icing cookies in any theme or color. Perfect for events and gifting.',
    price: null,
    image: 'images/cookies.png',
    badge: 'Placeholder',
    category: 'cookies',
    tags: ['Custom', 'Per Dozen'],
    from: true
  },
  {
    id: 'macaron-tower',
    name: 'French Macaron Collection',
    desc: 'Delicate Parisian-style macarons available in seasonal flavors. Sold by the half or full dozen.',
    price: null,
    image: 'images/macarons.png',
    badge: 'Placeholder',
    category: 'cookies',
    tags: ['Gluten-Friendly', 'Per Dozen'],
    from: true
  },
  {
    id: 'cinnamon-rolls',
    name: 'Gourmet Cinnamon Rolls',
    desc: 'Oversized, fluffy cinnamon rolls with brown butter cream cheese frosting. Sold by the half dozen.',
    price: null,
    image: 'images/cinnamon-rolls.png',
    badge: 'Placeholder',
    category: 'pastries',
    tags: ['Half Dozen', 'Classic'],
    from: false
  },
  {
    id: 'cookie-box',
    name: 'Signature Cookie Gift Box',
    desc: 'A curated assortment of Amy\'s best cookies — a beautiful gift for any occasion.',
    price: null,
    image: 'images/cookies.png',
    badge: 'Placeholder',
    category: 'cookies',
    tags: ['Gift Box', 'Assorted'],
    from: false
  }
];

// ── Render Products ──
function renderProducts(filter = 'all') {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => {
    const hidden = filter !== 'all' && p.category !== filter ? 'hidden' : '';
    const priceLabel = `<span class="from">Inquiry Only</span>`;
    const badge = p.badge ? `<span class="shop-badge">${p.badge}</span>` : '';
    const tags = p.tags.map(t => `<span class="shop-tag">${t}</span>`).join('');

    return `
      <div class="shop-card animate-on-scroll ${hidden}" data-category="${p.category}" data-id="${p.id}">
        <div class="shop-card-image">
          ${badge}
          <img src="${p.image}" alt="${p.name}">
          <div class="shop-card-overlay">
            <button class="btn btn-primary" onclick="handleAddToCart('${p.id}')" id="add-${p.id}">
              Add to Inquiry
            </button>
          </div>
        </div>
        <div class="shop-card-body">
          <div class="shop-card-name">${p.name}</div>
          <div class="shop-card-desc">${p.desc}</div>
          <div class="shop-card-tags">${tags}</div>
          <div class="shop-card-footer">
            <div class="shop-card-price">${priceLabel}</div>
            <button class="btn btn-outline" style="padding:0.55rem 1rem;font-size:0.75rem" onclick="handleAddToCart('${p.id}')" id="add-btn-${p.id}">
              Add to Inquiry
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-trigger scroll animations for new cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  grid.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function handleAddToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (product) addToCart(product);
}

// ── Filter Controls ──
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderProducts(filter);
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFilters();
});
