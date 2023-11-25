import React from "react";
import { Marker } from "react-native-maps";

export const ASSETS = {
  Paper: require("../assets/papir.png"),
  Glass: require("../assets/glass.png"),
  Metal: require("../assets/metal.png"),
  Plastic: require("../assets/plastic.png"),
  Bottles: require("../assets/bottles.png"),
};

const MapMarkers = ({ markers }) => {
  return (
    <>
      {markers.map((marker, index) => {
        const { latitude, longitude } = marker.coordinate;
        const asset = ASSETS[marker.type];
        return (
          <Marker
            key={"marker-" + index}
            coordinate={{
              latitude,
              longitude,
            }}
            title={marker.title}
            description={marker.description}
            image={asset}
          />
        );
      })}
    </>
  );
};

export default MapMarkers;
