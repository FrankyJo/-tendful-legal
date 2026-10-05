(function () {
  var d = document, root = d.documentElement, lang = 'en', q = null, s = null;
  try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  try { s = localStorage.getItem('lang'); } catch (e) {}
  var nav = (navigator.language || '').toLowerCase();
  if (q === 'uk' || q === 'en') lang = q;
  else if (s === 'uk' || s === 'en') lang = s;
  else if (nav.indexOf('uk') === 0) lang = 'uk';
  root.classList.add('js');

  function apply(l, save) {
    lang = l;
    root.lang = l;
    root.classList.toggle('lang-uk', l === 'uk');
    var t = d.documentElement.getAttribute('data-title-' + l);
    if (t) d.title = t;
    var m = d.querySelector('meta[name="description"]');
    var desc = root.getAttribute('data-desc-' + l);
    if (m && desc) m.setAttribute('content', desc);
    d.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === l ? 'true' : 'false');
    });
    if (save) { try { localStorage.setItem('lang', l); } catch (e) {} }
  }

  function init() {
    d.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-set'), true); });
    });
    apply(lang, false);
  }
  apply(lang, false);
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
