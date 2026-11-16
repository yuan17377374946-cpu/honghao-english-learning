"use strict";

const BeadProject = (() => {
  const gridId = /^(food|store)-[0-9]{3}$/;
  const paletteCode = /^[a-z0-9][a-z0-9_-]{0,7}$/i;
  let mardRequest;
  const gridRequests = new Map();
  let lookupRequest;

  function read(data) {
    const {width,height,palette,cells,previousProgressKey} = data ?? {};
    if (![width,height].every(n => Number.isInteger(n) && n >= 1 && n <= 156) ||
        !Array.isArray(palette) || palette.length > 400 ||
        !Array.isArray(cells) || cells.length !== width * height) throw Error("图纸尺寸或数据不完整。");
    const seen = new Set();
    const swatches = palette.map(entry => {
      if (typeof entry?.code !== "string" || !paletteCode.test(entry.code) || seen.has(entry.code.toUpperCase()) ||
          typeof entry.hex !== "string" || !/^#[0-9a-f]{6}$/i.test(entry.hex)) throw Error("图纸色号无效或重复。");
      seen.add(entry.code.toUpperCase());
      const rgb = [1,3,5].map(i => parseInt(entry.hex.slice(i,i+2),16));
      return {code:entry.code,hex:entry.hex,rgb,name:String(entry.name ?? entry.code).slice(0,48)};
    });
    if (!cells.every(n => Number.isInteger(n) && n >= -1 && n < swatches.length)) throw Error("图纸有格子无法对应到色号。");
    const pattern = {width,height,palette:swatches,cells:Int16Array.from(cells)};
    if (typeof previousProgressKey === "string" && /^\d+x\d+-[a-z0-9]+$/.test(previousProgressKey)) {
      pattern.previousProgressKey = previousProgressKey;
    }
    return pattern;
  }

  async function get(url) {
    const response = await fetch(url);
    if (!response.ok) throw Error("图纸数据无法读取，请重试。");
    return response.json();
  }

  async function kairo(id) {
    if (!gridId.test(id)) throw Error("开罗图纸编号有误。");
    const [game,number] = id.split("-");
    const group = game + "-" + Math.floor(Number(number) / 32) * 32;
    if (!gridRequests.has(group)) {
      gridRequests.set(group,get("kairo/" + group + ".data.json?v=kairo-colors-1").catch(error => {
        gridRequests.delete(group);
        throw error;
      }));
    }
    lookupRequest ??= mard().then(colors => new Map(colors.map(color => [color.code,color]))).catch(error => {
      lookupRequest = null;
      throw error;
    });
    const [grids, colors] = await Promise.all([gridRequests.get(group),lookupRequest]);
    if (!grids[id]) throw Error("找不到这张开罗图纸。");
    const [width,height,codes,data,previousProgressKey] = grids[id];
    return read({width,height,palette:codes.map(code => colors.get(code)),previousProgressKey,cells:Array.from(atob(data),byte => byte.charCodeAt(0) - 1)});
  }

  function mard() {
    mardRequest ??= get("mard-291.json").then(data => data.colors).catch(error => {
      mardRequest = null;
      throw error;
    });
    return mardRequest;
  }

  function snapshot(name, pattern, sourceId) {
    const {width,height,palette,cells} = pattern;
    return {format:"bead-workbench",version:1,name,sourceId,width,height,palette,cells:[...cells]};
  }

  return {read,kairo,mard,snapshot,validSource:id => gridId.test(id)};
})();
