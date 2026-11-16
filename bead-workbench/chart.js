"use strict";

const BeadChart = (() => {
  const chartGutter = 1.4;

  function draw(ctx, pattern, step, region = [0,0,pattern.width,pattern.height]) {
    const [left, top, width, height] = region;
    const gutter = chartGutter * step;
    const fontSize = Math.max(2, step * .38);
    const right = gutter + width * step;
    const bottom = gutter + height * step;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, right + 1, bottom + 1);
    ctx.fillStyle = "#f7e8f0";
    ctx.fillRect(gutter, 0, width * step, gutter);
    ctx.fillRect(0, gutter, gutter, height * step);
    ctx.fillStyle = "#fff7fb";
    ctx.fillRect(gutter, gutter, width * step, height * step);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "650 " + fontSize + "px ui-monospace, monospace";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = pattern.cells[(y + top) * pattern.width + x + left];
        if (index < 0) continue;
        const entry = pattern.palette[index];
        const sx = gutter + x * step;
        const sy = gutter + y * step;
        ctx.fillStyle = entry.hex;
        ctx.fillRect(sx, sy, step, step);
        if (step >= 8) {
          const [r,g,b] = entry.rgb;
          ctx.fillStyle = r * .299 + g * .587 + b * .114 < 126 ? "#fff" : "#261c23";
          ctx.fillText(entry.code, sx + step / 2, sy + step / 2 + step * .025, step * .86);
        }
      }
    }
    for (let major = 0; major <= 1; major++) {
      ctx.lineWidth = major ? Math.max(.7,step * .055) : Math.max(.25,step * .021);
      ctx.strokeStyle = major ? "#79596dbd" : "#83627746";
      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const bold = !x || x === width || (x + left) % 5 === 0;
        if (Number(bold) !== major) continue;
        const sx = gutter + x * step;
        ctx.moveTo(sx, gutter);
        ctx.lineTo(sx, bottom);
      }
      for (let y = 0; y <= height; y++) {
        const bold = !y || y === height || (y + top) % 5 === 0;
        if (Number(bold) !== major) continue;
        const sy = gutter + y * step;
        ctx.moveTo(gutter, sy);
        ctx.lineTo(right, sy);
      }
      ctx.stroke();
    }

    ctx.fillStyle = "#65465c";
    for (let x = 0; x < width; x++) {
      const n = x + left + 1;
      if (step >= 19 || x === 0 || x === width - 1 || n % 5 === 0) ctx.fillText(n, gutter + (x + .5) * step, gutter / 2, step * .92);
    }
    for (let y = 0; y < height; y++) {
      const n = y + top + 1;
      if (step >= 19 || y === 0 || y === height - 1 || n % 5 === 0) ctx.fillText(n, gutter / 2, gutter + (y + .5) * step, gutter * .88);
    }
  }

  function page(pattern, title, paletteName, credit = "") {
    const colors = [...BeadEngine.countsFor(pattern)].map((count,i) => ({...pattern.palette[i],count}))
      .filter(color => color.count).sort((a,b) => b.count - a.count);
    const total = colors.reduce((sum,color) => sum + color.count,0);
    const summary = pattern.width + " × " + pattern.height + " 格    " + total + " 颗    " + colors.length + " 色";
    const step = 27;
    const margin = 24;
    const header = 86;
    const graphWidth = Math.ceil((pattern.width + chartGutter) * step);
    const graphHeight = Math.ceil((pattern.height + chartGutter) * step);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(640,graphWidth + margin * 2 + 2);
    const columns = Math.min(4, Math.floor((canvas.width - margin * 2) / 182));
    const legendHeight = 62 + Math.ceil(colors.length / columns) * 25;
    canvas.height = header + graphHeight + legendHeight + margin + (credit ? 20 : 0);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#743657";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(title + " · 拼豆图纸",margin,36,canvas.width - margin * 2);
    ctx.font = "16px sans-serif";
    ctx.fillText(summary,margin,64);
    ctx.save();
    ctx.translate(margin,header);
    draw(ctx, pattern, step);
    ctx.restore();
    const top = header + graphHeight + 28;
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#743657";
    ctx.fillText("用豆清单",margin,top);
    ctx.font = "13px sans-serif";
    ctx.fillText(paletteName,margin,top + 22);
    ctx.font = "15px sans-serif";
    const columnWidth = (canvas.width - margin * 2) / columns;
    colors.forEach((entry,i) => {
      const x = margin + i % columns * columnWidth;
      const y = top + 45 + Math.floor(i / columns) * 25;
      ctx.fillStyle = entry.hex;
      ctx.fillRect(x,y - 13,16,16);
      ctx.strokeStyle = "#986c83";
      ctx.strokeRect(x,y - 13,16,16);
      ctx.fillStyle = "#493040";
      ctx.fillText(entry.code + " × " + entry.count,x + 23,y,columnWidth - 30);
    });
    if (credit) {
      ctx.fillStyle = "#725367";
      ctx.font = "12px sans-serif";
      ctx.fillText(credit,margin,canvas.height - 17,canvas.width - margin * 2);
    }
    return canvas;
  }

  return {gutter:chartGutter,draw,page};
})();
