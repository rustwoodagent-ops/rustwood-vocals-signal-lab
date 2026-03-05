const BASE_PRICE = 200;
const pricingKaraoke = document.getElementById('price-karaoke');
const pricingStems = document.getElementById('price-stems');
const formKaraoke = document.getElementById('form-karaoke');
const formStems = document.getElementById('form-stems');
const pricingTotal = document.getElementById('pricingTotal');
const formTotal = document.getElementById('formTotal');
const selectedTotalInput = document.getElementById('selected_total');
const briefDrawer = document.getElementById('briefDrawer');
const briefForm = document.getElementById('briefForm');
const successMessage = document.getElementById('successMessage');

function calculateTotal() {
  let total = BASE_PRICE;
  if (pricingKaraoke.checked) total += Number(pricingKaraoke.value || 0);
  if (pricingStems.checked) total += Number(pricingStems.value || 0);

  const totalText = `$${total}`;
  pricingTotal.textContent = totalText;
  formTotal.textContent = totalText;
  selectedTotalInput.value = totalText;

  formKaraoke.checked = pricingKaraoke.checked;
  formStems.checked = pricingStems.checked;
}

function syncFromFormToPricing() {
  pricingKaraoke.checked = formKaraoke.checked;
  pricingStems.checked = formStems.checked;
  calculateTotal();
}

pricingKaraoke.addEventListener('change', calculateTotal);
pricingStems.addEventListener('change', calculateTotal);
formKaraoke.addEventListener('change', syncFromFormToPricing);
formStems.addEventListener('change', syncFromFormToPricing);
calculateTotal();

// Smooth scroll + open drawer behaviour for CTA buttons.
document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const selector = button.getAttribute('data-scroll');
    const target = document.querySelector(selector);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (button.dataset.openBrief === 'true' && briefDrawer) {
      briefDrawer.open = true;
    }
  });
});

// Decorative console tabs.
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// AJAX submit for on-page success message.
briefForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = briefForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';

  try {
    const formData = new FormData(briefForm);
    const response = await fetch(briefForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });

    if (!response.ok) throw new Error('Submission failed');

    briefForm.reset();
    pricingKaraoke.checked = false;
    pricingStems.checked = false;
    calculateTotal();

    successMessage.hidden = false;
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    alert('Submission failed. Please try again in a moment, or email rustwood.agent@gmail.com directly.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Creative Brief';
  }
});
