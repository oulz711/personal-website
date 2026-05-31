// 滚动渐入动画
(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  var targets = document.querySelectorAll(
    ".section-title, .about-content p, .skill-tag, .hobby-card, .contact-link, .hero-name, .hero-tagline, .hero-bio, .hero-avatar"
  );

  targets.forEach(function (el) {
    el.classList.add("fade-in");
    observer.observe(el);
  });
})();

// 技能标签随机颜色 hover
(function () {
  var hues = ["#4a90d9", "#5b9bd5", "#3b82c4", "#6da8e0", "#4080c8"];
  var tags = document.querySelectorAll(".skill-tag");
  tags.forEach(function (tag, i) {
    var color = hues[i % hues.length];
    tag.style.borderColor = color;
    tag.addEventListener("mouseenter", function () {
      tag.style.background = color;
      tag.style.color = "#fff";
      tag.style.borderColor = color;
    });
    tag.addEventListener("mouseleave", function () {
      tag.style.background = "";
      tag.style.color = "";
      tag.style.borderColor = color;
    });
  });
})();

// 导航栏阴影
(function () {
  var navbar = document.querySelector(".navbar");
  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 10) {
          navbar.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
        } else {
          navbar.style.boxShadow = "";
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// === 弹窗逻辑 ===
(function () {
  var overlay = document.getElementById("modal-overlay");
  var titleEl = overlay.querySelector(".modal-title");
  var detailEl = overlay.querySelector(".modal-detail");
  var closeBtn = overlay.querySelector(".modal-close");

  function openModal(title, detail) {
    titleEl.textContent = title;
    detailEl.innerHTML = detail;
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  // 关闭按钮
  closeBtn.addEventListener("click", closeModal);

  // 点击遮罩关闭
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // ESC 关闭
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("visible")) {
      closeModal();
    }
  });

  // 关于我
  var aboutEl = document.querySelector(".about-content.clickable");
  if (aboutEl) {
    aboutEl.addEventListener("click", function () {
      openModal(
        aboutEl.getAttribute("data-modal-title"),
        aboutEl.getAttribute("data-modal-detail")
      );
    });
  }

  // 技能标签
  var skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach(function (tag) {
    tag.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal(
        tag.getAttribute("data-modal-title"),
        tag.getAttribute("data-modal-detail")
      );
    });
  });

  // 爱好卡片
  var hobbyCards = document.querySelectorAll(".hobby-card");
  hobbyCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(
        card.getAttribute("data-modal-title"),
        card.getAttribute("data-modal-detail")
      );
    });
  });
})();
