// ===== TYPING EFFECT =====
const texts = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Node.js Developer",
  "MongoDB Expert",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 95;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 450;
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  if (texts.length) setTimeout(typeEffect, 800);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ===== NAVBAR SCROLL & ACTIVE LINK =====
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);

  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
}, { passive: true });

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  ".card, .section-title, .stack-card, .skill-category, .mern-tags, .about-text"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach(el => {
  el.classList.add("hidden-reveal");
  revealObserver.observe(el);
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    // Spin animation
    if (themeIcon) {
      themeIcon.style.transition = "transform 0.4s ease";
      themeIcon.style.transform = "rotate(360deg)";
      setTimeout(() => { themeIcon.style.transform = "rotate(0deg)"; }, 400);
    }
  });
}

// ===== AI AUDIO INTRO =====
const aiAudioBtn = document.getElementById("ai-audio-btn");
let isPlaying = false;
let currentUtterance = null;

if (aiAudioBtn) {
  aiAudioBtn.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      resetAudioBtn();
      return;
    }

    const introText =
      "Hi, I'm Skill — a MERN Stack Developer with hands-on production experience. " +
      "I build scalable full-stack applications using MongoDB, Express.js, React.js, and Node.js. " +
      "I recently shipped LABBASE, a live laboratory management system used by real clinical staff, " +
      "during my internship at Inloops Innovations. " +
      "I'm actively looking for MERN Stack Developer roles. " +
      "Feel free to explore my projects or get in touch!";

    const utterance = new SpeechSynthesisUtterance(introText);

    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      utterance.voice =
        voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) ||
        voices.find(v => v.lang.startsWith("en")) ||
        null;
    };

    setVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isPlaying = true;
      aiAudioBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
      aiAudioBtn.style.color = "#ef4444";
      aiAudioBtn.style.borderColor = "#ef4444";
    };

    const resetAudioBtn = () => {
      isPlaying = false;
      aiAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play Intro';
      aiAudioBtn.style.color = "";
      aiAudioBtn.style.borderColor = "";
    };

    utterance.onend = resetAudioBtn;
    utterance.onerror = resetAudioBtn;

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
}

function resetAudioBtn() {
  isPlaying = false;
  if (aiAudioBtn) {
    aiAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play Intro';
    aiAudioBtn.style.color = "";
    aiAudioBtn.style.borderColor = "";
  }
}
