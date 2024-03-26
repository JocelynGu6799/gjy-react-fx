import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Space,
  Switch,
  Table,
  Row,
  Col,
  Drawer,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import RoleForm from "./components/RoleForm";
import { RoleType, roleBatchDel, roleDelete, roleGet, userGet } from "@/api/user";
import { error, log } from "console";
import UserForm from "./components/UserForm";
// import RoleForm from "./components/RoleForm";
// import { roleBatchDel, roleDel, roleGet, RoleType } from "@/api/user";
export interface IRoleProps {}

export default function UserList(props: IRoleProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Array<RoleType>>([]);
  const [delRoleIds, setDelRoleIds] = useState<React.Key[]>([]);
  const [roleData, setRoleData] = useState<RoleType | null>(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDel = (record: RoleType, index: number) => {
    console.log("delete record", record);
    roleDelete(record.objectId).then((res) => {
      console.log("delete res", res);
      data.splice(index, 1);
      setData([...data]);
    });
  };
  useEffect(() => {
    userGet().then(res=>{
      console.log("user res",res);
      setData(res.data.results)
      
    }).catch(error=>console.log(error)
    )
    
  }, []);
  const handleSelection = (selectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys", selectedRowKeys);
    setDelRoleIds(selectedRowKeys);
  };
  const rowSelection = {
    onChange: handleSelection,
  };
  const handleBatchDel = () => {
    console.log("delRoleIds",delRoleIds);
    
    roleBatchDel(delRoleIds).then((res) => {
      let arr = data.filter((item) => {
        return !delRoleIds.includes(item.objectId);
      });
      setData([...arr]);
    });
  };
  const columns: ColumnsType<any> = [
    {
      title: "用户ID",
      dataIndex: "objectId",
      key: "objectId",
    },
    {
      title: "账号名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "操作",
      //   dataIndex: 'address',
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              // console.log("record",record);

              setOpen(true);
              setRoleData(record);
              console.log("roledata", roleData);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定不是手抖了？"
            description="删除后数据无法找回"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              handleDel(record, index);
            }}
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

//   const updateRoleList = (roleObj: RoleType) => {
//     let isNew = true;
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].objectId === roleObj.objectId) {
//         data[i] = roleObj;
//         isNew = false;
//         break;
//       }
//     }
//     if (isNew) {
//       data.push(roleObj);
//     }
//     setData([...data]);
//   };
  return (
    <div>
      <p>账号管理</p>
      <Row>
        <Col>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setRoleData(null);
              }}
            >
              新增账号
            </Button>
            {delRoleIds.length ? (
              <Button type="primary" danger onClick={handleBatchDel}>
                批量删除
              </Button>
            ) : (
              ""
            )}
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="objectId" //对应key值
        rowSelection={rowSelection}
      ></Table>
      <Drawer
        title="新增角色"
        placement="right"
        open={open}
        onClose={handleClose}
      >
        <UserForm ></UserForm>
        
      </Drawer>
    </div>
  );
}
