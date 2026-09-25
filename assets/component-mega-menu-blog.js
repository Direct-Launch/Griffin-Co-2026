/* Mega menu sliders (blog posts, products): previous/next arrows.
   Delegated from document, so it works however many menus render and needs
   no init after the (hidden-until-hover) dropdown opens. */
(function () {
  if (window.__megaMenuBlogInit) return;
  window.__megaMenuBlogInit = true;

  function trackFor(button) {
    var id = button.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  function updateArrows(track) {
    var root = track.closest('[data-mm-slider-root], .mega-menu-blog');
    if (!root) return;
    var max = track.scrollWidth - track.clientWidth - 1;
    var prev = root.querySelector('[data-mega-menu-blog-prev]');
    var next = root.querySelector('[data-mega-menu-blog-next]');
    if (prev) prev.disabled = track.scrollLeft <= 0;
    if (next) next.disabled = track.scrollLeft >= max;
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-mega-menu-blog-prev], [data-mega-menu-blog-next]');
    if (!button) return;
    var track = trackFor(button);
    if (!track) return;
    event.preventDefault();
    var item = track.querySelector(track.getAttribute('data-item-selector') || '.mega-menu-blog__item');
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    var step = item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    var direction = button.hasAttribute('data-mega-menu-blog-prev') ? -1 : 1;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  });

  // Scroll events don't bubble; capture them to keep arrow states current.
  document.addEventListener('scroll', function (event) {
    var track = event.target;
    if (track && track.hasAttribute && track.hasAttribute('data-mega-menu-blog-track')) {
      updateArrows(track);
    }
  }, true);

  // Initial state (next is enabled in markup; correct it if nothing overflows).
  function initAll() {
    document.querySelectorAll('[data-mega-menu-blog-track]').forEach(updateArrows);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  document.addEventListener('mouseover', function (event) {
    var root = event.target.closest && event.target.closest('[data-mm-slider-root], .mega-menu-blog--carousel');
    if (root) {
      var track = root.querySelector('[data-mega-menu-blog-track]');
      if (track) updateArrows(track);
    }
  }, { passive: true });
})();
