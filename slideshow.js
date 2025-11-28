// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    // Only run if slides exist
    if (totalSlides === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Only start slideshow if slides exist
if (totalSlides > 0) {
    setInterval(showNextSlide, 5000);
}
