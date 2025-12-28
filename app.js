document.addEventListener('DOMContentLoaded', loadSubjects);

let subjects = [];

// --- CORE CRUD FUNCTIONS ---

function handleFormSubmit() {
    const editId = document.getElementById('editId').value;
    
    if (editId) {
        updateExistingSubject(editId);
    } else {
        createNewSubject();
    }
}

// 1. CREATE
function createNewSubject() {
    const name = document.getElementById('subjectName').value;
    const grade = parseFloat(document.getElementById('gradeSelect').value);
    const credits = parseInt(document.getElementById('creditHours').value);

    if (!validateInput(name, credits)) return;

    const subject = {
        id: Date.now().toString(), // String ID for safety
        name,
        grade,
        credits
    };

    subjects.push(subject);
    saveData();
    showToast("Subject Added Successfully!", "success");
    resetForm();
}

// 2. READ (Handled by renderTable & loadSubjects)

// 3. UPDATE
function editSubject(id) {
    const subject = subjects.find(sub => sub.id === id.toString());
    if (!subject) return;

    // Populate Form
    document.getElementById('subjectName').value = subject.name;
    document.getElementById('gradeSelect').value = subject.grade.toFixed(2);
    document.getElementById('creditHours').value = subject.credits;
    document.getElementById('editId').value = subject.id;

    // Change UI to Edit Mode
    document.getElementById('formTitle').innerText = "Edit Subject";
    document.getElementById('submitBtn').innerText = "Update Subject";
    document.getElementById('cancelBtn').classList.remove('hidden');
    
    // Highlight Card
    document.querySelector('.input-card').style.borderColor = "#f59e0b";
}

function updateExistingSubject(id) {
    const name = document.getElementById('subjectName').value;
    const grade = parseFloat(document.getElementById('gradeSelect').value);
    const credits = parseInt(document.getElementById('creditHours').value);

    if (!validateInput(name, credits)) return;

    // Find Index and Update
    const index = subjects.findIndex(sub => sub.id === id);
    if (index !== -1) {
        subjects[index] = { id, name, grade, credits };
        saveData();
        showToast("Subject Updated!", "success");
        resetForm();
    }
}

// 4. DELETE
function deleteSubject(id) {
    if(confirm("Delete this subject?")) {
        subjects = subjects.filter(sub => sub.id !== id.toString());
        saveData();
        showToast("Subject Deleted", "error");
        
        // If empty, clear edit mode safely
        if(subjects.length === 0) resetForm();
    }
}

// --- UTILITIES ---

function validateInput(name, credits) {
    if (name.trim() === '' || isNaN(credits) || credits <= 0) {
        showToast("Please fill all fields correctly", "error");
        return false;
    }
    return true;
}

function saveData() {
    localStorage.setItem('msu_cgpa_data', JSON.stringify(subjects));
    renderTable();
    calculateCGPA();
}

function loadSubjects() {
    const data = localStorage.getItem('msu_cgpa_data');
    if (data) subjects = JSON.parse(data);
    renderTable();
    calculateCGPA();
}

function resetForm() {
    document.getElementById('subjectName').value = '';
    document.getElementById('creditHours').value = '';
    document.getElementById('editId').value = '';
    
    // UI Reset
    document.getElementById('formTitle').innerText = "Add New Subject";
    document.getElementById('submitBtn').innerText = "+ Add Subject";
    document.getElementById('cancelBtn').classList.add('hidden');
    document.querySelector('.input-card').style.borderColor = "#334155";
}

function clearAll() {
    if(confirm("Delete ALL data? This cannot be undone.")) {
        subjects = [];
        saveData();
        resetForm();
    }
}

// --- VISUAL LOGIC ---

function renderTable() {
    const list = document.getElementById('subjectList');
    const emptyState = document.getElementById('emptyState');
    list.innerHTML = '';

    if (subjects.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';

    subjects.forEach(sub => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${sub.name}</strong></td>
            <td>${sub.grade.toFixed(2)}</td>
            <td>${sub.credits}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editSubject('${sub.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteSubject('${sub.id}')">Del</button>
            </td>
        `;
        list.appendChild(row);
    });
}

function calculateCGPA() {
    if (subjects.length === 0) {
        updateStats(0, 0);
        return;
    }
    
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(sub => {
        totalPoints += (sub.grade * sub.credits);
        totalCredits += sub.credits;
    });

    const gpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits);
    updateStats(gpa, totalCredits);
    calculateGap(gpa); // Check target
}

function updateStats(gpa, credits) {
    const display = document.getElementById('finalGPA');
    display.innerText = gpa.toFixed(2);
    document.getElementById('totalCredits').innerText = `Total Credits: ${credits}`;

    // Dynamic Colors
    if(gpa >= 3.5) display.style.color = '#10b981'; // Green
    else if(gpa >= 3.0) display.style.color = '#3b82f6'; // Blue
    else if(gpa >= 2.0) display.style.color = '#f59e0b'; // Orange
    else display.style.color = '#ef4444'; // Red
}

function calculateGap(currentGPA = parseFloat(document.getElementById('finalGPA').innerText)) {
    const target = parseFloat(document.getElementById('targetGPA').value);
    const msg = document.getElementById('gapMessage');
    
    if(!target) {
        msg.innerText = "Set a target to see progress";
        return;
    }

    const diff = currentGPA - target;
    if (diff >= 0) {
        msg.innerText = "🎉 Target Achieved!";
        msg.style.color = "#10b981";
    } else {
        msg.innerText = `You need ${Math.abs(diff).toFixed(2)} more points`;
        msg.style.color = "#f59e0b";
    }
}

function showToast(message, type = "success") {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast ${type === 'error' ? 'error' : ''}`; // Reset classes
    
    // Show
    setTimeout(() => { toast.classList.remove('hidden'); }, 10);

    // Hide after 3s
    setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}

// Export for Testing
if (typeof module !== 'undefined') {
    module.exports = { subjects, createNewSubject, deleteSubject };
}