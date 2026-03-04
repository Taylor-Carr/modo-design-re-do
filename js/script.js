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

// NAVIGATION
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navDropdown = document.getElementById("navDropdown");

const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");


// SCROLL STATE
window.addEventListener("scroll", () => {

  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (
    navDropdown.classList.contains("active") &&
    window.scrollY > 100
  ) {
    closeMenu();
  }
});


// TOGGLE MENU
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  const isOpen = navDropdown.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }

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

document.addEventListener("click", (e) => {

  if (!navDropdown.classList.contains("active")) return;

  if (e.target.closest("#menuToggle")) return;

  if (e.target.closest("[data-ignore-menu]")) return;

  if (e.target.closest("#navDropdown")) return;

  closeMenu();
});


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


// ACCORDIONS
document.addEventListener("DOMContentLoaded", function () {

  function initAccordion(itemSelector, headerSelector, contentSelector) {

    const items = document.querySelectorAll(itemSelector);
    let activeItem = null;

    function openItem(item) {
      const content = item.querySelector(contentSelector);

      item.classList.add("active");
      content.style.height = content.scrollHeight + "px";

      content.addEventListener("transitionend", function handler() {
        content.style.height = "auto";
        content.removeEventListener("transitionend", handler);
      });

      activeItem = item;
    }

    function closeItem(item) {
      const content = item.querySelector(contentSelector);

      content.style.height = content.scrollHeight + "px";

      requestAnimationFrame(() => {
        content.style.height = "0px";
      });

      item.classList.remove("active");

      if (activeItem === item) {
        activeItem = null;
      }
    }

    items.forEach(item => {
      const header = item.querySelector(headerSelector);

      header.addEventListener("click", function () {

        if (item === activeItem) {
          closeItem(item);
          return;
        }

        if (activeItem) {
          closeItem(activeItem);
        }

        openItem(item);
      });
    });
  }

  initAccordion(".accordion-item", ".accordion-header", ".accordion-content");
  initAccordion(".faq-item", ".faq-question", ".faq-answer");
});


// COPY EMAIL
function copyEmail(el) {

  const email = el.textContent.trim();
  navigator.clipboard.writeText(email);

  const note = document.createElement("span");
  note.textContent = "Copied";

  note.style.position = "absolute";
  note.style.left = "50%";
  note.style.top = "-28px";
  note.style.transform = "translateX(-50%)";
  note.style.background = "#000";
  note.style.color = "#fff";
  note.style.padding = "4px 10px";
  note.style.fontSize = "12px";
  note.style.borderRadius = "6px";
  note.style.whiteSpace = "nowrap";
  note.style.opacity = "0";
  note.style.transition = "opacity 0.2s ease";

  el.style.position = "relative";
  el.appendChild(note);

  requestAnimationFrame(() => {
    note.style.opacity = "1";
  });

  setTimeout(() => {
    note.style.opacity = "0";

    setTimeout(() => {
      note.remove();
    }, 200);

  }, 1500);
}

// toggle for pricing section
  const buttons = document.querySelectorAll(".toggle");
  const cards = document.querySelectorAll(".pricing-card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      buttons.forEach(btn => btn.classList.remove("active"));
      cards.forEach(card => card.classList.remove("active"));

      button.classList.add("active");

      const plan = button.dataset.plan;
      document.getElementById(plan).classList.add("active");

    });
  });

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

    csTrack.scrollBy({ left: 0, behavior: "smooth" });
    csUpdateButtons();
  }

  csTrack.addEventListener("pointerup", csEndDrag);
  csTrack.addEventListener("pointercancel", csEndDrag);
  csTrack.addEventListener("pointerleave", csEndDrag);

  csUpdateButtons();
})();