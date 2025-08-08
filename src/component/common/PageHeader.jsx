import { FaHome } from "react-icons/fa";

const PageHeader = ({
    title = "페이지 제목",
    breadcrumb = [],
    className = "",
}) => {
    return (
        <div className={`bg-gray-100 border-b border-gray-200 ${className}`}>
            <div className="max-w-[1200px] mx-auto px-6 py-7 flex justify-between items-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="text-gray-600 text-base whitespace-nowrap flex items-center gap-1 ml-auto">
                    <FaHome className="mr-1 text-gray-400" />
                    {breadcrumb.map((item, idx) => (
                        <span key={idx}>
                            {idx !== 0 && <span className="mx-1 text-gray-400">&gt;</span>}
                            {item.link ? (
                                <a href={item.link} className={item.active ? "text-[#226ad9] font-bold" : ""}>
                                    {item.label}
                                </a>
                            ) : (
                                <span className={item.active ? "text-[#226ad9] font-bold" : ""}>
                                    {item.label}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
