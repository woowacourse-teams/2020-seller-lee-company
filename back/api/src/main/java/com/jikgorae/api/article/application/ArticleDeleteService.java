package com.jikgorae.api.article.application;

import org.springframework.stereotype.Service;

import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;
import com.jikgorae.api.chatroom.application.ChatRoomService;
import com.jikgorae.api.favorite.application.FavoriteService;

@Service
public class ArticleDeleteService {
    private final ArticleRepository articleRepository;
    private final ArticleFavoriteCountService articleFavoriteCountService;
    private final ChatRoomService chatRoomService;
    private final FavoriteService favoriteService;

    public ArticleDeleteService(ArticleRepository articleRepository,
            ArticleFavoriteCountService articleFavoriteCountService,
            ChatRoomService chatRoomService,
            FavoriteService favoriteService) {
        this.articleRepository = articleRepository;
        this.articleFavoriteCountService = articleFavoriteCountService;
        this.chatRoomService = chatRoomService;
        this.favoriteService = favoriteService;
    }

    public void delete(Long id) {
        articleFavoriteCountService.deleteByArticleId(id);
        chatRoomService.deleteAllByArticleId(id);
        favoriteService.deleteAllByArticleId(id);
        articleRepository.deleteById(id);
    }
}
