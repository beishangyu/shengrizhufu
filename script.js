// script.js
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.lifetime = Math.random() * 100 + 50;
        this.opacity = 1;
        this.size = Math.random() * 3 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        };
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifetime -= 1;
        this.opacity -= 1 / this.lifetime;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
        ctx.fill();
    }
}

let particles = [];

function createFirework(x, y) {
    const hue = Math.random() * 360;
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, hue));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.lifetime <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
    createFirework(event.clientX, event.clientY);
});

animate();
