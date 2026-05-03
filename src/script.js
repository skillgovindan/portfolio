// Typing Effect for Hero Section
const texts = [
  "Full Stack Developer Intern",
  "React Developer",
  "MERN Stack Developer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    // Remove char
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add char
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  // Determine typing speed
  let typeSpeed = isDeleting ? erasingDelay : typingDelay;

  // If word is complete
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = newTextDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
  if (texts.length) setTimeout(typeEffect, newTextDelay);
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when link is clicked
navItems.forEach(item => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Sticky Navbar Background and Active Link Highlight
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  // Add scrolled class for background blur/shadow
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active Link Highlighting
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Adjusted offset to trigger slightly earlier
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(current)) {
      item.classList.add("active");
    }
  });
});
