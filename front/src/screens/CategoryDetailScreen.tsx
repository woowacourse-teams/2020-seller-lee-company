/**
 * @author begaonnuri, joseph415
 */

import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { categoryParamList } from "../components/CategoryNavigation";

type CategoryDetailRouteProp = RouteProp<categoryParamList, "CategoryDetail">;

type CategoryDetailNavigationProp = StackNavigationProp<
  categoryParamList,
  "CategoryDetail"
>;

export default function CategoryDetailScreen() {
  const navigation = useNavigation<CategoryDetailNavigationProp>();
  const route = useRoute<CategoryDetailRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
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
    <View style={styles.container}>
      <Text style={styles.text}>CategoryDetail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
