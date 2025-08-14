import { useState, useEffect } from "react";
import { getCoreCateogry, getSubCateogry } from "../../../../api/admin/extracurricular/category/CategoryApi";

const CategorySideContent = ({ onSelectCategory }) => {
  const [openId, setOpenId] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const data = await getCoreCateogry();
        // children은 기본 빈 배열로 세팅
        const formatted = data.map(item => ({
          ...item,
          children: []
        }));
        setCompetencyOptions(formatted);
      } catch (error) {
        console.error("핵심역량 조회 실패", error);
      }
    };
    fetchCompetencies();
  }, []);

  const toggle = async (id) => {
    // 이미 열려있으면 닫기
    if (openId === id) {
      setOpenId(null);
      return;
    }

    // 하위 역량 불러오기
    try {
      const subData = await getSubCateogry(id);
      setCompetencyOptions(prev =>
        prev.map(item =>
          item.id === id ? { ...item, children: subData } : item
        )
      );
      setOpenId(id); // 해당 항목 열기
    } catch (error) {
      console.error("하위 역량 조회 실패", error);
    }
  };

  return (
    <div className="w-[33%] border p-2 rounded bg-white text-sm">
      <h1 className="text-center text-xl font-bold">프로그램분류</h1>
      <div className="mt-3 bg-gray-100 p-3 rounded space-y-1 h-[425px] overflow-y-auto">
        {competencyOptions.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              {/* 상위 항목 */}
              <div
                onClick={() => toggle(item.id)}
                className={`p-1 cursor-pointer rounded flex items-center font-semibold hover:bg-blue-100  text-sm${
                  isOpen ? "bg-blue-200" : ""
                }`}
              >
                📂{item.name}
              </div>

              {/* 하위 항목 */}
              <div
                className={`ml-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {item.children.map((child) => (
                  <div
                    key={child.id}
                    className="p-1 hover:bg-gray-200 rounded cursor-pointer flex items-center"
                    onClick={() => onSelectCategory(child.id)}
                  >
                    📋{child.name}
                  </div>
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