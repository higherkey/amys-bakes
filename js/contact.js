/* ============================
   Amy's Bakes — Contact Page JS
   contact.js
   ============================ */

// ── Form Tabs ──
function initFormTabs() {
  const tabs = document.querySelectorAll('.form-tab');
  const panes = document.querySelectorAll('.tab-pane');

  function switchTab(tabId) {
    const tab = [...tabs].find(t => t.dataset.tab === tabId);
    if (!tab) return;
    
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    
    tab.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  // Check URL params for auto-switching
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get('tab');
  if (requestedTab) {
    // tab-review or tab-custom or tab-message
    switchTab(`tab-${requestedTab}`);
    // Smooth scroll to form
    const formPanel = document.querySelector('.contact-forms');
    if (formPanel) {
      setTimeout(() => {
        formPanel.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
}

// ── Flavor Chips ──
function initFlavorChips() {
  document.querySelectorAll('.flavor-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const selected = [...document.querySelectorAll('.flavor-chip.selected')]
        .map(c => c.dataset.flavor).join(', ');
      const input = document.getElementById('selected-flavors');
      if (input) input.value = selected;
    });
  });
}

// ── Budget Radio ──
function initBudgetOptions() {
  // Logic handled by CSS :checked for visual state
}

// ── Inspiration Upload ──
function initUpload() {
  const upload = document.getElementById('inspiration-upload');
  const label = document.getElementById('upload-label');
  if (!upload) return;

  upload.addEventListener('change', () => {
    if (upload.files.length > 0) {
      const name = upload.files.length === 1 ? upload.files[0].name : `${upload.files.length} files selected`;
      if (label) label.textContent = name;
    }
  });
}

// ── Form Submissions ──
function initForms() {
  const forms = ['contact-form', 'custom-form', 'review-form'];
  
  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Submitting...';

      // Simulate success
      setTimeout(() => {
        form.closest('.form-panel').innerHTML = `
          <div class="success-state">
            <div class="success-icon">✦</div>
            <h3>Thank You!</h3>
            <p>Your submission has been received. Amy will be in touch soon!</p>
            <br>
            <button class="btn btn-outline" onclick="location.reload()">Send Another</button>
          </div>
        `;
      }, 1500);
    });
  });
}

// ── FAQ Accordion ──
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
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
  initForms();
  initFAQ();
});
