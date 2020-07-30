/**
 * @author kouz95
 */

insert into member (member_id, email, password, score)
values (1, 'sellerlee@gmail.com', '1234', 4.5),
       (2, 'lxxjn0@gmail.com', '0000', 5.0);

insert into article (article_id, category, contents, price, title, member_id)
values (1, 'TEST', 'test contents1', 1234, 'test title1', 1),
       (2, 'TEST', 'test contents2', 5678, 'test title2', 1);

insert into tag (article_id, name)
values (1, 'test tag1'),
       (1, 'test tag2'),
       (2, 'test tag3'),
       (2, 'test tag4');
