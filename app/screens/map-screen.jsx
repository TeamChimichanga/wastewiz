import React, { useEffect, useMemo, useRef } from "react";
import { useAuth } from "../context/auth-context";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import MapFilters from "../components/map-filters";
import { Box, Fab, FabIcon, FabLabel, StarIcon } from "@gluestack-ui/themed";
import useFilters from "../hooks/use-filters";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useLocation from "../hooks/use-location";
import mapStyle from "../assets/mapstyles.json";
import markerFactory from "../data/markers-factory";
import MapMarkers from "../components/map-markers";
import useProximityChecker from "../hooks/use-proximity-checker";

const MARKERS = 20;

const MapScreen = ({ navigation }) => {
  const { user } = useAuth();
  const filters = useFilters();
  const { location, BUDAPEST, getUserLocation } = useLocation();
  const [region, setRegion] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const mapRef = useRef(null);

  const filteredMarkers = markers.filter((marker) => filters.isSelected(marker.type));

  const { inProximity } = useProximityChecker({ markers: filteredMarkers, location });

  _handleOnPointsClick = async () => {
    await getUserLocation();
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  useEffect(() => {
    if (!location) return;
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarkers(markerFactory.mockMarkers(MARKERS, location.coords));
  }, [location]);

  const userPoints = user?.points || 0;

  return (
    <Box style={{ flex: 1 }}>
      {/* MAP */}
      <Box style={{ flex: 1, height: "50%" }}>
        <MapView
          tracksViewChanges={false}
          customMapStyle={mapStyle}
          ref={mapRef}
          style={{ width: "100%", height: "70%" }}
          initialRegion={{
            latitude: BUDAPEST.latitude,
            longitude: BUDAPEST.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={15}
          maxZoomLevel={17}
          region={region}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          moveOnMarkerPress={false}>
          <MapMarkers markers={filteredMarkers} />
        </MapView>

        {/* BOTTOM SHEET */}
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <BottomSheetScrollView>
            <MapFilters {...filters} />
          </BottomSheetScrollView>
        </BottomSheet>
      </Box>
      <Fab
        size='lg'
        placement='top right'
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={_handleOnPointsClick}>
        <FabIcon as={StarIcon} mr='$1' />
        <FabLabel>{userPoints}</FabLabel>
      </Fab>
      {inProximity && (
        <Fab
          size='lg'
          placement='bottom center'
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          paddingHorizontal='$20'
          bottom={35}
          backgroundColor='$blue400'
          onPress={() => navigation.navigate("Scan")}>
          <FabLabel>Scan</FabLabel>
        </Fab>
      )}
    </Box>
  );
};

export default MapScreen;
