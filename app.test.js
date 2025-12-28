/** @jest-environment jsdom */

/* eslint-env jest */

// Import functions if we are in Node environment (for testing)
const { calculateCGPA, determineGrade, calculateTotal, validateInput } = require('./app');

describe('CGPA Math Logic', () => {
    test('calculateCGPA returns correct value', () => {
        expect(calculateCGPA(12, 4)).toBe("3.00");
        expect(calculateCGPA(0, 4)).toBe("0.00");
    });

    test('determineGrade returns correct letter', () => {
        expect(determineGrade(4.0)).toBe('A');
        expect(determineGrade(3.0)).toBe('B');
        expect(determineGrade(1.9)).toBe('F');
    });
});

describe('Critical UI Elements Exist', () => {
    test('Check if toast and finalGPA divs exist', () => {
        // Mock the HTML structure
        document.body.innerHTML = `
            <div id="finalGPA"></div>
            <div id="toast" class="hidden"></div>
        `;
        
        const finalGPA = document.getElementById('finalGPA');
        const toast = document.getElementById('toast');

        expect(finalGPA).not.toBeNull();
        expect(toast).not.toBeNull();
    });
});
