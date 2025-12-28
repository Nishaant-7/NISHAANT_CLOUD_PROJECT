document.addEventListener('DOMContentLoaded', initApp);

let subjects = [];

// --- 1. PURE LOGIC (This is what your Test file checks) ---

function calculateCGPA(totalPoints, totalCredits) {
    if (totalCredits === 0) return "0.00";
    const gpa = totalPoints / totalCredits;
    return gpa.toFixed(2);
}

function determineGrade(point) {
    if (point >= 4.00) return 'A';
    if (point >= 3.67) return 'A-';
    if (point >= 3.33) return 'B+';
    if (point >= 3.00) return 'B';
    if (point >= 2.67) return 'B-';
    if (point >= 2.33) return 'C+';
    if (point >= 2.00) return 'C';
    if (point >= 1.67) return 'C-';
    return 'F';
}

// --- 2. DOM / WEBSITE LOGIC ---

function initApp() {
    loadSubjects();
    // Attach event listeners if needed, or rely on onclick in HTML
}

function handleFormSubmit() {
    // Check if we are adding or editing based on hidden ID
    const editId = document.getElementById('editId') ? document.getElementById('editId').value : '';
    if (editId) updateExistingSubject(editId);
    else addSubject();
}

function addSubject() {
    const name = document.getElementById('subjectName').value;
    const grade = parseFloat(document.getElementById('gradeSelect').value);
    const credits = parseInt(document.getElementById('creditHours').value);

    if (name === '' || isNaN(credits)) {
        alert("Please fill in all fields.");
        return;
    }

    subjects.push({ id: Date.now().toString(), name, grade, credits });
    saveAndRender();
    resetForm();
}

function deleteSubject(id) {
    subjects = subjects.filter(sub => sub.id !== id.toString());
    saveAndRender();
}

function updateExistingSubject(id) {
    // Reuse delete then add logic for simplicity, or update in place
    deleteSubject(id);
    addSubject();
}

function editSubject(id) {
    const sub = subjects.find(s => s.id === id.toString());
    if(sub) {
        document.getElementById('subjectName').value = sub.name;
        document.getElementById('gradeSelect').value = sub.grade.toFixed(2);
        document.getElementById('creditHours').value = sub.credits;
        
        // Handle Edit ID if exists in HTML
        const editInput = document.getElementById('editId');
        if(editInput) editInput.value = sub.id;
        
        // Change button text visual cue
        document.querySelector('.btn-primary').innerText = "Update Subject";
    }
}

function resetForm() {
    document.getElementById('subjectName').value = '';
    document.getElementById('creditHours').value = '';
    if(document.getElementById('editId')) document.getElementById('editId').value = '';
    document.querySelector('.btn-primary').innerText = "+ Add Subject";
}

function clearAll() {
    subjects = [];
    saveAndRender();
}

// --- 3. INTEGRATION ---

function saveAndRender() {
    localStorage.setItem('msu_cgpa_data', JSON.stringify(subjects));
    renderTable();
    updateStatsDisplay();
}

function loadSubjects() {
    const data = localStorage.getItem('msu_cgpa_data');
    if (data) subjects = JSON.parse(data);
    renderTable();
    updateStatsDisplay();
}

function renderTable() {
    const list = document.getElementById('subjectList');
    if(!list) return; // Guard clause for testing environment
    list.innerHTML = '';

    subjects.forEach(sub => {
        const row = document.createElement('tr');
        // We use determineGrade here to show the letter grade
        const letter = determineGrade(sub.grade); 
        row.innerHTML = `
            <td>${sub.name}</td>
            <td>${letter} (${sub.grade.toFixed(2)})</td>
            <td>${sub.credits}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editSubject('${sub.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteSubject('${sub.id}')">Del</button>
            </td>
        `;
        list.appendChild(row);
    });
}

function updateStatsDisplay() {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(sub => {
        totalPoints += (sub.grade * sub.credits);
        totalCredits += sub.credits;
    });

    // We use the pure logic function here
    const gpaString = calculateCGPA(totalPoints, totalCredits);
    
    const display = document.getElementById('finalGPA');
    const creditDisplay = document.getElementById('totalCredits');
    
    if(display) display.innerText = gpaString;
    if(creditDisplay) creditDisplay.innerText = `Total Credits: ${totalCredits}`;
}

// --- 4. EXPORT FOR TESTING ---
// This part is crucial. It lets your test file see the functions.
if (typeof module !== 'undefined') {
    module.exports = { 
        calculateCGPA, 
        determineGrade, 
        subjects, 
        addSubject, 
        deleteSubject 
    };
}
