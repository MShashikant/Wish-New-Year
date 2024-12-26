// Fireworks animation code
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to set a fixed red color for the fireworks
function getRedColor() {
    return `rgb(255, 0, 0)`; // Fixed red color
}

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.color = getRedColor(); // Set color to red
    this.gravity = 0.05; // Gravity to pull the particles down after explosion

    // Rocket movement upwards before explosion
    this.velocityY = Math.random() * 4 + 2; // Upward speed
    this.explodeAt = Math.random() * 200 + 200; // Distance at which the rocket explodes

    this.isExploded = false;

    // Initial upward motion
    this.particles.push({ x: this.x, y: this.y, velocityX: 0, velocityY: -this.velocityY, opacity: 1 });
}

Firework.prototype.update = function () {
    for (let i = 0; i < this.particles.length; i++) {
        let particle = this.particles[i];

        // If the rocket hasn't exploded yet, move upwards
        if (!this.isExploded) {
            particle.y += particle.velocityY;
            // When the rocket reaches the peak, explode it
            if (particle.y <= this.y - this.explodeAt) {
                this.isExploded = true;
                this.createExplosion(particle.x, particle.y);
            }
        } else {
            // Apply gravity and move particles outward
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.velocityY += this.gravity; // Simulate gravity pulling particles down
            particle.opacity -= 0.02; // Fade the particles over time
        }

        // Remove particles when they fade out
        if (particle.opacity <= 0) {
            this.particles.splice(i, 1);
            i--;
        }
    }
};

Firework.prototype.createExplosion = function (x, y) {
    // Create explosion particles that scatter outwards
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 1;
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;
        this.particles.push({ x: x, y: y, velocityX, velocityY, opacity: 1 });
    }
};

Firework.prototype.draw = function () {
    for (let i = 0; i < this.particles.length; i++) {
        let particle = this.particles[i];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${particle.opacity})`; // Use red color for the particles
        ctx.fill();
    }
};

let fireworks = [];
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) {
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height)); // Start from bottom of the screen
    }

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();
    }

    requestAnimationFrame(animate);
}

animate(); // Start the fireworks animation

// User input for name redirection
document.getElementById('wishBtn').addEventListener('click', function () {
    const userName = document.getElementById('userName').value;
    if (userName) {
        // Redirect to the wish page with the user's name as a query parameter
        window.location.href = `wish.html?name=${encodeURIComponent(userName)}`;
    } else {
        alert("Please enter your name!");
    }
});