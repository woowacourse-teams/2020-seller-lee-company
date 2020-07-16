import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function Photo() {
  const requestPermission = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(response);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImages(images.concat(result.uri));
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={style.photoField}>
      <View style={style.cameraContainer}>
        <TouchableHighlight onPress={pickImage} underlayColor={"#FFFFFF"}>
          <MaterialCommunityIcons name="camera" size={30} color="black" />
        </TouchableHighlight>
        <View style={style.countContainer}>
          <Text style={style.count}>{images.length}</Text>
          <Text style={style.maxCount}>/5</Text>
        </View>
      </View>
      <View style={style.photoContainer}>
        <FlatList
          data={images}
          horizontal={true}
          renderItem={(item) => (
            <Image style={style.photo} source={{ uri: item.item }} />
          )}
          contentContainerStyle={style.photos}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  photoField: {
    flexDirection: "row",
    aspectRatio: 5,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  photoContainer: {
    flex: 7,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  maxCount: { fontSize: 11, color: "grey" },
  count: { fontSize: 11, color: "grey" },
  photos: { alignItems: "center" },
  photo: { width: 50, height: 50, margin: 5, borderRadius: 5 },
});
