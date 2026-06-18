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
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? erasingDelay : typingDelay;

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

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
  if (texts.length) setTimeout(typeEffect, newTextDelay);
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Sticky Navbar Background and Active Link Highlight
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
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

// AI Audio Intro using Web Speech API
const aiAudioBtn = document.getElementById("ai-audio-btn");
let isPlaying = false;

if (aiAudioBtn) {
  aiAudioBtn.addEventListener("click", () => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser does not support text to speech!");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      aiAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play AI Intro';
      isPlaying = false;
      return;
    }

    const introText = "Hi, I'm Skill. A Full Stack Developer Intern with hands-on experience in React, Node, and Mongo D B. I specialize in building scalable web applications with clean architecture and robust APIs. Feel free to view my projects or contact me.";
    
    const utterance = new SpeechSynthesisUtterance(introText);
    
    // Attempt to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.includes('en') && voice.name.includes('Google')) 
                           || voices.find(voice => voice.lang.includes('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isPlaying = true;
      aiAudioBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Audio';
      aiAudioBtn.style.color = '#ef4444'; // Red color while playing
      aiAudioBtn.style.borderColor = '#ef4444';
    };

    utterance.onend = () => {
      isPlaying = false;
      aiAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play AI Intro';
      aiAudioBtn.style.color = '';
      aiAudioBtn.style.borderColor = '';
    };

    utterance.onerror = () => {
      isPlaying = false;
      aiAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play AI Intro';
      aiAudioBtn.style.color = '';
      aiAudioBtn.style.borderColor = '';
    };

    window.speechSynthesis.speak(utterance);
  });
}

// Ensure voices are loaded for Web Speech API
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
