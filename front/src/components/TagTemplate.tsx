/**
 *
 * @author joseph415
 */

import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { styles, tag } from "./TagComponent";

export default function TagTemplate(tags: tag, onRemove: Function) {
  return (
    <View key={tags.id} style={styles.tagItem}>
      <View style={styles.tagItemTextWrapper}>
        <Text style={styles.tagItemText}>{tags.tag}</Text>
      </View>
      <View style={styles.deleteTagButtonWrapper}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.deleteButton}
          onPress={() => {
            onRemove(tags.id);
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
