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
        padding: { right: "25vw" },
      },
    },
  });
  // cq meet team slider
  GLOB.initSplide("#testimonialReviewSplide", {
    drag: false,
    speed: 1200,
    gap: 30,
  });
  GLOB.filterTabs();
  GLOB.socialShrareButtons(".ass_interface");
  GLOB.tableOfContent();
});
