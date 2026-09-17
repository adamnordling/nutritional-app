import { RDA_TARGETS, UL_TARGETS, NUTRIENT_UNITS } from './schema.js';
import { FOOD_DATABASE } from './foods.js';

/* ==========================================================================
   1. APPLICATION STATE & CONFIGURATION
   ========================================================================== */

const state = {
    diet: [],
    hoveredIndex: null,
    selectedIndex: null,
    allCollapsed: false,
    collapsedCategories: {},
    expandedNutrient: null,
    mode: 'diet',
    compareSlots: [
        { id: 'slot1', parsed: null, color: '#0072b2', displayName: 'Item A' },
        { id: 'slot2', parsed: null, color: '#e69f00', displayName: 'Item B' }
    ]
};

const leftColumnLayout = [
    'general',
    'carbohydrates',
    'lipids',
    'proteins_and_aminos',
    'organic_acids',
    'antinutrients',
    'biogenic_amines'
];

const rightColumnLayout = [
    'vitamins',
    'minerals',
    'cellular_bioactives',
    'antioxidants',
    'myconutrients_and_adaptogens',
    'bioactive_enzymes',
    'nucleic_acids_and_purines'
];

const CATEGORY_ICONS = {
    general: '⚡',
    lipids: '💧',
    proteins_and_aminos: '🧬',
    vitamins: '💊',
    minerals: '⛏️',
    carbohydrates: '🌾',
    cellular_bioactives: '🔬',
    antioxidants: '🛡️',
    antinutrients: '⚠️',
    biogenic_amines: '🧪',
    myconutrients_and_adaptogens: '🍄',
    bioactive_enzymes: '✨',
    nucleic_acids_and_purines: '🧬',
    organic_acids: '🍋'
};

const UNIT_CONVERSIONS = {
    g: { toGrams: 1, label: 'g', presets: [50, 100, 150, 200, 250, 300, 400, 500] },
    kg: { toGrams: 1000, label: 'kg', presets: [0.1, 0.2, 0.25, 0.5, 0.75, 1.0] },
    mg: { toGrams: 0.001, label: 'mg', presets: [250, 500, 1000, 2000] },
    oz: { toGrams: 28.3495231, label: 'oz', presets: [2, 4, 6, 8, 10, 12, 16] },
    lbs: { toGrams: 453.59237, label: 'lbs', presets: [0.25, 0.5, 0.75, 1.0, 1.5, 2.0] }
};

/* ==========================================================================
   2. CENTRALIZED NUTRITION ANALYTICS
   ========================================================================== */

