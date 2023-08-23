import { Layer } from './layer.js';
import { Loop } from './loop.js';
import { Mesh } from './mesh.js';

class App {
  constructor(container) {
    this.layer = new Layer(container);
    addEventListener('resize', () => this.createMesh());
    this.createMesh();
    new Loop(this.update.bind(this), this.display.bind(this));
  }

  createMesh() {
    this.mesh = new Mesh(this.layer);
  }

  update(correction = 0) {
    this.mesh.updateParticles(correction);
    this.mesh.updateTreangles(correction);
  }
  display() {
    this.mesh.renderTreangles(this.layer.context);
    // this.mesh.renderParticles(this.layer.context);
  }
}

onload = () => {
  new App(document.querySelector('body'));
};
