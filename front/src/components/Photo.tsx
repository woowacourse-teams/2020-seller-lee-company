/**
 * @author jnsorn
 */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import * as Permissions from "expo-permissions";
import NoticeModal from "./NoticeModal";
import { useRecoilState, useSetRecoilState } from "recoil/dist";
import { modalActivationState } from "../states/modalState";
import { articlePhotosState } from "../states/articleState";

let photoId = 0;

export default function Photo() {
  const [modalMessage, setModalMessage] = useState("");
  const [permissionForCameraRoll, setPermissionForCameraRoll] = useState(false);
  const [photos, setPhotos] = useRecoilState(articlePhotosState);
  const setModalVisible = useSetRecoilState(modalActivationState);
  const limitPhotoCount = 5;

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== PermissionStatus.GRANTED) {
      setModalVisible(true);
      setModalMessage("사진 업로드 위해 갤러리 접근 권한이 필요합니다.");
      setPermissionForCameraRoll(false);
    } else {
      setPermissionForCameraRoll(true);
    }
  };

  const pickPhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setPhotos(
        photos.concat({
          id: (photoId++).toString(),
          uri: result.uri,
        }),
      );
    }
  };

  const addImage = async () => {
    if (!permissionForCameraRoll) {
      setModalVisible(true);
      setModalMessage("설정에서 갤러리 접근 권한을 허용해주세요.");
      return;
    }

    if (photos.length === limitPhotoCount) {
      setModalVisible(true);
      setModalMessage(
        "사진은 최대 " + limitPhotoCount + "장만 첨부 가능합니다.",
      );
      return;
    }

    try {
      await pickPhoto();
    } catch (error) {
      console.warn(error);
      setModalVisible(true);
      setModalMessage("사진 불러오기에 실패했습니다.");
    }
  };

  const removeImage = (id: string) => {
    setPhotos(photos.filter((value) => value.id !== id));
  };

  return (
    <View style={styles.container}>
      <NoticeModal message={modalMessage} />
      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={addImage}>
          <MaterialCommunityIcons name="camera" size={28} color="grey" />
          <View style={styles.photoCountContainer}>
            <Text style={styles.addedPhotoCount}>{photos.length}</Text>
            <Text style={styles.limitPhotoCount}>/{limitPhotoCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.photoListContainer}>
        <FlatList
          data={photos}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <View style={styles.delete}>
                <TouchableOpacity onPress={() => removeImage(item.id)}>
                  <AntDesign name="closecircle" size={23} />
                </TouchableOpacity>
              </View>
              <Image style={styles.photo} source={{ uri: item.uri }} />
            </View>
          )}
          contentContainerStyle={styles.photoListContents}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cameraButtonContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
    paddingVertical: 10,
    paddingRight: 10,
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eaeaea",
  },
  photoCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addedPhotoCount: {
    fontSize: 15,
    color: "orange",
  },
  limitPhotoCount: {
    fontSize: 15,
    color: "grey",
  },
  photoListContainer: {
    flexGrow: 4,
    flexShrink: 1,
    flexDirection: "row",
  },
  photoContainer: {
    aspectRatio: 1,
    marginLeft: 5,
    marginRight: 10,
    marginVertical: 10,
  },
  delete: {
    position: "absolute",
    color: "black",
    opacity: 0.5,
    right: -7,
    top: -7,
    zIndex: 99999,
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 5,
  },
  photoListContents: {
    alignItems: "center",
    justifyContent: "center",
  },
});
