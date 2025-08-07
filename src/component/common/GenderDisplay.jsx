const GenderDisplay = ({ genderCode }) => {
  let genderText;
  switch (String(genderCode)) {
    case '10':
      genderText = '남자';
      break;
    case '20':
      genderText = '여자';
      break;
    default:
      genderText = '미지정';
  }

  return <span>{genderText}</span>;
};

export default GenderDisplay;
