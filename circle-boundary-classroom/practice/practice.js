(() => {
  const questions = window.circlePractice;
  const diagrams = window.circlePracticeDiagrams;
  const filters = document.querySelector("#filters");
  const list = document.querySelector("#question-list");
  const panel = document.querySelector("#question-panel");
  const progress = document.querySelector("#progress");
  const classroomOrder = [
    "p5-shade1","p5-shade2","p7-choice2","p35-fill6","p40-solve5",
    "p8-solve3","p42-explore4c","p8-required2"
  ];
  const categories = ["课上 8 题","全部题目",...new Set(questions.map(question => question[1]))];
  const storageKey = "circle-practice-completed-v1";
  let checked = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) checked = new Set(saved);
  } catch {}
  const initial = questions.find(question => "#" + question[0] === location.hash);
  let current = initial?.[0] || classroomOrder[0];
  let filter = initial && !classroomOrder.includes(current) ? "全部题目" : "课上 8 题";
  let visible = [];

  function updateIndex() {
    visible = filter === "课上 8 题"
      ? classroomOrder.map(id => questions.find(question => question[0] === id))
      : questions.filter(question => filter === "全部题目" || question[1] === filter);
    filters.innerHTML = categories.map(category => `<button type="button" class="choice" data-filter="${category}" aria-pressed="${category === filter}">${category === "全部题目" ? `全部 ${questions.length} 题` : category}</button>`).join("");
    list.innerHTML = visible.map(([id,,title], index) => `<button type="button" data-id="${id}" aria-current="${id === current}"><span class="q-number">${index+1}.</span>${title}${checked.has(id) ? ' <span aria-label="已完成">✓</span>' : ''}</button>`).join("");
    progress.textContent = `已完成 ${visible.filter(([id]) => checked.has(id)).length} / ${visible.length}`;
  }

  function showQuestion(id, moveFocus = false, updateUrl = true) {
    current = id;
    if (updateUrl) history.replaceState(null, "", "#" + id);
    updateIndex();
    const index = visible.findIndex(question => question[0] === id);
    const [,category,title,page,source,prompt,diagram,hint,steps] = visible[index];
    const sketch = diagrams[diagram];
    const hasArea = sketch.includes("fill-area");
    const hasBoundary = sketch.includes('class="boundary"');
    panel.innerHTML = `
      <p class="practice-meta">书第 ${page} 页 · ${source} · ${category}</p>
      <h2 id="question-title" tabindex="-1">${title}</h2>
      <p class="practice-question">${prompt}</p>
      <figure class="diagram practice-figure" data-mode="normal">
        <svg viewBox="0 0 420 180" role="img" aria-label="${title}的示意图">${sketch}</svg>
      </figure>
      ${hasArea || hasBoundary ? `<div class="practice-tools" role="group" aria-label="图形观察">
        <button type="button" class="choice" data-mode="normal" aria-pressed="true">看原图</button>
        ${hasBoundary ? '<button type="button" class="choice" data-mode="boundary" data-value="boundary" aria-pressed="false">描边</button>' : ''}
        ${hasArea ? '<button type="button" class="choice" data-mode="area" data-value="area" aria-pressed="false">看阴影</button>' : ''}
      </div>` : ''}
      <div class="practice-answers">
        <button type="button" class="outline" id="hint-button" aria-expanded="false" aria-controls="hint">看提示</button>
        <button type="button" class="action" id="next-step" aria-controls="steps">展开下一步</button>
        <button type="button" class="outline" id="all-steps" aria-controls="steps">展开全部</button>
        <span class="practice-meta" id="step-progress" aria-live="polite"></span>
      </div>
      <p class="reveal practice-hint" id="hint" hidden>${hint}</p>
      <ol class="practice-steps" id="steps">${steps.map(step=>`<li hidden>${step}</li>`).join("")}</ol>
      <nav class="practice-footer" aria-label="练习翻页">
        <button class="outline" type="button" id="previous" ${index === 0 ? 'disabled' : ''}>← 上一题</button>
        <button class="choice" type="button" id="check" aria-pressed="${checked.has(id)}">标记已完成</button>
        <button class="outline" type="button" id="next" ${index === visible.length-1 ? 'disabled' : ''}>下一题 →</button>
      </nav>`;
    const figure = panel.querySelector("figure");
    const modes = panel.querySelectorAll("button[data-mode]");
    for (const button of modes) button.addEventListener("click", () => {
      figure.dataset.mode = button.dataset.mode;
      for (const option of modes) option.setAttribute("aria-pressed", String(option === button));
    });
    const hintButton = panel.querySelector("#hint-button");
    const hintText = panel.querySelector("#hint");
    hintButton.addEventListener("click", () => {
      hintText.hidden = !hintText.hidden;
      hintButton.setAttribute("aria-expanded", String(!hintText.hidden));
      hintButton.textContent = hintText.hidden ? "看提示" : "收起提示";
    });
    const rows = panel.querySelectorAll("#steps li");
    const nextStep = panel.querySelector("#next-step");
    const allSteps = panel.querySelector("#all-steps");
    const stepProgress = panel.querySelector("#step-progress");
    let revealed = 0;
    function renderSteps() {
      rows.forEach((row, i) => { row.hidden = i >= revealed; });
      stepProgress.textContent = `${revealed} / ${rows.length} 步`;
      nextStep.disabled = revealed === rows.length;
      allSteps.textContent = revealed === rows.length ? "收起解析" : "展开全部";
    }
    renderSteps();
    nextStep.addEventListener("click", () => { revealed++; renderSteps(); });
    allSteps.addEventListener("click", () => {
      revealed = revealed === rows.length ? 0 : rows.length;
      renderSteps();
    });
    panel.querySelector("#previous").addEventListener("click", () => showQuestion(visible[index-1][0], true));
    panel.querySelector("#next").addEventListener("click", () => showQuestion(visible[index+1][0], true));
    const check = panel.querySelector("#check");
    check.addEventListener("click", () => {
      if (checked.has(id)) checked.delete(id);
      else checked.add(id);
      try { localStorage.setItem(storageKey, JSON.stringify([...checked])); } catch {}
      check.setAttribute("aria-pressed", String(checked.has(id)));
      updateIndex();
    });
    if (moveFocus) panel.querySelector("h2").focus();
  }

  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");
    if (!button || filter === button.dataset.filter) return;
    filter = button.dataset.filter;
    updateIndex();
    showQuestion(visible.some(question=>question[0]===current) ? current : visible[0][0]);
    filters.querySelector("[aria-pressed=true]").focus();
  });
  list.addEventListener("click", event => {
    const button = event.target.closest("button[data-id]");
    if (button) showQuestion(button.dataset.id, true);
  });
  showQuestion(current, false, false);
})();
