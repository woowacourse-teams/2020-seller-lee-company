import React from "react";
import { ImageBackground, ImageProps, StyleSheet, View } from "react-native";
import AuthButton from "../auth/AuthButton";
import SvgWhale from "./SvgWhale";
import SvgJikGoRae from "./SvgJikGoRae";

interface TeaserImageProps {
  sourceUrl: ImageProps;
}

export default function TeaserImage({ sourceUrl }: TeaserImageProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={sourceUrl} style={styles.imageBackground}>
        <View style={styles.titleContainer}>
          <View style={styles.svgWhale}>
            <SvgWhale />
          </View>
          <View style={styles.svgJikGoRae}>
            <SvgJikGoRae />
          </View>
        </View>
        <View style={styles.authButtonContainer}>
          <View style={styles.authButton}>
            <AuthButton />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    opacity: 0.95,
  },
  titleContainer: {
    flex: 4,
    marginHorizontal: 30,
    marginTop: 30,
    justifyContent: "flex-end",
  },
  svgWhale: {
    marginBottom: 30,
  },
  svgJikGoRae: {
    marginBottom: 80,
  },
  authButtonContainer: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  authButton: {
    width: "50%",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
