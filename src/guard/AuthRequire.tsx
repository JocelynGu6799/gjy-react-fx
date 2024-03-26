import GjyMainLayout from '@/layout';
import { RootState } from '@/store';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export interface IAuthRequireProps {
}

export default function AuthRequire (props: IAuthRequireProps) {
    const {user}=useSelector((state:RootState)=>state)
    // 就是那个切片module/user
  return (
    <div>
      {user.isLogin?<GjyMainLayout></GjyMainLayout>:<Navigate to='/login'></Navigate>}
    </div>
  );
}
