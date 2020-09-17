import React, { useEffect, useState } from "react";

import { FlatList } from "react-native";

import OrganizationItem from "./OrganizationItem";

export default function OrganizationChatList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const initOrganizations = [
      {
        id: 1,
        name: "a",
      },
      {
        id: 2,
        name: "b",
      },
      {
        id: 3,
        name: "c",
      },
    ];

    // @ts-ignore
    setOrganizations(initOrganizations);
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
