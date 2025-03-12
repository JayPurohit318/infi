const grid = document.getElementById('grid');
const rows = 14;
const cols = 14;
const verticalOffset = 7 * 0.866 * 2;
const icons = ['facebook', 'twitter', 'instagram', 'linkedin', 'github', 'youtube'];

// Create grid function
function createGrid() {
  for (let row = 0; row < rows; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = `row ${row % 2 === 0 ? 'even' : ''}`;
    
    for (let col = 0; col < cols; col++) {
      const container = document.createElement('div');
      container.className = 'hex-container';
      
      const flipContent = document.createElement('div');
      flipContent.className = 'flip-content';
      
      // Front face
      const hexFront = document.createElement('div');
      hexFront.className = 'hex-front';
      
      const border = document.createElement('div');
      border.className = 'hex-border';
      
      const inner = document.createElement('div');
      inner.className = 'hex-inner';
      
      hexFront.appendChild(border);
      hexFront.appendChild(inner);
      
      // Back face
      const hexBack = document.createElement('div');
      hexBack.className = 'hex-back';
      
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const icon = document.createElement('i');
      icon.className = `fab fa-${randomIcon} text-white text-3xl`;
      
      hexBack.appendChild(icon);
      
      flipContent.appendChild(hexFront);
      flipContent.appendChild(hexBack);
      container.appendChild(flipContent);
      rowDiv.appendChild(container);
    }
    
    grid.appendChild(rowDiv);
    
    if (row < rows - 1) {
      const spacer = document.createElement('div');
      spacer.style.height = `${verticalOffset}px`;
      grid.appendChild(spacer);
    }
  }

  // Add random initial flips
  document.querySelectorAll('.flip-content').forEach(flipContent => {
    const randomDelay = Math.random() * 2000; // 0-2 seconds
    flipContent.style.animation = `initialFlip 1.2s ease-in-out ${randomDelay}ms 1`;
  });
}

// Initialize grid when page loads
window.addEventListener('load', createGrid);