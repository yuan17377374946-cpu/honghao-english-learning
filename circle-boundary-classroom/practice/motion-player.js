(() => {
  const controls = `
    <section class="practice-motion" aria-label="看小动画">
      <div class="motion-buttons">
        <button type="button" class="action" data-play>播放小动画</button>
        <button type="button" class="outline" data-back disabled>动画上一步</button>
        <button type="button" class="outline" data-forward>动画下一步</button>
        <button type="button" class="outline" data-reset disabled>回到原图</button>
      </div>
      <div class="motion-explanation" aria-live="polite">
        <p class="motion-caption" data-caption>看图上的数值，再跟着线和色块一步一步看。</p>
        <p class="motion-value" data-values hidden></p>
      </div>
    </section>`;

  function attach(panel, figure, id) {
    const frames = window.circlePracticeAnimations[id];
    const svg = figure.querySelector("svg");
    const namespace = "http://www.w3.org/2000/svg";
    const overlay = document.createElementNS(namespace, "g");
    overlay.setAttribute("class", "motion-overlay");
    overlay.setAttribute("aria-hidden", "true");
    svg.append(overlay);
    const player = panel.querySelector(".practice-motion");
    const play = player.querySelector("[data-play]");
    const back = player.querySelector("[data-back]");
    const forward = player.querySelector("[data-forward]");
    const reset = player.querySelector("[data-reset]");
    const caption = player.querySelector("[data-caption]");
    const values = player.querySelector("[data-values]");
    const diagramControls = panel.querySelectorAll("button[data-mode]");
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let index = -1;
    let running = false;
    let paused = false;
    let timer;

    function refreshControls() {
      play.textContent = running ? "暂停动画" : paused ? "继续播放" :
        index >= 0 ? "重新播放" : "播放小动画";
      back.disabled = index <= 0;
      forward.disabled = index >= frames.length - 1;
      reset.disabled = index < 0;
    }

    function render(indexToShow) {
      index = indexToShow;
      const frame = frames[index];
      svg.unpauseAnimations();
      svg.setCurrentTime(0);
      overlay.innerHTML = frame.marks;
      if (reduceMotion.matches) svg.setCurrentTime(2);
      figure.dataset.motion = "active";
      for (const control of diagramControls) control.setAttribute("aria-pressed", "false");
      caption.textContent = `第 ${index + 1} / ${frames.length} 步　${frame.caption}`;
      values.textContent = frame.values;
      values.hidden = false;
      refreshControls();
    }

    function stop() {
      clearTimeout(timer);
      running = false;
      paused = false;
    }

    function queueNext() {
      const hold = Math.max(4700, 2300 + frames[index].caption.length * 90);
      timer = setTimeout(() => {
        if (index === frames.length - 1) {
          stop();
          refreshControls();
          return;
        }
        render(index + 1);
        queueNext();
      }, hold);
    }

    function restore() {
      stop();
      svg.unpauseAnimations();
      overlay.replaceChildren();
      delete figure.dataset.motion;
      index = -1;
      caption.textContent = "看图上的数值，再跟着线和色块一步一步看。";
      values.hidden = true;
      refreshControls();
    }

    play.addEventListener("click", () => {
      if (running) {
        clearTimeout(timer);
        running = false;
        paused = true;
        svg.pauseAnimations();
        refreshControls();
        return;
      }
      running = true;
      if (paused) {
        paused = false;
        svg.unpauseAnimations();
        refreshControls();
      } else render(0);
      queueNext();
    });
    back.addEventListener("click", () => { stop(); render(index - 1); });
    forward.addEventListener("click", () => { stop(); render(index + 1); });
    reset.addEventListener("click", () => {
      restore();
      figure.dataset.mode = "normal";
      for (const control of diagramControls) control.setAttribute("aria-pressed", String(control.dataset.mode === "normal"));
      play.focus();
    });
    for (const control of diagramControls) control.addEventListener("click", restore);
    return stop;
  }

  window.circlePracticeMotion = {controls,attach};
})();
