import { useState } from "react";
import { DropdownComponent } from "..";

export const CityOwnedComponent = ({ setCityOwned }) => {
  const [label, setLabel] = useState("All");
  const dropdownData = [
    {
      label: "All",
      key: 0,
    },
    {
      label: "City Owned",
      key: 1,
    },
    {
      label: "Private Owned",

      key: 2,
    },
  ];
  const handleMenuClick = (e) => {
    if (dropdownData[e.key].label === "All") {
      setCityOwned("All");
      setLabel(dropdownData[e.key].label);
    } else if (dropdownData[e.key].label === "City Owned") {
      setCityOwned("Yes");
      setLabel(dropdownData[e.key].label);
    } else if (dropdownData[e.key].label === "Private Owned") {
      setCityOwned("No");

      setLabel(dropdownData[e.key].label);
    }
  };
  const menuProps = {
    items: dropdownData,
    onClick: handleMenuClick,
  };
  return <DropdownComponent menuProps={menuProps} label={label} />;
};
