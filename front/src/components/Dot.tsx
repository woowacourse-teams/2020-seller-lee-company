/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function Dot() {
  return <View style={styles.dot} />;
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
