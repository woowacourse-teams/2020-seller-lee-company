import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import {
  CompositeNavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  ArticleCardProps,
  HomeStackParam,
  RootStackParam,
} from "../types/types";
import { articlesAPI } from "../api/api";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil/dist";
import {
  articleIsModifiedState,
  articleSelectedCategoryState,
} from "../states/articleState";
import ArticleCard from "../components/Common/ArticleCommon/ArticleCard";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { categoryIcons } from "../data/categoryData";
import theme from "../colors";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import OrganizationList from "../components/organization/OrganizationList";
import { selectedOrganizationInCategoryState } from "../states/organizationState";

type CategoryHomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryHomeScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function CategoryHomeScreen() {
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<CategoryHomeScreenNavigationProp>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [hasAdditionalArticle, setHasAdditionalArticle] = useState(true);
  const category = useRecoilValue(articleSelectedCategoryState);
  const isFocused = useIsFocused();
  const [isModified, setIsModified] = useRecoilState(articleIsModifiedState);
  const selectedOrganization = useRecoilValue(
    selectedOrganizationInCategoryState,
  );
  const [visibleMenu, setVisibleMenu] = useState(false);
  const resetSelectedOrganization = useResetRecoilState(
    selectedOrganizationInCategoryState,
  );

  useEffect(() => {
    const applyChange = async () => {
      initFeed();
      setIsModified(false);
    };
    isModified ? applyChange() : undefined;
  }, [isFocused]);

  useEffect(() => {
    selectedOrganization.name === "전체"
      ? initFeed()
      : initFeedByOrganization();
  }, [selectedOrganization]);
  const getCategoryIcon = () =>
    categoryIcons.filter((value) => value.category === category)[0];

  const goBack = () => {
    resetSelectedOrganization();
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${getCategoryIcon().icon} ${category}`,
      headerTitleAlign: "left",
      headerRight: () => getHeaderRight(),
      headerLeft: () => {
        return (
          <HeaderBackButton
            labelVisible={false}
            onPress={goBack}
            backImage={() => (
              <Feather name="chevron-left" size={24} color="black" />
            )}
          />
        );
      },
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => getHeaderRight(),
    });
  }, [visibleMenu]);

  useEffect(() => {
    setVisibleMenu(false);
  }, [selectedOrganization]);

  const onPressBackButton = () => {
    setVisibleMenu(false);
    return false;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    onPressBackButton,
  );

  const getHeaderRight = () => {
    return (
      <Menu opened={visibleMenu}>
        <MenuTrigger onPress={() => setVisibleMenu(true)}>
          <Feather
            name="filter"
            size={22}
            color="#333"
            style={styles.filterIcon}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.menuOptionsContainer}
          customStyles={{ optionText: styles.menuCustomText }}
        >
          <OrganizationList isGroupFiltering={true} isFeed={false} />
        </MenuOptions>
      </Menu>
    );
  };

  useEffect(() => {
    initFeed();
  }, []);

  const initFeed = async () => {
    const { data } = await articlesAPI.getByCategory({
      lastArticleId: Number.MAX_SAFE_INTEGER,
      size: PAGE_ARTICLE_UNIT,
      category,
    });
    setArticles([...data]);
  };

  const initFeedByOrganization = async () => {
    const { data } = await articlesAPI.getByCategoryAndOrganization({
      organizationId: selectedOrganization.id,
      parameters: {
        lastArticleId: Number.MAX_SAFE_INTEGER,
        size: PAGE_ARTICLE_UNIT,
        category: category,
      },
    });
    setArticles([...data]);
  };

  const loadFeed = async () => {
    const { data } = await articlesAPI.getByCategory({
      lastArticleId: getLastArticleId(),
      size: PAGE_ARTICLE_UNIT,
      category,
    });
    setArticles(articles.concat(data));
    return data;
  };

  const loadFeedByOrganization = async () => {
    const { data } = await articlesAPI.getByCategoryAndOrganization({
      organizationId: selectedOrganization.id,
      parameters: {
        lastArticleId: getLastArticleId(),
        size: PAGE_ARTICLE_UNIT,
        category: category,
      },
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
    if (!category) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data =
      selectedOrganization.name === "전체"
        ? await loadFeed()
        : await loadFeedByOrganization();
    if (data.length === 0) {
      setHasAdditionalArticle(false);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.articleCardContainer}>
            <ArticleCard
              id={item.id}
              title={item.title}
              price={item.price}
              tradeState={item.tradeState}
              favoriteState={item.favoriteState}
              favoriteCount={item.favoriteCount}
              thumbnail={item.thumbnail}
              createdTime={item.createdTime}
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.25}
        onEndReached={onLoad}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  articleCardContainer: {
    paddingVertical: 15,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  filterIcon: {
    marginRight: 15,
  },
  menuOptionsContainer: {
    width: 150,
  },
  menuCustomText: {
    textAlign: "center",
    margin: 10,
  },
});
