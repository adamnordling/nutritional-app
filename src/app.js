import './style.css';
import { FOOD_DATABASE, RDA_TARGETS, UL_TARGETS, NUTRIENT_UNITS } from './database.js';

// 1. Application State
const state = {
    diet: [],
    hoveredIndex: null,
    selectedIndex: null,
    allCollapsed: false,
    collapsedCategories: {},
    expandedNutrient: null
};

// Column Layout Configurations
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

// 2. Centralized Nutrition Analytics & Source Registry
// 2. Centralized Nutrition Analytics & Source Registry (Top 10 Food Tierlists)
const NUTRIENT_ANALYTICS = {
    Calories: {
        description: `Food provides the energy you need for your cells to carry out their duties to keep us healthy. Energy is locked by chemical bonds in food and is released through digestion and metabolism of carbohydrates, fat, protein and alcohol. Calories (kcal) are the unit we use to measure the amount of energy in a food.\n\nOn average there are:\n- 9 kcal/g (37.7 kJ/g) in fat\n- 4 kcal/g (16.7 kJ/g) in carbohydrates\n- 4 kcal/g (16.7 kJ/g) in protein\n- 7 kcal/g (29.3 kJ/g) in alcohol.`,
        sourcesTitleLeft: "Highest Calories",
        sourcesLeft: [
            { food: "Olive Oil", amount: "884 kcal" },
            { food: "Almonds", amount: "579 kcal" },
            { food: "Peanut Butter", amount: "588 kcal" },
            { food: "Cheddar Cheese", amount: "403 kcal" },
            { food: "Ribeye Steak", amount: "291 kcal" },
            { food: "Whole Eggs", amount: "143 kcal" },
            { food: "Wild Salmon", amount: "206 kcal" },
            { food: "Sweet Potato", amount: "86 kcal" },
            { food: "Greek Yogurt", amount: "97 kcal" },
            { food: "White Rice", amount: "130 kcal" }
        ],
        sourcesTitleRight: "Lowest Calories",
        sourcesRight: [
            { food: "Spinach", amount: "23 kcal" },
            { food: "Broccoli", amount: "34 kcal" },
            { food: "Blueberries", amount: "57 kcal" },
            { food: "Potato", amount: "77 kcal" },
            { food: "Strawberries", amount: "32 kcal" },
            { food: "Carrots", amount: "41 kcal" },
            { food: "Onions", amount: "40 kcal" },
            { food: "Cabbage", amount: "25 kcal" },
            { food: "Asparagus", amount: "20 kcal" },
            { food: "Zucchini", amount: "17 kcal" }
        ]
    },
    "Vitamin B1 (Thiamine)": {
        description: `Thiamine (Vitamin B1) is a water-soluble coenzyme essential for pyruvate dehydrogenase, a critical gateway step in converting glucose into ATP energy. It heavily supports neurological function, cellular growth, and systemic metabolic pathways.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Nutritional Yeast", amount: "15.00 mg" },
            { food: "Sunflower Seeds", amount: "2.30 mg" },
            { food: "Macadamia Nuts", amount: "1.20 mg" },
            { food: "Pork Chops", amount: "0.90 mg" },
            { food: "Pine Nuts", amount: "0.40 mg" },
            { food: "Black Beans", amount: "0.40 mg" },
            { food: "Lentils", amount: "0.35 mg" },
            { food: "Navy Beans", amount: "0.30 mg" },
            { food: "Green Peas", amount: "0.25 mg" },
            { food: "Whole Wheat Bread", amount: "0.20 mg" }
        ]
    },
    "Vitamin B2 (Riboflavin)": {
        description: `Riboflavin (Vitamin B2) is the precursor to FAD and FMN, essential cofactors in cellular respiration and the mitochondrial electron transport chain. It is highly critical for fatty acid oxidation, drug metabolism, and eye integrity.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Nutritional Yeast", amount: "4.00 mg" },
            { food: "Beef Liver", amount: "2.70 mg" },
            { food: "Almonds", amount: "1.10 mg" },
            { food: "Whole Eggs", amount: "0.45 mg" },
            { food: "Feta Cheese", amount: "0.45 mg" },
            { food: "Wild Salmon", amount: "0.35 mg" },
            { food: "Shiitake Mushrooms", amount: "0.30 mg" },
            { food: "Mackerel", amount: "0.30 mg" },
            { food: "Spinach", amount: "0.20 mg" },
            { food: "Grass-Fed Beef", amount: "0.20 mg" }
        ]
    },
    "Vitamin B3 (Niacin)": {
        description: `Niacin (Vitamin B3) is the fundamental precursor for NAD+ and NADH, the key cellular electron carriers involved in glycolysis and sirtuin-mediated DNA repair. Optimal intake is highly critical for maintaining cellular longevity.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Nutritional Yeast", amount: "35.00 mg" },
            { food: "Yellowfin Tuna", amount: "18.00 mg" },
            { food: "Chicken Breast", amount: "14.80 mg" },
            { food: "Beef Liver", amount: "13.20 mg" },
            { food: "Peanuts", amount: "12.00 mg" },
            { food: "Wild Salmon", amount: "8.70 mg" },
            { food: "Turkey Breast", amount: "8.10 mg" },
            { food: "Pork Chops", amount: "7.50 mg" },
            { food: "Portobello Mushrooms", amount: "6.20 mg" },
            { food: "Grass-Fed Beef", amount: "5.50 mg" }
        ]
    },
    "Vitamin B5 (Pantothenic Acid)": {
        description: `Pantothenic Acid (Vitamin B5) is the vital chemical building block needed to synthesize Coenzyme A (CoA). It supports carbohydrate metabolism, red blood cell synthesis, fatty acid synthesis, and neurotransmitter regulation.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Shiitake Mushrooms", amount: "7.60 mg" },
            { food: "Sunflower Seeds", amount: "7.00 mg" },
            { food: "Beef Liver", amount: "6.30 mg" },
            { food: "Wild Salmon", amount: "1.70 mg" },
            { food: "Avocado", amount: "1.40 mg" },
            { food: "Chicken Breast", amount: "0.90 mg" },
            { food: "Whole Eggs", amount: "0.90 mg" },
            { food: "Sweet Potato", amount: "0.80 mg" },
            { food: "Broccoli", amount: "0.50 mg" },
            { food: "Milk", amount: "0.40 mg" }
        ]
    },
    "Vitamin B6": {
        description: `Vitamin B6 (Pyridoxine) serves as a cofactor in over 100 enzymatic reactions, primarily focusing on amino acid metabolism, red blood cell synthesis (heme), neurotransmitter synthesis (serotonin, dopamine), and immune response.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Sunflower Seeds", amount: "1.30 mg" },
            { food: "Pistachios", amount: "1.10 mg" },
            { food: "Wild Salmon", amount: "0.90 mg" },
            { food: "Grass-Fed Beef", amount: "0.70 mg" },
            { food: "Yellowfin Tuna", amount: "0.60 mg" },
            { food: "Chicken Breast", amount: "0.50 mg" },
            { food: "Bananas", amount: "0.40 mg" },
            { food: "Avocado", amount: "0.30 mg" },
            { food: "Potato", amount: "0.30 mg" },
            { food: "Spinach", amount: "0.20 mg" }
        ]
    },
    "Vitamin B7 (Biotin)": {
        description: `Biotin (Vitamin B7) is a crucial carboxylase cofactor that assists in metabolizing fats, amino acids, and glucose. It plays an emerging, heavily researched role in gene expression, chromatin structure, and nail/hair integrity.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Whole Eggs", amount: "20.00 mcg" },
            { food: "Nutritional Yeast", amount: "15.00 mcg" },
            { food: "Beef Liver", amount: "15.00 mcg" },
            { food: "Peanuts", amount: "10.00 mcg" },
            { food: "Almonds", amount: "7.00 mcg" },
            { food: "Sweet Potato", amount: "4.00 mcg" },
            { food: "Wild Salmon", amount: "4.00 mcg" },
            { food: "Sunflower Seeds", amount: "3.00 mcg" },
            { food: "Avocado", amount: "2.00 mcg" },
            { food: "Cauliflower", amount: "2.00 mcg" }
        ]
    },
    "Vitamin B9 (Folate DFE)": {
        description: `Folate (Vitamin B9) is highly essential for methyl donation, DNA methylation, cellular division, and healthy red blood cell development. It is critical for systemic neurological development and cell growth [1.1.2, 1.2.2].`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Beef Liver", amount: "290.00 mcg" },
            { food: "Spinach", amount: "194.00 mcg" },
            { food: "Lentils", amount: "181.00 mcg" },
            { food: "Asparagus", amount: "149.00 mcg" },
            { food: "Black Beans", amount: "130.00 mcg" },
            { food: "Avocado", amount: "81.00 mcg" },
            { food: "Broccoli", amount: "63.00 mcg" },
            { food: "Romaine Lettuce", amount: "55.00 mcg" },
            { food: "Brussels Sprouts", amount: "47.00 mcg" },
            { food: "Orange", amount: "30.00 mcg" }
        ]
    },
    "Vitamin B12": {
        description: `Cobalamin (Vitamin B12) is a complex cobalt-based cofactor critical for myelin sheath integrity, normal red blood cell development, and proper brain function. It is almost exclusively bioavailable in animal foods.`,
        sourcesTitleLeft: "Top 10 Dietary Sources (per 100g)",
        sourcesLeft: [
            { food: "Clams", amount: "99.00 mcg" },
            { food: "Beef Liver", amount: "59.00 mcg" },
            { food: "Sardines", amount: "9.00 mcg" },
            { food: "Mackerel", amount: "8.00 mcg" },
            { food: "Wild Salmon", amount: "3.20 mcg" },
            { food: "Grass-Fed Beef", amount: "2.60 mcg" },
            { food: "Tuna", amount: "2.20 mcg" },
            { food: "Milk", amount: "0.45 mcg" },
            { food: "Greek Yogurt", amount: "0.30 mcg" },
            { food: "Whole Eggs", amount: "0.30 mcg" }
        ]
    }
};

