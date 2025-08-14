import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"; // Use Link for internal navigation

const PageHeader = ({
    title = "페이지 제목",
    breadcrumb = [],
    className = "",
}) => {
    // --- 공통 스타일 변수 정의 ---
    const titleStyle = "text-3xl font-bold text-[#354649]";
    const breadcrumbContainerStyle = "text-[#6C7A89] text-base whitespace-nowrap flex items-center gap-1 ml-auto";
    const iconStyle = "mr-1 text-[#A3C6C4]";
    const separatorStyle = "mx-1 text-[#A3C6C4]";
    const activeLinkStyle = "text-[#354649] font-bold";
    const inactiveLinkStyle = "hover:text-[#354649]";

    return (
        // 흰색 배경과 하단 테두리를 추가하여 페이지의 다른 섹션과 구분
        <div className={`w-full bg-white border-b border-[#A3C6C4] ${className}`}>
            <div className="max-w-7xl mx-auto px-6 py-7 flex justify-between items-center">
                <h1 className={titleStyle}>{title}</h1>
                <nav className={breadcrumbContainerStyle} aria-label="breadcrumb">
                    <FaHome className={iconStyle} />
                    {breadcrumb.map((item, idx) => (
                        <span key={idx} className="flex items-center">
                            {idx !== 0 && <span className={separatorStyle}>&gt;</span>}
                            {item.link ? (
                                <Link
                                    to={item.link}
                                    className={item.active ? activeLinkStyle : inactiveLinkStyle}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={item.active ? activeLinkStyle : ""}>
                                    {item.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default PageHeader;
