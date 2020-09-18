import React, { useEffect, useState } from "react";

import { FlatList } from "react-native";

import OrganizationItem from "./OrganizationItem";
import { organizationAPI } from "../../api/api";

export default function OrganizationChatList() {
  const [organizations, setOrganizations] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  useEffect(() => {
    const initOrganizations = async () => {
      const { data } = await organizationAPI.showAll();
      setOrganizations(data);
    };
    initOrganizations();
  }, []);

  return (
    <FlatList
      data={organizations}
      renderItem={({ item }) => (
        // @ts-ignore
        <OrganizationItem id={item.id} name={item.name} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
