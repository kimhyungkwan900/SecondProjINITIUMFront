// useRequireAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth.jsx";
import useStudentInfo from "../../../hooks/useStudentInfo";

const useRequireAuth = (redirectPath = '/login')=>{
    const { user } = useAuth();
    const { student } = useStudentInfo(user?.loginId);
    // const { student, loading, error } = useStudentInfo(user?.loginId);

    const navigate = useNavigate();

    useEffect(() => {
        if (student === null) {
            alert('로그인이 필요합니다.');
            navigate(redirectPath, { replace: true });
        }
    }, [student, navigate, redirectPath]);

    return student;
}
export default useRequireAuth;