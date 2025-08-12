import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchEmployees } from "../../../api/user/auth/employeesApi";
import useEmployeeInfo from "../../../hooks/useEmployeeInfo";

export default function EmployeeSelect({
  value,                                // 현재 선택된 사번(empNo)
  onChange,                             // (empNo | "") => void
  disabled = false,
  placeholder = "지도교수명을 입력하세요",
  className = "border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full",
  allowEmpty = true,                    // 지우기 허용
  minChars = 1,                         // 몇 글자부터 검색할지
  pageSize = 10,                        // 검색 결과 개수
}) {
  const [query, setQuery] = useState("");        // 입력창 표시 텍스트(이름)
  const [open, setOpen] = useState(false);       // 드롭다운 열림
  const [loading, setLoading] = useState(false); // 검색 로딩
  const [items, setItems] = useState([]);        // [{ empNo, name }]
  const [error, setError] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);// 키보드 네비게이션

  const wrapperRef = useRef(null);
  const abortRef = useRef(null);
  const typingRef = useRef(false);               // 사용자가 타이핑 중인지(선택 라벨 덮어쓰기 방지)

  // 선택된 empNo → 이름 라벨 동기화
  const { employee: selectedEmp } = useEmployeeInfo(value);

  // value(사번) 바뀌면 선택된 이름을 입력창에 반영 (단, 사용자가 타이핑 중일 땐 유지)
  useEffect(() => {
    if (!typingRef.current) {
      setQuery(selectedEmp?.name || "");
    }
  }, [value, selectedEmp]);

  // 바깥 클릭 시 닫기 + 입력 복원
  useEffect(() => {
    const handle = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setOpen(false);
        typingRef.current = false;
        setQuery(selectedEmp?.name || "");
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [selectedEmp]);

  // 검색 호출 (디바운스 + Abort)
  const search = useCallback(
    (name) => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      fetchEmployees(
        { name, page: 0, size: pageSize },
        { signal: controller.signal }
      )
        .then((data) => {
          const list = (data?.content || []).map((e) => ({
            empNo: e.empNo,
            name: e.name,
          }));
          setItems(list);
          setActiveIdx(list.length ? 0 : -1);
        })
        .catch((e) => {
          if (e.name === "CanceledError" || e.name === "AbortError") return; // axios/DOM abort
          setError(e);
          setItems([]);
          setActiveIdx(-1);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [pageSize]
  );

  // query 변경 → 디바운스 검색
  useEffect(() => {
    if (!typingRef.current) return; // 선택 후 복원 상황이면 검색 금지
    const q = (query || "").trim();
    if (q.length < minChars) {
      setItems([]);
      setActiveIdx(-1);
      return;
    }
    const t = setTimeout(() => search(q), 250);
    return () => clearTimeout(t);
  }, [query, minChars, search]);

  const onInputChange = (e) => {
    typingRef.current = true;
    setQuery(e.target.value);
    setOpen(true);
  };

  const pick = (empNo, name) => {
    setOpen(false);
    typingRef.current = false;
    setQuery(name);
    if (typeof onChange === "function") onChange(empNo);
  };

  const clear = () => {
    if (!allowEmpty) return;
    typingRef.current = false;
    setQuery("");
    setItems([]);
    setActiveIdx(-1);
    if (typeof onChange === "function") onChange("");
  };

  // 키보드 네비게이션
  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((idx) => (items.length ? (idx + 1) % items.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((idx) =>
        items.length ? (idx - 1 + items.length) % items.length : -1
      );
    } else if (e.key === "Enter") {
      if (open && activeIdx >= 0 && items[activeIdx]) {
        const it = items[activeIdx];
        pick(it.empNo, it.name);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      typingRef.current = false;
      setQuery(selectedEmp?.name || "");
    }
  };

  const showClear = allowEmpty && !disabled && (value || query);

  const renderMenu = useMemo(() => {
    if (!open || disabled) return null;
    return (
      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded shadow-sm max-h-56 overflow-auto">
        {loading && (
          <div className="px-3 py-2 text-sm text-gray-500">검색중...</div>
        )}
        {!loading && error && (
          <div className="px-3 py-2 text-sm text-red-500">
            검색 중 오류가 발생했습니다
          </div>
        )}
        {!loading && !error && items.length === 0 && (
          <div className="px-3 py-2 text-sm text-gray-400">검색 결과가 없습니다</div>
        )}
        {!loading &&
          !error &&
          items.map((e, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={e.empNo}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm ${
                  active ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => pick(e.empNo, e.name)}
              >
                <div className="font-medium">{e.name}</div>
                <div className="text-xs text-gray-500">사번: {e.empNo}</div>
              </button>
            );
          })}
      </div>
    );
  }, [open, disabled, loading, error, items, activeIdx]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={query}
          onChange={onInputChange}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={`${className} ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          autoComplete="off"
        />
        {showClear && (
          <button
            type="button"
            onClick={clear}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
            disabled={disabled}
          >
            지우기
          </button>
        )}
      </div>
      {renderMenu}
    </div>
  );
}