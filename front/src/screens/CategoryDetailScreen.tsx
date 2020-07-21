/**
 * @author begaonnuri, joseph415
 */

import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CategoryDetailNavigationProp,
  CategoryDetailRouteProp,
} from "../types/types";

export default function CategoryDetailScreen() {
  const navigation = useNavigation<CategoryDetailNavigationProp>();
  const route = useRoute<CategoryDetailRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 5 },
      headerRight: () => (
        <EvilIcons
          name="search"
          size={25}
          color="black"
          onPress={() => navigation.navigate("Search")}
        />
      ),
      headerRightContainerStyle: { paddingRight: 15 },
    });
  }, [navigation, route]);

  return (
    <View style={styles.writeButtonContainer}>
      <Text style={styles.text}>CategoryDetail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
