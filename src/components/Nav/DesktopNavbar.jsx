import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import kupass from "../../images/logo.PNG";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { queryclient } from "../../lib/react-query";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.85rem 2rem;
  margin-bottom: 4rem;
  z-index: 1;
  box-shadow: 1px 1px 10px -5px black;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 7rem;
  height: auto;
`;

const Search = styled.form`
  color: black;
  display: flex;
  margin-right: 2rem;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
`;

const Login = styled.button`
  background: red;
  color: white !important;
  height: 2rem;
  font-size: 14px !important;
  letter-spacing: 0.1rem;
  border-radius: 0.3rem;
  padding: 0 1rem;
  cursor: pointer;
`;
export default function DesktopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { register, handleSubmit } = useForm();
  const naviagte = useNavigate();
  const onValid = (data) => {
    naviagte(`/search?keyword=${data.keyword}`);
    queryclient.invalidateQueries("title");
  };
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  return (
    <Nav>
      <Logo src={kupass} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            transition={{ type: "linear" }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="검색어를 입력하세요"
          />
        </Search>
        <Link to="/signin"
          onClick={()=>window.alert("로그아웃 성공!!")}>
          <Login>로그아웃</Login>
        </Link>
      </div>
    </Nav>
  );
}
