import { ASSETS } from "../components/map-markers";

export const MarkerTypes = Object.keys(ASSETS);

const randomMarkerType = () => {
  const randomIndex = Math.floor(Math.random() * MarkerTypes.length);
  return MarkerTypes[randomIndex];
};

// Function to geneate mock markers in proximity of a given center
export const mockMarkers = (numberOfMarkers, center) => {
  const markers = [];
  for (let i = 0; i < numberOfMarkers; i++) {
    const markerLocation = randomProximity(center, 0.008);
    const type = randomMarkerType();
    markers.push({
      id: i,
      type,
      title: `Marker ${i}`,
      description: `Description ${i}`,
      coordinate: {
        ...markerLocation,
      },
    });
  }

  return markers;
};

const randomProximity = (center, radius) => {
  const { latitude, longitude } = center;

  const randomLatitude = latitude + Math.random() * radius * 2 - radius;
  const randomLongitude = longitude + Math.random() * radius * 2 - radius;

  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
  };
};

export default {
  mockMarkers,
};
