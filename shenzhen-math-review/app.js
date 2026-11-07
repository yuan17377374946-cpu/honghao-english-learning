'use strict';

const cards = document.querySelector('#topic-cards');
const practice = document.querySelector('#practice-content');
const filters = document.querySelector('#filters');
const progress = document.querySelector('#overall-progress');
const progressLabel = document.querySelector('#total-progress');
const practiceHeading = document.querySelector('#practice-title');
const storageKey = 'shenzhen-math-review:answers:v1';
const groups = ['全部', ...new Set(topics.map(topic => topic.group))];
let current = topics[0];
let group = groups[0];
let answers = {};

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) answers = saved;
} catch {
  // Practice can continue in memory when storage is unavailable.
}

const questionKey = (topic, index) => `${topic.id}-${index}`;
const rightCount = topic => topic.questions.filter((q, index) => answers[questionKey(topic, index)] === q.correct).length;

function renderCards() {
  const visible = topics.filter(topic => group === '全部' || topic.group === group);
  cards.innerHTML = visible.map(topic => `
    <button class="topic" type="button" data-topic="${topic.id}" aria-current="${topic === current}" aria-controls="practice-content">
      <span class="topic-kicker">${topic.group}</span>
      <strong>${topic.name}</strong>
      <span class="topic-note">${topic.keywords}</span>
      <span class="topic-progress" data-score="${topic.id}"></span>
    </button>`).join('');
  updateProgress();
}

function updateProgress() {
  const total = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const right = topics.reduce((sum, topic) => sum + rightCount(topic), 0);
  progress.max = total;
  progress.value = right;
  progressLabel.textContent = `${right} / ${total}`;
  for (const label of cards.querySelectorAll('[data-score]')) {
    const topic = topics.find(item => item.id === label.dataset.score);
    label.textContent = `${rightCount(topic)} / ${topic.questions.length} 题答对 →`;
  }
}

function showFeedback(form, question, selected) {
  const output = form.querySelector('.feedback');
  const correct = selected === question.correct;
  output.dataset.status = correct ? 'correct' : 'retry';
  output.textContent = correct ? '答对了。可以展开解析核对步骤。' : `再试一次。${question.hint}`;
}

function renderPractice() {
  const topic = current;
  const [prompt, ...steps] = topic.example;
  practice.innerHTML = `
    <div class="practice-head">
      <h3>${topic.name}</h3>
      <p>${topic.focus}</p>
      <details class="example">
        <summary>例题与分步解法</summary>
        <p>${prompt}</p>
        <ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol>
      </details>
    </div>
    <div class="questions">
      ${topic.questions.map((q, index) => {
        const key = questionKey(topic, index);
        return `<form class="question" data-question="${index}">
          <fieldset>
            <legend><span class="level">${index + 1} / ${index === 2 ? '提升题' : '基础题'}</span>${q.prompt}</legend>
            ${q.choices.map((choice, option) => `
              <label class="option"><input type="radio" name="${key}" value="${option}" required ${answers[key] === option ? 'checked' : ''}><span>${choice}</span></label>`).join('')}
          </fieldset>
          <button class="button check" type="submit">检查答案</button>
          <p class="feedback" aria-live="polite"></p>
          <details class="solution"><summary>展开答案与解析</summary><p>${q.solution}</p></details>
        </form>`;
      }).join('')}
    </div>
    ${topic.resource ? `<p class="related"><a href="${topic.resource[1]}">继续练习 · ${topic.resource[0]} ↗</a></p>` : ''}`;

  for (const form of practice.querySelectorAll('form')) {
    const index = Number(form.dataset.question);
    const saved = answers[questionKey(topic, index)];
    if (Number.isInteger(saved) && saved >= 0 && saved < topic.questions[index].choices.length) {
      showFeedback(form, topic.questions[index], saved);
    }
  }
}

filters.innerHTML = groups.map((item, index) =>
  `<button type="button" data-filter="${index}" aria-pressed="${item === group}">${item}</button>`
).join('');

filters.addEventListener('click', event => {
  const selected = event.target.closest('[data-filter]');
  if (!selected) return;
  group = groups[Number(selected.dataset.filter)];
  for (const button of filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === selected));
  }
  renderCards();
});

cards.addEventListener('click', event => {
  const selected = event.target.closest('[data-topic]');
  if (!selected) return;
  current = topics.find(topic => topic.id === selected.dataset.topic);
  renderCards();
  renderPractice();
  practiceHeading.focus({ preventScroll: true });
  practiceHeading.scrollIntoView({ block: 'start' });
});

practice.addEventListener('change', event => {
  const form = event.target.closest('form');
  if (!form) return;
  const output = form.querySelector('.feedback');
  output.textContent = '';
  delete output.dataset.status;
});

practice.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const selected = form.querySelector('input:checked');
  if (!selected) return;
  const index = Number(form.dataset.question);
  const choice = Number(selected.value);
  answers[questionKey(current, index)] = choice;
  try {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  } catch {
    // Progress is still available until the current page is closed.
  }
  showFeedback(form, current.questions[index], choice);
  updateProgress();
});

renderCards();
renderPractice();
