// 1. Fully exhaustive Nutritional Database (per 100g)
export const FOOD_DATABASE = {
    chicken: {
        macros: { Calories: 165, Protein: 31, "Total Fat": 3.6, Carbohydrates: 0, Water: 65, Ash: 1.0 },
        carbs_breakdown: { Fiber: 0, Starch: 0, "Total Sugars": 0, Sucrose: 0, Glucose: 0, Fructose: 0, Lactose: 0, Galactose: 0, Maltose: 0 },
        lipids_breakdown: { "Saturated Fat": 1.01, "Monounsaturated Fat": 1.15, "Polyunsaturated Fat": 0.82, "Trans Fat": 0.02, Cholesterol: 85, "Omega-3 (ALA)": 0.01, "Omega-3 (EPA/DHA)": 0.02, "Omega-6 (LA)": 0.58, "Omega-6 (AA)": 0.12 },
        vitamins: { Retinol: 16, "Beta-Carotene": 0, "Alpha-Carotene": 0, "Vitamin B1 (Thiamine)": 0.07, "Vitamin B2 (Riboflavin)": 0.12, "Vitamin B3 (Niacin)": 8.5, "Vitamin B5 (Pantothenic Acid)": 0.9, "Vitamin B6": 0.4, "Vitamin B7 (Biotin)": 1.9, "Vitamin B9 (Folate DFE)": 4, "Vitamin B12": 0.3, "Vitamin C": 0, "Vitamin D": 0.1, "Vitamin D3 (Cholecalciferol)": 0.1, "Vitamin E": 0.20, "Vitamin K1": 0, "Vitamin K2 (MK-4)": 1.1, Choline: 85, Betaine: 10 },
        minerals: { Calcium: 15, Iron: 1.0, Magnesium: 23, Phosphorus: 228, Potassium: 256, Sodium: 74, Zinc: 1.0, Copper: 0.05, Manganese: 0.02, Selenium: 22.8, Iodine: 4, Chromium: 2, Molybdenum: 1.5, Fluoride: 25, Boron: 0.1, Silicon: 0.2 },
        essential_aminos: { Tryptophan: 0.34, Threonine: 1.29, Isoleucine: 1.48, Leucine: 2.37, Lysine: 2.62, Methionine: 0.81, Cystine: 0.38, Phenylalanine: 1.21, Tyrosine: 1.05, Valine: 1.51, Histidine: 0.93 },
        non_essential_aminos: { Alanine: 1.83, Arginine: 2.05, "Aspartic Acid": 2.84, "Glutamic Acid": 4.80, Glycine: 1.63, Proline: 1.22, Serine: 1.24, Glutamine: 1.50, Taurine: 0.15 },
        carnonutrients: { Creatine: 0.4, Carnosine: 0.35, Anserine: 0.60, Carnitine: 0.10, "Coenzyme Q10": 1.5 },
        antinutrients: { "Phytic Acid": 0, "Oxalic Acid": 0, Lectins: 0, Goitrogens: 0, Tannins: 0, Saponins: 0, "Trypsin Inhibitors": 0 }
    },
    potatoes: {
        macros: { Calories: 77, Protein: 2, "Total Fat": 0.1, Carbohydrates: 17, Water: 79, Ash: 1.1 },
        carbs_breakdown: { Fiber: 2.2, Starch: 15.0, "Total Sugars": 0.8, Sucrose: 0.3, Glucose: 0.2, Fructose: 0.3, Lactose: 0, Galactose: 0, Maltose: 0 },
        lipids_breakdown: { "Saturated Fat": 0.03, "Monounsaturated Fat": 0.01, "Polyunsaturated Fat": 0.04, "Trans Fat": 0, Cholesterol: 0, "Omega-3 (ALA)": 0.01, "Omega-3 (EPA/DHA)": 0, "Omega-6 (LA)": 0.03, "Omega-6 (AA)": 0 },
        vitamins: { Retinol: 0, "Beta-Carotene": 1, "Alpha-Carotene": 0, "Vitamin B1 (Thiamine)": 0.08, "Vitamin B2 (Riboflavin)": 0.03, "Vitamin B3 (Niacin)": 1.1, "Vitamin B5 (Pantothenic Acid)": 0.3, "Vitamin B6": 0.3, "Vitamin B7 (Biotin)": 0.1, "Vitamin B9 (Folate DFE)": 16, "Vitamin B12": 0, "Vitamin C": 19.7, "Vitamin D": 0, "Vitamin D3 (Cholecalciferol)": 0, "Vitamin E": 0.01, "Vitamin K1": 1.9, "Vitamin K2 (MK-4)": 0, Choline: 12.1, Betaine: 0.1 },
        minerals: { Calcium: 12, Iron: 0.8, Magnesium: 23, Phosphorus: 57, Potassium: 421, Sodium: 6, Zinc: 0.3, Copper: 0.11, Manganese: 0.15, Selenium: 0.3, Iodine: 1, Chromium: 1, Molybdenum: 0.8, Fluoride: 15, Boron: 0.5, Silicon: 2.1 },
        essential_aminos: { Tryptophan: 0.03, Threonine: 0.07, Isoleucine: 0.08, Leucine: 0.12, Lysine: 0.11, Methionine: 0.03, Cystine: 0.03, Phenylalanine: 0.09, Tyrosine: 0.06, Valine: 0.11, Histidine: 0.04 },
        non_essential_aminos: { Alanine: 0.07, Arginine: 0.11, "Aspartic Acid": 0.52, "Glutamic Acid": 0.34, Glycine: 0.06, Proline: 0.07, Serine: 0.09, Glutamine: 0.10, Taurine: 0 },
        carnonutrients: { Creatine: 0, Carnosine: 0, Anserine: 0, Carnitine: 0, "Coenzyme Q10": 0.05 },
        antinutrients: { "Phytic Acid": 18, "Oxalic Acid": 15, Lectins: 2, Goitrogens: 0, Tannins: 5, Saponins: 4, "Trypsin Inhibitors": 1 }
    }
};

