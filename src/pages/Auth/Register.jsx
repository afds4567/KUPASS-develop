import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";
import Button from "../../components/Common/Button";
import useInput from "../../hooks/useInput";
import { AuthWrapper } from "./components/AuthWrapper";
import InputWithLabel from "./components/InputWithLabel";
import RightLink from "./components/RightLink";

export default function Register() {
  const [nickname, onChangeNickname, setNickname] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, onChangePaswordCheck] = useInput("");
  const naviagte = useNavigate();
  const registerMutation = useMutation(register, {
    onSuccess: (data, variables, context) => {
      naviagte(`/signin`);
      console.log("success", data, variables, context);
    },
    onError: (error, variable, context) => {
      window.alert(error.message);
      console.log("error", error, variable, context);
    },
  });
  const handleSubmit = () => {
    registerMutation.mutate({ nickname, password, passwordCheck });
  };
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
        <Button type="submit" onClick={handleSubmit}>
          회원가입
        </Button>
        <RightLink to="/signin">로그인</RightLink>
      </form>
    </AuthWrapper>
  );
}
