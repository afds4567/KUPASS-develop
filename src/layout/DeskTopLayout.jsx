import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopNavbar from "../components/Nav/DesktopNavbar";
import DesktopSideBar from "../components/Sidebar/DesktopSidebar";
import { storage } from "../utils";

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
      {location.pathname != "/register" && location.pathname !== "/signin"  && (
        storage.getToken() ? <DesktopNavbar /> : null
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
          storage.getToken() ? <DesktopSideBar  /> : null
        )}
        <div style={{ width: "100%", height: "100%", marginTop: "7rem" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
