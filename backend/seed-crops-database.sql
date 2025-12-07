-- =====================================================
-- WORLD CROPS DATABASE - COMPLETE DATA SEED
-- =====================================================
-- This script populates the crops database with comprehensive data
-- from the World Crops Database including all crops, categories,
-- taxonomy, and characteristics.

BEGIN;

-- =====================================================
-- 1. INSERT CROP ORDERS (Taxonomy Level 1)
-- =====================================================

INSERT INTO crop_orders (name) VALUES
('Lamiales'), ('Rosales'), ('Fabales'), ('Asparagales'), ('Solanales'),
('Sapindales'), ('Cucurbitales'), ('Brassicales'), ('Asterales'), ('Caryophyllales'),
('Malvales'), ('Apiales'), ('Malpighiales'), ('Ericales'), ('Laurales'),
('Myrtales'), ('Poales'), ('Zingiberales'), ('Arecales'), ('Fagales'),
('Pinales'), ('Gentianales'), ('Saxifragales'), ('Boraginales'), ('Ranunculales'),
('Dioscoreales'), ('Magnoliales'), ('Celastrales'), ('Proteales'), ('Oxalidales'),
('Liliales'), ('Geraniales'), ('Vitales'), ('Cornales'), ('Santalales'),
('Dipsacales'), ('Polygonales'), ('Taxales'), ('Juglandales'), ('Crossosomatales'),
('Piperales'), ('Aquifoliales'), ('Caryophyllales'), ('Ericales'), ('Rosales'),
('Saxifragales'), ('Myrtales'), ('Laminales'), ('Bangiales'),
('Alismatales'), ('Laminariales')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 2. INSERT CROP FAMILIES (Taxonomy Level 2)
-- =====================================================

