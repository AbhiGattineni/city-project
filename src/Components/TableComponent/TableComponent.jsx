import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import GJSON from "../../Data/Poi.json";

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

export const TableComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    const data = [];
    GJSON.features.map((item) => {
      data.push({
        key: item.properties["OBJECTID"],
        name: item.properties["NAME"],
        typeCode: item.properties["TYPECODE"],
        cityOwned: item.properties["CITYOWNED"],
        sVMap: item.properties["S_V_MAP"],
        webMap: item.properties["WEB_MAP"],
        webLink: item.properties["WEB_LINK"],
        gPin: item.properties["GPIN"],
        address: item.properties["ADDRESS"],
        notes: item.properties["NOTES"],
        spX: item.properties["SP_X"],
        spY: item.properties["SP_Y"],
        latitude: item.properties["LATITUDE"],
        longitude: item.properties["LONGITUDE"],
        mcBldgnmbr: item.properties["MCBLDGNUMBER"],
      });
    });
    setData(data);
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      fixed: "left",
    },
    {
      title: "Type Code",
      dataIndex: "typeCode",
      key: "typeCode",
      filters: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
      ],
      fixed: "left",
      width: 100,
    },
    {
      title: "City Owned",
      dataIndex: "cityOwned",
      key: "cityOwned",
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      width: 100,
    },
    {
      title: "S_V_MAP",
      dataIndex: "sVMap",
      key: "sVMap",
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      width: 100,
    },
    {
      title: "WEB_MAP",
      dataIndex: "webMap",
      key: "webMap",
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      width: 100,
    },
    {
      title: "Web Link",
      dataIndex: "webLink",
      key: "webLink",
      width: 100,
    },
    {
      title: "GPIN",
      dataIndex: "gPin",
      key: "gPin",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.notes.length - b.notes.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "SP_X",
      dataIndex: "spX",
      key: "spX",
      sorter: (a, b) => a.spX.length - b.spX.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "SP_Y",
      dataIndex: "spY",
      key: "spY",
      sorter: (a, b) => a.spY.length - b.spY.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      sorter: (a, b) => a.latitude.length - b.latitude.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      sorter: (a, b) => a.longitude.length - b.longitude.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
    },
    {
      title: "MC_BLDGNMBR",
      dataIndex: "mcBldgnmbr",
      key: "mcBldgnmbr",
      width: 100,
    },
  ];
  return (
    <div className="h-screen">
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};
