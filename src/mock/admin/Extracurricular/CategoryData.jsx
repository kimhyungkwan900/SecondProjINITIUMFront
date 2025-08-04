
export const CategoryData = [
     {
    id: "S",
    label: "S.융합역량",
    children: [ 
      { id: "1", label: "S1.융합역량" },
      { id: "2", label: "S2.융합종합적사고력" },],
  },
  {
    id: "T",
    label: "T.창의역량",
    children: [
      { id: "3", label: "T1.창의적사고력" },
      { id: "4", label: "T2.지식·정보활용" },
    ],
  },
  {
    id: "A",
    label: "A.리더십",
    children: [
      { id: "5", label: "A1.대인관계" },
      { id: "6", label: "A2.사회윤리" },
    ],
  },
  {
    id: "R",
    label: "R.소통역량",
    children: [
      { id: "7", label: "R1.공동체의식" },
      { id: "8", label: "R2.의사소통" },
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