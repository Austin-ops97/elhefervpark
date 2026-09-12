(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var label = toggle.querySelector(".nav-toggle-text");
    if (label) {
      label.textContent = open ? "Close" : "Menu";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function showStatus(el, message, type) {
    el.hidden = false;
    el.className = "form-status " + type;
    el.textContent = message;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  var updatesForm = document.getElementById("updates-form");
  var updatesStatus = document.getElementById("updates-status");

  if (updatesForm) {
    updatesForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = document.getElementById("updates-email").value.trim();

      if (!isValidEmail(email)) {
        showStatus(updatesStatus, "Please enter a valid email address.", "error");
        return;
      }

      updatesForm.hidden = true;
      showStatus(
        updatesStatus,
        "Thanks — we’ll let you know when there’s news to share.",
        "success"
      );
    });
  }

  var contactForm = document.getElementById("contact-form");
  var contactStatus = document.getElementById("contact-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("contact-name").value.trim();
      var email = document.getElementById("contact-email").value.trim();
      var message = document.getElementById("contact-message").value.trim();

      if (!name || !isValidEmail(email) || !message) {
        showStatus(
          contactStatus,
          "Please fill in your name, a valid email, and a message.",
          "error"
        );
        return;
      }

      contactForm.reset();
      showStatus(
        contactStatus,
        "Thanks for the message. We’ll get back to you as soon as we can.",
        "success"
      );
    });
  }

  if (header) {
    header.addEventListener("click", function (event) {
      if (event.target === header) {
        setMenu(false);
      }
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
