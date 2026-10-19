(function () {
  'use strict';
  var app = document.getElementById('app');
  var pw = '', content = null, baseSha = '', dirty = false, tab = 'exhibitions';

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function uid() { return 'i' + Math.random().toString(36).slice(2, 9); }
  function setStatus(msg, err) { var s = document.getElementById('status'); if (s) { s.textContent = msg || ''; s.className = err ? 'err' : ''; } }
  function markDirty() { dirty = true; var b = document.getElementById('save'); if (b) b.disabled = false; setStatus('有未保存的修改'); }
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  function api(path, opts) {
    opts = opts || {};
    return fetch(path, {
      method: opts.method || 'GET',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status)); return j; }); });
  }

  /* ---------- field builders ---------- */
  function text(obj, key, label, opts) {
    opts = opts || {};
    var i = h('input', { type: opts.type || 'text', value: obj[key] == null ? '' : obj[key] });
    i.addEventListener('input', function () { obj[key] = i.value; markDirty(); if (opts.onchange) opts.onchange(); });
    return h('div', null, [h('label', { text: label }), i, opts.hint ? h('div', { class: 'hint', text: opts.hint }) : null]);
  }
  function bi(obj, key, label, multiline) {
    if (!obj[key] || typeof obj[key] !== 'object') obj[key] = { en: '', zh: '' };
    var o = obj[key];
    function box(l, k) {
      var f = multiline ? h('textarea') : h('input', { type: 'text' });
      f.value = o[k] || '';
      f.addEventListener('input', function () { o[k] = f.value; markDirty(); });
      return h('div', null, [h('span', { text: l }), f]);
    }
    return h('div', null, [h('label', { text: label }), h('div', { class: 'bi' }, [box('English', 'en'), box('中文', 'zh')])]);
  }
  function select(obj, key, label, options) {
    var s = h('select');
    options.forEach(function (o) { var op = h('option', { value: o[0], text: o[1] }); if (obj[key] === o[0]) op.selected = true; s.appendChild(op); });
    s.addEventListener('change', function () { obj[key] = s.value; markDirty(); });
    return h('div', null, [h('label', { text: label }), s]);
  }
  function check(obj, key, label) {
    var c = h('input', { type: 'checkbox' }); c.checked = obj[key] !== false;
    c.addEventListener('change', function () { obj[key] = c.checked; markDirty(); });
    return h('label', { class: 'check' }, [c, label]);
  }
  function prev(p) { return !p ? '' : (/^https?:/i.test(p) ? p : '../' + p.replace(/^\/+/, '')); }

  function resizeToJpeg(file, maxSide) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var s = Math.min(1, maxSide / Math.max(im.width, im.height));
        var c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL('image/jpeg', 0.86).split(',')[1]);
      };
      im.onerror = function () { rej(new Error('无法读取这张图片')); };
      im.src = url;
    });
  }
  function image(obj, key, label) {
    var pic = h('img', { src: prev(obj[key]), alt: '' });
    var path = h('input', { type: 'text', value: obj[key] || '' });
    path.addEventListener('input', function () { obj[key] = path.value; pic.src = prev(path.value); markDirty(); });
    var file = h('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp' });
    var msg = h('div', { class: 'hint' });
    file.addEventListener('change', function () {
      var f = file.files[0]; if (!f) return;
      msg.textContent = '正在处理并上传…';
      resizeToJpeg(f, 2400).then(function (b64) {
        return api('/api/upload', { method: 'POST', body: { name: f.name, type: 'image/jpeg', data: b64 } });
      }).then(function (r) {
        obj[key] = r.path; path.value = r.path; pic.src = prev(r.path); msg.textContent = '已上传。记得点右上角“保存”。'; markDirty();
      }).catch(function (e) { msg.textContent = '上传失败:' + e.message; });
    });
    return h('div', null, [h('label', { text: label }), h('div', { class: 'img' }, [pic, h('div', { class: 'tools' }, [file, path, msg])])]);
  }

  /* ---------- list editor ---------- */
  function list(arr, opts) {
    var wrap = h('div');
    function draw() {
      wrap.textContent = '';
      wrap.appendChild(h('button', { class: 'primary small', text: '+ 新增', onclick: function () { arr.unshift(opts.blank()); markDirty(); draw(); } }));
      arr.forEach(function (it, i) {
        var d = h('details', { class: 'item' });
        d.appendChild(h('summary', null, [
          h('span', { class: 't', text: opts.title(it) || '(未命名)' }),
          h('span', { class: 's', text: opts.sub ? opts.sub(it) : '' }),
          h('button', { class: 'small', text: '↑', onclick: function (e) { e.preventDefault(); if (i > 0) { var x = arr.splice(i, 1)[0]; arr.splice(i - 1, 0, x); markDirty(); draw(); } } }),
          h('button', { class: 'small', text: '↓', onclick: function (e) { e.preventDefault(); if (i < arr.length - 1) { var x = arr.splice(i, 1)[0]; arr.splice(i + 1, 0, x); markDirty(); draw(); } } }),
          h('button', { class: 'small danger', text: '删除', onclick: function (e) { e.preventDefault(); if (confirm('确定删除这一条吗?')) { arr.splice(i, 1); markDirty(); draw(); } } })
        ]));
        d.appendChild(h('div', { class: 'body' }, opts.fields(it)));
        wrap.appendChild(d);
      });
      if (!arr.length) wrap.appendChild(h('p', { class: 'hint', text: '还没有内容。点“+ 新增”。' }));
    }
    draw(); return wrap;
  }

  /* ---------- tabs ---------- */
  var TABS = [['exhibitions', '展览'], ['works', '作品'], ['concept', '理念'], ['news', '动态'], ['about', '关于'], ['video', '影像'], ['site', '基本信息']];

  function viewExhibitions() {
    return list(content.exhibitions, {
      blank: function () { return { id: uid(), start: '', end: '', kind: 'solo', title: { en: '', zh: '' }, venue: { en: '', zh: '' }, city: { en: '', zh: '' }, note: { en: '', zh: '' }, link: '' }; },
      title: function (x) { return (x.title && (x.title.zh || x.title.en)) || ''; },
      sub: function (x) { return (x.start || '').slice(0, 7); },
      fields: function (x) {
        return [
          bi(x, 'title', '展览名称'), bi(x, 'venue', '场馆'), bi(x, 'city', '城市(可留空)'),
          h('div', { class: 'row2' }, [text(x, 'start', '开始日期', { type: 'date' }), text(x, 'end', '结束日期', { type: 'date' })]),
          bi(x, 'dateText', '日期显示文字(可留空;只知道月份时填,如 November 2026 / 2026年11月)'),
          select(x, 'kind', '类型', [['solo', '个展'], ['group', '联展'], ['fair', '艺博会']]),
          bi(x, 'note', '备注(可留空)'),
          text(x, 'link', '相关链接(可留空)', { hint: '以 https:// 开头。' })
        ];
      }
    });
  }
  function viewWorks() {
    return list(content.works, {
      blank: function () { return { id: uid(), title: { en: '', zh: '' }, year: '', medium: { en: 'Mineral pigment and watercolour on Xuan paper', zh: '宣纸纸本、矿物质颜料、水彩' }, size: '', image: '', text: { en: '', zh: '' }, visible: true }; },
      title: function (x) { return (x.title && (x.title.zh || x.title.en)) || ''; },
      sub: function (x) { return x.year || ''; },
      fields: function (x) {
        return [
          bi(x, 'title', '作品名称'),
          h('div', { class: 'row2' }, [text(x, 'year', '年份'), text(x, 'size', '尺寸', { hint: '例:180 × 140 cm' })]),
          bi(x, 'medium', '材料'), image(x, 'image', '图片'), bi(x, 'text', '作品说明', true), check(x, 'visible', '在网站上显示')
        ];
      }
    });
  }
  function viewNews() {
    return list(content.news, {
      blank: function () { return { id: uid(), date: new Date().toISOString().slice(0, 10), title: { en: '', zh: '' }, text: { en: '', zh: '' }, link: '' }; },
      title: function (x) { return (x.title && (x.title.zh || x.title.en)) || ''; },
      sub: function (x) { return x.date || ''; },
      fields: function (x) { return [text(x, 'date', '日期', { type: 'date' }), bi(x, 'title', '标题'), bi(x, 'text', '内容', true), text(x, 'link', '链接(可留空)')]; }
    });
  }
  function viewAbout() {
    var a = content.about; if (!a.theory) a.theory = [];
    return h('div', { class: 'panel' }, [
      image(a, 'portrait', '艺术家照片'), bi(a, 'bio', '艺术家简介', true),
      h('h2', { text: '理念条目' }),
      list(a.theory, {
        blank: function () { return { title: { en: '', zh: '' }, text: { en: '', zh: '' } }; },
        title: function (x) { return (x.title && (x.title.zh || x.title.en)) || ''; },
        fields: function (x) { return [bi(x, 'title', '标题'), bi(x, 'text', '内容', true)]; }
      })
    ]);
  }
  function viewConcept() {
    var c = content.concept; if (!c) c = content.concept = { title: { en: 'Concept', zh: '理念' }, intro: { en: '', zh: '' }, sections: [], closing: { en: '', zh: '' } };
    if (!c.sections) c.sections = [];
    return h('div', { class: 'panel' }, [
      h('p', { class: 'hint', text: '网站“理念”栏目。分成若干小节,每节下有若干条目。全部清空则该栏目自动隐藏。' }),
      bi(c, 'intro', '栏目导语', true),
      h('h2', { text: '小节(↑↓ 可调整顺序)' }),
      list(c.sections, {
        blank: function () { return { title: { en: '', zh: '' }, lead: { en: '', zh: '' }, items: [] }; },
        title: function (x) { return (x.title && (x.title.zh || x.title.en)) || '(未命名小节)'; },
        sub: function (x) { return (x.items || []).length + ' 条'; },
        fields: function (x) {
          if (!x.items) x.items = [];
          return [bi(x, 'title', '小节标题'), bi(x, 'lead', '小节说明(可留空)', true), h('h2', { text: '本节条目' }),
            list(x.items, {
              blank: function () { return { title: { en: '', zh: '' }, text: { en: '', zh: '' } }; },
              title: function (y) { return (y.title && (y.title.zh || y.title.en)) || '(未命名条目)'; },
              fields: function (y) { return [bi(y, 'title', '条目标题'), bi(y, 'text', '条目内容', true)]; }
            })];
        }
      }),
      h('h2', { text: '栏目结语' }), bi(c, 'closing', '结语(可留空)', true)
    ]);
  }
  function viewVideo() {
    var v = content.video;
    return h('div', { class: 'panel' }, [
      text(v, 'src', '视频地址', { hint: '网站内的文件(如 media/xxx.mp4)或以 https:// 开头的直链。大视频请先放进 GitHub 仓库的 media 文件夹。留空则隐藏影像栏目。' }),
      image(v, 'poster', '封面图'), bi(v, 'title', '标题'), bi(v, 'caption', '说明')
    ]);
  }
  function viewSite() {
    var s = content.site; if (!s.hero) s.hero = {};
    return h('div', { class: 'panel' }, [
      bi(s, 'name', '艺术家姓名'), bi(s, 'tagline', '首页标语'), bi(s, 'description', '网站简介(搜索引擎显示)', true),
      text(s, 'instagram', 'Instagram 链接', { hint: '例:https://www.instagram.com/wuxiaodong.art' }),
      text(s, 'email', '联系邮箱(留空则不显示)'),
      h('h2', { text: '首页大图' }), image(s.hero, 'image', '图片'), bi(s.hero, 'title', '作品名'), bi(s.hero, 'caption', '说明')
    ]);
  }
  var VIEWS = { exhibitions: viewExhibitions, works: viewWorks, concept: viewConcept, news: viewNews, about: viewAbout, video: viewVideo, site: viewSite };

  function save() {
    var b = document.getElementById('save'); b.disabled = true; setStatus('正在保存…');
    api('/api/save', { method: 'POST', body: { content: content, baseSha: baseSha } }).then(function (r) {
      baseSha = r.sha; dirty = false; setStatus('已保存。网站约 30–60 秒后更新。');
    }).catch(function (e) { b.disabled = false; setStatus('保存失败:' + e.message, true); });
  }

  function drawEditor() {
    app.textContent = '';
    app.appendChild(h('header', null, [
      h('h1', { text: '网站后台 · 吴晓东' }), h('span', { id: 'status' }),
      h('a', { href: '../', target: '_blank', rel: 'noopener', text: '查看网站 ↗' }),
      h('button', { id: 'save', class: 'primary', text: '保存', disabled: dirty ? false : 'disabled', onclick: save })
    ]));
    var nav = h('nav');
    TABS.forEach(function (t) { nav.appendChild(h('button', { class: t[0] === tab ? 'on' : '', text: t[1], onclick: function () { tab = t[0]; drawEditor(); } })); });
    app.appendChild(nav);
    app.appendChild(h('main', null, [VIEWS[tab]()]));
    if (!dirty) document.getElementById('save').disabled = true;
  }

  function loadAll() {
    return api('/api/content').then(function (r) { content = r.content; baseSha = r.sha; dirty = false; drawEditor(); });
  }

  function drawLogin(err) {
    app.textContent = '';
    var i = h('input', { type: 'password', autocomplete: 'current-password', autofocus: 'autofocus' });
    var m = h('div', { class: 'hint', text: err || '' }); if (err) m.style.color = '#a33a2c';
    function go() {
      pw = i.value; m.textContent = '登录中…'; m.style.color = '';
      loadAll().catch(function (e) { pw = ''; drawLogin(e.message); });
    }
    i.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    app.appendChild(h('div', { class: 'login' }, [h('h1', { text: '网站后台' }), h('label', { text: '密码' }), i, h('div', { style: 'margin-top:14px' }, [h('button', { class: 'primary', text: '登录', onclick: go })]), m]));
  }
  drawLogin();
})();
