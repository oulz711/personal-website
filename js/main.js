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

// 技能标签随机颜色
(function () {
  var hues = ["#4a90d9", "#5b9bd5", "#3b82c4", "#6da8e0", "#4080c8"];
  var tags = document.querySelectorAll(".skill-tag");
  tags.forEach(function (tag, i) {
    var color = hues[i % hues.length];
    tag.style.borderColor = color;
    tag.addEventListener("mouseenter", function () {
      if (!tag.classList.contains("active")) {
        tag.style.background = color;
        tag.style.color = "#fff";
        tag.style.borderColor = color;
      }
    });
    tag.addEventListener("mouseleave", function () {
      if (!tag.classList.contains("active")) {
        tag.style.background = "";
        tag.style.color = "";
        tag.style.borderColor = color;
      }
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

// === 展开功能 ===

// 关于我 - 展开更多
(function () {
  var btn = document.querySelector(".expand-btn");
  var more = document.querySelector(".about-more");
  var arrow = document.querySelector(".expand-arrow");
  if (!btn || !more) return;

  btn.addEventListener("click", function () {
    var expanded = more.classList.toggle("expanded");
    arrow.classList.toggle("rotated");
    btn.querySelector("span:first-child").textContent = expanded ? "收起" : "展开更多";
  });
})();

// 技能 - 点击标签显示详情
(function () {
  var tags = document.querySelectorAll(".skill-tag");
  var detailBox = document.getElementById("skill-detail");
  if (!detailBox) return;

  tags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      var alreadyActive = tag.classList.contains("active");
      var detail = tag.getAttribute("data-detail");

      // 取消所有激活
      tags.forEach(function (t) { t.classList.remove("active"); });
      detailBox.classList.remove("visible");

      if (!alreadyActive) {
        tag.classList.add("active");
        detailBox.textContent = detail;
        // 触发重排后显示
        void detailBox.offsetWidth;
        detailBox.classList.add("visible");
      }
    });
  });
})();

// 爱好 - 点击卡片显示详情
(function () {
  var cards = document.querySelectorAll(".hobby-card");

  cards.forEach(function (card) {
    // 创建详情元素
    var detailDiv = document.createElement("div");
    detailDiv.className = "hobby-detail";
    detailDiv.textContent = card.getAttribute("data-detail");
    card.appendChild(detailDiv);

    card.addEventListener("click", function () {
      var wasExpanded = card.classList.contains("expanded");
      var hint = card.querySelector(".hobby-hint");

      // 收起所有卡片
      cards.forEach(function (c) {
        c.classList.remove("expanded");
        c.querySelector(".hobby-detail").classList.remove("expanded");
        var h = c.querySelector(".hobby-hint");
        if (h) h.textContent = "点击查看详情";
      });

      if (!wasExpanded) {
        card.classList.add("expanded");
        detailDiv.classList.add("expanded");
        if (hint) hint.textContent = "点击收起";
      }
    });
  });
})();
