import { BlurView } from "expo-blur";
import { Styles } from "./Styles";
import { TextInput, TouchableHighlight } from "react-native";

const GlassInput = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[{ borderRadius: 10 }, props.style, Styles.glassButtonStyle]}
    >
      <BlurView intensity={40} tint="light" style={Styles.glassButtonStyle}>
        <TextInput
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          style={{ color: "#fff" }}
          autoCapitalize={props.autoCapitalize}
          autoCorrect={props.autoCorrect}
          autoCompleteType={props.autoCompleteType}
          keyboardType={props.keyboardType}
        />
      </BlurView>
    </TouchableHighlight>
  );
};

export default GlassInput;
