/**
 * FOB Media — Central Data Loader
 * ─────────────────────────────────
 * All site content lives in assets/data/projects.json
 * This script loads it once and makes it available to every page.
 *
 * HOW TO ADD A NEW PROJECT:
 *   1. Open assets/data/projects.json
 *   2. Add a new object to the "projects" array
 *   3. Save — it appears on the site automatically
 *
 * HOW TO ADD A NEW TEAM MEMBER:
 *   1. Open assets/data/projects.json
 *   2. Add to "team.leadership" or "team.members"
 *
 * HOW TO ADD A NEW ARTICLE:
 *   1. Open assets/data/projects.json
 *   2. Add to the "ideas" array
 *
 * IMAGE PATHS:
 *   - Put real images in assets/images/projects/, assets/images/team/, assets/images/ideas/
 *   - Each entry has an "image" (local path) and "image_fallback" (Unsplash URL)
 *   - If the local image doesn't exist, the fallback is used automatically
 */

const FOBData = (() => {

  let _data = null;

  // ── Load JSON ──────────────────────────────────────────────
  async function load() {
    if (_data) return _data;
    try {
      const res = await fetch('assets/data/projects.json');
      _data = await res.json();
      return _data;
    } catch (e) {
      console.error('FOBData: Could not load projects.json', e);
      return null;
    }
  }

  // ── Image resolver ─────────────────────────────────────────
  // Uses image_fallback (Unsplash) until you add real local images.
  // Once you put real photos in assets/images/, update "image" in
  // projects.json to the local path and this will use them automatically.
  function img(entry) {
    return entry.image_fallback || entry.image || '';
  }

  // ── Projects ───────────────────────────────────────────────
  function getProjects(filter = 'all') {
    if (!_data) return [];
    const projects = _data.projects;
    return filter === 'all' ? projects : projects.filter(p => p.category === filter);
  }

  function getFeaturedProjects() {
    if (!_data) return [];
    return _data.projects.filter(p => p.featured);
  }

  // ── Team ───────────────────────────────────────────────────
  function getLeadership() {
    return _data?.team?.leadership || [];
  }

  function getTeamMembers() {
    return _data?.team?.members || [];
  }

  // ── Ideas / Articles ───────────────────────────────────────
  function getArticles(filter = 'all') {
    if (!_data) return [];
    const articles = _data.ideas;
    return filter === 'all' ? articles : articles.filter(a => a.category === filter);
  }

  function getHeroArticle() {
    if (!_data) return null;
    const heroId = _data.settings.hero_featured_article;
    return _data.ideas.find(a => a.id === heroId) || _data.ideas[0];
  }

  // ── Settings ───────────────────────────────────────────────
  function getSettings() {
    return _data?.settings || {};
  }

  // ── Renderers ──────────────────────────────────────────────

  function renderWorkRow(p, index) {
    const num = String(index + 1).padStart(2, '0');
    return `
      <div class="work-row" data-image="${img(p)}">
        <span class="work-row-num">${num}</span>
        <span class="work-row-title">${p.title}</span>
        <span class="work-row-client">${p.client}</span>
        <span class="work-row-type">${p.type}</span>
        <span class="work-row-arrow">→</span>
      </div>`;
  }

  function renderWorkCard(p) {
    return `
      <div class="work-card">
        <img src="${img(p)}" alt="${p.title}" loading="lazy">
        <div class="work-overlay">
          <div class="work-client">${p.client}</div>
          <div class="work-title">${p.title}</div>
        </div>
        <div class="work-arrow">
          <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>`;
  }

  function renderFeaturedCard(p) {
    return `
      <div class="featured-card">
        <img src="${img(p)}" alt="${p.title}" loading="lazy">
        <div class="featured-info">
          <div class="featured-client">${p.client}</div>
          <div class="featured-title">${p.title}</div>
        </div>
      </div>`;
  }

  function renderMosaicCard(p) {
    return `
      <div class="work-card">
        <img src="${img(p)}" alt="${p.title}" loading="lazy">
        <div class="work-overlay">
          <div class="work-client">${p.client}</div>
          <div class="work-title">${p.title}</div>
        </div>
      </div>`;
  }

  function renderLeaderCard(m) {
    return `
      <div class="member-card">
        <div class="member-card-inner">
          <img src="${img(m)}" alt="${m.name}" loading="lazy">
          <div class="member-overlay">
            <p class="member-bio">${m.bio}</p>
            <div class="member-links">
              <a href="${m.linkedin || '#'}" class="member-link">LinkedIn</a>
              <a href="${m.vimeo || '#'}" class="member-link">Vimeo</a>
            </div>
          </div>
        </div>
        <div class="member-info">
          <p class="member-role">${m.role}</p>
          <p class="member-name">${m.name}</p>
        </div>
      </div>`;
  }

  function renderTeamCard(m) {
    return `
      <div class="team-member">
        <div class="team-member-inner">
          <img src="${img(m)}" alt="${m.name}" loading="lazy">
          <div class="team-member-overlay">
            <p class="team-member-role">${m.role}</p>
            <p class="team-member-name">${m.name}</p>
          </div>
        </div>
      </div>`;
  }

  function renderArticleCard(a) {
    const authorImg = a.authorImage_fallback || a.authorImage;
    return `
      <a href="#" class="article-card">
        <div class="article-card-image">
          <img src="${img(a)}" alt="${a.title}" loading="lazy">
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="article-card-category">${a.tag}</span>
            <span class="article-card-date">${a.date}</span>
          </div>
          <h3 class="article-card-title">${a.title}</h3>
          <p class="article-card-excerpt">${a.excerpt}</p>
          <div class="article-card-author">
            <img src="${authorImg}" alt="${a.author}" class="author-avatar">
            <span class="author-name">${a.author}</span>
            <span class="author-read-time">${a.readTime}</span>
          </div>
        </div>
      </a>`;
  }

  function renderListArticle(a) {
    return `
      <a href="#" class="list-article">
        <div class="list-article-thumb">
          <img src="${img(a)}" alt="${a.title}" loading="lazy">
        </div>
        <div class="list-article-body">
          <p class="list-article-category">${a.tag}</p>
          <h3 class="list-article-title">${a.title}</h3>
          <p class="list-article-excerpt">${a.excerpt}</p>
        </div>
        <div class="list-article-right">
          <span class="list-article-date">${a.date}</span>
          <span class="list-article-arrow">→</span>
        </div>
      </a>`;
  }

  // ── Scroll fade-in helper ──────────────────────────────────
  function observeFadeIn(selector, stagger = 0.08) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.7s ${i * stagger}s ease, transform 0.7s ${i * stagger}s ease`;
      observer.observe(el);
    });
  }

  // ── Cursor helper ──────────────────────────────────────────
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animate);
    };
    animate();
  }

  return { load, img, getProjects, getFeaturedProjects, getLeadership, getTeamMembers, getArticles, getHeroArticle, getSettings, renderWorkRow, renderWorkCard, renderFeaturedCard, renderMosaicCard, renderLeaderCard, renderTeamCard, renderArticleCard, renderListArticle, observeFadeIn, initCursor };

})();