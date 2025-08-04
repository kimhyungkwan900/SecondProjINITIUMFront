import { useState } from "react";
import {CategoryData} from "../../../../mock/admin/Extracurricular/CategoryData";

const CategorySideContent = ({ onSelectCategory }) => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-[30%] border p-2 rounded shadow text-sm">
      <h1 className="text-center text-xl font-bold">프로그램분류</h1>
      <div className="mt-3 bg-gray-100 p-3 rounded space-y-1 h-[425px] overflow-y-auto">
        {CategoryData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              {/* 상위 항목 */}
              <div
                onClick={() => toggle(item.id)}
                className={`p-1 cursor-pointer rounded flex items-center font-semibold hover:bg-blue-100 ${
                  isOpen ? "bg-blue-200" : ""
                }`}
              >
                📂{item.label}
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
                    onClick={() => onSelectCategory(child.id)} // 하위 카테고리 클릭에만 호출
                  >
                    📋{child.label}
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