/* ============================
   Amy's Bakes — Contact Page JS
   contact.js
   ============================ */

// ── Form Tabs ──
function initFormTabs() {
  const tabs = document.querySelectorAll('.form-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ── Flavor Chips ──
function initFlavorChips() {
  document.querySelectorAll('.flavor-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      // Update hidden input with selected flavors
      const selected = [...document.querySelectorAll('.flavor-chip.selected')]
        .map(c => c.dataset.flavor).join(', ');
      const input = document.getElementById('selected-flavors');
      if (input) input.value = selected;
    });
  });
}

// ── Budget Radio ──
function initBudgetOptions() {
  document.querySelectorAll('.budget-option input').forEach(input => {
    input.addEventListener('change', () => {
      // visual state handled by CSS :checked
    });
  });
}

// ── Inspiration Upload ──
function initUpload() {
  const upload = document.getElementById('inspiration-upload');
  const label = document.getElementById('upload-label');
  if (!upload) return;

  upload.addEventListener('change', () => {
    if (upload.files.length > 0) {
      const names = [...upload.files].map(f => f.name).join(', ');
      if (label) label.textContent = `📎 ${names}`;
    }
  });
}

// ── Contact Form ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate async send
    setTimeout(() => {
      form.innerHTML = `
        <div class="success-state">
          <div class="success-icon">✦</div>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. Amy will get back to you within 24–48 hours.</p>
        </div>
      `;
    }, 1200);
  });
}

// ── Custom Request Form ──
function initCustomForm() {
  const form = document.getElementById('custom-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    setTimeout(() => {
      form.innerHTML = `
        <div class="success-state">
          <div class="success-icon">✦</div>
          <h3>Custom Request Received!</h3>
          <p>Amy will review your request and reach out within 2–3 business days to discuss details and pricing.</p>
        </div>
      `;
    }, 1400);
  });
}

// ── FAQ Accordion ──
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initFormTabs();
  initFlavorChips();
  initBudgetOptions();
  initUpload();
  initContactForm();
  initCustomForm();
  initFAQ();
});
