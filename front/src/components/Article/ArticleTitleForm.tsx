/**
 * @author kouz95
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

interface ArticleTitleFormProp {
  editTitle?: string;
}

export default function ArticleTitleForm({ editTitle }: ArticleTitleFormProp) {
  const [title, setTitle] = useState<string>();

  useEffect(() => setTitle(editTitle), [editTitle]);

  return (
    <TextInput
      style={styles.form}
      placeholder={"제목"}
      keyboardType={"default"}
      maxLength={30}
      onChangeText={setTitle}
      value={title}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 18,
  },
});
