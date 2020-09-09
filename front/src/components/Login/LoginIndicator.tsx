import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { loadingState } from "../../states/loadingState";

export default function LoginIndicator() {
  const isLoading = useRecoilValue(loadingState);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color={"#145374"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#145374",
    opacity: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});
