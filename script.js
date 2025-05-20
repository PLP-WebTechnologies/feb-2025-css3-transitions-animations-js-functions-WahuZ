// Theme switcher
const lightBtn = document.getElementById('lightBtn');
const darkBtn = document.getElementById('darkBtn');
const body = document.body;

function applyTheme(theme) {
  body.classList.remove('light', 'dark');
  body.classList.add(theme);
  localStorage.setItem('campusTheme', theme);
  animateButton(theme === 'light' ? lightBtn : darkBtn);
}

function animateButton(button) {
  button.classList.add('btn-animate');
  setTimeout(() => {
    button.classList.remove('btn-animate');
  }, 300);
}

lightBtn.addEventListener('click', () => applyTheme('light'));
darkBtn.addEventListener('click', () => applyTheme('dark'));

// Load theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('campusTheme') || 'light';
  applyTheme(savedTheme);
});

// Tab functionality
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.tab;
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === target);
    });
  });
});

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Form validation
const form = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Clear previous errors
  formMessage.textContent = '';
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => input.classList.remove('error'));

  let valid = true;

  // Name required
  const name = form.name.value.trim();
  if (!name) {
    valid = false;
    showError(form.name);
  }

  // Email required + format
  const email = form.email.value.trim();
  if (!email || !validateEmail(email)) {
    valid = false;
    showError(form.email);
  }

  // Password required + min 8 chars
  const password = form.password.value;
  if (!password || password.length < 8) {
    valid = false;
    showError(form.password);
  }

  if (valid) {
    formMessage.style.color = 'green';
    formMessage.textContent = `Thank you for joining, ${name}! Welcome to campus life! 🎓`;
    form.reset();
  } else {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please fix the errors in the form.';
  }
});

function showError(input) {
  input.classList.add('error');
}

function validateEmail(email) {
  // Simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Button animation class for theme buttons
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .btn-animate {
    animation: btnPulse 0.3s ease forwards;
  }
  @keyframes btnPulse {
    0% { transform: scale(1); background-color: #6a5acd; }
    50% { transform: scale(1.1); background-color: #836fff; }
    100% { transform: scale(1); background-color: #6a5acd; }
  }
`;
document.head.appendChild(styleSheet);