const NUTRIENT_ANALYTICS = {
    Calories: {
        description: `Food provides the energy needed for cells to sustain physiological homeostasis. Energy is stored in chemical bonds and released via digestion and cellular respiration.\n\nAverage energy density:\n• Fat: 9 kcal/g (37.7 kJ/g)\n• Carbohydrates: 4 kcal/g (16.7 kJ/g)\n• Protein: 4 kcal/g (16.7 kJ/g)\n• Alcohol: 7 kcal/g (29.3 kJ/g)`,
        sourcesTitleLeft: 'Highest Calories',
        sourcesLeft: [
            { food: 'Olive Oil', amount: '884 kcal' },
            { food: 'Almonds', amount: '579 kcal' },
            { food: 'Peanut Butter', amount: '588 kcal' },
            { food: 'Cheddar Cheese', amount: '403 kcal' },
            { food: 'Ribeye Steak', amount: '291 kcal' },
            { food: 'Wild Salmon', amount: '206 kcal' }
        ],
        sourcesTitleRight: 'Lowest Calories',
        sourcesRight: [
            { food: 'Zucchini', amount: '17 kcal' },
            { food: 'Asparagus', amount: '20 kcal' },
            { food: 'Spinach', amount: '23 kcal' },
            { food: 'Cabbage', amount: '25 kcal' },
            { food: 'Strawberries', amount: '32 kcal' },
            { food: 'Broccoli', amount: '34 kcal' }
        ]
    },
    'Vitamin B1 (Thiamine)': {
        description: `Thiamine is a water-soluble coenzyme essential for pyruvate dehydrogenase, the gateway enzyme linking glycolysis to the Krebs cycle. Critical for ATP production and central nervous system integrity.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Nutritional Yeast', amount: '15.00 mg' },
            { food: 'Sunflower Seeds', amount: '2.30 mg' },
            { food: 'Macadamia Nuts', amount: '1.20 mg' },
            { food: 'Pork Chops', amount: '0.90 mg' },
            { food: 'Lentils', amount: '0.35 mg' }
        ]
    },
    'Vitamin B2 (Riboflavin)': {
        description: `Precursor to FAD and FMN, vital coenzymes in the mitochondrial electron transport chain. Integral to glutathione reduction, lipid catabolism, and cellular protection against oxidative stress.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Nutritional Yeast', amount: '4.00 mg' },
            { food: 'Beef Liver', amount: '2.70 mg' },
            { food: 'Almonds', amount: '1.10 mg' },
            { food: 'Whole Eggs', amount: '0.45 mg' },
            { food: 'Wild Salmon', amount: '0.35 mg' }
        ]
    },
    'Vitamin B3 (Niacin)': {
        description: `Fundamental precursor to NAD+ and NADP+, the primary electron carriers for metabolic redox reactions, sirtuin longevity enzyme activation, and PARP-mediated DNA damage repair.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Nutritional Yeast', amount: '35.00 mg' },
            { food: 'Yellowfin Tuna', amount: '18.00 mg' },
            { food: 'Chicken Breast', amount: '14.80 mg' },
            { food: 'Beef Liver', amount: '13.20 mg' },
            { food: 'Peanuts', amount: '12.00 mg' }
        ]
    },
    'Vitamin B5 (Pantothenic Acid)': {
        description: `The structural core required to synthesize Coenzyme A (CoA) and Acyl Carrier Protein (ACP). Directly regulates fatty acid β-oxidation, cholesterol synthesis, and acetylcholine formation.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Shiitake Mushrooms', amount: '7.60 mg' },
            { food: 'Sunflower Seeds', amount: '7.00 mg' },
            { food: 'Beef Liver', amount: '6.30 mg' },
            { food: 'Wild Salmon', amount: '1.70 mg' },
            { food: 'Avocado', amount: '1.40 mg' }
        ]
    },
    'Vitamin B6': {
        description: `Cofactor for more than 100 transaminase and decarboxylase enzymes. Essential for heme synthesis, glycogen breakdown, and the biosyntheses of serotonin, dopamine, and GABA.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Sunflower Seeds', amount: '1.30 mg' },
            { food: 'Pistachios', amount: '1.10 mg' },
            { food: 'Wild Salmon', amount: '0.90 mg' },
            { food: 'Grass-Fed Beef', amount: '0.70 mg' },
            { food: 'Yellowfin Tuna', amount: '0.60 mg' }
        ]
    },
    'Vitamin B7 (Biotin)': {
        description: `A prosthetic group for 5 carboxylases regulating gluconeogenesis, fatty acid elongation, and branched-chain amino acid metabolism. Important for keratin and gene transcription.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Whole Eggs', amount: '20.00 mcg' },
            { food: 'Nutritional Yeast', amount: '15.00 mcg' },
            { food: 'Beef Liver', amount: '15.00 mcg' },
            { food: 'Peanuts', amount: '10.00 mcg' },
            { food: 'Almonds', amount: '7.00 mcg' }
        ]
    },
    'Vitamin B9 (Folate DFE)': {
        description: `Critical 1-carbon unit donor in the methionine/homocysteine cycle, purine/pyrimidine DNA synthesis, and cellular epigenetic methylation.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Beef Liver', amount: '290.00 mcg' },
            { food: 'Spinach', amount: '194.00 mcg' },
            { food: 'Lentils', amount: '181.00 mcg' },
            { food: 'Asparagus', amount: '149.00 mcg' },
            { food: 'Black Beans', amount: '130.00 mcg' }
        ]
    },
    'Vitamin B12': {
        description: `Cobalt-containing corrinoid cofactor essential for methionine synthase and methylmalonyl-CoA mutase. Required for neurological myelin stability and erythrocyte maturation.`,
        sourcesTitleLeft: 'Top Dietary Sources (per 100g)',
        sourcesLeft: [
            { food: 'Clams', amount: '99.00 mcg' },
            { food: 'Beef Liver', amount: '59.00 mcg' },
            { food: 'Sardines', amount: '9.00 mcg' },
            { food: 'Mackerel', amount: '8.00 mcg' },
            { food: 'Wild Salmon', amount: '3.20 mcg' }
        ]
    }
};

/* ==========================================================================
   3. CALCULATIONS, AGGREGATION & MULTI-UNIT FORMATTER
   ========================================================================== */

function getNutrientValue(item, category, nutrient) {
    if (!item || !item.foodKey || !FOOD_DATABASE[item.foodKey]) return 0;
    const baseValue = FOOD_DATABASE[item.foodKey][category]?.[nutrient];
    return baseValue ? baseValue * (item.amount / 100) : 0;
}

function calculateAggregate(dietList) {
    const totals = {};
    for (const [category, compounds] of Object.entries(NUTRIENT_UNITS)) {
        totals[category] = {};
        for (const compound of Object.keys(compounds)) {
            totals[category][compound] = 0;
            totals[category][`${compound}_absorbed`] = 0;
        }
    }

    if (!Array.isArray(dietList)) return totals;

    dietList.forEach(item => {
        if (!item || !item.foodKey) return;
        const foodDef = FOOD_DATABASE[item.foodKey];
        const absorptionMap = foodDef?.absorption || {};

        for (const category of Object.keys(NUTRIENT_UNITS)) {
            for (const compound of Object.keys(NUTRIENT_UNITS[category])) {
                const rawVal = getNutrientValue(item, category, compound);
                const absorptionRate = absorptionMap[compound] !== undefined ? absorptionMap[compound] : 1.0;

                totals[category][compound] += rawVal;
                totals[category][`${compound}_absorbed`] += rawVal * absorptionRate;
            }
        }
    });

    return totals;
}

function getActiveContext() {
    if (state.selectedIndex !== null && state.diet[state.selectedIndex]) {
        return {
            items: [state.diet[state.selectedIndex]],
            label: `Locked: ${state.diet[state.selectedIndex].displayName}`
        };
    }
    if (state.hoveredIndex !== null && state.diet[state.hoveredIndex]) {
        return {
            items: [state.diet[state.hoveredIndex]],
            label: `Preview: ${state.diet[state.hoveredIndex].displayName}`
        };
    }
    return {
        items: state.diet,
        label: 'Total Diet Summary'
    };
}

function getCategoryProgress(category, activeData) {
    if (!activeData || activeData.isCompare) return null;

    const nutrients = NUTRIENT_UNITS[category];
    if (!nutrients) return 0;

    let totalTargeted = 0;
    let sumPercentage = 0;

    for (const [nutrientName, meta] of Object.entries(nutrients)) {
        if (meta.isSubheader || meta.noTarget) continue;

        const rdaTarget = RDA_TARGETS[category]?.[nutrientName] || 0;
        if (rdaTarget <= 0) continue;

        const rawVal = activeData[category]?.[nutrientName] || 0;
        const nutrientPercent = Math.min(100, (rawVal / rdaTarget) * 100);

        sumPercentage += nutrientPercent;
        totalTargeted++;
    }

    if (totalTargeted === 0) return null;
    return Math.round(sumPercentage / totalTargeted);
}

function formatMultiUnits(grams) {
    const g = Math.round(grams);
    const oz = (grams / 28.3495231).toFixed(2);
    const lbs = (grams / 453.59237).toFixed(2);
    return `${g}g / ${oz}oz / ${lbs} pounds`;
}

/* ==========================================================================
   4. VISUAL METERS & CALIBRATED SCALES
   ========================================================================== */

function createRdaUlMeter(category, nutrientName, currentValue, rdaTarget, ulTarget, unit) {
    const rda = rdaTarget || 0;
    const ul = ulTarget || rda * 1.5;
    const maxScale = ul * 1.35;

    const rdaPercent = (rda / maxScale) * 100;
    const ulPercent = (ul / maxScale) * 100;
    const markerPercent = Math.min(100, (currentValue / maxScale) * 100);

    const gradientFill = `linear-gradient(to right, #78909c 0%, #78909c ${rdaPercent}%, #2ecc71 ${rdaPercent}%, #2ecc71 ${ulPercent}%, #e67e22 ${ulPercent}%, #e67e22 100%)`;

    return `
        <div class="detailed-meter-container">
            <div class="meter-labels-top">
                ${ulTarget > 0 ? `<span class="ul-label" style="left: ${ulPercent}%">UL: ${ulTarget} ${unit}</span>` : ''}
            </div>
            <div class="meter-bar-wrapper">
                <div class="meter-marker" style="left: ${markerPercent}%">▼</div>
                <div class="meter-bar" style="background: ${gradientFill}">
                    <div class="meter-tick zero" style="left: 0%"></div>
                    ${rda > 0 ? `<div class="meter-tick rda" style="left: ${rdaPercent}%"></div>` : ''}
                    ${ulTarget > 0 ? `<div class="meter-tick ul" style="left: ${ulPercent}%"></div>` : ''}
                </div>
            </div>
            <div class="meter-labels-bottom">
                <span class="zero-label" style="left: 0%">0</span>
                ${rda > 0 ? `<span class="rda-label" style="left: ${rdaPercent}%">RDA: ${rda} ${unit}</span>` : ''}
            </div>
        </div>
    `;
}

function createCompareSlotMeter(label, currentValue, rdaTarget, ulTarget, unit, color) {
    const rda = rdaTarget || 0;
    const ul = ulTarget || rda * 1.5;
    const maxScale = ul * 1.35;

    const rdaPercent = (rda / maxScale) * 100;
    const ulPercent = (ul / maxScale) * 100;
    const markerPercent = Math.min(100, (currentValue / maxScale) * 100);

    const gradientFill = `linear-gradient(to right, #78909c 0%, #78909c ${rdaPercent}%, ${color} ${rdaPercent}%, ${color} ${ulPercent}%, #e67e22 ${ulPercent}%, #e67e22 100%)`;

    return `
        <div class="detailed-meter-container compare-slot-meter">
            <div class="meter-labels-top">
                <span class="compare-slot-label" style="left: 0; transform: none; font-weight: bold; color: ${color};">
                    ${label} (${currentValue % 1 === 0 ? currentValue : currentValue.toFixed(2)} ${unit})
                </span>
                ${ulTarget > 0 ? `<span class="ul-label" style="left: ${ulPercent}%">UL: ${ulTarget} ${unit}</span>` : ''}
            </div>
            <div class="meter-bar-wrapper">
                <div class="meter-marker" style="left: ${markerPercent}%">▼</div>
                <div class="meter-bar" style="background: ${gradientFill}">
                    <div class="meter-tick zero" style="left: 0%"></div>
                    ${rda > 0 ? `<div class="meter-tick rda" style="left: ${rdaPercent}%"></div>` : ''}
                    ${ulTarget > 0 ? `<div class="meter-tick ul" style="left: ${ulPercent}%"></div>` : ''}
                </div>
            </div>
            <div class="meter-labels-bottom">
                <span class="zero-label" style="left: 0%">0</span>
                ${rda > 0 ? `<span class="rda-label" style="left: ${rdaPercent}%">RDA: ${rda} ${unit}</span>` : ''}
            </div>
        </div>
    `;
}

function getNutrientAnalysisHTML(category, nutrientName, currentValue, rdaTarget, ulTarget, unit) {
    const details = NUTRIENT_ANALYTICS[nutrientName] || {
        description: `${nutrientName} is a biochemically active compound vital for enzymatic regulation, cellular transport, and structural integrity.`,
        sourcesTitleLeft: 'Highest Sources',
        sourcesLeft: [
            { food: 'Primary Food Source A', amount: 'High' },
            { food: 'Primary Food Source B', amount: 'Moderate' }
        ]
    };

    const scaleHtml = createRdaUlMeter(category, nutrientName, currentValue, rdaTarget, ulTarget, unit);
    const leftTitle = details.sourcesTitleLeft || 'Highest Sources';
    const rightTitle = details.sourcesTitleRight || '';

    const sourcesHtml = details.sourcesRight
        ? `
            <div class="sources-container">
                <div class="sources-list">
                    <h5>${leftTitle}</h5>
                    ${details.sourcesLeft.map(s => `<div class="source-item"><span>${s.food}</span><span>${s.amount}</span></div>`).join('')}
                </div>
                <div class="sources-list">
                    <h5>${rightTitle}</h5>
                    ${details.sourcesRight.map(s => `<div class="source-item"><span>${s.food}</span><span>${s.amount}</span></div>`).join('')}
                </div>
            </div>
        `
        : `
            <div class="sources-container single-column">
                <div class="sources-list">
                    <h5>${leftTitle}</h5>
                    ${details.sourcesLeft.map(s => `<div class="source-item"><span>${s.food}</span><span>${s.amount}</span></div>`).join('')}
                </div>
            </div>
        `;

    return `
        <div class="nutrient-details-panel">
            <h4>${nutrientName} Analysis</h4>
            ${scaleHtml}
            <p class="detail-description">${details.description}</p>
            ${sourcesHtml}
        </div>
    `;
}

function getNutrientAnalysisCompareHTML(
    category,
    nutrientName,
    val1,
    val2,
    rdaTarget,
    ulTarget,
    unit,
    col1,
    col2,
    label1,
    label2
) {
    const details = NUTRIENT_ANALYTICS[nutrientName] || {
        description: `${nutrientName} comparison across loaded dietary inputs.`,
        sourcesTitleLeft: 'Highest Sources',
        sourcesLeft: [{ food: 'Dietary Source', amount: 'Reference' }]
    };

    const meter1Html = createCompareSlotMeter(label1, val1, rdaTarget, ulTarget, unit, col1);
    const meter2Html = createCompareSlotMeter(label2, val2, rdaTarget, ulTarget, unit, col2);

    return `
        <div class="nutrient-details-panel">
            <h4>${nutrientName} Comparison</h4>
            <div class="compare-meters-wrapper">
                ${meter1Html}
                ${meter2Html}
            </div>
            <p class="detail-description">${details.description}</p>
        </div>
    `;
}

/* ==========================================================================
   5. CATEGORY CARD GENERATION
   ========================================================================== */

function createCategoryCard(category, activeData) {
    const nutrients = NUTRIENT_UNITS[category];
    if (!nutrients) return null;

    const catEl = document.createElement('div');
    const isCollapsed = state.collapsedCategories[category] || false;
    const isLimitCategory = category === 'antinutrients' || category === 'biogenic_amines';
    catEl.className = `nutrient-category ${isLimitCategory ? 'limit-category' : ''} ${isCollapsed ? 'collapsed' : ''}`;

    const displayTitle = category.replace(/_/g, ' ');
    const icon = CATEGORY_ICONS[category] || '📊';

    let progress1 = null;
    let progress2 = null;
    const col1 = state.compareSlots[0].color;
    const col2 = state.compareSlots[1].color;

    const progressLabel =
        activeData && activeData.isCompare
            ? (() => {
                  progress1 = getCategoryProgress(category, activeData.slot1);
                  progress2 = getCategoryProgress(category, activeData.slot2);
                  const p1Str = progress1 !== null ? `${progress1}%` : '0%';
                  const p2Str = progress2 !== null ? `${progress2}%` : '0%';
                  return `<span style="color: ${col1}; font-size: 11px;">(${p1Str})</span> <span style="font-size: 10px; color: #aaa;">vs</span> <span style="color: ${col2}; font-size: 11px;">(${p2Str})</span>`;
              })()
            : (() => {
                  const progress = getCategoryProgress(category, activeData);
                  return progress !== null ? `(${progress}%)` : '';
              })();

    const headerEl = document.createElement('h3');
    headerEl.innerHTML = `
        <span>${icon} ${displayTitle} ${progressLabel}</span>
        <span class="toggle-icon">▼</span>
    `;
    catEl.appendChild(headerEl);

    const progressContainer = document.createElement('div');
    if (activeData && activeData.isCompare) {
        progressContainer.className = 'category-progress-bar compare-category-bar';
        progressContainer.innerHTML = `
            <div class="category-progress-bar" style="margin: 0; height: 3px;">
                <div class="category-progress-fill" style="width: ${progress1 || 0}%; background-color: ${col1};"></div>
            </div>
            <div class="category-progress-bar" style="margin: 0; height: 3px;">
                <div class="category-progress-fill" style="width: ${progress2 || 0}%; background-color: ${col2};"></div>
            </div>
        `;
    } else {
        progressContainer.className = 'category-progress-bar';
        const progress = getCategoryProgress(category, activeData);
        progressContainer.innerHTML = `<div class="category-progress-fill" style="width: ${progress !== null ? progress : 100}%"></div>`;
    }
    catEl.appendChild(progressContainer);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = `category-content ${isCollapsed ? 'hidden' : ''}`;

    if (!isCollapsed) {
        for (const [nutrientName, meta] of Object.entries(nutrients)) {
            if (meta.isSubheader) {
                const subheaderRow = document.createElement('div');
                subheaderRow.className = 'nutrient-row subheader';
                subheaderRow.innerHTML = `<span>${meta.label}</span>`;
                contentWrapper.appendChild(subheaderRow);
                continue;
            }

            const unit = meta.unit;
            const rdaTarget = RDA_TARGETS[category]?.[nutrientName] || 0;
            const ulTarget = UL_TARGETS[category]?.[nutrientName] || 0;

            const row = document.createElement('div');
            const indentClass = meta.indent ? `indent-${meta.indent}` : '';
            row.className = `nutrient-row clickable-row ${indentClass}`;

            if (activeData && activeData.isCompare) {
                const rawVal1 = activeData.slot1[category]?.[nutrientName] || 0;
                const rawVal2 = activeData.slot2[category]?.[nutrientName] || 0;
                const rawAbs1 = activeData.slot1[category]?.[`${nutrientName}_absorbed`] || 0;
                const rawAbs2 = activeData.slot2[category]?.[`${nutrientName}_absorbed`] || 0;

                const displayAbs1 = rawAbs1 % 1 === 0 ? rawAbs1 : rawAbs1.toFixed(2);
                const displayAbs2 = rawAbs2 % 1 === 0 ? rawAbs2 : rawAbs2.toFixed(2);
                const displayVal1 = rawVal1 % 1 === 0 ? rawVal1 : rawVal1.toFixed(2);
                const displayVal2 = rawVal2 % 1 === 0 ? rawVal2 : rawVal2.toFixed(2);

                const percent1 = Math.min(100, rdaTarget > 0 ? (rawVal1 / rdaTarget) * 100 : 0);
                const percent2 = Math.min(100, rdaTarget > 0 ? (rawVal2 / rdaTarget) * 100 : 0);
                const absPct1 = Math.min(100, rdaTarget > 0 ? (rawAbs1 / rdaTarget) * 100 : 0);
                const absPct2 = Math.min(100, rdaTarget > 0 ? (rawAbs2 / rdaTarget) * 100 : 0);

                const unabsPct1 = Math.max(0, percent1 - absPct1);
                const unabsPct2 = Math.max(0, percent2 - absPct2);

                if (meta.noTarget) {
                    row.innerHTML = `
                        <div class="nutrient-info compare-info">
                            <span>${nutrientName}</span>
                            <span class="compare-vals">
                                <span style="color: ${col1}; font-weight: bold;">${displayAbs1} (${displayVal1}) ${unit}</span> 
                                <span class="vs-divider">vs</span> 
                                <span style="color: ${col2}; font-weight: bold;">${displayAbs2} (${displayVal2}) ${unit}</span>
                            </span>
                        </div>
                        <div class="rda-container compare-container no-target-layout">
                            <div class="rda-dots">••••••</div>
                            <span class="nt-badge">N/T</span>
                        </div>
                    `;
                } else {
                    row.innerHTML = `
                        <div class="nutrient-info compare-info">
                            <span>${nutrientName}</span>
                            <span class="compare-vals">
                                <span style="color: ${col1}; font-weight: bold;">${displayAbs1} (${displayVal1}) ${unit}</span> 
                                <span class="vs-divider">vs</span> 
                                <span style="color: ${col2}; font-weight: bold;">${displayAbs2} (${displayVal2}) ${unit}</span> 
                                <span class="target-val">/ ${rdaTarget} ${unit}</span>
                            </span>
                        </div>
                        <div class="rda-container compare-container">
                            <div class="compare-bars-wrapper">
                                <div class="rda-bar-wrapper" style="display: flex; width: 100%; height: 5px; background: #e9ecef; border-radius: 2px; overflow: hidden;">
                                    <div class="rda-bar compare-bar" style="width: ${absPct1}%; background-color: ${col1};"></div>
                                    <div class="rda-bar compare-bar unabsorbed" style="width: ${unabsPct1}%; background-color: ${col1};"></div>
                                </div>
                                <div class="rda-bar-wrapper" style="display: flex; width: 100%; height: 5px; background: #e9ecef; border-radius: 2px; overflow: hidden;">
                                    <div class="rda-bar compare-bar" style="width: ${absPct2}%; background-color: ${col2};"></div>
                                    <div class="rda-bar compare-bar unabsorbed" style="width: ${unabsPct2}%; background-color: ${col2};"></div>
                                </div>
                            </div>
                            <div class="compare-percentages">
                                <span class="compare-pct" style="color: ${col1};">${Math.round((rawAbs1 / (rdaTarget || 1)) * 100)}%</span>
                                <span class="compare-pct" style="color: ${col2};">${Math.round((rawAbs2 / (rdaTarget || 1)) * 100)}%</span>
                            </div>
                        </div>
                    `;
                }
            } else {
                const rawVal = activeData?.[category]?.[nutrientName] || 0;
                const rawAbs = activeData?.[category]?.[`${nutrientName}_absorbed`] || 0;

                const displayVal = rawVal % 1 === 0 ? rawVal : rawVal.toFixed(2);
                const displayAbs = rawAbs % 1 === 0 ? rawAbs : rawAbs.toFixed(2);

                const actualPercent = rdaTarget > 0 ? (rawVal / rdaTarget) * 100 : 0;
                const percent = Math.min(100, actualPercent);

                const actualAbsPercent = rdaTarget > 0 ? (rawAbs / rdaTarget) * 100 : 0;
                const absPercent = Math.min(100, actualAbsPercent);
                const unabsPercent = Math.max(0, percent - absPercent);

                let barClass = '';
                let textClass = '';

                if (isLimitCategory) {
                    const isOver = rdaTarget > 0 && rawVal > rdaTarget;
                    barClass = isOver ? 'limit-over' : 'limit-under';
                } else {
                    if (ulTarget > 0 && rawVal > ulTarget) {
                        barClass = 'over-limit';
                        textClass = 'over-limit-text';
                    } else if (rdaTarget > 0 && rawVal > rdaTarget) {
                        barClass = 'exceeded';
                    }
                }

                if (meta.noTarget) {
                    row.innerHTML = `
                        <div class="nutrient-info">
                            <span>${nutrientName}</span>
                            <span class="no-target-val">${displayAbs} net (${displayVal} gross) ${unit}</span>
                        </div>
                        <div class="rda-container no-target-layout">
                            <div class="rda-dots">••••••</div>
                            <span class="nt-badge">N/T</span>
                        </div>
                    `;
                } else {
                    row.innerHTML = `
                        <div class="nutrient-info">
                            <span>${nutrientName}</span>
                            <span>${displayAbs} net (${displayVal} gross) ${unit} / ${rdaTarget} ${unit}</span>
                        </div>
                        <div class="rda-container">
                            <div class="rda-bar-wrapper" style="display: flex; flex: 1; height: 100%; background-color: #e9ecef; border-radius: 3px; overflow: hidden;">
                                <div class="rda-bar ${barClass}" style="width: ${absPercent}%;"></div>
                                <div class="rda-bar unabsorbed" style="width: ${unabsPercent}%; background-color: var(--primary-color);"></div>
                            </div>
                            <span class="percentage-label ${textClass}">${Math.round(actualAbsPercent)}% (${Math.round(actualPercent)}%)</span>
                        </div>
                    `;
                }
            }

            const uniqueKey = `${category}_${nutrientName}`;
            row.addEventListener('click', e => {
                if (e.target.closest('.rda-container')) return;
                e.stopPropagation();
                state.expandedNutrient = state.expandedNutrient === uniqueKey ? null : uniqueKey;
                renderNutritionPanel();
            });

            contentWrapper.appendChild(row);

            if (state.expandedNutrient === uniqueKey) {
                const detailPanel = document.createElement('div');
                if (activeData && activeData.isCompare) {
                    const rawAbs1 = activeData.slot1[category]?.[`${nutrientName}_absorbed`] || 0;
                    const rawAbs2 = activeData.slot2[category]?.[`${nutrientName}_absorbed`] || 0;
                    const label1 = state.compareSlots[0].parsed?.displayName || 'Item A';
                    const label2 = state.compareSlots[1].parsed?.displayName || 'Item B';

                    detailPanel.innerHTML = getNutrientAnalysisCompareHTML(
                        category,
                        nutrientName,
                        rawAbs1,
                        rawAbs2,
                        rdaTarget,
                        ulTarget,
                        unit,
                        col1,
                        col2,
                        label1,
                        label2
                    );
                } else {
                    const rawAbs = activeData?.[category]?.[`${nutrientName}_absorbed`] || 0;
                    detailPanel.innerHTML = getNutrientAnalysisHTML(
                        category,
                        nutrientName,
                        rawAbs,
                        rdaTarget,
                        ulTarget,
                        unit
                    );
                }
                contentWrapper.appendChild(detailPanel.firstElementChild);
            }
        }
    }

    catEl.appendChild(contentWrapper);

    catEl.addEventListener('click', e => {
        if (e.target.closest('.category-content')) return;
        state.collapsedCategories[category] = !isCollapsed;

        const allCategories = [...leftColumnLayout, ...rightColumnLayout];
        state.allCollapsed = allCategories.every(cat => state.collapsedCategories[cat] === true);
        renderNutritionPanel();
    });

    return catEl;
}

function renderNutritionPanel() {
    const leftColumnEl = document.getElementById('column-left');
    const rightColumnEl = document.getElementById('column-right');
    const indicatorEl = document.getElementById('nutrition-view-indicator');
    const toggleAllBtn = document.getElementById('toggle-all-btn');

    if (!leftColumnEl || !rightColumnEl) return;

    leftColumnEl.innerHTML = '';
    rightColumnEl.innerHTML = '';

    let activeData;

    if (state.mode === 'compare') {
        if (indicatorEl) indicatorEl.textContent = 'Showing: Comparison Mode';
        activeData = {
            isCompare: true,
            slot1: calculateAggregate(state.compareSlots[0].parsed ? [state.compareSlots[0].parsed] : []),
            slot2: calculateAggregate(state.compareSlots[1].parsed ? [state.compareSlots[1].parsed] : [])
        };
    } else {
        const context = getActiveContext();
        if (indicatorEl) indicatorEl.textContent = context.label;
        activeData = calculateAggregate(context.items);
    }

    if (toggleAllBtn) {
        toggleAllBtn.textContent = state.allCollapsed ? 'Expand All' : 'Collapse All';
    }

    leftColumnLayout.forEach(category => {
        const card = createCategoryCard(category, activeData);
        if (card) leftColumnEl.appendChild(card);
    });

    rightColumnLayout.forEach(category => {
        const card = createCategoryCard(category, activeData);
        if (card) rightColumnEl.appendChild(card);
    });
}

function renderDietList() {
    const listEl = document.getElementById('diet-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (state.diet.length === 0) {
        listEl.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 10px; color: var(--text-muted); text-align: center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4; margin-bottom: 8px;">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span style="font-size: 12px; font-weight: 500;">No foods logged today</span>
                <span style="font-size: 11px; opacity: 0.7; margin-top: 2px;">Search chicken or potato above</span>
            </div>
        `;
        return;
    }

    state.diet.forEach((item, index) => {
        const li = document.createElement('li');
        const classes = ['diet-item'];
        if (state.selectedIndex === index) classes.push('selected');
        else if (state.hoveredIndex === index) classes.push('hovered');
        li.className = classes.join(' ');

        li.innerHTML = `
            <div class="diet-item-info">
                <span class="diet-food-title">${item.displayName}</span>
                <span class="diet-unit-breakdown">(${formatMultiUnits(item.amount)})</span>
            </div>
            <button class="remove-btn" type="button" data-index="${index}">&times;</button>
        `;

        li.addEventListener('click', () => {
            if (state.selectedIndex === index) {
                state.selectedIndex = null;
                hideFoodInsight();
            } else {
                state.selectedIndex = index;
                showFoodInsight(item.foodKey);
            }
            renderDietList();
            renderNutritionPanel();
        });

        li.addEventListener('mouseenter', () => {
            state.hoveredIndex = index;
            if (state.selectedIndex === null) {
                renderNutritionPanel();
                li.classList.add('hovered');
            }
        });

        li.addEventListener('mouseleave', () => {
            state.hoveredIndex = null;
            if (state.selectedIndex === null) {
                renderNutritionPanel();
                li.classList.remove('hovered');
            }
        });

        li.querySelector('.remove-btn').addEventListener('click', e => {
            e.stopPropagation();
            removeFood(index);
        });

        listEl.appendChild(li);
    });
}

function removeFood(index) {
    state.diet.splice(index, 1);
    if (state.selectedIndex === index) state.selectedIndex = null;
    if (state.hoveredIndex === index) state.hoveredIndex = null;
    renderDietList();
    renderNutritionPanel();
}

/* ==========================================================================
   6. INTERACTIVE TWO-STEP FOOD SELECTOR & UNIT ENGINE
   ========================================================================== */

let selectedFoodKey = null;
let currentUnit = 'g';
let highlightedFoodIndex = -1;
let highlightedAmountIndex = -1;

const searchStepEl = document.getElementById('food-step-search');
const quantityStepEl = document.getElementById('food-step-quantity');
const searchInput = document.getElementById('food-search-input');
const dropdownEl = document.getElementById('food-dropdown');
const dropdownList = document.getElementById('food-dropdown-list');
const selectedFoodName = document.getElementById('selected-food-name');
const amountInput = document.getElementById('food-amount-input');
const amountDropdown = document.getElementById('amount-dropdown');
const amountDropdownList = document.getElementById('amount-dropdown-list');
const cancelFoodBtn = document.getElementById('cancel-food-selection');
const confirmAddBtn = document.getElementById('confirm-add-food-btn');
const tutorialHint = document.getElementById('first-time-hint');
const compareTutorialHint = document.getElementById('compare-first-time-hint');
let hasInteractedWithCompare = false;

function updateCompareTutorialHint() {
    if (!compareTutorialHint) return;
    if (hasInteractedWithCompare || state.compareSlots[0].parsed !== null) {
        compareTutorialHint.style.display = 'none';
    } else {
        compareTutorialHint.style.display = 'flex';
    }
}

function dismissCompareTutorial() {
    hasInteractedWithCompare = true;
    if (compareTutorialHint) {
        compareTutorialHint.style.display = 'none';
    }
}

const unitTriggerBtn = document.getElementById('unit-trigger-btn');
const unitMenu = document.getElementById('unit-menu');
const currentUnitLabel = document.getElementById('current-unit-label');

let hasInteractedWithSearch = false;

function updateTutorialHint() {
    if (!tutorialHint) return;
    if (hasInteractedWithSearch || state.diet.length > 0) {
        tutorialHint.style.display = 'none';
    } else {
        tutorialHint.style.display = 'flex';
    }
}

function dismissTutorial() {
    hasInteractedWithSearch = true;
    if (tutorialHint) {
        tutorialHint.style.display = 'none';
    }
}

// =========================================================================
// BIOLOGICAL INSIGHT CARD (FIELD NOTE) CONTROLLER
// =========================================================================

const insightCard = document.getElementById('food-insight-card');
const insightTitle = document.getElementById('insight-food-title');
const insightFamily = document.getElementById('insight-family');
const insightTags = document.getElementById('insight-tags');
const insightSuperpower = document.getElementById('insight-superpower');
const insightNuance = document.getElementById('insight-nuance');
const insightPrep = document.getElementById('insight-prep');
const closeInsightBtn = document.getElementById('close-insight-btn');

function showFoodInsight(foodKey) {
    if (!insightCard || !foodKey || !FOOD_DATABASE[foodKey]) return;
    const food = FOOD_DATABASE[foodKey];
    const info = food.insights;
    if (!info) return;

    insightTitle.textContent = food.displayName;
    insightFamily.textContent = info.family || '';
    insightSuperpower.textContent = info.superpower || '';
    insightNuance.textContent = info.nuance || '';
    insightPrep.textContent = info.prepTip || '';

    insightTags.innerHTML = '';
    (info.tags || []).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'insight-tag';
        span.textContent = tag;
        insightTags.appendChild(span);
    });

    insightCard.classList.remove('hidden');
}

function hideFoodInsight() {
    insightCard?.classList.add('hidden');
}

closeInsightBtn?.addEventListener('click', () => {
    hideFoodInsight();
    state.selectedIndex = null;
    renderDietList();
    renderNutritionPanel();
});

// 1. Food Dropdown Autocomplete
function getSortedFoods() {
    return Object.keys(FOOD_DATABASE)
        .map(key => ({ key, ...FOOD_DATABASE[key] }))
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

function renderFoodDropdown(filterQuery = '') {
    if (!dropdownList) return;
    dropdownList.innerHTML = '';
    const query = filterQuery.trim().toLowerCase();
    const foods = getSortedFoods();

    const filtered = foods
        .filter(food => {
            if (!query) return true;
            const matchesName = food.displayName.toLowerCase().includes(query);
            const matchesAlias = food.aliases?.some(a => a.toLowerCase().includes(query));
            return matchesName || matchesAlias;
        })
        .slice(0, 10);

    if (filtered.length === 0) {
        dropdownList.innerHTML = `
            <li style="padding: 10px; font-size: 12px; color: var(--text-muted); text-align: center;">
                No matching foods found
            </li>
        `;
        return;
    }

    filtered.forEach((food, index) => {
        const li = document.createElement('li');
        li.className = 'food-dropdown-item';
        if (query) li.classList.add('is-matched');
        if (index === highlightedFoodIndex) {
            li.classList.add('is-selected');
        }

        const calories = food.general?.Calories ?? 0;
        li.innerHTML = `
            <span>${food.displayName}</span>
            <span class="item-calories">${calories} kcal/100g</span>
        `;

        li.addEventListener('mousedown', e => {
            e.preventDefault();
            selectFood(food.key);
        });

        dropdownList.appendChild(li);
        const activeFood = dropdownList.querySelector('.food-dropdown-item.is-selected');
        activeFood?.scrollIntoView({ block: 'nearest' });
    });
}

function openFoodDropdown() {
    dropdownEl?.classList.remove('hidden');
    highlightedFoodIndex = -1;
    renderFoodDropdown(searchInput?.value || '');
}

function closeFoodDropdown() {
    dropdownEl?.classList.add('hidden');
    highlightedFoodIndex = -1;
}

function selectFood(foodKey) {
    selectedFoodKey = foodKey;
    const food = FOOD_DATABASE[foodKey];
    if (!food) return;

    if (selectedFoodName) selectedFoodName.textContent = food.displayName;
    closeFoodDropdown();

    searchStepEl?.classList.add('hidden');
    quantityStepEl?.classList.remove('hidden');

    if (amountInput) {
        amountInput.value = '';
        amountInput.focus();
    }

    dismissTutorial();
}

function resetToSearch() {
    selectedFoodKey = null;
    closeAmountDropdown();
    closeFoodDropdown();
    unitMenu?.classList.add('hidden');

    quantityStepEl?.classList.add('hidden');
    searchStepEl?.classList.remove('hidden');

    if (searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }
}

// 2. Amount Presets Dropdown
function renderAmountPresets() {
    if (!amountDropdownList) return;
    amountDropdownList.innerHTML = '';
    const presets = UNIT_CONVERSIONS[currentUnit].presets;

    presets.forEach((val, idx) => {
        const li = document.createElement('li');
        li.className = 'amount-preset-item';
        if (idx === highlightedAmountIndex) {
            li.classList.add('is-selected');
        }
        li.innerHTML = `
            <span>${val} ${currentUnit}</span>
            <small style="opacity: 0.6;">preset</small>
        `;

        li.addEventListener('mousedown', e => {
            e.preventDefault();
            amountInput.value = val;
            closeAmountDropdown();
            amountInput.focus();
        });

        amountDropdownList.appendChild(li);
    });

    const activeItem = amountDropdownList.querySelector('.amount-preset-item.is-selected');
    activeItem?.scrollIntoView({ block: 'nearest' });
}

function openAmountDropdown() {
    amountDropdown?.classList.remove('hidden');
    renderAmountPresets();
}

function closeAmountDropdown() {
    amountDropdown?.classList.add('hidden');
    highlightedAmountIndex = -1;
}

// 3. Commit Add Food
function commitAddFood() {
    if (!selectedFoodKey) return;

    const rawAmount = parseFloat(amountInput?.value);
    if (!rawAmount || isNaN(rawAmount) || rawAmount <= 0) return;

    const grams = rawAmount * UNIT_CONVERSIONS[currentUnit].toGrams;

    state.diet.push({
        id: Date.now() + Math.random(),
        foodKey: selectedFoodKey,
        amount: Math.round(grams),
        displayName: FOOD_DATABASE[selectedFoodKey].displayName
    });

    renderDietList();
    renderNutritionPanel();
    resetToSearch();
}

// 4. Unit Conversion Engine
function switchUnit(newUnit) {
    if (!UNIT_CONVERSIONS[newUnit]) return;

    if (newUnit === currentUnit) {
        unitMenu?.classList.add('hidden');
        return;
    }

    const currentVal = parseFloat(amountInput.value);
    if (!isNaN(currentVal) && currentVal > 0) {
        const grams = currentVal * UNIT_CONVERSIONS[currentUnit].toGrams;
        const converted = grams / UNIT_CONVERSIONS[newUnit].toGrams;
        amountInput.value = converted % 1 === 0 ? converted : parseFloat(converted.toFixed(2));
    }

    currentUnit = newUnit;
    if (currentUnitLabel) currentUnitLabel.textContent = newUnit;

    document.querySelectorAll('.unit-opt').forEach(o => {
        o.classList.toggle('active', o.getAttribute('data-unit') === newUnit);
    });

    unitMenu?.classList.add('hidden');
    renderAmountPresets();
}

unitTriggerBtn?.addEventListener('click', e => {
    e.stopPropagation();
    unitMenu?.classList.toggle('hidden');
});

document.addEventListener('click', e => {
    if (!e.target.closest('.unit-dropdown-container')) {
        unitMenu?.classList.add('hidden');
    }
});

const UNIT_KEYS = Object.keys(UNIT_CONVERSIONS);

unitTriggerBtn?.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = UNIT_KEYS.indexOf(currentUnit);
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (currentIndex + delta + UNIT_KEYS.length) % UNIT_KEYS.length;
        switchUnit(UNIT_KEYS[nextIndex]);
    }
});

document.querySelectorAll('.unit-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        switchUnit(opt.getAttribute('data-unit'));
    });
});

// Event Bindings for Step 2
cancelFoodBtn?.addEventListener('click', resetToSearch);
confirmAddBtn?.addEventListener('click', commitAddFood);

amountInput?.addEventListener('focus', openAmountDropdown);
amountInput?.addEventListener('blur', () => setTimeout(closeAmountDropdown, 150));

amountInput?.addEventListener('keydown', e => {
    const presets = UNIT_CONVERSIONS[currentUnit].presets;
    if (presets.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (amountDropdown?.classList.contains('hidden')) {
            openAmountDropdown();
            highlightedAmountIndex = 0;
        } else {
            highlightedAmountIndex = (highlightedAmountIndex + 1) % presets.length;
        }
        renderAmountPresets();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (amountDropdown?.classList.contains('hidden')) {
            openAmountDropdown();
            highlightedAmountIndex = presets.length - 1;
        } else {
            highlightedAmountIndex = (highlightedAmountIndex - 1 + presets.length) % presets.length;
        }
        renderAmountPresets();
    } else if (e.key === 'Enter') {
        if (!amountDropdown?.classList.contains('hidden') && highlightedAmountIndex >= 0) {
            e.preventDefault();
            amountInput.value = presets[highlightedAmountIndex];
            closeAmountDropdown();
        } else {
            commitAddFood();
        }
    } else if (e.key === 'Escape') {
        closeAmountDropdown();
    }
});

// Event Bindings for Step 1
searchInput?.addEventListener('focus', () => {
    dismissTutorial();
    openFoodDropdown();
});
searchInput?.addEventListener('input', () => {
    openFoodDropdown();
    renderFoodDropdown(searchInput.value);
});
searchInput?.addEventListener('blur', () => {
    setTimeout(closeFoodDropdown, 150);
});

searchInput?.addEventListener('keydown', e => {
    const items = dropdownList?.querySelectorAll('.food-dropdown-item') || [];
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedFoodIndex = (highlightedFoodIndex + 1) % items.length;
        renderFoodDropdown(searchInput.value);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedFoodIndex = (highlightedFoodIndex - 1 + items.length) % items.length;
        renderFoodDropdown(searchInput.value);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const filtered = getSortedFoods().filter(food => {
            const q = searchInput.value.trim().toLowerCase();
            if (!q) return true;
            return food.displayName.toLowerCase().includes(q) || food.aliases?.some(a => a.toLowerCase().includes(q));
        });

        if (highlightedFoodIndex >= 0 && filtered[highlightedFoodIndex]) {
            selectFood(filtered[highlightedFoodIndex].key);
        } else if (filtered.length > 0) {
            selectFood(filtered[0].key);
        }
    } else if (e.key === 'Escape') {
        closeFoodDropdown();
    }
});

/* ==========================================================================
   7. COMPARISON SLOTS CONTROLLER
   ========================================================================== */

function setupComparisonSlot(slotIndex) {
    const num = slotIndex + 1;
    let slotFoodKey = null;
    let slotUnit = 'g';
    let highlightedIndex = -1;
    let highlightedAmount = -1;

    const searchStep = document.getElementById(`slot-${num}-step-search`);
    const qtyStep = document.getElementById(`slot-${num}-step-quantity`);
    const searchInput = document.getElementById(`slot-${num}-search-input`);
    const dropdown = document.getElementById(`slot-${num}-dropdown`);
    const dropdownList = document.getElementById(`slot-${num}-dropdown-list`);
    const selectedName = document.getElementById(`slot-${num}-selected-name`);
    const amountInput = document.getElementById(`slot-${num}-amount-input`);
    const amountDropdown = document.getElementById(`slot-${num}-amount-dropdown`);
    const amountDropdownList = document.getElementById(`slot-${num}-amount-dropdown-list`);
    const cancelBtn = document.getElementById(`slot-${num}-cancel-selection`);
    const confirmBtn = document.getElementById(`slot-${num}-confirm-btn`);
    const unitBtn = document.getElementById(`slot-${num}-unit-btn`);
    const unitMenu = document.getElementById(`slot-${num}-unit-menu`);
    const unitLabel = document.getElementById(`slot-${num}-unit-label`);
    const clearBtn = document.getElementById(`clear-slot-${num}-btn`);

    function renderSlotFoods(q = '') {
        if (!dropdownList) return;
        dropdownList.innerHTML = '';
        const query = q.trim().toLowerCase();
        const filtered = getSortedFoods()
            .filter(
                f =>
                    !query ||
                    f.displayName.toLowerCase().includes(query) ||
                    f.aliases?.some(a => a.toLowerCase().includes(query))
            )
            .slice(0, 10);

        filtered.forEach((food, idx) => {
            const li = document.createElement('li');
            li.className = 'food-dropdown-item';
            if (idx === highlightedIndex) li.classList.add('is-selected');
            li.innerHTML = `<span>${food.displayName}</span><span class="item-calories">${food.general?.Calories ?? 0} kcal/100g</span>`;
            li.addEventListener('mousedown', e => {
                e.preventDefault();
                slotFoodKey = food.key;
                if (selectedName) selectedName.textContent = food.displayName;
                dropdown?.classList.add('hidden');
                searchStep?.classList.add('hidden');
                qtyStep?.classList.remove('hidden');
                amountInput.value = '';
                amountInput?.focus();
            });
            dropdownList.appendChild(li);
        });
        const active = dropdownList.querySelector('.is-selected');
        active?.scrollIntoView({ block: 'nearest' });
    }

    searchInput?.addEventListener('focus', () => {
        if (slotIndex === 0) dismissCompareTutorial();
        dropdown?.classList.remove('hidden');
        renderSlotFoods(searchInput.value);
    });
    searchInput?.addEventListener('input', () => {
        dropdown?.classList.remove('hidden');
        renderSlotFoods(searchInput.value);
    });
    searchInput?.addEventListener('blur', () => setTimeout(() => dropdown?.classList.add('hidden'), 150));

    searchInput?.addEventListener('keydown', e => {
        const items = dropdownList?.querySelectorAll('.food-dropdown-item') || [];
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex + 1) % items.length;
            renderSlotFoods(searchInput.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
            renderSlotFoods(searchInput.value);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const filtered = getSortedFoods().filter(food => {
                const q = searchInput.value.trim().toLowerCase();
                if (!q) return true;
                return (
                    food.displayName.toLowerCase().includes(q) || food.aliases?.some(a => a.toLowerCase().includes(q))
                );
            });
            if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
                slotFoodKey = filtered[highlightedIndex].key;
                if (selectedName) selectedName.textContent = filtered[highlightedIndex].displayName;
                dropdown?.classList.add('hidden');
                searchStep?.classList.add('hidden');
                qtyStep?.classList.remove('hidden');
                amountInput.value = '';
                amountInput?.focus();
            }
        }
    });

    function renderPresets() {
        if (!amountDropdownList) return;
        amountDropdownList.innerHTML = '';
        UNIT_CONVERSIONS[slotUnit].presets.forEach((val, idx) => {
            const li = document.createElement('li');
            li.className = 'amount-preset-item';
            if (idx === highlightedAmount) li.classList.add('is-selected');
            li.innerHTML = `<span>${val} ${slotUnit}</span><small style="opacity: 0.6;">preset</small>`;
            li.addEventListener('mousedown', e => {
                e.preventDefault();
                amountInput.value = val;
                amountDropdown?.classList.add('hidden');
                amountInput.focus();
            });
            amountDropdownList.appendChild(li);
        });
        const active = amountDropdownList.querySelector('.is-selected');
        active?.scrollIntoView({ block: 'nearest' });
    }

    amountInput?.addEventListener('focus', () => {
        amountDropdown?.classList.remove('hidden');
        renderPresets();
    });
    amountInput?.addEventListener('blur', () => setTimeout(() => amountDropdown?.classList.add('hidden'), 150));

    amountInput?.addEventListener('keydown', e => {
        const presets = UNIT_CONVERSIONS[slotUnit].presets;
        if (presets.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedAmount = (highlightedAmount + 1) % presets.length;
            renderPresets();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedAmount = (highlightedAmount - 1 + presets.length) % presets.length;
            renderPresets();
        } else if (e.key === 'Enter') {
            if (!amountDropdown?.classList.contains('hidden') && highlightedAmount >= 0) {
                e.preventDefault();
                amountInput.value = presets[highlightedAmount];
                amountDropdown?.classList.add('hidden');
            } else {
                commitSlot();
            }
        }
    });

    unitBtn?.addEventListener('click', e => {
        e.stopPropagation();
        unitMenu?.classList.toggle('hidden');
    });
    unitMenu?.querySelectorAll('.unit-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            const newUnit = opt.getAttribute('data-unit');
            const val = parseFloat(amountInput.value);
            if (!isNaN(val) && val > 0) {
                const g = val * UNIT_CONVERSIONS[slotUnit].toGrams;
                amountInput.value = parseFloat((g / UNIT_CONVERSIONS[newUnit].toGrams).toFixed(2));
            }
            slotUnit = newUnit;
            if (unitLabel) unitLabel.textContent = newUnit;
            unitMenu.querySelectorAll('.unit-opt').forEach(o => o.classList.toggle('active', o === opt));
            unitMenu.classList.add('hidden');
            renderPresets();
        });
    });

    function resetSlotSearch() {
        slotFoodKey = null;
        qtyStep?.classList.add('hidden');
        searchStep?.classList.remove('hidden');
        if (searchInput) searchInput.value = '';
    }
    cancelBtn?.addEventListener('click', resetSlotSearch);

    function commitSlot() {
        if (!slotFoodKey) return;
        const amt = parseFloat(amountInput.value);
        if (!amt || isNaN(amt) || amt <= 0) return;
        const grams = amt * UNIT_CONVERSIONS[slotUnit].toGrams;

        state.compareSlots[slotIndex].parsed = {
            amount: Math.round(grams),
            foodKey: slotFoodKey,
            displayName: FOOD_DATABASE[slotFoodKey].displayName
        };
        updateSlotUI(slotIndex);
        renderNutritionPanel();
        resetSlotSearch();
    }
    confirmBtn?.addEventListener('click', commitSlot);

    clearBtn?.addEventListener('click', () => {
        state.compareSlots[slotIndex].parsed = null;
        updateSlotUI(slotIndex);
        renderNutritionPanel();
        resetSlotSearch();
    });
}

setupComparisonSlot(0);
setupComparisonSlot(1);

function updateSlotUI(slotIndex) {
    const slot = state.compareSlots[slotIndex];
    const cardEl = document.getElementById(`slot-${slotIndex + 1}-card`);
    const statusEl = document.getElementById(`slot-${slotIndex + 1}-status`);
    const badgeEl = cardEl?.querySelector('.slot-badge');

    if (badgeEl) badgeEl.style.backgroundColor = slot.color;

    if (statusEl) {
        if (slot.parsed) {
            statusEl.innerHTML = `Loaded: <strong>${slot.parsed.amount}g</strong> ${slot.parsed.displayName}`;
            statusEl.classList.add('active');
        } else {
            statusEl.textContent = 'No food loaded';
            statusEl.classList.remove('active');
        }
    }
}

document.querySelectorAll('.color-options').forEach(optionsContainer => {
    const slotIndex = parseInt(optionsContainer.getAttribute('data-slot'), 10) - 1;
    optionsContainer.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            optionsContainer.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            state.compareSlots[slotIndex].color = dot.getAttribute('data-color');
            updateSlotUI(slotIndex);
            renderNutritionPanel();
        });
    });
});

/* ==========================================================================
   8. GLOBAL CONTROLS & BOOTSTRAPPING
   ========================================================================== */

const tabDietBtn = document.getElementById('tab-diet');
const tabCompareBtn = document.getElementById('tab-compare');
const dietModeViews = document.getElementById('diet-mode-views');
const compareModeViews = document.getElementById('compare-mode-views');
const toggleAllBtn = document.getElementById('toggle-all-btn');

tabDietBtn?.addEventListener('click', () => {
    state.mode = 'diet';
    tabDietBtn.classList.add('active');
    tabCompareBtn?.classList.remove('active');
    dietModeViews?.classList.remove('hidden');
    compareModeViews?.classList.add('hidden');
    renderNutritionPanel();
});

tabCompareBtn?.addEventListener('click', () => {
    state.mode = 'compare';
    tabCompareBtn.classList.add('active');
    tabDietBtn?.classList.remove('active');
    dietModeViews?.classList.add('hidden');
    compareModeViews?.classList.remove('hidden');
    renderNutritionPanel();
    updateCompareTutorialHint();
});

toggleAllBtn?.addEventListener('click', () => {
    const allCategories = [...leftColumnLayout, ...rightColumnLayout];
    const shouldCollapse = !state.allCollapsed;
    allCategories.forEach(cat => {
        state.collapsedCategories[cat] = shouldCollapse;
    });
    state.allCollapsed = shouldCollapse;
    renderNutritionPanel();
});

renderDietList();
updateSlotUI(0);
updateSlotUI(1);
renderNutritionPanel();
updateTutorialHint();
updateCompareTutorialHint();
