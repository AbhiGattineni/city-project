import { Switch } from "antd";
export const SwitchComponent = ({ setCityOwned }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">City Owned</div>
      <Switch onChange={setCityOwned} />
    </div>
  );
};
