-- =====================================================
-- WORLD CROPS DATABASE - CROP DATA SEED (PART 3)
-- =====================================================
-- Leafy vegetables, fruiting vegetables, and tropical fruits
-- IDEMPOTENT: Safe to run multiple times

BEGIN;

-- =====================================================
-- 8. INSERT LEAFY & BRASSICA VEGETABLES
-- =====================================================

-- CABBAGE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Brassica oleracea var. capitata',
  (SELECT id FROM crop_genera WHERE name = 'Brassica'),
  'oleracea var. capitata',
  'Cabbage',
  'The cultivated cabbage is related to the wild mustard, which originates from the Mediterranean region. Large producers of cabbage are China, India, Russia, Korea and Japan. Cabbage can be eaten raw or cooked, pickled or fermented to make sauerkraut or kimchi.',
  'Mediterranean region',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cabbage', 'english'),
  ('Kool', 'dutch'),
  ('Repollo', 'spanish'),
  ('Chou', 'french'),
  ('Kohl', 'german'),
  ('Cavolo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Brassica oleracea var. capitata'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Brassica oleracea var. capitata'
AND cat.slug IN ('vegetables', 'leaf-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LETTUCE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Lactuca sativa',
  (SELECT id FROM crop_genera WHERE name = 'Lactuca'),
  'sativa',
  'Lettuce',
  'Lettuce is a leafy vegetable grown worldwide for salads. There are many different varieties with varying leaf shapes, colors, and textures.',
  'Mediterranean region',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Lettuce', 'english'),
  ('Sla', 'dutch'),
  ('Lechuga', 'spanish'),
  ('Laitue', 'french'),
  ('Salat', 'german'),
  ('Lattuga', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Lactuca sativa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Lactuca sativa'
AND cat.slug IN ('vegetables', 'leaf-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- SPINACH
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Spinacia oleracea',
  (SELECT id FROM crop_genera WHERE name = 'Spinacia'),
  'oleracea',
  'Spinach',
  'Spinach is a leafy vegetable rich in iron and vitamins. The leaves are eaten fresh in salads or cooked as a vegetable.',
  'Persia (Iran)',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Spinach', 'english'),
  ('Spinazie', 'dutch'),
  ('Espinaca', 'spanish'),
  ('Épinard', 'french'),
  ('Spinat', 'german'),
  ('Spinacio', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Spinacia oleracea'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Spinacia oleracea'
AND cat.slug IN ('vegetables', 'leaf-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- KALE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Brassica oleracea var. acephala',
  (SELECT id FROM crop_genera WHERE name = 'Brassica'),
  'oleracea var. acephala',
  'Kale',
  'Kale is a hardy type of cabbage with long, rather coarse, curly leaves that don''t form a compact head. It is very nutritious and cold-hardy.',
  'Eastern Mediterranean',
  'Worldwide temperate regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Kale', 'english'),
  ('Boerenkool', 'dutch'),
  ('Col rizada', 'spanish'),
  ('Chou frisé', 'french'),
  ('Grünkohl', 'german'),
  ('Cavolo riccio', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Brassica oleracea var. acephala'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Brassica oleracea var. acephala'
AND cat.slug IN ('vegetables', 'leaf-vegetables', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 9. INSERT FRUITING VEGETABLES
-- =====================================================

-- TOMATO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Solanum lycopersicum',
  (SELECT id FROM crop_genera WHERE name = 'Solanum'),
  'lycopersicum',
  'Tomato',
  'Tomatoes originate from Central and South America and are closely related to eggplant, chili peppers, potato and tobacco. Tomatoes are eaten fresh or cooked and are often processed to make ketchup.',
  'South America',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Tomato', 'english'),
  ('Tomaat', 'dutch'),
  ('Tomate', 'spanish'),
  ('Tomate', 'french'),
  ('Tomate', 'german'),
  ('Pomodoro', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Solanum lycopersicum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Solanum lycopersicum'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'major-crops', 'subtropical-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- EGGPLANT/AUBERGINE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Solanum melongena',
  (SELECT id FROM crop_genera WHERE name = 'Solanum'),
  'melongena',
  'Eggplant',
  'Eggplant (or Aubergine) is closely related to tomato, potato and chili peppers. Originally a tropical crop, it is now also sometimes grown in heated greenhouses in cooler climates.',
  'India and Southeast Asia',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Eggplant', 'english'),
  ('Aubergine', 'english'),
  ('Aubergine', 'dutch'),
  ('Berenjena', 'spanish'),
  ('Aubergine', 'french'),
  ('Aubergine', 'german'),
  ('Melanzana', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Solanum melongena'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Solanum melongena'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'subtropical-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BELL PEPPER / CAPSICUM
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Capsicum annuum',
  (SELECT id FROM crop_genera WHERE name = 'Capsicum'),
  'annuum',
  'Bell Pepper',
  'The species Capsicum annuum includes bell peppers (which are not hot) and hot chili peppers. Bell peppers are found worldwide in tropical or warm climates. The fruits can be eaten raw or cooked.',
  'Mexico and Central America',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Bell Pepper', 'english'),
  ('Capsicum', 'english'),
  ('Paprika', 'dutch'),
  ('Pimiento', 'spanish'),
  ('Poivron', 'french'),
  ('Paprika', 'german'),
  ('Peperone', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Capsicum annuum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Capsicum annuum'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops', 'spices', 'herbs')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CUCUMBER
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cucumis sativus',
  (SELECT id FROM crop_genera WHERE name = 'Cucumis'),
  'sativus',
  'Cucumber',
  'Cucumber is a widely cultivated plant in the gourd family. The fruit is usually eaten fresh in salads or pickled.',
  'India',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cucumber', 'english'),
  ('Komkommer', 'dutch'),
  ('Pepino', 'spanish'),
  ('Concombre', 'french'),
  ('Gurke', 'german'),
  ('Cetriolo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Cucumis sativus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cucumis sativus'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PUMPKIN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cucurbita moschata',
  (SELECT id FROM crop_genera WHERE name = 'Cucurbita'),
  'moschata',
  'Pumpkin',
  'Pumpkins are large orange fruits of the gourd family. They are used as vegetables, in pies, and decoratively for Halloween.',
  'North America',
  'Worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pumpkin', 'english'),
  ('Pompoen', 'dutch'),
  ('Calabaza', 'spanish'),
  ('Citrouille', 'french'),
  ('Kürbis', 'german'),
  ('Zucca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Cucurbita moschata'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cucurbita moschata'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 10. INSERT LEGUMINOUS VEGETABLES
-- =====================================================

-- GREEN PEA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Pisum sativum',
  (SELECT id FROM crop_genera WHERE name = 'Pisum'),
  'sativum',
  'Pea',
  'The pea was one of the first pulses cultivated by man. It is one of the eight neolithic founder crops. There are many types of peas with different shapes and colors.',
  'Mediterranean basin and Near East',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pea', 'english'),
  ('Green Pea', 'english'),
  ('Erwt', 'dutch'),
  ('Guisante', 'spanish'),
  ('Pois', 'french'),
  ('Erbse', 'german'),
  ('Pisello', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Pisum sativum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Pisum sativum'
AND cat.slug IN ('vegetables', 'podded-vegetables', 'legumes', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- COMMON BEAN (French Bean)
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Phaseolus vulgaris',
  (SELECT id FROM crop_genera WHERE name = 'Phaseolus'),
  'vulgaris',
  'Common Bean',
  'Common bean includes many different varieties: French beans, green beans, snap beans, string beans, and dried beans. It is one of the most important food legumes.',
  'Mesoamerica',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Common Bean', 'english'),
  ('French Bean', 'english'),
  ('Green Bean', 'english'),
  ('Boon', 'dutch'),
  ('Judía verde', 'spanish'),
  ('Haricot vert', 'french'),
  ('Grüne Bohne', 'german'),
  ('Fagiolino', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Phaseolus vulgaris'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Phaseolus vulgaris'
AND cat.slug IN ('vegetables', 'podded-vegetables', 'legumes', 'food-crops', 'major-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- SOYBEAN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Glycine max',
  (SELECT id FROM crop_genera WHERE name = 'Glycine'),
  'max',
  'Soybean',
  'Soybean is often processed into soybean meal and vegetable oil. It is used as a source of protein in many processed foods or as a fodder for farm animals.',
  'East Asia',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Soybean', 'english'),
  ('Soja', 'dutch'),
  ('Soja', 'spanish'),
  ('Soja', 'french'),
  ('Sojabohne', 'german'),
  ('Soia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Glycine max'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Glycine max'
AND cat.slug IN ('legumes', 'food-crops', 'major-crops', 'temperate-crops', 'subtropical-crops', 'vegetable-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GROUNDNUT/PEANUT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Arachis hypogaea',
  (SELECT id FROM crop_genera WHERE name = 'Arachis'),
  'hypogaea',
  'Groundnut',
  'The groundnut, or peanut, is not a nut but a legume. It belongs to the bean family. The flowers self-pollinate and then the stalk grows downward to bury the fruits in the ground.',
  'South America',
  'Worldwide tropical and subtropical regions',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Groundnut', 'english'),
  ('Peanut', 'english'),
  ('Pinda', 'dutch'),
  ('Cacahuete', 'spanish'),
  ('Arachide', 'french'),
  ('Erdnuss', 'german'),
  ('Arachide', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Arachis hypogaea'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Arachis hypogaea'
AND cat.slug IN ('legumes', 'nuts', 'food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops', 'vegetable-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 11. INSERT TROPICAL FRUITS
-- =====================================================

-- BANANA
INSERT INTO crops (scientific_name, genus_id, species, common_name, is_crop_group, description, origin, distribution, priority_rank)
VALUES (
  'Musa spp.',
  (SELECT id FROM crop_genera WHERE name = 'Musa'),
  'spp.',
  'Banana',
  TRUE,
  'Bananas are the world''s best-selling fruits, followed by apples and oranges. They originate from tropical South-East Asia but are now found in almost all tropical regions of the world.',
  'Southeast Asia',
  'Tropical regions worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Banana', 'english'),
  ('Banaan', 'dutch'),
  ('Plátano', 'spanish'),
  ('Banane', 'french'),
  ('Banane', 'german'),
  ('Banana', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Musa spp.'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Musa spp.'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- MANGO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Mangifera indica',
  (SELECT id FROM crop_genera WHERE name = 'Mangifera'),
  'indica',
  'Mango',
  'Mango is often known as the "apple of the tropics". It is one of the most popular tropical fruits in the world (together with pineapple, banana, papaya and avocado). Mango fruits are usually eaten ripe, when they are soft and sweet.',
  'South Asia',
  'Tropical regions worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Mango', 'english'),
  ('Mango', 'dutch'),
  ('Mango', 'spanish'),
  ('Mangue', 'french'),
  ('Mango', 'german'),
  ('Mango', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Mangifera indica'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Mangifera indica'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PAPAYA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Carica papaya',
  (SELECT id FROM crop_genera WHERE name = 'Carica'),
  'papaya',
  'Papaya',
  'The papaya (or Pawpaw) originates from Mexico, Central America and Northern South America, but is now grown in most tropical regions of the world. Papaya is one of the most important tropical fruits. The fruits are eaten fresh often at breakfast or as a dessert.',
  'Central America and Mexico',
  'Tropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Papaya', 'english'),
  ('Pawpaw', 'english'),
  ('Papaja', 'dutch'),
  ('Papaya', 'spanish'),
  ('Papaye', 'french'),
  ('Papaya', 'german'),
  ('Papaia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Carica papaya'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Carica papaya'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PINEAPPLE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Ananas comosus',
  (SELECT id FROM crop_genera WHERE name = 'Ananas'),
  'comosus',
  'Pineapple',
  'Pineapples originate from southern Brazil and Paraguay. They are the only bromeliad fruits that are being cultivated. The fruits are best when eaten fresh, but pineapples are also often sold in cans. Together with mango, papaya, banana and avocado, they are very popular tropical fruits.',
  'South America',
  'Tropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pineapple', 'english'),
  ('Ananas', 'dutch'),
  ('Piña', 'spanish'),
  ('Ananas', 'french'),
  ('Ananas', 'german'),
  ('Ananas', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Ananas comosus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Ananas comosus'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- COCONUT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cocos nucifera',
  (SELECT id FROM crop_genera WHERE name = 'Cocos'),
  'nucifera',
  'Coconut',
  'Coconuts are the fruits of the coconut palm. Throughout the tropics this palm is grown as decoration or for its edible fruits. Almost any part of the plant can be used, for example to make furniture or mats, or to thatch roofs.',
  'Indo-Pacific region',
  'Tropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Coconut', 'english'),
  ('Kokosnoot', 'dutch'),
  ('Coco', 'spanish'),
  ('Noix de coco', 'french'),
  ('Kokosnuss', 'german'),
  ('Cocco', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Cocos nucifera'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cocos nucifera'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'tropical-crops', 'vegetable-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- Continue in Part 4...

COMMIT;
