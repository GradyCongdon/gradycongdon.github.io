
class WindowPoint {
  constructor() {
    this.oTop = window.screenTop;
    this.oLeft = window.screenLeft;
  }
  get top() {
    const top = window.screenTop - this.oTop;
    return top;
  }
  get left() {
    const left = window.screenLeft - this.oLeft;
    return left;
  }
  print() {
    console.log({
      type: 'window',
      oL: this.oLeft,
      oT: this.oTop,
      l: this.left,
      t: this.top,
    });
  }

}
const noPix = (str) => parseInt(str.split('px')[0], 10);
const pix = (number) => `${number}px`;

class BoxPoint  {
  constructor(elem, parent) {
    this.elem = elem;
    this.oTop = noPix(elem.style.top) || 0;
    this.oLeft = noPix(elem.style.left) || 0;
    this.parent= parent
  }
  get top() {
    const o = this.oTop;
    const w = this.parent.top;
    const top = o - w;
    return top;
  }
  get left () {
    const o = this.oLeft;
    const w = this.parent.left;
    const left = o - w;
    return left;
  }
  get right () {
    return this.left + this.width;
  }
  get bottom () {
    return this.top + this.height;
  }
  get width() {
    return this.elem.offsetWidth;
  }
  get height() {
    return this.elem.offsetHeight;
  }
  set() {
    const lastL = noPix(this.elem.style.left);
    const lastT = noPix(this.elem.style.top);
    this.elem.style.left = pix(this.left);
    this.elem.style.top = pix(this.top);
    const diffL = lastL - this.left;
    const diffT = lastT - this.top;
    console.log('diff', diffL, diffT);

  }
  print() {
    console.log({
      type: 'box',
      oL: this.oLeft,
      oT: this.oTop,
      l: this.left,
      t: this.top,
      elem: this.elem,
    });
  }
}

class FixedPoint {
  constructor(elem) {
    const borderWidth = noPix(window.getComputedStyle(elem).borderBottomWidth);
    this.top = elem.offsetTop - borderWidth;
    this.left = elem.offsetLeft - borderWidth;
    this.bottom = this.top + elem.offsetHeight + borderWidth;
    this.right = this.left + elem.offsetWidth + borderWidth;
    console.log(this);
  }
  contains(bp) {
    const top = this.top < bp.top;
    const left = this.left < bp.left
    const bottom = this.bottom > bp.bottom;
    const right = this.right > bp.right;
    return top && left && bottom && right;
  }
}


const win = new WindowPoint();

const $box = document.getElementById('box');
let box = new BoxPoint($box, win);

const $ret = document.getElementById('reticle');
let ret = new FixedPoint($ret);

const mouse = {};


const render = () => {
  box.set();
  if (ret.contains(box)) {
    document.body.classList.add('inside');
  } else {
    document.body.classList.remove('inside');
  }
  console.log('mouse', mouse.x, mouse.y);
  window.requestAnimationFrame(render);
};

render();

document.addEventListener('click', (event) => {
  if (event.shiftKey) {
    $box.style.left = pix(event.clientX);
    $box.style.top = pix(event.clientY);
    box = new BoxPoint($box, new WindowPoint());
  }
});

window.addEventListener('resize', (event) => {
  ret = new FixedPoint($ret);
});

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
