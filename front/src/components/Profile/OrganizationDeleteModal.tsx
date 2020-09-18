import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../types/types";
import theme from "../../colors";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  deleteOrganizationState,
  noOrganizationState,
  organizationDeleteModalState,
  organizationListState,
} from "../../states/organizationState";
import { memberOrganizationAPI, organizationAPI } from "../../api/api";

type OrganizationDeleteModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "OrganizationManageScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function OrganizationDeleteModal() {
  const navigation = useNavigation<OrganizationDeleteModalNavigationProp>();
  const [organizationDeleteModal, setOrganizationDeleteModal] = useRecoilState(
    organizationDeleteModalState,
  );
  const setOrganizationList = useSetRecoilState(organizationListState);
  const deleteOrganization = useRecoilValue(deleteOrganizationState);
  const resetDeleteOrganization = useResetRecoilState(deleteOrganizationState);
  const setNoOrganization = useSetRecoilState(noOrganizationState);

  const updateOrganizationList = async () => {
    try {
      const { data, status } = await organizationAPI.showAll();

      if (status === 200 && data.length !== 0) {
        setOrganizationList(data);
        return;
      }
      setNoOrganization(true);
      return navigation.reset({
        index: 0,
        routes: [{ name: "OrganizationHomeScreen" }],
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressDelete = async () => {
    try {
      const { status } = await memberOrganizationAPI.delete(
        deleteOrganization.id,
      );

      if (status === 204) {
        await updateOrganizationList();
        setOrganizationDeleteModal(false);
      }
      resetDeleteOrganization();
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressCancel = () => {
    setOrganizationDeleteModal(false);
    resetDeleteOrganization();
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={organizationDeleteModal}
      onRequestClose={() => setOrganizationDeleteModal(false)}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.organizationName}>
              {deleteOrganization.name}
            </Text>
            <Text style={styles.modalText}> 조직을 나가시겠습니까?</Text>
          </View>
          <View style={styles.emptyContainer}>
            <TouchableHighlight style={styles.button} onPress={onPressCancel}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={onPressDelete}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  organizationName: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.primary,
  },
  modalText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: theme.secondary,
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
