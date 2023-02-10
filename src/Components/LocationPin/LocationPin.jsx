import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

export const LocationPin = ({ text }) => (
  <div className="">
    <Icon icon={locationIcon} className="" />
    {/* <p className="">{text}</p> */}
  </div>
);
