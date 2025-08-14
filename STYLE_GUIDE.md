# CSS 스타일 가이드

이 문서는 프로젝트 전반에 걸쳐 일관된 디자인과 개발 효율성을 보장하기 위한 스타일링 규칙과 가이드라인을 정의합니다.

## 1. 색상 팔레트 (Color Palette)

일관된 UI를 위해 미리 정의된 색상 팔레트를 사용합니다. `tailwind.config.js`에 색상을 추가하여 사용할 수도 있습니다.

| 역할 | 색상 코드 | Tailwind 클래스 예시 |
| :--- | :--- | :--- |
| **핵심 텍스트 / 기본 버튼** | `#354649` | `text-[#354649]`, `bg-[#354649]` |
| **보조 텍스트 / 호버** | `#6C7A89` | `text-[#6C7A89]`, `hover:bg-[#6C7A89]` |
| **포인트 / 약한 테두리** | `#A3C6C4` | `text-[#A3C6C4]`, `border-[#A3C6C4]` |
| **섹션 배경 / 테이블 헤더** | `#E0E7E9` | `bg-[#E0E7E9]` |
| **명확한 구분선** | `#d1d5db` | `border-gray-300` |
| **성공 (Success)** | `#22c55e` | `text-green-500` |
| **경고 (Warning)** | `#f59e0b` | `text-amber-500` |
| **오류 (Error)** | `#ef4444` | `text-red-500` |

## 2. 타이포그래피 (Typography)

- **기본 폰트:** `Noto Sans KR` (시스템에 설치된 폰트 사용)
- **기본 색상:** 핵심 텍스트 색상 (`#354649`)

| 요소 | 크기 | 가중치 | Tailwind 클래스 예시 |
| :--- | :--- | :--- | :--- |
| **h1** | 2.25rem (36px) | Bold | `text-4xl font-bold` |
| **h2** | 1.875rem (30px) | Bold | `text-3xl font-bold` |
| **h3** | 1.5rem (24px) | Semi-bold | `text-2xl font-semibold` |
| **본문 (Body)** | 1rem (16px) | Regular | `text-base font-normal` |
| **캡션 (Caption)** | 0.875rem (14px) | Regular | `text-sm font-normal` |

## 3. 간격 (Spacing)

Tailwind의 기본 간격 단위를 일관되게 사용합니다. (`4px` = `1` 단위)

- **컴포넌트 간 여백:** `space-y-4` 또는 `m-4` (16px) 사용을 권장합니다.
- **패딩:**
  - 버튼/입력창: `px-4 py-2` (좌우 16px, 상하 8px)
  - 섹션/카드: `p-6` (24px)

## 4. 컴포넌트 스타일 예시

스타일 가이드를 적용하여 컴포넌트를 만드는 방법의 예시입니다.

### 버튼 (Buttons)

```jsx
// 기본 버튼
<button className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors">
  기본 버튼
</button>

// 보조 버튼
<button className="border border-[#A3C6C4] text-[#354649] font-semibold py-2 px-4 rounded-md hover:bg-[#E0E7E9] transition-colors">
  보조 버튼
</button>
```

### 입력창 (Inputs)

프로젝트의 일관성을 위해 `src/component/common/TextInput.jsx` 컴포넌트 사용을 권장합니다.

```jsx
// 기본 입력창
// 사용법: <TextInput type="text" placeholder="내용을 입력하세요..." />
// 실제 컴포넌트에는 value와 onChange 핸들러를 전달해야 합니다.
import TextInput from 'src/component/common/TextInput';

<TextInput
  type="text"
  placeholder="내용을 입력하세요..."
/>

// 오류 상태 입력창
// TextInput의 className prop을 통해 직접 스타일을 주입하여 상태를 표시합니다.
<TextInput
  type="text"
  placeholder="오류가 발생했습니다."
  className="w-full rounded-md border border-red-500 px-4 py-3 text-lg text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
/>
```

## 5. 모범 사례 (Best Practices)

- **Utility-First:** 가능한 한 Tailwind CSS의 유틸리티 클래스를 직접 조합하여 사용합니다.
- **재사용 스타일:** 두 곳 이상에서 반복되는 복잡한 스타일 조합은 `src/App.css` 파일에 `@apply`를 사용하여 커스텀 클래스로 만듭니다. (예: `.btn-primary`)
