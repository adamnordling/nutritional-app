// foods.js
import { createFood } from './schema.js';

export const RAW_FOODS = {
    chicken: createFood({
        id: 'chicken',
        displayName: 'Chicken Breast (Cooked)',
        aliases: ['chicken', 'chicken breast', 'poultry'],
        general: { Calories: 165, Water: 65 },
        lipids: {
            "Total Fat": 3.6,
            "Saturated Fat": 1.01,
            "Omega-3 Total": 0.03,
            "Cholesterol": 85
        },
        minerals: { Calcium: 15, Iron: 1.0, Magnesium: 23, Zinc: 1.0 },
        cellular_bioactives: { "Coenzyme Q10": 1.5, Spermidine: 0.02 },
        absorptionOverrides: {
            Iron: 0.25 // Heme iron has higher bioavailability than default plant iron
        }
    }),

    potato: createFood({
        id: 'potato',
        displayName: 'Russet Potato (Boiled)',
        aliases: ['potato', 'potatoes', 'russet potato'],
        general: { Calories: 77, Water: 79 },
        lipids: { "Total Fat": 0.1 },
        minerals: { Calcium: 12, Iron: 0.8, Magnesium: 23, Zinc: 0.3 },
        cellular_bioactives: { Spermidine: 0.11 },
        absorptionOverrides: {
            Iron: 0.05 // Non-heme iron bound by plant matrix has lower uptake
        }
    })
};