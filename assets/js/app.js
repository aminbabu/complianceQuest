// global object
const GLOB = {};

// data storage
GLOB.storage = {
  metrics: [
    {
      sige: "-",
      value: 80,
      text: "Infra Management",
    },
    {
      sige: "-",
      value: 80,
      text: "CAPA raised per Year",
    },
    {
      sige: "-",
      value: 48,
      text: "CAPA raised per Year",
    },
    {
      sige: "-",
      value: 50,
      text: "Change Request",
    },
    {
      sige: "-",
      value: 24,
      text: "Cost of Labor",
    },
    {
      sige: "+",
      value: 54,
      text: "Employee Engagement",
    },
    {
      sige: "-",
      value: 32,
      text: "Customer Compliant",
    },
    {
      sige: "-",
      value: 70,
      text: "Employee Training",
    },
    {
      sige: "-",
      value: 46,
      text: "Audit Finding",
    },
    {
      sige: "+",
      value: 37,
      text: "Customer Satisfaction",
    },
  ],
};

// toggle menu
GLOB.toggleMenu = function () {
  const toggler = document.getElementById("navbarMenuBtn");
  const navbarMenu = document.getElementById("navbarMainSm");
  const body = document.body;

  if (!(toggler || navbarMenu)) return;

  function toggleState() {
    toggler.classList.toggle("active");
    navbarMenu.classList.toggle("show");

    if (navbarMenu.classList.contains("show")) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }

  toggler.addEventListener("click", toggleState);

  window.onresize = function () {
    const screen = window.innerWidth;

    if (screen > 991) {
      body.classList.remove("overflow-hidden");
      navbarMenu.classList.remove("show");
      toggler.classList.remove("active");
    }
  };
};

// sticky header
GLOB.stickyHeader = function () {
  const header = document.getElementById("headerMain");
  const headerOffset = header.offsetTop;

  if (!header) return;

  window.onscroll = function () {
    const scrollPos = window.scrollY;

    if (scrollPos > headerOffset) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
};

// dropdown menu
GLOB.dropdownMenu = function () {
  const togglers = Array.from(document.querySelectorAll(".dropdown-toggle"));
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));

  function toggleMenu() {
    const dropdown = this.closest(".dropdown");

    if (!dropdown.classList.contains("active")) {
      dropdowns.forEach(function (el) {
        el.classList.remove("active");
      });
      dropdown.classList.add("active");
    } else {
      dropdown.classList.remove("active");
    }
  }

  function hideMenu(e) {
    const target = e.target;

    if (!target.closest(".dropdown-toggle")) {
      dropdowns.forEach(function (el) {
        el.classList.remove("active");
      });
    }
  }

  togglers.forEach(function (toggler) {
    toggler.addEventListener("click", toggleMenu);
  });
  document.addEventListener("click", hideMenu);
};

// unmount top notification bar
GLOB.unmountNotification = function () {
  const notification = document.getElementById("topNotificationBar");
  const btn = document.querySelector(".top-notification-bar .close-btn");

  if (!btn || !notification) return;

  btn.onclick = function () {
    notification.remove();
  };
};

// initialize splide
GLOB.initSplide = function (selector, options = {}, ext = false) {
  const container = document.querySelector(selector);

  if (typeof Splide === "undefined" || typeof Splide === null || !container)
    return;

  const splide = new Splide(container, options);

  // slider mount into dom
  if (ext) return splide.mount(window.splide.Extensions);
  splide.mount();
};

// initialize thumb splide
GLOB.initThumbSplide = function (
  selector,
  thumbSelector,
  options = {},
  thumbOptions = {}
) {
  const parent = document.querySelector(selector);
  const child = document.querySelector(thumbSelector);

  if (
    typeof Splide === "undefined" ||
    typeof Splide === null ||
    !parent ||
    !child
  )
    return;

  const splide = new Splide(parent, options);
  const thumbnails = new Splide(child, thumbOptions);

  splide.sync(thumbnails);
  splide.mount();
  thumbnails.mount();
};

