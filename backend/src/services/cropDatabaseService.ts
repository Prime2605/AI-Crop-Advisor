import { supabase } from '../config/supabase';
import {
    Crop,
    CropDetail,
    CropSearchParams,
    CropSearchResult,
    CropCharacteristics,
    CropUse,
    CropName,
    CropCategory,
    CropDatabaseStats,
    CropTrainingData,
} from '../types/crops';

export class CropDatabaseService {
    /**
     * Get all crops with pagination
     */
    static async getAllCrops(limit = 50, offset = 0): Promise<{ crops: Crop[]; total: number }> {
        const { data: crops, error, count } = await supabase
            .from('crops')
            .select('*', { count: 'exact' })
            .order('priority_rank', { ascending: false })
            .order('common_name')
            .range(offset, offset + limit - 1);

        if (error) throw new Error(`Failed to fetch crops: ${error.message}`);

        return {
            crops: crops || [],
            total: count || 0,
        };
    }

    /**
     * Get a single crop by ID with all related data
     */
    static async getCropById(cropId: string): Promise<CropDetail | null> {
        // Fetch main crop data
        const { data: crop, error: cropError } = await supabase
            .from('crops')
            .select('*')
            .eq('id', cropId)
            .single();

        if (cropError || !crop) return null;

        // Fetch related data in parallel
        const [namesResult, categoriesResult, characteristicsResult, usesResult, taxonomyResult] = await Promise.all([
            supabase.from('crop_names').select('*').eq('crop_id', cropId),
            supabase
                .from('crop_category_assignments')
                .select('category_id, crop_categories(*)')
                .eq('crop_id', cropId),
            supabase.from('crop_characteristics').select('*').eq('crop_id', cropId).single(),
            supabase.from('crop_uses').select('*').eq('crop_id', cropId),
            this.getCropTaxonomy(crop.genus_id),
        ]);

        const categories = categoriesResult.data?.map((item: any) => item.crop_categories).filter(Boolean) || [];

        return {
            ...crop,
            names: namesResult.data || [],
            categories,
            characteristics: characteristicsResult.data || null,
            uses: usesResult.data || [],
            taxonomy: taxonomyResult,
        };
    }

    /**
     * Get crop taxonomy (genus, family, order)
     */
    private static async getCropTaxonomy(genusId: string | null) {
        if (!genusId) {
            return { genus: null, family: null, order: null };
        }

        const { data: genus } = await supabase
            .from('crop_genera')
            .select('*')
            .eq('id', genusId)
            .single();

        if (!genus) {
            return { genus: null, family: null, order: null };
        }

        const { data: family } = await supabase
            .from('crop_families')
            .select('*')
            .eq('id', genus.family_id)
            .single();

        const { data: order } = family
            ? await supabase
                .from('crop_orders')
                .select('*')
                .eq('id', family.order_id)
                .single()
            : { data: null };

        return {
            genus: genus || null,
            family: family || null,
            order: order || null,
        };
    }

    /**
     * Search crops with comprehensive filters
     */
    static async searchCrops(params: CropSearchParams): Promise<CropSearchResult> {
        const {
            query,
            categories,
            climate_zones,
            water_requirement,
            use_type,
            language,
            limit = 50,
            offset = 0,
            sort_by = 'priority_rank',
            sort_order = 'desc',
        } = params;

        let queryBuilder = supabase
            .from('crops')
            .select('*, crop_characteristics(*), crop_category_assignments(crop_categories(*))', { count: 'exact' });

        // Text search
        if (query) {
            queryBuilder = queryBuilder.or(
                `common_name.ilike.%${query}%,scientific_name.ilike.%${query}%,description.ilike.%${query}%`
            );
        }

        // Apply sorting
        const ascending = sort_order === 'asc';
        queryBuilder = queryBuilder.order(sort_by, { ascending });

        // Pagination
        queryBuilder = queryBuilder.range(offset, offset + limit - 1);

        const { data: crops, error, count } = await queryBuilder;

        if (error) throw new Error(`Search failed: ${error.message}`);

        // Post-process filters (for complex filters not supported directly)
        let filteredCrops = crops || [];

        // Filter by categories
        if (categories && categories.length > 0) {
            filteredCrops = filteredCrops.filter((crop: any) => {
                const cropCategories = crop.crop_category_assignments?.map((a: any) => a.crop_categories?.slug) || [];
                return categories.some(cat => cropCategories.includes(cat));
            });
        }

        // Filter by climate zones
        if (climate_zones && climate_zones.length > 0) {
            filteredCrops = filteredCrops.filter((crop: any) => {
                const cropZones = crop.crop_characteristics?.climate_zones || [];
                return climate_zones.some(zone => cropZones.includes(zone));
            });
        }

        // Filter by water requirement
        if (water_requirement) {
            filteredCrops = filteredCrops.filter(
                (crop: any) => crop.crop_characteristics?.water_requirement === water_requirement
            );
        }

        // Fetch full details for filtered crops (if needed)
        const detailedCrops = await Promise.all(
            filteredCrops.slice(0, limit).map(async (crop: any) => {
                const names = await supabase.from('crop_names').select('*').eq('crop_id', crop.id);
                const uses = await supabase.from('crop_uses').select('*').eq('crop_id', crop.id);
                const taxonomy = await this.getCropTaxonomy(crop.genus_id);

                const categories = crop.crop_category_assignments?.map((a: any) => a.crop_categories).filter(Boolean) || [];

                return {
                    ...crop,
                    names: names.data || [],
                    uses: uses.data || [],
                    categories,
                    characteristics: crop.crop_characteristics || null,
                    taxonomy,
                };
            })
        );

        return {
            crops: detailedCrops,
            total: count || 0,
            limit,
            offset,
        };
    }

