// Global Variables
let subjects = [];

// --- MATH FUNCTIONS (Global for Testing) ---
function calculateCGPA(totalPoints, totalCredits) {
    if (totalCredits === 0) return "0.00";
    return (totalPoints / totalCredits).toFixed(2);
}

function determineGrade(points) {
    if (points >= 4.0) return 'A';
    if (points >= 3.7) return 'A-';
    if (points >= 3.3) return 'B+';
    if (points >= 3.0) return 'B';
    if (points >= 2.0) return 'C';
    if (points >= 0.0) return 'F';
    return 'F';
}

function calculateTotal(subjects) {
    let totalPoints = 0;
    let totalCredits = 0;
    subjects.forEach(sub => {
        totalPoints += sub.grade * sub.credit;
        totalCredits += parseFloat(sub.credit);
    });
    return { totalPoints, totalCredits };
}

function validateInput(subject, grade, credit) {
    return subject !== '' && grade !== '' && credit > 0;
}

// --- UI FUNCTIONS ---
function handleFormSubmit(event) {
    if (event) event.preventDefault();
    // Logic to add subject would go here
    console.log("Form submitted");
}

// --- EXPORT FOR TESTING ---
// This is what makes the pipeline work!
if (typeof module !== 'undefined') {
    module.exports = {
        calculateCGPA,
        determineGrade,
        calculateTotal,
        validateInput
    };
}