// toggle search box
GLOB.toggleSearchBox = function () {
  const searchBtn = document.getElementById("searchBtn");
  const headerSearchBox = document.getElementById("headerSearchBox");

  window.addEventListener("click", function (e) {
    const isActive =
      e.target.closest("#searchBtn") || e.target.closest("#headerSearchBox");

    if (!isActive) {
      headerSearchBox.classList.remove("show");
      return;
    }
    headerSearchBox.classList.add("show");
  });
};

// accordion
GLOB.initAccordion = function () {
  const togglers = Array.from(
    document.getElementsByClassName("accordion__item-header")
  );
  const accordions = Array.from(
    document.getElementsByClassName("accordion__item")
  );

  if (!togglers.length) return;

  // collapse all accordion
  function resetAccordion() {
    accordions.forEach(function (accordion) {
      const body = accordion.querySelector(".accordion__item-body");
      accordion.classList.remove("show");
      body.style.maxHeight = null;
    });
  }

  // toggle accordion on click
  function toggleAccordion(toggle) {
    toggle.addEventListener("click", function () {
      const accordion = this.closest(".accordion__item");
      const body = accordion.querySelector(".accordion__item-body");

      if (!accordion.classList.contains("show")) {
        resetAccordion();
        accordion.classList.add("show");
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        accordion.classList.remove("show");
        body.style.maxHeight = null;
      }
    });
  }

  // accordion initialization
  function initializeAccordion(accordion) {
    const body = accordion.querySelector(".accordion__item-body");

    if (accordion.classList.contains("show")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = null;
    }
  }

  // toggle accordion on click
  togglers.forEach(toggleAccordion);
  // initialize accordion
  accordions.forEach(initializeAccordion);
};

// type writer
GLOB.createTypeWriter = function () {
  // get the element
  const textFields = Array.from(document.querySelectorAll(".typing-text"));

  if (!textFields.length) return;

  // make a words array
  const words = ["Quality", "Operations", "Innovation", "Compliance"];

  textFields.forEach(function (text) {
    // start typing effect
    setTyper(text, words);
  });

  function setTyper(element, words) {
    const LETTER_TYPE_DELAY = 75;
    const WORD_STAY_DELAY = 2000;

    const DIRECTION_FORWARDS = 0;
    const DIRECTION_BACKWARDS = 1;

    var direction = DIRECTION_FORWARDS;
    var wordIndex = 0;
    var letterIndex = 0;

    var wordTypeInterval;

    startTyping();

    function startTyping() {
      wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
    }

    function typeLetter() {
      const word = words[wordIndex];

      if (direction == DIRECTION_FORWARDS) {
        letterIndex++;

        if (letterIndex == word.length) {
          direction = DIRECTION_BACKWARDS;
          clearInterval(wordTypeInterval);
          setTimeout(startTyping, WORD_STAY_DELAY);
        }
      } else if (direction == DIRECTION_BACKWARDS) {
        letterIndex--;

        if (letterIndex == 0) {
          nextWord();
        }
      }

      const textToType = word.substring(0, letterIndex);

      element.textContent = textToType;
    }

    function nextWord() {
      letterIndex = 0;
      direction = DIRECTION_FORWARDS;
      wordIndex++;

      if (wordIndex == words.length) {
        wordIndex = 0;
      }
    }
  }
};

// modal
GLOB.initModal = function () {
  const triggers = Array.from(document.querySelectorAll("[data-modal-target]"));
  const closeButtons = Array.from(document.querySelectorAll(".close-modal"));

  if (!triggers.length) return;

  function triggerModal(e) {
    e.preventDefault();

    const modalID =
      this.dataset.modalTarget || this.getAttribute("data-modal-target");
    const modal = document.getElementById(modalID);
    const modalSrc =
      this.dataset.modalMediaSrc || this.getAttribute("modal-media-src");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    if (!modalSrc) return;
    const target = modal.querySelector(".target");
    target.src = modalSrc;
  }

  function closeModal() {
    const modal = this.closest(".modal");
    const target = modal.querySelector(".target");

    if (target) target.src = "";

    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", triggerModal);
  });
  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
};

