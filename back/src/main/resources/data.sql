/**
 * @author begaonnuri
 */

insert into member (member_id, email, password, score)
values (1, 'turtle@woowabro.com', '1234', 36);

insert into article (article_id, category, contents, price, title, member_id) values (2, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (3, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (4, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (5, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (6, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (7, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (8, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (9, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (10, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (11, 'PC', 'test contents1', 1234, 'test title1', 1);
insert into article (article_id, category, contents, price, title, member_id) values (12, 'PC', 'test contents1', 1234, 'test title1', 1);

insert into tag (article_id, name)
values (1, 'test tag1'),
       (1, 'test tag2'),
       (2, 'test tag3'),
       (2, 'test tag4');
