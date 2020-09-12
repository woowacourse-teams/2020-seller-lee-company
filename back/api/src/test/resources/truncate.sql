SET foreign_key_checks = 0;

TRUNCATE TABLE article;
TRUNCATE TABLE article_favorite_count;
TRUNCATE TABLE chat_room;
TRUNCATE TABLE favorite;
TRUNCATE TABLE member;
TRUNCATE TABLE photo;
TRUNCATE TABLE tag;
TRUNCATE TABLE trade;

ALTER TABLE article
    ALTER COLUMN article_id RESTART WITH 1;
ALTER TABLE article_favorite_count
    ALTER COLUMN article_favorite_count_id RESTART WITH 1;
ALTER TABLE chat_room
    ALTER COLUMN chat_room_id RESTART WITH 1;
ALTER TABLE favorite
    ALTER COLUMN favorite_id RESTART WITH 1;
ALTER TABLE member
    ALTER COLUMN member_id RESTART WITH 1;
ALTER TABLE trade
    ALTER COLUMN trade_id RESTART WITH 1;

SET foreign_key_checks = 1;
