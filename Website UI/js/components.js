(function () {
  const currentScript = document.currentScript;
  const styleName = currentScript ? currentScript.getAttribute("data-style") || "styles.css" : "styles.css";
  const isHome = currentScript ? currentScript.getAttribute("data-home") === "true" : false;

  const headElements = [
    { tag: "link", rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" },
    { tag: "link", rel: "preconnect", href: "https://fonts.googleapis.com" },
    { tag: "link", rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { tag: "link", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" },
    { tag: "link", rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    { tag: "link", rel: "stylesheet", href: "/style/" + styleName },
    { tag: "link", rel: "icon", type: "image/x-icon", href: "/icon/favicon.ico" },
    { tag: "link", rel: "icon", type: "image/png", sizes: "32x32", href: "/icon/favicon-32x32.png" },
    { tag: "link", rel: "icon", type: "image/png", sizes: "16x16", href: "/icon/favicon-16x16.png" },
    { tag: "link", rel: "apple-touch-icon", sizes: "180x180", href: "/icon/apple-touch-icon.png" },
    { tag: "link", rel: "icon", type: "image/png", sizes: "192x192", href: "/icon/android-chrome-192x192.png" },
    { tag: "link", rel: "icon", type: "image/png", sizes: "512x512", href: "/icon/android-chrome-512x512.png" }
  ];

  headElements.forEach((item) => {
    const el = document.createElement(item.tag);
    Object.keys(item).forEach((key) => {
      if (key !== "tag") el.setAttribute(key, item[key]);
    });
    document.head.appendChild(el);
  });

  function renderComponents() {
    const navPlaceholder = document.getElementById("app-navbar");
    if (navPlaceholder) {
      navPlaceholder.outerHTML = `
      <nav class="navbar">
        <div class="container-fluid">
          <a href="/" class="navbar-brand">
            <img src="/icon/android-chrome-192x192.png" alt="Place Recommendations" width="32" height="32" />
            <span>PLACE RECOMMENDATIONS TELEMETRY API</span>
          </a>
          ${
            isHome
              ? `<div class="navbar-sys-info"><span class="navbar-status">[ SYS // ACTIVE ]</span></div>`
              : `<a href="/" class="back-btn"><i class="fas fa-arrow-left me-2"></i><span>[ BACK TO INDEX ]</span></a>`
          }
        </div>
      </nav>`;
    }

    const footerPlaceholder = document.getElementById("app-footer");
    if (footerPlaceholder) {
      footerPlaceholder.outerHTML = `
      <footer class="footer">
        <div class="container-fluid">
          <p>&copy; ${new Date().getFullYear()} Place Recommendations API.</p>
        </div>
      </footer>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderComponents);
  } else {
    renderComponents();
  }
})();
