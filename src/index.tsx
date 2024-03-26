import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Appgjy from "@/utils/testgjy";
// import { Hash } from "crypto";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import Cloud from 'leancloud-storage'
import {IDgjy, KEYgjy, BASEgjy} from '@/config/index'
import { Provider } from "react-redux";
import storegjy from "./store";
Cloud.init({
  appId:IDgjy,
  appKey:KEYgjy,
  serverURL:BASEgjy,
})
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <React.StrictMode>
      <HashRouter>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token，影响范围大
              colorPrimary: "yellowgreen",
              borderRadius: 2,

              // 派生变量，影响范围小
              colorBgContainer: "lightyellow",
            },
          }}
        >
          <Provider store={storegjy}><App /></Provider>
          
        </ConfigProvider>
      </HashRouter>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