// 2. Parser Logic
// Dynamic Parser: Automatically matches any food key in your database
function parseInputLine(line) {
    const trimmed = line.trim().toLowerCase();
    if (!trimmed) return null;

    // Matches standard input structures like "500g chicken"
    const regex = /^(\d+(?:\.\d+)?)\s*(g|kg|oz)?\s+(.+)$/i;
    const match = trimmed.match(regex);

    if (match) {
        let amount = parseFloat(match[1]);
        const unit = match[2] || 'g';
        const foodName = match[3].trim();

        if (unit === 'kg') amount *= 1000;
        if (unit === 'oz') amount *= 28.3495;

        // DYNAMIC MATCHING: Automatically scans keys in your database
        const databaseKeys = Object.keys(FOOD_DATABASE);
        let foodKey = databaseKeys.find(key => foodName.includes(key)) || null;

        return {
            originalText: line,
            amount: Math.round(amount),
            foodKey: foodKey,
            displayName: foodKey ? foodKey.charAt(0).toUpperCase() + foodKey.slice(1) : `${foodName} (Unknown)`
        };
    }
    return null;
}

// 3. State Calculations
function getNutrientValue(item, category, nutrient) {
    if (!item.foodKey || !FOOD_DATABASE[item.foodKey]) return 0;
    const baseValue = FOOD_DATABASE[item.foodKey][category][nutrient];
    return baseValue ? (baseValue * (item.amount / 100)) : 0;
}

