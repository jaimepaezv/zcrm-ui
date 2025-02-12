(function() {
    // --- Initialization ---
  
    // 1. Attempt to retrieve configuration from session storage.
    //    If a configuration is saved in session storage (under the key "__ZCRM_CONFIG__"),
    //    it will be used to override default settings and HTML attributes.
    const sessionStorageConfigString = sessionStorage.getItem("__ZCRM_CONFIG__");
  
    // 2. Get the HTML element for applying attributes later.
    const htmlElement = document.getElementsByTagName("html")[0];
  
    // 3. Define default configuration options.
    //    These are the fallback settings if no configuration is found in session storage
    //    or as HTML data attributes.
    const defaultConfiguration = {
      theme: "light",          // Default theme is 'light'
      layout: {
        mode: "fluid"         // Default layout mode is 'fluid'
      },
      topbar: {
        color: "light"        // Default topbar color is 'light'
      },
      menu: {
        color: "light"        // Default menu color is 'light'
      },
      sidenav: {
        size: "default"       // Default sidenav size is 'default'
      }
    };
  
    // 4. Create a working configuration object, starting with a deep copy of the default configuration.
    //    This ensures we don't modify the default configuration directly.
    let currentConfig = JSON.parse(JSON.stringify(defaultConfiguration));
  
    // --- Override Configuration with HTML Attributes ---
  
    // 5. Check for and apply theme from the 'data-bs-theme' attribute on the HTML element.
    //    If the attribute is present, it overrides the default theme.
    let themeAttribute = htmlElement.getAttribute("data-bs-theme");
    currentConfig.theme = themeAttribute !== null ? themeAttribute : defaultConfiguration.theme;
  
    // 6. Check for and apply layout mode from 'data-layout-mode' attribute.
    let layoutModeAttribute = htmlElement.getAttribute("data-layout-mode");
    currentConfig.layout.mode = layoutModeAttribute !== null ? layoutModeAttribute : defaultConfiguration.layout.mode;
  
    // 7. Check for and apply topbar color from 'data-topbar-color' attribute.
    let topbarColorAttribute = htmlElement.getAttribute("data-topbar-color");
    currentConfig.topbar.color = topbarColorAttribute != null ? topbarColorAttribute : defaultConfiguration.topbar.color;
  
    // 8. Check for and apply sidenav size from 'data-sidenav-size' attribute.
    let sidenavSizeAttribute = htmlElement.getAttribute("data-sidenav-size");
    currentConfig.sidenav.size = sidenavSizeAttribute !== null ? sidenavSizeAttribute : defaultConfiguration.sidenav.size;
  
    // 9. Check for and apply menu color from 'data-menu-color' attribute.
    let menuColorAttribute = htmlElement.getAttribute("data-menu-color");
    currentConfig.menu.color = menuColorAttribute !== null ? menuColorAttribute : defaultConfiguration.menu.color;
  
    // 10. Store the default configuration in the global scope for potential later use (e.g., resetting to defaults).
    window.defaultConfig = JSON.parse(JSON.stringify(currentConfig)); // Deep copy for safety
  
  
    // --- Override Configuration with Session Storage (if available) ---
  
    // 11. If configuration was found in session storage, parse it and merge it into the current configuration.
    //     Session storage configuration takes highest precedence.
    if (sessionStorageConfigString !== null) {
      currentConfig = JSON.parse(sessionStorageConfigString);
    }
  
    // 12. Make the final configuration accessible globally.
    window.config = currentConfig;
  
  
    // --- Apply Configuration to HTML Attributes ---
  
    // 13. Conditional adjustments based on window width (Responsive behavior).
    //     If the window width is 1140px or less, force sidenav to 'full' and layout to 'default'
    //     regardless of the configuration, likely for better mobile/smaller screen display.
    if (window.innerWidth <= 1140) {
      htmlElement.setAttribute("data-sidenav-size", "full");
      htmlElement.setAttribute("data-layout-mode", "default");
    } else {
      // 14. Apply layout mode and sidenav size from the configuration (for larger screens).
      htmlElement.setAttribute("data-layout-mode", currentConfig.layout.mode);
      htmlElement.setAttribute("data-sidenav-size", currentConfig.sidenav.size);
    }
  
    // 15. Apply theme, menu color, and topbar color from the configuration to the HTML element.
    htmlElement.setAttribute("data-bs-theme", currentConfig.theme);
    htmlElement.setAttribute("data-menu-color", currentConfig.menu.color);
    htmlElement.setAttribute("data-topbar-color", currentConfig.topbar.color);
  
  })();