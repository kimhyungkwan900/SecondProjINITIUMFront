# Admin UI 스타일 가이드
- **버전:** 1.1 (2025-08-16)  
- **적용 범위:** 관리자 영역(목록/검색/상세/입력) 화면 전반  
- **목표:** 일관성 있는 색 · 간격 · 타이포 · 상호작용 규칙으로 유지보수성과 생산성 향상  
- **기본 전제:** TailwindCSS 사용, 공통 유틸 클래스는 `@layer components` 로 정의해 재사용

---

## 0 디자인 토큰

- **Primary:** `#222E8D`  
  - 버튼/포커스/하이라이트의 기준 색  
- **Gray Scale:** Tailwind Gray 50/100/200/300/700 권장
- **카드 배경:** `#FFFFFF`
- **DataGrid 헤더:** `#E0E7E9` / 텍스트 `#354649`
- **DataGrid 스트라이프:** `#F9FAFB` (또는 `gray-50`)

> 모든 포커스 링과 Primary 버튼 호버는 Primary 톤으로 통일한다.

---

## 1 페이지 컨테이너

- **규정:** 모든 Admin 페이지 최상단 컨테이너는 다음 클래스를 사용한다.
  ```html
  <div class="max-w-7xl mx-auto px-6 py-8 space-y-4"> ... </div>
  ```

---

## 2 카드(섹션) 규격

- **기본 카드**
  ```html
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm"> ... </div>
  ```
- **내부 패딩**
  - 기본 `p-4`  
  - 데이터 밀집 화면만 `p-3` 허용(화면 단위로 하나만 선택, 혼용 금지)

---

## 3 툴바(상단 조작부)

- **배치/패딩**
  ```html
  <div class="p-4 flex flex-wrap items-end gap-4"> ... </div>
  ```
- **주요 요소**
  - 좌측: 검색 컨트롤  
  - 우측: 주요 버튼(조회/등록 등), 버튼 높이 `h-10` 고정

---

## 4 폼(검색/입력) 레이아웃

