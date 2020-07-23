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
import { useSetRecoilState } from "recoil/dist";
import { modalActivationState } from "../states/modalState";

interface ImageInfo {
  id: string;
  uri: string;
}

export default function Photo() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [modalMessage, setModalMessage] = useState("");
  const [permissionForCameraRoll, setPermissionForCameraRoll] = useState(false);
  const setModalVisible = useSetRecoilState(modalActivationState);
  const maxImageCount = 5;

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
    if (!permissionForCameraRoll) {
      setModalVisible(true);
      setModalMessage("설정에서 갤러리 접근 권한을 허용해주세요.");
      return;
    }

    if (images.length === maxImageCount) {
      setModalVisible(true);
      setModalMessage("사진은 최대 " + maxImageCount + "장만 첨부 가능합니다.");
      return;
    }

    try {
      await pickImage();
    } catch (error) {
      console.warn(error);
      setModalVisible(true);
      setModalMessage("사진 불러오기에 실패했습니다.");
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((value) => value.id !== id));
  };

  return (
    <View style={styles.photoField}>
      <NoticeModal message={modalMessage} />
      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={addImage}>
          <MaterialCommunityIcons name="camera" size={25} color="grey" />
          <View style={styles.countContainer}>
            <Text style={styles.addedCountFont}>{images.length}</Text>
            <Text style={styles.countFont}>/{maxImageCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.photosContainer}>
        <FlatList
          data={images}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={() => removeImage(item.id)}>
                <AntDesign style={styles.delete} name="closecircle" size={20} />
              </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 6,
  },
  cameraButtonContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 8,
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgrey",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  countFont: {
    fontSize: 14,
    color: "grey",
  },
  addedCountFont: {
    fontSize: 14,
    color: "orange",
  },
  photosContainer: {
    flexGrow: 4,
    flexShrink: 1,
    flexDirection: "row",
    zIndex: -1,
  },
  photoContainer: {
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 8,
  },
  delete: {
    position: "absolute",
    color: "black",
    opacity: 0.7,
    right: -7,
    top: -7,
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 5,
    zIndex: -1,
  },
  photos: {
    alignItems: "center",
    justifyContent: "center",
  },
});
