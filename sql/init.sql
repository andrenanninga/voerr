-- Insert user

INSERT INTO user (`id`, `name`, `email`, `password`, `credit`, `date_created`, `date_updated`) 
VALUES (1, 'Test Testinga', 'test@test.com', '885597b5cc68711f43f6b76e05abcf407a32831533b54bafe5ddc28e', 1000, NOW(), NOW()), 	-- pw = wachtwoord
(2, 'Henk van de Woude', 'henk@aol.com', '885597b5cc68711f43f6b76e05abcf407a32831533b54bafe5ddc28e', 500, NOW(), NOW()),			-- pw = wachtwoord
(3, 'Johen Croif', 'jcroif@live.nl', '885597b5cc68711f43f6b76e05abcf407a32831533b54bafe5ddc28e', 0, NOW(), NOW()),		-- pw = wachtwoord
(4, 'Tim Schaap', 'timm@gmail.com', '885597b5cc68711f43f6b76e05abcf407a32831533b54bafe5ddc28e', 0, NOW(), NOW()),	-- pw = wachtwoord
(5, 'dr. André Nanninga', 'de-real-dr-dre@hotmail.com', '885597b5cc68711f43f6b76e05abcf407a32831533b54bafe5ddc28e', 0, NOW(), NOW());		-- pw = wachtwoord

--

-- Insert cook

INSERT INTO cook (`id`, `description`, `location`, `coordinates`, `user_id`, `date_created`, `date_updated`) 

VALUES (1, 'Self made kok', 'Groningen', POINT(0, 0), 1, NOW(), NOW()),
(2, 'Ik hou niet van koken', 'Amsterdam', POINT(1, 1), 2, NOW(), NOW()),
(3, 'Specialisatie in Indonesisch', 'Rotterdam', POINT(1, 1), 3, NOW(), NOW()),
(4, 'Kook dagelijks en hou van strandwandelingen.', 'Gronigen', POINT(1, 1), 4, NOW(), NOW()),
(5, 'Chefkok geweest in de jaren 60.', 'Groningen', POINT(1, 1), 5, NOW(), NOW());

--

INSERT INTO category (`id`, `name`, `parent_id`) VALUES
-- Category Menugang
(1, 'Menugang', NULL),
(2, 'Hoofdgerecht', 1),
(3, 'Voorgerecht', 1),
(4, 'Nagerecht', 1),
(5, 'Borrelhapje', 1),
(6, 'Tussendoortje', 1),
(7, 'Bijgerecht', 1),
(8, 'Lunch', 1),
(9, 'Brunch', 1),
(10, 'Ontbijt', 1),
(11, 'Drankje met alcohol', 1),
-- Category 'Soort gerecht'
(12, 'Soort gerect', NULL),
(13, 'Pasta', 12),
(14, 'Salade', 12),
(15, 'Rijst', 12),
(16, 'Soep', 12),
(17, 'Brood/sandwiches', 12),
(18, 'Gebak', 12),
(19, 'Quiche', 12),
(20, 'Stamppot', 12),
(21, 'Saus/dressing', 12),
(22, 'Couscous', 12),
-- Category 'Recepten met'
(23, 'Recepten met', NULL),
(24, 'Vlees', 23),
(25, 'Vis', 23),
(26, 'Gevogelte', 23),
(27, 'Schaal-/schelpdieren', 23),
(28, 'Vleesvervanger', 23),
-- Category 'Speciale wensen'
(29, 'Speciale wensen', NULL),
(30, 'Vegetarisch', 29),
(31, 'Lactosevrij', 29),
(32, 'Zonder vlees/vis', 29),
(33, 'Glutenvrij', 29),
(34, 'Zonder vlees', 29),
(35, 'Veganistisch', 29),
(36, 'Gezond', 29),
-- Category 'Seizoen'
(37, 'Seizoen', NULL),
(38, 'Winter', 37),
(39, 'Lente', 37),
(40, 'Zomer', 37),
(41, 'Herfst', 37),
-- Category 'Keuken'
(42, 'Keuken', NULL),
(43, 'Amerikaans', 42),
(44, 'Argentijns', 42),
(45, 'Aziatisch', 42),
(46, 'Caribisch', 42),
(47, 'Chinees', 42),
(48, 'Engels', 42),
(49, 'Frans', 42),
(50, 'Hollands', 42),
(51, 'Indiaas', 42),
(52, 'Indonesisch', 42);

