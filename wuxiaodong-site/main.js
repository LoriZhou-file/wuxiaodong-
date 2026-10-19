(function () {
  'use strict';
  var UI = {
    en: { works: 'Works', concept: 'Concept', exhibitions: 'Exhibitions', video: 'Film', about: 'About', news: 'News', contact: 'Contact',
      upcoming: 'Upcoming', past: 'Past', solo: 'Solo', group: 'Group', fair: 'Fair', close: 'Close',
      writeTo: 'Email', follow: 'Follow on Instagram', rights: 'All rights reserved.' },
    zh: { works: '作品', concept: '理念', exhibitions: '展览', video: '影像', about: '关于', news: '动态', contact: '联系',
      upcoming: '即将展出', past: '往期展览', solo: '个展', group: '联展', fair: '艺博会', close: '关闭',
      writeTo: '邮箱', follow: '在 Instagram 关注', rights: '版权所有。' }
  };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var data = null, lang = 'en', visibleWorks = [], current = 0;

  function $(id) { return document.getElementById(id); }
  function tr(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[lang] || o.en || o.zh || ''; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function safeUrl(u) { return /^(https?:\/\/|mailto:|\/|images\/|media\/)/i.test(u || '') ? u : ''; }

  function readLang() {
    try { var s = localStorage.getItem('wx-lang'); if (s === 'en' || s === 'zh') return s; } catch (e) {}
    return /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  function saveLang() { try { localStorage.setItem('wx-lang', lang); } catch (e) {} }

  function fmtDate(x) {
    if (x.dateText) return tr(x.dateText);
    var s = x.start && x.start.split('-').map(Number), e = x.end && x.end.split('-').map(Number);
    if (!s) return '';
    if (!e || (s[0] === e[0] && s[1] === e[1] && s[2] === e[2])) {
      return lang === 'zh' ? s[0] + '.' + s[1] + '.' + s[2] : s[2] + ' ' + MONTHS[s[1] - 1] + ' ' + s[0];
    }
    if (lang === 'zh') {
      return s[0] + '.' + s[1] + '.' + s[2] + ' – ' + (e[0] !== s[0] ? e[0] + '.' : '') + e[1] + '.' + e[2];
    }
    if (s[0] === e[0] && s[1] === e[1]) return s[2] + '–' + e[2] + ' ' + MONTHS[s[1] - 1] + ' ' + s[0];
    if (s[0] === e[0]) return s[2] + ' ' + MONTHS[s[1] - 1] + ' – ' + e[2] + ' ' + MONTHS[e[1] - 1] + ' ' + s[0];
    return s[2] + ' ' + MONTHS[s[1] - 1] + ' ' + s[0] + ' – ' + e[2] + ' ' + MONTHS[e[1] - 1] + ' ' + e[0];
  }

  function isUpcoming(x) {
    var end = x.end || x.start; if (!end) return false;
    var d = new Date(end + 'T23:59:59'); return d >= new Date();
  }

  function renderStatic() {
    var ui = UI[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    $('lang').textContent = lang === 'zh' ? 'English' : '中文';
    document.querySelectorAll('[data-ui]').forEach(function (n) { n.textContent = ui[n.getAttribute('data-ui')]; });
    document.querySelectorAll('[data-i18n-site]').forEach(function (n) { n.textContent = tr(data.site[n.getAttribute('data-i18n-site')]); });
    document.title = (lang === 'zh' ? '吴晓东 | 艺术家官方网站' : 'Wu Xiaodong 吴晓东 | Official Artist Website');
    var meta = document.querySelector('meta[name=description]'); if (meta) meta.setAttribute('content', tr(data.site.description));
  }

  function renderHero() {
    var h = data.site.hero || {};
    var img = $('hero-img'); if (h.image) img.src = safeUrl(h.image) || img.src;
    img.alt = tr(h.title);
    $('hero-tag').textContent = tr(data.site.tagline);
    $('hero-title').textContent = tr(h.title);
    $('hero-cap').textContent = tr(h.caption);
  }

  function workMeta(w) { return [w.year, tr(w.medium), w.size].filter(Boolean).join(' · '); }

  function renderWorks() {
    var g = $('works-grid'); g.textContent = '';
    visibleWorks = (data.works || []).filter(function (w) { return w.visible !== false && w.image; });
    visibleWorks.forEach(function (w, i) {
      var b = el('button', 'card'); b.type = 'button';
      var ph = el('div', 'ph'), im = el('img'); im.src = safeUrl(w.image); im.alt = tr(w.title); im.loading = 'lazy'; ph.appendChild(im);
      b.appendChild(ph); b.appendChild(el('p', 't', tr(w.title))); b.appendChild(el('p', 'm', [w.year, w.size].filter(Boolean).join(' · ')));
      b.addEventListener('click', function () { openLb(i); });
      g.appendChild(b);
    });
  }

  function exItem(x) {
    var li = el('li');
    li.appendChild(el('div', 'd', fmtDate(x)));
    var r = el('div');
    var ti = el('div', 'ti', tr(x.title));
    if (x.kind && UI[lang][x.kind]) ti.appendChild(el('span', 'kind', UI[lang][x.kind]));
    r.appendChild(ti);
    var ve = [tr(x.venue), tr(x.city)].filter(Boolean).join(', ');
    if (ve) r.appendChild(el('div', 've', ve));
    if (tr(x.note)) r.appendChild(el('div', 'no', tr(x.note)));
    var u = safeUrl(x.link);
    if (u) { var p = el('div', 'no'), a = el('a', null, lang === 'zh' ? '相关报道' : 'More'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; p.appendChild(a); r.appendChild(p); }
    li.appendChild(r); return li;
  }

  function renderExhibitions() {
    var all = (data.exhibitions || []).slice().sort(function (a, b) { return (b.start || '').localeCompare(a.start || ''); });
    var up = all.filter(isUpcoming).sort(function (a, b) { return (a.start || '').localeCompare(b.start || ''); });
    var past = all.filter(function (x) { return !isUpcoming(x); });
    var U = $('ex-upcoming'), P = $('ex-past'); U.textContent = ''; P.textContent = '';
    up.forEach(function (x) { U.appendChild(exItem(x)); });
    past.forEach(function (x) { P.appendChild(exItem(x)); });
    $('ex-upcoming-wrap').hidden = up.length === 0;
  }

  function renderVideo() {
    var v = data.video || {}, node = $('vid');
    if (!v.src) { $('video').hidden = true; document.querySelector('a[href="#video"]').hidden = true; return; }
    if (node.getAttribute('data-src') !== v.src) { node.src = safeUrl(v.src); node.setAttribute('data-src', v.src); }
    if (v.poster) node.poster = safeUrl(v.poster);
    $('vid-cap').textContent = [tr(v.title), tr(v.caption)].filter(Boolean).join(' — ');
  }

  function renderConcept() {
    var c = data.concept || {}, sec = $('concept');
    var has = (c.sections && c.sections.length) || tr(c.intro);
    sec.hidden = !has; var nv = document.querySelector('a[href="#concept"]'); if (nv) nv.hidden = !has;
    if (!has) return;
    $('concept-intro').textContent = tr(c.intro);
    var B = $('concept-body'); B.textContent = '';
    (c.sections || []).forEach(function (s) {
      var wrap = el('div', 'c-sec');
      wrap.appendChild(el('h3', null, tr(s.title)));
      if (tr(s.lead)) wrap.appendChild(el('p', 'c-lead', tr(s.lead)));
      var g = el('div', 'c-grid');
      (s.items || []).forEach(function (it) {
        var card = el('div', 'c-card');
        card.appendChild(el('h4', null, tr(it.title)));
        card.appendChild(el('p', null, tr(it.text)));
        g.appendChild(card);
      });
      wrap.appendChild(g); B.appendChild(wrap);
    });
    var cl = $('concept-closing'); cl.textContent = tr(c.closing); cl.hidden = !tr(c.closing);
  }

  function renderAbout() {
    var a = data.about || {};
    var im = $('about-img'); if (a.portrait) { im.src = safeUrl(a.portrait); im.alt = tr(data.site.name); } else im.hidden = true;
    $('about-bio').textContent = tr(a.bio);
    var T = $('about-theory'); T.textContent = '';
    (a.theory || []).forEach(function (x) { T.appendChild(el('h4', null, tr(x.title))); T.appendChild(el('p', null, tr(x.text))); });
  }

  function renderNews() {
    var items = (data.news || []).slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
    var sec = $('news'), nav = $('nav-news'), L = $('news-list'); L.textContent = '';
    sec.hidden = nav.hidden = items.length === 0;
    items.forEach(function (n) {
      var li = el('li'); li.appendChild(el('div', 'd', n.date || '')); li.appendChild(el('div', 'ti', tr(n.title)));
      if (tr(n.text)) li.appendChild(el('p', null, tr(n.text)));
      var u = safeUrl(n.link); if (u) { var a = el('a', null, lang === 'zh' ? '查看' : 'Read'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; li.appendChild(a); }
      L.appendChild(li);
    });
  }

  function renderContact() {
    var s = data.site, ui = UI[lang], box = $('contact-lines'); box.textContent = '';
    var ig = safeUrl(s.instagram);
    if (ig) { var a = el('a', null, ui.follow + ' @' + ig.replace(/\/+$/, '').split('/').pop().split('?')[0]); a.href = ig; a.target = '_blank'; a.rel = 'noopener'; box.appendChild(a); box.appendChild(el('br')); }
    if (s.email) { box.appendChild(document.createTextNode(ui.writeTo + ': ')); var m = el('a', null, s.email); m.href = 'mailto:' + s.email; box.appendChild(m); }
    ['ig-top', 'ig-foot'].forEach(function (id) { var n = $(id); if (ig) n.href = ig; else n.hidden = true; });
    $('foot-copy').textContent = '© ' + new Date().getFullYear() + ' ' + tr(s.name) + '. ' + ui.rights;
  }

  function lbCaption(w) {
    var c = $('lb-cap'); c.textContent = '';
    c.appendChild(el('b', null, tr(w.title)));
    c.appendChild(document.createTextNode(workMeta(w)));
    if (tr(w.text)) { c.appendChild(el('br')); c.appendChild(document.createTextNode(tr(w.text))); }
  }
  function openLb(i) {
    if (!visibleWorks.length) return;
    current = (i + visibleWorks.length) % visibleWorks.length;
    var w = visibleWorks[current], im = $('lb-img');
    im.src = safeUrl(w.image); im.alt = tr(w.title); lbCaption(w);
    $('lb').hidden = false; document.body.style.overflow = 'hidden'; $('lb-x').focus();
  }
  function closeLb() { $('lb').hidden = true; document.body.style.overflow = ''; }

  function renderAll() { renderStatic(); renderHero(); renderWorks(); renderConcept(); renderExhibitions(); renderVideo(); renderAbout(); renderNews(); renderContact(); }

  function bind() {
    $('lang').addEventListener('click', function () { lang = lang === 'en' ? 'zh' : 'en'; saveLang(); renderAll(); if (!$('lb').hidden) lbCaption(visibleWorks[current]); });
    $('lb-x').addEventListener('click', closeLb);
    $('lb-prev').addEventListener('click', function () { openLb(current - 1); });
    $('lb-next').addEventListener('click', function () { openLb(current + 1); });
    $('lb').addEventListener('click', function (e) { if (e.target === $('lb')) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if ($('lb').hidden) return;
      if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') openLb(current - 1); else if (e.key === 'ArrowRight') openLb(current + 1);
    });
    var top = $('top');
    function onScroll() { top.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  lang = readLang();
  fetch('content.json?v=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { data = d; bind(); renderAll(); })
    .catch(function (e) { document.querySelector('main').insertAdjacentHTML('afterbegin', '<p style="padding:120px 24px">Content could not be loaded. / 内容加载失败。</p>'); console.error(e); });
})();
