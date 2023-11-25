import { useEffect, useState } from "react";
import * as Location from "expo-location";

const BUDAPEST = {
  latitude: 47.497913,
  longitude: 19.040236,
};

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      await getUserLocation();
    })();
  }, []);

  const getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return {
    location,
    getUserLocation,
    BUDAPEST,
  };
};

export default useLocation;
