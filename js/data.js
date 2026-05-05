/**
 * BOLD UNITY CREATIVE — Central Data Loader  (v3 — load-order safe)
 * ─────────────────────────────────────────────────────────────
 * KEY CHANGES vs v2:
 *   - Wrapped in an IIFE that writes to window.FOBData immediately
 *     so the global exists the instant this file is parsed,
 *     regardless of whether it lives in <head> or <body>.
 *   - load() returns a shared cached Promise — multiple callers
 *     on the same page never fire more than one fetch.
 *   - Inline scripts on every page should be wrapped in
 *     DOMContentLoaded to guarantee the DOM is ready.
 *
 * HOW TO USE ON ANY PAGE
 * ───────────────────────
 * In <head> (preferred) or top of <body>:
 *   <script src="js/data.js"></script>
 *
 * In your inline script at the bottom of <body>:
 *   document.addEventListener('DOMContentLoaded', function () {
 *     FOBData.initCursor();
 *     FOBData.load().then(function () {
 *       // render your content here
 *     });
 *   });
 *
 * HOW TO ADD CONTENT
 * ───────────────────
 *   Projects    → assets/data/projects.json  "projects" array
 *   Team        → assets/data/projects.json  "team.leadership" / "team.members"
 *   Articles    → assets/data/projects.json  "ideas" array
 */

