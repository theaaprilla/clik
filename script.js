// Slide management
let currentSlide = 1;
const totalSlides = 2;

function showSlide(slideNumber) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show the target slide
    const targetSlide = document.getElementById(`slide${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
}

function nextSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    showSlide(currentSlide);
}

function replayAnimation() {
    currentSlide = 1;
    showSlide(currentSlide);
}

// Add floating animation to toys
document.addEventListener('DOMContentLoaded', function() {
    const catToy = document.querySelector('.cat-toy');
    const dogToy = document.querySelector('.dog-toy');
    
    if (catToy) {
        catToy.style.animation = 'float 3s ease-in-out infinite';
    }
    
    if (dogToy) {
        dogToy.style.animation = 'float 3s ease-in-out infinite 1.5s';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    }
    if (event.key === 'ArrowLeft') {
        currentSlide--;
        if (currentSlide < 1) {
            currentSlide = totalSlides;
        }
        showSlide(currentSlide);
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        currentSlide--;
        if (currentSlide < 1) {
            currentSlide = totalSlides;
        }
        showSlide(currentSlide);
    }
}

// Add confetti effect for special moments
function createConfetti() {
    const colors = ['#ff6b6b', '#ff8e8e', '#ffa726', '#ffcc02', '#66bb6a'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Trigger confetti on slide 2
function nextSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    showSlide(currentSlide);
    
    if (currentSlide === 2) {
        setTimeout(createConfetti, 500);
    }
}

// Auto-play functionality
let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 8000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play on page load
document.addEventListener('DOMContentLoaded', function() {
    startAutoPlay();
});

// Stop auto-play on user interaction
document.addEventListener('click', stopAutoPlay);
document.addEventListener('touchstart', stopAutoPlay);
document.addEventListener('keydown', stopAutoPlay);
