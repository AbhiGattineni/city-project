import { CityOwnedPieChart, SectionsPieChart } from "..";

export const ChartComponent = () => {
  return (
    <div className=" grid sm:grid-cols-2">
      <CityOwnedPieChart />
      <SectionsPieChart />
    </div>
  );
};
