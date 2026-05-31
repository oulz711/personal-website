// === SPA 路由 ===
(function () {
  var views = document.querySelectorAll(".view");
  var navLinks = document.getElementById("nav-links");
  var navLogo = document.querySelector(".nav-logo");

  // 切换视图
  function showView(name) {
    // 切换视图显示
    views.forEach(function (v) {
      v.classList.remove("active");
    });
    var target = document.getElementById("view-" + name);
    if (target) {
      target.classList.add("active");
      window.scrollTo(0, 0);
    }

    // 更新导航栏
    if (name === "home") {
      navLinks.innerHTML =
        '<li><a href="#about">关于</a></li>' +
        '<li><a href="#skills">技能</a></li>' +
        '<li><a href="#hobbies">爱好</a></li>' +
        '<li><a href="#contact">联系</a></li>';
      navLogo.textContent = "钊";
      navLogo.setAttribute("href", "#home");
    } else {
      navLinks.innerHTML = '<li><a href="#home">← 返回首页</a></li>';
      navLogo.textContent = "← 返回";
      navLogo.setAttribute("href", "#home");
    }

    // 重新触发滚动动画
    document.querySelectorAll(".fade-in").forEach(function (el) {
      el.classList.remove("visible");
    });
    setTimeout(function () {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll("#view-" + name + " .fade-in").forEach(function (el) {
        observer.observe(el);
      });
    }, 50);
  }

  // 路由变化时
  function onHashChange() {
    var hash = window.location.hash.replace("#", "") || "home";
    showView(hash);
  }

  window.addEventListener("hashchange", onHashChange);

  // 点击 [data-spa] 元素跳转
  document.body.addEventListener("click", function (e) {
    var el = e.target.closest("[data-spa]");
    if (el) {
      e.preventDefault();
      var target = el.getAttribute("data-spa");
      window.location.hash = target;
    }
  });

  // 首页导航链接滚动（委托）
  navLinks.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;

    // 如果是返回首页
    if (href === "#home") {
      window.location.hash = "home";
      return;
    }

    // 首页内锚点滚动
    e.preventDefault();
    if (window.location.hash !== "") {
      window.location.hash = "home";
      setTimeout(function () {
        scrollToSection(href.substring(1));
      }, 100);
    } else {
      scrollToSection(href.substring(1));
    }
  });

  function scrollToSection(id) {
    var target = document.getElementById(id);
    if (target) {
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  // 初始加载
  onHashChange();
})();

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
