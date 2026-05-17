const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const modal = document.querySelector("#demo-modal");
const modalPanel = modal.querySelector(".modal-panel");
const salesButton = document.querySelector("#sales-button");
const salesResult = document.querySelector("#sales-result");
const whitepaperButton = document.querySelector("#whitepaper-button");
const whitepaperOutput = document.querySelector("#whitepaper-output");

const whitepaperErrors = [
  `Error:
The report is currently aligning with stakeholder expectations.
Retry?`,
  `Error:
Stakeholders are currently aligning with report expectations.
Retry?`,
  `Error:
Expectations are currently reporting stakeholders.
Retry?`,
];

let whitepaperIndex = 0;
let lastFocusedElement = null;

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function closeNav() {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalPanel.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href").slice(1);

    if (sectionId) {
      event.preventDefault();
      closeNav();
      scrollToSection(sectionId);
      history.pushState(null, "", `#${sectionId}`);
    }
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.scrollTarget);
  });
});

document.querySelector("[data-open-modal]").addEventListener("click", openModal);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

salesButton.addEventListener("click", () => {
  salesResult.textContent = "Sales has contacted itself.";
});

whitepaperButton.addEventListener("click", () => {
  whitepaperIndex = (whitepaperIndex + 1) % whitepaperErrors.length;
  whitepaperOutput.textContent = whitepaperErrors[whitepaperIndex];
});
