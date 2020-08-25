import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { memberInfoAvatarState } from "../../states/memberState";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
} from "expo-image-picker";
import moment from "moment";
// @ts-ignore
import { RNS3 } from "react-native-aws3";
import { s3Secret } from "../../secret";
import { loginIdState } from "../../states/loginState";
import * as Permissions from "expo-permissions";

export default function MyInfoAvatar() {
  const memberId = useRecoilValue(loginIdState);
  const [avatar, setAvatar] = useRecoilState(memberInfoAvatarState);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== PermissionStatus.GRANTED) {
      alert("사진 업로드 위해 갤러리 접근 권한이 필요합니다.");
    }
  };

  const pickPhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.3,
    });
    if (!result.cancelled) {
      const file = {
        uri: result.uri,
        name: memberId + "_" + moment.now() + ".jpeg",
        type: "image/jpeg",
      };

      const options = {
        keyPrefix: "images/",
        bucket: "seller-lee-bucket",
        region: "ap-northeast-2",
        accessKey: s3Secret.accessKey,
        secretKey: s3Secret.secretKey,
        successActionStatus: 201,
      };

      const response = await RNS3.put(file, options);
      setAvatar(response.body.postResponse.location);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <TouchableOpacity style={styles.button} onPress={pickPhoto}>
        <Text style={styles.text}>사진 변경</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  button: {
    marginTop: 10,
  },
  text: {
    color: colors.primary,
  },
});
