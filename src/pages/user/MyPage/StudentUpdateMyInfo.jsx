import { useEffect, useMemo, useState } from "react";
import { CATEGORY, CODEBOOK } from "../../../component/common/CodeConverter/CodeBook";
import { fetchStudentByNo, updateMyInfo } from "../../../api/user/auth/studentsApi";
import TextInput from "../../../component/common/TextInput";
import PageHeader from "../../../component/common/PageHeader";
import { changePassword, getCurrentUser } from "../../../api/user/auth/loginApi";

function getBankGroupKey() {
    return (
        CATEGORY?.BANK ??
        CATEGORY?.CO0005 ??
        (CODEBOOK?.BANK ? "BANK" : undefined) ??
        (CODEBOOK?.CO0005 ? "CO0005" : undefined)
    );
}

function buildOptionsFromGroup(raw) {
    if (!raw) return { options: [], index: {} };

    let options = [];
    if (Array.isArray(raw)) {
        options = raw
            .map((item) => {
                const code = String(item.code ?? item.cd ?? item.value ?? item.key ?? item.CODE ?? item.CD ?? "");
                const label = String(item.label ?? item.cdNm ?? item.name ?? item.text ?? item.LABEL ?? item.CD_NM ?? code);
                return code ? { code, label } : null;
            })
            .filter(Boolean);
    } else if (typeof raw === "object") {
        options = Object.entries(raw).map(([code, label]) => ({
            code: String(code),
            label: String(label),
        }));
    }
    const index = options.reduce((acc, { code, label }) => {
        acc[code] = label;
        return acc;
    }, {});
    return { options, index };
}


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
        bankCd: "",        // 코드만 전송
        accountHolder: "", // 표시용(전송 X)
        accountNumber: "", // bankAccountNo로 전송
    });

    const [saving, setSaving] = useState({ email: false, pwd: false, acct: false });

    // 은행 코드 그룹 + 옵션/인덱스
    const { bankGroupKey, bankOptions, bankIndex } = useMemo(() => {
        const groupKey = getBankGroupKey();
        const raw = groupKey ? CODEBOOK?.[groupKey] : undefined;
        const { options, index } = buildOptionsFromGroup(raw);
        return { bankGroupKey: groupKey, bankOptions: options, bankIndex: index };
    }, [CATEGORY, CODEBOOK]);

    // 초기 데이터 로딩
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

                const initBankCd = student?.bankCd ?? student?.bankCode ?? "";
                setEmailForm({ email: student?.stdntEmail ?? student?.email ?? "" });
                setAcctForm({
                    bankCd: initBankCd,
                    accountHolder: student?.accountHolder ?? "",
                    accountNumber: student?.accountNumber ?? "",
                });
            } catch (e) {
                console.error("개인정보 로딩 실패:", e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [bankGroupKey]); // CodeBook 그룹이 준비되면 로딩

    // 변경 핸들러
    const onChangeEmail = (e) => setEmailForm({ email: e.target.value });
    const onChangePwd = (field) => (e) => setPwdForm((f) => ({ ...f, [field]: e.target.value }));
    const onChangeAcct = (field) => (e) => setAcctForm((f) => ({ ...f, [field]: e.target.value }));

    // 검증
    const emailValid = useMemo(
        () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email),
        [emailForm.email]
    );
    const pwdError = useMemo(() => {
        if (!pwdForm.currentPassword) return "현재 비밀번호를 입력하세요.";
        if (!pwdForm.newPassword || pwdForm.newPassword.length < 8) return "새 비밀번호는 8자 이상이어야 합니다.";
        if (pwdForm.newPassword !== pwdForm.confirmPassword) return "새 비밀번호 확인이 일치하지 않습니다.";
        return null;
    }, [pwdForm]);

    // 계좌: 코드 + 번호만 필수
    const acctError = useMemo(() => {
        if (!acctForm.bankCd) return "은행을 선택하세요.";
        if (!acctForm.accountNumber || !/^\d{6,}$/.test(acctForm.accountNumber)) return "계좌번호를 숫자로 입력하세요.";
        return null;
    }, [acctForm.bankCd, acctForm.accountNumber]);

    const studentNo = me?.userId ?? me?.loginId;
    const bankLabel = acctForm.bankCd ? (bankIndex[acctForm.bankCd] ?? "") : "";

    // 제출: 이메일
    const submitEmail = async (e) => {
        e.preventDefault();
        if (!emailValid) return alert("올바른 이메일을 입력하세요.");
        if (!studentNo) return alert("사용자 정보가 없습니다. 다시 로그인해주세요.");

        try {
            setSaving((s) => ({ ...s, email: true }));
            await updateMyInfo(studentNo, { email: emailForm.email });
            alert("이메일이 수정되었습니다.");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message ?? "이메일 수정 실패");
        } finally {
            setSaving((s) => ({ ...s, email: false }));
        }
    };

    // 제출: 비밀번호
    const submitPassword = async (e) => {
        e.preventDefault();
        if (pwdError) return alert(pwdError);
        try {
            setSaving((s) => ({ ...s, pwd: true }));
            await changePassword({
                currentPassword: pwdForm.currentPassword,
                newPassword: pwdForm.newPassword,
            });
            alert("비밀번호가 변경되었습니다.");
            setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message ?? "비밀번호 변경 실패");
        } finally {
            setSaving((s) => ({ ...s, pwd: false }));
        }
    };

    // 제출: 계좌
    const submitAccount = async (e) => {
        e.preventDefault();
        if (acctError) return alert(acctError);
        if (!studentNo) return alert("사용자 정보가 없습니다. 다시 로그인해주세요.");

        try {
            setSaving((s) => ({ ...s, acct: true }));
            await updateMyInfo(studentNo, {
                bankAccountNo: acctForm.accountNumber,
                bankCd: acctForm.bankCd, // ← 코드만 전송
            });
            alert("계좌정보가 수정되었습니다.");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message ?? "계좌정보 변경 실패");
        } finally {
            setSaving((s) => ({ ...s, acct: false }));
        }
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

            {/* 요약 테이블 */}
            <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                        <tr>
                            <th className="px-3 py-2 border-b border-gray-200 text-center">항목</th>
                            <th className="px-3 py-2 border-b border-gray-200 text-center">현재 값</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="px-3 py-8 text-center text-gray-400 border-b border-gray-200" colSpan={2}>
                                    불러오는 중...
                                </td>
                            </tr>
                        ) : (
                            <>
                                <tr>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">이름</td>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">{me?.name ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">학번</td>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">{studentNo ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">이메일</td>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">{emailForm.email || "-"}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">계좌</td>
                                    <td className="px-3 py-2 border-b border-gray-200 text-center">
                                        {acctForm.bankCd
                                            ? `${bankLabel || "-"} / ${acctForm.accountHolder || "-"} / ${acctForm.accountNumber || "-"}`
                                            : "-"}
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 이메일 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">개인메일주소</h3>
                <form onSubmit={submitEmail} className="flex gap-3 items-start">
                    <div className="flex-1">
                        <TextInput
                            type="email"
                            placeholder="이메일 주소 입력"
                            value={emailForm.email}
                            onChange={onChangeEmail}
                            className="w-full rounded-md border border-blue-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {!emailValid && <p className="text-xs text-red-500 mt-1">올바른 이메일 형식을 입력하세요.</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={!emailValid || saving.email || !studentNo}
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving.email ? "저장중..." : "저장"}
                    </button>
                </form>
            </section>

            {/* 비밀번호 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">비밀번호 변경</h3>
                <form onSubmit={submitPassword} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <TextInput type="password" placeholder="현재 비밀번호" value={pwdForm.currentPassword} onChange={onChangePwd("currentPassword")} />
                    <TextInput type="password" placeholder="새 비밀번호 (8자 이상)" value={pwdForm.newPassword} onChange={onChangePwd("newPassword")} />
                    <TextInput type="password" placeholder="새 비밀번호 확인" value={pwdForm.confirmPassword} onChange={onChangePwd("confirmPassword")} />
                    {pwdError && <p className="md:col-span-3 text-xs text-red-500">{pwdError}</p>}
                    <div className="md:col-span-3 flex justify-end">
                        <button type="submit" disabled={!!pwdError || saving.pwd} className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                            {saving.pwd ? "변경중..." : "변경"}
                        </button>
                    </div>
                </form>
            </section>

            {/* 계좌 섹션 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">계좌정보</h3>
                <form onSubmit={submitAccount} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                        className="border border-blue-200 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={acctForm.bankCd}
                        onChange={(e) => setAcctForm(f => ({ ...f, bankCd: e.target.value }))}
                    >
                        <option value="">은행 선택</option>
                        {bankOptions.map((opt) => (
                            <option key={opt.code} value={opt.code}>{opt.label}</option>
                        ))}
                    </select>
                    <TextInput
                        type="text"
                        placeholder="예금주(표시용)"
                        value={acctForm.accountHolder}
                        onChange={onChangeAcct("accountHolder")}
                    />
                    <TextInput
                        type="text"
                        placeholder="계좌번호"
                        value={acctForm.accountNumber}
                        onChange={onChangeAcct("accountNumber")}
                    />
                    {acctError && <p className="md:col-span-3 text-xs text-red-500">{acctError}</p>}
                    <div className="md:col-span-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={!!acctError || saving.acct || !studentNo}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving.acct ? "저장중..." : "저장"}
                        </button>
                    </div>
                    <p className="md:col-span-3 text-xs text-gray-500">장학금/환급 처리를 위해 정확한 계좌정보를 입력하세요.</p>
                </form>
            </section>
        </div>
    );
}
