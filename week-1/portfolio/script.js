// DOM utilities
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

// Preloader fade
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  // trigger fade
  pre.classList.add("fade-out");
  // cleanup after transition
  pre.addEventListener(
    "transitionend",
    () => {
      pre.remove();
    },
    { once: true }
  );
});

// Smooth scroll for anchor links
qsa('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // close mobile nav if open
    closeMobileNav();
  });
});

// Theme toggle (persist in localStorage)
const themeToggle = qs("#theme-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") document.body.classList.add("light");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Set year in footer
qs("#year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = qs("#menu-toggle");
const mobileNav = qs(".mobile-nav");
menuToggle.addEventListener("click", () => {
  const open = mobileNav.getAttribute("aria-hidden") === "false";
  if (open) closeMobileNav();
  else openMobileNav();
});
function openMobileNav() {
  mobileNav.setAttribute("aria-hidden", "false");
  mobileNav.style.display = "block";
  setTimeout(() => mobileNav.classList.add("open"), 10);
}
function closeMobileNav() {
  mobileNav.setAttribute("aria-hidden", "true");
  mobileNav.classList.remove("open");
  setTimeout(() => (mobileNav.style.display = "none"), 250);
}
document.addEventListener("click", (e) => {
  if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMobileNav();
  }
});

// IntersectionObserver reveal on scroll
const reveals = qsa(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => io.observe(el));

// Project filtering
const filterButtons = qsa(".filter-btn");
const projectCards = qsa(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const cat = card.dataset.category;
      if (filter === "all" || cat === filter) {
        card.style.display = "";
        // re-trigger reveal if hidden before
        setTimeout(() => card.classList.add("visible"), 20);
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Contact form mock submission
const form = qs(".contact-form");
const statusEl = qs(".form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";
  // simulate network
  setTimeout(() => {
    statusEl.textContent = "Message sent. I'll get back to you soon.";
    form.reset();
  }, 1200);
});

console.log("hello");
