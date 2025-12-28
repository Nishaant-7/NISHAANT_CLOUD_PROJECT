// --- GLOBAL VARIABLES ---
let subjects = [];

// --- MATH FUNCTIONS (Must be defined at top level) ---

function calculateCGPA(totalPoints, totalCredits) {
    if (totalCredits === 0) return "0.00";
    let cgpa = totalPoints / totalCredits;
    return cgpa.toFixed(2);
}

function determineGrade(points) {
    // This is the function that was missing!
    if (points >= 4.0) return 'A';
    if (points >= 3.7) return 'A-';
    if (points >= 3.3) return 'B+';
    if (points >= 3.0) return 'B';
    if (points >= 2.7) return 'B-';
    if (points >= 2.3) return 'C+';
    if (points >= 2.0) return 'C';
    if (points >= 1.7) return 'C-';
    if (points >= 1.3) return 'D+';
    if (points >= 1.0) return 'D';
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

// --- UI FUNCTIONS (Placeholder to satisfy Linter) ---
function handleFormSubmit(event) {
    if(event) event.preventDefault();
}

function editSubject(id) {
    console.log("Edit " + id);
}

function clearAll() {
    subjects = [];
}

// --- EXPORT FOR TESTING ---
// This block must be at the very end
if (typeof module !== 'undefined') {
    module.exports = {
        calculateCGPA,
        determineGrade, // It will find the function now!
        calculateTotal,
        validateInput
    };
}
