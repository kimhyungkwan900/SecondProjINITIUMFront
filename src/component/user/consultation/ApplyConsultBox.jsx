const ApplyConsultBox = ({imageSrc, name, description, type})=>{
    return(
        <div className="flex items-start border-1 mb-3 p-3 border-[#222E8D] space-x-6">
            {/* <!-- 원형 프로필/아이콘 자리 --> */}
            <div className="w-12 h-12 bg-gray-200 rounded-full">
                <img src={imageSrc} />
            </div>
            {/* <!-- 오른쪽 컨텐츠 --> */}
            <div className="flex-1">
                {/* <!-- 상단 라벨 --> */}
                <div className="inline-block text-gray-700 text-2xl font-bold px-2 py-1 rounded">{name}</div>

                {/* <!-- 설명 텍스트 자리 --> */}
                <div className="text-base mt-2 ml-2 h-4 rounded w-full">{description}</div>

                {/* <!-- 신청 버튼 --> */}
                <button className="mt-4 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded">
                    {type}
                </button>
            </div>
        </div>
    );
}
export default ApplyConsultBox;