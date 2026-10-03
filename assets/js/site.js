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
})();