// 2. Reference Targets (RDA or optimal daily health targets)
export const RDA_TARGETS = {
    macros: { Calories: 2000, Protein: 56, "Total Fat": 78, Carbohydrates: 275, Water: 2500, Ash: 10 },
    carbs_breakdown: { Fiber: 28, Starch: 150, "Total Sugars": 50, Sucrose: 10, Glucose: 10, Fructose: 10, Lactose: 10, Galactose: 5, Maltose: 5 },
    lipids_breakdown: { "Saturated Fat": 20, "Monounsaturated Fat": 30, "Polyunsaturated Fat": 17, "Trans Fat": 2, Cholesterol: 300, "Omega-3 (ALA)": 1.6, "Omega-3 (EPA/DHA)": 0.5, "Omega-6 (LA)": 17, "Omega-6 (AA)": 0.5 },
    vitamins: { Retinol: 900, "Beta-Carotene": 5000, "Alpha-Carotene": 1000, "Vitamin B1 (Thiamine)": 1.2, "Vitamin B2 (Riboflavin)": 1.3, "Vitamin B3 (Niacin)": 16, "Vitamin B5 (Pantothenic Acid)": 5, "Vitamin B6": 1.3, "Vitamin B7 (Biotin)": 30, "Vitamin B9 (Folate DFE)": 400, "Vitamin B12": 2.4, "Vitamin C": 90, "Vitamin D": 15, "Vitamin D3 (Cholecalciferol)": 15, "Vitamin E": 15, "Vitamin K1": 120, "Vitamin K2 (MK-4)": 100, Choline: 550, Betaine: 100 },
    minerals: { Calcium: 1000, Iron: 8, Magnesium: 400, Phosphorus: 700, Potassium: 3400, Sodium: 2300, Zinc: 11, Copper: 0.9, Manganese: 2.3, Selenium: 55, Iodine: 150, Chromium: 35, Molybdenum: 45, Fluoride: 4000, Boron: 3, Silicon: 30 },
    essential_aminos: { Tryptophan: 0.28, Threonine: 1.05, Isoleucine: 1.4, Leucine: 2.73, Lysine: 2.1, Methionine: 1.05, Cystine: 1.05, Phenylalanine: 1.75, Tyrosine: 1.75, Valine: 1.82, Histidine: 0.7 },
    non_essential_aminos: { Alanine: 3.5, Arginine: 4.5, "Aspartic Acid": 6.0, "Glutamic Acid": 10.0, Glycine: 4.0, Proline: 4.0, Serine: 4.0, Glutamine: 5.0, Taurine: 1.0 },
    carnonutrients: { Creatine: 3, Carnosine: 1.0, Anserine: 0.5, Carnitine: 0.5, "Coenzyme Q10": 0.1 },
    antinutrients: { "Phytic Acid": 100, "Oxalic Acid": 50, Lectins: 10, Goitrogens: 5, Tannins: 20, Saponins: 15, "Trypsin Inhibitors": 5 }
};

