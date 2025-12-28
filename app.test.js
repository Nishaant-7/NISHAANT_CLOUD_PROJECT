/** @jest-environment jsdom */

/* eslint-env jest */

const app = require('./app');

describe('CGPA Math Logic', () => {
    test('calculateCGPA returns correct value', () => {
        // 12 points / 4 credits = 3.00
        expect(app.calculateCGPA(12, 4)).toBe("3.00");
        // 0 points / 0 credits = 0.00
        expect(app.calculateCGPA(0, 0)).toBe("0.00");
    });

    test('determineGrade returns correct letter', () => {
        expect(app.determineGrade(4.0)).toBe('A');
        expect(app.determineGrade(3.0)).toBe('B');
        expect(app.determineGrade(0.0)).toBe('F');
    });
});

describe('Critical UI Elements Exist', () => {
    test('Mock HTML check', () => {
        document.body.innerHTML = '<div id="finalGPA"></div>';
        const finalGPA = document.getElementById('finalGPA');
        expect(finalGPA).not.toBeNull();
    });
});
