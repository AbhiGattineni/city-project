import { Button, Dropdown, Space, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

export const DropdownComponent = ({ menuProps, label }) => {
  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {label}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
