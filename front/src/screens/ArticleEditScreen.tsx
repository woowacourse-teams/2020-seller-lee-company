import React, { useEffect, useState } from "react";
import ArticleCreateScreen from "./ArticleCreateScreen";
import { Article, ArticleEditScreenRouteProp } from "../types/types";
import { articleDetailAPI } from "../api/api";
import { useRoute } from "@react-navigation/native";

export default function ArticleEditScreen() {
  const route = useRoute<ArticleEditScreenRouteProp>();
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    articleDetailAPI
      .get(route.params.articleId)
      .then((res) => setArticle(res.data));
  }, [route]);

  return <ArticleCreateScreen editArticle={article} />;
}
