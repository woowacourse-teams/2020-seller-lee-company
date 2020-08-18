import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ArticleCardProps } from "../types/types";
import OnSaleAndReservationComponent from "../components/OnSaleAndReservationComponent";
import { useIsFocused } from "@react-navigation/native";
import { articlesAPI } from "../api/api";

export const ON_SALE = "판매중";
export const RESERVATION = "예약중";
export const COMPLETED = "판매 완료";

export default function SalesDetailsScreen() {
  const [salesDetails, setSalesDetails] = useState<ArticleCardProps[]>();

  const getSalesDetails = async () => {
    const { data } = await articlesAPI.getByTradeState({
      tradeState: `${ON_SALE}|${RESERVATION}`,
    });
    setSalesDetails([...data]);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getSalesDetails().catch((reason) => console.warn(reason));
  }, [isFocused]);

  return (
    <FlatList
      data={salesDetails}
      renderItem={({ item }) => (
        <OnSaleAndReservationComponent
          id={item.id}
          title={item.title}
          price={item.price}
          createdTime={item.createdTime}
          favoriteCount={item.favoriteCount}
          chatCount={item.chatCount}
          thumbnail={item.thumbnail}
          tradeState={item.tradeState}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
