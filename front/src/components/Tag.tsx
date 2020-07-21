/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import TagModal from "./TagModal";
import TagItem from "./TagItem";
import { useRecoilState, useSetRecoilState } from "recoil/dist";
import {
  inputState,
  isModalOpenState,
  tagIdState,
  tagBoxesState,
} from "../states/TagState";

export default function Tag() {
  const [tagId, setTagId] = useRecoilState(tagIdState);
  const [input, setInput] = useRecoilState(inputState);
  const [tagBoxes, setTagBoxes] = useRecoilState(tagBoxesState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const insertTag = () => {
    if (tagBoxes.length >= 0 && tagBoxes.length <= 2) {
      setTagBoxes(
        tagBoxes.concat({
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
      <TagModal />
      <View style={styles.textContainer}>
        <Text style={styles.text}># 피드에 보여질 키워드</Text>
      </View>
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
        {tagBoxes.map((tag) => (
          <TagItem key={tag.id} tagBox={tag} />
        ))}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    aspectRatio: 5 / 1.8,
    paddingHorizontal: 15,
    paddingBottom: 2,
  },
  textContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainerWrapper: {
    flex: 1.7,
    flexDirection: "row",
    marginVertical: 5,
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
    flex: 1.7,
    flexDirection: "row",
    alignItems: "center",
  },
});
