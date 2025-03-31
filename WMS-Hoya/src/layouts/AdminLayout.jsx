import { useState } from "react";
import "../styles/admin.css";
import Hoya from "/Hoya.svg";
import Menu from "../components/Menu";
import TabsPage from "../components/TabsPage";
import DropdownActionProfile from "../components/dropdown/DropdownActionProfile";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme, ConfigProvider } from "antd";
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG, },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#FFFFFF",
            headerBg: "#0055C4"
          },
        },
      }}
    >
      <div className="admin-layout">
        <Layout style={{ height: "100%" }}>
          <Sider width={"230px"} trigger={null} collapsible collapsed={collapsed}>
            <div className="logo-sidebar">
              <img src={Hoya} style={{ width: "75%" }} alt="logo" />
            </div>
            <Menu style={{ zIndex: 10 }} />
            <div className="logo-sidebar" style={{ color: "black", textAlign: "center", fontSize: "12px", marginTop: "75px" }}>
              Production By <br /> A.I. TECHNOLOGY CO. LTD.
            </div>
          </Sider>
          <Layout>
            <Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />

                  {/* <TabsPage /> */}

                </div>

              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DropdownActionProfile />
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: "#FFFFFF",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;
