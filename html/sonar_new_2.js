const displayElement = document.querySelector("#demo");
const displayRect = displayElement.getBoundingClientRect();

const width = displayRect.width;
const height = displayRect.height;

/**
 * Setup an off screen canvas context for drawing our gradient.
 * Note: don't the scale the context when generating a graphic for use as a pattern fill.
 */
const offscreenElement = document.createElement("canvas");
offscreenElement.width = width;
offscreenElement.height = height;
const offscreenCtx = offscreenElement.getContext("2d");

const start = new Date();

/**
 * Setup and draw the gradient.
 */
const x0 = 0;
const y0 = 0;
const x1 = width;
const y1 = height;
const g = new SweepGradient.SweepGradient(offscreenCtx, x0, y0, x1, y1);

g.addColorStop(0.0, "#ffff00");
g.addColorStop(0.25, "#ff00ff");
g.addColorStop(0.5, "red");
g.addColorStop(0.75, "rgba(255,255,0,0)");
g.addColorStop(1.0, "#ffff00");

g.draw();

var end = new Date();
var elapsed = end.getTime() - start.getTime();
console.log(`${elapsed} milliseconds`);

/**
 * Get the gradient as a pattern.
 */
const gradientPattern = offscreenCtx.createPattern(
  offscreenCtx.canvas,
  "no-repeat"
);

/**
 * Set up the canvas on the page to place our gradient
 */
const dpr = Math.ceil(window.devicePixelRatio) || 1;
displayElement.width = width * dpr;
displayElement.height = height * dpr;
const displayCtx = displayElement.getContext("2d");
displayCtx.scale(dpr, dpr);

/**
 * Draw a circle, which we fill using our gradient pattern.
 */
const lineWidth = 40;
displayCtx.strokeStyle = gradientPattern;
displayCtx.lineWidth = lineWidth;
displayCtx.arc(width / 2, height / 2, (width - lineWidth) / 2, 0, 2 * Math.PI);
displayCtx.stroke();



export class SweepGradient {
  constructor(ctx, x0, y0, x1, y1) {
    this.ctx = ctx;
    this.x0 = Math.min(x0, x1);
    this.y0 = Math.min(y0, y1);
    this.x1 = Math.max(x0, x1);
    this.y1 = Math.max(y0, y1);

    this.width = this.x1 - this.x0;
    this.height = this.y1 - this.y0;

    this.gradientWidth = 2 * (this.width + this.height);
    this.gradientHeight = 1;

    let offscreenCanvas = this.getOffscreenCanvas(
      this.gradientWidth,
      this.gradientHeight
    );
    this.offscreenCtx = offscreenCanvas.getContext("2d");
    this.offscreenGradient = this.offscreenCtx.createLinearGradient(
      0,
      0,
      this.gradientWidth,
      this.gradientHeight
    );
  }

  addColorStop(offset, color) {
    this.offscreenGradient.addColorStop(offset, color);
  }

  getOffscreenCanvas(w, h) {
    if (window.OffscreenCanvas) {
      return new window.OffscreenCanvas(w, h);
    }
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = w;
    offscreenCanvas.height = h;
    return offscreenCanvas;
  }

  getOffscreenGradientData() {
    const w = this.gradientWidth;
    const h = this.gradientHeight;
    this.offscreenCtx.fillStyle = this.offscreenGradient;
    this.offscreenCtx.fillRect(0, 0, w, h);
    const imageData = this.offscreenCtx.getImageData(0, 0, w, h);
    return imageData.data;
  }

  colourForProportion(gradientData, proportion) {
    const x = Math.floor((gradientData.length / 4) * proportion) * 4;
    return gradientData.slice(x, x + 4);
  }

  draw() {
    const gradientData = this.getOffscreenGradientData();
    const ctx = this.ctx;
    const centreX = this.x0 + this.width / 2;
    const centreY = this.y0 + this.height / 2;
    const rectSize = 1;
    for (let y = this.y0; y < this.y1; y += rectSize) {
      let dY = y - centreY;
      for (let x = this.x0; x < this.x1; x += rectSize) {
        let dX = x - centreX;
        let angle = (Math.atan(dX / dY) * 180) / Math.PI;
        if (dX < 0) {
          angle = 360 - angle;
          if (dY >= 0) {
            angle = angle - 180;
          }
        } else {
          angle = angle * -1;
          if (dY >= 0) {
            angle = angle + 180;
          }
        }
        let rgba = this.colourForProportion(gradientData, angle / 360);
        let [r, g, b, a] = rgba;
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
        ctx.fillRect(x, y, rectSize, rectSize);
      }
    }
  }
}