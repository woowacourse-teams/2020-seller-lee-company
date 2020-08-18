import React from "react";
import { FlatList, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";
import OnSaleHistoryList from "../OnSaleHistoryList";

export default function OnSaleTab() {
  const articles = useRecoilValue(articleSalesHistoryState);

  return (
    <View>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <OnSaleHistoryList
            id={item.id}
            title={item.title}
            price={item.price}
            createdTime={item.createdTime}
            favoriteCount={item.favoriteCount}
            thumbnail={item.photos ? item.photos[0] : "tempUri"}
            tradeState={item.tradeState}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