INSERT INTO crop_families (name, order_id) VALUES
-- Solanaceae family (nightshades)
('Solanaceae', (SELECT id FROM crop_orders WHERE name = 'Solanales')),
-- Fabaceae family (legumes)
('Fabaceae', (SELECT id FROM crop_orders WHERE name = 'Fabales')),
-- Poaceae family (grasses/cereals)
('Poaceae', (SELECT id FROM crop_orders WHERE name = 'Poales')),
-- Cucurbitaceae family (gourds)
('Cucurbitaceae', (SELECT id FROM crop_orders WHERE name = 'Cucurbitales')),
-- Brassicaceae family (crucifers)
('Brassicaceae', (SELECT id FROM crop_orders WHERE name = 'Brassicales')),
-- Rosaceae family (roses)
('Rosaceae', (SELECT id FROM crop_orders WHERE name = 'Rosales')),
-- Amaryllidaceae family (amaryllis)
('Amaryllidaceae', (SELECT id FROM crop_orders WHERE name = 'Asparagales')),
-- Apiaceae family (umbellifers)
('Apiaceae', (SELECT id FROM crop_orders WHERE name = 'Apiales')),
-- Asteraceae family (composites)
('Asteraceae', (SELECT id FROM crop_orders WHERE name = 'Asterales')),
-- Amaranthaceae family
('Amaranthaceae', (SELECT id FROM crop_orders WHERE name = 'Caryophyllales')),
-- Rutaceae family (citrus)
('Rutaceae', (SELECT id FROM crop_orders WHERE name = 'Sapindales')),
-- Moraceae family (mulberries)
('Moraceae', (SELECT id FROM crop_orders WHERE name = 'Rosales')),
-- Malvaceae family (mallows)
('Malvaceae', (SELECT id FROM crop_orders WHERE name = 'Malvales')),
-- Lamiaceae family (mints)
('Lamiaceae', (SELECT id FROM crop_orders WHERE name = 'Lamiales')),
-- Zingiberaceae family (gingers)
('Zingiberaceae', (SELECT id FROM crop_orders WHERE name = 'Zingiberales')),
-- Arecaceae family (palms)
('Arecaceae', (SELECT id FROM crop_orders WHERE name = 'Arecales')),
-- Musaceae family (bananas)
('Musaceae', (SELECT id FROM crop_orders WHERE name = 'Zingiberales')),
-- Caricaceae family (papayas)
('Caricaceae', (SELECT id FROM crop_orders WHERE name = 'Brassicales')),
-- Bromeliaceae family (pineapples)
('Bromeliaceae', (SELECT id FROM crop_orders WHERE name = 'Poales')),
-- Lauraceae family (laurels)
('Lauraceae', (SELECT id FROM crop_orders WHERE name = 'Laurales')),
-- Myrtaceae family (myrtles)
('Myrtaceae', (SELECT id FROM crop_orders WHERE name = 'Myrtales')),
-- Euphorbiaceae family (spurges)
('Euphorbiaceae', (SELECT id FROM crop_orders WHERE name = 'Malpighiales')),
-- Convolvulaceae family (morning glories)
('Convolvulaceae', (SELECT id FROM crop_orders WHERE name = 'Solanales')),
-- Araceae family (arums)
('Araceae', (SELECT id FROM crop_orders WHERE name = 'Alismatales')),
-- Dioscoreaceae family (yams)
('Dioscoreaceae', (SELECT id FROM crop_orders WHERE name = 'Dioscoreales')),
-- Vitaceae family (grapes)
('Vitaceae', (SELECT id FROM crop_orders WHERE name = 'Vitales')),
-- Ebenaceae family (ebonies)
('Ebenaceae', (SELECT id FROM crop_orders WHERE name = 'Ericales')),
-- Sapotaceae family (sapotes)
('Sapotaceae', (SELECT id FROM crop_orders WHERE name = 'Ericales')),
-- Annonaceae family (custard apples)
('Annonaceae', (SELECT id FROM crop_orders WHERE name = 'Magnoliales')),
-- Lythraceae family
('Lythraceae', (SELECT id FROM crop_orders WHERE name = 'Myrtales')),
-- Passifloraceae family (passion fruits)
('Passifloraceae', (SELECT id FROM crop_orders WHERE name = 'Malpighiales')),
-- Pinaceae family (pines)
('Pinaceae', (SELECT id FROM crop_orders WHERE name = 'Pinales')),
-- Fagaceae family (beeches)
('Fagaceae', (SELECT id FROM crop_orders WHERE name = 'Fagales')),
-- Juglandaceae family (walnuts)
('Juglandaceae', (SELECT id FROM crop_orders WHERE name = 'Fagales')),
-- Betulaceae family (birches)
('Betulaceae', (SELECT id FROM crop_orders WHERE name = 'Fagales')),
-- Anacardiaceae family (cashews)
('Anacardiaceae', (SELECT id FROM crop_orders WHERE name = 'Sapindales')),
-- Sapindaceae family
('Sapindaceae', (SELECT id FROM crop_orders WHERE name = 'Sapindales')),
-- Actinidiaceae family (kiwis)
('Actinidiaceae', (SELECT id FROM crop_orders WHERE name = 'Ericales')),
-- Grossulariaceae family (currants)
('Grossulariaceae', (SELECT id FROM crop_orders WHERE name = 'Saxifragales')),
-- Pedaliaceae family
('Pedaliaceae', (SELECT id FROM crop_orders WHERE name = 'Lamiales')),
-- Chenopodiaceae family (now part of Amaranthaceae)
('Chenopodiaceae', (SELECT id FROM crop_orders WHERE name = 'Caryophyllales')),
-- Polygonaceae family (buckwheats)
('Polygonaceae', (SELECT id FROM crop_orders WHERE name = 'Caryophyllales')),
-- Portulacaceae family (purslanes)
('Portulacaceae', (SELECT id FROM crop_orders WHERE name = 'Caryophyllales')),
-- Cactaceae family (cacti)
('Cactaceae', (SELECT id FROM crop_orders WHERE name = 'Caryophyllales')),
-- Moringaceae family
('Moringaceae', (SELECT id FROM crop_orders WHERE name = 'Brassicales')),
-- Punicaceae family (pomegranates)
('Lythraceae', (SELECT id FROM crop_orders WHERE name = 'Myrtales')),
-- Boraginaceae family
('Boraginaceae', (SELECT id FROM crop_orders WHERE name = 'Boraginales')),
-- Oxalidaceae family
('Oxalidaceae', (SELECT id FROM crop_orders WHERE name = 'Oxalidales')),
-- Piperaceae family (peppers)
('Piperaceae', (SELECT id FROM crop_orders WHERE name = 'Piperales')),
-- Agavaceae family
('Asparagaceae', (SELECT id FROM crop_orders WHERE name = 'Asparagales')),
-- Primulaceae family
('Primulaceae', (SELECT id FROM crop_orders WHERE name = 'Ericales')),
-- Ericaceae family (heaths)
('Ericaceae', (SELECT id FROM crop_orders WHERE name = 'Ericales')),
-- Rhamnaceae family (buckthorns)
('Rhamnaceae', (SELECT id FROM crop_orders WHERE name = 'Rosales')),
-- Meliaceae family (mahoganies)
('Meliaceae', (SELECT id FROM crop_orders WHERE name = 'Sapindales')),
-- Cannabaceae family
('Cannabaceae', (SELECT id FROM crop_orders WHERE name = 'Rosales')),
-- Linaceae family (flax)
('Linaceae', (SELECT id FROM crop_orders WHERE name = 'Malpighiales')),
-- Pedaliaceae family (sesame)
('Pedaliaceae', (SELECT id FROM crop_orders WHERE name = 'Lamiales')),
-- Thymelaeaceae family
('Thymelaeaceae', (SELECT id FROM crop_orders WHERE name = 'Malvales')),
-- Clusiaceae (Guttiferae) family
('Clusiaceae', (SELECT id FROM crop_orders WHERE name = 'Malpighiales')),
-- Gentianaceae family
('Gentianaceae', (SELECT id FROM crop_orders WHERE name = 'Gentianales')),
-- Oleaceae family (olives)
('Oleaceae', (SELECT id FROM crop_orders WHERE name = 'Lamiales')),
-- Laminariaceae family (kelps)
('Laminariaceae', (SELECT id FROM crop_orders WHERE name = 'Laminariales')),
-- Bangiaceae family (red algae)
('Bangiaceae', (SELECT id FROM crop_orders WHERE name = 'Bangiales'))
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 3. INSERT CROP GENERA (Taxonomy Level 3)
-- =====================================================

