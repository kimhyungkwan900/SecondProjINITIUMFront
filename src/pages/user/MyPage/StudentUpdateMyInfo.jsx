import { useEffect, useMemo, useState } from "react";
import { fetchStudentByNo, updateMyInfo } from "../../../api/user/auth/studentsApi";
import TextInput from "../../../component/common/TextInput";
import PageHeader from "../../../component/common/PageHeader";
import { changePassword, getCurrentUser } from "../../../api/user/auth/loginApi";
import { BankSelect } from "../../../component/common/CodeConverter/CodeSelect";

export default function StudentUpdateMyInfo() {
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);

    // 폼 상태
    const [emailForm, setEmailForm] = useState({ email: "" });
    const [pwdForm, setPwdForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [acctForm, setAcctForm] = useState({
        bankCd: "",
        accountHolder: "",
        accountNumber: "",
    });
    
    // 각 섹션의 API 요청 상태
    const [saving, setSaving] = useState({ email: false, pwd: false, acct: false });
    // 각 섹션의 결과 피드백 상태
    const [feedback, setFeedback] = useState({ email: null, pwd: null, acct: null });

    // 비밀번호 유효성 검사를 위한 정규 표현식
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                const current = await getCurrentUser();
                if (!mounted) return;
                setMe(current);

                const studentNo = current.userId ?? current.loginId;
                const student = await fetchStudentByNo(studentNo);
                if (!mounted) return;

                setEmailForm({ email: student?.stdntEmail ?? student?.email ?? "" });
                setAcctForm({
                    bankCd: student?.bankCd ?? student?.bankCode ?? "",
                    accountHolder: student?.accountHolder ?? "",
                    accountNumber: student?.accountNumber ?? "",
                });
            } catch (e) {
                console.error("개인정보 로딩 실패:", e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const onChangeEmail = (e) => setEmailForm({ email: e.target.value });
    const onChangePwd = (field) => (e) => setPwdForm((f) => ({ ...f, [field]: e.target.value }));
    const onChangeAcct = (field) => (e) => setAcctForm((f) => ({ ...f, [field]: e.target.value }));

    // --- 유효성 검증 로직 ---
    const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email), [emailForm.email]);
    const pwdError = useMemo(() => {
        const { currentPassword, newPassword, confirmPassword } = pwdForm;
        if (!currentPassword && !newPassword && !confirmPassword) return null;
        if (!currentPassword || !newPassword || !confirmPassword) return "모든 비밀번호 필드를 입력해주세요.";
        if (!PWD_REGEX.test(newPassword)) return "새 비밀번호는 8자 이상, 영문, 숫자, 특수문자($@$!%*#?&)를 포함해야 합니다.";
        if (newPassword !== confirmPassword) return "새 비밀번호 확인이 일치하지 않습니다.";
        return null;
    }, [pwdForm]);
    const acctError = useMemo(() => {
        if (!acctForm.bankCd && !acctForm.accountNumber) return null; // 초기 상태에서는 에러 없음
        if (!acctForm.bankCd) return "은행을 선택하세요.";
        if (!acctForm.accountNumber || !/^\d{6,}$/.test(acctForm.accountNumber)) return "계좌번호를 올바르게 입력하세요.";
        return null;
    }, [acctForm.bankCd, acctForm.accountNumber]);

    const studentNo = me?.userId ?? me?.loginId;

    // --- 제출 핸들러 ---
    const submitEmail = async (e) => {
        e.preventDefault();
        if (!emailValid) return alert("올바른 이메일을 입력하세요.");
        if (!studentNo) return alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
        
        setSaving((s) => ({ ...s, email: true }));
        setFeedback(f => ({ ...f, email: null }));
        try {
            await updateMyInfo(studentNo, { email: emailForm.email });
            setFeedback(f => ({ ...f, email: { type: 'success', message: "이메일이 수정되었습니다." }}));
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.message ?? "이메일 수정 실패";
            setFeedback(f => ({ ...f, email: { type: 'error', message }}));
        } finally {
            setSaving((s) => ({ ...s, email: false }));
        }
    };

    const submitPassword = async (e) => {
        e.preventDefault();
        if (pwdError) return alert(pwdError);
        
        setSaving((s) => ({ ...s, pwd: true }));
        setFeedback(f => ({ ...f, pwd: null }));
        try {
            await changePassword({
                currentPassword: pwdForm.currentPassword,
                newPassword: pwdForm.newPassword,
            });
            setFeedback(f => ({ ...f, pwd: { type: 'success', message: "비밀번호가 변경되었습니다." }}));
            setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.message ?? "비밀번호 변경 실패";
            setFeedback(f => ({ ...f, pwd: { type: 'error', message }}));
        } finally {
            setSaving((s) => ({ ...s, pwd: false }));
        }
    };

    const submitAccount = async (e) => {
        e.preventDefault();
        if (acctError) return alert(acctError);
        if (!studentNo) return alert("사용자 정보가 없습니다. 다시 로그인해주세요.");

        setSaving((s) => ({ ...s, acct: true }));
        setFeedback(f => ({ ...f, acct: null }));
        try {
            await updateMyInfo(studentNo, {
                bankAccountNo: acctForm.accountNumber,
                bankCd: acctForm.bankCd,
            });
            setFeedback(f => ({ ...f, acct: { type: 'success', message: "계좌정보가 수정되었습니다." }}));
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.message ?? "계좌정보 변경 실패";
            setFeedback(f => ({ ...f, acct: { type: 'error', message }}));
        } finally {
            setSaving((s) => ({ ...s, acct: false }));
        }
    };
    
    // 피드백 메시지 렌더링을 위한 헬퍼 컴포넌트
    const FeedbackMessage = ({ feedback }) => {
        if (!feedback) return null;
        const color = feedback.type === 'success' ? 'text-blue-600' : 'text-red-500';
        return <p className={`text-sm ${color}`}>{feedback.message}</p>;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <PageHeader
                title="개인정보 수정"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "개인정보 수정", active: true },
                ]}
            />
            {/* 이메일 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">개인메일주소</h3>
                <form onSubmit={submitEmail} className="space-y-3">
                    <div className="flex gap-3 items-start">
                        <div className="flex-1">
                            <TextInput type="email" placeholder="이메일 주소 입력" value={emailForm.email} onChange={onChangeEmail} />
                            {!emailValid && emailForm.email && <p className="text-xs text-red-500 mt-1">올바른 이메일 형식을 입력하세요.</p>}
                        </div>
                        <button type="submit" disabled={!emailValid || saving.email || !studentNo} className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                            {saving.email ? "저장중..." : "저장"}
                        </button>
                    </div>
                    <FeedbackMessage feedback={feedback.email} />
                </form>
            </section>

            {/* 비밀번호 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">비밀번호 변경</h3>
                <form onSubmit={submitPassword} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <TextInput type="password" placeholder="현재 비밀번호" value={pwdForm.currentPassword} onChange={onChangePwd("currentPassword")} />
                        <TextInput type="password" placeholder="새 비밀번호" value={pwdForm.newPassword} onChange={onChangePwd("newPassword")} />
                        <TextInput type="password" placeholder="새 비밀번호 확인" value={pwdForm.confirmPassword} onChange={onChangePwd("confirmPassword")} />
                    </div>
                    <p className="text-xs text-gray-500 pt-1">최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요.</p>
                    {pwdError && <p className="text-xs text-red-500">{pwdError}</p>}
                    <div className="flex justify-between items-center pt-2">
                        <FeedbackMessage feedback={feedback.pwd} />
                        <button type="submit" disabled={!!pwdError || saving.pwd} className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ml-auto">
                            {saving.pwd ? "변경중..." : "변경"}
                        </button>
                    </div>
                </form>
            </section>

            {/* 계좌 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">계좌정보</h3>
                <form onSubmit={submitAccount} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <BankSelect
                            value={acctForm.bankCd}
                            onChange={onChangeAcct("bankCd")}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <TextInput type="text" placeholder="예금주" value={acctForm.accountHolder} onChange={onChangeAcct("accountHolder")} />
                        <TextInput type="text" placeholder="계좌번호" value={acctForm.accountNumber} onChange={onChangeAcct("accountNumber")} />
                    </div>
                    <p className="text-xs text-gray-500 pt-2">장학금/환급 처리를 위해 정확한 계좌정보를 입력하세요.</p>
                    {acctError && <p className="text-xs text-red-500">{acctError}</p>}
                    <div className="flex justify-between items-center pt-2">
                        <FeedbackMessage feedback={feedback.acct} />
                        <button type="submit" disabled={!!acctError || saving.acct || !studentNo} className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ml-auto">
                            {saving.acct ? "저장중..." : "저장"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}