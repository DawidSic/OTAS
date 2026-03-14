(() => {
    const btn = document.querySelector("[data-menu-button]");
    const menu = document.getElementById("mobile-menu");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const closeBtn = document.querySelector("[data-menu-close]");
    const links = document.querySelectorAll("[data-menu-link]");
  
    if (!btn || !menu || !backdrop) return;
  
    const openMenu = () => {
      menu.hidden = false;
      backdrop.hidden = false;
  
      // Force reflow so transitions (if you add them) can run
      menu.classList.add("is-open");
      backdrop.classList.add("is-open");
  
      btn.setAttribute("aria-expanded", "true");
      document.documentElement.style.overflow = "hidden"; // lock scroll
      // Focus first link for accessibility
      const firstLink = menu.querySelector("a, button");
      firstLink && firstLink.focus();
    };
  
    const closeMenu = () => {
      menu.classList.remove("is-open");
      backdrop.classList.remove("is-open");
  
      menu.hidden = true;
      backdrop.hidden = true;
  
      btn.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
      btn.focus();
    };
  
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
  
    closeBtn && closeBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
  
    links.forEach(a => a.addEventListener("click", closeMenu));
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    });
  })();