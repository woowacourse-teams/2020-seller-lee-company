/**
 * @author joseph415
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { insertComma } from "../../replacePriceWithComma";
import { ArticleDetailFavoriteProp } from "../../types/types";
import axios from "axios";

export default function ArticlePrice({ articleId }: ArticleDetailFavoriteProp) {
  const memberId = 1;
  const [price, setPrice] = useState(706000);

  useEffect(() => {
    axios.get("/favorite/" + memberId + "/" + articleId).then((res) => {
      setPrice(res.data.price);
    });
  }, [articleId]);

  return (
    <View style={styles.priceAndActionType}>
      <Text style={styles.price}>{insertComma(price.toString())}원</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  priceAndActionType: {
    justifyContent: "center",
    marginLeft: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
