import AdminQuestionManager from "../../../../features/user/coreCompetency/admin/AdminQuestionManager";

const AdminCoreCompetencyQuestionPage = ({ assessmentId, subCategoryId }) => {
  return (
    <div>
      <AdminQuestionManager assessmentId={assessmentId} subCategoryId={subCategoryId} />
    </div>
  );
};

export default AdminCoreCompetencyQuestionPage;
