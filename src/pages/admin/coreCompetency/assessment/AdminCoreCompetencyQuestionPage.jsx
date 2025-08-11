import AdminQuestionDetail from "./AdminQuestionDetail";
import AdminQuestionList from "./AdminQuestionList";

const AdminCoreCompetencyQuestionPage = ({assessmentId}) => {
  return(
    <div>
        <AdminQuestionList assessmentId = {assessmentId}/>    </div>
  );
};
export default AdminCoreCompetencyQuestionPage;