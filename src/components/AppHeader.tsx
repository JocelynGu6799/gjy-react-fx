import * as React from 'react';
import { Layout,theme } from 'antd';
import { DownOutlined, UserOutlined,LogoutOutlined ,SettingFilled} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userInfo } from 'os';
import { loginFailt } from '@/store/modules/user';



export interface IAppHeaderProps {
}

export default function AppHeader (props: IAppHeaderProps) {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  const {user}=useSelector((state:RootState)=>state)
  const dispatch=useDispatch()
  const { Header } = Layout;
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
  if(e.key==='1'){
    dispatch(loginFailt())
  }
};

const items: MenuProps['items'] = [
  {
    label: "退出登录",
    key: "1",
    icon: <LogoutOutlined />,
  },
  {
    label: "个人设置",
    key: "2",
    icon: <SettingFilled />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};
  // console.log(user.userInfo.username);
  
  return (
    <div>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      {user.userInfo?user.userInfo.username:"你还没登"}
    </Dropdown.Button>
        </Header>
      
    </div>
  );
}
