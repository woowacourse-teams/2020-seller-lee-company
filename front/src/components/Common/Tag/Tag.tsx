import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import TagModal from "../Modal/TagModal";
import TagItem from "./TagItem";
import { useRecoilState, useSetRecoilState } from "recoil/dist";
import {
  inputState,
  isModalOpenState,
  tagIdState,
  tagsState,
} from "../../../states/TagState";

export default function Tag() {
  const HASH_TAG = "#";
  const LIMIT_TAG_SIZE = 2;

  const [tagId, setTagId] = useRecoilState(tagIdState);
  const [input, setInput] = useRecoilState(inputState);
  const [tags, setTags] = useRecoilState(tagsState);

  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const removeBlank = (value: string) => {
    const removeBlankRegExp = /(\s*)/g;
    return value.replace(removeBlankRegExp, "");
  };

  const insertTag = () => {
    if (tags.length >= 0 && tags.length <= LIMIT_TAG_SIZE) {
      setTags(tags.concat(HASH_TAG + removeBlank(input)));
      setTagId(tagId + 1);
    } else {
      setIsModalOpen(true);
    }
    setInput("");
  };

  const onSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (removeBlank(input).length !== 0) {
      setInput(event.nativeEvent.text);
      insertTag();
    }
  };

  return (
    <View style={styles.container}>
      <TagModal />
      <View style={styles.textContainer}>
        <Text style={styles.text}>태그 추가</Text>
      </View>
      <View style={styles.inputContainerWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={"#해시태그 (10자 이내)"}
            maxLength={10}
            onChangeText={setInput}
            value={input}
            autoFocus={true}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            style={styles.inputBox}
          />
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.deleteButton}
            onPress={() => setInput("")}
          >
            <Feather name="x-circle" size={18} color="lightgrey" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.addButton}
          onPress={() => {
            if (removeBlank(input).length !== 0) {
              insertTag();
            }
          }}
        >
          <Text style={styles.buttonText}>추가하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tagContainerWrapper}>
        {tags.map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  inputContainerWrapper: {
    aspectRatio: 7,
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputWrapper: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  inputBox: {
    flex: 1,
    fontSize: 15,
  },
  deleteButton: {
    aspectRatio: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "lightgrey",
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
    borderLeftWidth: 1,
    paddingHorizontal: 10,
  },
  tagContainerWrapper: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
