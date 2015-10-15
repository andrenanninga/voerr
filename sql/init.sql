INSERT INTO user (`id`, `name`, `email`, `password`) VALUES (1, 'test', 'test@test.com', 'test');

INSERT INTO cook (`id`, `description`, `location`, `coordinates`, `user_id`) VALUES (1, 'ik ben een kok', 'groningen', POINT(0, 0), 1);

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
(14, 'Salade ', 12),
(15, 'Rijst ', 12),
(16, 'Soep ', 12),
(17, 'Brood/sandwiches ', 12),
(18, 'Gebak ', 12),
(19, 'Quiche ', 12),
(20, 'Stamppot ', 12),
(21, 'Saus/dressing ', 12),
(22, 'Couscous ', 12),
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
(5, 'Eieren', NULL),
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

-- 
INSERT INTO dish (`id`, `name`, `description`, `cook_id`) 
VALUES (1, 'Lamsrack met warme salade van gemengde bonen en langzaam-geroosterde tomaten', 'Mals, mager lamsvlees en een selectie van de beste groenten maakt dit een romantische gerecht dat je niet snel zult vergeten
', 1);
INSERT INTO dish_allergy (`dish_id`, `allergy_id`) VALUES (1, 2), (1,11);
INSERT INTO dish_category (`dish_id`, `category_id`) VALUES (1, 48), (1, 39), (1, 24), (1, 14), (1, 2);
-- 