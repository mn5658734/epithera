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
}

// First-time signup: go to home, then show questionnaire popup
function signUpFirstTime() {
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

// Connect device buttons
document.querySelectorAll('.btn-connect').forEach(btn => {
  btn.addEventListener('click', function() {
    const wasConnect = this.textContent === 'Connect';
    this.textContent = wasConnect ? 'Connected ✓' : 'Connect';
    this.style.background = wasConnect ? 'var(--green-soft)' : '';
    this.style.borderColor = wasConnect ? 'var(--green-soft)' : '';
  });
});
