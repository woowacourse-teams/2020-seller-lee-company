/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function ImageViewSliderDot() {
  return <View style={styles.dot} />;
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "rgba(224,224,224,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
