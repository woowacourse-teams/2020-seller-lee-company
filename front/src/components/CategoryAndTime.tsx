/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";
import { CategoryAndTimeProps } from "../types/types";

export default function CategoryAndTime({
  category,
  time,
}: CategoryAndTimeProps) {
  return (
    <Text style={styles.text}>
      {category} | {time}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
