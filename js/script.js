// Smooth scroll for navbar links
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // Smooth scroll with custom duration
      const duration = 1000; // Adjusted duration to a reasonable value
      const start = window.scrollY;
      const end = targetElement.offsetTop - document.querySelector('.navbar').offsetHeight;
      const startTime = performance.now();

      function scroll(timestamp) {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          window.scrollTo(0, start + (end - start) * easeInOutQuad(progress));

          if (progress < 1) {
              requestAnimationFrame(scroll);
          }
      }

      requestAnimationFrame(scroll);
  });
});


// Card hover effect with chains
const cards = document.querySelectorAll('.card');
const slider = document.querySelector('.slider');
let hoverTimeout = null;  // To manage the hover duration

// Debugging: Log the number of cards found
console.log(`Number of cards: ${cards.length}`);

// Event listener for card hover
cards.forEach(card => {
  card.addEventListener('mouseenter', (e) => {
      // Clear any previous timeouts
      clearTimeout(hoverTimeout);

      // Debugging: Log when a card is hovered
      console.log('Hover on card:', card);

      // Add class to enlarge the hovered card
      card.classList.add('enlarged');

      // Reduce the spacing between other images
      slider.classList.add('shrink');

      // Set a timeout to return the card to its original size after 4 seconds
      hoverTimeout = setTimeout(() => {
          card.classList.remove('enlarged');
          slider.classList.remove('shrink');
      }, 2000);  // 4 seconds
  });

  // Reset if the card is left before the 4-second timeout
  card.addEventListener('mouseleave', () => {
      // Debugging: Log when a card is unhovered
      console.log('Mouse left card:', card);

      clearTimeout(hoverTimeout);
      card.classList.remove('enlarged');
      slider.classList.remove('shrink');
  });
});
