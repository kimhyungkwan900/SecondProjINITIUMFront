import { useNavigate, useLocation } from "react-router-dom";

const DiagnosisTabButtons = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isListPage = location.pathname.includes("/coreCompetency/list");
    const isResultPage = location.pathname.includes("/coreCompetency/result");

    return (
        <div className="mt-5 mb-6 px-2">
            <div className="flex border border-gray-300 rounded-md overflow-hidden shadow-sm text-[20px] font-medium">
                <button
                    onClick={() => navigate("/competency/coreCompetency/list")}
                    className={`flex-1 py-3 transition duration-200 ${
                        isListPage
                            ? "bg-white text-blue-700 font-semibold"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                    }`}
                >
                    진단목록
                </button>
                <button
                    onClick={() => navigate("/competency/coreCompetency/result")}
                    className={`flex-1 py-3 transition duration-200 ${
                        isResultPage
                            ? "bg-white text-blue-700 font-semibold"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                    }`}
                >
                    진단결과
                </button>
            </div>
        </div>
    );
};

export default DiagnosisTabButtons;
