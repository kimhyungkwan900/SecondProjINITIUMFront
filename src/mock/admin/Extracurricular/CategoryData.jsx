
export const CategoryData = [
     {
    id: "S",
    label: "융합역량",
    children: [ 
      { id: "1", label: "융합역량" },
      { id: "2", label: "융합종합적사고력" },],
  },
  {
    id: "T",
    label: "창의역량",
    children: [
      { id: "3", label: "창의적사고력" },
      { id: "4", label: "지식·정보활용" },
    ],
  },
  {
    id: "A",
    label: "리더십",
    children: [
      { id: "5", label: "대인관계" },
      { id: "6", label: "사회윤리" },
    ],
  },
  {
    id: "R",
    label: "소통역량",
    children: [
      { id: "7", label: "공동체의식" },
      { id: "8", label: "의사소통" },
    ],
  },
]



export const findCategoryById = (id) => {
  const strId = String(id);
  for (const parent of CategoryData) {
    const child = parent.children.find((c) => String(c.id) === strId);
    if (child) {
      return {
        ...child,
        parentId: parent.id,
        parentLabel: parent.label, // ← 핵심! 상위 카테고리명
      };
    }
  }
  return null;
};