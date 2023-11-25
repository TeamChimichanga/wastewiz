import React from "react";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import Filter from "./filter";
import { FILTERS } from "../hooks/use-filters";

const MapFilters = ({ isSelected, selectFilter }) => {
  return (
    <Box padding='$4' gap='$4'>
      <Heading>MapFilters</Heading>
      <VStack gap='$2'>
        {FILTERS.map((filter) => (
          <Filter
            key={filter.label}
            {...filter}
            onClick={() => selectFilter(filter.label)}
            selected={isSelected(filter.label)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default MapFilters;
