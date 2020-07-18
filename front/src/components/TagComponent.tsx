/**
 * @author joseph415
 */

import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export default function TopComponent() {
  const [input, setInput] = useState<string>("");
  const [tags, setTags] = useState<Array<{ id: number; tag: string }>>([]);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.text}># 피드에 보여질 키워드</Text>
      <View style={styles.inputContainerWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            maxLength={20}
            onChangeText={(text) => {
              setInput(text);
            }}
            value={input}
            onSubmitEditing={(event) => {
              setInput(event.nativeEvent.text);
              setTags(
                tags.concat({
                  id: tags.length,
                  tag: input,
                }),
              );
              setInput("");
              if (inputRef.current !== null) {
                inputRef.current.focus();
              }
            }}
            multiline={false}
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
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.addButton}
              onPress={() => {
                setTags(
                  tags.concat({
                    id: tags.length,
                    tag: input,
                  }),
                );
                setInput("");
              }}
            >
              <Text style={styles.buttonText}>추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.tagContainerWrapper}>
        {tags.map(({ tag }) => {
          return tagTemplate(tag);
        })}
      </View>
    </View>
  );
}

function tagTemplate(tag: string) {
  return (
    <View style={styles.tagItem}>
      <Text style={styles.tagItemText}>{{ tag }}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
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
  },
  inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
    backgroundColor: "rgb(143,133,222)",
  },
  inputBox: {
    width: "85%",
    height: "80%",
    fontSize: 15,
    backgroundColor: "rgb(143,233,222)",
  },
  deleteButtonWrapper: {
    alignItems: "center",
    width: "10%",
    backgroundColor: "#99b898",
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "pink",
  },
  deleteButtonText: {
    fontWeight: "200",
    color: "gray",
  },
  addWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    backgroundColor: "#6a2c70",
  },
  addButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    height: "65%",
    backgroundColor: "#f08a5d",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 0.3,
  },
  buttonText: {
    fontWeight: "200",
    color: "gray",
  },
  tagContainerWrapper: {
    flexDirection: "row",
    width: "90%",
    height: "35%",
    marginLeft: 15,
    borderColor: "gray",
    borderWidth: 0.3,
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagItem: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "pink",
  },
  tagItemText: {
    fontWeight: "200",
    fontSize: 17,
  },
  tagList: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