// tabs
GLOB.inittabs = function () {
  const navs = Array.from(document.querySelectorAll(".navbar-menu__item"));
  const megaNavs = Array.from(document.querySelectorAll(".mega-menu__item"));
  const links = Array.from(
    document.querySelectorAll(".navbar-menu__item-link")
  );

  if (!megaNavs.length) return;

  function handleEvent(elem) {
    const id = elem.getAttribute("href") || elem.dataset.href;
    const panes = elem
      .closest(".mega-menu")
      .querySelectorAll(".mega-menu-tab-pane");
    const megaNavs = elem
      .closest(".mega-menu")
      .querySelectorAll(".mega-menu__item");
    const activePane = document.querySelector(id);

    panes.forEach(function (pane) {
      pane.classList.remove("show");
    });
    megaNavs.forEach(function (nav) {
      nav.classList.remove("active");
    });
    activePane.classList.add("show");
    elem.classList.add("active");
  }

  function handleTab(nav) {
    nav.addEventListener("click", function (e) {
      e.preventDefault();
      const elem = e.target;
      handleEvent(elem);
    });
    nav.addEventListener("mouseover", function (e) {
      e.preventDefault();
      const elem = e.target;
      handleEvent(elem);
    });
  }

  function handleClick(link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const nav = this.closest(".navbar-menu__item");

      if (nav.classList.contains("active")) {
        navs.forEach(function (nav) {
          nav.classList.remove("active");
        });
      } else {
        nav.classList.add("active");
      }
    });
  }

  megaNavs.forEach(handleTab);
  links.forEach(handleClick);
};

// extend backdrop dynamic height
GLOB.extentHeight = function () {
  const backdropElems = Array.from(
    document.querySelectorAll(".support__item .backdrop-content")
  );
  const charLimit = 145;

  backdropElems.forEach(function (backdrop) {
    const content = backdrop.textContent.trim();

    if (content.length >= charLimit)
      backdrop.style.minHeight = `calc(200% + 2.1rem)`;

    if (content.length >= charLimit * 2)
      backdrop.style.minHeight = `calc(300% + 2.1rem)`;
  });
};

// circular progress bar
GLOB.initProgressBar = function (sign) {
  // Get all the Meters
  const meters = document.querySelectorAll("svg[data-value] .meter");

  if (!meters.length) return;

  meters.forEach((path) => {
    // Get the length of the path
    let length = path.getTotalLength();
    // Get the value of the meter
    let value = parseInt(path.parentNode.getAttribute("data-value"));
    // Calculate the percentage of the total length
    let to = length * ((100 - value) / 100);
    // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
    path.getBoundingClientRect();
    // Set the Offset
    path.style.strokeDashoffset = Math.max(0, to);
    path.nextElementSibling.textContent = `${sign}${value}%`;
  });
};

// toggle collapse
GLOB.collapseToggler = function () {
  const triggers = Array.from(
    document.querySelectorAll("[data-collapse-target]")
  );
  const collapsableElems = Array.from(
    document.querySelectorAll(".collapsable-elem")
  );

  function toggler(trigger) {
    trigger.addEventListener("click", function () {
      const id = this.dataset.collapseTarget;
      const target = document.getElementById(id);

      if (!target.classList.contains("show")) {
        collapsableElems.forEach(function (el) {
          el.classList.remove("show");
        });
        target.classList.add("show");
      } else {
        target.classList.remove("show");
      }
    });
  }

  triggers.forEach(toggler);
};

