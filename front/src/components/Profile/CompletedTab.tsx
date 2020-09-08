import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";
import SalesHistoryItem from "./SalesHistoryItem";

export default function CompletedTab() {
  const articles = useRecoilValue(articleSalesHistoryState);

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.salesHistoryItemContainer}>
            <SalesHistoryItem isCompletedTab={true} article={item} />
          </View>
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  salesHistoryItemContainer: {
    marginBottom: 10,
  },
});
