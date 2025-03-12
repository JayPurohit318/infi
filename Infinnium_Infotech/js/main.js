$(document).ready(function () {
  function hexagonalPattern() {
      var $container = $('.container');
      var width = $container.width();
      var height = $container.height();
      var $item = $('.hexa');
      var itemWidth = $item.width() * 2;
      var rowLength = Math.floor(width / (itemWidth * 3 / 4 + 1));
      var rowsNeeded = Math.ceil(height / (itemWidth * 0.86));
      var totalItemsNeeded = rowsNeeded * rowLength;

      // Optimize cloning
      if (totalItemsNeeded > $item.length) {
          let fragment = document.createDocumentFragment();
          let clonesNeeded = totalItemsNeeded - $item.length;
          for (let i = 0; i < clonesNeeded; i++) {
              let clone = $item[0].cloneNode(true);
              fragment.appendChild(clone);
          }
          $container[0].appendChild(fragment);
      }

      // Hexagon layout logic
      var itemLength = $('.hexa').length;
      var patternLength = Math.floor(itemLength / rowLength);
      var currentRow = 1;

      $('.hexa').each(function (index) {
          $(this).removeClass('top');
          if (index + 1 > currentRow * rowLength) currentRow++;
          var indexRow = index + 1 - (currentRow - 1) * rowLength;
          if (indexRow % 2 == 0) $(this).addClass('top');
      });
  }

  // Optimized Resize Event
  let resizeTimeout;
  $(window).on('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(hexagonalPattern, 200);
  });

  // Initial Call
  hexagonalPattern();

  // GSAP Animations (Optimized)
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".feature-box", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.3,
      scrollTrigger: {
          trigger: ".feature-box",
          start: "top 80%",
          end: "bottom 60%",
          once: true, // Runs only once
      }
  });

  gsap.from(".video-section img", {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
          trigger: ".video-section",
          start: "top 80%",
          once: true, // Runs only once
      }
  });

  gsap.from(".header-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
          trigger: ".header-text",
          start: "top 80%",
          once: true, // Runs only once
      }
  });
});

  // Add this JavaScript at the end of the body
    document.addEventListener('DOMContentLoaded', () => {
        // Animate grid container
        const grid = document.getElementById('services-grid');
        grid.style.opacity = '1';
        
        // Animate individual cards with Intersection Observer
        const cards = document.querySelectorAll('.card-item');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add animation with staggered delay
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-card');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });

        // Animate the main grid container
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        gridObserver.observe(grid);
    });
    document.addEventListener('DOMContentLoaded', () => {
      // Animate product grid container
      const productGrid = document.getElementById('productGrid');
      productGrid.style.opacity = '1';

      // Configure Intersection Observer for product items
      const productItems = document.querySelectorAll('.product-item');
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px'
      };

      const productObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                  // Stagger animations with different delays
                  const delay = index * 0.15;
                  entry.target.style.animationDelay = `${delay}s`;
                  entry.target.classList.add('animate-product');
                  productObserver.unobserve(entry.target);
              }
          });
      }, observerOptions);

      productItems.forEach(item => {
          item.style.opacity = '0';
          productObserver.observe(item);
      });

      // Animate header
      const headerElements = document.querySelectorAll('.animate-product');
      headerElements.forEach(el => {
          el.style.opacity = '0';
          setTimeout(() => {
              el.style.opacity = '1';
          }, 500);
      });
  });
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".about-content", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%", // Animation starts when element is 80% in view
      toggleActions: "play none none none"
    }
  });

  gsap.from(".metrics div", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3, // Adds delay between each metric
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".metrics",
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
  AOS.init({
    once: true, // Animation only happens once
    easing: 'ease-out-quad', // Smooth easing function
    duration: 1000, // Default animation duration
  });
  // Number counting animation function
function animateCounters() {
    const counters = document.querySelectorAll('.count-up');
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
  
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const suffix = counter.textContent.includes('+') ? '+' : '';
      const start = parseInt(counter.textContent);
      const totalFrames = Math.round(animationDuration / frameDuration);
      let currentFrame = 0;
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counter.classList.add('visible');
            const counterInterval = setInterval(() => {
              currentFrame++;
              const progress = currentFrame / totalFrames;
              const currentValue = Math.round(target * progress);
              
              if (currentValue >= target) {
                clearInterval(counterInterval);
                counter.textContent = target + suffix;
              } else {
                counter.textContent = currentValue + suffix;
              }
            }, frameDuration);
            
            // Stop observing after animation starts
            observer.unobserve(counter);
          }
        });
      });
  
      observer.observe(counter);
    });
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', animateCounters);

  // Add this easing function
function easeOutQuad(t) {
    return t * (2 - t);
  }
  
  // And modify the progress calculation to:
  const progress = easeOutQuad(currentFrame / totalFrames);
  