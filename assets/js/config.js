/* MUE 측정 설정 — ID는 이 파일 한 곳에서만 바꿉니다.
   지금 값은 정시은 학생이 기존 사이트(siena-site)에 쓰던 ID입니다.
   MUE용 GA4 속성을 새로 만들었다면 GA4_ID만 바꾸면 됩니다.
   Meta 픽셀은 GTM 안에서만 켭니다. 이 사이트 HTML에는 픽셀 코드를 직접 넣지 않습니다(중복 방지). */
window.MUE_CONFIG = {
  GA4_ID: 'G-464JXZ7MDB',
  GTM_ID: 'GTM-TR98M9NL'
};

(function () {
  var c = window.MUE_CONFIG || {};
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (/^GTM-[A-Z0-9]+$/.test(c.GTM_ID || '')) {
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtm.js?id=' + c.GTM_ID;
    document.head.appendChild(g);
  }

  if (/^G-[A-Z0-9]+$/.test(c.GA4_ID || '')) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + c.GA4_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', c.GA4_ID);
  }
})();
