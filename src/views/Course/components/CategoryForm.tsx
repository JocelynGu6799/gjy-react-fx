import React, { useEffect, useState,Dispatch,SetStateAction } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { CategoryGet, CategoryPost, ICategoryParams } from '@/api/course';

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface ICateFormProps{
    setisModalOpen: Dispatch<SetStateAction<boolean>>
}
const CategoryForm: React.FC<ICateFormProps> = (props) => {
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
    CategoryGet({fatherId:'0-0'}).then((res)=>{
        console.log('get res',res);
    setCateList(res.data.results)

        
    })
  },[])
  const onFinish = (values: any) => {
    console.log('values',values);
    // 发送请求给后端
    CategoryPost({...values,status:true}).then((res)=>{
        console.log(' post res',res);
        // setCateList([...CateList,res.data.value])
        
    })
    props.setisModalOpen(false);
    
    
   
  };

  const onReset = () => {
    form.resetFields();
  };

//   const onFill = () => {
//     form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
//   };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="cateName" label="分类名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fatherId" label="归属分类" rules={[{ required: true }]}>
        <Select
          placeholder="请选择归属分类"
        //   onChange={onGenderChange}
          allowClear
        >
          <Option value="0-0">顶级类目</Option>
          {
            CateList.map((item)=>{
                return <Option key={item.objectId} value={item.objectId}>{item.cateName}</Option>
            })

          }

          {/* <Option value="female">female</Option>
          <Option value="other">other</Option> */}
        </Select>
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

export default CategoryForm;