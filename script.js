// ---- EmailJS init ----
emailjs.init("hlpN6-Ib6v7oJZZi1");

const roles = [
  "Software Engineering Undergraduate",
  "Graphic Designer",
];
const roleEl = document.getElementById("role");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Simple fade-cycle fallback, no per-character typing
  let i = 0;
  roleEl.textContent = roles[0];
  setInterval(() => {
    i = (i + 1) % roles.length;
    roleEl.style.transition = "opacity 0.4s ease";
    roleEl.style.opacity = 0;
    setTimeout(() => {
      roleEl.textContent = roles[i];
      roleEl.style.opacity = 1;
    }, 400);
  }, 2600);
} else {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
        return;
      }
    } else {
      charIndex--;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 35 : 65);
  }
  typeRole();
}

// ---- Contact form (Reach Me section) ----
function validate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const sendBtn = document.getElementById("send");
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  const templateParams = { name, email, subject, message };

  emailjs
    .send("service_kuls8t5", "template_qp8hicd", templateParams)
    .then(() => {
      alert("Message sent! Thank you for reaching out.");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Something went wrong. Please try again later.");
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
    });
}
