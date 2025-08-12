import axiosInstance from "../../axiosInstance";

export const programSurvey = async(eduMngId) => {
    const response  = await axiosInstance.get("/extracurricular/survey/program",{
        params : {eduMngId : eduMngId}
    })  
    return response.data
}
export const surveyResponse = async (srvyId, responseDTO) => {
  const response = await axiosInstance.post(
    `/extracurricular/survey/response?srvyId=${srvyId}`, 
    responseDTO
  );
  return response.data;
};

export const deletePrograms = async (eduAplyIds) => {
  const params = new URLSearchParams();
  eduAplyIds.forEach(id => params.append('eduAplyIds', id));
  
  const response = await axiosInstance.put(`/extracurricular/apply/delete?${params.toString()}`);
  return response.data;
};