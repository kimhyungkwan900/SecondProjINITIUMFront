import axios from "axios";
import { useEffect, useState } from "react";

const CoreCompetencyTable = () =>{

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios
        .get('/api/ideal-talent-profile/tree') //API 요청
        .then((res)=>setData(res.data)) //응답 데이터를 상태에 저장
        .catch((err)=> console.log(err));   //에러 발생 시 콘솔 출력
    },[]); //컴포넌트 마운트 시 1번만 실행

    return(
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
                    {data.map((row, idx)=>{
                        <div key={idx}>
                            <td>{row.idealTalent}</td>
                            <td>
                                <div>{row.coreName}</div>
                                <div>{row.coreDefinition}</div>
                            </td>
                                <td>{row.subName}</td>
                                <td>{row.subDefinition}</td>
                        </div>
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default CoreCompetencyTable;