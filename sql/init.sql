INSERT INTO user (`id`, `name`, `email`, `password`) VALUES (1, 'test', 'test@test.com', 'test');

INSERT INTO cook (`id`, `description`, `location`, `coordinates`, `user_id`) VALUES (1, 'ik ben een kok', 'groningen', POINT(0, 0), 1);

INSERT INTO dish (`name`, `description`, `cook_id`) 
VALUES ('Lamsrack met warme salade van gemengde bonen en slow-geroosterde tomaten', 'Mals, mager lamsvlees en een selectie van de beste groenten maakt dit een romantische gerecht dat je niet snel zult vergeten
', 1);

INSERT INTO categories('')

INSERT INTO allergy (name, description) VALUES ('Glutenbevattende granen', 'tarwe, rogge, gerst, haver, spelt, khorasantarwe/ kamut'),
('Schaaldieren', NULL),
('Eieren', NULL),
('Vis', NULL),
('Eieren', NULL),
('Pinda', NULL),
('Soja', NULL),
('Melk', 'inclusief lactose'),
('Noten', 'amandelen, hazelnoten, walnoten, cashewnoten, pecannoten, paranoten, pistachenoten en macadamianoten'),
('Selderij', NULL),
('Mosterd', NULL),
('Sesamzaad', NULL),
('Zwaveldioxide en Sulfiet', 'Bij concentraties van meer dan 10 mg SO2 per kilo of liter'),
('Lupine', NULL),
('Weekdieren', NULL);

INSERT INTO dish_allergy (dish_id, allergy_id) VALUES (1, 1);

