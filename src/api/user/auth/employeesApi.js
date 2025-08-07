import axios from "axios";

export const fetchEmployeeByNo = async (empNo) => {
  const res = await axios.get(`http://localhost:8080/api/employees/${empNo}`);
  return res.data;
};
