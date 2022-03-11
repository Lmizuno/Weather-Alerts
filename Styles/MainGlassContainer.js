import { BlurView } from "expo-blur";
import { Styles } from './Styles';

const MainGlassContainer = (props) => {
    return (
        <BlurView intensity={40} tint="dark" style={[Styles.mainGlassContainer, props.style]}>
            {props.children}
        </BlurView>
    );
  };
  
  export default MainGlassContainer;
  