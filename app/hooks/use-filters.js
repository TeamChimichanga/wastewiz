import React from "react";

export const FILTERS = [
  { label: "Paper", color: "$green400" },
  { label: "Plastic", color: "$blue400" },
  { label: "Glass", color: "$yellow400" },
  { label: "Metal", color: "$red400" },
];

const useFilters = () => {
  const [selectedFilters, setSelectedFilter] = React.useState(FILTERS.map((f) => f.label));

  const selectFilter = (label) => {
    if (selectedFilters.includes(label)) {
      setSelectedFilter(selectedFilters.filter((f) => f !== label));
    } else {
      setSelectedFilter([...selectedFilters, label]);
    }
  };

  const isSelected = (label) => selectedFilters.includes(label);

  return {
    selectedFilters,
    selectFilter,
    isSelected,
  };
};

export default useFilters;
