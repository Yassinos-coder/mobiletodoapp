import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedLoader from "react-native-animated-loader";

export default function Loader(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(props.visible);
  }, []);
  return (
    <View style={[loaderStyles.loader, loading ? "" : { display: "none" }]}>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={loaderStyles.animationStyle}
        speed={1}
      />
    </View>
  );
}

Loader.defaultProps = {
  visible: false,
};

const loaderStyles = StyleSheet.create({
  loader: {},
  animationStyle: {
    width: 100,
    height: 100,
  },
});
