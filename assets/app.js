const basePrice = 200;
const pricingChecks = [document.getElementById('addon-karaoke'), document.getElementById('addon-stems')].filter(Boolean);
const formChecks = [document.getElementById('form-karaoke'), document.getElementById('form-stems')].filter(Boolean);
const estimatedTotalEl = document.getElementById('estimatedTotal');
const formTotalEl = document.getElementById('formTotal');
const selectedTotalInput = document.getElementById('selected_total');

function calculateTotal() {
  let addons = 0;
  pricingChecks.forEach((c) => { if (c.checked) addons += Number(c.value || 0); });
  const total = basePrice + addons;
  estimatedTotalEl.textContent = `$${total}`;
  formTotalEl.textContent = `$${total}`;
  selectedTotalInput.value = `$${total}`;

  // Mirror pricing section checkboxes into form checkboxes.
  if (formChecks[0]) formChecks[0].checked = pricingChecks[0]?.checked || false;
  if (formChecks[1]) formChecks[1].checked = pricingChecks[1]?.checked || false;
}

pricingChecks.forEach((check) => check.addEventListener('change', calculateTotal));
formChecks.forEach((check, idx) => {
  check.addEventListener('change', () => {
    if (pricingChecks[idx]) pricingChecks[idx].checked = check.checked;
    calculateTotal();
  });
});
calculateTotal();

// Smooth scroll controls.
document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.getAttribute('data-scroll'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Decorative tab behaviour.
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
