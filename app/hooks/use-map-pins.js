import { useEffect, useState } from "react";

const useMapPins = () => {
  const [mapPins, setMapPins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _fetchMapPins();
  }, []);

  const _fetchMapPins = async () => {
    setLoading(true);
    try {
      //   const response = await fetch("http://localhost:3000/api/map-pins");
      //   const data = await response.json();
      //   setMapPins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    mapPins,
    loading,
  };
};

export default useMapPins;
