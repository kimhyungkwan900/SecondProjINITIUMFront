import { useState } from "react";

const FilterMenu = ({onSelectIds}) => {
  const [selected, setSelected] = useState(0); // 선택된 인덱스

  const categories = [
    { name: "전체", ids: null },
    { name: "융합역량", ids: [1, 2] },
    { name: "창의역량", ids: [3, 4] },
    { name: "리더십", ids: [5, 6] },
    { name: "소통역량", ids: [7, 8] },
  ];

    const handleClick = (index) => {
    setSelected(index);
    onSelectIds(categories[index].ids);
  };

  return (
    <div className="flex justify-center gap-12 mt-12 pt-10">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-32 h-32 rounded-full border 
            flex items-center justify-center text-lg font-semibold
            transition-colors duration-200 shadow-md
            ${selected === index ? "bg-sky-800 text-white" : "bg-gray-200"} 
            hover:bg-blue-200`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;