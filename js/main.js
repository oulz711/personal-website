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
