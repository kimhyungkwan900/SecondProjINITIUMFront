import { Link } from "react-router-dom";

const CoreCompetencySideBar = ({navItems}) => {
    return (
        <div className="w-64 h-full bg-gradient-to-b from-blue-700 to-blue-500 text-white shadow-xl px-6 py-8 mt-20">
            <h2 className="text-2xl font-semibold text-white tracking-wide mb-8 border-b border-blue-300 pb-3 text-center">
                {navItems[0]}
            </h2>
            <nav className="flex flex-col space-y-3 text-center text-[20px]">
                <Link
                    to={navItems[1].link}
                    className="text-white hover:bg-blue-500 hover:bg-opacity-30 rounded-md px-4 py-2 transition duration-200"
                >
                    {navItems[1].name}
                </Link>
                <Link
                    to={navItems[2].link}
                    className="text-white hover:bg-blue-500 hover:bg-opacity-30 rounded-md px-4 py-2 transition duration-200"
                >
                    {navItems[2].name}
                </Link>
            </nav>
        </div>
    );
};

export default CoreCompetencySideBar;
