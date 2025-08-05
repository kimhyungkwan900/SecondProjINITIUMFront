import ApplyConsultBox from "./ApplyConsultBox";

const ApplyConsultList = ()=>{
    return(
        <div className="flex flex-col fixed z-[1] top-[230px] left-[280px] w-4/5">
            <ApplyConsultBox imgSrc={''} name={'지도교수 상담'} description={'교수님과 상담을 원하는 학생은 상담을 신청해주세요.'} type={'상담신청'}/>
            <ApplyConsultBox name={'진로취업 상담'} description={'진로에 고민이 있거나 취업정보가 부족해 피드백이 필요한 학생은 상담을 신청해주세요.'} type={'상담신청'}/>
            <ApplyConsultBox name={'심리상담'} description={'심리적 어려움이나 고민이 있는 학생은 상담을 신청해주세요.'} type={'상담신청'}/>
            <ApplyConsultBox name={'학습상담'} description={'학습 방법이나 성적 향상에 대해 상담이 필요한 학생은 신청해주세요.'} type={'상담신청'}/>
        </div>
    );
}
export default ApplyConsultList;

// 이미지 출저: 
// <a href="https://kr.freepik.com/free-vector/set-three-light-bulb-represent-effective-business-idea-concept_37588597.htm">작가 starline 출처 Freepik</a>
//
//
//