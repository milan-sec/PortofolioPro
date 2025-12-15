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
