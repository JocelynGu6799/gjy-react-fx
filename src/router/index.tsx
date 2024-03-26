import ArticleEdit from "@/views/Course/ArticleEdit";
import ArticleList from "@/views/Course/ArticleList";
import ArticlePublic from "@/views/Course/ArticlePublic";
import Category from "@/views/Course/Category";
import Dashboard from "@/views/Dashboard/DashBoard";
import Role from "@/views/Manager/Role";
// import UserList from "@/views/Manager/User";
import UserList from "@/views/Manager/UserList";
import Setting from "@/views/Setting";
import { AreaChartOutlined,SettingFilled } from "@ant-design/icons";
export const mainRoutes = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
    element: <Dashboard></Dashboard>,
  },
  {
    key: "/course",
    label: "课程管理",
    title: "课程管理",
    icon: <AreaChartOutlined />,
    children: [
      {
        key: "/course/category",
        label: "课程分类",
        title: "课程分类",
        icon: <AreaChartOutlined />,
        element: <Category />,
      },
      {
        key: "/course/article/list",
        label: "课程列表",
        title: "课程列表",
        icon: <AreaChartOutlined />,
        element: <ArticleList></ArticleList>,
      },
      {
        key: "/course/artpub",
        label: "课程发布",
        title: "课程发布",
        icon: <AreaChartOutlined />,
        element: <ArticlePublic></ArticlePublic>,
        myhidden:true
      },
      {
        key: "/course/artedit",
        label: "课程编辑",
        title: "课程编辑",
        icon: <AreaChartOutlined />,
        element: <ArticleEdit></ArticleEdit>,
        myhidden:true
      },
    ],
  },
  {
    key: "/manager",
    label: "个人设置",
    title: "个人设置",
    icon: <SettingFilled></SettingFilled>,
    element: <Setting></Setting>,
    children:[
      {
        key: "/manager/role",
        label: "角色管理",
        title: "用户管理",
        // icon: <AreaChartOutlined />,
        element: <Role></Role>,
        // myhidden:true
      },{
        key: "/manager/user",
        label: "账号管理",
        title: "账号管理",
        // icon: <AreaChartOutlined />,
        element: <UserList></UserList>,
        // myhidden:true
      },
    ]
  },
];
