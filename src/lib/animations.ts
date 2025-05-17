export const createConfetti = (number: number) => {
  const numberOfConfetti = 30;
  const targetElement = document.getElementById(`number-${number}`);
  
  if (!targetElement) {
    // Create confetti near the current number display
    const currentNumberElement = document.querySelector('.number-ball.selected');
    if (currentNumberElement) {
      const rect = currentNumberElement.getBoundingClientRect();
      
      for (let i = 0; i < numberOfConfetti; i++) {
        createConfettiPiece(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
    return;
  }
  
  const rect = targetElement.getBoundingClientRect();
  
  for (let i = 0; i < numberOfConfetti; i++) {
    createConfettiPiece(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
};

export const createConfettiPiece = (x: number, y: number) => {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  document.body.appendChild(confetti);
  
  // Random positioning
  confetti.style.left = `${x + (Math.random() * 100 - 50)}px`;
  confetti.style.top = `${y + (Math.random() * 20 - 10)}px`;
  
  // Random size
  const size = Math.random() * 8 + 5;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  
  // Random shape
  if (Math.random() > 0.5) {
    confetti.style.borderRadius = '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  }
  
  // Animation
  confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s forwards`;
  
  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, 3000);
};

export const createFireworks = () => {
  const fireworksCount = 5;
  
  // Add a variety of colors for a more festive look
  const colors = ['#d4af37', '#f0d78c', '#2096c7', '#ffd700', '#f5deb3'];
  
  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
      const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.1;
      
      createFireworkEffect(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }, i * 200);
  }
};

export const createFireworkEffect = (x: number, y: number, color: string = '#d4af37') => {
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 1.5 + 1.5;
    const size = Math.random() * 5 + 2;
    
    const particle = document.createElement('div');
    particle.className = 'firework';
    
    // Set color
    particle.style.backgroundColor = color;
    
    // Size
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Initial position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    // Animate
    setTimeout(() => {
      particle.style.transition = `all ${duration}s cubic-bezier(0,.9,.57,1)`;
      particle.style.left = `${x + Math.cos(angle) * distance}px`;
      particle.style.top = `${y + Math.sin(angle) * distance}px`;
      particle.style.opacity = '0';
      
      // Clean up
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, duration * 1000);
    }, 10);
  }
};

export const createBackgroundSparkles = () => {
  // Create some subtle background sparkles
  const sparklesCount = 15; // Reduced for a cleaner look
  
  for (let i = 0; i < sparklesCount; i++) {
    createBackgroundSparkle();
  }
  
  // Create new sparkles periodically
  setInterval(() => {
    createBackgroundSparkle();
  }, 3000);
};

export const createBackgroundSparkle = () => {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle animate-sparkle';
  
  // Random position
  sparkle.style.left = `${Math.random() * window.innerWidth}px`;
  sparkle.style.top = `${Math.random() * window.innerHeight}px`;
  
  // Random size
  const size = Math.random() * 4 + 2;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  
  // Random duration
  const duration = Math.random() * 3 + 2;
  sparkle.style.animationDuration = `${duration}s`;
  
  document.body.appendChild(sparkle);
  
  // Remove after animation
  setTimeout(() => {
    if (document.body.contains(sparkle)) {
      document.body.removeChild(sparkle);
    }
  }, duration * 1000);
};

export const createFloatingElement = (count: number = 10) => {
  for (let i = 0; i < count; i++) {
    const element = document.createElement('div');
    element.className = 'floating-star animate-float';

    const size = Math.random() * 12 + 5;
    const posX = Math.random() * (window.innerWidth - 100);
    const posY = Math.random() * (window.innerHeight - 100);
    const duration = Math.random() * 8 + 10;
    const delay = Math.random() * 5;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}px`;
    element.style.top = `${posY}px`;
    element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    document.body.appendChild(element);
  }
};
