// State management using in-memory variables
let currentPage = 1;
let countdownInterval = null;
let currentCount = 20;

// Page transition function
function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
    }
}

// Create confetti burst effect
function createConfetti(container) {
    const colors = ['#4A90E2', '#FFB6C1', '#87CEEB', '#FF69B4', '#B0E0E6', '#FFC8D3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        if (container) {
            container.appendChild(confetti);
        } else {
            document.body.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Countdown function
function startCountdown() {
    const countdownNumberEl = document.getElementById('countdownNumber');
    currentCount = 20;
    
    countdownInterval = setInterval(() => {
        currentCount--;
        
        if (currentCount >= 0) {
            countdownNumberEl.textContent = currentCount;
            // Restart animation
            countdownNumberEl.style.animation = 'none';
            setTimeout(() => {
                countdownNumberEl.style.animation = 'countPulse 0.6s ease';
            }, 10);
        } else {
            clearInterval(countdownInterval);
            showCake();
        }
    }, 600);
}

// Show cake after countdown
function showCake() {
    const countdownContainer = document.getElementById('countdownContainer');
    const cakeContainer = document.getElementById('cakeContainer');
    
    countdownContainer.classList.add('hidden');
    cakeContainer.classList.remove('hidden');
    
    // Add cake click event
    const cake = document.getElementById('cake');
    cake.addEventListener('click', blowOutCandles);
}

// Blow out candles function
function blowOutCandles() {
    const flames = document.querySelectorAll('.flame');
    const celebrationText = document.getElementById('celebrationText');
    const cakeContainer = document.getElementById('cakeContainer');
    const cake = document.getElementById('cake');
    
    // Remove click listener to prevent multiple clicks
    cake.removeEventListener('click', blowOutCandles);
    
    // Animate each flame blowing out
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown');
        }, index * 100);
    });
    
    // After all flames are blown out
    setTimeout(() => {
        // Create confetti burst
        createConfetti(document.getElementById('page2'));
        
        // Hide cake, show celebration text
        cakeContainer.classList.add('hidden');
        celebrationText.classList.remove('hidden');
        
        // Transition to page 3
        setTimeout(() => {
            showPage(3);
        }, 2000);
    }, 800);
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page 1: Open button
    const openBtn = document.getElementById('openBtn');
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            showPage(2);
            // Start countdown after a brief moment
            setTimeout(startCountdown, 300);
        });
    }
    
    // Page 3: PDF buttons (placeholders - replace '#' with actual PDF URL)
    const openPdfBtn = document.getElementById('openPdfBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    
    if (openPdfBtn) {
        openPdfBtn.addEventListener('click', function(e) {
            // If you have a real PDF URL, replace the href in HTML
            // Example: <a href="https://yoursite.com/birthday-gift.pdf" target="_blank">
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Please add your PDF URL in the HTML file! Replace the # with your PDF link.');
            }
        });
    }
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function(e) {
            // If you have a real PDF URL, replace the href in HTML
            // Example: <a href="https://yoursite.com/birthday-gift.pdf" download="Birthday-Gift.pdf">
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Please add your PDF URL in the HTML file! Replace the # with your PDF link.');
            }
        });
    }
    
    // Show first page on load
    showPage(1);
});