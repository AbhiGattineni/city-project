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
  const [typeCode, setTypeCode] = useState([]);
  const [data, setData] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    const data = [];
    const typeCode = [];

    GJSON.features.map((item) => {
      if (!typeCode.includes(item.properties["TYPECODE"])) {
        typeCode.push(item.properties["TYPECODE"]);
      }
      data.push({
        key: item.properties["OBJECTID"],
        name: item.properties["NAME"],
        typeCode: item.properties["TYPECODE"],
        cityOwned: item.properties["CITY_OWNED"],
        sVMap: item.properties["S_V_MAP"],
        webMap: item.properties["WEB_MAP"],
        webLink: item.properties["WEBLINK"],
        gPin: item.properties["GPIN"],
        address:
          item.properties["ADDRESS"] != null ? item.properties["ADDRESS"] : "",
        notes: item.properties["NOTES"] != null ? item.properties["NOTES"] : "",
        spX: item.properties["SP_X"],
        spY: item.properties["SP_Y"],
        latitude: item.properties["LATITUDE"],
        longitude: item.properties["LONGITUDE"],
        mcBldgnmbr: item.properties["MCBLDGNUMBER"],
      });
    });
    console.log(typeCode);
    setData(data);
    setTypeCode(typeCode);
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
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      fixed: "left",
      width: 300,
    },
    {
      title: "Type Code",
      dataIndex: "typeCode",
      key: "typeCode",
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
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
      onFilter: (value, record) => record.cityOwned.includes(value),
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
      onFilter: (value, record) => record.sVMap.includes(value),
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
      onFilter: (value, record) => record.webMap.includes(value),
      width: 100,
    },
    {
      title: "Web Link",
      dataIndex: "webLink",
      key: "webLink",
      width: 300,
    },
    {
      title: "GPIN",
      dataIndex: "gPin",
      key: "gPin",
      width: 200,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      width: 300,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.notes.length - b.notes.length,
      sortDirections: ["descend", "ascend"],
      width: 300,
    },
    {
      title: "SP_X",
      dataIndex: "spX",
      key: "spX",
      sorter: (a, b) => a.spX - b.spX,
      sortDirections: ["descend", "ascend"],
      width: 150,
    },
    {
      title: "SP_Y",
      dataIndex: "spY",
      key: "spY",
      sorter: (a, b) => a.spY - b.spY,
      sortDirections: ["descend", "ascend"],
      width: 150,
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      sorter: (a, b) => a.latitude - b.latitude,
      sortDirections: ["descend", "ascend"],
      width: 125,
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      sorter: (a, b) => a.longitude - b.longitude,
      sortDirections: ["descend", "ascend"],
      width: 125,
    },
    {
      title: "MC_BLDGNMBR",
      dataIndex: "mcBldgnmbr",
      key: "mcBldgnmbr",
      width: 100,
    },
  ];
  return (
    <div style={{ height: "100vh" }}>
      <Table columns={columns} dataSource={data} scroll={{ x: 2450 }} />
    </div>
  );
};
