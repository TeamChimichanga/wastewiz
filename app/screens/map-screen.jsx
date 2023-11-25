import React, { useEffect, useMemo, useRef } from "react";
import { useAuth } from "../context/auth-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapFilters from "../components/map-filters";
import { Box, Icon, Pressable, StarIcon } from "@gluestack-ui/themed";
import useFilters from "../hooks/use-filters";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useLocation from "../hooks/use-location";
import { Text } from "@gluestack-ui/themed";

const MapScreen = ({ navigation }) => {
  const { user } = useAuth();
  const filters = useFilters();
  const { location, BUDAPEST } = useLocation();
  const [region, setRegion] = React.useState(null);

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
  }, [location]);

  const userPoints = user?.points || 0;

  return (
    <Box style={{ flex: 1 }}>
      <Box style={{ flex: 1, height: "50%" }}>
        <MapView
          style={{ width: "100%", height: "70%" }}
          initialRegion={{
            latitude: BUDAPEST.latitude,
            longitude: BUDAPEST.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={15}
          maxZoomLevel={16}
          region={region}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}>
          <Box
            position='absolute'
            top={10}
            right={10}
            width='$20'
            height='$12'
            backgroundColor='$blue400'
            rounded='$full'
            flexDirection='row'
            justifyContent='center'
            gap='$2'
            alignItems='center'>
            <Text color='$white'>{userPoints}</Text>
            <Icon as={StarIcon} color='$white' />
          </Box>
        </MapView>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <BottomSheetView>
            <MapFilters {...filters} />
          </BottomSheetView>
        </BottomSheet>
      </Box>
    </Box>
  );
};

export default MapScreen;
