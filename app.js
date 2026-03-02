/**
 * Epithera - Skin Health Prototype
 * Navigation and interactivity
 */

// Questionnaire state
let questionnaireAnswers = {};
let currentQuestion = 1;

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
  }
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
  document.getElementById('q-step').textContent = currentQuestion;
  const nextBlock = document.getElementById('q' + currentQuestion);
  if (nextBlock) {
    nextBlock.classList.add('active');
  }
}

function finishQuestionnaire() {
  // Store answers (in real app would send to backend)
  console.log('Questionnaire answers:', questionnaireAnswers);
  navigateTo('screen-home');
  currentQuestion = 1;
  questionnaireAnswers = {};
  document.querySelectorAll('.q-block').forEach(b => b.classList.remove('active'));
  document.getElementById('q1').classList.add('active');
  document.getElementById('q-step').textContent = 1;
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
