/**
 * Epithera - Skin Health Prototype
 * Navigation and interactivity
 */

// Questionnaire state
let questionnaireAnswers = {};
let currentQuestion = 1;
const TOTAL_QUESTIONS = 5;

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
  }
  if (screenId === 'screen-products') {
    setTimeout(renderProducts, 0);
  }
}

// First-time signup: go to home, then show questionnaire popup
function signUpFirstTime() {
  navigateTo('screen-home');
  setTimeout(() => showQuestionnairePopup(), 300);
}

// Sign in: treat as first-time user, show questionnaire popup
function signInFirstTime() {
  navigateTo('screen-home');
  setTimeout(() => showQuestionnairePopup(), 300);
}

function showQuestionnairePopup() {
  const popup = document.getElementById('questionnaire-popup');
  if (popup) {
    popup.classList.add('active');
    resetQuestionnaire();
  }
}

function closeQuestionnairePopup() {
  const popup = document.getElementById('questionnaire-popup');
  if (popup) popup.classList.remove('active');
}

function selectQ(key, value, el) {
  questionnaireAnswers[key] = value;
  if (el) {
    el.parentElement.querySelectorAll('.q-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
  }
}

function nextQuestion() {
  document.querySelectorAll('.q-block').forEach(b => b.classList.remove('active'));
  currentQuestion++;
  const stepEl = document.getElementById('q-step');
  if (stepEl) stepEl.textContent = currentQuestion;
  const nextBlock = document.getElementById('q' + currentQuestion);
  if (nextBlock) nextBlock.classList.add('active');
}

function resetQuestionnaire() {
  currentQuestion = 1;
  questionnaireAnswers = {};
  document.querySelectorAll('.q-block').forEach(b => b.classList.remove('active'));
  const q1 = document.getElementById('q1');
  if (q1) q1.classList.add('active');
  const stepEl = document.getElementById('q-step');
  if (stepEl) stepEl.textContent = 1;
}

function finishQuestionnaire() {
  console.log('Questionnaire answers:', questionnaireAnswers);
  closeQuestionnairePopup();
  resetQuestionnaire();
}

// Tab interactions for dermatologist
document.querySelectorAll('.derm-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.derm-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Habit button toggle (visual feedback)
document.querySelectorAll('.habit-btn, .sport-btn, .skin-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('selected');
    if (this.classList.contains('selected')) {
      this.style.borderColor = 'var(--orange)';
      this.style.background = 'var(--orange-light)';
    } else {
      this.style.borderColor = '';
      this.style.background = '';
    }
  });
});

// Water tracking
let waterGlasses = 0;
const WATER_GOAL = 8;

function updateWater(delta) {
  waterGlasses = Math.max(0, Math.min(WATER_GOAL, waterGlasses + delta));
  const countEl = document.getElementById('water-count');
  const fillEl = document.getElementById('water-fill');
  const progressEl = document.getElementById('water-progress-fill');
  const messageEl = document.getElementById('water-message');
  if (countEl) countEl.textContent = waterGlasses + ' / ' + WATER_GOAL;
  if (fillEl) fillEl.style.height = (waterGlasses / WATER_GOAL) * 100 + '%';
  if (progressEl) progressEl.style.width = (waterGlasses / WATER_GOAL) * 100 + '%';
  if (messageEl) {
    if (waterGlasses >= WATER_GOAL) messageEl.textContent = 'Goal reached! 🎉';
    else if (waterGlasses >= WATER_GOAL * 0.5) messageEl.textContent = "You're doing well! 💪";
    else messageEl.textContent = 'Stay hydrated! 💪';
  }
}

// Skincare products
let userProducts = [];

const PRODUCT_ICONS = {
  cream: '🧴',
  ointment: '💊',
  serum: '💧',
  moisturizer: '✨',
  sunscreen: '☀️',
  cleanser: '🧼',
  toner: '💦',
  treatment: '🎯',
  oil: '🫒',
  other: '📦'
};

function showAddProductForm() {
  document.getElementById('add-product-form').classList.add('active');
  document.getElementById('product-name').value = '';
  document.getElementById('product-type').value = 'cream';
  document.getElementById('product-brand').value = '';
}

function hideAddProductForm() {
  document.getElementById('add-product-form').classList.remove('active');
}

function addProduct() {
  const name = document.getElementById('product-name').value.trim();
  if (!name) return;
  const type = document.getElementById('product-type').value;
  const brand = document.getElementById('product-brand').value.trim();
  userProducts.push({ id: Date.now(), name, type, brand });
  hideAddProductForm();
  renderProducts();
}

function removeProduct(id) {
  userProducts = userProducts.filter(p => p.id !== id);
  renderProducts();
}

function renderProducts() {
  const list = document.getElementById('products-list');
  if (!list) return;
  if (userProducts.length === 0) {
    list.innerHTML = '<p class="products-empty">No products added yet. Add your creams, ointments and skincare products to get personalized insights.</p>';
    return;
  }
  list.innerHTML = userProducts.map(p => `
    <div class="product-card">
      <div class="product-icon">${PRODUCT_ICONS[p.type] || PRODUCT_ICONS.other}</div>
      <div class="product-info">
        <strong>${p.name}</strong>
        <small>${p.type}${p.brand ? ' • ' + p.brand : ''}</small>
      </div>
      <button class="product-remove" onclick="removeProduct(${p.id})">✕</button>
    </div>
  `).join('');
}

// Connect device buttons
document.querySelectorAll('.btn-connect').forEach(btn => {
  btn.addEventListener('click', function() {
    const wasConnect = this.textContent === 'Connect';
    this.textContent = wasConnect ? 'Connected ✓' : 'Connect';
    this.style.background = wasConnect ? 'var(--green-soft)' : '';
    this.style.borderColor = wasConnect ? 'var(--green-soft)' : '';
  });
});
