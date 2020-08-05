insert into member (member_id, email, password, nickname, avatar, score)
values (51, 'turtle@woowabro.com', '1234', 'begaonnuri',
        'https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4',
        36),
       (52, 'lxxjn0@gmail.com', '0000', 'lxxjn0',
        'https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4',
        5.0),
       (53, 'sellerlee@gmail.com', '1234', '', '', 4.5);

insert into article (article_id, category, contents, price, title, member_id)
values (51, 'PC', 'test contents1', 1234, 'test title1', 51),
       (52, 'PC', 'test contents1', 1234, 'test title1', 51),
       (53, 'PC', 'test contents1', 1234, 'test title1', 51),
       (54, 'PC', 'test contents1', 1234, 'test title1', 51),
       (55, 'PC', 'test contents1', 1234, 'test title1', 51),
       (56, 'PC', 'test contents1', 1234, 'test title1', 51),
       (57, 'PC', 'test contents1', 1234, 'test title1', 51),
       (58, 'PC', 'test contents1', 1234, 'test title1', 51),
       (59, 'PC', 'test contents1', 1234, 'test title1', 51),
       (60, 'PC', 'test contents1', 1234, 'test title1', 51),
       (61, 'PC', 'test contents1', 1234, 'test title1', 51),
       (62, 'PC', 'test contents1', 1234, 'test title1', 51);

insert into tag (article_id, name)
values (51, 'test tag1'),
       (51, 'test tag2'),
       (52, 'test tag3'),
       (52, 'test tag4');

insert into chat_room(chat_room_id, article_id, member_id)
values (51, 51, 51),
       (52, 51, 52)