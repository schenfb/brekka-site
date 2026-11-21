/* Brekka — small progressive enhancements.

   The page is fully visible and navigable without this file. On small screens
   the navigation is only collapsed behind the menu button once this script has
   wired the button up: the `nav-ready` class is added last, so a script that
   fails to load, or stops early, leaves the plain always-visible navigation. */
(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  var mobile = window.matchMedia('(max-width: 760px)');

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setNav(!isOpen());
  });

  // Following a link closes the menu.
  nav.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('a')) setNav(false);
  });

  // Escape closes the menu and returns focus to the button.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setNav(false);
      toggle.focus();
    }
  });

  // A click or tap outside the header closes the menu.
  document.addEventListener('click', function (event) {
    if (isOpen() && !header.contains(event.target)) setNav(false);
  });

  // Crossing the breakpoint: reset the menu and never leave keyboard focus on a
  // control that has just been hidden.
  function onBreakpoint() {
    var active = document.activeElement;
    setNav(false);
    if (mobile.matches) {
      // Desktop to mobile: the links are now inside the closed menu.
      if (active && nav.contains(active)) toggle.focus();
    } else if (active === toggle) {
      // Mobile to desktop: the menu button is now hidden.
      var first = nav.querySelector('a');
      if (first) first.focus();
    }
  }
  if (mobile.addEventListener) {
    mobile.addEventListener('change', onBreakpoint);
  } else if (mobile.addListener) {
    mobile.addListener(onBreakpoint);
  }

  // Hairline under the header once the page has scrolled.
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Everything is wired up: it is now safe to collapse the mobile navigation.
  root.classList.add('nav-ready');
})();
