// Typing Effect
const texts = ["Front-End Developer", "Java Programmer", "Python Learner"];
let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 500);
  }
}

type();

// Skill Bar Animation
const bars = document.querySelectorAll(".bar div");
window.addEventListener("scroll", () => {
  bars.forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
});