function calculateAggregate(dietList) {
    const totals = {};
    for (const [category, nutrients] of Object.entries(NUTRIENT_UNITS)) {
        totals[category] = {};
        for (const nutrient of Object.keys(nutrients)) {
            totals[category][nutrient] = 0;
        }
    }

    dietList.forEach(item => {
        if (!item.foodKey) return;
        for (const category of Object.keys(NUTRIENT_UNITS)) {
            for (const nutrient of Object.keys(NUTRIENT_UNITS[category])) {
                totals[category][nutrient] += getNutrientValue(item, category, nutrient);
            }
        }
    });

    return totals;
}

function getActiveContext() {
    if (state.selectedIndex !== null) {
        return {
            items: [state.diet[state.selectedIndex]],
            label: `Locked: ${state.diet[state.selectedIndex].displayName}`
        };
    } else if (state.hoveredIndex !== null) {
        return {
            items: [state.diet[state.hoveredIndex]],
            label: `Preview: ${state.diet[state.hoveredIndex].displayName}`
        };
    } else {
        return {
            items: state.diet,
            label: 'Total Diet Summary'
        };
    }
}

// 4. UI Rendering Engine
function renderDietList() {
    const listEl = document.getElementById('diet-list');
    listEl.innerHTML = '';

    state.diet.forEach((item, index) => {
        const li = document.createElement('li');

        let classes = ['diet-item'];
        if (state.selectedIndex === index) classes.push('selected');
        else if (state.hoveredIndex === index) classes.push('hovered');
        li.className = classes.join(' ');

        li.innerHTML = `
            <span class="diet-item-text"><strong>${item.amount}g</strong> ${item.displayName}</span>
            <button class="remove-btn" data-index="${index}">&times;</button>
        `;

        // Selection Trigger (Click Toggle)
        li.addEventListener('click', () => {
            if (state.selectedIndex === index) {
                state.selectedIndex = null; // Toggle off
            } else {
                state.selectedIndex = index; // Toggle on / Switch
            }
            renderDietList();
            renderNutritionPanel();
        });

        // Hover States
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

        // Removal logic
        li.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering selections on delete
            removeFood(index);
        });

        listEl.appendChild(li);
    });
}