INSERT INTO crop_genera (name, family_id) VALUES
-- Solanaceae genera
('Solanum', (SELECT id FROM crop_families WHERE name = 'Solanaceae')),
('Capsicum', (SELECT id FROM crop_families WHERE name = 'Solanaceae')),
('Lycopersicon', (SELECT id FROM crop_families WHERE name = 'Solanaceae')),
-- Fabaceae genera
('Phaseolus', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Pisum', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Vigna', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Vicia', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Cicer', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Cajanus', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Lens', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Glycine', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Arachis', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Cyamopsis', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Macrotyloma', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Lablab', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Canavalia', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
('Psophocarpus', (SELECT id FROM crop_families WHERE name = 'Fabaceae')),
-- Poaceae genera
('Oryza', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Triticum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Zea', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Hordeum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Avena', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Sorghum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Pennisetum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Setaria', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Panicum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Eleusine', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Secale', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Saccharum', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Bambusa', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
('Phyllostachys', (SELECT id FROM crop_families WHERE name = 'Poaceae')),
-- Cucurbitaceae genera
('Cucumis', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Cucurbita', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Citrullus', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Momordica', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Lagenaria', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Luffa', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Benincasa', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Trichosanthes', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Coccinia', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
('Sechium', (SELECT id FROM crop_families WHERE name = 'Cucurbitaceae')),
-- Brassicaceae genera
('Brassica', (SELECT id FROM crop_families WHERE name = 'Brassicaceae')),
('Raphanus', (SELECT id FROM crop_families WHERE name = 'Brassicaceae')),
('Nasturtium', (SELECT id FROM crop_families WHERE name = 'Brassicaceae')),
('Lepidium', (SELECT id FROM crop_families WHERE name = 'Brassicaceae')),
('Eruca', (SELECT id FROM crop_families WHERE name = 'Brassicaceae')),
-- Rosaceae genera
('Malus', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Pyrus', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Prunus', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Fragaria', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Rubus', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Rosa', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Cydonia', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Mespilus', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
('Eriobotrya', (SELECT id FROM crop_families WHERE name = 'Rosaceae')),
-- Amaryllidaceae genera
('Allium', (SELECT id FROM crop_families WHERE name = 'Amaryllidaceae')),
-- Apiaceae genera
('Daucus', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Apium', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Pastinaca', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Coriandrum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Foeniculum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Cuminum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Petroselinum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Carum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
('Anethum', (SELECT id FROM crop_families WHERE name = 'Apiaceae')),
-- Asteraceae genera
('Lactuca', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
('Cichorium', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
('Helianthus', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
('Cynara', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
('Taraxacum', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
('Chrysanthemum', (SELECT id FROM crop_families WHERE name = 'Asteraceae')),
-- Amaranthaceae genera
('Spinacia', (SELECT id FROM crop_families WHERE name = 'Amaranthaceae')),
('Beta', (SELECT id FROM crop_families WHERE name = 'Amaranthaceae')),
('Amaranthus', (SELECT id FROM crop_families WHERE name = 'Amaranthaceae')),
('Chenopodium', (SELECT id FROM crop_families WHERE name = 'Amaranthaceae')),
-- Rutaceae genera (Citrus)
('Citrus', (SELECT id FROM crop_families WHERE name = 'Rutaceae')),
-- Musaceae genera
('Musa', (SELECT id FROM crop_families WHERE name = 'Musaceae')),
-- Caricaceae genera
('Carica', (SELECT id FROM crop_families WHERE name = 'Caricaceae')),
-- Bromeliaceae genera
('Ananas', (SELECT id FROM crop_families WHERE name = 'Bromeliaceae')),
-- Arecaceae genera
('Cocos', (SELECT id FROM crop_families WHERE name = 'Arecaceae')),
('Phoenix', (SELECT id FROM crop_families WHERE name = 'Arecaceae')),
('Elaeis', (SELECT id FROM crop_families WHERE name = 'Arecaceae')),
('Borassus', (SELECT id FROM crop_families WHERE name = 'Arecaceae')),
-- Zingiberaceae genera
('Curcuma', (SELECT id FROM crop_families WHERE name = 'Zingiberaceae')),
('Zingiber', (SELECT id FROM crop_families WHERE name = 'Zingiberaceae')),
('Elettaria', (SELECT id FROM crop_families WHERE name = 'Zingiberaceae')),
-- Araceae genera
('Colocasia', (SELECT id FROM crop_families WHERE name = 'Araceae')),
('Xanthosoma', (SELECT id FROM crop_families WHERE name = 'Araceae')),
('Amorphophallus', (SELECT id FROM crop_families WHERE name = 'Araceae')),
-- Dioscoreaceae genera
('Dioscorea', (SELECT id FROM crop_families WHERE name = 'Dioscoreaceae')),
-- Convolvulaceae genera
('Ipomoea', (SELECT id FROM crop_families WHERE name = 'Convolvulaceae')),
-- Euphorbiaceae genera
('Manihot', (SELECT id FROM crop_families WHERE name = 'Euphorbiaceae')),
('Ricinus', (SELECT id FROM crop_families WHERE name = 'Euphorbiaceae')),
-- Vitaceae genera
('Vitis', (SELECT id FROM crop_families WHERE name = 'Vitaceae')),
-- Moraceae genera
('Ficus', (SELECT id FROM crop_families WHERE name = 'Moraceae')),
('Morus', (SELECT id FROM crop_families WHERE name = 'Moraceae')),
('Artocarpus', (SELECT id FROM crop_families WHERE name = 'Moraceae')),
-- Sapotaceae genera
('Manilkara', (SELECT id FROM crop_families WHERE name = 'Sapotaceae')),
('Pouteria', (SELECT id FROM crop_families WHERE name = 'Sapotaceae')),
('Chrysophyllum', (SELECT id FROM crop_families WHERE name = 'Sapotaceae')),
-- Annonaceae genera
('Annona', (SELECT id FROM crop_families WHERE name = 'Annonaceae')),
-- Myrtaceae genera
('Psidium', (SELECT id FROM crop_families WHERE name = 'Myrtaceae')),
('Syzygium', (SELECT id FROM crop_families WHERE name = 'Myrtaceae')),
('Eugenia', (SELECT id FROM crop_families WHERE name = 'Myrtaceae')),
-- Sapindaceae genera
('Litchi', (SELECT id FROM crop_families WHERE name = 'Sapindaceae')),
('Nephelium', (SELECT id FROM crop_families WHERE name = 'Sapindaceae')),
('Dimocarpus', (SELECT id FROM crop_families WHERE name = 'Sapindaceae')),
('Blighia', (SELECT id FROM crop_families WHERE name = 'Sapindaceae')),
-- Anacardiaceae genera
('Mangifera', (SELECT id FROM crop_families WHERE name = 'Anacardiaceae')),
('Anacardium', (SELECT id FROM crop_families WHERE name = 'Anacardiaceae')),
('Pistacia', (SELECT id FROM crop_families WHERE name = 'Anacardiaceae')),
-- Passifloraceae genera
('Passiflora', (SELECT id FROM crop_families WHERE name = 'Passifloraceae')),
-- Actinidiaceae genera
('Actinidia', (SELECT id FROM crop_families WHERE name = 'Actinidiaceae')),
-- Lauraceae genera
('Persea', (SELECT id FROM crop_families WHERE name = 'Lauraceae')),
('Cinnamomum', (SELECT id FROM crop_families WHERE name = 'Lauraceae')),
('Laurus', (SELECT id FROM crop_families WHERE name = 'Lauraceae')),
-- Lythraceae genera
('Punica', (SELECT id FROM crop_families WHERE name = 'Lythraceae')),
-- Ebenaceae genera
('Diospyros', (SELECT id FROM crop_families WHERE name = 'Ebenaceae')),
-- Ericaceae genera
('Vaccinium', (SELECT id FROM crop_families WHERE name = 'Ericaceae')),
-- Grossulariaceae genera
('Ribes', (SELECT id FROM crop_families WHERE name = 'Grossulariaceae')),
-- Pinaceae genera
('Pinus', (SELECT id FROM crop_families WHERE name = 'Pinaceae')),
-- Fagaceae genera
('Castanea', (SELECT id FROM crop_families WHERE name = 'Fagaceae')),
('Quercus', (SELECT id FROM crop_families WHERE name = 'Fagaceae')),
-- Juglandaceae genera
('Juglans', (SELECT id FROM crop_families WHERE name = 'Juglandaceae')),
-- Betulaceae genera
('Corylus', (SELECT id FROM crop_families WHERE name = 'Betulaceae')),
-- Piperaceae genera
('Piper', (SELECT id FROM crop_families WHERE name = 'Piperaceae')),
-- Cactaceae genera
('Hylocereus', (SELECT id FROM crop_families WHERE name = 'Cactaceae')),
('Opuntia', (SELECT id FROM crop_families WHERE name = 'Cactaceae')),
-- Polygonaceae genera
('Fagopyrum', (SELECT id FROM crop_families WHERE name = 'Polygonaceae')),
('Rheum', (SELECT id FROM crop_families WHERE name = 'Polygonaceae')),
('Rumex', (SELECT id FROM crop_families WHERE name = 'Polygonaceae')),
-- Oxalidaceae genera
('Averrhoa', (SELECT id FROM crop_families WHERE name = 'Oxalidaceae')),
-- Moringaceae genera
('Moringa', (SELECT id FROM crop_families WHERE name = 'Moringaceae')),
-- Portulacaceae genera
('Portulaca', (SELECT id FROM crop_families WHERE name = 'Portulacaceae')),
-- Lamiaceae genera
('Mentha', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Ocimum', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Origanum', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Thymus', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Rosmarinus', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Salvia', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
('Lavandula', (SELECT id FROM crop_families WHERE name = 'Lamiaceae')),
-- Pedaliaceae genera
('Sesamum', (SELECT id FROM crop_families WHERE name = 'Pedaliaceae')),
-- Linaceae genera
('Linum', (SELECT id FROM crop_families WHERE name = 'Linaceae')),
-- Malvaceae genera
('Abelmoschus', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
('Gossypium', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
('Hibiscus', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
('Theobroma', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
('Cola', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
('Durio', (SELECT id FROM crop_families WHERE name = 'Malvaceae')),
-- Clusiaceae genera
('Garcinia', (SELECT id FROM crop_families WHERE name = 'Clusiaceae')),
-- Cannabaceae genera
('Cannabis', (SELECT id FROM crop_families WHERE name = 'Cannabaceae')),
('Humulus', (SELECT id FROM crop_families WHERE name = 'Cannabaceae')),
-- Oleaceae genera
('Olea', (SELECT id FROM crop_families WHERE name = 'Oleaceae')),
-- Rhamnaceae genera
('Ziziphus', (SELECT id FROM crop_families WHERE name = 'Rhamnaceae')),
-- Laminariaceae genera  
('Saccharina', (SELECT id FROM crop_families WHERE name = 'Laminariaceae')),
-- Bangiaceae genera
('Pyropia', (SELECT id FROM crop_families WHERE name = 'Bangiaceae')),
('Porphyra', (SELECT id FROM crop_families WHERE name = 'Bangiaceae')),
-- Asparagaceae genera
('Asparagus', (SELECT id FROM crop_families WHERE name = 'Asparagaceae'))
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 4. INSERT CROP CATEGORIES
-- =====================================================

INSERT INTO crop_categories (name, slug, description) VALUES
-- Main use categories
('Food crops', 'food-crops', 'Crops grown primarily for human consumption'),
('Non-food crops', 'non-food-crops', 'Crops grown for purposes other than food'),

-- Main food categories
('Cereals', 'cereals', 'Grain crops used as staple foods'),
('Fruits', 'fruits', 'Edible fruits from trees, shrubs, and vines'),
('Vegetables', 'vegetables', 'Edible plants or plant parts used as vegetables'),
('Legumes', 'legumes', 'Pod-bearing plants with edible seeds'),
('Nuts', 'nuts', 'Tree crops with hard-shelled edible seeds'),

-- Vegetable subcategories
('Bulb vegetables', 'bulb-vegetables', 'Vegetables grown for their edible bulbs'),
('Corm vegetables', 'corm-vegetables', 'Vegetables with underground corm storage organs'),
('Flower vegetables', 'flower-vegetables', 'Vegetables eaten for their flowers or flower buds'),
('Fruit vegetables', 'fruit-vegetables', 'Botanical fruits used as vegetables'),
('Leaf vegetables', 'leaf-vegetables', 'Vegetables grown for their edible leaves'),
('Podded vegetables', 'podded-vegetables', 'Vegetables with edible pods'),
('Root vegetables', 'root-vegetables', 'Vegetables with edible roots'),
('Stem vegetables', 'stem-vegetables', 'Vegetables eaten for their stems'),
('Tuber vegetables', 'tuber-vegetables', 'Vegetables with edible underground tubers'),

-- Fruit subcategories
('Tropical crops', 'tropical-crops', 'Crops adapted for tropical climates'),
('Subtropical crops', 'subtropical-crops', 'Crops adapted for subtropical climates'),
('Temperate crops', 'temperate-crops', 'Crops adapted for temperate climates'),
('Mediterranean crops', 'mediterranean-crops', 'Crops adapted for Mediterranean climates'),
('Arid crops', 'arid-crops', 'Crops tolerant to dry, arid conditions'),
('High altitude crops', 'high-altitude-crops', 'Crops adapted to high elevation'),
('Cool temperate crops', 'cool-temperate-crops', 'Crops for cool temperate regions'),
('Marine crops', 'marine-crops', 'Crops grown in marine/aquatic environments'),

-- Food-related uses
('Alcoholic drinks', 'alcoholic-drinks', 'Crops used to produce alcoholic beverages'),
('Alcohol production', 'alcohol-production', 'Crops used in alcohol production'),
('Aphrodisiacs', 'aphrodisiacs', 'Crops with purported aphrodisiac properties'),
('Edible seeds', 'edible-seeds', 'Crops grown for their edible seeds'),
('Herbs', 'herbs', 'Aromatic plants used for flavoring'),
('Medicinal plants', 'medicinal-plants', 'Plants used for medicinal purposes'),
('Pseudocereals', 'pseudocereals', 'Non-grass crops used like cereals'),
('Spices', 'spices', 'Crops used as spices or seasonings'),
('Stimulants', 'stimulants', 'Crops containing stimulant compounds'),
('Sugar crops', 'sugar-crops', 'Crops grown for sugar production'),
('Vegetable oils', 'vegetable-oils', 'Crops grown for oil production'),
('Staple food', 'staple-food', 'Primary food crops that form the basis of diet'),

-- Non-food uses
('Botanical pesticides', 'botanical-pesticides', 'Plants used as natural pesticides'),
('Cover crops', 'cover-crops', 'Crops grown to cover and protect soil'),
('Cut flowers', 'cut-flowers', 'Plants grown for cut flower production'),
('Dye crops', 'dye-crops', 'Plants used to produce natural dyes'),
('Energy crops', 'energy-crops', 'Crops grown for biofuel or energy production'),
('Erosion prevention', 'erosion-prevention', 'Crops used to prevent soil erosion'),
('Essential oils', 'essential-oils', 'Plants grown for essential oil extraction'),
('Fiber crops', 'fiber-crops', 'Crops grown for fiber production'),
('Forage and fodder crops', 'forage-fodder-crops', 'Crops grown as animal feed'),
('Green manures', 'green-manures', 'Crops grown to be turned into soil as fertilizer'),
('Ground cover plants', 'ground-cover-plants', 'Plants used as ground cover'),
('Ornamental plants', 'ornamental-plants', 'Plants grown for decoration'),
('Soil improvement', 'soil-improvement', 'Crops that improve soil quality'),
('Timber', 'timber', 'Trees grown for wood production'),
('Industrial crops', 'industrial-crops', 'Crops grown for industrial uses'),

-- Cultivation status
('Major crops', 'major-crops', 'Economically important, widely cultivated crops'),
('Minor crops', 'minor-crops', 'Less widely cultivated crops'),
('Wild-harvested crops', 'wild-harvested-crops', 'Plants harvested from wild populations'),

-- Other groups
('Algae', 'algae', 'Aquatic photosynthetic organisms'),
('Mushrooms', 'mushrooms', 'Edible fungi')
ON CONFLICT (name) DO NOTHING;

-- TO BE CONTINUED IN PART 2...
-- This script will be continued with actual crop data insertion

COMMIT;
