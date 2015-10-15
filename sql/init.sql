INSERT INTO user (id, name, email, password) VALUES (1, 'test', 'test@test.com', 'test');

INSERT INTO cook (id, description, location, coordinates, user_id) VALUES (1, 'ik ben een kok', 'groningen', POINT(0, 0), 1);

INSERT INTO dish (name, description, cook_id) VALUES ('potje test', 'een lekker verse pot test', 1);

INSERT INTO allergy (id, name, description) VALUES (1, 'gluten', 'gluten');

INSERT INTO dish_allergy (dish_id, allergy_ud) VALUES (1, 1)