// 3. Corresponding Measurement Units
export const NUTRIENT_UNITS = {
    macros: { Calories: "kcal", Protein: "g", "Total Fat": "g", Carbohydrates: "g", Water: "g", Ash: "g" },
    carbs_breakdown: { Fiber: "g", Starch: "g", "Total Sugars": "g", Sucrose: "g", Glucose: "g", Fructose: "g", Lactose: "g", Galactose: "g", Maltose: "g" },
    lipids_breakdown: { "Saturated Fat": "g", "Monounsaturated Fat": "g", "Polyunsaturated Fat": "g", "Trans Fat": "g", Cholesterol: "mg", "Omega-3 (ALA)": "g", "Omega-3 (EPA/DHA)": "g", "Omega-6 (LA)": "g", "Omega-6 (AA)": "g" },
    vitamins: { Retinol: "mcg", "Beta-Carotene": "mcg", "Alpha-Carotene": "mcg", "Vitamin B1 (Thiamine)": "mg", "Vitamin B2 (Riboflavin)": "mg", "Vitamin B3 (Niacin)": "mg", "Vitamin B5 (Pantothenic Acid)": "mg", "Vitamin B6": "mg", "Vitamin B7 (Biotin)": "mcg", "Vitamin B9 (Folate DFE)": "mcg", "Vitamin B12": "mcg", "Vitamin C": "mg", "Vitamin D": "mcg", "Vitamin D3 (Cholecalciferol)": "mcg", "Vitamin E": "mg", "Vitamin K1": "mcg", "Vitamin K2 (MK-4)": "mcg", Choline: "mg", Betaine: "mg" },
    minerals: { Calcium: "mg", Iron: "mg", Magnesium: "mg", Phosphorus: "mg", Potassium: "mg", Sodium: "mg", Zinc: "mg", Copper: "mg", Manganese: "mg", Selenium: "mcg", Iodine: "mcg", Chromium: "mcg", Molybdenum: "mcg", Fluoride: "mcg", Boron: "mg", Silicon: "mg" },
    essential_aminos: { Tryptophan: "g", Threonine: "g", Isoleucine: "g", Leucine: "g", Lysine: "g", Methionine: "g", Cystine: "g", Phenylalanine: "g", Tyrosine: "g", Valine: "g", Histidine: "g" },
    non_essential_aminos: { Alanine: "g", Arginine: "g", "Aspartic Acid": "g", "Glutamic Acid": "g", Glycine: "g", Proline: "g", Serine: "g", Glutamine: "g", Taurine: "g" },
    carnonutrients: { Creatine: "g", Carnosine: "g", Anserine: "g", Carnitine: "g", "Coenzyme Q10": "mg" },
    antinutrients: { "Phytic Acid": "mg", "Oxalic Acid": "mg", Lectins: "unit", Goitrogens: "unit", Tannins: "mg", Saponins: "mg", "Trypsin Inhibitors": "unit" }
};