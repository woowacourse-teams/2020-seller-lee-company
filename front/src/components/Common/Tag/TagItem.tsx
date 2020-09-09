import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useRecoilState } from "recoil/dist";
import { tagsState } from "../../../states/TagState";
import theme from "../../../colors";

interface TagItemProps {
  tag: string;
}

export default function TagItem({ tag }: TagItemProps) {
  const [tags, setTags] = useRecoilState(tagsState);

  const onRemove = (deleteTag: string) =>
    setTags(tags.filter((tagItem) => tagItem !== deleteTag));

  return (
    <View style={styles.container}>
      <View style={styles.tagItemTextWrapper}>
        <Text style={styles.tagItemText}>{tag}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.deleteButton}
        onPress={() => onRemove(tag)}
      >
        <Feather name="x-circle" size={16} color={theme.tertiary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.tertiary,
  },
  tagItemTextWrapper: {
    marginVertical: 8,
    marginLeft: 8,
  },
  tagItemText: {
    fontSize: 16,
    color: theme.primary,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingLeft: 4,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: theme.primary,
  },
});
