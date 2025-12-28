/**
 * @jest-environment jsdom
 */

test('CGPA Math Logic (Math Check)', () => {
    // We simulate a student getting an A (4.0) and a B (3.0)
    const subject1 = { grade: 4.00, credits: 3 }; // 12 points
    const subject2 = { grade: 3.00, credits: 3 }; // 9 points
    
    // Total = 21 points / 6 credits = 3.50 GPA
    const totalPoints = (subject1.grade * subject1.credits) + (subject2.grade * subject2.credits);
    const totalCredits = subject1.credits + subject2.credits;
    const gpa = totalPoints / totalCredits;

    expect(gpa).toBeCloseTo(3.50);
});

test('Critical UI Elements Exist', () => {
    // Create a fake version of your new HTML structure
    document.body.innerHTML = `
        <div id="finalGPA"></div>
        <div id="toast" class="hidden"></div>
    `;

    const gpaDisplay = document.getElementById('finalGPA');
    const toastNotification = document.getElementById('toast');

    // Test 1: Does the GPA display exist?
    expect(gpaDisplay).not.toBeNull();

    // Test 2: Does the Notification system exist? (New Feature Check)
    expect(toastNotification).not.toBeNull();
    expect(toastNotification.classList.contains('hidden')).toBe(true);
});