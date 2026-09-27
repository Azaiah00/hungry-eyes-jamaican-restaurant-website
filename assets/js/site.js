/* Hungry Eyes — site interactions (vanilla, no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu';
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setOpen(false);
    });
  }

  /* ---------- Hours / open-now (America/New_York) ---------- */
  // minutes from midnight; index 0 = Sunday
  var HOURS = [
    [12 * 60, 18 * 60],          // Sun 12pm–6pm
    [11 * 60 + 30, 19 * 60],     // Mon 11:30am–7pm
    [11 * 60, 21 * 60],          // Tue 11am–9pm
    [11 * 60, 21 * 60],          // Wed
    [11 * 60, 21 * 60],          // Thu
    [11 * 60, 22 * 60],          // Fri 11am–10pm
    [11 * 60, 22 * 60]           // Sat
  ];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var ap = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ':' + (m < 10 ? '0' : '') + m : '') + ' ' + ap;
  }

  function nyNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      var hour = parseInt(map.hour, 10) % 24;
      return { day: day, mins: hour * 60 + parseInt(map.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function updateStatus() {
    var now = nyNow();
    var today = HOURS[now.day];
    var open = now.mins >= today[0] && now.mins < today[1];
    var text;
    if (open) {
      text = 'Open now · until ' + fmt(today[1]);
    } else if (now.mins < today[0]) {
      text = 'Closed now · opens today ' + fmt(today[0]);
    } else {
      var next = (now.day + 1) % 7;
      text = 'Closed now · opens ' + DAYS[next] + ' ' + fmt(HOURS[next][0]);
    }
    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      var t = el.querySelector('.status-text');
      if (t) t.textContent = text;
    });
    document.querySelectorAll('[data-day]').forEach(function (row) {
      row.classList.toggle('is-today', parseInt(row.getAttribute('data-day'), 10) === now.day);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Menu page: highlight current section chip ---------- */
  var menuLinks = document.querySelectorAll('.menu-nav a[href^="#"]');
  if (menuLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    menuLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && byId[en.target.id]) {
          menuLinks.forEach(function (a) { a.classList.remove('is-active'); });
          byId[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) secObs.observe(s);
    });
  }

  if (reduceMotion) return; // everything below is motion

  /* ---------- Reveal + wipe + equalizer ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal, .wipe').forEach(function (el) { io.observe(el); });

    var eqObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('playing', en.isIntersecting); });
    }, { threshold: 0.05 });
    document.querySelectorAll('.eq').forEach(function (el) { eqObs.observe(el); });
  } else {
    document.querySelectorAll('.reveal, .wipe').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Eyes: blink + pupil follows scroll (and pointer on desktop) ---------- */
  var eyes = Array.prototype.slice.call(document.querySelectorAll('svg.eye'));
  var pointer = null;
  var pointerTimer = null;

  function blink(eye) {
    eye.classList.add('is-blinking');
    setTimeout(function () { eye.classList.remove('is-blinking'); }, 150);
  }
  function scheduleBlink() {
    setTimeout(function () {
      // blink visible eyes together (like a face), occasionally double-blink
      var visible = eyes.filter(function (e) {
        var r = e.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight;
      });
      visible.forEach(blink);
      if (Math.random() < 0.25) setTimeout(function () { visible.forEach(blink); }, 260);
      scheduleBlink();
    }, 2600 + Math.random() * 3200);
  }
  if (eyes.length) {
    scheduleBlink();
    if (finePointer) {
      window.addEventListener('pointermove', function (e) {
        pointer = { x: e.clientX, y: e.clientY };
        clearTimeout(pointerTimer);
        pointerTimer = setTimeout(function () { pointer = null; requestTick(); }, 2500);
        requestTick();
      }, { passive: true });
    }
  }

  function updateEyes() {
    var max = doc.scrollHeight - window.innerHeight;
    var progress = max > 0 ? window.scrollY / max : 0; // 0..1
    eyes.forEach(function (eye) {
      var iris = eye.querySelector('.eye-iris');
      if (!iris) return;
      var range = parseFloat(eye.getAttribute('data-range')) || 22;
      var dx, dy;
      if (pointer) {
        var r = eye.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var ang = Math.atan2(pointer.y - cy, pointer.x - cx);
        var dist = Math.min(1, Math.hypot(pointer.x - cx, pointer.y - cy) / 300);
        dx = Math.cos(ang) * range * dist;
        dy = Math.sin(ang) * range * 0.55 * dist;
      } else {
        // pupil sweeps left -> right as you read down the page, with a gentle bob
        dx = (progress * 2 - 1) * range;
        dy = Math.sin(progress * Math.PI * 3) * range * 0.28;
      }
      iris.setAttribute('transform', 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')');
    });
  }

  /* ---------- Parallax + rotating ring ---------- */
  var plx = Array.prototype.slice.call(document.querySelectorAll('.parallax img'));
  var ring = document.querySelector('.ring-rot');

  function updateParallax() {
    var vh = window.innerHeight;
    plx.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      var shift = Math.max(-1, Math.min(1, p)) * r.height * -0.05;
      img.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0) scale(1.12)';
    });
    if (ring) ring.setAttribute('transform', 'rotate(' + (window.scrollY * 0.12).toFixed(2) + ' 200 200)');
  }

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        updateEyes();
        updateParallax();
      });
    }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  requestTick();
})();
