import React from "react";
import { FlatList, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";
import SalesHistoryList from "./SalesHistoryList";

export default function OnSaleTab() {
  const articles = useRecoilValue(articleSalesHistoryState);

  return (
    <View>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <SalesHistoryList isCompletedTab={false} article={item} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
