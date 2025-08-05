
import { Link } from "react-router-dom";

const CoreCompetencySideBar = () =>{
    return(
        <div>
            <h2>핵심역량안내</h2>
            <nav>
                <Link to="/competency/notice" className="hover:text-gray-400">핵심역량안내</Link>
                <Link to="/competency/coreCompentency" className="hover:text-gray-400">핵심역량진단</Link>
            </nav>
        </div>
    );
};

export default CoreCompetencySideBar;