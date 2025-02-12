class App {
    /**
     * Initializes various components and event listeners for the application.
     * This method is called when the App class is instantiated.
     */
    initComponents() {
      // --- Preloader Functionality ---
      // Hide the status message and preloader when the window is fully loaded.
      $(window).on("load", function() {
        $("#status").fadeOut(); // Fade out the status message
        $("#preloader").delay(350).fadeOut("slow"); // Fade out the preloader with a delay
      });
  
      // --- Bootstrap Component Initializations ---
      // Initialize Bootstrap Popovers for elements with the attribute 'data-bs-toggle="popover"'.
      [...document.querySelectorAll('[data-bs-toggle="popover"]')].map(
        (popoverElement) => new bootstrap.Popover(popoverElement)
      );
  
      // Initialize Bootstrap Tooltips for elements with the attribute 'data-bs-toggle="tooltip"'.
      [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(
        (tooltipElement) => new bootstrap.Tooltip(tooltipElement)
      );
  
      // Initialize Bootstrap Offcanvas for elements with the class 'offcanvas'.
      [...document.querySelectorAll(".offcanvas")].map(
        (offcanvasElement) => new bootstrap.Offcanvas(offcanvasElement)
      );
  
      // --- Toast Placement Functionality ---
      // Get the toast placement element.
      const toastPlacementElement = document.getElementById("toastPlacement");
      if (toastPlacementElement) {
        // Add event listener to the select element for toast placement.
        document
          .getElementById("selectToastPlacement")
          .addEventListener("change", function() {
            // Store the original class name if not already stored.
            if (!toastPlacementElement.dataset.originalClass) {
              toastPlacementElement.dataset.originalClass =
                toastPlacementElement.className;
            }
            // Update the toast class name with the selected placement.
            toastPlacementElement.className =
              toastPlacementElement.dataset.originalClass + " " + this.value;
          });
      }
  
      // Initialize Bootstrap Toasts for elements with the class 'toast'.
      [].slice
        .call(document.querySelectorAll(".toast"))
        .map(function(toastElement) {
          return new bootstrap.Toast(toastElement);
        });
  
      // --- Live Alert Functionality ---
      // Get the placeholder and button for live alerts.
      const liveAlertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const liveAlertButton = document.getElementById("liveAlertBtn");
  
      if (liveAlertButton) {
        // Add event listener to the live alert button.
        liveAlertButton.addEventListener("click", () => {
          // Define alert message and type.
          const alertMessage = "Nice, you triggered this alert message!";
          const alertType = "success";
  
          // Create a div element for the alert.
          const alertContainer = document.createElement("div");
          alertContainer.innerHTML = [
            `<div class="alert alert-${alertType} alert-dismissible" role="alert">`,
            `   <div>${alertMessage}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            "</div>",
          ].join(""); // Join the array elements into a single string.
  
          // Append the alert to the placeholder.
          liveAlertPlaceholder.append(alertContainer);
        });
      }
  
      // --- RTL Support ---
      // Check if the app style includes RTL and set HTML direction to 'rtl' if it does.
      if (document.getElementById("app-style").href.includes("rtl.min.css")) {
        document.getElementsByTagName("html")[0].dir = "rtl"; // Set document direction to right-to-left.
      }
    }
  
    /**
     * Initializes the portlet card functionalities like remove and reload.
     */
    initPortletCard() {
      const cardSelector = ".card"; // Define the card selector.
  
      // --- Card Remove Functionality ---
      // Event listener for 'remove' button click within a card.
      $(document).on(
        "click",
        '.card a[data-bs-toggle="remove"]',
        function(event) {
          event.preventDefault(); // Prevent default link behavior.
          const cardElement = $(this).closest(cardSelector); // Find the closest card element.
          const cardParentElement = cardElement.parent(); // Get the parent of the card.
          cardElement.remove(); // Remove the card element.
  
          // If the parent element has no children after removal, remove the parent as well.
          if (cardParentElement.children().length === 0) {
            cardParentElement.remove();
          }
        }
      );
  
      // --- Card Reload Functionality ---
      // Event listener for 'reload' button click within a card.
      $(document).on(
        "click",
        '.card a[data-bs-toggle="reload"]',
        function(event) {
          event.preventDefault(); // Prevent default link behavior.
          const cardElement = $(this).closest(cardSelector); // Find the closest card element.
  
          // Add a disabled overlay with a loader to the card.
          cardElement.append(
            '<div class="card-disabled"><div class="card-portlets-loader"></div></div>'
          );
          const disabledOverlay = cardElement.find(".card-disabled"); // Get the disabled overlay.
  
          // Simulate a reload delay and then fade out the overlay.
          setTimeout(function() {
            disabledOverlay.fadeOut("fast", function() {
              disabledOverlay.remove(); // Remove the disabled overlay after fade out.
            });
          }, 500 + Math.random() * 300 * 5); // Random delay for simulation.
        }
      );
    }
  
    /**
     * Initializes multi-level dropdown menus to prevent them from closing when clicking on submenu items.
     */
    initMultiDropdown() {
      $(".dropdown-menu a.dropdown-toggle").on("click", function() {
        const submenu = $(this).next(".dropdown-menu"); // Get the submenu.
        const otherSubmenus = $(this)
          .parent()
          .parent()
          .find(".dropdown-menu")
          .not(submenu); // Get other submenus in the same parent.
  
        // Close other open submenus.
        otherSubmenus.removeClass("show");
        otherSubmenus.parent().find(".dropdown-toggle").removeClass("show");
  
        return false; // Prevent default link behavior and closing of parent dropdown.
      });
    }
  
    /**
     * Initializes the counter up plugin for animated number counters.
     */
    initCounterUp() {
      // Default delay and time for counter up animation.
      const defaultDelay = 100;
      const defaultTime = 1200;
  
      // Iterate over elements with the 'data-plugin="counterup"' attribute.
      $('[data-plugin="counterup"]').each(function() {
        // Get delay and time from data attributes or use defaults.
        const delay = $(this).attr("data-delay") || defaultDelay;
        const time = $(this).attr("data-time") || defaultTime;
  
        $(this).counterUp({
          delay: delay, // Delay in milliseconds per step.
          time: time, // Total animation time in milliseconds.
        });
      });
    }
  
    /**
     * Initializes the left sidebar navigation menu, handling active states and smooth scrolling.
     */
    initLeftSidebar() {
      if ($(".side-nav").length) {
        const sidebarCollapses = $(".side-nav li .collapse"); // Get all collapsible sidebar menu items.
  
        // Prevent collapse toggle on click for sidebar menu links.
        $(".side-nav li [data-bs-toggle='collapse']").on("click", function() {
          return false;
        });
  
        // Collapse other open menus when one is shown.
        sidebarCollapses.on({
          "show.bs.collapse": function(event) {
            const parentCollapse = $(event.target).parents(".collapse.show");
            $(".side-nav .collapse.show")
              .not(event.target)
              .not(parentCollapse)
              .collapse("hide");
          },
        });
  
        // --- Active Menu Item Highlighting ---
        // Iterate over sidebar menu links to highlight the active one based on current URL.
        $(".side-nav a").each(function() {
          const currentUrl = window.location.href.split(/[?#]/)[0]; // Get current URL without query or hash.
          if (this.href === currentUrl) {
            $(this).addClass("active"); // Add 'active' class to the link.
            $(this).parent().addClass("active"); // Add 'active' class to the parent list item.
            $(this).parent().parent().parent().addClass("show"); // Show parent collapse menu.
            $(this).parent().parent().parent().parent().addClass("active"); // Add 'active' to grandparent list item.
  
            // Further parent handling for different sidebar structures.
            let parentElement = $(this).parent().parent().parent().parent().parent().parent();
            if (parentElement.attr("id") !== "sidebar-menu") {
              parentElement.addClass("show");
            }
            parentElement = $(this).parent().parent().parent().parent().parent().parent().parent();
            if (parentElement.attr("id") !== "wrapper") {
              parentElement.addClass("show");
            }
            parentElement = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
            if (!parentElement.is("body")) {
              parentElement.addClass("active");
            }
          }
        });
  
        // --- Smooth Scroll to Active Item ---
        setTimeout(function() {
          let activeLink = document.querySelector("li.active .active"); // Get the active link element.
          if (activeLink !== null) {
            const scrollWrapper = document.querySelector(
              ".sidenav-menu .simplebar-content-wrapper"
            ); // Get the scrollable wrapper.
            const activeLinkOffsetTop = activeLink.offsetTop - 300; // Calculate offset from top.
  
            if (scrollWrapper && activeLinkOffsetTop > 100) {
              const animationDuration = 600; // Animation duration in milliseconds.
              let startTime = null;
              const startScrollTop = scrollWrapper.scrollTop;
              const distanceToScroll = activeLinkOffsetTop - startScrollTop;
              let currentTime = 0;
  
              function smoothScrollAnimation() {
                currentTime += 20; // Interval in milliseconds.
                let progress = currentTime / animationDuration;
                progress = progress < 1 ? progress : 1; // Clamp progress to 0-1.
                const scrollTopValue =
                  progress < 0.5
                    ? (distanceToScroll / 2) * progress * progress + startScrollTop
                    : (-distanceToScroll / 2) *
                        (--progress * (progress - 2) - 1) +
                      startScrollTop; // Easing function.
                scrollWrapper.scrollTop = scrollTopValue;
  
                if (currentTime < animationDuration) {
                  setTimeout(smoothScrollAnimation, 20); // Continue animation.
                }
              }
              smoothScrollAnimation(); // Start smooth scroll animation.
            }
          }
        }, 200); // Delay for DOM to fully render.
      }
    }
  
    /**
     * Initializes the topbar menu, handling active states.
     */
    initTopbarMenu() {
      if ($(".navbar-nav").length) {
        // --- Active Menu Item Highlighting ---
        // Iterate over topbar menu links to highlight the active one based on current URL.
        $(".navbar-nav li a").each(function() {
          const currentUrl = window.location.href.split(/[?#]/)[0]; // Get current URL without query or hash.
          if (this.href === currentUrl) {
            $(this).addClass("active"); // Add 'active' class to the link.
            $(this).parent().parent().addClass("active"); // Add 'active' class to the parent UL.
            $(this).parent().parent().parent().parent().addClass("active"); // Add 'active' to grandparent UL.
            $(this).parent().parent().parent().parent().parent().parent().addClass("active"); // Further parent handling.
          }
        });
  
        // --- Mobile Menu Toggle ---
        // Event listener for the navbar toggle button (for mobile view).
        $(".navbar-toggle").on("click", function() {
          $(this).toggleClass("open"); // Toggle 'open' class on the toggle button.
          $("#navigation").slideToggle(400); // Slide toggle the navigation menu.
        });
      }
    }
  
    /**
     * Initializes the fullscreen functionality listener.
     */
    initfullScreenListener() {
      const fullscreenButton = document.querySelector('[data-toggle="fullscreen"]'); // Get fullscreen button.
      if (fullscreenButton) {
        fullscreenButton.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default link behavior.
          document.body.classList.toggle("fullscreen-enable"); // Toggle fullscreen class on body.
  
          // Toggle fullscreen mode based on current state.
          if (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
          ) {
            // Exit fullscreen if already in fullscreen.
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
          } else {
            // Enter fullscreen if not in fullscreen.
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen(
                Element.ALLOW_KEYBOARD_INPUT
              );
            }
          }
        });
      }
    }
  
    /**
     * Initializes form validation for forms with the class 'needs-validation'.
     */
    initFormValidation() {
      // Iterate over all forms with the class 'needs-validation'.
      document
        .querySelectorAll(".needs-validation")
        .forEach((formElement) => {
          formElement.addEventListener(
            "submit",
            (event) => {
              // Check form validity.
              if (!formElement.checkValidity()) {
                event.preventDefault(); // Prevent form submission.
                event.stopPropagation(); // Stop event propagation.
              }
              formElement.classList.add("was-validated"); // Add 'was-validated' class for styling.
            },
            false
          );
        });
    }
  
    /**
     * Initializes advanced form components like input masks, choices.js, select2, and flatpickr.
     */
    initFormAdvance() {
      // --- Input Mask Initialization ---
      // Iterate over elements with 'data-toggle="input-mask"'.
      document.querySelectorAll('[data-toggle="input-mask"]').forEach(
        (inputMaskElement) => {
          // Convert '0' format characters to '9' for inputmask.
          let maskFormat = inputMaskElement
            .getAttribute("data-mask-format")
            .toString()
            .replaceAll("0", "9");
          inputMaskElement.setAttribute("data-mask-format", maskFormat);
  
          const mask = new Inputmask(maskFormat); // Create Inputmask instance.
          mask.mask(inputMaskElement); // Apply mask to the element.
        }
      );
  
      // --- Choices.js Initialization ---
      // Iterate over elements with 'data-choices' attribute.
      document.querySelectorAll("[data-choices]").forEach(function(choicesElement) {
        let choicesConfig = {}; // Initialize choices.js configuration object.
        const attributes = choicesElement.attributes; // Get element attributes.
  
        // --- Configure Choices.js options based on data attributes ---
        if (attributes["data-choices-groups"]) {
          choicesConfig.placeholderValue =
            "This is a placeholder set in the config";
        }
        if (attributes["data-choices-search-false"]) {
          choicesConfig.searchEnabled = false;
        }
        if (attributes["data-choices-search-true"]) {
          choicesConfig.searchEnabled = true;
        }
        if (attributes["data-choices-removeItem"]) {
          choicesConfig.removeItemButton = true;
        }
        if (attributes["data-choices-sorting-false"]) {
          choicesConfig.shouldSort = false;
        }
        if (attributes["data-choices-sorting-true"]) {
          choicesConfig.shouldSort = true;
        }
        if (attributes["data-choices-multiple-remove"]) {
          choicesConfig.removeItemButton = true;
        }
        if (attributes["data-choices-limit"]) {
          choicesConfig.maxItemCount = attributes["data-choices-limit"].value.toString();
        }
        if (attributes["data-choices-limit"]) {
          choicesConfig.maxItemCount = attributes["data-choices-limit"].value.toString();
        }
        if (attributes["data-choices-editItem-true"]) {
          choicesConfig.maxItemCount = true; // Note: typo in original code, likely meant `editItems`
        }
        if (attributes["data-choices-editItem-false"]) {
          choicesConfig.maxItemCount = false; // Note: typo in original code, likely meant `editItems`
        }
        if (attributes["data-choices-text-unique-true"]) {
          choicesConfig.duplicateItemsAllowed = false;
        }
        if (attributes["data-choices-text-disabled-true"]) {
          choicesConfig.addItems = false;
        }
  
        // Initialize Choices.js instance based on configuration.
        if (attributes["data-choices-text-disabled-true"]) {
          new Choices(choicesElement, choicesConfig).disable(); // Disable Choices.js if specified.
        } else {
          new Choices(choicesElement, choicesConfig); // Initialize Choices.js.
        }
      });
  
      // --- Select2 Initialization ---
      if (jQuery().select2) {
        $('[data-toggle="select2"]').select2(); // Initialize Select2 for elements with 'data-toggle="select2"'.
      }
  
      // --- Input Mask (jQuery Mask Plugin) Initialization ---
      if (jQuery().mask) {
        $('[data-toggle="input-mask"]').each(function() {
          const maskFormat = $(this).data("maskFormat"); // Get mask format from data attribute.
          const reverseMask = $(this).data("reverse"); // Get reverse mask option.
          if (reverseMask != null) {
            $(this).mask(maskFormat, { reverse: reverseMask }); // Apply mask with reverse option.
          } else {
            $(this).mask(maskFormat); // Apply mask without reverse option.
          }
        });
      }
  
      // --- Flatpickr and Timepicker Initialization ---
      const datepickers = document.querySelectorAll("[data-provider]"); // Get elements with 'data-provider'.
      Array.from(datepickers).forEach(function(datepickerElement) {
        let flatpickrConfig, timepickerConfig, attributes;
        attributes = datepickerElement.attributes; // Get attributes of the datepicker element.
  
        // --- Flatpickr Initialization ---
        if (datepickerElement.getAttribute("data-provider") === "flatpickr") {
          flatpickrConfig = {}; // Initialize Flatpickr configuration.
          flatpickrConfig.disableMobile = "true"; // Disable mobile mode for Flatpickr.
  
          // --- Configure Flatpickr options based on data attributes ---
          if (attributes["data-date-format"]) {
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-enable-time"]) {
            flatpickrConfig.enableTime = true;
            flatpickrConfig.dateFormat =
              attributes["data-date-format"].value.toString() + " H:i";
          }
          if (attributes["data-altFormat"]) {
            flatpickrConfig.altInput = true;
            flatpickrConfig.altFormat = attributes["data-altFormat"].value.toString();
          }
          if (attributes["data-minDate"]) {
            flatpickrConfig.minDate = attributes["data-minDate"].value.toString();
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-maxDate"]) {
            flatpickrConfig.maxDate = attributes["data-maxDate"].value.toString();
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-deafult-date"]) { // Note: typo in original code, likely meant `default-date`
            flatpickrConfig.defaultDate = attributes["data-deafult-date"].value.toString();
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-multiple-date"]) {
            flatpickrConfig.mode = "multiple";
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-range-date"]) {
            flatpickrConfig.mode = "range";
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-inline-date"]) {
            flatpickrConfig.inline = true;
            flatpickrConfig.defaultDate = attributes["data-deafult-date"].value.toString();
            flatpickrConfig.dateFormat = attributes["data-date-format"].value.toString();
          }
          if (attributes["data-disable-date"]) {
            let disabledDates = [];
            disabledDates.push(attributes["data-disable-date"].value);
            flatpickrConfig.disable = disabledDates.toString().split(",");
          }
          if (attributes["data-week-number"]) {
            let weekNumbers = [];
            weekNumbers.push(attributes["data-week-number"].value);
            flatpickrConfig.weekNumbers = true;
          }
  
          flatpickr(datepickerElement, flatpickrConfig); // Initialize Flatpickr.
        }
        // --- Timepicker (Flatpickr time mode) Initialization ---
        else if (datepickerElement.getAttribute("data-provider") === "timepickr") {
          timepickerConfig = {}; // Initialize Timepicker configuration.
          attributes = datepickerElement.attributes; // Re-get attributes (already defined but for clarity).
  
          // --- Configure Timepicker options based on data attributes ---
          if (attributes["data-time-basic"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.dateFormat = "H:i";
          }
          if (attributes["data-time-hrs"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.dateFormat = "H:i";
            timepickerConfig.time_24hr = true; // 24-hour time format.
          }
          if (attributes["data-min-time"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.dateFormat = "H:i";
            timepickerConfig.minTime = attributes["data-min-time"].value.toString();
          }
          if (attributes["data-max-time"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.dateFormat = "H:i";
            timepickerConfig.minTime = attributes["data-max-time"].value.toString(); // Note: typo in original code, likely meant `maxTime`
          }
          if (attributes["data-default-time"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.dateFormat = "H:i";
            timepickerConfig.defaultDate = attributes["data-default-time"].value.toString();
          }
          if (attributes["data-time-inline"]) {
            timepickerConfig.enableTime = true;
            timepickerConfig.noCalendar = true;
            timepickerConfig.defaultDate = attributes["data-time-inline"].value.toString();
            timepickerConfig.inline = true;
          }
  
          flatpickr(datepickerElement, timepickerConfig); // Initialize Flatpickr as Timepicker.
        }
      });
    }
  
    /**
     * Initializes the topbar scroll listener to add/remove 'topbar-active' class on scroll.
     */
    initTopbarScroll() {
      let scrollYPosition = window.scrollY; // Get initial scroll position.
      const headerElement = document.getElementById("header"); // Get header element.
  
      // Event listener for window scroll event.
      window.addEventListener("scroll", function() {
        scrollYPosition = window.scrollY; // Update scroll position.
        // Add 'topbar-active' class if scrolled down 25px or more, otherwise remove it.
        if (scrollYPosition >= 25) {
          headerElement.classList.add("topbar-active");
        } else {
          headerElement.classList.remove("topbar-active");
        }
      });
    }
  
    /**
     * Initializes all components and functionalities of the App class.
     * This method is called to start up the application's UI and interactions.
     */
    init() {
      this.initComponents(); // Initialize basic components.
      this.initPortletCard(); // Initialize portlet card features.
      this.initMultiDropdown(); // Initialize multi-level dropdowns.
      this.initCounterUp(); // Initialize number counters.
      this.initLeftSidebar(); // Initialize left sidebar navigation.
      this.initTopbarMenu(); // Initialize topbar menu.
      this.initfullScreenListener(); // Initialize fullscreen functionality.
      this.initFormValidation(); // Initialize form validation.
      this.initFormAdvance(); // Initialize advanced form components.
      this.initTopbarScroll(); // Initialize topbar scroll behavior.
    }
  }
  
  class ThemeCustomizer {
    /**
     * Constructor for the ThemeCustomizer class.
     * Initializes properties for HTML element, configuration, and default configuration.
     */
    constructor() {
      this.html = document.getElementsByTagName("html")[0]; // Get the HTML element.
      this.config = {}; // Initialize current configuration object.
      this.defaultConfig = window.config; // Store default configuration from window.
    }
  
    /**
     * Initializes the theme configuration by loading default and current configs and setting initial switch states.
     */
    initConfig() {
      this.defaultConfig = JSON.parse(JSON.stringify(window.defaultConfig)); // Deep copy default config.
      this.config = JSON.parse(JSON.stringify(window.config)); // Deep copy current config.
      this.setSwitchFromConfig(); // Set switch states based on current config.
    }
  
    /**
     * Initializes the two-column sidebar functionality, handling menu switching and active states.
     */
    initTwoColumn() {
      if ($("#two-col-sidenav-main").length) {
        const mainSideNavLink = $("#two-col-sidenav-main .side-nav-link"); // Main sidebar links.
        const sidenavMenuItem = $(".sidenav-menu-item"); // Sidenav menu items.
        const subMenu = $(".sidenav-menu-item .sub-menu"); // Submenus in sidenav.
        const collapseItems = $("#two-col-menu menu-item .collapse"); // Collapsible menu items in two-column menu.
  
        // --- Collapse Handling in Two-Column Menu ---
        collapseItems.on({
          "show.bs.collapse": function() {
            const parentSubmenu = $(this).closest(subMenu).closest(subMenu).find(collapseItems);
            // Hide other collapses except for the current one and its parents.
            (parentSubmenu.length ? parentSubmenu : collapseItems)
              .not($(this))
              .collapse("hide");
          },
        });
  
        // --- Main Sidebar Link Click Handler ---
        mainSideNavLink.on("click", function(event) {
          const targetMenu = $($(this).attr("href")); // Get target menu from link href.
          if (targetMenu.length) {
            event.preventDefault(); // Prevent default link behavior.
            mainSideNavLink.removeClass("active"); // Remove active class from other links.
            $(this).addClass("active"); // Add active class to clicked link.
            sidenavMenuItem.removeClass("d-block"); // Hide other menu items.
            targetMenu.addClass("d-block"); // Show target menu item.
  
            // Change left sidebar size to default on larger screens.
            if (window.innerWidth >= 1040) {
              self.changeLeftbarSize("default");
            }
            return true;
          }
        });
  
        const currentUrl = window.location.href; // Get current URL.
  
        // --- Highlight Active Main Sidebar Link ---
        mainSideNavLink.each(function() {
          if (this.href === currentUrl) {
            $(this).addClass("active"); // Add active class to matching link.
          }
        });
  
        // --- Highlight Active Link in Two-Column Menu and Trigger Main Sidebar Link Click ---
        $("#two-col-menu a").each(function() {
          if (this.href === currentUrl) {
            $(this).addClass("active"); // Add active class to the link.
            $(this).parent().addClass("active"); // Add active class to parent LI.
            $(this).parent().parent().parent().addClass("show"); // Show parent collapse.
            $(this).parent().parent().parent().parent().addClass("active"); // Add active to grandparent LI.
  
            // Further parent handling for different menu structures.
            let parentElement = $(this).parent().parent().parent().parent().parent().parent();
            if (parentElement.attr("id") !== "sidebar-menu") {
              parentElement.addClass("show");
            }
            parentElement = $(this).parent().parent().parent().parent().parent().parent().parent();
            if (parentElement.attr("id") !== "wrapper") {
              parentElement.addClass("show");
            }
            parentElement = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
            if (!parentElement.is("body")) {
              parentElement.addClass("active");
            }
  
            let targetMainLink = null;
            const targetMenuId = "#" + $(this).parents(".sidenav-menu-item").attr("id"); // Get target menu ID.
  
            // Find the corresponding main sidebar link.
            $("#two-col-sidenav-main .side-nav-link").each(function() {
              if ($(this).attr("href") === targetMenuId) {
                targetMainLink = $(this);
              }
            });
  
            if (targetMainLink) {
              targetMainLink.trigger("click"); // Trigger click on the main sidebar link to show menu.
            }
          }
        });
      }
    }
  
    /**
     * Changes the menu color and updates the data attribute and configuration.
     * @param {string} menuColor - The new menu color value.
     */
    changeMenuColor(menuColor) {
      this.config.menu.color = menuColor; // Update config menu color.
      this.html.setAttribute("data-menu-color", menuColor); // Set HTML data attribute.
      this.setSwitchFromConfig(); // Update theme settings switches.
    }
  
    /**
     * Changes the left sidebar size and updates the data attribute and configuration.
     * @param {string} sidebarSize - The new sidebar size value (e.g., 'default', 'condensed').
     * @param {boolean} [updateConfig=true] - Whether to update the configuration and switches.
     */
    changeLeftbarSize(sidebarSize, updateConfig = true) {
      this.html.setAttribute("data-sidenav-size", sidebarSize); // Set HTML data attribute.
      if (updateConfig) {
        this.config.sidenav.size = sidebarSize; // Update config sidenav size.
        this.setSwitchFromConfig(); // Update theme settings switches.
      }
    }
  
    /**
     * Changes the layout mode (e.g., 'fluid', 'boxed') and updates data attribute and configuration.
     * @param {string} layoutMode - The new layout mode value.
     * @param {boolean} [updateConfig=true] - Whether to update the configuration and switches.
     */
    changeLayoutMode(layoutMode, updateConfig = true) {
      this.html.setAttribute("data-layout-mode", layoutMode); // Set HTML data attribute.
      if (updateConfig) {
        this.config.layout.mode = layoutMode; // Update config layout mode.
        this.setSwitchFromConfig(); // Update theme settings switches.
      }
    }
  
    /**
     * Changes the layout color/theme (e.g., 'light', 'dark') and updates data attribute and configuration.
     * @param {string} layoutColor - The new layout color/theme value.
     */
    changeLayoutColor(layoutColor) {
      this.config.theme = layoutColor; // Update config theme.
      this.html.setAttribute("data-bs-theme", layoutColor); // Set HTML data attribute.
      this.setSwitchFromConfig(); // Update theme settings switches.
    }
  
    /**
     * Changes the topbar color and updates the data attribute and configuration.
     * @param {string} topbarColor - The new topbar color value.
     */
    changeTopbarColor(topbarColor) {
      this.config.topbar.color = topbarColor; // Update config topbar color.
      this.html.setAttribute("data-topbar-color", topbarColor); // Set HTML data attribute.
      this.setSwitchFromConfig(); // Update theme settings switches.
    }
  
    /**
     * Resets the theme to the default configuration, applying default colors, sizes, and layout.
     */
    resetTheme() {
      this.config = JSON.parse(JSON.stringify(window.defaultConfig)); // Reset config to default.
      this.changeMenuColor(this.config.menu.color); // Apply default menu color.
      this.changeLeftbarSize(this.config.sidenav.size); // Apply default sidenav size.
      this.changeLayoutColor(this.config.theme); // Apply default layout color.
      this.changeLayoutMode(this.config.layout.mode); // Apply default layout mode.
      this.changeTopbarColor(this.config.topbar.color); // Apply default topbar color.
      this._adjustLayout(); // Adjust layout based on window size.
    }
  
    /**
     * Initializes event listeners for theme customization switches and buttons.
     */
    initSwitchListener() {
      const themeCustomizer = this; // Store 'this' context for event listeners.
  
      // --- Menu Color Switch Listeners ---
      document
        .querySelectorAll("input[name=data-menu-color]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            themeCustomizer.changeMenuColor(switchElement.value); // Change menu color on switch change.
          });
        });
  
      // --- Sidenav Size Switch Listeners ---
      document
        .querySelectorAll("input[name=data-sidenav-size]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            themeCustomizer.changeLeftbarSize(switchElement.value); // Change sidenav size on switch change.
          });
        });
  
      // --- Layout Color/Theme Switch Listeners ---
      document
        .querySelectorAll("input[name=data-bs-theme]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            themeCustomizer.changeLayoutColor(switchElement.value); // Change layout color on switch change.
          });
        });
  
      // --- Layout Mode Switch Listeners ---
      document
        .querySelectorAll("input[name=data-layout-mode]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            themeCustomizer.changeLayoutMode(switchElement.value); // Change layout mode on switch change.
          });
        });
  
      // --- Layout Switch (Horizontal/Vertical - Page Reload) Listeners ---
      document
        .querySelectorAll("input[name=data-layout]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            // Reload page to switch between horizontal and vertical layouts.
            window.location =
              switchElement.value === "horizontal"
                ? "layouts-horizontal.html"
                : "index.html";
          });
        });
  
      // --- Topbar Color Switch Listeners ---
      document
        .querySelectorAll("input[name=data-topbar-color]")
        .forEach(function(switchElement) {
          switchElement.addEventListener("change", function() {
            themeCustomizer.changeTopbarColor(switchElement.value); // Change topbar color on switch change.
          });
        });
  
      // --- Light/Dark Mode Button Listener ---
      const lightDarkModeButton = document.getElementById("light-dark-mode");
      if (lightDarkModeButton) {
        lightDarkModeButton.addEventListener("click", function() {
          // Toggle between light and dark layout colors.
          themeCustomizer.changeLayoutColor(
            themeCustomizer.config.theme === "light" ? "dark" : "light"
          );
        });
      }
  
      // --- Reset Layout Button Listener ---
      const resetLayoutButton = document.querySelector("#reset-layout");
      if (resetLayoutButton) {
        resetLayoutButton.addEventListener("click", function() {
          themeCustomizer.resetTheme(); // Reset theme to defaults on button click.
        });
      }
  
      // --- Sidenav Toggle Button Listeners ---
      document
        .querySelectorAll(".sidenav-toggle-button")
        .forEach(function(toggleButton) {
          toggleButton.addEventListener("click", function() {
            const currentSidenavSize = themeCustomizer.config.sidenav.size; // Get current sidenav size.
            const htmlSidenavSize = themeCustomizer.html.getAttribute(
              "data-sidenav-size",
              currentSidenavSize
            ); // Get data-sidenav-size attribute.
  
            // Logic for toggling sidenav sizes (full, fullscreen, condensed, default).
            if (htmlSidenavSize === "full") {
              themeCustomizer.showBackdrop(); // Show backdrop for full sidebar.
            } else if (currentSidenavSize === "fullscreen") {
              themeCustomizer.changeLeftbarSize(
                htmlSidenavSize === "fullscreen" ? "default" : currentSidenavSize,
                false
              ); // Toggle between fullscreen and default.
            } else if (htmlSidenavSize === "condensed") {
              themeCustomizer.changeLeftbarSize(
                htmlSidenavSize === "condensed" ? "default" : currentSidenavSize,
                false
              ); // Toggle between condensed and default.
            } else {
              themeCustomizer.changeLeftbarSize("condensed", false); // Default to condensed on toggle.
            }
  
            themeCustomizer.html.classList.toggle("sidebar-enable"); // Toggle 'sidebar-enable' class on HTML.
          });
        });
  
      // --- Close Full Sidebar Button Listener ---
      const closeFullSidebarButton = document.querySelector(
        ".button-close-fullsidebar"
      );
      if (closeFullSidebarButton) {
        closeFullSidebarButton.addEventListener("click", function() {
          themeCustomizer.html.classList.remove("sidebar-enable"); // Remove 'sidebar-enable' class.
          themeCustomizer.hideBackdrop(); // Hide backdrop.
        });
      }
  
      // --- Sm-Hover Sidebar Toggle Button Listeners ---
      document
        .querySelectorAll(".button-sm-hover")
        .forEach(function(toggleButton) {
          toggleButton.addEventListener("click", function() {
            const currentSidenavSize = themeCustomizer.config.sidenav.size; // Get current sidenav size.
            const htmlSidenavSize = themeCustomizer.html.getAttribute(
              "data-sidenav-size",
              currentSidenavSize
            ); // Get data-sidenav-size attribute.
  
            // Toggle between 'sm-hover-active' and 'sm-hover' sidenav sizes.
            if (htmlSidenavSize === "sm-hover-active") {
              themeCustomizer.changeLeftbarSize("sm-hover", false);
            } else {
              themeCustomizer.changeLeftbarSize("sm-hover-active", false);
            }
          });
        });
    }
  
    /**
     * Shows the backdrop overlay for full sidebar mode.
     */
    showBackdrop() {
      const backdropElement = document.createElement("div"); // Create backdrop div.
      backdropElement.id = "custom-backdrop"; // Set backdrop ID.
      backdropElement.classList = "offcanvas-backdrop fade show"; // Set backdrop classes.
      document.body.appendChild(backdropElement); // Append backdrop to body.
      document.body.style.overflow = "hidden"; // Prevent body scrolling.
      if (window.innerWidth > 767) {
        document.body.style.paddingRight = "15px"; // Add padding to body for scrollbar space.
      }
      const themeCustomizer = this; // Store 'this' context for event listener.
  
      // Event listener to hide sidebar and backdrop on backdrop click.
      backdropElement.addEventListener("click", function() {
        themeCustomizer.html.classList.remove("sidebar-enable"); // Remove 'sidebar-enable' class.
        themeCustomizer.hideBackdrop(); // Hide backdrop.
      });
    }
  
    /**
     * Hides the backdrop overlay and resets body styles.
     */
    hideBackdrop() {
      const backdropElement = document.getElementById("custom-backdrop"); // Get backdrop element.
      if (backdropElement) {
        document.body.removeChild(backdropElement); // Remove backdrop from body.
        document.body.style.overflow = null; // Reset body overflow style.
        document.body.style.paddingRight = null; // Reset body padding right style.
      }
    }
  
    /**
     * Initializes window resize listener to adjust layout on window resize.
     */
    initWindowSize() {
      const themeCustomizer = this; // Store 'this' context for event listener.
      window.addEventListener("resize", function() {
        themeCustomizer._adjustLayout(); // Adjust layout on window resize.
      });
    }
  
    /**
     * Adjusts the layout based on window width, setting sidenav size and layout mode responsively.
     */
    _adjustLayout() {
      const themeCustomizer = this; // Store 'this' context.
      // For smaller screens (<= 1140px), force full sidenav and default layout.
      if (window.innerWidth <= 1140) {
        themeCustomizer.changeLeftbarSize("full", false);
        themeCustomizer.changeLayoutMode("default", false);
      } else {
        // For larger screens, apply configured sidenav size and layout mode.
        themeCustomizer.changeLeftbarSize(themeCustomizer.config.sidenav.size);
        themeCustomizer.changeLayoutMode(themeCustomizer.config.layout.mode);
      }
    }
  
    /**
     * Sets the theme settings switches in the offcanvas based on the current configuration.
     */
    setSwitchFromConfig() {
      sessionStorage.setItem(
        "__ZCRM_CONFIG__",
        JSON.stringify(this.config)
      ); // Save current config to session storage.
  
      // Uncheck all theme settings checkboxes before setting based on config.
      document
        .querySelectorAll("#theme-settings-offcanvas input[type=checkbox]")
        .forEach(function(checkbox) {
          checkbox.checked = false;
        });
  
      let layoutRadio,
        themeRadio,
        layoutModeRadio,
        topbarColorRadio,
        menuColorRadio,
        sidenavSizeRadio;
      const currentConfig = this.config; // Get current config.
  
      if (currentConfig) {
        // Get radio buttons for each setting based on config values.
        layoutRadio = document.querySelector(
          `input[type=radio][name=data-layout][value=${currentConfig.nav}]`
        );
        themeRadio = document.querySelector(
          `input[type=radio][name=data-bs-theme][value=${currentConfig.theme}]`
        );
        layoutModeRadio = document.querySelector(
          `input[type=radio][name=data-layout-mode][value=${currentConfig.layout.mode}]`
        );
        topbarColorRadio = document.querySelector(
          `input[type=radio][name=data-topbar-color][value=${currentConfig.topbar.color}]`
        );
        menuColorRadio = document.querySelector(
          `input[type=radio][name=data-menu-color][value=${currentConfig.menu.color}]`
        );
        sidenavSizeRadio = document.querySelector(
          `input[type=radio][name=data-sidenav-size][value=${currentConfig.sidenav.size}]`
        );
  
        // Check the corresponding radio buttons if found.
        if (layoutRadio) layoutRadio.checked = true;
        if (themeRadio) themeRadio.checked = true;
        if (layoutModeRadio) layoutModeRadio.checked = true;
        if (topbarColorRadio) topbarColorRadio.checked = true;
        if (menuColorRadio) menuColorRadio.checked = true;
        if (sidenavSizeRadio) sidenavSizeRadio.checked = true;
      }
    }
  
    /**
     * Initializes the ThemeCustomizer class, setting up config, listeners, and initial layout.
     */
    init() {
      this.initConfig(); // Initialize theme configuration.
      this.initTwoColumn(); // Initialize two-column sidebar.
      this.initSwitchListener(); // Initialize theme switch listeners.
      this.initWindowSize(); // Initialize window resize listener.
      this._adjustLayout(); // Adjust layout on initial load.
      this.setSwitchFromConfig(); // Set switches based on initial config.
    }
  }
  
  // --- DOMContentLoaded Event Listener ---
  // Initialize App and ThemeCustomizer when the document is fully loaded.
  document.addEventListener("DOMContentLoaded", function(event) {
    new App().init(); // Initialize the App class.
    new ThemeCustomizer().init(); // Initialize the ThemeCustomizer class.
  });
  
  // --- Custom JavaScript Functionality ---
  const customJS = () => {
    let mousemoveTimeout; // Variable to store mousemove timeout.
  
    // --- Mousestop Event ---
    // Dispatch a 'mousestop' event when mouse movement stops for a short duration.
    document.addEventListener("mousemove", function(event) {
      clearTimeout(mousemoveTimeout); // Clear previous timeout.
      mousemoveTimeout = setTimeout(function() {
        const mousestopEvent = new CustomEvent("mousestop", {
          detail: { clientX: event.clientX, clientY: event.clientY },
          bubbles: true, // Event bubbles up the DOM tree.
          cancelable: true, // Event can be cancelled.
        });
        event.target.dispatchEvent(mousestopEvent); // Dispatch 'mousestop' event on the target element.
      }, 100); // Timeout duration in milliseconds.
    });
  
    // --- Dismissible Element Functionality ---
    {
      const dismissibleElements = document.querySelectorAll("[data-dismissible]"); // Get elements with 'data-dismissible'.
      dismissibleElements.forEach((dismissibleElement) => {
        dismissibleElement.addEventListener("click", (event) => {
          const targetSelector = dismissibleElement.getAttribute("data-dismissible"); // Get target selector.
          const targetElement = document.querySelector(targetSelector); // Find target element.
          if (targetElement) {
            targetElement.remove(); // Remove the target element.
          }
        });
      });
    }
  
    // --- Toggler Functionality ---
    {
      const togglerGroups = document.querySelectorAll("[data-toggler]"); // Get elements with 'data-toggler'.
      const showElement = (element) => element.classList.remove("d-none"); // Function to show element.
      const hideElement = (element) => element.classList.add("d-none"); // Function to hide element.
      const toggleElements = (elementOn, elementOff, initialState) => {
        console.info(elementOn, elementOff, initialState); // Log toggler state (for debugging).
        if (elementOn && elementOff) {
          if (initialState) {
            showElement(elementOn); // Show 'on' element.
            hideElement(elementOff); // Hide 'off' element.
          } else {
            showElement(elementOff); // Show 'off' element.
            hideElement(elementOn); // Hide 'on' element.
          }
        }
      };
  
      togglerGroups.forEach((togglerGroup) => {
        const togglerOnElement = togglerGroup.querySelector("[data-toggler-on]"); // Get 'on' element.
        const togglerOffElement = togglerGroup.querySelector("[data-toggler-off]"); // Get 'off' element.
        let isToggledOn = togglerGroup.getAttribute("data-toggler") === "on"; // Get initial state.
  
        // Event listener for 'on' toggler.
        if (togglerOnElement) {
          togglerOnElement.addEventListener("click", () => {
            isToggledOn = false; // Update state to 'off'.
            toggleElements(togglerOnElement, togglerOffElement, isToggledOn); // Toggle elements.
          });
        }
  
        // Event listener for 'off' toggler.
        if (togglerOffElement) {
          togglerOffElement.addEventListener("click", () => {
            isToggledOn = true; // Update state to 'on'.
            toggleElements(togglerOnElement, togglerOffElement, isToggledOn); // Toggle elements.
          });
        }
  
        toggleElements(togglerOnElement, togglerOffElement, isToggledOn); // Initial toggle state setup.
      });
    }
  
    // --- Touchspin Input Functionality ---
    {
      const touchspinGroups = document.querySelectorAll("[data-touchspin]"); // Get elements with 'data-touchspin'.
      touchspinGroups.forEach((touchspinGroup) => {
        const minusButton = touchspinGroup.querySelector(".minus"); // Get minus button.
        const plusButton = touchspinGroup.querySelector(".plus"); // Get plus button.
        const inputElement = touchspinGroup.querySelector("input"); // Get input element.
  
        if (inputElement) {
          const minValue =
            inputElement.min.length !== 0 ? Number(inputElement.min) : null; // Get min value.
          const maxValue =
            inputElement.max.length !== 0 ? Number(inputElement.max) : null; // Get max value.
  
          // Event listener for minus button.
          if (minusButton) {
            minusButton.addEventListener("click", (event) => {
              const currentValue = Number.parseInt(inputElement.value) - 1; // Decrease value.
              if (minValue === null) {
                inputElement.value = currentValue.toString(); // Set new value if no min.
              }
              if (minValue !== null && currentValue > minValue - 1) {
                inputElement.value = currentValue.toString(); // Set new value if within min range.
              }
            });
          }
  
          // Event listener for plus button.
          if (plusButton) {
            plusButton.addEventListener("click", (event) => {
              const currentValue = Number.parseInt(inputElement.value) + 1; // Increase value.
              if (maxValue === null) {
                inputElement.value = currentValue.toString(); // Set new value if no max.
              }
              if (maxValue !== null && currentValue < maxValue + 1) {
                inputElement.value = currentValue.toString(); // Set new value if within max range.
              }
            });
          }
        }
      });
    }
  };
  
  customJS(); // Execute custom JavaScript functionalities.