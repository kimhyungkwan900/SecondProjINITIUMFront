import axios from "axios";
import { useEffect, useState } from "react";

const CoreCompetencyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('/api/ideal-talent-profile/tree', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
      .then((res) => {
        // 응답이 배열인지 확인 후 설정
        if (Array.isArray(res.data)) {
          setData(res.data);
          console.log("API 응답:", res.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", res.data);
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>EARTH 인재상</h1>
      <table>
        <thead>
          <tr>
            <th>인재상</th>
            <th>핵심역량</th>
            <th>핵심역량 정의</th>
            <th>하위역량</th>
            <th>하위역량 정의</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.idealTalent}</td>
              <td>{row.coreName}</td>
              <td>{row.coreDefinition}</td>
              <td>{row.subName}</td>
              <td>{row.subDefinition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoreCompetencyTable;