(function (global) {
  'use strict';

  var _data        = null;
  var _loadPromise = null;

  // ── Load ───────────────────────────────────────────────────
  function load() {
    if (_loadPromise) return _loadPromise;
    _loadPromise = fetch('assets/data/projects.json')
      .then(function (res) {
        if (!res.ok) throw new Error('projects.json: HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        _data = json;
        return json;
      })
      .catch(function (err) {
        console.error('[FOBData] Could not load projects.json —', err.message);
        _loadPromise = null; // allow retry on next call
        return null;
      });
    return _loadPromise;
  }

  // ── Image helper ───────────────────────────────────────────
  function img(entry) {
    if (!entry) return '';
    return entry.image_fallback || entry.image || '';
  }

  // ── Accessors ──────────────────────────────────────────────
  function getProjects(filter) {
    if (!_data) return [];
    var list = _data.projects || [];
    return (!filter || filter === 'all') ? list : list.filter(function (p) { return p.category === filter; });
  }

  function getFeaturedProjects() {
    if (!_data) return [];
    return (_data.projects || []).filter(function (p) { return p.featured; });
  }

  function getLeadership() {
    return (_data && _data.team && _data.team.leadership) || [];
  }

  function getTeamMembers() {
    return (_data && _data.team && _data.team.members) || [];
  }

  function getArticles(filter) {
    if (!_data) return [];
    var list = _data.ideas || [];
    return (!filter || filter === 'all') ? list : list.filter(function (a) { return a.category === filter; });
  }

  function getHeroArticle() {
    if (!_data) return null;
    var heroId = _data.settings && _data.settings.hero_featured_article;
    var list   = _data.ideas || [];
    return list.find(function (a) { return a.id === heroId; }) || list[0] || null;
  }

  function getSettings() {
    return (_data && _data.settings) || {};
  }

  // ── Renderers ──────────────────────────────────────────────

  function renderWorkRow(p, index) {
    var num = String(index + 1).padStart(2, '0');
    return [
      '<a class="work-row" href="project-detail.html?id=', p.id, '" data-image="', img(p), '">',
        '<span class="work-row-num">',    num,      '</span>',
        '<span class="work-row-title">',  p.title,  '</span>',
        '<span class="work-row-client">', p.client, '</span>',
        '<span class="work-row-type">',   p.type,   '</span>',
        '<span class="work-row-arrow">→</span>',
      '</a>',
    ].join('');
  }

  function renderWorkCard(p) {
    return [
      '<a class="work-card" href="project-detail.html?id=', p.id, '">',
        '<img src="', img(p), '" alt="', p.title, '" loading="lazy">',
        '<div class="work-overlay">',
          '<div class="work-client">', p.client, '</div>',
          '<div class="work-title">',  p.title,  '</div>',
        '</div>',
        '<div class="work-arrow">',
          '<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '</div>',
      '</a>',
    ].join('');
  }

  function renderFeaturedCard(p) {
    return [
      '<a class="featured-card" href="project-detail.html?id=', p.id, '">',
        '<img src="', img(p), '" alt="', p.title, '" loading="lazy">',
        '<div class="featured-info">',
          '<div class="featured-client">', p.client, '</div>',
          '<div class="featured-title">',  p.title,  '</div>',
        '</div>',
      '</a>',
    ].join('');
  }

  function renderMosaicCard(p) {
    return [
      '<a class="work-card" href="project-detail.html?id=', p.id, '">',
        '<img src="', img(p), '" alt="', p.title, '" loading="lazy">',
        '<div class="work-overlay">',
          '<div class="work-client">', p.client, '</div>',
          '<div class="work-title">',  p.title,  '</div>',
        '</div>',
      '</a>',
    ].join('');
  }

  function renderLeaderCard(m) {
    return [
      '<div class="member-card">',
        '<div class="member-card-inner">',
          '<img src="', img(m), '" alt="', m.name, '" loading="lazy">',
          '<div class="member-overlay">',
            '<p class="member-bio">', m.bio, '</p>',
            '<div class="member-links">',
              '<a href="', (m.linkedin || '#'), '" class="member-link" target="_blank" rel="noopener">LinkedIn</a>',
              '<a href="', (m.vimeo    || '#'), '" class="member-link" target="_blank" rel="noopener">Vimeo</a>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="member-info">',
          '<p class="member-role">', m.role, '</p>',
          '<p class="member-name">', m.name, '</p>',
        '</div>',
      '</div>',
    ].join('');
  }

  function renderTeamCard(m) {
    return [
      '<div class="team-member">',
        '<div class="team-member-inner">',
          '<img src="', img(m), '" alt="', m.name, '" loading="lazy">',
          '<div class="team-member-overlay">',
            '<p class="team-member-role">', m.role, '</p>',
            '<p class="team-member-name">', m.name, '</p>',
          '</div>',
        '</div>',
      '</div>',
    ].join('');
  }

  function renderArticleCard(a) {
    var authorImg = a.authorImage_fallback || a.authorImage || '';
    return [
      '<a href="#" class="article-card">',
        '<div class="article-card-image">',
          '<img src="', img(a), '" alt="', a.title, '" loading="lazy">',
        '</div>',
        '<div class="article-card-body">',
          '<div class="article-card-meta">',
            '<span class="article-card-category">', a.tag,  '</span>',
            '<span class="article-card-date">',     a.date, '</span>',
          '</div>',
          '<h3 class="article-card-title">',  a.title,   '</h3>',
          '<p class="article-card-excerpt">', a.excerpt,  '</p>',
          '<div class="article-card-author">',
            '<img src="', authorImg, '" alt="', a.author, '" class="author-avatar">',
            '<span class="author-name">',      a.author,   '</span>',
            '<span class="author-read-time">', a.readTime, '</span>',
          '</div>',
        '</div>',
      '</a>',
    ].join('');
  }

  function renderListArticle(a) {
    return [
      '<a href="#" class="list-article">',
        '<div class="list-article-thumb">',
          '<img src="', img(a), '" alt="', a.title, '" loading="lazy">',
        '</div>',
        '<div class="list-article-body">',
          '<p class="list-article-category">',  a.tag,    '</p>',
          '<h3 class="list-article-title">',    a.title,  '</h3>',
          '<p class="list-article-excerpt">',   a.excerpt, '</p>',
        '</div>',
        '<div class="list-article-right">',
          '<span class="list-article-date">',   a.date, '</span>',
          '<span class="list-article-arrow">→</span>',
        '</div>',
      '</a>',
    ].join('');
  }

  // ── Utilities ──────────────────────────────────────────────

  function observeFadeIn(selector, stagger) {
    stagger = (typeof stagger === 'number') ? stagger : 0.08;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(selector).forEach(function (el, i) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s ' + (i * stagger) + 's ease, '
                          + 'transform 0.7s ' + (i * stagger) + 's ease';
      observer.observe(el);
    });
  }

  function initCursor() {
    var cursor = document.getElementById('cursor');
    var ring   = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function tick() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    }());
  }

  // ── Export ─────────────────────────────────────────────────
  global.FOBData = {
    load               : load,
    img                : img,
    getProjects        : getProjects,
    getFeaturedProjects: getFeaturedProjects,
    getLeadership      : getLeadership,
    getTeamMembers     : getTeamMembers,
    getArticles        : getArticles,
    getHeroArticle     : getHeroArticle,
    getSettings        : getSettings,
    renderWorkRow      : renderWorkRow,
    renderWorkCard     : renderWorkCard,
    renderFeaturedCard : renderFeaturedCard,
    renderMosaicCard   : renderMosaicCard,
    renderLeaderCard   : renderLeaderCard,
    renderTeamCard     : renderTeamCard,
    renderArticleCard  : renderArticleCard,
    renderListArticle  : renderListArticle,
    observeFadeIn      : observeFadeIn,
    initCursor         : initCursor,
  };

}(window));