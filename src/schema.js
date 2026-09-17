// schema.js
export const DEFAULT_ABSORPTION = {
    water_soluble_vitamins: 0.80,
    fat_soluble_vitamins: 0.65,
    minerals: 0.35,
    macronutrients: 0.95
};

// Master definition: Defines categories and every known compound
export const MASTER_SCHEMA = {
    general: {
        Calories: { unit: 'kcal', defaultAbsorb: 0.95 },
        Water: { unit: 'g', defaultAbsorb: 0.99 },
        Alcohol: { unit: 'g', defaultAbsorb: 1.0 },
        Caffeine: { unit: 'mg', defaultAbsorb: 0.99 }
    },
    lipids: {
        "Total Fat": { unit: 'g', defaultAbsorb: 0.95 },
        "Saturated Fat": { unit: 'g', defaultAbsorb: 0.95 },
        "Omega-3 Total": { unit: 'g', defaultAbsorb: 0.95 },
        "EPA": { unit: 'g', defaultAbsorb: 0.95 },
        "DHA": { unit: 'g', defaultAbsorb: 0.95 },
        "Cholesterol": { unit: 'mg', defaultAbsorb: 0.50 }
    },
    minerals: {
        Calcium: { unit: 'mg', defaultAbsorb: 0.30 },
        Iron: { unit: 'mg', defaultAbsorb: 0.15 },
        Magnesium: { unit: 'mg', defaultAbsorb: 0.35 },
        Zinc: { unit: 'mg', defaultAbsorb: 0.30 }
    },
    cellular_bioactives: {
        "Coenzyme Q10": { unit: 'mg', defaultAbsorb: 0.20 },
        "Spermidine": { unit: 'mg', defaultAbsorb: 0.50 }
    }
};

/**
 * Hydrates a sparse food object into a full zero-filled structure.
 * This guarantees UI & calculation functions never run into `undefined`.
 */
export function createFood(sparseFood) {
    const fullProfile = {
        id: sparseFood.id,
        displayName: sparseFood.displayName,
        aliases: sparseFood.aliases || [],
        absorption: {}
    };

    for (const [category, nutrients] of Object.entries(MASTER_SCHEMA)) {
        fullProfile[category] = {};
        for (const [nutrient, meta] of Object.entries(nutrients)) {
            // Fill nutrient value (or default to 0)
            fullProfile[category][nutrient] = sparseFood[category]?.[nutrient] ?? 0;

            // Fill absorption rate (use food-specific override if present, else default)
            fullProfile.absorption[nutrient] =
                sparseFood.absorptionOverrides?.[nutrient] ?? meta.defaultAbsorb;
        }
    }

    return fullProfile;
}