insert into member (member_id, email, password, score)
values (51, 'turtle@woowabro.com', '1234', 36),
       (52, 'lxxjn0@gmail.com', '0000', 5.0),
       (53, 'sellerlee@gmail.com', '1234', 4.5);

insert into article (article_id, category, contents, price, title, member_id)
values (51, 'PC', 'test contents1', 1234, 'test title1', 1),
       (52, 'PC', 'test contents1', 1234, 'test title1', 1),
       (53, 'PC', 'test contents1', 1234, 'test title1', 1),
       (54, 'PC', 'test contents1', 1234, 'test title1', 1),
       (55, 'PC', 'test contents1', 1234, 'test title1', 1),
       (56, 'PC', 'test contents1', 1234, 'test title1', 1),
       (57, 'PC', 'test contents1', 1234, 'test title1', 1),
       (58, 'PC', 'test contents1', 1234, 'test title1', 1),
       (59, 'PC', 'test contents1', 1234, 'test title1', 1),
       (60, 'PC', 'test contents1', 1234, 'test title1', 1),
       (61, 'PC', 'test contents1', 1234, 'test title1', 1),
       (62, 'PC', 'test contents1', 1234, 'test title1', 1);

insert into tag (article_id, name)
values (51, 'test tag1'),
       (51, 'test tag2'),
       (52, 'test tag3'),
       (52, 'test tag4');

