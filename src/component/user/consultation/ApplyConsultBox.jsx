import LinkedButton from "../../common/LinkedButton";

const ApplyConsultBox = ({info})=>{
    return(
        <div className="flex items-start border-1 mb-3 p-3 border-[#222E8D] space-x-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full">
                <img src={info.imageSrc} />
            </div>
            <div className="flex-1">
                <div className="inline-block text-gray-700 text-xl font-bold px-2 py-1 rounded">{info.name}</div>

                <div className="text-base mt-2 ml-2 h-4 rounded w-full">{info.description}</div>

                <div className="mt-4">
                    <LinkedButton to={info.link} variant="primary">
                        {info.type}
                    </LinkedButton>
                </div>
            </div>
        </div>
    );
}
export default ApplyConsultBox;