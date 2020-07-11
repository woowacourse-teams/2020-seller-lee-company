import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { Props } from "../components/CategoryNavigation";

/**
 *
 * @author 터틀, 서브웨이
 */

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

export default function CategoryDetailScreen({ navigation }: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
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
          onPress={() => navigation.push("Search")}
        />
      ),
      headerRightContainerStyle: { paddingRight: 15 },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CategoryDetail Screen</Text>
    </View>
  );
}
