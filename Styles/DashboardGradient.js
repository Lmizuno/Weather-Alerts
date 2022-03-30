import { Styles } from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export const DashboardGradientColors = {
  cold: ["#57E2CB", "#5869D2", "#0C0C0C"],
  neutral: ["#FE8A68", "#983D3D", "#0C0C0C"],
  warm: ["#F6D657", "#983D4F", "#0C0C0C"],
};

const DashboardGradient = (props) => {
  colorArray = () => {
    if (props?.color) {
      if (props.color === "cold") {
        return ["#57E2CB", "#5869D2", "#0C0C0C"];
      } else if (props.color === "neutral") {
        return ["#FE8A68", "#983D3D", "#0C0C0C"];
      } else if (props.color === "warm") {
        return ["#F6D657", "#983D4F", "#0C0C0C"];
      }
    }else{
      return ["#F6D657", "#983D4F", "#0C0C0C"];
    }
  };
  return (
    <BlurView intensity={40} style={[Styles.gradientFiller, props.style]}>
      <LinearGradient
        colors={colorArray()}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.85, 0.93]}
        style={Styles.gradientFiller}
      />
    </BlurView>
  );
};

export default DashboardGradient;
