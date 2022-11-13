import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api";
import Button from "../../components/Common/Button";
import useInput from "../../hooks/useInput";
import { storage } from "../../utils";
import AuthError from "./components/AuthError";
import { AuthWrapper } from "./components/AuthWrapper";
import InputWithLabel from "./components/InputWithLabel";
import RightLink from "./components/RightLink";

export default function SignIn() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const naviagte = useNavigate();
  const queryclient = useQueryClient();

  const signinMutation = useMutation(signin, {
    onSuccess: (data, variables, context) => {
      naviagte(`/home`, { replace: true });
      queryclient.setQueryData("keywords", data);
      storage.setName(variables?.nickname);
      storage.setKeywords(data)
    },
    onError: (error, variable, context) => {
      setError(true);
      setMessage('아이디와 비밀번호를 다시 확인해주세요')
      //window.alert(error.message);
    },
  });
  const handleSubmit = () => {
    signinMutation.mutate({ nickname, password });
    setMessage('')
  };
  return (
    <AuthWrapper title="로그인">
      <form onSubmit={handleSubmit}>
        <InputWithLabel
          label="아이디"
          name="nickname"
          onChange={onChangeNickname}
          value={nickname}
          placeholder="아이디"
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          onChange={onChangePassword}
          value={password}
          type="password"
          placeholder="비밀번호"
        />
        {error && <AuthError>{message}</AuthError>}
        <Button onClick={handleSubmit}>로그인</Button>
        <RightLink to="/register">회원가입</RightLink>
      </form>
    </AuthWrapper>
  );
}
