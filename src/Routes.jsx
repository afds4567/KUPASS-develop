import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveLayout from "./layout/ResponsiveLayout";
import Register from "./pages/Auth/Register";
import SignIn from "./pages/Auth/SignIn";
import KeywordEdit from "./pages/KeywordEdit/KeywordEdit";
import NotFound from "./pages/NotFound";
import PostList from "./pages/PostList/PostList";
import { storage } from "./utils";

const Router = () => {
  return (
    <BrowserRouter>
      <ResponsiveLayout>
        <Routes>
          {storage.getToken()?<Route path="/" element={<PostList />} />:<Route path="/" element={<SignIn />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<PostList />} /> 
           <Route path="/menu/키워드편집" element={<KeywordEdit />} />
          <Route path="/home" element={<PostList />} />
         
          <Route path="/news/:newsId" element={<PostList />} />
          <Route path="/search" element={<PostList />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ResponsiveLayout>
    </BrowserRouter>
  );
};
export default Router;
