-- =====================================================
-- WORLD CROPS DATABASE - CROP DATA SEED (PART 4)
-- =====================================================
-- Temperate fruits, citrus, herbs, spices, and specialized crops
-- IDEMPOTENT: Safe to run multiple times

BEGIN;

-- =====================================================
-- 12. INSERT CITRUS FRUITS (Subtropical)
-- =====================================================

-- ORANGE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Citrus sinensis',
  (SELECT id FROM crop_genera WHERE name = 'Citrus'),
  'sinensis',
  'Orange',
  'Oranges originate from south-east Asia but can now be found in most tropical and sub-tropical climates around the world. Oranges are eaten fresh or used to produce orange juice. Like other citrus fruits, they are rich in vitamins.',
  'Southeast Asia',
  'Worldwide subtropical regions',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Orange', 'english'),
  ('Sweet Orange', 'english'),
  ('Sinaasappel', 'dutch'),
  ('Naranja', 'spanish'),
  ('Orange', 'french'),
  ('Orange', 'german'),
  ('Arancia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Citrus sinensis'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Citrus sinensis'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LEMON
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Citrus limon',
  (SELECT id FROM crop_genera WHERE name = 'Citrus'),
  'limon',
  'Lemon',
  'Lemon is a popular citrus fruit used for drinks, food cleaning, and cooking. It has a sour taste and is rich in vitamin C.',
  'Asia',
  'Subtropical regions worldwide',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Lemon', 'english'),
  ('Citroen', 'dutch'),
  ('Limón', 'spanish'),
  ('Citron', 'french'),
  ('Zitrone', 'german'),
  ('Limone', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Citrus limon'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Citrus limon'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops', 'essential-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- LIME
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Citrus aurantiifolia',
  (SELECT id FROM crop_genera WHERE name = 'Citrus'),
  'aurantiifolia',
  'Lime',
  'Lime is a citrus fruit used extensively in cooking and drinks. It has a distinctive acidic flavor.',
  'Southeast Asia',
  'Tropical and subtropical regions',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Lime', 'english'),
  ('Limoen', 'dutch'),
  ('Lima', 'spanish'),
  ('Citron vert', 'french'),
  ('Limette', 'german'),
  ('Lime', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Citrus aurantiifolia'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Citrus aurantiifolia'
AND cat.slug IN ('fruits', 'food-crops', 'tropical-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GRAPEFRUIT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Citrus paradisi',
  (SELECT id FROM crop_genera WHERE name = 'Citrus'),
  'paradisi',
  'Grapefruit',
  'Grapefruits are large citrus fruits with a bitter-sour flavor. They are a hybrid between sweet orange and pomelo.',
  'Barbados',
  'Subtropical regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Grapefruit', 'english'),
  ('Grapefruit', 'dutch'),
  ('Pomelo', 'spanish'),
  ('Pamplemousse', 'french'),
  ('Grapefruit', 'german'),
  ('Pompelmo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Citrus paradisi'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Citrus paradisi'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- MANDARIN/TANGERINE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Citrus reticulata',
  (SELECT id FROM crop_genera WHERE name = 'Citrus'),
  'reticulata',
  'Mandarin',
  'Mandarins are easy to peel citrus fruits. Varieties include clementines, tangerines, and satsumas.',
  'Southeast Asia',
  'Subtropical regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Mandarin', 'english'),
  ('Tangerine', 'english'),
  ('Mandarijn', 'dutch'),
  ('Mandarina', 'spanish'),
  ('Mandarine', 'french'),
  ('Mandarine', 'german'),
  ('Mandarino', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Citrus reticulata'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Citrus reticulata'
AND cat.slug IN ('fruits', 'food-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 13. INSERT TEMPERATE FRUITS
-- =====================================================

-- APPLE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Malus domestica',
  (SELECT id FROM crop_genera WHERE name = 'Malus'),
  'domestica',
  'Apple',
  'An old proverb is "An apple a day keeps the doctor away". Apples are among the most popular fruits in the world. The apple tree has its origin in Kazakhstan, but is now found in many regions with temperate or subtropical climate. Highest production is in China.',
  'Kazakhstan and Central Asia',
  'Worldwide temperate regions',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Apple', 'english'),
  ('Appel', 'dutch'),
  ('Manzana', 'spanish'),
  ('Pomme', 'french'),
  ('Apfel', 'german'),
  ('Mela', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Malus domestica'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Malus domestica'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PEAR
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Pyrus communis',
  (SELECT id FROM crop_genera WHERE name = 'Pyrus'),
  'communis',
  'Pear',
  'The pear is a close relative of the apple. While most pears have a pear-shape, some varieties resemble apples, so it is not always easy to distinguish the fruits.',
  'Europe and Asia',
  'Temperate regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Pear', 'english'),
  ('Peer', 'dutch'),
  ('Pera', 'spanish'),
  ('Poire', 'french'),
  ('Birne', 'german'),
  ('Pera', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Pyrus communis'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Pyrus communis'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PEACH
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Prunus persica',
  (SELECT id FROM crop_genera WHERE name = 'Prunus'),
  'persica',
  'Peach',
  'Peaches are known for their soft velvety skin and sweet aromatic juicy flesh. Nectarines are a type of peach but with smooth skin. Needs moderately cold winter temperatures.',
  'Northwest China',
  'Temperate regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Peach', 'english'),
  ('Perzik', 'dutch'),
  ('Melocotón', 'spanish'),
  ('Pêche', 'french'),
  ('Pfirsich', 'german'),
  ('Pesca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Prunus persica'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Prunus persica'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CHERRY (SWEET)
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Prunus avium',
  (SELECT id FROM crop_genera WHERE name = 'Prunus'),
  'avium',
  'Cherry',
  'Wild cherries grow in most of Europe, western Asia and parts of northern Africa. The cultivated cherry has its origin in Turkey. Most sweet cherries are eaten fresh.',
  'Turkey and Europe',
  'Temperate regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cherry', 'english'),
  ('Sweet Cherry', 'english'),
  ('Kers', 'dutch'),
  ('Cereza', 'spanish'),
  ('Cerise', 'french'),
  ('Kirsche', 'german'),
  ('Ciliegia', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Prunus avium'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Prunus avium'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- PLUM
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Prunus domestica',
  (SELECT id FROM crop_genera WHERE name = 'Prunus'),
  'domestica',
  'Plum',
  'Plums are temperate fruits which when mature are often covered by a wax coating. They are usually eaten fresh. There are many varieties and subspecies.',
  'Europe and Asia',
  'Temperate regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Plum', 'english'),
  ('Pruim', 'dutch'),
  ('Ciruela', 'spanish'),
  ('Prune', 'french'),
  ('Pflaume', 'german'),
  ('Prugna', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Prunus domestica'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Prunus domestica'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- APRICOT
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Prunus armeniaca',
  (SELECT id FROM crop_genera WHERE name = 'Prunus'),
  'armeniaca',
  'Apricot',
  'The apricot originates from China. It has been cultivated in Armenia for so long that it is often thought to have originated there. Apricots can be eaten fresh but are also often dried.',
  'China',
  'Temperate and subtropical regions',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Apricot', 'english'),
  ('Abrikoos', 'dutch'),
  ('Albaricoque', 'spanish'),
  ('Abricot', 'french'),
  ('Aprikose', 'german'),
  ('Albicocca', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Prunus armeniaca'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Prunus armeniaca'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'mediterranean-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GRAPE
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Vitis vinifera',
  (SELECT id FROM crop_genera WHERE name = 'Vitis'),
  'vinifera',
  'Grape',
  'Grapes can be eaten fresh, but many grapes are used to produce white or red wine. Grapes are among the most popular fruits in the world. Table, wine and raisin varieties exist.',
  'Mediterranean and Central Asia',
  'Worldwide temperate and subtropical regions',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Grape', 'english'),
  ('Druif', 'dutch'),
  ('Uva', 'spanish'),
  ('Raisin', 'french'),
  ('Traube', 'german'),
  ('Uva', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Vitis vinifera'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Vitis vinifera'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'temperate-crops', 'mediterranean-crops', 'subtropical-crops', 'alcoholic-drinks')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- STRAWBERRY
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Fragaria × ananassa',
  (SELECT id FROM crop_genera WHERE name = 'Fragaria'),
  '× ananassa',
  'Strawberry',
  'Strawberries are popular berries grown worldwide. When farmers grow strawberries they often cover the soil with straw to protect the fruits from rot. Maybe this is how the strawberry got its name.',
  'Europe and Americas',
  'Worldwide temperate regions',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Strawberry', 'english'),
  ('Aardbei', 'dutch'),
  ('Fresa', 'spanish'),
  ('Fraise', 'french'),
  ('Erdbeere', 'german'),
  ('Fragola', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Fragaria × ananassa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Fragaria × ananassa'
AND cat.slug IN ('fruits', 'food-crops', 'major-crops', 'temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BLUEBERRY
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Vaccinium corymbosum',
  (SELECT id FROM crop_genera WHERE name = 'Vaccinium'),
  'corymbosum',
  'Blueberry',
  'Blueberry is a true berry, rich in antioxidants. Highbush types common in temperate zones.',
  'North America',
  'Temperate regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Blueberry', 'english'),
  ('Blauwe bes', 'dutch'),
  ('Arándano', 'spanish'),
  ('Myrtille', 'french'),
  ('Heidelbeere', 'german'),
  ('Mirtillo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Vaccinium corymbosum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Vaccinium corymbosum'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- RASPBERRY
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Rubus idaeus',
  (SELECT id FROM crop_genera WHERE name = 'Rubus'),
  'idaeus',
  'Raspberry',
  'Raspberries look a bit like blackberries, but when you pick them there is a clear difference; the raspberry separates from its core so that it looks like a hollow fruit. Red and black types exist.',
  'Europe and Asia',
  'Temperate regions worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Raspberry', 'english'),
  ('Framboos', 'dutch'),
  ('Frambuesa', 'spanish'),
  ('Framboise', 'french'),
  ('Himbeere', 'german'),
  ('Lampone', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Rubus idaeus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Rubus idaeus'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'cool-temperate-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BLACKBERRY
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Rubus fruticosus',
  (SELECT id FROM crop_genera WHERE name = 'Rubus'),
  'fruticosus',
  'Blackberry',
  'The fruit of the blackberry is actually not a true berry but an aggregate fruit. It is composed of many small fruits. Blackberries are often growing wild in forest areas in temperate regions.',
  'Europe and North America',
  'Temperate regions worldwide',
  80
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Blackberry', 'english'),
  ('Braam', 'dutch'),
  ('Mora', 'spanish'),
  ('Mûre', 'french'),
  ('Brombeere', 'german'),
  ('Mora', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Rubus fruticosus'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Rubus fruticosus'
AND cat.slug IN ('fruits', 'food-crops', 'temperate-crops', 'wild-harvested-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- =====================================================
-- 14. INSERT HERBS AND SPICES
-- =====================================================

-- TURMERIC
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Curcuma longa',
  (SELECT id FROM crop_genera WHERE name = 'Curcuma'),
  'longa',
  'Turmeric',
  'Turmeric is usually used as a root powder. Turmeric powder is used as a spice in a lot of South Asian recipes. India is the world''s biggest producer and consumer. Multiple varieties exist with different curcumin content.',
  'South Asia',
  'Tropical and subtropical Asia',
  95
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Turmeric', 'english'),
  ('Kurkuma', 'dutch'),
  ('Cúrcuma', 'spanish'),
  ('Curcuma', 'french'),
  ('Kurkuma', 'german'),
  ('Curcuma', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Curcuma longa'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Curcuma longa'
AND cat.slug IN ('spices', 'herbs', 'medicinal-plants', 'food-crops', 'tropical-crops', 'subtropical-crops', 'dye-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- GINGER
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Zingiber officinale',
  (SELECT id FROM crop_genera WHERE name = 'Zingiber'),
  'officinale',
  'Ginger',
  'The tuber of ginger is used as a spice or sometimes for its medicinal properties. It has a pungent, spicy flavor used extensively in Asian cuisine.',
  'Southeast Asia',
  'Tropical regions worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Ginger', 'english'),
  ('Gember', 'dutch'),
  ('Jengibre', 'spanish'),
  ('Gingembre', 'french'),
  ('Ingwer', 'german'),
  ('Zenzero', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Zingiber officinale'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Zingiber officinale'
AND cat.slug IN ('spices', 'herbs', 'medicinal-plants', 'food-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BLACK PEPPER
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Piper nigrum',
  (SELECT id FROM crop_genera WHERE name = 'Piper'),
  'nigrum',
  'Black Pepper',
  'Black pepper is the most important and most widely used spice in the world. It should not be confused with chili peppers, which belong to the genus Capsicum.',
  'India (Western Ghats)',
  'Tropical regions worldwide',
  100
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Black Pepper', 'english'),
  ('Pepper', 'english'),
  ('Zwarte peper', 'dutch'),
  ('Pimienta negra', 'spanish'),
  ('Poivre noir', 'french'),
  ('Schwarzer Pfeffer', 'german'),
  ('Pepe nero', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Piper nigrum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Piper nigrum'
AND cat.slug IN ('spices', 'food-crops', 'major-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CARDAMOM
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Elettaria cardamomum',
  (SELECT id FROM crop_genera WHERE name = 'Elettaria'),
  'cardamomum',
  'Cardamom',
  'True cardamom or Green cardamom is a plant in the ginger family. The green seed pods are dried and the seeds are used as a spice. Cardamom is commonly used in Indian and Asian food.',
  'India and Southeast Asia',
  'Tropical Asia',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cardamom', 'english'),
  ('Green Cardamom', 'english'),
  ('Kardemom', 'dutch'),
  ('Cardamomo', 'spanish'),
  ('Cardamome', 'french'),
  ('Kardamom', 'german'),
  ('Cardamomo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Elettaria cardamomum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Elettaria cardamomum'
AND cat.slug IN ('spices', 'herbs', 'food-crops', 'tropical-crops', 'medicinal-plants')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CORIANDER
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Coriandrum sativum',
  (SELECT id FROM crop_genera WHERE name = 'Coriandrum'),
  'sativum',
  'Coriander',
  'Coriander leaves are used fresh as a herb in many Asian dishes. The dry fruits (coriander seeds) are a spice often used in Indian dishes. Coriander roots are sometimes used in Thai food.',
  'Mediterranean and Southwest Asia',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Coriander', 'english'),
  ('Cilantro', 'english'),
  ('Koriander', 'dutch'),
  ('Cilantro', 'spanish'),
  ('Coriandre', 'french'),
  ('Koriander', 'german'),
  ('Coriandolo', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Coriandrum sativum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Coriandrum sativum'
AND cat.slug IN ('herbs', 'spices', 'food-crops', 'temperate-crops', 'subtropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- CUMIN
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Cuminum cyminum',
  (SELECT id FROM crop_genera WHERE name = 'Cuminum'),
  'cyminum',
  'Cumin',
  'Cumin is a plant in the Apiaceae family. Cumin seeds are used as a spice either whole or ground to a powder. It is used in the cuisines of various cultures.',
  'Mediterranean region',
  'India, Middle East, Asia',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Cumin', 'english'),
  ('Komijn', 'dutch'),
  ('Comino', 'spanish'),
  ('Cumin', 'french'),
  ('Kreuzkümmel', 'german'),
  ('Cumino', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Cuminum cyminum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Cuminum cyminum'
AND cat.slug IN ('spices', 'food-crops', 'mediterranean-crops', 'arid-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- BASIL
INSERT INTO crops (scientific_name, genus_id, species, common_name, description, origin, distribution, priority_rank)
VALUES (
  'Ocimum basilicum',
  (SELECT id FROM crop_genera WHERE name = 'Ocimum'),
  'basilicum',
  'Basil',
  'Basil is a culinary herb used extensively in Italian food. It is also common in certain dishes of Northeast and Southeast Asia. There are different varieties with slightly different tastes.',
  'Central Africa to Southeast Asia',
  'Worldwide',
  90
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Basil', 'english'),
  ('Sweet Basil', 'english'),
  ('Basilicum', 'dutch'),
  ('Albahaca', 'spanish'),
  ('Basilic', 'french'),
  ('Basilikum', 'german'),
  ('Basilico', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Ocimum basilicum'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Ocimum basilicum'
AND cat.slug IN ('herbs', 'food-crops', 'subtropical-crops', 'tropical-crops')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- MINT
INSERT INTO crops (scientific_name, genus_id, species, common_name, is_crop_group, description, origin, distribution, priority_rank)
VALUES (
  'Mentha spp.',
  (SELECT id FROM crop_genera WHERE name = 'Mentha'),
  'spp.',
  'Mint',
  TRUE,
  'Mint is a genus of aromatic herbs used for flavoring. Includes peppermint, spearmint, and many other varieties.',
  'Europe, Asia, Africa',
  'Worldwide',
  85
) ON CONFLICT (scientific_name) DO NOTHING;

INSERT INTO crop_names (crop_id, name, language)
SELECT c.id, t.name, t.lang
FROM crops c, (VALUES
  ('Mint', 'english'),
  ('Munt', 'dutch'),
  ('Menta', 'spanish'),
  ('Menthe', 'french'),
  ('Minze', 'german'),
  ('Menta', 'italian')
) AS t(name, lang)
WHERE c.scientific_name = 'Mentha spp.'
ON CONFLICT (crop_id, name, language) DO NOTHING;

INSERT INTO crop_category_assignments (crop_id, category_id)
SELECT c.id, cat.id FROM crops c, crop_categories cat
WHERE c.scientific_name = 'Mentha spp.'
AND cat.slug IN ('herbs', 'food-crops', 'medicinal-plants', 'temperate-crops', 'essential-oils')
ON CONFLICT (crop_id, category_id) DO NOTHING;

-- Continue in Part 5...

COMMIT;
