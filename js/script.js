// HERO MAIN H1 STAGGER ANIMATION

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


// NAV SCROLL STATE

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


// MENU TOGGLE LOGIC

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


//CLOSE WHEN CLICKING OUTSIDE

document.addEventListener("click", (e) => {
  if (
    navDropdown.classList.contains("active") &&
    !navDropdown.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

// AUTO ACTIVE LINK BASED ON URL

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

  //caorusel for design page 
  (function () {
  const csTrack = document.getElementById("csTrack");
  const csPrevBtn = document.getElementById("csPrevBtn");
  const csNextBtn = document.getElementById("csNextBtn");

  function csCardStepPx() {
    const first = csTrack.querySelector(".cs-card");
    if (!first) return 320;

    const styles = getComputedStyle(csTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return first.getBoundingClientRect().width + gap;
  }

  function csUpdateButtons() {
    const maxScrollLeft = csTrack.scrollWidth - csTrack.clientWidth - 2;
    csPrevBtn.disabled = csTrack.scrollLeft <= 2;
    csNextBtn.disabled = csTrack.scrollLeft >= maxScrollLeft;
  }

  function csScrollByCard(dir) {
    csTrack.scrollBy({ left: dir * csCardStepPx(), behavior: "smooth" });
  }

  csPrevBtn.addEventListener("click", () => csScrollByCard(-1));
  csNextBtn.addEventListener("click", () => csScrollByCard(1));
  csTrack.addEventListener("scroll", csUpdateButtons, { passive: true });
  window.addEventListener("resize", csUpdateButtons);

  // drag-to-scroll
  let csIsDown = false;
  let csStartX = 0;
  let csStartScrollLeft = 0;

  csTrack.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    csIsDown = true;
    csTrack.setPointerCapture(e.pointerId);
    csStartX = e.clientX;
    csStartScrollLeft = csTrack.scrollLeft;
    csTrack.style.scrollBehavior = "auto";
  });

  csTrack.addEventListener("pointermove", (e) => {
    if (!csIsDown) return;
    const dx = e.clientX - csStartX;
    csTrack.scrollLeft = csStartScrollLeft - dx;
  });

  function csEndDrag() {
    if (!csIsDown) return;
    csIsDown = false;
    csTrack.style.scrollBehavior = "smooth";

    // settle snap in some browsers
    csTrack.scrollBy({ left: 0, behavior: "smooth" });
    csUpdateButtons();
  }

  csTrack.addEventListener("pointerup", csEndDrag);
  csTrack.addEventListener("pointercancel", csEndDrag);
  csTrack.addEventListener("pointerleave", csEndDrag);

  // initial state
  csUpdateButtons();
})();
