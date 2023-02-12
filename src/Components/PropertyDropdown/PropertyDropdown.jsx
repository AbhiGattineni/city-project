import { Button, Dropdown, Space, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import DropdownData from "../../Data/Type.json";
import { useEffect, useState } from "react";

export const PropertyDropdown = ({ setSelectedDropdown }) => {
  const [dropdownData, setDropdownData] = useState([]);
  const [label, setLabel] = useState("Select Property Types");

  useEffect(() => {
    let dropdownData = [];
    Object.keys(DropdownData).map((item, index) =>
      dropdownData.push({
        label: DropdownData[item],
        shortlabel: item,
        key: index,
        icon: <UserOutlined />,
      })
    );
    setDropdownData(dropdownData);
  }, []);
  const handleMenuClick = (e) => {
    setSelectedDropdown(dropdownData[e.key]);
    setLabel(dropdownData[e.key].label);
  };
  const menuProps = {
    items: dropdownData,
    onClick: handleMenuClick,
  };
  return (
    <div className="">
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            {label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};
