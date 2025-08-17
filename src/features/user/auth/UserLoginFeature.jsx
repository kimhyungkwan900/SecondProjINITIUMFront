
import { useState } from 'react';
import FindAccountLink from '../../../component/common/auth/FindAccountLink';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { login } from '../../../api/user/auth/loginApi';
import TextInput from '../../../component/common/TextInput';
import LogoHeader from '../../../component/common/auth/logoHeader';
import LoginButton from '../../../component/common/auth/LoginButton';

const UserLoginFeature = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ loginId, password });
      setUser(userData);
      window.location.replace('/');
    } catch (err) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.' + err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f6f9fc]">
      <LogoHeader logoSrc="/Logo/Logo.png" schoolName='TeamINITIUM' englishName='University' subtitle='학생역량관리 시스템 로그인' />
      <form
        onSubmit={handleLogin}
        className="w-[340px] flex flex-col gap-4 items-center"
      >
        <TextInput
          type="text"
          placeholder="아이디"
          className="w-full rounded-md border border-blue-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          className="w-full rounded-md border border-blue-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">로그인</LoginButton>
        <FindAccountLink />
      </form>
    </div>
  );
};

export default UserLoginFeature;
