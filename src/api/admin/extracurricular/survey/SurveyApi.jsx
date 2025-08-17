import { buildParamsWithSort, cleanParams, unwrap } from "../../../../utils/apiUtils";
import axiosInstance from "../../../axiosInstance";

export async function fetchSurveyByProgram(eduMngId, page = 0, size = 5, options = {}) {
  try {
    const { sort } = options;
    const { cleaned, serializer } = buildParamsWithSort({
      eduMngId,
      page,
      size,
      sort,
    });

    const res = await axiosInstance.get("/extracurricular/survey/list", {
      params: cleaned,
      paramsSerializer: serializer,
    });
    return res.data;
  } catch (err) {
    throw unwrap(err);
  }
}

export async function getSurveyParticipationStatus(eduMngId) {
  try {
    const res = await axiosInstance.get("/extracurricular/survey/participation-status", {
      params: cleanParams({ eduMngId }),
    });
    return res.data;
  } catch (err) {
    throw unwrap(err);
  }
}
