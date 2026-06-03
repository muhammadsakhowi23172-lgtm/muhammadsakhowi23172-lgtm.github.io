// Particle Animation
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 50;
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💝'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle heart-particle';
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = -20 + 'px';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 8000 + Math.random() * 4000);
    }

    // Continuously create particles
    setInterval(() => {
        if (document.getElementById('particlesContainer').children.length < 30) {
            const particle = document.createElement('div');
            particle.className = 'particle heart-particle';
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = -20 + 'px';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            document.getElementById('particlesContainer').appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 8000 + Math.random() * 4000);
        }
    }, 300);
}

// No Button Teleport Function
function makeNoButtonTeleport() {
    const noBtn = document.getElementById('noBtn');

    function getRandomPosition() {
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;
        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
    }

    function teleportButton() {
        const pos = getRandomPosition();
        noBtn.style.left = pos.x + 'px';
        noBtn.style.top = pos.y + 'px';
    }

    // On hover (Desktop)
    noBtn.addEventListener('mouseenter', teleportButton);

    // On touch (Mobile)
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        teleportButton();
    });

    // On click (Fallback)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        teleportButton();
    });

    // Set initial position
    teleportButton();
}

// Confetti Creation
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -10 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Show Celebration
function showCelebration() {
    const questionPage = document.getElementById('questionPage');
    const celebrationPage = document.getElementById('celebrationPage');

    // Hide question page
    questionPage.classList.add('hidden');

    // Show celebration page
    setTimeout(() => {
        celebrationPage.classList.add('active');
        createConfetti();
        
        // Create multiple confetti bursts
        setInterval(createConfetti, 2000);
    }, 300);
}

// Restart Function
function restartPage() {
    const questionPage = document.getElementById('questionPage');
    const celebrationPage = document.getElementById('celebrationPage');
    const romanticAudio = document.getElementById('romanticAudio');

    // Stop audio
    romanticAudio.pause();
    romanticAudio.currentTime = 0;

    // Hide celebration page
    celebrationPage.classList.remove('active');

    // Show question page
    setTimeout(() => {
        questionPage.classList.remove('hidden');
        makeNoButtonTeleport();
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Create initial particles
    createParticles();

    // Yes Button
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.addEventListener('click', showCelebration);

    // No Button Teleport
    makeNoButtonTeleport();

    // Restart Button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartPage);

    // Handle window resize for button teleport
    window.addEventListener('resize', () => {
        makeNoButtonTeleport();
    });

    // Mobile detection for better UX
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.style.fontSize = '16px'; // Prevent zoom on iOS
    }
});

// Audio Error Handling
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('romanticAudio');
    audio.addEventListener('error', () => {
        console.log('Audio failed to load, but celebration continues!');
    });
});
