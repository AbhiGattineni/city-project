import Head from "next/head";
import Image from "next/image";
import { Layout, Menu, Icon, Row, Col, Typography } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  TableOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import {
  GoogleMapComponent,
  TableComponent,
  ChartComponent,
} from "@/Components";
import { useState, useEffect } from "react";

const { Header } = Layout;

const items = [
  {
    label: "Table",
    key: "0",
    icon: <TableOutlined />,
    component: <TableComponent />,
  },
  {
    label: "Map",
    key: "1",
    icon: <AppstoreOutlined />,
    component: <GoogleMapComponent />,
  },

  {
    label: "Chart",
    key: "2",
    icon: <PieChartOutlined />,
    component: <ChartComponent />,
  },
];

export default function Home() {
  const [active, setActive] = useState(<TableComponent />);
  const [width, setWidth] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClick = (e) => {
    setActive(items[e].component);
    setCurrent(e);
  };
  return (
    <Layout>
      <Head>
        <title>City Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vblogo.ico" />
      </Head>
      <Row>
        <Row xs={24} sm={12}>
          <Col flex={1}>
            <Image src="/icon.ico" alt="Logo" width={40} height={40} />
          </Col>
          <Col flex={3} style={{ marginLeft: "20px" }}>
            <span style={{ fontSize: "25px", color: "black", fontWeight: 700 }}>
              City Of Virginia Beach
            </span>
          </Col>
        </Row>
        <Col xs={24} sm={12}>
          <Row justify={width < 576 ? "center" : "end"}>
            {items.map((item) => (
              <Col key={item.key} onClick={() => onClick(item.key)}>
                <Typography.Text
                  strong={item.key === current}
                  style={{ cursor: "pointer" }}
                >
                  {item.icon}
                  <Typography.Text
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                      color:
                        item.key === current
                          ? "#1890ff"
                          : "rgba(0, 0, 0, 0.65)",
                    }}
                  >
                    {item.label}
                  </Typography.Text>
                </Typography.Text>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {active}
    </Layout>
  );
}
