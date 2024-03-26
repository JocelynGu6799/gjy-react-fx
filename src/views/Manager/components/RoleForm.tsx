import React, { Key, useEffect, useState } from "react";
import { Button, Checkbox, Form, type FormProps, Input, Tree } from "antd";
import { mainRoutes } from "@/router";
import { type } from "os";
import { RoleType, roleGet, rolePost, rolePut } from "@/api/user";
import { useForm } from "antd/es/form/Form";

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };
type CheckedType = { checked: Key[]; halfChecked: Key[] } | Key[];
interface RoleFormPropsType{
    updateRoleList:(arg:RoleType)=>void
    nowRole:RoleType |null
 }
const RoleForm: React.FC<RoleFormPropsType> = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    values.checkedKeys = gjycheckedKeys;
   
    if(props.nowRole){
        let {objectId}=props.nowRole
        rolePut(props.nowRole.objectId,values).then((res)=>{
            props.updateRoleList({...values,objectId})
        })
    }else{
        rolePost(values).then(res=>{
            props.updateRoleList({...values,objectId:res.data.objectId})
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChecked = (checkedKeyValue: CheckedType) => {
    console.log("checkedKeyValue", checkedKeyValue);
    setcheckedKeys(checkedKeyValue);
  };
  const [gjycheckedKeys, setcheckedKeys] = useState<CheckedType>();
  const [gjyform]=useForm();
  useEffect(()=>{
    if(props.nowRole){
        console.log('props.nowRole',props.nowRole);
        
        gjyform.setFieldsValue(props.nowRole)
        console.log('props.nowRole.checkedKeys',props.nowRole.checkedKeys);
        
        setcheckedKeys(props.nowRole.checkedKeys)
    }else{
        gjyform.resetFields()
        setcheckedKeys([])
    }
  },[props.nowRole])


  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={gjyform}
    >
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="菜单权限" name="tree">
        <Tree
          checkable
          treeData={mainRoutes}
          checkedKeys={gjycheckedKeys}
          onCheck={handleChecked}
        ></Tree>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {props.nowRole?"修改":"提交"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleForm;
