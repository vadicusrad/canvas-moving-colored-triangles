export class Layer {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    container.appendChild(this.canvas);

    this.fitToContainer = this.fitToContainer.bind(this);
    this.fitToContainer();
    addEventListener('resize', () => this.fitToContainer);
  }

  fitToContainer(canvas) {
    this.w = this.canvas.width = this.canvas.offsetWidth;
    this.h = this.canvas.height = this.canvas.offsetHeight;
  }
}
