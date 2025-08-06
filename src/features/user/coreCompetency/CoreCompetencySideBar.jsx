import { Link } from "react-router-dom";

const CoreCompetencySideBar = () => {
    return (
        <div className="w-64 h-full bg-gradient-to-b from-blue-700 to-blue-500 text-white shadow-xl px-6 py-8 mt-10">
            <h2 className="text-2xl font-semibold text-white tracking-wide mb-8 border-b border-blue-300 pb-3 text-center">
                핵심역량안내
            </h2>
            <nav className="flex flex-col space-y-3 text-center text-[20px]">
                <Link
                    to="/competency/notice"
                    className="text-white hover:bg-blue-500 hover:bg-opacity-30 rounded-md px-4 py-2 transition duration-200"
                >
                    핵심역량안내
                </Link>
                <Link
                    to="/competency/coreCompetency"
                    className="text-white hover:bg-blue-500 hover:bg-opacity-30 rounded-md px-4 py-2 transition duration-200"
                >
                    핵심역량진단
                </Link>
            </nav>
        </div>
    );
};

export default CoreCompetencySideBar;
