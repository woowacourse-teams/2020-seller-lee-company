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
import { ArticleCardProps, MyPageParamList } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ArticleCard from "./Common/ArticleCommon/ArticleCard";
import { articlesAPI } from "../api/api";
import { COMPLETED, RESERVATION } from "../screens/SalesDetailsScreen";

type SalesDetails = StackNavigationProp<MyPageParamList, "SalesDetails">;

const ANIMATE_START_VALUE = 0.93;

export default function OnSaleAndReservationComponent({
  id,
  title,
  price,
  createdTime,
  favoriteCount,
  chatCount,
  thumbnail,
  tradeState,
}: ArticleCardProps) {
  const navigation = useNavigation<SalesDetails>();
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

  const patchTradeState = async (data: string) => {
    console.log(id);
    await articlesAPI.updateTradeState(id, { tradeState: data });
    setTradeStateState(data);
    data === COMPLETED && navigation.navigate("Evaluation");
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
            chatCount={chatCount}
            thumbnail={thumbnail}
            tradeState={tradeStateState}
          />
        </View>
        <View style={styles.onSaleAndReservationContainer}>
          <TouchableOpacity
            style={styles.reservationContainer}
            activeOpacity={0.5}
            onPress={() => patchTradeState(RESERVATION)}
          >
            <Text style={styles.salesCompletedText}>예약중</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.onSaleContainer}
            activeOpacity={0.5}
            onPress={() => patchTradeState(COMPLETED)}
          >
            <Text style={styles.salesCompletedText}>판매 완료</Text>
          </TouchableOpacity>
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
