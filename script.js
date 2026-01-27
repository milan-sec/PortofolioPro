const burger = document.getElementById("burger");
const navlinks = document.getElementById("navlinks");
burger?.addEventListener("click", () => navlinks.classList.toggle("open"));

document.getElementById("year").textContent = new Date().getFullYear();

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    projects.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = (f === "all") || tags.includes(f);
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===== Secure Contact Form =====
const API_URL = "https://contact-api-phf8.onrender.com/api/contact";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const btn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btn.disabled = true;
    statusEl.textContent = "Envoi...";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
      website: document.getElementById("website").value.trim(), // honeypot
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        statusEl.textContent = data.error || "Erreur lors de l’envoi.";
        btn.disabled = false;
        return;
      }

      statusEl.textContent = "Message envoyé ✅";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Serveur indisponible (Render peut être en veille).";
    } finally {
      btn.disabled = false;
    }
  });
}

