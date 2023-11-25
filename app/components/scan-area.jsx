import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ScanAreaSVG = (props) => (
  <Svg width={268} height={268} fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M1 81.957V32c0-10.259 0-15.388 1.837-19.373a20 20 0 0 1 9.79-9.79C16.612 1 21.74 1 32 1h49.957m104 0h49.956c10.259 0 15.388 0 19.373 1.837a20 20 0 0 1 9.79 9.79c1.837 3.985 1.837 9.114 1.837 19.373v49.957m0 104v49.956c0 10.259 0 15.388-1.837 19.373a20 20 0 0 1-9.79 9.79c-3.985 1.837-9.114 1.837-19.373 1.837h-49.956m-104 0H32c-10.259 0-15.388 0-19.373-1.837a20 20 0 0 1-9.79-9.79C1 251.301 1 246.172 1 235.913v-49.956'
    />
  </Svg>
);
export default ScanAreaSVG;
