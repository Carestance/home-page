/* Carestance — interactions */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. Sticky navbar shadow on scroll */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* 2. Mobile menu */
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );

  /* 3. Testimonial rail — arrows + drag to scroll */
  const rail = document.getElementById("rail");
  const step = () => (rail.querySelector(".quote")?.offsetWidth || 340) + 22;

  document.getElementById("next").addEventListener("click", () =>
    rail.scrollBy({ left: step(), behavior: "smooth" })
  );
  document.getElementById("prev").addEventListener("click", () =>
    rail.scrollBy({ left: -step(), behavior: "smooth" })
  );

  let down = false, startX = 0, startLeft = 0;
  rail.addEventListener("pointerdown", e => {
    down = true; startX = e.pageX; startLeft = rail.scrollLeft;
    rail.setPointerCapture(e.pointerId);
  });
  rail.addEventListener("pointermove", e => {
    if (!down) return;
    rail.scrollLeft = startLeft - (e.pageX - startX);
  });
  ["pointerup", "pointercancel"].forEach(ev =>
    rail.addEventListener(ev, () => { down = false; })
  );

  /* 4. Reveal sections on scroll */
  const targets = document.querySelectorAll(
    ".hero-copy, .discover-copy, .steps, .fan, .why-title, .feature, .quote, .community-grid > *, .cta-copy"
  );
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      entry.target.classList.add("in");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  targets.forEach(el => io.observe(el));

  /* 5. Smooth in-page links */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});