// infinite stats changer
GLOB.initStatsChanger = function () {
  const data = [...GLOB.storage.metrics];
  const barItems = Array.from(
    document.getElementsByClassName("circular-progress")
  );

  const dataLen = data.length;
  const interval = 6000;
  let index = 0;

  function changeContent(svg, text, index) {
    svg.dataset.value = data[index].value;
    text.innerHTML = data[index].text;

    GLOB.initProgressBar(data[index].sige);
  }

  setInterval(() => {
    if (index >= dataLen - 1) index = 0;

    barItems.forEach(function (elem, i) {
      const svg = elem.querySelector("svg");
      const text = elem.querySelector(".text");

      changeContent(svg, text, index + (i % 2));
    });

    index += index + 1;
  }, interval);

  // setInterval(() => {
  //   if (index >= dataLen - 1) index = 0;

  //   containers.forEach(function (container) {

  //     changeContent(progressItems);
  //   });

  //   // element.querySelector("svg").dataset.value = data[index + i].value;
  //   // element.querySelector(".text").innerHtml = data[index + i].text;

  //   // GLOB.initProgressBar(data[index + i].sige);

  //   index = index + 1;
  // }, interval);
};

// document on load
document.addEventListener("DOMContentLoaded", function () {
  // infinite stats changer
  GLOB.initStatsChanger();
  // toggle collapse
  GLOB.collapseToggler();
  // progressive circular animation
  GLOB.initProgressBar("-");
  // toggle menu
  GLOB.toggleMenu();
  // sticky header
  GLOB.stickyHeader();
  // toggle search box
  GLOB.toggleSearchBox();
  // dropdown menu
  GLOB.dropdownMenu();
  // close notification
  GLOB.unmountNotification();
  // initialize modal
  GLOB.initModal();
  // solutions slider
  GLOB.initThumbSplide(
    "#browseSolutionsSplide",
    "#browseSolutionsThumbSplide",
    {
      type: "fade",
      rewind: true,
      autoplay: true,
      interval: 6000,
      speed: 1200,
      pagination: false,
      arrows: false,
      drag: false,
      breakpoints: {
        1199: {
          arrows: true,
        },
      },
    },
    {
      autoplay: true,
      interval: 6000,
      pagination: false,
      arrows: false,
      fixedWidth: 136,
      rewind: true,
      focus: "center",
      isNavigation: true,
      padding: { left: "4rem", right: "4rem" },
      drag: false,
      breakpoints: {
        1199: {
          fixedWidth: 136,
        },
        991: {
          fixedWidth: 146,
        },
        767: {
          fixedWidth: 180,
        },
        575: {
          fixedWidth: 200,
        },
      },
    }
  );
  // clients slider
  GLOB.initSplide("#ourClientsSplide", {
    type: "loop",
    autoplay: true,
    pagination: false,
    arrows: false,
    perPage: 6,
    perMove: 1,
    gap: 46,
    breakpoints: {
      1199: {
        perPage: 5,
        arrows: true,
      },
      991: {
        perPage: 4,
      },
      767: {
        perPage: 3,
      },
      575: {
        perPage: 2,
      },
    },
  });
  // quality management slider
  GLOB.initSplide("#qualityManagementSplide", {
    type: "loop",
    pagination: false,
    autoplay: true,
    interval: 6000,
    drag: false,
  });
  // client testimonial slider
  GLOB.initSplide("#clientTestimonialSplide1", {
    type: "loop",
    pagination: false,
    arrows: false,
    direction: "ttb",
    height: 810,
    gap: 24,
    autoHeight: true,
    autoplay: true,
    interval: 2000,
    speed: 1000,
    breakpoints: {
      575: {
        height: 672,
      },
    },
  });
  GLOB.initSplide("#clientTestimonialSplide2", {
    type: "loop",
    pagination: false,
    arrows: false,
    direction: "ttb",
    gap: 24,
    height: 810,
    autoHeight: true,
    autoplay: true,
    interval: 2000,
    speed: 1200,
    breakpoints: {
      575: {
        height: 672,
      },
    },
  });
  // cq heros slider
  GLOB.initSplide("#cqHerosSplide", {
    type: "fade",
    rewind: true,
    pagination: false,
    autoplay: true,
    interval: 6000,
    drag: false,
    speed: 1200,
  });
  // type writer
  GLOB.createTypeWriter();
  // tabs initialization
  GLOB.inittabs();

  /*****************************************
   * Doc Management Page
   *****************************************/
  // boost productivity slider
  GLOB.initSplide("#boostProductivitySplide", {
    pagination: false,
    arrows: false,
    breakpoints: {
      991: {
        arrows: true,
      },
    },
  });
  GLOB.initSplide("#sayAboutUsSplide", {
    type: "fade",
    rewind: true,
    pagination: false,
    arrows: false,
    autoplay: true,
    breakpoints: {
      767: {
        arrows: true,
      },
    },
  });
  GLOB.extentHeight();

  /*****************************************
   * Home 2
   *****************************************/
  // trusted world clients slider
  GLOB.initSplide("#trustedWorldSplide1", {
    type: "loop",
    pagination: false,
    arrows: false,
    direction: "ttb",
    height: 810,
    gap: 24,
    autoHeight: true,
    autoplay: true,
    interval: 2000,
    speed: 1000,
    breakpoints: {
      575: {
        height: 672,
      },
    },
  });
  GLOB.initSplide("#trustedWorldSplide2", {
    type: "loop",
    pagination: false,
    arrows: false,
    direction: "ttb",
    gap: 24,
    height: 810,
    autoHeight: true,
    autoplay: true,
    interval: 2000,
    speed: 1200,
    breakpoints: {
      575: {
        height: 672,
      },
    },
  });
  /*****************************************
   * Compliance EHS Page
   *****************************************/
  GLOB.initAccordion();

  /*****************************************
   * Compliance Products Page
   *****************************************/
  // related assets slider
  GLOB.initSplide("#relatedAssetsSplide", {
    drag: false,
    pagination: false,
    arrows: false,
    perPage: 3,
    perMove: 1,
    gap: 32,
    breakpoints: {
      1199: {
        perPage: 2,
        arrows: true,
      },
      575: {
        perPage: 1,
      },
    },
  });
  // benefit slider
  GLOB.initSplide("#benefitListSplide", {
    pagination: false,
    gap: 20,
    padding: 10,
    perPage: 3,
    perMove: 1,
    breakpoints: {
      767: {
        perPage: 2,
      },
      575: {
        perPage: 1,
      },
    },
  });
  // cq features slider
  GLOB.initSplide(
    "#cqFeaturesSplide",
    {
      pagination: false,
      arrows: false,
      padding: 10,
      drag: false,
      grid: {
        rows: 4,
        cols: 3,
        gap: {
          row: 20,
          col: 30,
        },
      },
      breakpoints: {
        1199: {
          grid: {
            rows: 6,
            cols: 2,
            gap: {
              row: 20,
              col: 30,
            },
          },
        },
        991: {
          drag: true,
          grid: false,
          perPage: 2,
          gap: 30,
          arrows: true,
        },
        575: {
          perPage: 1,
        },
      },
    },
    true
  );
  // cq capabilities slider
  GLOB.initSplide("#cqCapabilitiesSplide", {
    pagination: false,
    gap: 20,
    padding: 5,
  });
  // quality centric slider
  GLOB.initSplide("#qualityCentricSplide", {
    type: "loop",
    pagination: false,
    arrows: false,
    perPage: 6,
    perMove: 1,
    breakpoints: {
      1199: {
        perPage: 5,
      },
      991: {
        arrows: true,
      },
      767: {
        perPage: 4,
        padding: 0,
      },
      575: {
        perPage: 3,
      },
    },
  });
});
