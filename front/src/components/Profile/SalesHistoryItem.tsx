import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { ArticleCardProps } from "../../types/types";
import ArticleCard from "../Common/ArticleCommon/ArticleCard";
import { articlesAPI } from "../../api/api";
import { useRecoilState } from "recoil/dist";
import { articleSalesHistoryState } from "../../states/articleState";

interface OnSaleHistoryListProps {
  isCompletedTab: boolean;
  article: ArticleCardProps;
}

export default function SalesHistoryItem({
  isCompletedTab,
  article: {
    id,
    title,
    price,
    thumbnail,
    tradeState,
    favoriteState,
    favoriteCount,
    createdTime,
  },
}: OnSaleHistoryListProps) {
  const [articles, setArticles] = useRecoilState(articleSalesHistoryState);

  const onClickTradeState = async (tradeState: string) => {
    await articlesAPI.putByTradeState(id, { tradeState });
    if (tradeState === "COMPLETED") {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.articleContainer}>
        <ArticleCard
          id={id}
          title={title}
          price={price}
          createdTime={createdTime}
          tradeState={tradeState}
          favoriteState={favoriteState}
          favoriteCount={favoriteCount}
          thumbnail={thumbnail}
        />
      </View>
      {isCompletedTab ? (
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.5}>
          <Text style={styles.buttonText}>작성한 후기 보기</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.halfContainer}>
          <TouchableOpacity
            style={styles.buttonHalfContainer}
            activeOpacity={0.5}
            onPress={() => onClickTradeState("RESERVATION")}
          >
            <Text style={styles.buttonText}>예약중</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonHalfContainer}
            activeOpacity={0.5}
            onPress={() => onClickTradeState("COMPLETED")}
          >
            <Text style={styles.buttonText}>판매 완료</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  articleContainer: { margin: 5 },
  buttonContainer: {
    flex: 1,
    backgroundColor: theme.primary,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  halfContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonHalfContainer: {
    flex: 1,
    backgroundColor: theme.primary,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
