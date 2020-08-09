import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Article } from "../../types/types";
import { articlesAPI } from "../../api/api";

export default function CompletedTab() {
  const COMPLETED = "COMPLETED";

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    getCompletedArticles();
  }, []);

  const getCompletedArticles = async () => {
    const { data } = await articlesAPI.getByTradeState({
      tradeState: COMPLETED,
    });
    console.log(data);
    setArticles(data);
  };

  return <View />;
}
