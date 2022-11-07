import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api";
import Button from "../../components/Common/Button";
import useInput from "../../hooks/useInput";
import { AuthWrapper } from "./components/AuthWrapper";
import InputWithLabel from "./components/InputWithLabel";

export default function SignIn() {
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const naviagte = useNavigate();
  const queryclient = useQueryClient();

  const signinMutation = useMutation(signin, {
    onSuccess: (data, variables, context) => {
      naviagte(`/home`, { replace: true });
      console.log(data);
      queryclient.setQueryData("keywords", data);
      
      console.log("success", data, variables, context);
    },
    onError: (error, variable, context) => {
      window.alert(error.message);
      console.log("error", error, variable, context);
    },
  });
  const handleSubmit = () => {
    signinMutation.mutate({ nickname, password });
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
        <Button onClick={handleSubmit}>로그인</Button>
      </form>
    </AuthWrapper>
  );
}
