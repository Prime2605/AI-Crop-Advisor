// TypeScript types for World Crops Database

export interface CropOrder {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CropFamily {
    id: string;
    name: string;
    order_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface CropGenus {
    id: string;
    name: string;
    family_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface Crop {
    id: string;
    scientific_name: string;
    genus_id: string | null;
    species: string;
    common_name: string;
    is_crop_group: boolean;
    crop_group_info: string | null;
    description: string | null;
    summary: string | null;
    cultivation_status: 'cultivated' | 'wild' | 'semi-wild' | 'domesticated' | null;
    origin: string | null;
    distribution: string | null;
    image_url: string | null;
    priority_rank: number;
    created_at: string;
    updated_at: string;
}

export interface CropName {
    id: string;
    crop_id: string;
    name: string;
    language: 'scientific' | 'english' | 'dutch' | 'spanish' | 'french' | 'german' | 'italian' | 'other';
    is_synonym: boolean;
    created_at: string;
}

export interface CropCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parent_category_id: string | null;
    created_at: string;
}

export interface CropCategoryAssignment {
    id: string;
    crop_id: string;
    category_id: string;
    created_at: string;
}

export interface CropCharacteristics {
    id: string;
    crop_id: string;

    // Climate requirements
    climate_zones: string[] | null;
    min_temperature: number | null;
    max_temperature: number | null;
    optimal_temperature_min: number | null;
    optimal_temperature_max: number | null;

    // Water requirements
    water_requirement: 'low' | 'medium' | 'high' | 'very_high' | null;
    drought_tolerance: 'low' | 'medium' | 'high' | null;
    flood_tolerance: 'low' | 'medium' | 'high' | null;

    // Soil requirements
    soil_types: string[] | null;
    soil_ph_min: number | null;
    soil_ph_max: number | null;

    // Growing conditions
    sunlight_requirement: 'full_sun' | 'partial_shade' | 'shade' | null;
    altitude_min: number | null;
    altitude_max: number | null;

    // Growing period
    growing_period_days: number | null;
    planting_season: string[] | null;

    // Yield and productivity
    average_yield_per_hectare: number | null;
    yield_variability: 'low' | 'medium' | 'high' | null;

    // Sustainability
    nitrogen_fixing: boolean;
    erosion_control: boolean;
    water_use_efficiency: 'low' | 'medium' | 'high' | null;

    // Additional metadata
    characteristics_metadata: Record<string, any> | null;

    created_at: string;
    updated_at: string;
}

export type CropUseType =
    | 'food' | 'vegetable' | 'fruit' | 'cereal' | 'legume' | 'nut'
    | 'spice' | 'herb' | 'beverage' | 'oil' | 'fiber' | 'timber'
    | 'medicinal' | 'ornamental' | 'fodder' | 'cover_crop'
    | 'industrial' | 'biofuel' | 'dye' | 'other';

export interface CropUse {
    id: string;
    crop_id: string;
    use_type: CropUseType;
    edible_parts: string[] | null;
    processing_required: boolean;
    processing_methods: string[] | null;
    nutritional_value: Record<string, any> | null;
    importance: 'major' | 'minor' | 'subsistence' | null;
    global_production_tonnes: number | null;
    created_at: string;
}

export interface CropDatabaseStats {
    id: string;
    total_crops: number;
    total_crop_groups: number;
    total_orders: number;
    total_families: number;
    total_genera: number;
    total_names: number;
    names_by_language: Record<string, number>;
    crops_by_category: Record<string, number>;
    updated_at: string;
}

// Comprehensive crop with all related data
export interface CropDetail extends Crop {
    names: CropName[];
    categories: CropCategory[];
    characteristics: CropCharacteristics | null;
    uses: CropUse[];
    taxonomy: {
        genus: CropGenus | null;
        family: CropFamily | null;
        order: CropOrder | null;
    };
}

// Search and filter types
export interface CropSearchParams {
    query?: string;
    categories?: string[];
    climate_zones?: string[];
    water_requirement?: string;
    use_type?: CropUseType[];
    language?: string;
    limit?: number;
    offset?: number;
    sort_by?: 'name' | 'scientific_name' | 'priority_rank' | 'created_at';
    sort_order?: 'asc' | 'desc';
}

export interface CropSearchResult {
    crops: CropDetail[];
    total: number;
    limit: number;
    offset: number;
}

// AI Model training data format
export interface CropTrainingData {
    crop_id: string;
    crop_name: string;
    scientific_name: string;

    // Environmental features
    climate_zones: string[];
    temperature_range: [number | null, number | null];
    optimal_temperature_range: [number | null, number | null];
    water_requirement: string | null;
    drought_tolerance: string | null;
    soil_types: string[];
    soil_ph_range: [number | null, number | null];

    // Growing features
    sunlight_requirement: string | null;
    altitude_range: [number | null, number | null];
    growing_period_days: number | null;
    planting_seasons: string[];

    // Sustainability features
    nitrogen_fixing: boolean;
    erosion_control: boolean;
    water_use_efficiency: string | null;

    // Production features
    average_yield: number | null;
    yield_variability: string | null;
    importance: string | null;

    // Categories for classification
    categories: string[];
    use_types: string[];
}
