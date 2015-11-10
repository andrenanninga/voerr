CREATE TABLE `user` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `name` varchar(127) NOT NULL, `email` varchar(127) NOT NULL, `password` varchar(127) NOT NULL, `avatar` int(13) DEFAULT NULL, `credit` int(13) DEFAULT 0, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;;

CREATE TABLE `cook` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `description` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `coordinates` POINT NOT NULL, `user_id` int(13) NOT NULL, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `dish` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `name` varchar(127) NOT NULL, `description` varchar(255) NOT NULL, `cook_id` int(13) NOT NULL, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `category` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `name` varchar(63) NOT NULL, `parent_id` int(13) DEFAULT NULL) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `dish_category` (`dish_id` int(13) NOT NULL, `category_id` int(13) NOT NULL, `date_created` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `allergy` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `name` varchar(63), `description` varchar(255)) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `dish_allergy` (`dish_id` int(13) NOT NULL, `allergy_id` int(13) NOT NULL, `date_created` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `review` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `content` text, `rating` TINYINT UNSIGNED NOT NULL, `user_id` int(13) DEFAULT NULL, `dish_id` int(13) NOT NULL, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `meal` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `price` double NOT NULL, `available_from` datetime NOT NULL, `available_until` datetime NOT NULL, `dinner_time` datetime NULL, `portions` int(2) NOT NULL, `portions_claimed` int(2) DEFAULT 0, `location` varchar(255) DEFAULT NULL, `notes` varchar(255) DEFAULT NULL, `is_takeout` tinyint(1) DEFAULT 0, `dish_id` int(13) NOT NULL, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `order` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `amount_meals` int(2) DEFAULT 1, `is_takeout` tinyint(1) DEFAULT 0, `start_time` datetime, `total_amount` double NOT NULL, `meal_id` int(13) NOT NULL, `user_id` int(13) NOT NULL, `date_created` datetime, `date_updated` datetime) ENGINE=InnoDB CHARACTER SET=utf8;

CREATE TABLE `photo` (`id` int(13) PRIMARY KEY AUTO_INCREMENT, `name` varchar(127), `dish_id` int(13) DEFAULT NULL, `user_id` int(13) DEFAULT NULL,  `cook_id` int(13) DEFAULT NULL, `date_created` datetime, `date_updated` datetime, `base64` varchar(255)) ENGINE=InnoDB CHARACTER SET=utf8;

ALTER TABLE `user` ADD INDEX `ix_user_id` (`id`);
ALTER TABLE `cook` ADD INDEX `ix_cook_id` (`id`);
ALTER TABLE `cook` ADD INDEX `ix_cook_user_id` (`user_id`);
ALTER TABLE `dish` ADD INDEX `ix_dish_id` (`id`);
ALTER TABLE `dish` ADD INDEX `ix_dish_cook_id` (`cook_id`);
ALTER TABLE `category` ADD INDEX `ix_category_id` (`id`);
ALTER TABLE `category` ADD INDEX `ix_category_parent_id` (`parent_id`);
ALTER TABLE `dish_category` ADD INDEX `ix_dish_category_category_id` (`category_id`);
ALTER TABLE `dish_category` ADD INDEX `ix_dish_category_dish_id` (`dish_id`);
ALTER TABLE `allergy` ADD INDEX `ix_allergy_id` (`id`);
ALTER TABLE `dish_allergy` ADD INDEX `ix_dish_allergy_dish_id` (`dish_id`);
ALTER TABLE `dish_allergy` ADD INDEX `ix_dish_allergy_allergy_id` (`allergy_id`);
ALTER TABLE `review` ADD INDEX `ix_review_id` (`id`);
ALTER TABLE `meal` ADD INDEX `ix_meal_id` (`id`);
ALTER TABLE `meal` ADD INDEX `ix_meal_dish_id` (`dish_id`);
ALTER TABLE `order` ADD INDEX `ix_order_id` (`id`);
ALTER TABLE `order` ADD INDEX `ix_order_meal_id` (`meal_id`);
ALTER TABLE `order` ADD INDEX `ix_order_user_id` (`user_id`);
ALTER TABLE `photo` ADD INDEX `ix_photo_id` (`id`);
ALTER TABLE `photo` ADD INDEX `ix_photo_dish_id` (`dish_id`);
ALTER TABLE `photo` ADD INDEX `ix_photo_user_id` (`user_id`);
ALTER TABLE `photo` ADD INDEX `ix_photo_cook_id` (`cook_id`);

-- ALTER TABLE `cook` ADD SPATIAL INDEX `sp_cook_coordinates` (`coordinates`);


ALTER TABLE `category` ADD FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `cook` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `dish` ADD FOREIGN KEY (`cook_id`) REFERENCES `cook`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `cook` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `dish_allergy` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `dish_allergy` ADD FOREIGN KEY (`allergy_id`) REFERENCES `allergy`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `dish_category` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `dish_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `meal` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `order` ADD FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `photo` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `photo` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `photo` ADD FOREIGN KEY (`cook_id`) REFERENCES `cook`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `review` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `review` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `user` ADD FOREIGN KEY (`avatar`) REFERENCES `photo`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT; 
ALTER TABLE `user` ADD CONSTRAINT UQ_User_Email UNIQUE (`email`)








-- CREATE TABLE `eat_type` (`id` int(1), `name` varchar(63), `user_select` int(1) DEFAULT 1)
-- INSERT INTO `eat_type` (`name`, `user_select`) VALUES ('Blijven eten', 1), ('Meenemen', 1), ('Blijven eten of meenemen', NULL)