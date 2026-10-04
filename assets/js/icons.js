/* Teknoloji etiketi ikonları (site.js etiketler görünüme yaklaşınca yükler).
   İkonlar: Simple Icons, CC0 1.0 (https://simpleicons.org). Markalar sahiplerine aittir.
   Değer: "slug açık-tema-rengi koyu-tema-rengi" (renkler zeminle en az 3:1). */
(function () {
  var M = {".NET":"dotnet 512bd4 7455dd","axios":"axios 5a29e4 7349e8","C/C++":"c 7e8b99 a8b9cc","Claude Code":"claude ce7153 d97757","CSS":"css 663399 855cad","Docker":"docker 228fe1 2496ed","EJS":"ejs 7e8d47 b4ca65","Elasticsearch":"elasticsearch 005571 33778d","ESP8266":"espressif e7352c e7352c","Express":"express 0a0a0a ececea","FastAPI":"fastapi 009688 009688","Fastify":"fastify 000000 ececea","GitHub Actions":"githubactions 2088ff 2088ff","HTML":"html5 e34f26 e34f26","JavaScript":"javascript 948612 f7df1e","Jira":"jira 0052cc 1a63d1","JWT":"jsonwebtokens 000000 ececea","MongoDB":"mongodb 439a44 47a248","MySQL":"mysql 4479a1 4479a1","NestJS":"nestjs e0234e e0234e","Next.js":"nextdotjs 000000 ececea","Node.js":"nodedotjs 5a984a 5fa04e","Nuxt.js":"nuxt 009a5b 00dc82","OpenLayers":"openlayers 1f6b75 2a727c","PHP":"php 777bb4 777bb4","Pinia":"pinia 998235 ffd859","PlatformIO":"platformio d06f24 f5822a","PostgreSQL":"postgresql 4169e1 4169e1","Python":"python 3776ab 3776ab","RabbitMQ":"rabbitmq e65c00 ff6600","React":"react 087ea4 61dafb","Redis":"redis ff4438 ff4438","STM32":"stmicroelectronics 03234b ececea","TypeScript":"typescript 3178c6 3178c6","Vue.js":"vuedotjs 3f9a71 4fc08d","Vuetify":"vuetify 1867c0 1867c0"};
  var U = "/assets/img/icons.svg#i-";
  var NS = "http://www.w3.org/2000/svg";
  Array.prototype.forEach.call(document.querySelectorAll(".tags li"), function (li) {
    var v = M[li.textContent.trim()];
    if (!v || li.firstElementChild) return;
    v = v.split(" ");
    var svg = document.createElementNS(NS, "svg"), use = document.createElementNS(NS, "use");
    svg.setAttribute("class", "ti");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    use.setAttribute("href", U + v[0]);
    svg.appendChild(use);
    li.insertBefore(svg, li.firstChild);
    li.style.setProperty("--bl", "#" + v[1]);
    li.style.setProperty("--bd", "#" + v[2]);
  });
  // Dokunmatik: etikete dokununca ikon kısa süre marka rengini alır
  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "touch" || !e.target.closest) return;
    var li = e.target.closest(".tags li");
    if (!li) return;
    li.classList.add("tap");
    setTimeout(function () { li.classList.remove("tap"); }, 1200);
  }, { passive: true });
})();
