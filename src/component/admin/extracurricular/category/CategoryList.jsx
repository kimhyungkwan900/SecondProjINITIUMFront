

import PageButton from "../PagaButton";

const CategoryList= () => {

    const data = [
    {
      parent: "S.융합역량",
      id: "1",
      name: "분류",
      isUsed: false,
      department: "교육혁신처",
      competency: "S.융합역량",
    },
    {
      parent: "S.융합역량",
      id: "2",
      name: "종합적사고력",
      isUsed: true,
      department: "교육혁신처",
      competency: "S.융합역량",
    },
    {
      parent: "S1.종합적사고력",
      id: "3",
      name: "견학",
      isUsed: true,
      department: "교육혁신처",
      competency: "S.융합역량",
    },
    {
      parent: "S1.종합적사고력",
      id: "4",
      name: "경진대회",
      isUsed: true,
      department: "교육혁신처",
      competency: "S.융합역량",
    },
     {
      parent: "S1.종합적사고력",
      id: "4",
      name: "경진대회",
      isUsed: true,
      department: "교육혁신처",
      competency: "S.융합역량",
    },
  ];

    return(
        <div className="w-full">
        <div className="overflow-x-auto">
      <table className="w-full text-sm border bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">프로그램분류ID</th>
            <th className="border p-2">핵심역량</th>
            <th className="border p-2">상위분류명</th>
            <th className="border p-2">프로그램분류명</th>
            <th className="border p-2">사용여부</th>
            <th className="border p-2">주관부서</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
              <tr key={idx} className="text-center">
              <td className="border p-2 text-blue-600 font-semibold">{row.id}</td>
              <td className="border p-2">{row.competency}</td>
              <td className="border p-2">{row.parent}</td>
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">
                <input type="checkbox" checked={row.isUsed} readOnly />
              </td>
              <td className="border p-2">{row.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <PageButton/>
    </div>
    )
}

export default CategoryList;