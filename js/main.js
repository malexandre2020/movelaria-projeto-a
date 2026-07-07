(function () {
  "use strict";

  /* Ano no rodapé */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header muda de fundo ao rolar */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Filtros da galeria */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-item");

  function applyFilter(cat) {
    galleryItems.forEach(function (item) {
      var show = cat === "todos" || item.getAttribute("data-cat") === cat;
      item.hidden = !show;
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  /* Links dos cards de "Ambientes" ativam o filtro correspondente na galeria */
  document.querySelectorAll("[data-filter-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      var cat = link.getAttribute("data-filter-link");
      var targetBtn = document.querySelector('.filter-btn[data-filter="' + cat + '"]');
      if (targetBtn) {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        targetBtn.classList.add("is-active");
        applyFilter(cat);
      }
    });
  });

  /* Lightbox */
  var visibleItems = [];
  var currentIndex = 0;
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCap = document.getElementById("lightboxCap");

  function getVisibleItems() {
    return Array.prototype.filter.call(galleryItems, function (item) {
      return !item.hidden;
    });
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    var item = visibleItems[currentIndex];
    if (!item) return;
    var img = item.querySelector("img");
    var cap = item.querySelector(".cap");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = cap ? cap.textContent : "";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function stepLightbox(dir) {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  galleryItems.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      var vis = getVisibleItems();
      var visIndex = vis.indexOf(item);
      openLightbox(visIndex >= 0 ? visIndex : 0);
    });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () { stepLightbox(-1); });
  document.getElementById("lightboxNext").addEventListener("click", function () { stepLightbox(1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* Formulário de contato -> abre e-mail preenchido (site estático, sem backend) */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var ambiente = form.ambiente.value;
      var mensagem = form.mensagem.value.trim();

      var subject = "Orçamento — " + ambiente + " (site)";
      var body =
        "Nome: " + nome + "\n" +
        "Telefone/WhatsApp: " + telefone + "\n" +
        "Ambiente de interesse: " + ambiente + "\n\n" +
        "Mensagem:\n" + (mensagem || "-");

      var mailto =
        "mailto:movelariaprojetoa@hotmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }
})();
