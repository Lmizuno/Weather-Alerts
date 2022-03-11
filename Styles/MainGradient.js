import { Styles } from './Styles';
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
const MainGradient = (props) => {
    return (
      <BlurView intensity={40} style={[Styles.gradientFiller, props.style]}>
        <LinearGradient
          colors={["#57E2CB", "#FE8A68", "#F6D657", "#5869D2", "#0C0C0C"]}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.25, 0.5, 0.85, 0.93]}
          style={Styles.gradientFiller}
        />
      </BlurView>
    );
  };
  
  export default MainGradient;
  
  