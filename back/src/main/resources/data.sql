insert into member (member_id, email, password, avatar, nickname, score)
values (51, 'turtle@woowabro.com', '1234', null, 'turtle', 36),
       (52, 'lxxjn0@gmail.com', '0000', null, 'lxxjn0', 5.0),
       (53, 'sellerlee@gmail.com', '1234', null, 'sellerlee', 4.5);

insert into article (article_id, title, category, contents, price, trade_type, trade_location,
                     trade_state, member_id)
values (51, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        51),
       (52, 'test title1', 'PC', 'test contents1', 1234, 'DELIVERY', null, 'ON_SALE', 51),
       (53, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        51),
       (54, 'test title1', 'PC', 'test contents1', 1234, 'DELIVERY', null, 'ON_SALE', 51),
       (55, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        52),
       (56, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        52),
       (57, 'test title1', 'PC', 'test contents1', 1234, 'DELIVERY', null, 'ON_SALE', 52),
       (58, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        52),
       (59, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        53),
       (60, 'test title1', 'PC', 'test contents1', 1234, 'DELIVERY', null, 'ON_SALE', 53),
       (61, 'test title1', 'PC', 'test contents1', 1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE',
        53),
       (62, 'test title1', 'PC', 'test contents1', 1234, 'DELIVERY', null, 'ON_SALE', 53);

insert into tag (article_id, name)
values (51, 'test tag1'),
       (51, 'test tag2'),
       (52, 'test tag3'),
       (52, 'test tag4');

insert into favorite (favorite_id, article_id, member_id)
values (51, 51, 51),
       (52, 52, 52);