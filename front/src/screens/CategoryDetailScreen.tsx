/**
 * @author begaonnuri, joseph415
 */

import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  Detail: { title: string };
};

export default function CategoryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "Detail">>();

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
