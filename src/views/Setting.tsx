import React, { useEffect, useState,Dispatch,SetStateAction } from 'react';
import { Button, Cascader, Form, Input, Select, Space, Switch } from 'antd';
import { CategoryGet, CategoryPost, ICategoryParams, coursePost } from '@/api/course';
import TextArea from 'antd/es/input/TextArea';
import ImgUpload from './Course/components/ImgUpload';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { useGjySelector } from '@/store/hooks';
import { userUpdate } from '@/api/user';
import { useDispatch } from 'react-redux';
import { loginFailt ,loginUpdate} from '@/store/modules/user';
import { error } from 'console';

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
// interface ICateFormProps{
//     setisModalOpen: Dispatch<SetStateAction<boolean>>
// }
const Setting: React.FC = (props) => {
  const [form] = Form.useForm();
  const [CateList,setCateList]=useState<ICategoryParams[]>([])
  const {user}=useGjySelector((state)=>state)
  const dispatch=useDispatch()


  useEffect(()=>{
   form.setFieldsValue(user.userInfo)
   console.log("useGjySelecto",user);
   
  },[])
  const onFinish = (values: any) => {
    console.log("userinfo values",values);
    if(user.userInfo){
      userUpdate(user.userInfo.objectId,values).then((res)=>{
        dispatch(loginUpdate({...user.userInfo,...values}))
      }).catch((error)=>{
        console.log(error);
        
      })
    }
    
    
    
   
  };

  const onReset = () => {
    form.resetFields();
  };

//   const onFill = () => {
//     form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
//   };
const handleEditor=(editor:any)=>{
  console.log(editor.toHTML());
  form.setFieldsValue({
    desc:editor.toHTML()
  })
  
}
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="username" label="账号" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
        <ImgUpload></ImgUpload>
      </Form.Item>
     
     
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
          {/* <Button htmlType="button" onClick={onReset}>
            重置
          </Button> */}
          {/* <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button> */}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Setting;