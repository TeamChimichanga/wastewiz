import React from "react";

export const FILTERS = [
  { label: "Paper", color: "$blue500", type: "Paper" },
  { label: "Plastic", color: "$amber400", type: "Plastic" },
  { label: "Glass", color: "$coolGray300", type: "Glass" },
  { label: "Metal", color: "$coolGray400", type: "Metal" },
  { label: "Bottles", color: "$teal400", type: "Bottles" },
];

const useFilters = () => {
  const [selectedFilters, setSelectedFilter] = React.useState(FILTERS.map((f) => f.type));

  const selectFilter = (type) => {
    if (selectedFilters.includes(type)) {
      setSelectedFilter(selectedFilters.filter((f) => f !== type));
    } else {
      setSelectedFilter([...selectedFilters, type]);
    }
  };

  const isSelected = (type) => selectedFilters.includes(type);

  return {
    selectedFilters,
    selectFilter,
    isSelected,
  };
};

export default useFilters;
