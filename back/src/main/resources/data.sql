insert into member (member_id, email, password, avatar, nickname, score)
values (51, 'turtle@woowabro.com', '1234',
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4',
        'turtle', 8),
       (52, 'lxxjn0@gmail.com', '0000',
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4',
        'lxxjn0', 5.0),
       (53, 'sellerlee@gmail.com', '1234',
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4',
        'sellerlee', 4);

insert into article (article_id, created_time, modified_time, title, category, contents, price,
                     trade_type, trade_location, trade_state, member_id)
values (51, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 51);
--        (52, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DELIVERY', null, 'ON_SALE', 51),
--        (53, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 51),
--        (54, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DELIVERY', null, 'ON_SALE', 51),
--        (55, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
--        (56, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
--        (57, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DELIVERY', null, 'ON_SALE', 52),
--        (58, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
--        (59, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 53),
--        (60, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DELIVERY', null, 'ON_SALE', 53),
--        (61, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 53),
--        (62, '2020-07-29 07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
--         1234, 'DELIVERY', null, 'ON_SALE', 53);

insert into tag (article_id, name)
values (51, 'test tag1'),
       (51, 'test tag2');
--        (52, 'test tag3'),
--        (52, 'test tag4');

insert into favorite (favorite_id, article_id, member_id)
values (51, 51, 51);
--        (52, 52, 52);

insert into photo (ARTICLE_ID, PHOTOS)
VALUES (51,
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4'),
       (51,
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4'),
       (51,
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4');