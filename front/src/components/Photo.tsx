/**
 * @author jnsorn
 */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import * as Permissions from "expo-permissions";

interface ImageInfo {
  id: string;
  uri: string;
}

export default function Photo() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const maxImageCount = 5;

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== PermissionStatus.GRANTED) {
      alert("이 작업을 수행하기 위해 갤러리 접근 권한이 필요합니다.");
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImages(
        images.concat({
          id: images.length.toString(),
          uri: result.uri,
        }),
      );
    }
  };

  const addImage = async () => {
    if (images.length === maxImageCount) {
      return alert("사진은 최대 " + maxImageCount + "장만 첨부 가능합니다.");
    }

    try {
      await pickImage();
    } catch (error) {
      alert("사진 불러오기에 실패했습니다.");
      console.error(error);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((value) => value.id !== id));
  };

  return (
    <View style={styles.photoField}>
      <View style={styles.cameraContainer}>
        <TouchableHighlight onPress={addImage} underlayColor={"#FFFFFF"}>
          <MaterialCommunityIcons name="camera" size={30} color="black" />
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countFont}>{images.length}</Text>
          <Text style={styles.countFont}>/{maxImageCount}</Text>
        </View>
      </View>
      <View style={styles.photosContainer}>
        <FlatList
          data={images}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <TouchableHighlight onPress={() => removeImage(item.id)}>
                <AntDesign style={styles.delete} name="closecircle" size={15} />
              </TouchableHighlight>
              <Image style={styles.photo} source={{ uri: item.uri }} />
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
    paddingTop: 10,
    marginTop: 20,
    flexDirection: "row",
    aspectRatio: 5,
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
  countFont: {
    fontSize: 11,
    color: "grey",
  },
  photosContainer: {
    flex: 7,
    flexDirection: "row",
  },
  photos: {
    alignItems: "center",
  },
  photoContainer: {
    margin: 5,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    zIndex: -1,
  },
  delete: {
    position: "absolute",
    color: "black",
    right: -7,
    top: -7,
  },
});
