import { FaStar, FaRegStar } from "react-icons/fa";
import ProgramProgressBar from "../../../component/user/ProgramCard/ProgramProgressBar";
import { Link } from "react-router-dom";

export default function ProgramCard({
    id, title, imageUrl, daysLeft, mileage, category, isFavorite, hits, pick,
    tag, description, applicationPeriod, operatingPeriod, participants, capacity, onToggleFavorite
}) {

    return (

        <div className="w-64 rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200 ">
            <Link to={`/program/${id}`} className="block">
                {/* 이미지 + D-day + 마일리지 */}
                <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 left-2 flex flex-col items-start">
                            {daysLeft >= 0 ? 
                            <span className="bg-[#41a5ff] text-white text-xs font-bold rounded px-2 py-1 mb-1 shadow">D-{daysLeft}</span> 
                                : <span className="bg-[#48545e] text-white text-xs font-bold rounded px-2 py-1 mb-1 shadow">{daysLeft}</span> }
                        <span className="bg-white text-[#28B8B2] border border-[#28B8B2] text-xs font-bold rounded px-2 py-0.5 flex items-center gap-1">
                            <img src="/mileage-icon.png" alt="마일리지" className="w-4 h-4" />
                            {mileage}
                        </span>
                    </div>
                    <button
                        className="absolute top-2 right-2 text-red-400 hover:scale-110 transition"
                        onClick={onToggleFavorite}
                    >
                        {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
                    </button>
                    
                    <span className="absolute bottom-2 right-2 text-xs bg-white/80 px-2 py-0.5 rounded text-gray-600">
                        {pick}{hits}
                    </span>
                </div>
                {/* 본문 */}
                <div className="p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs text-[#28B8B2] font-semibold">{category}</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-[#477f5b] font-semibold">{tag}</span>
                        <span className="text-xs text-gray-400">|</span>
                    </div>
                    <div className="font-bold text-base mb-1 truncate">{title}</div>
                    <div className="text-xs text-gray-600 mb-2">{description}</div>
                    <div className="text-xs text-gray-500">
                        <div>
                            <span className="font-semibold text-gray-700">신청</span> : {applicationPeriod}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">운영</span> : {operatingPeriod}
                        </div>
                    </div>
                    <div className="mt-2">
                        <ProgramProgressBar current={participants} max={capacity} />
                    </div>
                </div>
            </Link>
        </div>
    );
}