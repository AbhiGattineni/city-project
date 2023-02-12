import { CityOwnedPieChart, SectionsPieChart } from "..";

export const ChartComponent = () => {
  return (
    <div className="grid grid-rows-2 sm:grid-cols-2">
      <CityOwnedPieChart />
      <SectionsPieChart />
    </div>
  );
};
