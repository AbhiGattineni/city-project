import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

export const LocationPin = ({ text, style }) => (
  <div className={style}>
    <Icon icon={locationIcon} className="" />
    {/* <p className="">{text}</p> */}
  </div>
);
