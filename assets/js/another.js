GLOB.filterTabs = function () {
  const tabLinks = Array.from(document.querySelectorAll(".filter-tab-link"));
  const filterableItems = Array.from(
    document.querySelectorAll(".cq-filtering-item")
  );

  function filterItems(token = "*") {
    filterableItems.forEach(function (item) {
      if (token === "*") {
        item.style.display = "grid";
        return;
      }

      item.style.display = "none";

      if (item.classList.contains(token)) {
        item.style.display = "grid";
      }
    });
  }

  function toggleTabs(e) {
    e.preventDefault();

    const token = this.dataset.href || this.getAttribute("href");
    tabLinks.forEach(function (link) {
      link.classList.remove("active");
    });
    this.classList.add("active");

    filterItems(token);
  }

  tabLinks.forEach((link) => {
    link.addEventListener("click", toggleTabs);
  });
};

// social share buttons
GLOB.socialShrareButtons = function (id = null) {
  const elems = Array.from(document.querySelectorAll(id));

  if (!elems.length) return;

  var as_opt = {};
  as_opt.providers = {
    facebook: "Facebook",
    linkedin: "Linkedin",
    pinterest: "Pinterest",
    twitter: "Twitter",
  };
  as_opt.size = 20;
  as_opt.template = {
    corners: "50%",
    bgcolor: "#ffffff",
    interface: "inline",
    id: id,
  };

  new ass_SocialShare(as_opt);
};

// table content
GLOB.tableOfContent = function (selector = ".toc-link") {
  const elems = Array.from(document.querySelectorAll(selector));

  if (!elems.length) return;

  elems.forEach(function (el) {
    el.addEventListener("click", function () {
      elems.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
};

// meet slider
GLOB.meedSlider = function () {
  const container = document.getElementById("testimonialReviewSplide");
  const tabPanes = Array.from(
    document.querySelectorAll(
      ".sponsor-customer-wrapper .sponsor-customer-list"
    )
  );
  const links = Array.from(
    document.querySelectorAll(".sponsor-customer-wrapper .customer-link")
  );
  const linksDesktop = Array.from(
    document.querySelectorAll(".customer-list-lg .customer-link")
  );

  if (!container) return;

  const slider = new Splide(container, {
    type: "fade",
    drag: false,
    speed: 1200,
    gap: 30,
  });

  slider.mount();

  slider.on("moved", function (newIndex) {
    tabPanes.forEach(function (pane) {
      pane.classList.remove("active");
    });
    tabPanes[newIndex].classList.add("active");
  });

  slider.on("pagination:updated", function (data, prev, curr) {
    const videos = Array.from(document.querySelectorAll("video"));

    const y =
      curr.button.closest(".splide").getBoundingClientRect().top +
      window.scrollY;

    window.scroll({
      top: y - 150,
      behavior: "smooth",
    });

    videos.forEach(function (video) {
      if (!video.paused) {
        video.pause();
      }
    });
  });

  if (!links.length) return;

  function getSlideIndex(selector = null) {
    const elem = document.querySelector(selector);
    if (!elem) return 0;

    const slides = slider.Components.Slides;
    let slideIndex = 0;

    slides.forEach(function (el) {
      if (el.slide.querySelector(selector)) {
        slideIndex = el.index;
      }
    }, true);

    return slideIndex;
  }

  function customLinks(link, index) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.dataset.href || this.getAttribute("href");
      const elem = document.querySelector(id);
      const destIndex = getSlideIndex(id);
      const rect = elem.getBoundingClientRect();
      const postionTop = rect.top + window.scrollY;

      slider.go(destIndex);
      window.scrollTo(0, postionTop - 140);

      elem.classList.add("flash");
      setTimeout(() => {
        elem.classList.remove("flash");
      }, 1000);
    });
  }

  linksDesktop.forEach(customLinks);
  links.forEach(customLinks);
};

// sticky sidebar
GLOB.stickySidebar = function () {
  const sidebar = document.getElementById("tableOfContent");
  if (!sidebar) return;
  const sidebarHeight = sidebar.clientHeight;
  const footer = document.getElementById("footerMain");
  var footerOffsetTop = footer.offsetTop;

  window.addEventListener("scroll", function () {
    var $sidebar = document.getElementById("tableOfContent");
    var $header = document.getElementById("headerMain");
    var $sidebarHeight = $sidebar.clientHeight;
    var $footerOffsetTop = document.getElementById("footerMain").offsetTop;

    if (window.innerWidth < 992) return $sidebar.classList.remove("sticky");

    if (window.scrollY > $sidebar.offsetTop) {
      $sidebar.classList.add("sticky");
    } else {
      $sidebar.classList.remove("sticky");
    }
    if (window.scrollY + $sidebarHeight > $footerOffsetTop) {
      $sidebar.style.top =
        -(window.scrollY + $sidebarHeight - $footerOffsetTop) + "px";
    } else {
      $sidebar.style.top = $header.clientHeight + "px";
    }
  });
};

// video banner controls
GLOB.controlVideoBanner = function () {
  const videos = Array.from(
    document.querySelectorAll(".cq-team-video__banner video")
  );

  if (!videos.length) return;

  videos.forEach(function (video) {
    video.addEventListener("click", function () {
      const btn = this.closest(".cq-team-video__banner").querySelector(
        ".play__button"
      );

      if (video.paused) {
        btn.classList.add("clicked");
        video.play();
        return;
      }

      btn.classList.remove("clicked");
      video.pause();
    });
  });
};

// scroll padding
GLOB.scrollPadding = function () {
  const root = document.querySelector(":root");
  const header = document.getElementById("headerMain");

  window.addEventListener("scroll", function () {
    root.style.setProperty(
      "--scroll-padding-top",
      `${header.clientHeight + 10}px`
    );
  });
};

// document on load
document.addEventListener("DOMContentLoaded", function () {
  // cq heros slider
  GLOB.initSplide("#cqFeaturedHerosSplide", {
    type: "fade",
    rewind: true,
    pagination: false,
    autoplay: true,
    interval: 6000,
    drag: false,
    speed: 1200,
  });
  // cq meet team slider
  GLOB.initSplide("#cqMeetTeamSplide", {
    pagination: false,
    autoplay: true,
    interval: 6000,
    drag: false,
    speed: 1200,
    perPage: 4,
    perMove: 1,
    gap: 30,
    breakpoints: {
      1199: {
        gap: 20,
      },
      991: {
        perPage: 3,
      },
      767: {
        perPage: 2,
        drag: true,
      },
      575: {
        perPage: 1,
      },
    },
  });
  // cq meet team slider
  GLOB.meedSlider();
  GLOB.filterTabs();
  GLOB.socialShrareButtons(".ass_interface");
  GLOB.tableOfContent();
  GLOB.stickySidebar();
  GLOB.controlVideoBanner();
  GLOB.scrollPadding();
});
