import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopNavbar from "../components/Nav/DesktopNavbar";
import DesktopSideBar from "../components/Sidebar/DesktopSidebar";

export default function DeskTopLayout(props) {
  const location = useLocation();
  const [isAuth, setisAuth] = useState(
    location.pathname == ("/register" || "/signin")
  );
  useEffect(() => {
    setisAuth(location.pathname == ("/register" || "/signin"));
    console.log(
      location.pathname == "/regitser" || location.pathname == "/signin"
    );
  }, [location.pathnmae]);

  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        //backgroundColor: "grey",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {location.pathname != "/register" && location.pathname != "/signin" && (
        <DesktopNavbar />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1170px",
          margin: "auto",
          height: "auto",
        }}
      >
        {location.pathname != "/register" && location.pathname != "/signin" && (
          <DesktopSideBar />
        )}
        <div style={{ width: "100%", height: "100%", marginTop: "7rem" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
