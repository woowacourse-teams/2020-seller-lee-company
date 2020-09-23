import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
} from "expo-image-picker";
import * as Permissions from "expo-permissions";
import NoticeModal from "../Modal/NoticeModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil/dist";
import { modalActivationState } from "../../../states/modalState";
import { articlePhotosState } from "../../../states/articleState";
import moment from "moment";
// @ts-ignore
import { RNS3 } from "react-native-aws3";
import theme from "../../../colors";
import { s3Secret } from "../../../secret";
import { memberNicknameState } from "../../../states/memberState";

export default function Photo() {
  const LIMIT_PHOTO_COUNT = 5;

  const [modalMessage, setModalMessage] = useState("");
  const [permissionForCameraRoll, setPermissionForCameraRoll] = useState(false);
  const [photos, setPhotos] = useRecoilState(articlePhotosState);
  const setModalVisible = useSetRecoilState(modalActivationState);
  const memberNickname = useRecoilValue(memberNicknameState);

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
      quality: 0.3,
    });
    if (!result.cancelled) {
      const date = new Date();
      const format = "YYYY.MM.DD_HH:mm:ss";
      const now = moment(date).format(format);
      const file = {
        uri: result.uri,
        name: memberNickname + "_" + now + ".jpeg",
        type: "image/jpeg",
      };

      const options = {
        keyPrefix: "images/",
        bucket: "seller-lee",
        region: "ap-northeast-2",
        accessKey: s3Secret.accessKey,
        secretKey: s3Secret.secretKey,
        successActionStatus: 201,
      };

      const response = await RNS3.put(file, options);

      setPhotos((previousPhotos) =>
        previousPhotos.concat(response.body.postResponse.location),
      );
    }
  };

  const addImage = async () => {
    if (!permissionForCameraRoll) {
      setModalVisible(true);
      setModalMessage("설정에서 갤러리 접근 권한을 허용해주세요.");
      return;
    }

    if (photos.length === LIMIT_PHOTO_COUNT) {
      setModalVisible(true);
      setModalMessage(`사진은 최대 ${LIMIT_PHOTO_COUNT}장만 첨부 가능합니다.`);
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

  const removeImage = (selectedPhoto: string) => {
    setPhotos(photos.filter((photo) => photo !== selectedPhoto));
  };

  return (
    <View style={styles.container}>
      <NoticeModal message={modalMessage} />
      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={addImage}>
          <Feather name="camera" size={26} color="grey" />
          <View style={styles.photoCountContainer}>
            <Text style={styles.addedPhotoCount}>{photos.length}</Text>
            <Text style={styles.limitPhotoCount}>/{LIMIT_PHOTO_COUNT}</Text>
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
                <TouchableOpacity onPress={() => removeImage(item)}>
                  <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Image
                style={styles.photo}
                source={{ uri: item ? item : undefined }}
              />
            </View>
          )}
          contentContainerStyle={styles.photoListContents}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
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
    color: theme.primary,
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
