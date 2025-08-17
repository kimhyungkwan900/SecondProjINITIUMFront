import { useCallback, useEffect, useState } from "react";
import { fetchSurveyByProgram, getSurveyParticipationStatus } from "../../../api/admin/extracurricular/survey/SurveyApi";

export default function useProgramSurvey(eduMngId, { pageSize = 5 } = {}) {
  const [status, setStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  const [page, setPage] = useState(0); // 0-based
  const [size, setSize] = useState(pageSize);
  const [list, setList] = useState({ content: [], totalElements: 0, number: 0, totalPages: 0 });
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");

  const reloadStatus = useCallback(async () => {
    if (eduMngId == null) return;
    try {
      setStatusLoading(true);
      setStatusError("");
      const s = await getSurveyParticipationStatus(eduMngId);
      setStatus(s);
    } catch (e) {
      setStatus(null);
      setStatusError(e.message || "참여현황 조회에 실패했습니다.");
    } finally {
      setStatusLoading(false);
    }
  }, [eduMngId]);

  const reloadList = useCallback(async (overridePage) => {
    if (eduMngId == null) return;
    const nextPage = typeof overridePage === "number" ? overridePage : page;
    try {
      setListLoading(true);
      setListError("");
      const p = await fetchSurveyByProgram(eduMngId, nextPage, size);
      setList({
        content: p?.content || [],
        totalElements: p?.totalElements ?? 0,
        number: p?.number ?? nextPage,
        totalPages: p?.totalPages ?? 0,
      });
    } catch (e) {
      setList({ content: [], totalElements: 0, number: nextPage, totalPages: 0 });
      setListError(e.message || "설문 응답 조회에 실패했습니다.");
    } finally {
      setListLoading(false);
    }
  }, [eduMngId, page, size]);

  useEffect(() => {
    // eduMngId가 바뀌면 page를 0으로 초기화하고 둘 다 로드
    setPage(0);
    reloadStatus();
    reloadList(0);
  }, [eduMngId, reloadStatus, reloadList]);

  // 페이지 변경 핸들러
  const setPageSafe = useCallback((p) => {
    setPage(p);
    reloadList(p);
  }, [reloadList]);

  return {
    // 참여현황
    status, statusLoading, statusError, reloadStatus,
    // 목록
    list, listLoading, listError, page, size, setSize, setPage: setPageSafe, reloadList,
  };
}