INSERT INTO allergy (`id`, `name`, `description`) VALUES 
(1, 'Glutenbevattende granen', 'tarwe, rogge, gerst, haver, spelt, khorasantarwe/ kamut'),
(2, 'Schaaldieren', NULL),
(3, 'Eieren', NULL),
(4, 'Vis', NULL),
(6, 'Pinda', NULL),
(7, 'Soja', NULL),
(8, 'Melk', 'inclusief lactose'),
(9, 'Noten', 'amandelen, hazelnoten, walnoten, cashewnoten, pecannoten, paranoten, pistachenoten en macadamianoten'),
(10, 'Selderij', NULL),
(11, 'Mosterd', NULL),
(12, 'Sesamzaad', NULL),
(13, 'Zwaveldioxide en Sulfiet', 'Bij concentraties van meer dan 10 mg SO2 per kilo of liter'),
(14, 'Lupine', NULL),
(15, 'Weekdieren', NULL);

-- Insert dish 
INSERT INTO dish (`id`, `name`, `description`, `cook_id`, `date_created`, `date_updated`) 
VALUES (1, 'Lamsrack met warme salade van gemengde bonen en langzaam-geroosterde tomaten', 'Mals, mager lamsvlees en een selectie van de beste groenten maakt dit een romantische gerecht dat je niet snel zult vergeten
', 1, NOW(), NOW()),

(2, 'Beef Wellington', 'Een versie van het klassieke steak gerecht - het middelpunt op een speciale gelegenheid.
', 2, NOW(), NOW()),

(3, 'Citroentaart met zomer bessen', 'Een zingy lemon tart van de heer Ramsay. Gordons versie van de klassieke Franse Tarte au citron is de moeite waard.',
 3, NOW(), NOW()),

(4, 'Mediterrane zalmfilet', 'Zalm gevuld met mediterrane smaken, dit licht, gezonde voorjaar lunch wordt gemaakt om te delen met vrienden.
', 4, NOW(), NOW()),

(5, 'Zomer bessen meringues', 'Huisgemaakte zomerbessen meringues. Voor de fijnproever.
.', 5, NOW(), NOW()),

(6, 'Pork & Ham Pie', 'Een heerlijke pork pie recept is perfect voor een buffet.
', 1, NOW(), NOW());


-- Insert meal 
INSERT INTO meal (`price`, `available_from`, `available_until`, `dinner_time`, `portions`, `portions_claimed`, `location`, `notes`, `is_takeout`, `dish_id`, `date_created`, `date_updated`) 
VALUES 

(2, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 10, 0, "Groningen", "", 0, 1, NOW(), NOW()),
(2, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 10, 0, "Groningen", "", 0, 1, NOW(), NOW()),
(2, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 10, 0, "Groningen", "", 0, 1, NOW(), NOW()),

(7, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 6, 0, "Groningen", "", 1, 2, NOW(), NOW()),
(7, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 6, 0, "Groningen", "", 1, 2, NOW(), NOW()),
(7, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 6, 0, "Groningen", "", 1, 2, NOW(), NOW()),

(4, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 8, 0, "Rotterdam", "Zelfgemaakte ingredienten", 1, 3, NOW(), NOW()),
(4, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 8, 0, "Rotterdam", "Zelfgemaakte ingredienten", 1, 3, NOW(), NOW()),
(4, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 8, 0, "Rotterdam", "Zelfgemaakte ingredienten", 1, 3, NOW(), NOW()),

(7, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 6, 0, "Volendam", "Biologisch", 1, 4, NOW(), NOW()),
(7, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 6, 0, "Volendam", "Biologisch", 1, 4, NOW(), NOW()),
(7, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 6, 0, "Volendam", "Biologisch", 1, 4, NOW(), NOW()),

(7, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 6, 0, "Nieuw Amsterdam", "Fair Trade", 1, 5, NOW(), NOW()),
(7, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 6, 0, "Nieuw Amsterdam", "Fair Trade", 1, 5, NOW(), NOW()),
(7, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 6, 0, "Nieuw Amsterdam", "Fair Trade", 1, 5, NOW(), NOW()),

(7, "2015-11-11 18:00:00", "2015-11-11 20:00:00", "2015-11-11 18:30:00", 6, 0, "Groningen", "", 1, 6, NOW(), NOW()),
(7, "2015-11-12 18:00:00", "2015-11-12 20:00:00", "2015-11-12 18:30:00", 6, 0, "Groningen", "", 1, 6, NOW(), NOW()),
(7, "2015-11-13 18:00:00", "2015-11-13 20:00:00", "2015-11-13 18:30:00", 6, 0, "Groningen", "", 1, 6, NOW(), NOW());
--

-- Insert dish_allergy

INSERT INTO dish_allergy (`dish_id`, `allergy_id`) 
VALUES 
(1, 2), (1,11), (1,6), (1,4),
(2, 3), (2, 10), (2,11), (2,14),
(3, 4), (3, 10), (1,11), (3,2),
(4, 6), (4, 1), (1,11), (4,9),
(5, 7), (5, 10), (1,3), (5,4),
(6, 8), (6, 10), (6,11), (6,8); 


--

-- Insert dish_category

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (1, 48), (1, 39), (1, 24), (1, 14), (1, 2);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (2, 48), (2, 38), (2, 24), (2, 14), (2, 2);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (3, 48), (3, 39), (3, 24), (3, 2);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (4, 48), (4, 25), (4, 2);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (5, 48), (5, 39), (5, 4);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (5, 48), (5, 39), (5, 4);

INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (6, 2), (6, 24), (6, 48);


--

-- Insert review

INSERT INTO review (`id`, `content`, `rating`, `user_id`, `dish_id`, `date_created`, `date_updated`) VALUES (1, 'Ik vond het een heerlijke maaltijd!', 5, 1, 1, NOW(), NOW());

INSERT INTO review (`id`, `content`, `rating`, `user_id`, `dish_id`, `date_created`, `date_updated`) VALUES (2, 'Het was niet zo mooi als in de foto. Jammer hoor.. 4/5', 4, 2, 2, NOW(), NOW());

--

-- Insert photo

INSERT INTO photo (`id`, `name`, `dish_id`, `user_id`, `cook_id`, `date_created`)
VALUES
(1, 'boy_1.jpg', NULL, 1, NULL, NOW()),
(2, 'boy_2.jpg', NULL, 2, NULL, NOW()),
(3, 'boy_3.jpg', NULL, 3, NULL, NOW()),
(4, 'girl_1.jpg', NULL, 4, NULL, NOW()),
(5, 'girl_2.jpg', NULL, 5, NULL, NOW()),

(6, 'dish_1.jpg', 1, NULL, NULL, NOW()),
(7, 'dish_2.jpg', 2, NULL, NULL, NOW()),
(8, 'dish_3.jpg', 3, NULL, NULL, NOW()),
(9, 'dish_4.jpg', 4, NULL, NULL, NOW()),
(10, 'dish_5.jpg', 5, NULL, NULL, NOW()),
(11, 'dish_6.jpg', 6, NULL, NULL, NOW()),

(12, 'kitchen_1.jpg', NULL, NULL, 1, NOW()),
(13, 'kitchen_2.jpg', NULL, NULL, 2, NOW()),
(14, 'kitchen_3.jpg', NULL, NULL, 3, NOW()),
(15, 'kitchen_4.jpg', NULL, NULL, 4, NOW()),
(16, 'kitchen_5.jpg', NULL, NULL, 5, NOW()),

(17, 'kitchen_6.jpg', NULL, NULL, 1, NOW()),
(18, 'kitchen_7.jpg', NULL, NULL, 2, NOW()),
(19, 'kitchen_8.jpg', NULL, NULL, 3, NOW()),
(20, 'kitchen_9.jpg', NULL, NULL, 4, NOW()),
(21, 'kitchen_10.jpg', NULL, NULL, 5, NOW());

--