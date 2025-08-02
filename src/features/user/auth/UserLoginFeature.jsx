import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/user/auth/loginApi';
import { UserContext } from '../../../App';
import TextInput from '../../../component/common/TextInput';
import LoginButton from '../../../component/common/auth/LoginButton';
import FindAccountLink from '../../../component/common/auth/FindAccountLink';
import LogoHeader from '../../../component/common/auth/logoHeader';

const UserLoginFeature = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ loginId, password });
      setUser(userData);
      navigate('/');
    } catch (err) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.' + err);
    }
  };

return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f6f9fc]">
      <LogoHeader logoSrc='' schoolName='TeamINITIUM' englishName='University' subtitle='학생역량관리 시스템 로그인' />
      <form
        onSubmit={handleLogin}
        className="w-[340px] flex flex-col gap-4 items-center"
      >
        <TextInput
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <LoginButton type="submit">로그인</LoginButton>
        <FindAccountLink />
      </form>
    </div>
  );
};

export default UserLoginFeature;
