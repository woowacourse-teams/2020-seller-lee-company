/**
 * @author kouz95
 */

insert into MEMBER (MEMBER_ID)
values (1);

insert into ARTICLE (ARTICLE_ID, CONTENTS, TITLE, MEMBER_ID)
values (1, 'test contents1', 'test title1', 1);

insert into ARTICLE (ARTICLE_ID, CONTENTS, TITLE, MEMBER_ID)
values (2, 'test contents2', 'test title2', 1);

insert into TAG (ARTICLE_ID, NAME)
values (1, 'test tag1'),
       (1, 'test tag2'),
       (2, 'test tag3'),
       (2, 'test tag4');
