// 로컬 이미지 파일 import (상대 경로 기준)
import coreCompetencyImage from "../../../assets/user/coreCompetencyImgae.jpg";

const CoreCompetencyImage = () => {
  return (
    <div className="w-full flex justify-center">
      <img
        src={coreCompetencyImage}
        alt="핵심역량"
        className="block mx-auto max-w-[700px] w-full h-auto"
      />
    </div>
  );
};

export default CoreCompetencyImage;
