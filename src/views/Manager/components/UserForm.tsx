import React, { Key, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  Tree,
  Select,
} from "antd";
import { mainRoutes } from "@/router";
import { type } from "os";
import { RoleType, roleGet, rolePost, rolePut, userPost } from "@/api/user";
import { useForm } from "antd/es/form/Form";
import { error } from "console";

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };
type CheckedType = { checked: Key[]; halfChecked: Key[] } | Key[];
// interface RoleFormPropsType{
//     updateRoleList:(arg:RoleType)=>void
//     nowRole:RoleType |null
//  }
const UserForm: React.FC = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    values.roleId=cateList[values.idx].objectId
    values.roleName=cateList[values.idx].roleName
    userPost(values).catch((error)=>console.log(error))

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [cateList, setcateList] = useState<Array<RoleType>>([]);

  const [gjyform] = useForm();
  useEffect(() => {
    roleGet().then((res) => {
      // setcateList(res.data.results)
      console.log("roleget res", res);
      let arr = res.data.results.map((item: RoleType, index: number) => {
        item.userindex = index;
        return { ...item, userindex: index };
      });
      console.log(arr);
      
    setcateList(arr);

    }).catch((error)=>console.log(error)
    );
    // console.log(arr);

    // console.log("cateList", cateList);
  }, []);

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
        label="用户账号"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="默认密码" name="password">
        <Input />
      </Form.Item>

      <Form.Item name="idx" label="归属分类" rules={[{ required: true }]}>
        <Select
            options={cateList}
          fieldNames={{ label: "roleName", value: "userindex" }}
          defaultActiveFirstOption
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
          {/* {props.nowRole?"修改":"提交"} */}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
