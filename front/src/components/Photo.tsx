import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

interface ImageInfo {
  id: string;
  uri: string;
}

export default function Photo() {
  const MAX_IMAGE_SIZE = 6;

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  const [images, setImages] = useState<ImageInfo[]>([]);

  const pickImage = async () => {
    if (images.length === MAX_IMAGE_SIZE) {
      return alert("사진은 최대 " + MAX_IMAGE_SIZE + "장만 첨부 가능합니다.");
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImages(
          images.concat({ id: images.length.toString(), uri: result.uri }),
        );
      }
    } catch (E) {
      console.log(E);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((value) => value.id !== id));
  };

  return (
    <View style={styles.photoField}>
      <View style={styles.cameraContainer}>
        <TouchableHighlight onPress={pickImage} underlayColor={"#FFFFFF"}>
          <MaterialCommunityIcons name="camera" size={30} color="black" />
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{images.length}</Text>
          <Text style={styles.maxCount}>/{MAX_IMAGE_SIZE}</Text>
        </View>
      </View>
      <View style={styles.photosContainer}>
        <FlatList
          data={images}
          horizontal={true}
          renderItem={(item) => (
            <View style={styles.photoContainer}>
              <TouchableHighlight onPress={() => removeImage(item.item.id)}>
                <AntDesign style={styles.delete} name="closecircle" size={15} />
              </TouchableHighlight>
              <Image style={styles.photo} source={{ uri: item.item.uri }} />
            </View>
          )}
          contentContainerStyle={styles.photos}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoField: {
    flexDirection: "row",
    aspectRatio: 5,
    marginTop: 10,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  maxCount: { fontSize: 11, color: "grey" },
  count: { fontSize: 11, color: "grey" },

  photosContainer: {
    flex: 7,
    flexDirection: "row",
  },
  photos: { alignItems: "center" },
  photoContainer: { margin: 5, color: "yellow" },
  photo: { width: 50, height: 50, borderRadius: 5, zIndex: -1 },
  delete: {
    position: "absolute",
    color: "black",
    right: -7,
    top: -7,
  },
});
