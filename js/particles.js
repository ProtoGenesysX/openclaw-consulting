const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    class Particle {
        constructor(x, y, size, color, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Movement logic
            this.x += this.velocityX;
            this.y += this.velocityY;

            // Screen wrap around or bounce
            if (this.x > canvas.width || this.x < 0) this.velocityX = -this.velocityX;
            if (this.y > canvas.height || this.y < 0) this.velocityY = -this.velocityY;

            // Mouse interactivity
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Gentle pull back to "home" path if not near mouse
                // but we let them drift naturally for more joy
            }
            this.draw();
        }
    }

    function init() {
        particles = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for (let i = 0; i < particleCount; i++) {
            let size = Math.random() * 2 + 0.5;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let velocityX = (Math.random() - 0.5) * 0.5;
            let velocityY = (Math.random() - 0.5) * 0.5;
            let color = 'rgba(255, 77, 77, 0.4)'; // Primary color with alpha
            particles.push(new Particle(x, y, size, color, velocityX, velocityY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        
        // Connect particles with lines if close
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(255, 77, 77, ${0.1 * (1 - distance/150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Respect reduced-motion preference
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        init();
        animate();
    }