- **그리드**
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"> ... </div>
  ```
- **라벨/컨트롤**
  ```html
  <label class="block text-xs font-medium text-gray-700 mb-1 truncate">라벨</label>
  <input class="h-10 w-60 rounded-md px-3 text-sm border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-[#222E8D] focus:border-[#222E8D]" />
  ```
- **Select, Date 등** 모든 컨트롤은 동일 규격(h-10, text-sm, 동일 포커스 링) 적용

---

## 5 버튼 규격

- **공통**
  - 높이 `h-10`, 글꼴 `text-sm font-semibold`, 라운드 `rounded-md`
- **Primary**
  ```html
  <button class="bg-[#222E8D] text-white px-4 h-10 rounded-md text-sm font-semibold
                 hover:bg-blue-800 disabled:opacity-50">확인</button>
  ```
- **Secondary(보조)**
  ```html
  <button class="px-3 h-10 rounded-md text-sm font-semibold border border-gray-300
                 hover:bg-gray-50 disabled:opacity-50">초기화</button>
  ```
- **Danger Outline(파괴적 행위)**
  ```html
  <button class="inline-flex items-center justify-center rounded-md px-3 h-9 text-xs font-medium
                 border border-red-300 text-red-600 hover:bg-red-50">삭제</button>
  ```

---

## 6 배지(상태/라벨)

- **규격**
  ```html
  <span class="inline-flex items-center rounded-full px-2.5 h-6 text-xs font-medium border">...</span>
  ```
- **상태별 권장 클래스**
  - Blue: `text-blue-700 bg-blue-50 border-blue-200` (예: 신청)
  - Green: `text-green-700 bg-green-50 border-green-200` (예: 승인)
  - Red: `text-red-700 bg-red-50 border-red-200` (예: 반려)
  - Gray: `text-gray-700 bg-gray-50 border-gray-200` (기타/미지정)

---

## 7 DataGrid(표) 규격

### 7.1 구조
- 헤더와 본문은 동일한 컬럼 그리드 사용(예: 6열)
  ```html
  <!-- 헤더 -->
  <div class="grid grid-cols-6 items-center">
    <div class="px-4 py-3 text-sm font-semibold text-center border-b"
         style="background:#E0E7E9;color:#354649;border-color:#E0E7E9;">컬럼</div>
    ...
  </div>

  <!-- 본문 -->
  <div>
    <div class="grid grid-cols-6 items-center border-t hover:bg-gray-50"> ... </div>
    <div class="grid grid-cols-6 items-center border-t hover:bg-gray-50"> ... </div>
  </div>
  ```

### 7.2 셀 규격
- **헤더 셀:** `px-4 py-3 text-sm font-semibold text-center border-b` + 헤더 배경/텍스트 컬러 적용  
- **본문 셀:** `px-4 py-3 text-sm text-center border-b border-gray-200`  
- **스트라이프:** `even:bg-[#F9FAFB]` (또는 `even:bg-gray-50`)

### 7.3 행 상태/인터랙션
- **Hover:** `hover:bg-gray-50`  Selected
- **Selected(옵션):** `data-[selected=true]:bg-indigo-50 data-[selected=true]:border-indigo-200` (또는 `[aria-selected="true"]:bg-indigo-50` )
- **체크박스 열**은 헤더/본문 동일한 위치에 배치

### 7.4 Variant(컴포넌트 변형) 정의
- `bare`: 외곽선 최소, 데이터 밀집 목록(현재 기본)  
- `carded`: 카드 외곽선/섀도를 표 레벨에 적용, 폭넓은 여백/가독성 필요 화면에 사용

---

## 8 하단 컨트롤 바(검색 결과/표시 개수/페이지네이션)

- **레이아웃**
  ```html
  <div class="px-4 py-3 flex justify-between items-center border-t border-gray-200">
    <div class="text-sm text-gray-600">검색결과: <b>0</b>건</div>
    <div class="flex items-center gap-3">
      <span class="text-sm">표시개수</span>
      <select class="h-10 rounded-md px-3 text-sm border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-[#222E8D] focus:border-[#222E8D]">
        <option>15</option>
      </select>
      <!-- PageButton 컴포넌트 -->
    </div>
  </div>
  ```

---

## 9 우측 사이드 패널(상세/편집 폼)

- **권장 레이아웃**
  ```html
  <div class="bg-white border border-gray-200 rounded-lg p-3 space-y-3 self-start sticky top-20">
    <div class="flex items-center justify-between">
      <div class="text-sm font-semibold text-gray-700">섹션 제목</div>
      <button class="bg-[#222E8D] text-white px-4 h-10 rounded-md text-sm font-semibold">저장</button>
    </div>

    <div class="text-sm text-gray-700 bg-gray-50 border rounded px-3 py-2">
      선택된 키: <b>-</b>
    </div>

    <!-- 입력 폼 -->
  </div>
  ```

---

## 10 상태(로딩/빈/오류) 표기

- **로딩(센터):** `py-10 text-center text-sm text-gray-500` → “로딩 중...”  
- **빈 상태:** `px-4 py-8 text-center text-sm text-gray-500` → “데이터가 없습니다.”  
- **오류:** 카드 상단 또는 툴바 하단에 `text-red-600 text-sm`로 간결히 표기

---

## 11 접근성/키보드 상호작용

- 모든 폼 컨트롤에 **명확한 label**과 **aria-label** 제공  
- 포커스 이동(Tab) 시 시각적 포커스 링이 Primary로 나타나야 함  
- 체크박스/버튼 등 인터랙션 요소는 **enter/space**로 작동 가능해야 함

---

## 12 공용 유틸 클래스(선택 적용)

> 아래 클래스는 `src/styles/admin.css` 등에 `@layer components` 로 정의하여 재사용합니다.  
> 프로젝트가 Tailwind를 사용하므로 **@apply** 기반으로 선언합니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* 카드/툴바 */
  .adm-card { @apply bg-white border border-gray-200 rounded-lg shadow-sm; }
  .adm-toolbar { @apply p-4 flex flex-wrap items-end gap-4; }

  /* 폼 */
  .adm-label { @apply block text-xs font-medium text-gray-700 mb-1 truncate; }
  .adm-control {
    @apply h-10 w-60 rounded-md px-3 text-sm border border-gray-300 focus:outline-none;
  }
  .adm-control:focus {@apply ring-2; --tw-ring-color: #222E8D; border-color: #222E8D;}

  /* 버튼 */
  .adm-btn { @apply inline-flex items-center justify-center rounded-md px-4 h-10 text-sm font-semibold disabled:opacity-50 disabled:pointer-events-none; }
  .adm-btn--primary { @apply text-white; background:#222E8D; }
  .adm-btn--secondary { @apply border border-gray-300 hover:bg-gray-50; }
  .adm-btn--dangerOutline { @apply border; border-color:#fecaca; color:#b91c1c; }
  .adm-btn--dangerOutline:hover { background:#fef2f2; }

  /* 배지 */
  .adm-badge { @apply inline-flex items-center rounded-full px-2.5 h-6 text-xs font-medium border; }
  .adm-badge--blue  { @apply text-blue-700;  background:#eff6ff; border-color:#bfdbfe; }
  .adm-badge--green { @apply text-green-700; background:#ecfdf5; border-color:#a7f3d0; }
  .adm-badge--red   { @apply text-red-700;   background:#fef2f2; border-color:#fecaca; }
  .adm-badge--gray  { @apply text-gray-700;  background:#f9fafb; border-color:#e5e7eb; }

  /* DataGrid (6열 예시) */
  .adm-grid-6 { @apply grid grid-cols-6 items-center; }
  .adm-th { @apply px-4 py-3 text-sm font-semibold text-center border-b; background:#E0E7E9; color:#354649; border-color:#E0E7E9; }
  .adm-td { @apply px-4 py-3 text-sm text-center border-b border-gray-200; color:#374151; }
  .adm-row { @apply adm-grid-6 border-t hover:bg-gray-50; }
  .adm-row--striped:nth-child(even) { background:#F9FAFB; }

  /* 상태 */
  .adm-empty { @apply px-4 py-8 text-center text-sm text-gray-500; }
  .adm-loading { @apply py-10 text-center text-sm text-gray-500; }
}
```

---

## 13 페이지 유형별 체크리스트

### A. 목록 페이지(학생/직원)
- [ ] 최상위 컨테이너 `max-w-7xl mx-auto px-6 py-8 space-y-4`
- [ ] 상단 툴바 `adm-card adm-toolbar` 또는 동일 규격으로 구성
- [ ] 검색 폼 카드 `adm-card` + 내부 `grid ... gap-4 p-4`
- [ ] DataGrid 헤더/본문/스트라이프 규격 준수(헤더 배경/텍스트 고정)
- [ ] 하단 컨트롤 바 `px-4 py-3 ...` + select 포커스 링 Primary
- [ ] 버튼 높이 `h-10`, Primary는 `#222E8D`

### B. 관리(목록+우측 편집) 페이지
- [ ] 좌측: 검색 폼/목록은 A의 규칙을 그대로 사용
- [ ] 우측: `sticky top-20` 패널 + 카드 규격 + 저장 버튼 Primary
- [ ] 상태 정보(선택된 키)는 `bg-gray-50 border rounded px-3 py-2 text-sm`

---

## 14 마이그레이션 가이드(현 코드 기준 최소 변경)

- **rounded**: `rounded-lg` 로 통일  
- **간격**: 검색폼 `gap-4 p-4`, 카드 내부 `p-4`(특수화면만 `p-3`)  
- **포커스 링**: `focus:ring-[#222E8D] focus:border-[#222E8D]`  
- **하단 바**: `px-4 py-3 border-t` + select 동일 포커스 링  
- **DataGrid**: 헤더 `#E0E7E9 / #354649`, 스트라이프 `#F9FAFB` 고정  
- **버튼**: 높이 `h-10` 고정, Primary `#222E8D`

---

## 15 금지/주의사항

- Primary와 무관한 파란 톤(`focus:ring-blue-400` 등) **혼용 금지**  
- 카드 내부에서 `p-3`와 `p-4` **혼용 금지** – 화면 단위로 하나 선택  
- 버튼 높이 `h-10` 표준 위반 금지(툴바·폼 얼라인 깨짐)  
- 임시 색상 하드코딩(`#6C7A89` 등) 지양, 가이드 색상으로 통일

---

### 부록 예시 스니펫

```jsx
{/* 상단 툴바 */}
<div className="adm-card adm-toolbar">
  <div>
    <label className="adm-label">이름</label>
    <input className="adm-control" />
  </div>
  <div className="ml-auto flex gap-2">
    <button className="adm-btn adm-btn--secondary">초기화</button>
    <button className="adm-btn adm-btn--primary">조회</button>
  </div>
</div>

{/* 목록 카드 */}
<div className="adm-card overflow-hidden">
  {/* 헤더 */}
  <div className="adm-grid-6">
    <div className="adm-th">학번</div>
    <div className="adm-th">이름</div>
    <div className="adm-th">학과</div>
    <div className="adm-th">상태</div>
    <div className="adm-th">입학일</div>
    <div className="adm-th">선택</div>
  </div>

  {/* 본문 */}
  <div>
    <div className="adm-row adm-row--striped">
      <div className="adm-td">20231234</div>
      <div className="adm-td">홍길동</div>
      <div className="adm-td">컴퓨터공학</div>
      <div className="adm-td"><span className="adm-badge adm-badge--green">재학</span></div>
      <div className="adm-td">2023-03-01</div>
      <div className="adm-td">
        <button className="adm-btn adm-btn--dangerOutline">삭제</button>
      </div>
    </div>
  </div>

  {/* 하단 바 */}
  <div className="px-4 py-3 flex justify-between items-center border-t border-gray-200">
    <div className="text-sm text-gray-600">검색결과: <b>120</b>건</div>
    <div className="flex items-center gap-3">
      <span className="text-sm">표시개수</span>
      <select className="adm-control w-auto">...</select>
      {/* PageButton 컴포넌트 */}
    </div>
  </div>
</div>
```
