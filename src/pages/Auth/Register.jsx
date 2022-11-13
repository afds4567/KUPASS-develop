import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";
import Button from "../../components/Common/Button";
import useInput from "../../hooks/useInput";
import AuthError from "./components/AuthError";
import { AuthWrapper } from "./components/AuthWrapper";
import InputWithLabel from "./components/InputWithLabel";
import RightLink from "./components/RightLink";

export default function Register() {
  const [nickname, onChangeNickname, setNickname] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, onChangePaswordCheck] = useInput("");
  const [idError, setIdError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [IdMessage, setIdMessage] = useState('')
  const [pwdMessage, setPwdMessage] = useState('')
  const naviagte = useNavigate();
  const registerMutation = useMutation(register, {
    onSuccess: (data, variables, context) => {
      naviagte(`/signin`);
    },
    onError: (error, variable, context) => {
      window.alert(error.response.status);
      const code = error.response.status;
      const IdFormat = error.response.data.message === "not supported id format";
      const pwdFormat = error.response.data.message === "not supported pw format";
      if (code === 409) { setIdMessage('중복된 ID입니다. 다른 ID를 사용하세요'); setIdError(true);setPwdError(false); }
      if (IdFormat) { setIdMessage('대,소문자,숫자,특수문자 5~20자 이하 ID를 사용하세요'); setIdError(true);setPwdError(false); }
      if (pwdFormat) { setPwdMessage('대,소문자,숫자,특수문자 8~20자 이하 비밀번호를 사용하세요'); setPwdError(true);setIdError(false); }      
    },
  });
  const handleSubmit = () => {
    if (password != passwordCheck) {
      setPwdError(true);
      setPwdMessage('비밀번호가 일치하지 않습니다. 확인해주세요')
      return;
    }
    registerMutation.mutate({ nickname, password, passwordCheck });
  };
  useEffect(() => {
    setIdMessage('')
    setPwdError('');
    setIdError(false);
    setPwdError(false)
  }, [])
  
  return (
    <AuthWrapper title="회원가입">
      <form onSubmit={handleSubmit}>
        <InputWithLabel
          label="아이디"
          name="nickname"
          onChange={onChangeNickname}
          value={nickname}
          placeholder="아이디"
        />
        {idError && <AuthError>{IdMessage}</AuthError>}
        <InputWithLabel
          label="비밀번호"
          name="password"
          onChange={onChangePassword}
          value={password}
          type="password"
          placeholder="비밀번호"
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="passwordCheck"
          onChange={onChangePaswordCheck}
          value={passwordCheck}
          type="password"
          placeholder="비밀번호 확인"
        />
        {pwdError && <AuthError>{pwdMessage}</AuthError>}
        <Button type="submit" onClick={handleSubmit}>
          회원가입
        </Button>
        <RightLink to="/signin">로그인</RightLink>
      </form>
    </AuthWrapper>
  );
}
