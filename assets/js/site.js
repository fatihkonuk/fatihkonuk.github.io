/* Tema geçişi + kulvar şeridi süresi. Sayfa JS olmadan da eksiksiz çalışır. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : mq.matches;
  }
  function sync() {
    if (btn) btn.setAttribute("aria-pressed", String(isDark()));
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
  }
  if (mq.addEventListener) mq.addEventListener("change", sync);
  sync();

  // Şerit: 0 = Mayıs 2023. --span = bugünün ayı dahil toplam ay sayısı.
  var lanes = document.querySelector(".lanes");
  if (lanes) {
    var d = new Date();
    var span = (d.getFullYear() - 2023) * 12 + d.getMonth() - 4 + 1;
    if (span > 36) {
      lanes.style.setProperty("--span", span);
      var scale = lanes.querySelector(".scale");
      // Yeni yıllar için eksik yıl çizgilerini ekle
      for (var y = 2027, m = 44; m < span; y++, m += 12) {
        if (!scale || scale.querySelector('[data-y="' + y + '"]')) continue;
        var s = document.createElement("span");
        s.className = "yr";
        s.style.setProperty("--m", m);
        s.setAttribute("data-y", y);
        s.setAttribute("data-ys", "’" + String(y).slice(2));
        scale.appendChild(s);
      }
    }
  }

  // Scroll reveal: her öğe bir kez canlanır. Gizli durumlar yalnızca CSS'te
  // html.js + prefers-reduced-motion: no-preference altında tanımlı.
  clearTimeout(window.__rvT);
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  each(".job", function (job) {
    Array.prototype.forEach.call(job.querySelectorAll(".tags li"), function (li, i) {
      li.style.setProperty("--ti", i);
    });
  });
  each(".skills > div", function (d, i) { d.style.setProperty("--si", i); });

  var targets = document.querySelectorAll(".lanes, .job, .feat, .cp, .skills");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var k = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var c = e.target.classList;
        if (c.contains("job") || c.contains("cp")) e.target.style.setProperty("--d", k++ * 90 + "ms");
        else if (c.contains("feat")) e.target.style.setProperty("--d", k++ * 120 + "ms");
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
  }

  // İletişim formu: JS varken fetch + JSON; yoksa normal POST (redirect → #sent).
  var form = document.querySelector(".form");
  if (form && window.fetch && window.FormData) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector('button[type="submit"]');
    var fields = form.querySelectorAll("input[required], textarea[required]");
    form.noValidate = true;

    var setStatus = function (state, text, withMail) {
      status.setAttribute("data-state", state);
      status.textContent = "";
      var span = document.createElement("span");
      if (withMail) {
        var parts = text.split("{mail}");
        var a = document.createElement("a");
        a.href = "mailto:fatihkonuk000@gmail.com";
        a.textContent = "fatihkonuk000@gmail.com";
        span.appendChild(document.createTextNode(parts[0]));
        span.appendChild(a);
        span.appendChild(document.createTextNode(parts[1] || ""));
      } else {
        span.textContent = text;
      }
      status.appendChild(span);
    };
    var isValid = function (f) { return f.value.trim() !== "" && f.checkValidity(); };
    var mark = function (f, bad) {
      var err = document.getElementById(f.id + "-err");
      if (bad) {
        f.setAttribute("aria-invalid", "true");
        f.setAttribute("aria-describedby", err.id);
        err.textContent = f.getAttribute("data-error");
        err.hidden = false;
      } else {
        f.removeAttribute("aria-invalid");
        f.removeAttribute("aria-describedby");
        err.textContent = "";
        err.hidden = true;
      }
    };
    Array.prototype.forEach.call(fields, function (f) {
      f.addEventListener("input", function () {
        if (f.hasAttribute("aria-invalid")) mark(f, !isValid(f));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = null;
      Array.prototype.forEach.call(fields, function (f) {
        var ok = isValid(f);
        mark(f, !ok);
        if (!ok && !first) first = f;
      });
      if (first) { first.focus(); return; }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      delete data.redirect; // yalnızca JS'siz gönderim için

      submit.disabled = true;
      setStatus("pending", form.getAttribute("data-sending"));
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            if (!r.ok || !j.success) throw new Error(j.message || r.status);
          });
        })
        .then(function () {
          form.reset();
          setStatus("ok", form.getAttribute("data-ok"));
        })
        .catch(function () {
          setStatus("error", form.getAttribute("data-fail"), true);
        })
        .then(function () { submit.disabled = false; });
    });
  }
})();
