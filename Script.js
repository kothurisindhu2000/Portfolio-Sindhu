document.addEventListener('DOMContentLoaded', () => {

  // **FIXED SELECTOR:** Targets all <img> elements that live inside any <section> tag.
  // This robustly selects your project, experience, and education images, while ignoring the header.
  const imagesToEnlarge = document.querySelectorAll('section img');

  imagesToEnlarge.forEach(img => {
    // Skip if the image is too small to enlarge (e.g., icons or thumbnails less than 100px)
    if (img.offsetHeight < 50 || img.offsetWidth < 50) return;
    
    img.style.cursor = 'zoom-in'; 
    img.setAttribute('alt', img.alt || 'Click to enlarge image'); 

    img.addEventListener('click', () => {
      // 1. Create the full-screen overlay (Lightbox)
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0; 
        left: 0;
        width: 100vw; 
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999; 
        opacity: 0;
        transition: opacity 0.3s ease-out;
      `;

      // 2. Create the big image element
      const bigImg = document.createElement('img');
      bigImg.src = img.src; 
      bigImg.alt = img.alt;
      bigImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 0 50px rgba(255, 255, 255, 0.5); 
        pointer-events: none; /* Allows click to pass through to the overlay */
        object-fit: contain;
      `;
      overlay.appendChild(bigImg);

      // 3. Append and show overlay
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });

      // 4. Closing logic (click anywhere on the dark overlay)
      const closeLightbox = () => {
          overlay.style.opacity = '0';
          setTimeout(() => {
              overlay.remove();
              document.removeEventListener('keydown', closeOnEsc);
          }, 300); 
      };

      overlay.addEventListener('click', closeLightbox);
      
      // 5. Close on ESC key press
      const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      };
      document.addEventListener('keydown', closeOnEsc);
    });
  });
});