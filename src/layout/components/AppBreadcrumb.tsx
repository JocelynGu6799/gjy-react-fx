import React from "react";
import { Alert, Breadcrumb } from "antd";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { IMenuType } from "@/router/inter";
import { mainRoutes } from "@/router";

//面包屑数据包
const breadcrumbNameMap: Record<string, string> = {
  // "/course": "课程管理",
  // "/course/category": "课程分类",
  // "/course/artlist": "课程列表",
};
//将路由数据包处理为面包屑数据
const getBreadcrumbData = (menu: IMenuType[]) => {
  menu.forEach((item) => {
    if (item.children) {
      breadcrumbNameMap[item.key] = item.label;
      getBreadcrumbData(item.children);
    } else {
      breadcrumbNameMap[item.key] = item.label;
    }
  });
};
getBreadcrumbData(mainRoutes);
const Home = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div style={{ padding: "20px 0" }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};
console.log('breadcrumbNameMap',breadcrumbNameMap);


const AppBreadcrumb: React.FC = () => <Home />;

export default AppBreadcrumb;
