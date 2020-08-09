import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Article } from "../../types/types";
import { articlesAPI } from "../../api/api";

export default function OnSaleTab() {
  const ON_SALE = "ON_SALE";

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    // getOnSaleArticles()
  }, []);

  const getOnSaleArticles = async () => {
    const { data } = await articlesAPI.getByTradeState({ tradeState: ON_SALE });
    console.log(data);
    setArticles(data);
  };

  return <View />;
}
