import React from "react";
import { Button, ButtonIcon, ButtonText, CheckIcon, CloseIcon } from "@gluestack-ui/themed";

const Filter = ({ selected, onClick, color, label }) => {
  return (
    <Button
      onPress={onClick}
      variant={selected ? "solid" : "outline"}
      flexDirection='row'
      justifyContent='space-between'
      backgroundColor={selected ? color : "$white"}
      borderColor={color}
      size='lg'>
      <ButtonText color={selected ? "$white" : color}>{label}</ButtonText>
      <ButtonIcon as={selected ? CheckIcon : CloseIcon} />
    </Button>
  );
};

export default Filter;
