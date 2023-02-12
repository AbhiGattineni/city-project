import { useEffect, useState } from "react";
import { PieChart } from "..";

import ChartData from "../../Data/Poi.json";
import Types from "../../Data/Type.json";

export const SectionsPieChart = () => {
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    let sections = {};
    ChartData.features.map((item) => {
      if (item.properties["TYPECODE"] in sections) {
        sections[item.properties["TYPECODE"]] += 1;
      } else {
        sections[item.properties["TYPECODE"]] = 1;
      }
    });
    let pieData = [];
    let totalRecords = Object.keys(sections).length;
    Object.keys(sections).map((item) =>
      pieData.push({
        name: Types[item],
        y: sections[item] * (100 / totalRecords),
      })
    );
    setPieData(pieData);
  }, []);
  return <PieChart text={"Virginia Beach Sections"} data={pieData} />;
};
