import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CompositeNavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Feed, HomeStackParam, RootStackParam } from "../types/types";
import FeedArticleCard from "../components/Feed/FeedArticleCard";
import { articlesAPI, memberAPI } from "../api/api";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import { articleIsModifiedState } from "../states/articleState";
import theme from "../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Permissions from "expo-permissions";
import { PermissionStatus } from "expo-permissions";
import * as Notifications from "expo-notifications";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { selectedOrganizationInFeedsState } from "../states/organizationState";
import { Feather } from "@expo/vector-icons";
import OrganizationList from "../components/organization/OrganizationList";

type FeedHomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "FeedHomeScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function FeedHomeScreen() {
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<FeedHomeScreenNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Feed[]>([]);
  const [hasAdditionalArticle, setHasAdditionalArticle] = useState(true);
  const isFocused = useIsFocused();
  const setIsModified = useSetRecoilState(articleIsModifiedState);
  const selectedOrganization = useRecoilValue(selectedOrganizationInFeedsState);

  useEffect(() => {
    initFeed();
    requestNotificationPermission();
  }, []);

  useEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  useEffect(() => {
    isFocused ? applyChange() : undefined;
  }, [isFocused]);

  useEffect(() => {
    selectedOrganization.name === "전체"
      ? initFeed()
      : initFeedByOrganization();
  }, [selectedOrganization]);

  const requestNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== PermissionStatus.GRANTED) {
      return;
    }
    const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    await memberAPI.putByPushToken({ pushToken });
  };

  const applyChange = async () => {
    initFeed();
    setIsModified(false);
  };

  const initFeed = async () => {
    const { data } = await articlesAPI.get({
      lastArticleId: Number.MAX_SAFE_INTEGER,
      size: PAGE_ARTICLE_UNIT,
    });
    setArticles([...data]);
  };

  const initFeedByOrganization = async () => {
    const { data } = await articlesAPI.getByOrganization({
      organizationId: selectedOrganization.id,
      parameters: {
        lastArticleId: Number.MAX_SAFE_INTEGER,
        size: PAGE_ARTICLE_UNIT,
      },
    });
    setArticles([...data]);
  };

  const loadFeed = async () => {
    const { data } = await articlesAPI.get({
      lastArticleId: getLastArticleId(),
      size: PAGE_ARTICLE_UNIT,
    });
    setArticles(articles.concat(data));
    return data;
  };

  const getLastArticleId = () => {
    return articles
      .map((article) => article.id)
      .sort((a, b) => b - a)
      .pop() as number;
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await initFeed();
    setHasAdditionalArticle(true);
    setIsRefreshing(false);
  };

  const onLoad = async () => {
    if (articles.length < MIN_LOAD_ARTICLE_COUNT || !hasAdditionalArticle) {
      return;
    }
    setIsLoading(true);
    const data = await loadFeed();
    if (data.length === 0) {
      setHasAdditionalArticle(false);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {selectedOrganization.name !== ""
            ? selectedOrganization.name
            : "전체"}
        </Text>
        <Menu>
          <MenuTrigger>
            <Feather name="chevron-down" size={24} color="grey" />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={styles.menuOptionsContainer}
            customStyles={{ optionText: styles.menuCustomText }}
          >
            <OrganizationList isGroupFiltering={true} />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.feedArticleCardContainer}>
              <FeedArticleCard
                id={item.id}
                price={item.price}
                tags={item.tags}
                favoriteCount={item.favoriteCount}
                photos={item.photos}
                favoriteState={item.favoriteState}
              />
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
          refreshing={isRefreshing}
          contentContainerStyle={styles.feedArticleContainer}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.25}
          onEndReached={onLoad}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.primary,
    paddingRight: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
  },
  flatListContainer: {
    flex: 12,
  },
  feedArticleContainer: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  feedArticleCardContainer: {
    backgroundColor: "transparent",
    marginBottom: 15,
  },
  menuOptionsContainer: {},
  menuCustomText: {
    backgroundColor: "red",
    textAlign: "center",
    margin: 10,
  },
});
