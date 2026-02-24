// Simple menu toggle placeholder
document.getElementById("menuToggle").addEventListener("click", function() {
  alert("Menu functionality coming next.");
});

//h1 hero / nav
window.addEventListener("load", () => {
  const lines = document.querySelectorAll(".hero-title .line span");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.transform = "translateY(0)";
      line.style.opacity = "1";
    }, index * 180); // adjust speed here
  });
});

//nav logo change 
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


//hero text scroll 
const phrases = [
  "Built for growth",
  "Designed to convert",
  "Made for visibility"
];

const text = document.getElementById("changing-text");
let i = 0;

setInterval(() => {
  text.style.opacity = 0;
  text.style.transform = "translateY(-15px)";

  setTimeout(() => {
    i = (i + 1) % phrases.length;
    text.textContent = phrases[i];
    text.style.transform = "translateY(15px)";
  }, 300);

  setTimeout(() => {
    text.style.opacity = 1;
    text.style.transform = "translateY(0)";
  }, 320);

}, 2800);

// toggle for pricing section
  const buttons = document.querySelectorAll(".toggle");
  const cards = document.querySelectorAll(".pricing-card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      // remove active state
      buttons.forEach(btn => btn.classList.remove("active"));
      cards.forEach(card => card.classList.remove("active"));

      // activate clicked button
      button.classList.add("active");

      // show matching card
      const plan = button.dataset.plan;
      document.getElementById(plan).classList.add("active");

    });
  });

