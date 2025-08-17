# MyPage CSS 스타일 가이드

이 문서는 MyPage 전반에 걸쳐 일관된 디자인과 개발 효율성을 보장하기 위한 스타일링 규칙과 가이드라인을 정의합니다.

## 1. 색상 팔레트 (Color Palette)

...

## 2. 타이포그래피 (Typography)

...

## 3. MyPage 기본 스타일 (MyPage Base Styles)

MyPage는 사용자 친화적인 인터페이스를 위해 특정 스타일 규칙을 따릅니다.

- **페이지 헤더**: `PageHeader` 컴포넌트 사용
- **섹션 컨테이너**: `section className="bg-white shadow-sm p-6"`
- **섹션 제목**: `h3 className="text-lg font-semibold mb-4 text-[#354649]"`
- **카드 헤더 스타일**: `div className="pb-3 border-b border-gray-300 text-[#354649] font-semibold text-lg"`
- **텍스트 입력**: `TextInput` 컴포넌트 사용 (필요에 따라 `px-2 py-1 text-sm`과 같은 더 작은 패딩/글꼴 크기 사용)
- **기본 버튼**: `w-full px-5 py-3 rounded-md bg-[#354649] text-[#E0E7E9] font-semibold hover:bg-[#6C7A89] disabled:opacity-50 disabled:cursor-not-allowed transition-colors`
- **작은 기본 버튼**: `py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors disabled:opacity-50`
- **보조 버튼**: `border border-[#A3C6C4] text-[#354649] px-3 py-1.5 rounded-md hover:bg-[#E0E7E9] transition-colors`
- **오류/피드백 메시지**: `text-red-500 text-sm` 또는 `text-red-500 text-xs mt-1`
- **정보 텍스트**: `text-center text-[#6C7A89] mb-6` 또는 `text-xs text-[#6C7A89] pt-1`

## 4. Div 그리드 테이블 스타일 (신규)

`<table>` 대신 `div`와 CSS Grid를 사용하여 테이블을 구성합니다. 이 구조는 반응형 디자인과 유연한 레이아웃에 더 유리합니다.

- **전체 컨테이너**: `div className="border border-gray-300 rounded-md overflow-hidden"`
- **헤더 래퍼**: `div className="grid text-[#354649] text-sm font-semibold bg-[#E0E7E9]"`
  - `grid-cols-*` 유틸리티 또는 `gridTemplateColumns` 스타일을 사용하여 컬럼 수를 정의합니다.
- **헤더 셀**: `div className="px-4 py-2 border-b border-gray-300 text-center"`
- **본문 래퍼**: `div`
- **본문 행**: `div className="grid border-t border-gray-200 hover:bg-gray-50"`
  - 짝수/홀수 행 배경색 교차: `idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"`
- **본문 셀**: `div className="px-4 py-2 text-center"`

**예시:**
```jsx
<div className="border border-gray-300 rounded-md overflow-hidden">
  {/* 헤더 */}
  <div className="grid grid-cols-3 text-sm font-semibold text-center text-[#354649] bg-[#E0E7E9]">
    <div className="px-4 py-2 border-b border-gray-300">컬럼 1</div>
    <div className="px-4 py-2 border-b border-gray-300">컬럼 2</div>
    <div className="px-4 py-2 border-b border-gray-300">컬럼 3</div>
  </div>
  {/* 본문 */}
  <div>
    {items.map((item, idx) => (
      <div key={item.id} className={`grid grid-cols-3 border-t border-gray-200 text-center text-sm hover:bg-gray-50 ${idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
        <div className="px-4 py-2">{item.data1}</div>
        <div className="px-4 py-2">{item.data2}</div>
        <div className="px-4 py-2">{item.data3}</div>
      </div>
    ))}
  </div>
</div>
```