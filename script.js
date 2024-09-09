const class10Students = [
    "SRIRAM GOKUL KRISHNA", "PALNATI DINESH KARTHIK", "POKALA HARSHA VARDHAN REDDY",
    "ANUMANDLA MANIDEEP", "KITCHAMSETTY YAMINI PRIYA", "HARSHITHA SAI KAKANI",
    "PALLAPU SRAVANI", "ALLAM PRATHAP", "MADAM NITHYASREE", "AGGARAPU POOJITHA",
    "KUMMARA UMESH CHANDRA", "CHITTINEEDI RAJA", "LAKSHMI VENKATA NARENDRANATH",
    "ALAMKONDA SIVA PRASAD", "R THEJA", "VADDI SAI KRISHNA",
    "KANDULA VENKATA SAI NITHIN", "KOTHAI S", "TANAKALMATAM PURNA PHANINDRA SAI",
    "YARAM MALLIKARGUNA REDDY", "SRIVARSHINIE V", "JETHENDRA PRASAD D",
    "ANNAVARAPU NAGA SAI LAKSHMI SRINIVAS", "KALAGARA MAHESH CHOWDARY",
    "MANI BAALA KRISHNAN S", "KOLLU VENKATA SAI", "SADAM SNEHA", "K MOHAN SAI",
    "GURRAM PRAVEEN", "CHUNCHU MOHAN KRISHNA", "ADDALA LAKSHMI NARAYANA",
    "RAMALA VINAY KUMAR REDDY", "CHOLLARAJU JYOSHNA", "NITHYA SHREE E",
    "S.SANTHIYA", "SALIYA SAMEER PATANKAR", "VELEYAPUDI ABHIRAM KUMAR",
    "GAJJALA KEERTHI REDDY", "MUKKAMALA SRINIVASULU", "PANDURI SAI KIRAN"
];

const class11Students = [...class10Students]; // Same students for Class 11 initially

// Manage current students by class
const studentsByClass = {
    10: [...class10Students],
    11: [...class11Students]
};

// Login Functionality
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('main-container').classList.remove('hidden');
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

// Show Add Students Page
document.getElementById('add-students-btn').addEventListener('click', function() {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('add-students-container').classList.remove('hidden');
    loadStudentListForClass();
});

// Show Attendance Marking Page
document.getElementById('attendance-marking-btn').addEventListener('click', function() {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('attendance-container').classList.remove('hidden');
    loadStudents(10); // Default to Class 10
});

// Show Remove Students Page
document.getElementById('remove-students-btn').addEventListener('click', function() {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('remove-students-container').classList.remove('hidden');
    loadRemoveStudentList(10); // Default to Class 10
});

// Back to Main Menu from Add Students Page
document.getElementById('back-to-main').addEventListener('click', function() {
    document.getElementById('add-students-container').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
});

// Add Student
document.getElementById('add-student-btn').addEventListener('click', function() {
    const studentName = document.getElementById('student-name').value.trim();
    const className = document.getElementById('class-select').value;
    
    if (studentName) {
        studentsByClass[className].push(studentName);
        loadStudentListForClass();
        document.getElementById('student-name').value = '';
    }
});

// Load Student List for Add Students Page
function loadStudentListForClass() {
    const className = document.getElementById('class-select').value;
    const studentListClass = document.getElementById('student-list-class');
    studentListClass.innerHTML = '';

    studentsByClass[className].forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <span>${student}</span>
        `;
        studentListClass.appendChild(studentItem);
    });
}

// Show Attendance Marking Page
document.querySelectorAll('.class-select').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedClass = event.target.dataset.class;
        loadStudents(selectedClass);
    });
});

// Load Students for Attendance Marking
function loadStudents(className) {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('Please select a date first.');
        return;
    }

    const students = studentsByClass[className];
    const studentListContainer = document.getElementById('student-list');
    studentListContainer.innerHTML = '';

    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <span>${student}</span>
            <div class="attendance-options">
                <label class="present-label">
                    <input type="radio" name="attendance-${student}" value="present" checked required> ✅
                </label>
                <label class="absent-label">
                    <input type="radio" name="attendance-${student}" value="absent"> ❌
                </label>
            </div>
        `;
        studentListContainer.appendChild(studentItem);
    });

    document.getElementById('student-list-container').classList.remove('hidden');
}

// Submit Attendance
document.getElementById('student-attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const absentStudents = [];

    const studentItems = document.querySelectorAll('.student-item');
    studentItems.forEach(item => {
        const studentName = item.querySelector('span').textContent;
        const attendance = item.querySelector('input[type="radio"]:checked').value;
        if (attendance === 'absent') {
            absentStudents.push(studentName);
        }
    });

    displayAttendanceResults(absentStudents);
});

// Display Attendance Results
function displayAttendanceResults(absentStudents) {
    const absentList = document.querySelector('#absent-list ul');
    absentList.innerHTML = '';

    absentStudents.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student;
        listItem.style.color = 'black'; // Ensure text is black
        absentList.appendChild(listItem);
    });

    document.getElementById('attendance-results').classList.remove('hidden');
    document.getElementById('student-list-container').classList.add('hidden');
}

// Back to Login from Attendance Results Page
document.getElementById('back-to-login').addEventListener('click', function() {
    document.getElementById('attendance-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('attendance-results').classList.add('hidden');
    document.getElementById('login-form').reset();
});

// Show Remove Students Page
document.getElementById('remove-students-btn').addEventListener('click', function() {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('remove-students-container').classList.remove('hidden');
    loadRemoveStudentList(10); // Default to Class 10
});

// Load Students for Remove Students Page
function loadRemoveStudentList(className) {
    const removeStudentList = document.getElementById('remove-student-list');
    removeStudentList.innerHTML = '';

    studentsByClass[className].forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('remove-student-item');
        studentItem.innerHTML = `
            <span>${student}</span>
            <button class="remove-btn" data-student="${student}">Remove</button>
        `;
        removeStudentList.appendChild(studentItem);
    });
}

// Remove Student from Class
document.getElementById('remove-student-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const studentName = event.target.dataset.student;
        const className = document.getElementById('class-select-remove').value;

        studentsByClass[className] = studentsByClass[className].filter(student => student !== studentName);
        loadRemoveStudentList(className);
    }
});

// Back to Main Menu from Remove Students Page
document.getElementById('back-to-main-menu').addEventListener('click', function() {
    document.getElementById('remove-students-container').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
});