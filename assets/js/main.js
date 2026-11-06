/* MUE 공용 스크립트: 헤더, 메뉴, 등장 효과, 스와이프 갤러리, 이벤트 측정, 신청 폼 */
(function () {
  function track(name, params) {
    if (!window.gtag) return;
    params = params || {};
    params.debug_mode = true;
    window.gtag('event', name, params);
  }

  /* 제품 상세 조회 */
  if (document.body.classList.contains('pdp-page')) {
    track('view_item', {
      currency: 'KRW',
      value: 140000,
      items: [{
        item_id: 'MUE-COL01',
        item_name: 'MUE Collection 01 Bouquet Object',
        item_category: 'Bouquet Object',
        price: 140000,
        quantity: 1
      }]
    });
  }

  /* 헤더 그림자 */
  var hd = document.querySelector('.hd');
  if (hd) {
    var onScroll = function () { hd.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 모바일 메뉴 */
  var menuBtn = document.querySelector('.menu-btn');
  var drawer = document.querySelector('.drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.textContent = open ? 'CLOSE' : 'MENU';
    });
  }

  /* 스크롤 등장 */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* 스와이프 갤러리 번호 (01 / 03) */
  document.querySelectorAll('[data-swipe]').forEach(function (track_) {
    var pg = document.querySelector(track_.getAttribute('data-swipe'));
    var cards = track_.querySelectorAll('.card');
    if (!pg || !cards.length) return;
    var total = String(cards.length).padStart(2, '0');
    track_.addEventListener('scroll', function () {
      var w = cards[0].getBoundingClientRect().width + 12;
      var i = Math.min(cards.length, Math.round(track_.scrollLeft / w) + 1);
      pg.textContent = String(i).padStart(2, '0') + ' / ' + total;
    }, { passive: true });
  });

  /* CTA 클릭 측정: data-cta="위치" 가 붙은 링크·버튼 */
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      track('cta_click', {
        cta_location: el.getAttribute('data-cta'),
        button_text: el.textContent.trim().slice(0, 40),
        link_url: el.href || ''
      });
    });
  });

  /* 개인정보 안내 팝업 */
  var modal = document.getElementById('privacy-modal');
  var agree = document.getElementById('privacy-agree');
  var ok = document.getElementById('privacy-ok');
  var pending = null;
  function openModal(form) {
    if (!modal) return;
    pending = form || null;
    if (agree) agree.checked = false;
    if (ok) ok.disabled = true;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('[data-privacy-open]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); openModal(null); });
  });
  if (agree && ok) agree.addEventListener('change', function () { ok.disabled = !agree.checked; });
  var cancel = document.getElementById('privacy-cancel');
  if (cancel) cancel.addEventListener('click', function () { pending = null; closeModal(); });
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) { pending = null; closeModal(); } });
  if (ok) ok.addEventListener('click', function () {
    closeModal();
    if (pending) finish(pending);
  });

  /* 신청 폼
     입력칸에는 name 속성이 없어 어디로도 전송되지 않습니다.
     완료하면 입력값을 지우고 thanks.html 로 이동합니다. */
  function digits(v) { return (v || '').replace(/\D/g, ''); }

  function finish(form) {
    var src = form.getAttribute('data-form') || 'unknown';
    track('generate_lead', {
      lead_type: 'launch_alert',
      form_location: src,
      currency: 'KRW',
      value: 0
    });
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false; else el.value = '';
    });
    setTimeout(function () { window.location.href = 'thanks.html?from=' + encodeURIComponent(src); }, 250);
  }

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var started = false;
    form.addEventListener('input', function () {
      if (!started) {
        started = true;
        track('form_start', {
          form_location: form.getAttribute('data-form'),
          form_type: 'launch_alert'
        });
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = form.querySelector('.err') || form.parentElement.querySelector('.err');
      var phone = form.querySelector('[data-phone]');
      var need = form.querySelectorAll('[data-required]');
      var msg = '';
      need.forEach(function (el) {
        if (!msg && el.type === 'checkbox' && !el.checked) msg = '안내 확인에 체크해 주세요.';
        else if (!msg && el.type !== 'checkbox' && !el.value.trim()) msg = (el.getAttribute('data-label') || '필수 항목') + '을(를) 입력해 주세요.';
      });
      if (!msg && phone && !/^01[016789]\d{7,8}$/.test(digits(phone.value))) msg = '휴대폰 번호를 다시 확인해 주세요.';
      var email = form.querySelector('input[type="email"]');
      if (!msg && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) msg = '이메일 주소를 다시 확인해 주세요.';
      if (err) err.textContent = msg;
      if (msg) return;
      openModal(form);
    });
  });

  /* 휴대폰 번호 자동 하이픈 */
  document.querySelectorAll('[data-phone]').forEach(function (el) {
    el.addEventListener('input', function () {
      var d = digits(el.value).slice(0, 11);
      el.value = d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3) : d.slice(0, 3) + '-' + d.slice(3, d.length - 4) + '-' + d.slice(-4);
    });
  });
})();