function getCategoryProgress(category, activeData) {
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

function toggleAllCategories() {
    const allCategories = [...leftColumnLayout, ...rightColumnLayout];
    const shouldCollapse = !state.allCollapsed;

    allCategories.forEach(cat => {
        state.collapsedCategories[cat] = shouldCollapse;
    });
    state.allCollapsed = shouldCollapse;

    renderNutritionPanel();
}

// 3. Dynamic Visual Scale & Meter Generator
function createRdaUlMeter(category, nutrientName, currentValue, rdaTarget, ulTarget, unit) {
    const rda = rdaTarget || 0;
    const ul = ulTarget || (rda * 1.5);
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

// 4. DRY (Don't Repeat Yourself) Drawer Template Engine
function getNutrientAnalysisHTML(category, nutrientName, currentValue, rdaTarget, ulTarget, unit) {
    // Ingest data from the registry, fallback seamlessly to mock values if not defined yet
    const details = NUTRIENT_ANALYTICS[nutrientName] || {
        description: `${nutrientName} is an active biochemical compound vital for structural integrity, enzyme regulation, and systemic physiological support [1.1.2, 1.2.2].`,
        sourcesTitleLeft: "Highest Sources",
        sourcesLeft: [
            { food: `High ${nutrientName} Food A`, amount: `High` },
            { food: `High ${nutrientName} Food B`, amount: `Moderate` }
        ]
    };

    // Calculate structural scale
    const scaleHtml = createRdaUlMeter(category, nutrientName, currentValue, rdaTarget, ulTarget, unit);

    const leftTitle = details.sourcesTitleLeft || "Highest Sources";
    const rightTitle = details.sourcesTitleRight || "";

    // Decide between dual-column and single-column structures dynamically
    let sourcesHtml = '';
    if (details.sourcesRight) {
        sourcesHtml = `
            <div class="sources-container">
                <div class="sources-list">
                    <h5>${leftTitle}</h5>
                    ${details.sourcesLeft.map(s => `
                        <div class="source-item">
                            <span>${s.food}</span>
                            <span>${s.amount}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="sources-list">
                    <h5>${rightTitle}</h5>
                    ${details.sourcesRight.map(s => `
                        <div class="source-item">
                            <span>${s.food}</span>
                            <span>${s.amount}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        sourcesHtml = `
            <div class="sources-container single-column">
                <div class="sources-list">
                    <h5>${leftTitle}</h5>
                    ${details.sourcesLeft.map(s => `
                        <div class="source-item">
                            <span>${s.food}</span>
                            <span>${s.amount}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    return `
        <div class="nutrient-details-panel">
            <h4>${nutrientName} Analysis</h4>
            ${scaleHtml}
            <p class="detail-description">${details.description}</p>
            ${sourcesHtml}
        </div>
    `;
}

// Upgraded Category Card Builder with Full-Card Collapse Interactivity
function createCategoryCard(category, activeData) {
    const nutrients = NUTRIENT_UNITS[category];
    if (!nutrients) return null;

    const catEl = document.createElement('div');
    const isCollapsed = state.collapsedCategories[category] || false;

    const isLimitCategory = category === 'antinutrients' || category === 'biogenic_amines';
    catEl.className = `nutrient-category ${isLimitCategory ? 'limit-category' : ''} ${isCollapsed ? 'collapsed' : ''}`;

    const displayTitle = category.replace(/_/g, ' ');
    const progress = getCategoryProgress(category, activeData);
    const progressLabel = progress !== null ? `(${progress}%)` : '';

    // Render Card Header (Click handler removed from here)
    const headerEl = document.createElement('h3');
    headerEl.innerHTML = `
        <span>${displayTitle} ${progressLabel}</span>
        <span class="toggle-icon">▼</span>
    `;
    catEl.appendChild(headerEl);

    // Active Category Progress Bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'category-progress-bar';
    const progressWidth = progress !== null ? progress : 100;
    progressContainer.innerHTML = `
        <div class="category-progress-fill" style="width: ${progressWidth}%"></div>
    `;
    catEl.appendChild(progressContainer);

    // Content Wrapper
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
            const rawVal = activeData[category]?.[nutrientName] || 0;
            const displayVal = rawVal % 1 === 0 ? rawVal : rawVal.toFixed(2);

            const rdaTarget = RDA_TARGETS[category]?.[nutrientName] || 0;
            const ulTarget = UL_TARGETS[category]?.[nutrientName] || 0;

            const actualPercent = rdaTarget > 0 ? (rawVal / rdaTarget) * 100 : 0;
            const percent = Math.min(100, actualPercent);

            const isExceeded = rdaTarget > 0 && rawVal > rdaTarget;
            const isOverLimit = ulTarget > 0 && rawVal > ulTarget;

            const row = document.createElement('div');
            let indentClass = '';
            if (meta.indent === 1) indentClass = 'indent-1';
            if (meta.indent === 2) indentClass = 'indent-2';
            if (meta.indent === 3) indentClass = 'indent-3';
            row.className = `nutrient-row clickable-row ${indentClass}`;

            let barClass = '';
            let textClass = '';
            if (isOverLimit) {
                barClass = 'over-limit';
                textClass = 'over-limit-text';
            } else if (isExceeded) {
                barClass = 'exceeded';
            }

            if (meta.noTarget) {
                row.innerHTML = `
                    <div class="nutrient-info">
                        <span>${nutrientName}</span>
                        <span class="no-target-val">${displayVal} ${unit}</span>
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
                        <span>${displayVal} ${unit} / ${rdaTarget} ${unit}</span>
                    </div>
                    <div class="rda-container">
                        <div class="rda-bar ${barClass}" style="width: ${percent}%"></div>
                        <span class="percentage-label ${textClass}">${Math.round(actualPercent)}%</span>
                    </div>
                `;
            }

// Click Handler: Toggle expanding details
            const uniqueKey = `${category}_${nutrientName}`;
            row.addEventListener('click', (e) => {
                if (e.target.closest('.rda-container')) return;

                // FIXED: Prevents event bubbling to catEl during DOM destruction
                e.stopPropagation();

                state.expandedNutrient = (state.expandedNutrient === uniqueKey) ? null : uniqueKey;
                renderNutritionPanel();
            });

            contentWrapper.appendChild(row);

            if (state.expandedNutrient === uniqueKey) {
                const analysisHtml = getNutrientAnalysisHTML(category, nutrientName, rawVal, rdaTarget, ulTarget, unit);
                const detailPanel = document.createElement('div');
                detailPanel.innerHTML = analysisHtml;
                contentWrapper.appendChild(detailPanel.firstElementChild);
            }
        }
    }

    catEl.appendChild(contentWrapper);

    // BIND AT THE CARD LEVEL: Clicking card header area triggers collapse, rows do not
    catEl.addEventListener('click', (e) => {
        if (e.target.closest('.category-content')) return; // Bypasses clicks inside expanded lists

        state.collapsedCategories[category] = !isCollapsed;
        const allCategories = [...leftColumnLayout, ...rightColumnLayout];
        const currentStates = allCategories.map(cat => state.collapsedCategories[cat] || false);
        state.allCollapsed = currentStates.every(status => status === true);
        renderNutritionPanel();
    });

    return catEl;
}

function renderNutritionPanel() {
    const leftColumnEl = document.getElementById('column-left');
    const rightColumnEl = document.getElementById('column-right');
    const indicatorEl = document.getElementById('nutrition-view-indicator');
    const toggleAllBtn = document.getElementById('toggle-all-btn');

    leftColumnEl.innerHTML = '';
    rightColumnEl.innerHTML = '';

    const context = getActiveContext();
    indicatorEl.textContent = context.label;
    const activeData = calculateAggregate(context.items);

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

// Bind Global DOM Actions
document.getElementById('toggle-all-btn').addEventListener('click', toggleAllCategories);

// Bind Global DOM Actions
document.getElementById('toggle-all-btn').addEventListener('click', toggleAllCategories);

// 7. Event Listener Binding & Bootstrapping
document.getElementById('toggle-all-btn').addEventListener('click', toggleAllCategories);

// 5. Actions & Triggers
function addFood() {
    const inputEl = document.getElementById('food-input');
    const parsed = parseInputLine(inputEl.value);

    if (parsed) {
        state.diet.push({
            id: Date.now() + Math.random(),
            ...parsed
        });
        inputEl.value = ''; // Reset input workspace
        renderDietList();
        renderNutritionPanel();
    }
}

function removeFood(index) {
    state.diet.splice(index, 1);
    if (state.selectedIndex === index) state.selectedIndex = null;
    if (state.hoveredIndex === index) state.hoveredIndex = null;

    renderDietList();
    renderNutritionPanel();
}

// Bind Global DOM Listeners
document.getElementById('add-btn').addEventListener('click', addFood);

document.getElementById('food-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addFood();
    }
});

// Bootstrapping
renderDietList();
renderNutritionPanel();