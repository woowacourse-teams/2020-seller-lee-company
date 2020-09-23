import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";
import SalesHistoryItem from "./SalesHistoryItem";

export default function CompletedTab() {
  const articles = useRecoilValue(articleSalesHistoryState);

  return (
    <View style={styles.container}>
      {articles.length !== 0 ? (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.salesHistoryItemContainer}>
              <SalesHistoryItem isCompletedTab={true} article={item} />
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      ) : (
        <Text style={styles.text}>판매 완료가 비어있어요.</Text>
      )}
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
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#777",
  },
});
