import { Row, Col } from "antd";
import { CityOwnedPieChart, SectionsPieChart } from "..";

export const ChartComponent = () => {
  return (
    <Row gutter={16} style={{ marginTop: "10px" }}>
      <Col span={24} xs={24} sm={12}>
        <CityOwnedPieChart />
      </Col>
      <Col span={24} xs={24} sm={12}>
        <SectionsPieChart />
      </Col>
    </Row>
  );
};
