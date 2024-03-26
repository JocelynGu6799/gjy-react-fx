import { RootState } from "@/store";
import { loginStart, userLoginAsync } from "@/store/modules/user";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Col, Row, Space, Spin, Tabs, message, theme } from "antd";
import { log } from "console";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type LoginType = "phone" | "account";

export default () => {
  const { token } = theme.useToken();
  // 设置默认登录类型
  const [loginType, setLoginType] = useState<LoginType>("account");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };
  const handleLogin = async (values: any) => {
    console.log("登录信息", values);
    // dispatch(loginStart())
    userLoginAsync(values,dispatch,navigate)

  };
  const {user}=useSelector((state:RootState)=>state)
  console.log("user useselector",useSelector((state:RootState)=>state));
  
  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <Row align="middle" justify="center" style={{ height: "100vh" }}>
          <Col>
            <Spin spinning={user.isLoading}>
              <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="TF家族"
                subTitle="时代峰峻文化艺术有限公司"
                onFinish={handleLogin}
                actions={
                  <Space>
                    其他登录方式
                    <AlipayCircleOutlined style={iconStyles} />
                    <TaobaoCircleOutlined style={iconStyles} />
                    <WeiboCircleOutlined style={iconStyles} />
                  </Space>
                }
              >
                <Tabs
                  centered
                  activeKey={loginType}
                  onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                  <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
                  <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
                </Tabs>
                {loginType === "account" && (
                  <>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className={"prefixIcon"} />,
                      }}
                      placeholder={"用户名: admin or user"}
                      rules={[
                        {
                          required: true,
                          message: "请输入用户名!",
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                        strengthText:
                          "Password should contain numbers, letters and special characters, at least 8 characters long.",
                        statusRender: (value) => {
                          const getStatus = () => {
                            if (value && value.length > 12) {
                              return "ok";
                            }
                            if (value && value.length > 6) {
                              return "pass";
                            }
                            return "poor";
                          };
                          const status = getStatus();
                          if (status === "pass") {
                            return (
                              <div style={{ color: token.colorWarning }}>
                                强度：中
                              </div>
                            );
                          }
                          if (status === "ok") {
                            return (
                              <div style={{ color: token.colorSuccess }}>
                                强度：强
                              </div>
                            );
                          }
                          return (
                            <div style={{ color: token.colorError }}>
                              强度：弱
                            </div>
                          );
                        },
                      }}
                      placeholder={"密码: ant.design"}
                      rules={[
                        {
                          required: true,
                          message: "请输入密码！",
                        },
                      ]}
                    />
                  </>
                )}
                {loginType === "phone" && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: "large",
                        prefix: <MobileOutlined className={"prefixIcon"} />,
                      }}
                      name="mobile"
                      placeholder={"手机号"}
                      rules={[
                        {
                          required: true,
                          message: "请输入手机号！",
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: "手机号格式错误！",
                        },
                      ]}
                    />
                    <ProFormCaptcha
                      fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                      }}
                      captchaProps={{
                        size: "large",
                      }}
                      placeholder={"请输入验证码"}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${"获取验证码"}`;
                        }
                        return "获取验证码";
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: "请输入验证码！",
                        },
                      ]}
                      onGetCaptcha={async () => {
                        message.success("获取验证码成功！验证码为：1234");
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    marginBlockEnd: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    自动登录
                  </ProFormCheckbox>
                  <a
                    style={{
                      float: "right",
                    }}
                  >
                    忘记密码
                  </a>
                </div>
              </LoginForm>
            </Spin>
          </Col>
        </Row>
      </div>
    </ProConfigProvider>
  );
};
