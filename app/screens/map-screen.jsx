import React, { useEffect, useMemo, useRef } from "react";
import { useAuth } from "../context/auth-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapFilters from "../components/map-filters";
import { Box, Fab, FabIcon, FabLabel, StarIcon } from "@gluestack-ui/themed";
import useFilters from "../hooks/use-filters";
import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import useLocation from "../hooks/use-location";
import mapStyle from "../assets/mapstyles.json";
import markerFactory from "../data/markers-factory";
import MapMarkers from "../components/map-markers";
import useProximityChecker, { PROXIMITY_RANGE } from "../hooks/use-proximity-checker";
import ProximityNotification from "../components/proximity-notification";

const MARKERS = 20;

const MapScreen = ({ navigation }) => {
  const { user } = useAuth();
  const filters = useFilters();
  const { location, BUDAPEST, getUserLocation } = useLocation();
  const [region, setRegion] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const mapRef = useRef(null);
  const showInProximity = useRef(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  const filteredMarkers = markers.filter((marker) => filters.isSelected(marker.type));
  const { inProximity, proximityMarkers } = useProximityChecker({ markers: filteredMarkers, location });
  const userPoints = user?.points || 0;
  const [showModal, setShowModal] = React.useState(false);

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

  useEffect(() => {
    if (!inProximity) return;
    if (showInProximity.current) return;
    showInProximity.current = true;
    setShowModal(true);
  }, [inProximity]);

  useEffect(() => {
    if (!proximityMarkers.length) return;
    if (!showModal) return;
    showInProximity.current = false;
    setShowModal(false);
  }, [filters.selectedFilters]);

  _handleOnPointsClick = async () => {
    await getUserLocation();
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

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
          {region && (
            <Circle
              center={{ latitude: region.latitude, longitude: region.longitude }}
              radius={PROXIMITY_RANGE}
              fillColor='rgba(255, 0, 0, 0.2)' // Red color with transparency
              strokeWidth={1}
              strokeColor='rgba(255, 0, 0, 0.5)' // Red color with transparency for the stroke
            />
          )}

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
          onPress={() => navigation.navigate("Scan", { proximityMarkers })}>
          <FabLabel>Scan</FabLabel>
        </Fab>
      )}
      {/* MODAL */}
      <ProximityNotification showModal={showModal} closeModal={setShowModal} proximityMarkers={proximityMarkers} />
    </Box>
  );
};

export default MapScreen;
