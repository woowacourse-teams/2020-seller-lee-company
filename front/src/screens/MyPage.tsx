import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyPageParamList } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type MyPageNavigationProps = StackNavigationProp<MyPageParamList, "MyPage">;

export default function MyPage() {
  const navigation = useNavigation<MyPageNavigationProps>();

  return (
    <View style={styles.MyPageContainer}>
      <TouchableOpacity
        style={styles.SalesDetailsContainer}
        onPress={() => navigation.navigate("SalesDetails")}
      >
        <Text style={styles.text}>판매 목록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  MyPageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SalesDetailsContainer: {
    backgroundColor: "red",
  },
  text: {
    fontSize: 30,
  },
});
