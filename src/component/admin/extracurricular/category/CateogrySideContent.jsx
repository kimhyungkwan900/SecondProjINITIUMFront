import { useState, useEffect } from "react";
import { getCoreCateogry, getSubCateogry } from "../../../../api/admin/extracurricular/category/CategoryApi";

const CategorySideContent = ({ onSelectCategory }) => {
  const [openId, setOpenId] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const data = await getCoreCateogry();
        const formatted = (data || []).map((item) => ({
          ...item,
          children: [],
        }));
        setCompetencyOptions(formatted);
      } catch (error) {
        console.error("핵심역량 조회 실패", error);
      }
    };
    fetchCompetencies();
  }, []);

  const toggle = async (id) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    try {
      const subData = await getSubCateogry(id);
      setCompetencyOptions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, children: subData || [] } : item))
      );
      setOpenId(id);
    } catch (error) {
      console.error("하위 역량 조회 실패", error);
    }
  };

  return (
    <div className="w-full h-full text-sm">
      <h2 className="px-2 text-base font-semibold text-gray-700">프로그램분류</h2>

      {/* 스크롤 영역 */}
      <div className="mt-2 bg-gray-50 rounded px-2 py-2 h-[600px] overflow-y-auto">
        {(competencyOptions || []).map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="mb-1">
              {/* 상위역량 행 - 폭 전체 사용 */}
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center ${
                  isOpen ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">📂</span>
                <span className="truncate">{item.name}</span>
              </button>

              {/* 하위역량 - 폭 전체 사용 */}
              <div className={`ml-4 transition-all ${isOpen ? "mt-1" : "hidden"}`}>
                {(item.children || []).map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => onSelectCategory?.(child.id)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center"
                  >
                    <span className="mr-2">📋</span>
                    <span className="truncate">{child.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySideContent;
