/**
 *
 * @author joseph415
 */

import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TagItemProps } from "../types/Types";

export default function TagItem({ tag, onRemove }: TagItemProps) {
  return (
    <View key={tag.id} style={styles.tagItem}>
      <View style={styles.tagItemTextWrapper}>
        <Text style={styles.tagItemText}>{tag.tag}</Text>
      </View>
      <View style={styles.deleteTagButtonWrapper}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.deleteButton}
          onPress={() => {
            onRemove(tag.id);
          }}
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
    height: "90%",
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "#eeecda",
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
