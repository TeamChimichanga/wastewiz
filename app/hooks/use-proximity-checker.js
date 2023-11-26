import React from "react";

const FIVE_SECONDS = 5000;
const TEN_SECONDS = 2 * FIVE_SECONDS;
export const PROXIMITY_RANGE = 250; // in meters
const EARTH_RADIUS = 6371; // Earth's radius in kilometers

function areCoordinatesClose(lat1, lon1, lat2, lon2) {
  // Earth's radius in kilometers

  function toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c * 1000; // Convert to meters

  return distance <= PROXIMITY_RANGE;
}

const useProximityChecker = ({ markers, location }) => {
  const [proximityMarkers, setProximityMarkers] = React.useState([]);

  React.useEffect(() => {
    if (!markers || !location) {
      return;
    }

    const interval = setInterval(() => {
      _checkProximity();
    }, TEN_SECONDS);

    return () => {
      clearInterval(interval);
    };
  }, [markers]);

  _checkProximity = () => {
    if (!location) {
      return;
    }

    const proximityMarkers = markers.filter((marker) => {
      const isClose = areCoordinatesClose(
        marker.coordinate.latitude,
        marker.coordinate.longitude,
        location.coords.latitude,
        location.coords.longitude
      );

      return isClose;
    });

    setProximityMarkers(proximityMarkers);
  };

  return {
    inProximity: proximityMarkers.length > 0,
    proximityMarkers: [...new Set(proximityMarkers.map((marker) => marker.type))],
  };
};

export default useProximityChecker;
