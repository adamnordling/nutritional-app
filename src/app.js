import './style.css';
import { FOOD_DATABASE, RDA_TARGETS, NUTRIENT_UNITS } from './database.js';

// 1. Application State
const state = {
    diet: [],
    hoveredIndex: null,
    selectedIndex: null
};

// 2. Parser Logic
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

        let foodKey = null;
        if (foodName.includes('chicken')) foodKey = 'chicken';
        if (foodName.includes('potato') || foodName.includes('potatoes')) foodKey = 'potatoes';

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

function renderNutritionPanel() {
    const gridEl = document.getElementById('nutrition-grid');
    const indicatorEl = document.getElementById('nutrition-view-indicator');
    gridEl.innerHTML = '';

    const context = getActiveContext();
    indicatorEl.textContent = context.label;
    const activeData = calculateAggregate(context.items);

    for (const [category, nutrients] of Object.entries(NUTRIENT_UNITS)) {
        const catEl = document.createElement('div');
        catEl.className = 'nutrient-category';

        const displayTitle = category.replace(/_/g, ' ');
        catEl.innerHTML = `<h3>${displayTitle}</h3>`;

        for (const [nutrient, unit] of Object.entries(nutrients)) {
            const rawVal = activeData[category][nutrient] || 0;
            const rdaTarget = RDA_TARGETS[category]?.[nutrient] || 100;
            const displayVal = rawVal % 1 === 0 ? rawVal : rawVal.toFixed(2);

            const percent = Math.min(100, (rawVal / rdaTarget) * 100);
            const isExceeded = rawVal > rdaTarget;

            const row = document.createElement('div');
            row.className = 'nutrient-row';

            // FIXED: Standardized the unit format string so it displays 'displayVal unit / rdaTarget unit'
            row.innerHTML = `
                <div class="nutrient-info">
                    <span>${nutrient}</span>
                    <span>${displayVal} ${unit} / ${rdaTarget} ${unit}</span>
                </div>
                <div class="rda-container">
                    <div class="rda-bar ${isExceeded ? 'exceeded' : ''}" style="width: ${percent}%"></div>
                </div>
            `;
            catEl.appendChild(row);
        }

        gridEl.appendChild(catEl);
    }
}

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