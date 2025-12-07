-- =====================================================
-- WORLD CROPS DATABASE - CROP DATA SEED (PART 5)
-- =====================================================
-- More tropical/subtropical fruits, exotic fruits, specialized vegetables, and cash crops
-- IDEMPOTENT: Safe to run multiple times

BEGIN;

-- =====================================================
-- 15. INSERT MORE SUBTROPICAL FRUITS
-- =====================================================

-- AVOCADO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Persea americana',
  (SELECT id FROM crop_genera WHERE name = 'Persea'),
  'americana',
  'Avocado',
  'The avocado is a popular fruit which originates from Mexico. It is used in salads, as guacamole or eaten as a fruit on its own. High in healthy fats, native to Central America.',
  'Mexico and Central America',
  'Subtropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Avocado', 'english'),
  ('Avocado', 'dutch'),
  ('Aguacate', 'spanish'),
  ('Avocat', 'french'),
  ('Avocado', 'german'),
  ('Avocado', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Persea americana'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Persea americana'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops', 'tropical-crops', 'vegetable-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- POMEGRANATE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Punica granatum',
  (SELECT id FROM crop_genera WHERE name = 'Punica'),
  'granatum',
  'Pomegranate',
  'Pomegranates are fruits that have a thick leathery skin and hundreds of red seeds inside. Very nutritious and drought-resistant. Each seed is surrounded by a sweet tasting edible coat.',
  'Iran to Northern India',
  'Mediterranean, subtropical and arid regions',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pomegranate', 'english'),
  ('Granaatappel', 'dutch'),
  ('Granada', 'spanish'),
  ('Grenade', 'french'),
  ('Granatapfel', 'german'),
  ('Melograno', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Punica granatum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Punica granatum'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops', 'arid-crops', 'medicinal-plants')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GUAVA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Psidium guajava',
  (SELECT id FROM crop_genera WHERE name = 'Psidium'),
  'guajava',
  'Guava',
  'Guava fruits are eaten fresh or used to make juice, jam or jelly. They are high in vitamin C and very hardy.',
  'Tropical Americas',
  'Tropical and subtropical regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Guava', 'english'),
  ('Guave', 'dutch'),
  ('Guayaba', 'spanish'),
  ('Goyave', 'french'),
  ('Guave', 'german'),
  ('Guava', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Psidium guajava'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Psidium guajava'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops', 'arid-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PASSION FRUIT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Passiflora edulis',
  (SELECT id FROM crop_genera WHERE name = 'Passiflora'),
  'edulis',
  'Passion Fruit',
  'Passion fruits grow on large vines. The aromatic pulp is used in beverages and desserts. Passion fruit is an important commercial fruit crop in tropical and subtropical regions.',
  'South America',
  'Tropical and subtropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Passion Fruit', 'english'),
  ('Passievrucht', 'dutch'),
  ('Maracuyá', 'spanish'),
  ('Fruit de la passion', 'french'),
  ('Passionsfrucht', 'german'),
  ('Frutto della passione', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Passiflora edulis'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Passiflora edulis'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- FIG
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Ficus carica',
  (SELECT id FROM crop_genera WHERE name = 'Ficus'),
  'carica',
  'Fig',
  'Figs are soft sweet fruits that can be eaten fresh or dried. The fig tree has its origin in the Middle East. Prefers dry summers and mild winters.',
  'Middle East',
  'Mediterranean, subtropical and tropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Fig', 'english'),
  ('Vijg', 'dutch'),
  ('Higo', 'spanish'),
  ('Figue', 'french'),
  ('Feige', 'german'),
  ('Fico', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Ficus carica'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Ficus carica'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops', 'mediterranean-crops', 'arid-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- DATE PALM
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Phoenix dactylifera',
  (SELECT id FROM crop_genera WHERE name = 'Phoenix'),
  'dactylifera',
  'Date Palm',
  'Date palms are cultivated for their sweet edible fruits. Dates are an important staple food in Middle Eastern and North African countries. Staple in dry tropical and desert areas.',
  'Middle East and North Africa',
  'Arid and subtropical regions',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Date Palm', 'english'),
  ('Date', 'english'),
  ('Dadel', 'dutch'),
  ('Dátil', 'spanish'),
  ('Datte', 'french'),
  ('Dattel', 'german'),
  ('Dattero', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Phoenix dactylifera'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Phoenix dactylifera'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'arid-crops', 'subtropical-crops', 'tropical-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 16. INSERT EXOTIC TROPICAL FRUITS
-- =====================================================

-- JACKFRUIT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Artocarpus heterophyllus',
  (SELECT id FROM crop_genera WHERE name = 'Artocarpus'),
  'heterophyllus',
  'Jackfruit',
  'Jackfruit is the world''s largest tree-borne fruit. It can weigh up to 35 kg (80 lbs). The sweet yellow flesh is eaten fresh or used in desserts. The seeds can also be eaten when roasted.',
  'India and Southeast Asia',
  'Tropical regions',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Jackfruit', 'english'),
  ('Jackfruit', 'dutch'),
  ('Yaca', 'spanish'),
  ('Jacquier', 'french'),
  ('Jackfrucht', 'german'),
  ('Giaca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Artocarpus heterophyllus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Artocarpus heterophyllus'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LYCHEE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Litchi chinensis',
  (SELECT id FROM crop_genera WHERE name = 'Litchi'),
  'chinensis',
  'Lychee',
  'Lychees are juicy and fragrant tropical fruits native to China. The fruit looks a bit like a strawberry with firm skin, but the skin is not edible.',
  'Southern China',
  'Subtropical and tropical Asia',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Lychee', 'english'),
  ('Litchi', 'english'),
  ('Lychee', 'dutch'),
  ('Lichi', 'spanish'),
  ('Litchi', 'french'),
  ('Litschi', 'german'),
  ('Litchi', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Litchi chinensis'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Litchi chinensis'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- DRAGON FRUIT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Hylocereus undatus',
  (SELECT id FROM crop_genera WHERE name = 'Hylocereus'),
  'undatus',
  'Dragon Fruit',
  'Dragon fruit, also called Pitaya, is a cactus fruit with vibrant color. It has a mild sweet taste with edible black seeds. Grows in dry climates.',
  'Central America',
  'Tropical and subtropical regions',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Dragon Fruit', 'english'),
  ('Pitaya', 'english'),
  ('Drakenvrucht', 'dutch'),
  ('Pitaya', 'spanish'),
  ('Pitaya', 'french'),
  ('Drachenfrucht', 'german'),
  ('Pitaya', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Hylocereus undatus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Hylocereus undatus'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops', 'arid-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- DURIAN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Durio zibethinus',
  (SELECT id FROM crop_genera WHERE name = 'Durio'),
  'zibethinus',
  'Durian',
  'Durian is known for its strong smell and creamy flesh. It is popular in Southeast Asia and known as the "king of fruits".',
  'Borneo and Sumatra',
  'Southeast Asia',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Durian', 'english'),
  ('Doerian', 'dutch'),
  ('Durián', 'spanish'),
  ('Durian', 'french'),
  ('Durian', 'german'),
  ('Durian', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Durio zibethinus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Durio zibethinus'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- MANGOSTEEN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Garcinia mangostana',
  (SELECT id FROM crop_genera WHERE name = 'Garcinia'),
  'mangostana',
  'Mangosteen',
  'Mangosteen is known as the "Queen of Fruits". It has soft white pulp with a sweet-sour taste. The purple skin is not edible.',
  'Southeast Asia',
  'Tropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Mangosteen', 'english'),
  ('Mangosteen', 'dutch'),
  ('Mangostán', 'spanish'),
  ('Mangoustan', 'french'),
  ('Mangostane', 'german'),
  ('Mangostano', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Garcinia mangostana'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Garcinia mangostana'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'medicinal-plants')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- RAMBUTAN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Nephelium lappaceum',
  (SELECT id FROM crop_genera WHERE name = 'Nephelium'),
  'lappaceum',
  'Rambutan',
  'Rambutan is a tropical fruit with hairy outer skin. The translucent white flesh is sweet and similar to lychee.',
  'Southeast Asia',
  'Tropical Asia',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Rambutan', 'english'),
  ('Rambutan', 'dutch'),
  ('Rambután', 'spanish'),
  ('Ramboutan', 'french'),
  ('Rambutan', 'german'),
  ('Rambutan', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Nephelium lappaceum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Nephelium lappaceum'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LONGAN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Dimocarpus longan',
  (SELECT id FROM crop_genera WHERE name = 'Dimocarpus'),
  'longan',
  'Longan',
  'Longan is sweet and musky, related to lychee. The name means "dragon eye" in Chinese, referring to the appearance of the fruit.',
  'Southern China and Southeast Asia',
  'Tropical and subtropical Asia',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Longan', 'english'),
  ('Longan', 'dutch'),
  ('Longán', 'spanish'),
  ('Longane', 'french'),
  ('Longan', 'german'),
  ('Longan', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Dimocarpus longan'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Dimocarpus longan'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- STARFRUIT/CARAMBOLA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Averrhoa carambola',
  (SELECT id FROM crop_genera WHERE name = 'Averrhoa'),
  'carambola',
  'Starfruit',
  'Starfruit has a distinctive star-shaped cross-section when sliced. It has a sweet-tart flavor and is eaten fresh or used in salads.',
  'Southeast Asia',
  'Tropical regions',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Starfruit', 'english'),
  ('Carambola', 'english'),
  ('Stervrucht', 'dutch'),
  ('Carambola', 'spanish'),
  ('Carambole', 'french'),
  ('Sternfrucht', 'german'),
  ('Carambola', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Averrhoa carambola'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Averrhoa carambola'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 17. INSERT MORE LEGUMES
-- =====================================================

-- CHICKPEA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cicer arietinum',
  (SELECT id FROM crop_genera WHERE name = 'Cicer'),
  'arietinum',
  'Chickpea',
  'Chickpeas are one of the earliest cultivated legumes. They are an important source of protein in many countries. Also known as garbanzo beans.',
  'Middle East',
  'India, Mediterranean, Africa, Americas',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Chickpea', 'english'),
  ('Garbanzo Bean', 'english'),
  ('Kikkererwt', 'dutch'),
  ('Garbanzo', 'spanish'),
  ('Pois chiche', 'french'),
  ('Kichererbse', 'german'),
  ('Cece', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Cicer arietinum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cicer arietinum'
AND cat.slug IN ('legumes', 'food-crops', 'major-crops', 'subtropical-crops', 'arid-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LENTIL
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Lens culinaris',
  (SELECT id FROM crop_genera WHERE name = 'Lens'),
  'culinaris',
  'Lentil',
  'Lentils are small lens-shaped legumes that are an important source of protein. They are widely used in soups, stews, and curries.',
  'Mediterranean and Near East',
  'India, Canada, Turkey, Australia',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Lentil', 'english'),
  ('Linze', 'dutch'),
  ('Lenteja', 'spanish'),
  ('Lentille', 'french'),
  ('Linse', 'german'),
  ('Lenticchia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Lens culinaris'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Lens culinaris'
AND cat.slug IN ('legumes', 'food-crops', 'major-crops', 'temperate-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PIGEON PEA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cajanus cajan',
  (SELECT id FROM crop_genera WHERE name = 'Cajanus'),
  'cajan',
  'Pigeon Pea',
  'Pigeon pea is an important legume in tropical and subtropical regions. Also known as Arhar or Tur. Important in India, Africa, and the Caribbean.',
  'India',
  'India, Africa, Caribbean, tropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pigeon Pea', 'english'),
  ('Arhar', 'english'),
  ('Tur', 'english'),
  ('Duivenerwt', 'dutch'),
  ('Guandul', 'spanish'),
  ('Pois d''Angole', 'french'),
  ('Straucherbse', 'german')
) AS t(name, lang)
WHERE c.scientific_name = 'Cajanus cajan'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cajanus cajan'
AND cat.slug IN ('legumes', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BROAD BEAN/FAVA BEAN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Vicia faba',
  (SELECT id FROM crop_genera WHERE name = 'Vicia'),
  'faba',
  'Broad Bean',
  'Broad beans, also called fava beans, are large flat beans used in Mediterranean and Middle Eastern cuisine.',
  'Mediterranean region',
  'Europe, North Africa, West Asia',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Broad Bean', 'english'),
  ('Fava Bean', 'english'),
  ('Tuinboon', 'dutch'),
  ('Haba', 'spanish'),
  ('Fève', 'french'),
  ('Ackerbohne', 'german'),
  ('Fava', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Vicia faba'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Vicia faba'
AND cat.slug IN ('legumes', 'food-crops', 'temperate-crops', 'cool-temperate-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 18. INSERT SPECIALIZED VEGETABLES
-- =====================================================

-- OKRA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Abelmoschus esculentus',
  (SELECT id FROM crop_genera WHERE name = 'Abelmoschus'),
  'esculentus',
  'Okra',
  'Okra, also known as Lady''s Finger, is a flowering plant in the mallow family. The edible green pods are used as a vegetable. Popular in India, Nigeria, Pakistan, and the southern USA.',
  'Africa or South Asia',
  'Tropical and subtropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Okra', 'english'),
  ('Lady''s Finger', 'english'),
  ('Okra', 'dutch'),
  ('Quingombó', 'spanish'),
  ('Gombo', 'french'),
  ('Okra', 'german'),
  ('Okra', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Abelmoschus esculentus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Abelmoschus esculentus'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BITTER GOURD
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Momordica charantia',
  (SELECT id FROM crop_genera WHERE name = 'Momordica'),
  'charantia',
  'Bitter Gourd',
  'Bitter gourd, also called bitter melon, is a tropical vine vegetable. It has a distinctively bitter taste and is used in Asian cuisine and traditional medicine.',
  'India and tropical Asia',
  'India, China, Southeast Asia',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Bitter Gourd', 'english'),
  ('Bitter Melon', 'english'),
  ('Bittere kalebas', 'dutch'),
  ('Melón amargo', 'spanish'),
  ('Margose', 'french'),
  ('Bittermelone', 'german'),
  ('Melone amaro', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Momordica charantia'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Momordica charantia'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'tropical-crops', 'medicinal-plants')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BOTTLE GOURD
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Lagenaria siceraria',
  (SELECT id FROM crop_genera WHERE name = 'Lagenaria'),
  'siceraria',
  'Bottle Gourd',
  'Bottle gourd is a vine plant grown for its edible young fruits. When mature, the hard shell can be used as containers or musical instruments.',
  'Africa',
  'India, Africa, Southeast Asia',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Bottle Gourd', 'english'),
  ('Calabash', 'english'),
  ('Fleskalebas', 'dutch'),
  ('Calabaza de botella', 'spanish'),
  ('Calebasse', 'french'),
  ('Flaschenkürbis', 'german'),
  ('Zucca bottiglia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Lagenaria siceraria'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Lagenaria siceraria'
AND cat.slug IN ('vegetables', 'fruit-vegetables', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 19. INSERT SUGAR AND INDUSTRIAL CROPS
-- =====================================================

-- SUGARCANE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Saccharum officinarum',
  (SELECT id FROM crop_genera WHERE name = 'Saccharum'),
  'officinarum',
  'Sugarcane',
  'Sugarcane is a tropical grass grown for its sweet sap, which is processed to make sugar. It is one of the world''s most important crops. Also used for bio-ethanol production.',
  'New Guinea',
  'Tropical and subtropical regions worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Sugarcane', 'english'),
  ('Sugar Cane', 'english'),
  ('Suikerriet', 'dutch'),
  ('Caña de azúcar', 'spanish'),
  ('Canne à sucre', 'french'),
  ('Zuckerrohr', 'german'),
  ('Canna da zucchero', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Saccharum officinarum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Saccharum officinarum'
AND cat.slug IN ('sugar-crops', 'industrial-crops', 'food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops', 'energy-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- COTTON
INSERT INTO crops (scientific_name, genus_id, species, common_name, is_crop_group, description, origin, distribution, priority_rank)
VALUES (
  'Gossypium spp.',
  (SELECT id FROM crop_genera WHERE name = 'Gossypium'),
  'spp.',
  'Cotton',
  TRUE,
  'Cotton is the world''s most important fiber crop. Cotton fibers are used to make textiles. The seeds can be processed for oil.',
  'Americas, Africa, and Asia',
  'Worldwide tropical and subtropical regions',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cotton', 'english'),
  ('Katoen', 'dutch'),
  ('Algodón', 'spanish'),
  ('Coton', 'french'),
  ('Baumwolle', 'german'),
  ('Cotone', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Gossypium spp.'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Gossypium spp.'
AND cat.slug IN ('fiber-crops', 'industrial-crops', 'non-food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops', 'vegetable-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- End of Seed Data

COMMIT;
