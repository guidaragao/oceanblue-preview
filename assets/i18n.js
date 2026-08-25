/* ===========================================================
   Alternancia PT / EN.
   O ingles e o protagonista (o decisor e internacional), entao
   quem NAO esta num navegador em portugues cai direto no EN.
   Cada texto vive no HTML nos dois idiomas, em data-pt e data-en,
   pra que o conteudo em ingles seja indexavel e nao dependa de JS
   pra existir no HTML.
   =========================================================== */
(function () {
  var KEY = 'obd-lang';

  function detect() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) {}
    var nav = (navigator.language || 'en').toLowerCase();
    return nav.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    document.querySelectorAll('[data-pt]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val == null) return;
      if (el.hasAttribute('data-attr')) {
        el.setAttribute(el.getAttribute('data-attr'), val);
      } else {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function init() {
    apply(detect());

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.lang); });
    });

    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('nav.main');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
