import coreCompetencyImage from '../../../assets/user/coreCompetencyImgae.jpg'

const CoreCompetencyImage = () =>{
    return (
    <div className="flex flex-col items-center justify-center p-9 mt-20 bg-white">
        <img
         src={coreCompetencyImage}
         alt="핵심역량"
         className="max-w-[650px] w-full h-auto bg-orange-100"
        />
    </div>
  );
}


export default CoreCompetencyImage;