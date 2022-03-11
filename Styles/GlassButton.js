import { BlurView } from "expo-blur";
import { Styles } from "./Styles";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
const GlassButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={[{borderRadius: 10}, props.style]}>
      <BlurView intensity={40} tint="light" style={Styles.glassButtonStyle}>
        <Text style={Styles.glassButtonText}>{props.text}</Text>
      </BlurView>
    </TouchableHighlight>
  );
};

export default GlassButton;
