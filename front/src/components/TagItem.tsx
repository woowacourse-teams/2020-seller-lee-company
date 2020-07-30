/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useRecoilState } from "recoil/dist";
import { tagBoxesState } from "../states/TagState";
import { TagItemProps } from "../types/types";
import theme from "../colors";

export default function TagItem({ tagBox }: TagItemProps) {
  const [tagBoxes, setTagBoxes] = useRecoilState(tagBoxesState);

  const onRemove = (deleteId: number) =>
    setTagBoxes(tagBoxes.filter(({ id }) => id !== deleteId));

  return (
    <View style={styles.tagItem}>
      <View style={styles.tagItemTextWrapper}>
        <Text style={styles.tagItemText}>{tagBox.tag}</Text>
      </View>
      <View style={styles.deleteTagButtonWrapper}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.deleteButton}
          onPress={() => onRemove(tagBox.id)}
        >
          <Feather
            name="x"
            size={13}
            color="black"
            style={styles.deleteButtonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: theme.secondary,
  },
  tagItemTextWrapper: {
    marginLeft: 3,
    marginRight: 2,
  },
  tagItemText: {
    fontWeight: "100",
    fontSize: 15,
  },
  deleteTagButtonWrapper: {
    marginRight: 3,
    alignItems: "center",
  },
  deleteButton: {
    alignItems: "center",
  },
  deleteButtonText: {
    fontWeight: "200",
    color: "gray",
  },
});
