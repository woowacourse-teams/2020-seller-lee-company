/**
 * @author lxxjn0
 */

import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PurchaseScreenNavigationProp } from "../types/types";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";

export default function PurchaseScreen() {
  const navigation = useNavigation<PurchaseScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "구매내역",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
    });
  });

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
