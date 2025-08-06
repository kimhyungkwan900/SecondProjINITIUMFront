const StudentStatusDisplay = ({ statusCode }) => {
  let statusText;
  switch (String(statusCode)) {
    case '10':
      statusText = '재학';
      break;
    case '20':
      statusText = '휴학';
      break;
    case '30':
      statusText = '제적';
      break;
    case '40':
      statusText = '수료';
      break;
    case '50':
      statusText = '졸업';
      break;
    default:
      statusText = '미지정';
  }

  return <span>{statusText}</span>;
};

export default StudentStatusDisplay;
