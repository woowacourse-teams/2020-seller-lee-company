insert into member (member_id, email, password, avatar, nickname, score)
values (51, 'lxxjn0@woowabro.com', '1234',
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4',
        'lxxjn0', 8),
       (52, 'begaonnuri@woowabro.com', '0000',
        'https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4',
        'begaonnuri', 5.0),
       (53, 'jnsorn@woowabro.com', '1234',
        'https://avatars2.githubusercontent.com/u/31095063?s=400&u=e10e5d42924c8443b43faf9e943ff8aa73d6c79d&v=4',
        'jnsorn', 4),
       (54, 'kouz95@woowabro.com', '0000',
        'https://avatars3.githubusercontent.com/u/52931057?s=400&u=e1a3a103fc54a423fd56ab6fafce748d360f3336&v=4',
        'kouz95', 4),
       (55, 'joseph415@woowabro.com', '1234',
        'https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4',
        'joseph415', 4);

insert into article (article_id, created_time, modified_time, title, category, contents, price,
                     trade_type, trade_location, trade_state, member_id)
values (51, '2020-06-21T12:25:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 51),
       (52, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DELIVERY', null, 'ON_SALE', 51),
       (53, '2020-07-29T07:20:00', '2020-07-29 07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 51),
       (54, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DELIVERY', null, 'ON_SALE', 51),
       (55, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
       (56, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
       (57, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DELIVERY', null, 'ON_SALE', 52),
       (58, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 52),
       (59, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 53),
       (60, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DELIVERY', null, 'ON_SALE', 53),
       (61, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DIRECT_TRANSACTION', '잠실동', 'ON_SALE', 53),
       (62, '2020-07-29T07:20:00', '2020-07-29T07:20:00', 'test title1', 'PC', 'test contents1',
        1234, 'DELIVERY', null, 'ON_SALE', 53);

insert into tag (article_id, name)
values (51, 'test tag1'),
       (51, 'test tag2'),
       (52, 'test tag3'),
       (52, 'test tag4');

insert into favorite (favorite_id, article_id, member_id)
values (51, 51, 51),
       (52, 52, 52);

insert into photo (ARTICLE_ID, PHOTOS)
values (51,
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4'),
       (51,
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4'),
       (51,
        'https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4'),
       (52,
        'https://avatars2.githubusercontent.com/u/31095063?s=400&u=e10e5d42924c8443b43faf9e943ff8aa73d6c79d&v=4'),
       (52,
        'https://avatars3.githubusercontent.com/u/52931057?s=400&u=e1a3a103fc54a423fd56ab6fafce748d360f3336&v=4'),
       (53,
        'https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4');
