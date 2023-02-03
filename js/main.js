$(document).ready(function() {
     $('form').submit(false);
     /* Project Section
     ==============================================*/
     const project_list = new Project().getList();
     for (const project of project_list) {
          $(".projects-info .swiper.mySwiper .swiper-wrapper").append(`
               <div class="swiper-slide">
                    <div class="project-box">
                         <div class="project-name">
                              <h3>${project.name}</h3>
                         </div>
                         <div class="project-image">
                              <img name="${project.name}" src="${project.img}">
                         </div>
                    </div>
               </div>
          `);
     }
     var _slidesPerView, _centeredSlides;
    
     if ($(window).width() > 1000) {
          _slidesPerView = 3;
          _centeredSlides = true;
     }
     if ($(window).width() <= 1000) {
          _slidesPerView = 2;
          _centeredSlides = false;
     }
     if ($(window).width() <= 500) {
          _slidesPerView = 1;
          _centeredSlides = true;
     }
     
     var swiper = new Swiper(".mySwiper", {
          slidesPerView: _slidesPerView,
          spaceBetween: 30,
          loop: true,
          centeredSlides: _centeredSlides,
          pagination: {
          el: ".swiper-pagination",
          clickable: true,
          },
          navigation: {
          nextEl: ".swiper-next-button",
          prevEl: ".swiper-prev-button",
          },
     });
     /*===================================================*/

     const ability_list = new Ability().getList();
     for (const ability of ability_list) {
          $(".abilities-info .bot").append(`
               <div class="ability-bar">
                    <div class="name">${ability.name}</div>
                    <div class="bar">
                         <div class="bar-value" style="width:${ability.value}%">%${ability.value}</div>
                    </div>
               </div>
          `);
     }

     if (!$(".side-menu").hasClass(".active")) {
          $(".content .menu-btn").removeClass("enabled");
     }
     $(".content .menu-btn").click(function() {
          $(".side-menu.active").css("left","0");
          $(this).removeClass("enabled");
     })
     $(".side-menu .close-btn, .content .section").click(function() {
          if($(window).width() <= 768) {
               $(".side-menu.active").css("left","-100%");
               $(".content .menu-btn").addClass("enabled");
          }
     })
     $(window).resize(function() {
          if ($(window).width() > 768) {
               $(".side-menu.active").css("left","0");
          }
     })

     $(".side-menu .menu .menu-item").click(function() {
          const section_name = $(this).attr("data-section-name");
          let section_list = $(".content .section");
          for (const section of section_list) {
               section.classList.remove("active");
               if (section.getAttribute("class").includes(section_name)) {
                    section.classList.add("active");
               }
          }
          $(".side-menu").addClass("active");
          $(".content .menu-btn").addClass("enabled");
          $(".side-menu .menu .menu-item.isactive").removeClass("isactive");
          $(this).addClass("isactive");
     })

     $(".projects-info .project-box").click(function() {
          const src = $("img",this).attr("src");
          $(".project-viewer").addClass("active");
          $(".project-viewer .image-box img").attr("src", src);
     })
     $(".project-viewer .background-filter, .project-viewer .close-btn").click(function() {
          $(".project-viewer").removeClass("active");
     })
})