    /**
     * Get crops by category
     */
    static async getCropsByCategory(categorySlug: string, limit = 50, offset = 0): Promise<CropSearchResult> {
        // First get the category
        const { data: category } = await supabase
            .from('crop_categories')
            .select('id')
            .eq('slug', categorySlug)
            .single();

        if (!category) {
            return { crops: [], total: 0, limit, offset };
        }

        // Get crop assignments
        const { data: assignments, count } = await supabase
            .from('crop_category_assignments')
            .select('crop_id', { count: 'exact' })
            .eq('category_id', category.id)
            .range(offset, offset + limit - 1);

        if (!assignments || assignments.length === 0) {
            return { crops: [], total: count || 0, limit, offset };
        }

        // Get full crop details
        const cropIds = assignments.map(a => a.crop_id);
        const crops = await Promise.all(cropIds.map(id => this.getCropById(id)));

        return {
            crops: crops.filter((c): c is CropDetail => c !== null),
            total: count || 0,
            limit,
            offset,
        };
    }

    /**
     * Get all categories
     */
    static async getAllCategories(): Promise<CropCategory[]> {
        const { data, error } = await supabase
            .from('crop_categories')
            .select('*')
            .order('name');

        if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

        return data || [];
    }

    /**
     * Get database statistics
     */
    static async getDatabaseStats(): Promise<CropDatabaseStats | null> {
        const { data, error } = await supabase
            .from('crop_database_stats')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();

        if (error) return null;

        return data;
    }

    /**
     * Get crops optimized for AI training
     */
    static async getCropsForAITraining(limit?: number): Promise<CropTrainingData[]> {
        const { data: crops, error } = await supabase
            .from('crops')
            .select(`
        *,
        crop_characteristics(*),
        crop_uses(*),
        crop_category_assignments(crop_categories(*))
      `)
            .limit(limit || 1000);

        if (error) throw new Error(`Failed to fetch training data: ${error.message}`);

        return (crops || []).map((crop: any) => {
            const chars = crop.crop_characteristics;
            const categories = crop.crop_category_assignments?.map((a: any) => a.crop_categories?.slug).filter(Boolean) || [];
            const useTypes = crop.crop_uses?.map((u: any) => u.use_type).filter(Boolean) || [];

            return {
                crop_id: crop.id,
                crop_name: crop.common_name,
                scientific_name: crop.scientific_name,

                // Environmental features
                climate_zones: chars?.climate_zones || [],
                temperature_range: [chars?.min_temperature, chars?.max_temperature],
                optimal_temperature_range: [chars?.optimal_temperature_min, chars?.optimal_temperature_max],
                water_requirement: chars?.water_requirement,
                drought_tolerance: chars?.drought_tolerance,
                soil_types: chars?.soil_types || [],
                soil_ph_range: [chars?.soil_ph_min, chars?.soil_ph_max],

                // Growing features
                sunlight_requirement: chars?.sunlight_requirement,
                altitude_range: [chars?.altitude_min, chars?.altitude_max],
                growing_period_days: chars?.growing_period_days,
                planting_seasons: chars?.planting_season || [],

                // Sustainability features
                nitrogen_fixing: chars?.nitrogen_fixing || false,
                erosion_control: chars?.erosion_control || false,
                water_use_efficiency: chars?.water_use_efficiency,

                // Production features
                average_yield: chars?.average_yield_per_hectare,
                yield_variability: chars?.yield_variability,
                importance: crop.crop_uses?.[0]?.importance,

                // Categories
                categories,
                use_types: useTypes,
            };
        });
    }

    /**
     * Refresh database statistics (admin function)
     */
    static async refreshDatabaseStats(): Promise<void> {
        // Count crops
        const [cropsCount, groupsCount, ordersCount, familiesCount, generaCount, namesCount] = await Promise.all([
            supabase.from('crops').select('*', { count: 'exact', head: true }),
            supabase.from('crops').select('*', { count: 'exact', head: true }).eq('is_crop_group', true),
            supabase.from('crop_orders').select('*', { count: 'exact', head: true }),
            supabase.from('crop_families').select('*', { count: 'exact', head: true }),
            supabase.from('crop_genera').select('*', { count: 'exact', head: true }),
            supabase.from('crop_names').select('*', { count: 'exact', head: true }),
        ]);

        // Count names by language
        const { data: namesByLang } = await supabase
            .from('crop_names')
            .select('language');

        const namesByLanguage = (namesByLang || []).reduce((acc: Record<string, number>, item: any) => {
            acc[item.language] = (acc[item.language] || 0) + 1;
            return acc;
        }, {});

        // Count crops by category
        const { data: categoryCounts } = await supabase
            .from('crop_category_assignments')
            .select('category_id, crop_categories(slug)');

        const cropsByCategory = (categoryCounts || []).reduce((acc: Record<string, number>, item: any) => {
            const slug = item.crop_categories?.slug;
            if (slug) {
                acc[slug] = (acc[slug] || 0) + 1;
            }
            return acc;
        }, {});

        // Insert or update stats
        await supabase.from('crop_database_stats').insert({
            total_crops: cropsCount.count || 0,
            total_crop_groups: groupsCount.count || 0,
            total_orders: ordersCount.count || 0,
            total_families: familiesCount.count || 0,
            total_genera: generaCount.count || 0,
            total_names: namesCount.count || 0,
            names_by_language: namesByLanguage,
            crops_by_category: cropsByCategory,
        });
    }
}
