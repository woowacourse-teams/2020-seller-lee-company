insert into member (member_id, email, password, score)
values (1, 'turtle@woowabro.com', '1234', 36),
       (2, 'lxxjn0@gmail.com', '0000', 5.0),
       (3, 'sellerlee@gmail.com', '1234', 4.5);

insert into article (article_id, category, contents, price, title, member_id)
values (1, 'PC', 'test contents1', 1234, 'test title1', 1),
       (2, 'PC', 'test contents1', 1234, 'test title1', 1),
       (3, 'PC', 'test contents1', 1234, 'test title1', 1),
       (4, 'PC', 'test contents1', 1234, 'test title1', 1),
       (5, 'PC', 'test contents1', 1234, 'test title1', 1),
       (6, 'PC', 'test contents1', 1234, 'test title1', 1),
       (7, 'PC', 'test contents1', 1234, 'test title1', 1),
       (8, 'PC', 'test contents1', 1234, 'test title1', 1),
       (9, 'PC', 'test contents1', 1234, 'test title1', 1),
       (10, 'PC', 'test contents1', 1234, 'test title1', 1),
       (11, 'PC', 'test contents1', 1234, 'test title1', 1),
       (12, 'PC', 'test contents1', 1234, 'test title1', 1);

insert into tag (article_id, name)
values (2, 'test tag1'),
       (2, 'test tag2'),
       (3, 'test tag3'),
       (3, 'test tag4');
