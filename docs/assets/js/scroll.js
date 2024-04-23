function scrollUp() {
  const mainElement = document.querySelector('main');
  const bodyElement = document.querySelector('body')
  
  // Add a class to main element to trigger the scroll up animation
  mainElement.classList.add('animating', 'scroll-up');
  bodyElement.classList.add('animating')
  
  // Scroll up after a short delay to allow animation to start
  setTimeout(() => {
      mainElement.scrollTop -= 200; // Scroll up by 200px
  }, 50); // Adjust the delay as needed
  
  // Remove the animation class after animation completes
  setTimeout(() => {
      mainElement.classList.remove('animating', 'scroll-up');
      bodyElement.classList.remove('animating')
  }, 500); // Adjust the delay to match the animation duration
}

function scrollDown() {
  const mainElement = document.querySelector('main');
  const bodyElement = document.querySelector('body')
  
  // Add a class to main element to trigger the scroll down animation
  mainElement.classList.add('animating', 'scroll-down');
  bodyElement.classList.add('animating')
  
  // Scroll down after a short delay to allow animation to start
  setTimeout(() => {
      mainElement.scrollTop += 200; // Scroll down by 200px
  }, 50); // Adjust the delay as needed
  
  // Remove the animation class after animation completes
  setTimeout(() => {
      mainElement.classList.remove('animating', 'scroll-down');
      bodyElement.classList.remove('animating')
  }, 500); // Adjust the delay to match the animation duration
}