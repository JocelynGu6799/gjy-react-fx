import * as React from "react";
import { useState } from "react";

// export interface ICategoryProps {
// }

// export default function Category (props: ICategoryProps) {
//   return (
//     <div>
//       分类
//     </div>
//   );
// }
// import React from 'react';
import { Button, Col, Row, Space, Table, Tag, Modal, Switch } from "antd";
import type { TableProps } from "antd";
import CategoryForm from "./components/CategoryForm";
import { CategoryGet, ICategoryParams, categoryPut } from "@/api/course";

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const data: ICategoryParams[] = [
//   {
//     objectId: "1111", //类目ID
//     cateName: "哈哈哈", //类目名称
//     fatherId: "string", //父级类目ID
//     status: true, //分类上架状态
//   },
// ];

const Category: React.FC = () => {
  interface ITableParams extends ICategoryParams {
    children: ICategoryParams[];
  }
  const [CateList, setCateList] = useState<ITableParams[]>([]);

  const [isModalOpen, setisModalOpen] = React.useState(false);
  const handleStatus = (
    bool: boolean,
    record: ICategoryParams,
    index: number
  ) => {
    console.log("bool", bool);
    console.log("record", record);
    console.log("index", index);
    categoryPut(record.objectId as string, !bool).then((res) => {
      console.log("put res", res);
      if(record.fatherId=='0-0'){
        CateList[index].status = !bool;
        // setCateList(CateList)
      }else{
        let findfatherindex:number=CateList.findIndex(
            (item)=>item.objectId===record.fatherId
        )
        CateList[findfatherindex].children[index].status=!bool
        // console.log("CateList",CateList);
        
      }
      setCateList([...CateList]);

     
    });
  };
  const handleCancel = () => {
    setisModalOpen(false);
  };
  const columns: TableProps<ICategoryParams>["columns"] = [
    {
      title: "父级",
      dataIndex: "fatherId",
      key: "fatherId",
      // render: (text,record) => <a>{text}</a>,
    },
    {
      title: "分类名称",
      dataIndex: "cateName",
      key: "cateName",
    },
    {
      title: "上架状态",
      dataIndex: "status",
      key: "status",
      render: (bool, record, index) => {
        return (
          <Switch
            checked={bool}
            onChange={() => handleStatus(bool, record, index)}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    CategoryGet({}).then((res) => {
      console.log("CategoryGetres", res);
      let { results } = res.data;
      let arr = results.filter(
        (item: ICategoryParams) => item.fatherId === "0-0"
      );
      arr.forEach((item: ITableParams) => {
        item.children = results.filter(
          (child: ICategoryParams) => child.fatherId === item.objectId
        );
      });
      // console.log('arr',arr);

      setCateList(arr);
      // setCateList(res.data.results)
    });
  }, []);
  return (
    <div>
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={() => setisModalOpen(true)}>
            新建分类
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={CateList} rowKey="objectId" />
      <Modal
        title="新增个分类~"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CategoryForm setisModalOpen={setisModalOpen}></CategoryForm>
      </Modal>
    </div>
  );
};
export default Category;
