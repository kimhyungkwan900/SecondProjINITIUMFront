
const SubContent = ({...program}) => {
    return(
        <div>
            <h2 className="text-lg font-semibold mb-4 text-center">📋프로그램 상세 내용</h2>
            <p className="font-bold">{program.eduPrps}</p> 
            <p>{program.eduDtlCn}</p>
            <div className="mt-10 font-bold">주소 : {program.eduPlcNm}</div>
            <div className="font-bold">주소를 꼭 확인 해주세요</div>
        </div>
    )
}

export default SubContent;