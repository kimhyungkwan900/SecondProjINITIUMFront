// 로컬 이미지 파일 import (상대 경로 기준)
import coreCompetencyImage from '../../../assets/user/coreCompetencyImgae.jpg';

const CoreCompetencyImage = () => {
  return (
    // 전체 이미지 영역 컨테이너
    <div className="flex flex-col items-center justify-center p-9 mt-20 bg-white">
      {/* 핵심역량 이미지 출력 */}
      <img
        src={coreCompetencyImage} // 이미지 경로
        alt="핵심역량"            // 접근성 및 SEO를 위한 대체 텍스트
        className="max-w-[650px] w-full h-auto bg-orange-100" // 스타일 지정
        // max-w: 이미지 최대 너비 제한
        // w-full: 부모 기준 너비 100%
        // h-auto: 비율 유지
        // bg-orange-100: 로딩 실패 시 배경색 표시용
      />
    </div>
  );
};

export default CoreCompetencyImage;
