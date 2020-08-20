import React from "react";
import { ImageBackground, ImageProps, StyleSheet, View } from "react-native";
import AuthButton from "../auth/AuthButton";

interface TeaserImageProps {
  sourceUrl: ImageProps;
  isLastTeaser: boolean;
}

export default function TeaserImage({
  sourceUrl,
  isLastTeaser,
}: TeaserImageProps) {
  const showAuthButton = () => {
    return isLastTeaser ? (
      <View style={styles.authButtonContainer}>
        <AuthButton />
      </View>
    ) : (
      <></>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={sourceUrl} style={styles.imageBackground}>
        {showAuthButton()}
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
    justifyContent: "flex-end",
  },
  authButtonContainer: {
    marginVertical: 40,
    marginHorizontal: 10,
  },
});
