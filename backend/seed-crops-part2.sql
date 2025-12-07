-- =====================================================
-- WORLD CROPS DATABASE - CROP DATA SEED (PART 2)
-- =====================================================
-- This script inserts comprehensive crop data with names, 
-- characteristics, uses, and category assignments
-- IDEMPOTENT: Safe to run multiple times

BEGIN;

-- =====================================================
-- 5. INSERT MAJOR CEREAL CROPS
-- =====================================================

-- RICE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Oryza sativa',
  (SELECT id FROM crop_genera WHERE name = 'Oryza'),
  'sativa',
  'Rice',
  'Rice is a tropical cereal grown in most tropical regions with a warmer climate. It is the second most important cereal in the world after maize. In the tropics it is the primary cereal for human consumption. Rice is the main staple food for half the world''s population.',
  'Asia',
  'Worldwide, primarily Asia, Africa, Americas',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language) 
SELECT c.id, t.name, t.lang 
FROM crops c, (VALUES
  ('Rice', 'english'),
  ('Rijst', 'dutch'),
  ('Arroz', 'spanish'),
  ('Riz', 'french'),
  ('Reis', 'german'),
  ('Riso', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Oryza sativa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Oryza sativa'
AND cat.slug IN ('cereals', 'food-crops', 'major-crops', 'tropical-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- WHEAT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Triticum aestivum',
  (SELECT id FROM crop_genera WHERE name = 'Triticum'),
  'aestivum',
  'Wheat',
  'Wheat is worldwide the third most-important cereal after maize and rice, but it is the most important cereal of the temperate regions. It has been cultivated domestically for at least 11,000 years. Wheat flour has many uses, but its main use is to make bread, a staple food for many people around the world.',
  'Fertile Crescent',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Wheat', 'english'),
  ('Tarwe', 'dutch'),
  ('Trigo', 'spanish'),
  ('Blé', 'french'),
  ('Weizen', 'german'),
  ('Grano', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Triticum aestivum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Triticum aestivum'
AND cat.slug IN ('cereals', 'food-crops', 'major-crops', 'temperate-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- MAIZE/CORN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Zea mays',
  (SELECT id FROM crop_genera WHERE name = 'Zea'),
  'mays',
  'Maize',
  'Maize (or Corn) is the number one cereal in the world. It is important as a staple crop in Africa and South America and it is also important worldwide as a fodder crop.',
  'Mexico/Central America',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Maize', 'english'),
  ('Corn', 'english'),
  ('Maïs', 'dutch'),
  ('Maíz', 'spanish'),
  ('Maïs', 'french'),
  ('Mais', 'german'),
  ('Mais', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Zea mays'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Zea mays'
AND cat.slug IN ('cereals', 'food-crops', 'major-crops', 'subtropical-crops', 'tropical-crops', 'staple-food', 'forage-fodder-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BARLEY
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Hordeum vulgare',
  (SELECT id FROM crop_genera WHERE name = 'Hordeum'),
  'vulgare',
  'Barley',
  'Barley was one of the first cereals cultivated by man. It is one of the eight neolithic founder crops. Worldwide, it is the fourth important cereal crop (after maize, rice and wheat).',
  'Fertile Crescent',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Barley', 'english'),
  ('Gerst', 'dutch'),
  ('Cebada', 'spanish'),
  ('Orge', 'french'),
  ('Gerste', 'german'),
  ('Orzo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Hordeum vulgare'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Hordeum vulgare'
AND cat.slug IN ('cereals', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops', 'alcoholic-drinks')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- SORGHUM
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Sorghum bicolor',
  (SELECT id FROM crop_genera WHERE name = 'Sorghum'),
  'bicolor',
  'Sorghum',
  'Sorghum is an important cereal in relatively drier tropical regions. Globally it is now the 5th important cereal after maize, rice, wheat and barley, but in Africa it is the second most important cereal after maize.',
  'Africa',
  'Tropical and subtropical regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Sorghum', 'english'),
  ('Sorghum', 'dutch'),
  ('Sorgo', 'spanish'),
  ('Sorgho', 'french'),
  ('Sorghum', 'german')
) AS t(name, lang)
WHERE c.scientific_name = 'Sorghum bicolor'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Sorghum bicolor'
AND cat.slug IN ('cereals', 'food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops', 'arid-crops', 'staple-food', 'forage-fodder-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- OAT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Avena sativa',
  (SELECT id FROM crop_genera WHERE name = 'Avena'),
  'sativa',
  'Oat',
  'Oat is a cereal that used to be the staple food for people in Scotland. In most other countries its main use is as a fodder for livestock. When used for human consumption it is often in the form of oatmeal or rolled oats.',
  'Mediterranean and Near East',
  'Temperate regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Oat', 'english'),
  ('Haver', 'dutch'),
  ('Avena', 'spanish'),
  ('Avoine', 'french'),
  ('Hafer', 'german'),
  ('Avena', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Avena sativa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Avena sativa'
AND cat.slug IN ('cereals', 'food-crops', 'temperate-crops', 'cool-temperate-crops', 'forage-fodder-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- RYE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Secale cereale',
  (SELECT id FROM crop_genera WHERE name = 'Secale'),
  'cereale',
  'Rye',
  'Rye is closely related to wheat and barley. It grows in temperate climates and is the most winter hardy of all cereals. Rye is usually grown for its grain, which can be used to make dark (sometimes almost black) rye bread.',
  'Southwest Asia',
  'Temperate regions',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Rye', 'english'),
  ('Rogge', 'dutch'),
  ('Centeno', 'spanish'),
  ('Seigle', 'french'),
  ('Roggen', 'german'),
  ('Segale', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Secale cereale'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Secale cereale'
AND cat.slug IN ('cereals', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PEARL MILLET
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Pennisetum glaucum',
  (SELECT id FROM crop_genera WHERE name = 'Pennisetum'),
  'glaucum',
  'Pearl Millet',
  'Pearl millet originates from tropical Africa and is an important food crop in parts of Africa and in the Indian sub continent. The grains can be ground into flour for porridge. Also grown as forage crop.',
  'Tropical Africa',
  'Africa, India, Asia',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pearl Millet', 'english'),
  ('Parelgierst', 'dutch'),
  ('Mijo perla', 'spanish'),
  ('Mil à chandelle', 'french'),
  ('Perlhirse', 'german')
) AS t(name, lang)
WHERE c.scientific_name = 'Pennisetum glaucum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Pennisetum glaucum'
AND cat.slug IN ('cereals', 'food-crops', 'tropical-crops', 'arid-crops', 'forage-fodder-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 6. INSERT ROOT AND TUBER VEGETABLES
-- =====================================================

-- POTATO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Solanum tuberosum',
  (SELECT id FROM crop_genera WHERE name = 'Solanum'),
  'tuberosum',
  'Potato',
  'Potato originates from the Andes region in South America. After the discovery of the Americas it was brought to Europe where it quickly became an important staple food. The tubers are used as main staple food or as a vegetable.',
  'Andes region, South America',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Potato', 'english'),
  ('Aardappel', 'dutch'),
  ('Patata', 'spanish'),
  ('Pomme de terre', 'french'),
  ('Kartoffel', 'german'),
  ('Patata', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Solanum tuberosum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Solanum tuberosum'
AND cat.slug IN ('vegetables', 'tuber-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- SWEET POTATO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Ipomoea batatas',
  (SELECT id FROM crop_genera WHERE name = 'Ipomoea'),
  'batatas',
  'Sweet Potato',
  'Sweet potato originates from North and South America, but its highest production is in China. Sweet potato is usually grown for the sweet tasting tuberous roots. The young leaves and shoots are sometimes used as a leaf vegetable.',
  'Central and South America',
  'Worldwide, especially Asia and Africa',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Sweet Potato', 'english'),
  ('Zoete aardappel', 'dutch'),
  ('Batata', 'spanish'),
  ('Patate douce', 'french'),
  ('Süßkartoffel', 'german'),
  ('Patata dolce', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Ipomoea batatas'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Ipomoea batatas'
AND cat.slug IN ('vegetables', 'tuber-vegetables', 'food-crops', 'major-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CASSAVA
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Manihot esculenta',
  (SELECT id FROM crop_genera WHERE name = 'Manihot'),
  'esculenta',
  'Cassava',
  'Important cassava producing countries include Nigeria, Brazil, Indonesia, Thailand, Democratic Republic of the Congo, Angola and Ghana. Cassava is used to produce food, animal feed, and bio-ethanol.',
  'South America',
  'Tropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cassava', 'english'),
  ('Tapioca', 'english'),
  ('Maniok', 'dutch'),
  ('Yuca', 'spanish'),
  ('Manioc', 'french'),
  ('Maniok', 'german'),
  ('Manioca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Manihot esculenta'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Manihot esculenta'
AND cat.slug IN ('vegetables', 'tuber-vegetables', 'food-crops', 'major-crops', 'tropical-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CARROT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Daucus carota',
  (SELECT id FROM crop_genera WHERE name = 'Daucus'),
  'carota',
  'Carrot',
  'The carrot originates from Afghanistan. Carrots can be eaten raw or cooked. They are known for their high content of carotene (an orange pigment).',
  'Afghanistan',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Carrot', 'english'),
  ('Wortel', 'dutch'),
  ('Zanahoria', 'spanish'),
  ('Carotte', 'french'),
  ('Karotte', 'german'),
  ('Carota', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Daucus carota'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Daucus carota'
AND cat.slug IN ('vegetables', 'root-vegetables', 'food-crops', 'major-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BEETROOT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Beta vulgaris',
  (SELECT id FROM crop_genera WHERE name = 'Beta'),
  'vulgaris',
  'Beetroot',
  'Beetroot is a cultivated variety of the Beet. The red roots are eaten as a cooked vegetable or are used in salads.',
  'Mediterranean region',
  'Worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Beetroot', 'english'),
  ('Rode biet', 'dutch'),
  ('Remolacha', 'spanish'),
  ('Betterave', 'french'),
  ('Rote Beete', 'german'),
  ('Barbabietola', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Beta vulgaris'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Beta vulgaris'
AND cat.slug IN ('vegetables', 'root-vegetables', 'food-crops', 'temperate-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- RADISH
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Raphanus sativus',
  (SELECT id FROM crop_genera WHERE name = 'Raphanus'),
  'sativus',
  'Radish',
  'Radish is a root vegetable in the cabbage family. It has its origin in Europe, but is now grown all over the world. There are many different varieties which differ in shape, color and size.',
  'Europe and Asia',
  'Worldwide',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Radish', 'english'),
  ('Radijs', 'dutch'),
  ('Rábano', 'spanish'),
  ('Radis', 'french'),
  ('Radieschen', 'german'),
  ('Ravanello', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Raphanus sativus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Raphanus sativus'
AND cat.slug IN ('vegetables', 'root-vegetables', 'food-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- TURNIP
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Brassica rapa',
  (SELECT id FROM crop_genera WHERE name = 'Brassica'),
  'rapa',
  'Turnip',
  'The turnip or white turnip is a root vegetable. Some smaller varieties are grown for human consumption while others are used as fodder. The leaves are sometimes eaten as "turnip greens".',
  'Europe',
  'Worldwide',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Turnip', 'english'),
  ('Witte kool', 'dutch'),
  ('Nabo', 'spanish'),
  ('Navet', 'french'),
  ('Speiserübe', 'german'),
  ('Rapa', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Brassica rapa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Brassica rapa'
AND cat.slug IN ('vegetables', 'root-vegetables', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- TARO
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Colocasia esculenta',
  (SELECT id FROM crop_genera WHERE name = 'Colocasia'),
  'esculenta',
  'Taro',
  'Several plants in the Araceae family are called Taro. Their corms are used as vegetables. Colocasia esculenta is the most widely cultivated type of Taro.',
  'Southeast Asia',
  'Tropical regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Taro', 'english'),
  ('Taro', 'dutch'),
  ('Taro', 'spanish'),
  ('Taro', 'french'),
  ('Taro', 'german')
) AS t(name, lang)
WHERE c.scientific_name = 'Colocasia esculenta'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Colocasia esculenta'
AND cat.slug IN ('vegetables', 'tuber-vegetables', 'corm-vegetables', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- YAM
INSERT INTO crops (scientific_name, genus_id, species, common_name, is_crop_group, description, origin, distribution, priority_rank)
VALUES (
  'Dioscorea spp.',
  (SELECT id FROM crop_genera WHERE name = 'Dioscorea'),
  'spp.',
  'Yam',
  TRUE,
  'Dioscorea is a genus which includes many species that grow as lianas. Several species produce edible tubers which are called yams. They are common in West Africa and New Guinea.',
  'West Africa and Asia',
  'Tropical regions',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Yam', 'english'),
  ('Yam', 'dutch'),
  ('Ñame', 'spanish'),
  ('Igname', 'french'),
  ('Yams', 'german')
) AS t(name, lang)
WHERE c.scientific_name = 'Dioscorea spp.'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Dioscorea spp.'
AND cat.slug IN ('vegetables', 'tuber-vegetables', 'food-crops', 'tropical-crops', 'staple-food')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PARSNIP
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Pastinaca sativa',
  (SELECT id FROM crop_genera WHERE name = 'Pastinaca'),
  'sativa',
  'Parsnip',
  'Parsnip is a root vegetable closely related to carrot and parsley. The long tuberous root has cream-colored skin and flesh.',
  'Eurasia',
  'Temperate regions',
  70
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Parsnip', 'english'),
  ('Pastinaak', 'dutch'),
  ('Chirivía', 'spanish'),
  ('Panais', 'french'),
  ('Pastinake', 'german'),
  ('Pastinaca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Pastinaca sativa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Pastinaca sativa'
AND cat.slug IN ('vegetables', 'root-vegetables', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 7. INSERT BULB VEGETABLES
-- =====================================================

-- ONION
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Allium cepa',
  (SELECT id FROM crop_genera WHERE name = 'Allium'),
  'cepa',
  'Onion',
  'Onion is the most widely used vegetable in the world and is found in a large range of food recipes in many different cultures. Highest production is in China and India.',
  'Central Asia',
  'Worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Onion', 'english'),
  ('Ui', 'dutch'),
  ('Cebolla', 'spanish'),
  ('Oignon', 'french'),
  ('Zwiebel', 'german'),
  ('Cipolla', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Allium cepa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Allium cepa'
AND cat.slug IN ('vegetables', 'bulb-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GARLIC
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Allium sativum',
  (SELECT id FROM crop_genera WHERE name = 'Allium'),
  'sativum',
  'Garlic',
  'Garlic probably originates from central and southwestern Asia. It is now found in most countries and climates, with highest production in China and India. Garlic is usually used as a condiment in food.',
  'Central Asia',
  'Worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Garlic', 'english'),
  ('Knoflook', 'dutch'),
  ('Ajo', 'spanish'),
  ('Ail', 'french'),
  ('Knoblauch', 'german'),
  ('Aglio', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Allium sativum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Allium sativum'
AND cat.slug IN ('vegetables', 'bulb-vegetables', 'food-crops', 'major-crops', 'temperate-crops', 'herbs', 'medicinal-plants')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LEEK
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Allium ampeloprasum var. porrum',
  (SELECT id FROM crop_genera WHERE name = 'Allium'),
  'ampeloprasum var. porrum',
  'Leek',
  'Leek is a vegetable that is a close relative of onion, garlic and shallot. The stalk of leek is actually a bundle of leaf sheaths, which makes it a leaf vegetable.',
  'Mediterranean and Middle East',
  'Temperate regions',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Leek', 'english'),
  ('Prei', 'dutch'),
  ('Puerro', 'spanish'),
  ('Poireau', 'french'),
  ('Lauch', 'german'),
  ('Porro', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Allium ampeloprasum var. porrum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Allium ampeloprasum var. porrum'
AND cat.slug IN ('vegetables', 'bulb-vegetables', 'stem-vegetables', 'food-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- SHALLOT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Allium cepa var. aggregatum',
  (SELECT id FROM crop_genera WHERE name = 'Allium'),
  'cepa var. aggregatum',
  'Shallot',
  'Shallots are a variety of onion that form clusters of small bulbs. They have a milder, sweeter flavor than regular onions.',
  'Central or Southwest Asia',
  'Worldwide, especially Southeast Asia',
  75
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Shallot', 'english'),
  ('Sjalot', 'dutch'),
  ('Chalota', 'spanish'),
  ('Échalote', 'french'),
  ('Schalotte', 'german'),
  ('Scalogno', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Allium cepa var. aggregatum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Allium cepa var. aggregatum'
AND cat.slug IN ('vegetables', 'bulb-vegetables', 'food-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- Continue in Part 3...

COMMIT;
