import LinkedButton from "../../common/LinkedButton";

const ApplyConsultBox = ({info})=>{
    return(
        <div className="flex items-start border-1 mb-3 p-3 border-[#222E8D] space-x-6">
            {/* <!-- 원형 프로필/아이콘 자리 --> */}
            <div className="w-12 h-12 bg-gray-200 rounded-full">
                <img src={info.imageSrc} />
            </div>
            {/* <!-- 오른쪽 컨텐츠 --> */}
            <div className="flex-1">
                {/* <!-- 상단 라벨 --> */}
                <div className="inline-block text-gray-700 text-2xl font-bold px-2 py-1 rounded">{name}</div>

                {/* <!-- 설명 텍스트 자리 --> */}
                <div className="text-base mt-2 ml-2 h-4 rounded w-full">{info.description}</div>

                {/* <!-- 신청 버튼 --> */}
                <LinkedButton to={info.link} variant="primary">
                    {info.type}
                </LinkedButton>
            </div>
        </div>
    );
}
export default ApplyConsultBox;