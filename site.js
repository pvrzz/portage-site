/*
Portage by pvrz
https://github.com/pvrzz/Portage/
File Name: site.js
*/

(function () {
  const KEY = "portage-site-theme";
  const root = document.documentElement;
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  function current() { try { return localStorage.getItem(KEY) || "system"; } catch { return "system"; } }
  function effective() { const m = current(); return m !== "system" ? m : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function setMode(m) { if (m === "system") root.removeAttribute("data-mode"); else root.setAttribute("data-mode", m); try { localStorage.setItem(KEY, m); } catch {} updateIcon(); }
  function updateIcon() { const b = document.getElementById("themeToggle"); if (b) b.innerHTML = effective() === "dark" ? SUN : MOON; }

  const init = current();
  if (init !== "system") root.setAttribute("data-mode", init);

  document.addEventListener("DOMContentLoaded", () => {
    updateIcon();
    const toggle = document.getElementById("themeToggle");
    if (toggle) toggle.addEventListener("click", () => setMode(effective() === "dark" ? "light" : "dark"));

    const nav = document.querySelector(".nav");
    const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
