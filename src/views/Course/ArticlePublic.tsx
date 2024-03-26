import React, { useEffect, useState,Dispatch,SetStateAction } from 'react';
import { Button, Cascader, Form, Input, Select, Space, Switch } from 'antd';
import { CategoryGet, CategoryPost, ICategoryParams, coursePost } from '@/api/course';
import TextArea from 'antd/es/input/TextArea';
import ImgUpload from './components/ImgUpload';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

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
const ArticlePublic: React.FC = (props) => {
  const [form] = Form.useForm();
  const [CateList,setCateList]=useState<ICategoryParams[]>([])

//   const onGenderChange = (value: string) => {
//     switch (value) {
//       case 'male':
//         form.setFieldsValue({ note: 'Hi, man!' });
//         break;
//       case 'female':
//         form.setFieldsValue({ note: 'Hi, lady!' });
//         break;
//       case 'other':
//         form.setFieldsValue({ note: 'Hi there!' });
//         break;
//       default:
//     }
//   };
  useEffect(()=>{
    CategoryGet({}).then((res)=>{
        let { results } = res.data;
        let arr = results.filter(
          (item: ICategoryParams) => item.fatherId === "0-0"
        );
        arr.forEach((item: ICategoryParams) => {
          item.children = results.filter(
            (child: ICategoryParams) => child.fatherId === item.objectId
          );
        });
        // console.log('arr',arr);
  
        setCateList(arr);

        
    })
  },[])
  const onFinish = (values: any) => {
    console.log('values',values);
    values.catev1=values.category[0]
    values.catev2=values.category[1]
    // 发送请求给后端
   coursePost(values)
    
    
   
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
      <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="info" label="课程简介" rules={[{ required: true }]}>
        <TextArea/>
      </Form.Item>
      <Form.Item name="category" label="归属分类" rules={[{ required: true }]}>
        <Cascader
        options={CateList}
        fieldNames={{label:"cateName",value:"objectId"}}
        placeholder="请选择分类"
        ></Cascader>
      </Form.Item>
      <Form.Item name="isvip" label="是否收费" valuePropName='checked' rules={[{ required: true }]}>
        <Switch></Switch>
      </Form.Item>
      <Form.Item name="poster" label="课程封面" rules={[{ required: true }]}>
        <ImgUpload></ImgUpload>
      </Form.Item>
      <Form.Item name="desc" label="课程详情" rules={[{ required: true }]}>
        <BraftEditor onChange={handleEditor}></BraftEditor>
      </Form.Item>
      {/* <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          {/* <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button> */}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ArticlePublic;