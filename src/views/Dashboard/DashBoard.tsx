import { CategoryGet, ICategoryParams, gjytestpost } from '@/api/course';
import { Button, Col, Row } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';
import pie from './options/pie';
import { useEffect } from 'react';

export interface IDashboardProps {
}

export default function Dashboard (props: IDashboardProps) {
  useEffect(() => {
    const pieChart = echarts.init(
      document.getElementById('gjypie') as HTMLDivElement
    );
    CategoryGet().then((res)=>{
      console.log("pie res",res);
      let arr=res.data.results.map((item:ICategoryParams)=>{
        return {value:Math.random()*100,name:item.cateName}

      })
      pie.series[0].data=arr
    pieChart.setOption(pie);
      
    })
    window.addEventListener("resize", () => {
      // myChart.resize();
      // lineChart.resize();
      pieChart.resize();
    });
  }, []);
 
  return (
    <div>
      {/* 数据统计
      <Button
      onClick={()=>{
        gjytestpost().then((res)=>{
          console.log(res);
          
        })
      }}
      >发起请求</Button> */}
      <Row>
        <Col span={24}>
          <Chart></Chart>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
        <Chart></Chart>

        </Col>
        <Col span={12} >
        <Chart id='gjypie'></Chart>

        </Col>
      </Row>
    </div>
  );
}
const Chart = styled.div`
  height: 300px;
  border: 1px solid red;
`;