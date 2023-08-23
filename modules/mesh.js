export class Mesh {
  constructor({ w, h }) {
    this.maxDist = Math.hypot(w, h);
    this.stepX = this.maxDist * 0.1;
    this.stepY = (this.stepX * Math.sqrt(3)) / 2;

    this.extraPoints = 3;

    this.cols = ((w / this.stepX) | 0) + this.extraPoints;
    this.rows = ((h / this.stepY) | 0) + this.extraPoints;

    this.extraOffsetX = this.stepX / 4;
    this.offsetX = (w - (this.cols - 1) * this.stepX) / 2;
    this.offsetY = (h - (this.rows - 1) * this.stepY) / 2;

    this.colorTimer = 0;
    this.colorSpeed = 10;
    this.colorRange = 250;

    this.createParticles();
    this.createTreangles();
  }

  updateTreangles(correction = 0) {
    this.colorTimer = (this.colorTimer + this.colorSpeed * correction) % 360;
  }

  createParticles() {
    this.particles = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const shiftX = i & 1 ? -this.extraOffsetX : this.extraOffsetX;

        const x = j * this.stepX + this.offsetX + shiftX;
        const y = i * this.stepY + this.offsetY;
        const homeX = x;
        const homeY = y;

        const angle = Math.random() * Math.PI * 2;
        const radius =
          (Math.random() * this.extraOffsetX) / 2 + this.extraOffsetX;

        const velocity = Math.random() * 2 - 1;

        this.particles.push({
          x,
          y,
          homeX,
          homeY,
          angle,
          radius,
          velocity,
        });
      }
    }
  }

  createTreangles() {
    this.treangles = [];
    for (let y = 0; y < this.rows - 1; y++) {
      const verticles = [];
      for (let x = 0; x < this.cols; x++) {
        let a = x + this.cols * (y + 1);
        let b = x + this.cols * y;

        if (y & 1) {
          [a, b] = [b, a];
        }

        verticles.push(this.particles[a], this.particles[b]);
      }
      for (let i = 0; i < verticles.length - 2; i++) {
        const a = verticles[i];
        const b = verticles[i + 1];
        const c = verticles[i + 2];

        this.treangles.push({
          a,
          b,
          c,
        });
      }
    }
  }

  updateParticles(correction = 0) {
    this.particles.forEach((p) => {
      p.angle += p.velocity * correction;
      p.x = Math.cos(p.angle) * p.radius + p.homeX;
      p.y = Math.sin(p.angle) * p.radius + p.homeY;
    });
  }

  //   renderParticles(context) {
  //     context.fillStyle = 'red';
  //     this.particles.forEach((particle) => {
  //       context.beginPath();
  //       context.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
  //       context.fill();
  //     });
  //   }

  renderTreangles(context) {
    this.treangles.forEach(({ a, b, c }) => {
      const posX = (a.x + b.x + c.x) / 3;
      const posY = (a.y + b.y + c.y) / 3;
      const dist = Math.hypot(posX, posY);

      const hue = (dist / this.maxDist) * this.colorRange - this.colorTimer;

      context.strokeStyle = `hsl(${hue}, 70%, 70%)`;
      context.fillStyle = `hsl(${hue}, 85%, 50%)`;

      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.lineTo(c.x, c.y);
      context.closePath();

      context.fill();
      context.stroke();
    });
  }
}
