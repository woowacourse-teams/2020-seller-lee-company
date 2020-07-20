/**
 * @author joseph415
 */

import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import TagModal from "./TagModal";
import TagItem from "./TagItem";
import { Tag } from "../types/Types";

export default function TopComponent() {
  const [tagId, setTagId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const onRemove = (deleteId: number) => {
    setTags(tags.filter(({ id }) => id !== deleteId));
  };

  const insertTag = () => {
    if (tags.length >= 0 && tags.length <= 2) {
      setTags(
        tags.concat({
          id: tagId,
          tag: "#" + input.replace(/(\s*)/g, ""),
        }),
      );
      setTagId(tagId + 1);
    } else {
      setIsModalOpen(true);
    }
    setInput("");
  };

  return (
    <View style={styles.container}>
      <TagModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Text style={styles.text}># 피드에 보여질 키워드</Text>
      <View style={styles.inputContainerWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={"#해시태그 (20자 이내)"}
            maxLength={20}
            onChangeText={setInput}
            value={input}
            autoFocus={true}
            onSubmitEditing={(event) => {
              if (input.replace(/(\s*)/g, "").length !== 0) {
                setInput(event.nativeEvent.text);
                insertTag();
              }
            }}
            blurOnSubmit={false}
            style={styles.inputBox}
          />
          <View style={styles.deleteButtonWrapper}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.deleteButton}
              onPress={() => {
                setInput("");
              }}
            >
              <Feather
                name="x-circle"
                size={17}
                color="black"
                style={styles.deleteButtonText}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addWrapper}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.addButton}
            onPress={() => {
              if (input.replace(/(\s*)/g, "").length !== 0) {
                insertTag();
              }
            }}
          >
            <Text style={styles.buttonText}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tagContainerWrapper}>
        {tags.map((tag) => (
          <TagItem tag={tag} onRemove={onRemove} />
        ))}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "18%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  text: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  inputContainerWrapper: {
    flexDirection: "row",
    width: "90%",
    height: "40%",
    marginLeft: 15,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
  },
  inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  inputBox: {
    width: "85%",
    height: "80%",
    fontSize: 15,
  },
  deleteButtonWrapper: {
    alignItems: "center",
    width: "10%",
  },
  deleteButton: {
    alignItems: "center",
  },
  deleteButtonText: {
    fontWeight: "200",
    color: "gray",
  },
  addWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    borderColor: "gray",
    borderLeftWidth: 0.3,
  },
  buttonText: {
    fontWeight: "200",
    color: "gray",
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagContainerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: "35%",
    marginLeft: 15,
  },
});
