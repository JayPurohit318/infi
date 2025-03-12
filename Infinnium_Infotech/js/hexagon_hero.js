// JavaScript for Hexagon Hero Section
document.addEventListener('DOMContentLoaded', function() {
  const hexGrid = document.querySelector('.hex-grid');
  const hexData = [];

  // Social media icons to use
  const icons = [
    'fab fa-facebook', 'fab fa-twitter', 'fab fa-instagram',
    'fab fa-linkedin', 'fab fa-youtube', 'fab fa-pinterest',
    'fab fa-tiktok', 'fab fa-whatsapp',
    'fab fa-reddit', 'fab fa-discord', 'fab fa-skype',
    'fab fa-telegram', 'fab fa-vimeo', 'fab fa-spotify',
    'fab fa-apple', 'fab fa-android'
  ];

  // Generate hexagon data dynamically for 9 rows with 17 hexagons each
  for (let i = 1; i <= 9 * 17; i++) {
    const icon = icons[i % icons.length];
    hexData.push({
      frontColor: '#EAF5F4',
      backColor: '#859594',
      frontText: '',
      backIcon: icon
    });
  }


  // Create 9 rows with 17 hexagons each
  const rowPattern = [17, 17, 17, 17, 17, 17, 17, 17, 17];

  let hexIndex = 0;
  
  rowPattern.forEach((hexCount) => {
    const row = document.createElement('div');
    row.className = 'hex-row';
    
    for (let i = 0; i < hexCount; i++) {
      const data = hexData[hexIndex++];
      const hexagon = document.createElement('div');
      hexagon.className = 'hex';

      const hexWrap = document.createElement('div');
      hexWrap.className = 'hex-wrap';
      
      const hexFront = document.createElement('div');
      hexFront.className = 'hex-front';
      hexFront.style.backgroundColor = data.frontColor;
      
      const hexBack = document.createElement('div');
      hexBack.className = 'hex-back';
      hexBack.style.backgroundColor = data.backColor;
      
      const frontContent = document.createElement('div');
      frontContent.className = 'hex-content';

      
      const backContent = document.createElement('div');
      backContent.className = 'hex-content';
      backContent.innerHTML = `<i class="${data.backIcon} fa-2x"></i>`;

      
      hexFront.appendChild(frontContent);
      hexBack.appendChild(backContent);
      hexWrap.appendChild(hexFront);
      hexWrap.appendChild(hexBack);
      hexagon.appendChild(hexWrap);
      
      row.appendChild(hexagon);
    }
    hexGrid.appendChild(row);
  });

  // Add hover event listeners
  const hexagons = document.querySelectorAll('.hex');
  hexagons.forEach(hexagon => {
    hexagon.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });

    hexagon.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
});
