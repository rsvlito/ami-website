// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Menu tabs — smooth scroll to section
const menuTabs = document.querySelectorAll('.menu-tab');
const menuTabsBar = document.getElementById('menuTabsBar');

if (menuTabs.length) {
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const tabsHeight = menuTabsBar ? menuTabsBar.offsetHeight : 50;
        const offset = navHeight + tabsHeight + 8;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active tab on scroll
  const sections = Array.from(menuTabs).map(t => document.getElementById(t.dataset.target)).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        menuTabs.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.target === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

// Menu sidebar toggle (mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
const menuSidebar = document.getElementById('menuSidebar');

function toggleSidebar() {
  if (!menuSidebar) return;
  menuSidebar.classList.toggle('open');
}

if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
if (mobileSidebarBtn) mobileSidebarBtn.addEventListener('click', toggleSidebar);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (!menuSidebar) return;
  if (
    menuSidebar.classList.contains('open') &&
    !menuSidebar.contains(e.target) &&
    e.target !== sidebarToggle &&
    e.target !== mobileSidebarBtn &&
    !mobileSidebarBtn?.contains(e.target)
  ) {
    menuSidebar.classList.remove('open');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
