import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";

export default function CompletedTab() {
  const article = useRecoilValue(articleSalesHistoryState);

  return <View />;
}
