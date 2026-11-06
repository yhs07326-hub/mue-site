# MUE GA4 이벤트 설계표

MUE Collection 01 사이트에서 사용자가 제품을 발견하고 출시 알림을 신청하기까지의 흐름을 측정한다.
주요 이벤트는 실제 전환인 `generate_lead` 하나만 사용한다.

| 내 사이트의 행동 | 이벤트 | 파라미터 | 주요 이벤트 |
| --- | --- | --- | --- |
| Collection 01 상세 페이지 보기 | `view_item` | `currency`, `value`, `items` | 아니요 |
| 출시 예약·알림 등 주요 버튼 클릭 | `cta_click` | `cta_location`, `button_text`, `link_url` | 아니요 |
| 헤더·모바일 메뉴·푸터 메뉴 이동 | `nav_click` | `menu_name`, `link_url` | 아니요 |
| 출시 알림 폼 입력 시작 | `form_start` | `form_location`, `form_type` | 아니요 |
| 출시 알림 신청 완료 | `generate_lead` | `lead_type`, `form_location`, `currency`, `value` | **예** |
| 이메일·인스타그램 문의 링크 클릭 | `contact_click` | `contact_method`, `link_url` | 아니요 |
| FAQ 질문 펼치기 | `faq_open` | `faq_question` | 아니요 |
| 페이지 25·50·75·100% 스크롤 | `scroll_depth` | `percent` | 아니요 |

## 제품 정보

- `item_id`: `MUE-COL01`
- `item_name`: `MUE Collection 01 Bouquet Object`
- `item_category`: `Bouquet Object`
- `price`: `140000`
- `currency`: `KRW`

## 전환 흐름

`page_view` → `view_item` 또는 `cta_click` → `form_start` → `generate_lead`

`page_view`는 GA4 기본 이벤트이므로 위 8개 맞춤 행동 이벤트 수에는 포함하지 않는다.

## 연결 방식

- `ga4-easy.js` 자동: `cta_click`, `nav_click`, `contact_click`, `faq_open`, `scroll_depth`
- 기존 MUE 스크립트: `form_start`, `generate_lead`
- 별도 속성 연결 필요: `view_item`

개인정보와 입력값은 GA4로 보내지 않는다. 행동 위치, 버튼 문구, 상품 정보처럼 개인을 식별할 수 없는 값만 전송한다.
