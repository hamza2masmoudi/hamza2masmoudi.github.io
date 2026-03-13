/* ============================================
   HAMZA MASMOUDI — PORTFOLIO
   Animated Waveforms + Scroll Reveal + Nav
   ============================================ */

// ——— Animated Sine Waveform Canvas ———
(function initWaves() {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const waves = [
    { amplitude: 40, frequency: 0.008, speed: 0.015, color: 'rgba(0,212,170,0.12)', lineWidth: 1.5, yOffset: 0.25 },
    { amplitude: 30, frequency: 0.012, speed: 0.02,  color: 'rgba(0,212,170,0.08)', lineWidth: 1,   yOffset: 0.35 },
    { amplitude: 50, frequency: 0.006, speed: 0.01,  color: 'rgba(0,212,170,0.06)', lineWidth: 1.5, yOffset: 0.5  },
    { amplitude: 25, frequency: 0.015, speed: 0.025, color: 'rgba(0,212,170,0.10)', lineWidth: 1,   yOffset: 0.65 },
    { amplitude: 35, frequency: 0.009, speed: 0.018, color: 'rgba(0,212,170,0.07)', lineWidth: 1,   yOffset: 0.78 },
    { amplitude: 20, frequency: 0.02,  speed: 0.03,  color: 'rgba(74,222,128,0.05)', lineWidth: 0.8, yOffset: 0.15 },
    { amplitude: 45, frequency: 0.007, speed: 0.012, color: 'rgba(0,212,170,0.04)', lineWidth: 1.2, yOffset: 0.9  },
  ];

  let time = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const w of waves) {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.lineWidth;

      const baseY = canvas.height * w.yOffset;

      for (let x = 0; x <= canvas.width; x += 2) {
        const y = baseY + Math.sin(x * w.frequency + time * w.speed * 60) * w.amplitude
                        + Math.sin(x * w.frequency * 0.5 + time * w.speed * 30) * (w.amplitude * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    time += 1 / 60;
    requestAnimationFrame(draw);
  }

  draw();
})();


// ——— Scroll Reveal ———
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


// ——— Mobile Nav Toggle ———
(function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
})();


// ——— Smooth scroll for anchor links ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ——— ASCII Donut Animation ———
(function initAsciiDonut() {
  const pretag = document.getElementById('ascii-donut');
  if (!pretag) return;

  let A = 1, B = 1;
  const renderAsciiFrame = () => {
    const b = [];
    const z = [];
    A += 0.05;
    B += 0.03;
    const cA = Math.cos(A), sA = Math.sin(A),
          cB = Math.cos(B), sB = Math.sin(B);
          
    for(let k=0; k<1760; k++) {
      b[k] = k % 80 === 79 ? "\n" : " ";
      z[k] = 0;
    }
    
    for(let j=0; j<6.28; j+=0.07) {
      const ct = Math.cos(j), st = Math.sin(j);
      for(let i=0; i<6.28; i+=0.02) {
        const sp = Math.sin(i), cp = Math.cos(i),
              h = ct + 2,
              D = 1 / (sp * h * sA + st * cA + 5),
              t = sp * h * cA - st * sA;

        const x = Math.floor(40 + 30 * D * (cp * h * cB - t * sB));
        const y = Math.floor(12 + 15 * D * (cp * h * sB + t * cB));
        const o = x + 80 * y;
        const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
        
        if(y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
          z[o] = D;
          b[o] = ".,-~:;=!*#$@"[Math.max(0, N)];
        }
      }
    }
    pretag.innerHTML = b.join("");
    requestAnimationFrame(renderAsciiFrame);
  };
  renderAsciiFrame();
})();
