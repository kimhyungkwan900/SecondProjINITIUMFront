import axios from "axios";

export const getMileageSummary = async (studentNo, page = 1, size = 10) => {
  const response = await axios.get("/api/user/mileage/summary", {
    params: { studentNo, page, size },
  });
  return response.data;
};