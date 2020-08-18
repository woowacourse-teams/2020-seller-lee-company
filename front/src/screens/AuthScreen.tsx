import React, { useLayoutEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthScreenNavigationProp } from "../types/types";
import NicknameLoginButton from "../components/auth/NicknameLoginButton";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import JoinButton from "../components/auth/JoinButton";
import { AppLoading } from "expo";

export default function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <MaterialIcons name="close" size={24} color="white" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 15 },
    });
  });

  const dynamicStyles = StyleSheet.create({
    titleText: {
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Inter_900Black",
      color: "white",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        source={require("../../assets/auth_background_2.jpg")}
        style={styles.container}
        imageStyle={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={dynamicStyles.titleText}>Seller.Lee</Text>
          </View>
          <View style={styles.authButtonsContainer}>
            <View style={styles.emailLoginButtonContainer}>
              <NicknameLoginButton />
            </View>
            <View style={styles.kakaoLoginButtonContainer}>
              <KakaoLoginButton />
            </View>
            <View style={styles.joinButtonContainer}>
              <JoinButton />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 120,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter_900Black",
    color: "white",
  },
  authButtonsContainer: {
    flex: 1,
    marginHorizontal: 40,
    marginBottom: 60,
    justifyContent: "flex-end",
  },
  emailLoginButtonContainer: {
    marginVertical: 5,
  },
  kakaoLoginButtonContainer: {
    marginVertical: 5,
  },
  joinButtonContainer: {
    marginVertical: 5,
  },
});
