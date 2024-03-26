// import * as React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import AppHeader from '@/components/AppHeader';
import React, { useEffect, useState } from 'react';
import { mainRoutes } from '@/router';
import { useNavigate,useLocation } from 'react-router-dom'

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { IMenuType } from '@/router/inter';
import { useGjySelector } from '@/store/hooks';
import { UserInfoType } from '@/api/user';
import  store2  from "store2";
import { cloneDeep } from "lodash-es";


// type MenuItem = Required<MenuProps>['items'][number];
// // const { Header, Content, Footer, Sider } = Layout;


// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }
// const items: MenuItem[] = [
//     getItem('Option 1', '1', <PieChartOutlined />),
//     getItem('Option 2', '2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//       getItem('Tom', '3'),
//       getItem('Bill', '4'),
//       getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
//   ];
export interface IAppSiderProps {
}


export default function AppSider(props: IAppSiderProps) {
    //   const [collapsed, setCollapsed] = useState(false);
    const mynavigate = useNavigate()
    const [gjyselectedKeys,setselectedKeys]=useState<string>('/dashboard')
    const [gjyOpenkeys,setopenKeys]=useState<Array<string>>([])
    const gjylocation=useLocation()
    const {user}=useGjySelector(state=>state)
    const [menuData, setMenuData] = useState<IMenuType[]>();
    useEffect(()=>{
        // console.log('gjylocation',gjylocation);
        
        setselectedKeys(gjylocation.pathname)
        console.log("gjyselectedKeys",gjyselectedKeys);
        
        let open=gjylocation.pathname.split('/')[1]//course
        setopenKeys([`/${open}`])
        console.log("handleMenuData(mainRoutes)",handleMenuData(mainRoutes));
    let cloneRoutes = cloneDeep(mainRoutes);

        setMenuData(handleMenuData(cloneRoutes));
        

    },[])
    const handleMenu = ({ key }: { key: string }) => {
        console.log(key);
        mynavigate(key)//点击哪个就跳转到哪个页面
        setselectedKeys(key)//选中的页面高亮
    }
    const handleOpen=(arr:Array<string>)=>{
        // function(openKeys: string[])
        console.log('arr',arr);//返回值是展开的组合菜单['/course','/dashboard']
        setopenKeys(arr)
        

    }
    const handleMenuData =(mainRoutes:IMenuType[])=>{
    // let {checkedKeys} = store2.get("gjy-userinfo-store2") || store2.session.get("gjy-userinfo-store2")
    let { checkedKeys } = user.userInfo as UserInfoType;
    console.log(checkedKeys);
    

        return mainRoutes.filter((item)=>{
            if(item.children){
                item.children=handleMenuData(item.children)
            }
            return !item.myhidden && checkedKeys?.includes(item.key);
        })
    }
    return (
        <div>
            {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" /> */}
            <Menu theme="dark" defaultSelectedKeys={['1']}
                mode="inline"
                // items={mainRoutes}
                items={menuData}
                onClick={handleMenu}//点击时触发
                selectedKeys={[gjyselectedKeys]}
                onOpenChange={handleOpen}
                openKeys={gjyOpenkeys}
            />
            {/* </Sider> */}
        </div>
    );
}
