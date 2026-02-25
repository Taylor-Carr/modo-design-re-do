/* ==================================
   HERO MAIN H1 STAGGER ANIMATION
================================== */
window.addEventListener("load", () => {
  const lines = document.querySelectorAll(".hero-title .line span");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.transform = "translateY(0)";
      line.style.opacity = "1";
    }, index * 180);
  });
});


// HERO CARD ROTATING TEXT

const phrases = [
  "Built for growth",
  "Designed to convert",
  "Made for visibility"
];

const changingText = document.getElementById("changing-text");

if (changingText) {
  let i = 0;

  setInterval(() => {
    changingText.style.opacity = 0;
    changingText.style.transform = "translateY(-15px)";

    setTimeout(() => {
      i = (i + 1) % phrases.length;
      changingText.textContent = phrases[i];
      changingText.style.transform = "translateY(15px)";
    }, 300);

    setTimeout(() => {
      changingText.style.opacity = 1;
      changingText.style.transform = "translateY(0)";
    }, 320);

  }, 2800);
}


/* ==================================
   NAV SCROLL STATE
================================== */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Close menu if user scrolls
  if (navDropdown.classList.contains("active")) {
    closeMenu();
  }
});


/* ==================================
   MENU TOGGLE LOGIC
================================== */
const menuToggle = document.getElementById("menuToggle");
const navDropdown = document.getElementById("navDropdown");

const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");
const menuIcon = document.querySelector(".menu-icon");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  const isOpen = navDropdown.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }

  // Toggle rotation on the button
  menuToggle.classList.toggle("active");
});

function openMenu() {
  navDropdown.classList.add("active");

  if (menuOpen) menuOpen.classList.remove("active");
  if (menuClose) menuClose.classList.add("active");
}

function closeMenu() {
  navDropdown.classList.remove("active");

  if (menuClose) menuClose.classList.remove("active");
  if (menuOpen) menuOpen.classList.add("active");
}


/* ==================================
   CLOSE WHEN CLICKING OUTSIDE
================================== */
document.addEventListener("click", (e) => {
  if (
    navDropdown.classList.contains("active") &&
    !navDropdown.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});


/* ==================================
   AUTO ACTIVE LINK BASED ON URL
================================== */
const links = document.querySelectorAll(".dropdown-links a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  const linkPath = link.getAttribute("href");

  if (
    linkPath === currentPage ||
    (currentPage === "" && linkPath === "index.html")
  ) {
    link.classList.add("active");
  }
});