import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
import DeskTopLayout from "./DeskTopLayout";
import MobileLayout from "./MobileLayout";

export default function ResponsiveLayout({ children }) {
  const [isAuth, setisAuth] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location == ("/register" || "/signin")) {
      setisAuth(true);
    } else {
      setisAuth(false);
    }
  }, [location]);

  let isRegister = false;
  let isSignIn = false;
  const SignUp = () => {
    isRegister = location.pathname == "/register";
    if (isRegister) setisAuth(true);
    return isRegister && <Register />;
  };
  const Login = () => {
    isSignIn = location.pathname == "/signin";
    if (isSignIn) setisAuth(true);
    return isSignIn && <SignIn />;
  };
  const Desktop = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return !isAuth && isDesktop && <DeskTopLayout>{children}</DeskTopLayout>;
  };
  const Mobile = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return !isAuth && isMobile && <MobileLayout>{children}</MobileLayout>;
  };
  return (
    <div>
      {/* <SignUp />
      <Login /> */}
      {location == ("/register" || "/signin") ? (
        <>{children}</>
      ) : (
        <>
          <Desktop />
          <Mobile />
        </>
      )}
    </div>
  );
}
