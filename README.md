# MUE — Collection 01 웹사이트

GitHub Pages용 정적 사이트입니다. 이 폴더 안의 내용을 리포 맨 위(루트)에 그대로 올리면 됩니다.

| 파일 | 페이지 |
| --- | --- |
| `index.html` | 메인 홈 (참고 이미지 01 구성 + Fumum·Abel 흐름) |
| `waitlist.html` | 출시 신청 페이지 (참고 이미지 02 구성, 휴대폰 번호) |
| `product.html` | 제품 상세 (Figma `MUE Collection 01 / Mobile Detail / v2`) |
| `thanks.html` | 신청 완료 |

## 자주 고칠 곳
- 문구: 각 HTML에서 바로 수정합니다.
- 색·글꼴: `assets/css/style.css` 맨 위 `:root`.
- 이미지: `assets/img/` 에서 같은 이름으로 바꿔 넣으면 됩니다 (가로 1200px JPG 권장).
- GA4·GTM ID: `assets/js/config.js` 한 곳. Meta 픽셀은 GTM 안에서만 켭니다. HTML에 픽셀 코드를 직접 넣지 마세요(중복 집계).
- Instagram: `https://www.instagram.com/mue.objects/`

## 측정 이벤트
- 전체 설계표와 파라미터: `EVENT_MEASUREMENT_PLAN.md`
- `generate_lead` (주요 이벤트): 개인정보 안내 확인까지 마친 신청 완료
- `view_item`: Collection 01 제품 상세 조회
- `cta_click`: 출시 예약·알림 등 주요 버튼 클릭
- `nav_click`: 헤더·모바일 메뉴·푸터 메뉴 이동
- `form_start`: 출시 알림 신청란 입력 시작
- `contact_click`: 이메일·인스타그램 문의 링크 클릭
- `faq_open`: FAQ 질문 펼치기
- `scroll_depth`: 페이지 25·50·75·100% 스크롤
- Meta: GTM이 픽셀을 불러온 경우 신청 완료 시 `Lead`

## 폼
입력칸에는 `name` 속성이 없어 어디로도 전송되지 않습니다. 완료하면 값을 지우고 `thanks.html` 로 이동합니다. 분석 도구에는 입력값이 아닌 익명 행동 이벤트(`form_start`, `cta_click`, `generate_lead`)만 전송합니다.

## 글꼴
Instrument Sans / Instrument Serif / Pretendard (모두 OFL, `assets/fonts/licenses/`).
