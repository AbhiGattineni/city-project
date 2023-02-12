import { useEffect, useState } from "react";
import { PieChart } from "..";

import ChartData from "../../Data/Poi.json";

export const CityOwnedPieChart = () => {
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    let cityOwned = 0;
    let notCityOwned = 0;
    ChartData.features.map((item) => {
      if (item.properties["CITY_OWNED"] === "Yes") {
        cityOwned++;
      } else {
        notCityOwned++;
      }
    });
    setPieData([
      { name: "City Owned", y: (cityOwned + notCityOwned) * (cityOwned / 100) },
      {
        name: "Not City Owned",
        y: (cityOwned + notCityOwned) * (notCityOwned / 100),
      },
    ]);
  }, []);
  return <PieChart text={"City Owned Point Of Intersts"} data={pieData} />;
};
