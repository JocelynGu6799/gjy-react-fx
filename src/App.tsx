import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GjyMainLayout from "./layout";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Category from "./views/Course/Category";
import ArticleList from "./views/Course/ArticleList";
import Dashboard from "./views/Dashboard/DashBoard";
import RenderRoutes from "./router/utils";
import { mainRoutes } from "./router";
import AuthRequire from "./guard/AuthRequire";

function App() {
  return (
    <div>
      {/* <GjyMainLayout></GjyMainLayout> */}
      <Routes>
        {/* <Route path="/" element={<GjyMainLayout></GjyMainLayout>}> */}
        <Route path="/" element={<AuthRequire></AuthRequire>}>
          {/* <Route path="/course/category" element={<Category />}/>
          <Route path="/course/article/list" element={<ArticleList />}/>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}/> */}
          {RenderRoutes(mainRoutes)}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
