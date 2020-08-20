import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../colors";
import { Article } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import ArticleCard from "./Common/ArticleCommon/ArticleCard";
import { articlesAPI } from "../api/api";

interface OnSaleHistoryListProps {
  isCompletedTab: boolean;
  article: Article;
}

export default function SalesHistoryList({
  isCompletedTab,
  article: { id, title, price, photos, tradeState, favoriteCount, createdTime },
}: OnSaleHistoryListProps) {
  const ANIMATE_START_VALUE = 0.93;

  const navigation = useNavigation();
  const AnimateTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
  );

  const [tradeStateState, setTradeStateState] = useState(tradeState);

  const clickValue = useRef(new Animated.Value(1)).current;

  const clickArticleAnimate = () => {
    clickValue.setValue(ANIMATE_START_VALUE);

    Animated.timing(clickValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    navigation.navigate("ArticleDetailScreen");
  };

  const onClickTradeState = async (tradeState: string) => {
    await articlesAPI.putByTradeState(id, { tradeState });
    setTradeStateState(tradeState);
    tradeState === "COMPLETED" && navigation.navigate("EvaluationScreen");
  };

  return (
    <AnimateTouchableWithoutFeedback
      onPress={clickArticleAnimate}
      style={{ transform: [{ scale: clickValue }] }}
    >
      <View style={styles.salesDetailsComponent}>
        <View style={styles.miniArticleContainer}>
          <ArticleCard
            id={id}
            title={title}
            price={price}
            createdTime={createdTime}
            favoriteCount={favoriteCount}
            thumbnail={photos ? photos[0] : "tempURI"}
            tradeState={tradeStateState}
          />
        </View>
        <View style={styles.onSaleAndReservationContainer}>
          {isCompletedTab ? (
            <TouchableOpacity
              style={styles.reservationContainer}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("EvaluationScreen")}
            >
              <Text style={styles.salesCompletedText}>평가하기</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.reservationContainer}
                activeOpacity={0.5}
                onPress={() => onClickTradeState("RESERVATION")}
              >
                <Text style={styles.salesCompletedText}>예약중</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.onSaleContainer}
                activeOpacity={0.5}
                onPress={() => onClickTradeState("COMPLETED")}
              >
                <Text style={styles.salesCompletedText}>판매 완료</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </AnimateTouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  salesDetailsComponent: {
    flex: 1,
  },
  miniArticleContainer: { margin: 5 },
  salesCompletedContainer: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  salesCompletedText: {
    fontSize: 15,
  },
  onSaleAndReservationContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primary,
  },
  reservationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRightWidth: 0.6,
  },
  onSaleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
