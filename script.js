let currentUser = null;

// Hamburger menu toggle for admin access
function toggleHamburgerMenu() {
    const menu = document.getElementById('hamburger-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}
// Close hamburger menu when clicking outside
document.addEventListener('click', function (e) {
    const menu = document.getElementById('hamburger-menu');
    const btn = document.getElementById('hamburger-btn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// This object holds all the sample data for the application.
const mockData = {
    inventory: [
        { group: 'A+', units: 35, status: 'available' }, { group: 'A-', units: 12, status: 'low' },
        { group: 'B+', units: 28, status: 'available' }, { group: 'B-', units: 8, status: 'low' },
        { group: 'AB+', units: 15, status: 'available' }, { group: 'AB-', units: 4, status: 'critical' },
        { group: 'O+', units: 45, status: 'available' }, { group: 'O-', units: 22, status: 'available' },
    ],
    donors: [
        { id: 1, name: 'Atharv Gaikwad', email: 'atharv@email.com', group: 'A+', phone: '123-456-7890', lastDonation: '2025-07-15', totalDonations: 5 },
        { id: 2, name: 'Shreyash Shendage', email: 'shreyash.s@example.com', group: 'O-', phone: '987-654-3210', lastDonation: '2025-08-02', totalDonations: 8 },
        { id: 3, name: 'Dharam Pote', email: 'dharam.p@example.com', group: 'B+', phone: '555-123-4567', lastDonation: '2025-06-20', totalDonations: 3 },
        { id: 4, name: 'Om Shinde', email: 'om.s@example.com', group: 'AB+', phone: '555-987-6543', lastDonation: '2025-09-01', totalDonations: 12 },
    ],
    patients: [
        { id: 1, name: 'Shubham Hole', email: 'shubham@email.com', group: 'A-', phone: '876-543-2109' },
        { id: 2, name: 'Yshodeep Khatate', email: 'yshodeep.k@example.com', group: 'O+', phone: '765-432-1098' },
        { id: 3, name: 'Mangesh Darekar', email: 'mangesh.d@example.com', group: 'B-', phone: '654-321-0987' },
    ],
    requests: [
        { id: 1, patient: 'Shubham Hole', group: 'A-', units: 2, date: '2025-09-25', status: 'pending' },
        { id: 2, patient: 'Yshodeep Khatate', group: 'O+', units: 4, date: '2025-09-24', status: 'approved', approvalDate: '2025-09-24' },
        { id: 3, patient: 'Mangesh Darekar', group: 'B-', units: 1, date: '2025-09-22', status: 'rejected' },
    ],
    campaigns: [
        { id: 1, name: 'City Hall Blood Drive', location: 'Downtown Plaza', date: '2025-10-15', status: 'Upcoming', unitsCollected: 0 },
        { id: 2, name: 'Community Center Camp', location: 'Greenwood Park', date: '2025-08-10', status: 'Completed', unitsCollected: 52 },
    ],
    appointments: [
        { id: 1, date: '2025-10-02', location: 'Downtown Plaza', status: 'Confirmed', donor: 'atharv@email.com' },
    ],
    donationHistory: [
        { date: '2025-07-15', location: 'Central Hospital', units: 1, donor: 'atharv@email.com' },
        { date: '2025-08-02', location: 'Greenwood Park', units: 1, donor: 'shreyash.s@example.com' },
        { date: '2025-06-20', location: 'Central Hospital', units: 1, donor: 'dharam.p@example.com' },
        { date: '2025-09-01', location: 'Downtown Plaza', units: 1, donor: 'om.s@example.com' },
    ],
    trends: [
        { month: 'Mar', donations: 80, usage: 40 }, { month: 'Apr', donations: 81, usage: 19 },
        { month: 'May', donations: 56, usage: 86 }, { month: 'Jun', donations: 55, usage: 27 },
        { month: 'Jul', donations: 40, usage: 90 },
    ]
};

// --- AUTHENTICATION & PAGE ROUTING ---

function checkAuth(requiredRole) {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'index.html'; // Redirect if not logged in
        return;
    }
    currentUser = JSON.parse(userStr);
    // Role based restrictions
    if (requiredRole === 'admin' && currentUser.role !== 'admin') {
        alert('Access Denied!');
        logout();
    } else if (requiredRole === 'worker' && currentUser.role !== 'worker' && currentUser.role !== 'admin') {
        alert('Access Denied!');
        logout();
    } else if (requiredRole !== 'admin' && requiredRole !== 'worker' && (currentUser.role === 'admin' || currentUser.role === 'worker')) {
        alert('Access Denied!');
        logout();
    }
}

function initializeUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        users = [
            { email: 'admin@lifecare.com', password: 'password', role: 'admin', name: 'Admin', bloodBankName: 'Life Care Central' },
            { email: 'worker@lifecare.com', password: 'password', role: 'worker', name: 'Ramesh Patil', designation: 'Blood Bank Officer', phone: '998-877-6655' },
            { email: 'atharv@email.com', password: 'password', role: 'donor', name: 'Atharv Gaikwad', bloodGroup: 'A+', phone: '123-456-7890' },
            { email: 'shubham@email.com', password: 'password', role: 'patient', name: 'Shubham Hole', bloodGroup: 'A-', phone: '876-543-2109' },
            { email: 'user@lifecare.com', password: 'password', role: 'user', name: 'Demo User', bloodGroup: 'O+', phone: '555-000-1234' },
        ];
    }

    // Ensure default worker exists
    if (!users.some(u => u.role === 'worker')) {
        users.push({
            email: 'worker@lifecare.com',
            password: 'password',
            role: 'worker',
            name: 'Ramesh Patil',
            designation: 'Blood Bank Officer',
            phone: '998-877-6655'
        });
    }

    // Sync mockData donors into users list if missing
    mockData.donors.forEach(donor => {
        if (!users.some(u => u.email === donor.email)) {
            users.push({
                email: donor.email,
                password: 'password',
                role: 'donor',
                name: donor.name,
                bloodGroup: donor.group,
                phone: donor.phone
            });
        }
    });

    // Sync mockData patients into users list if missing
    mockData.patients.forEach(patient => {
        if (!users.some(u => u.email === patient.email)) {
            users.push({
                email: patient.email,
                password: 'password',
                role: 'patient',
                name: patient.name,
                bloodGroup: patient.group,
                phone: patient.phone
            });
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
}

function handleLogin(role, form) {
    initializeUsers();
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const errorEl = form.closest('.form-box').querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = null;
    if (role === 'admin') {
        user = users.find(u => u.email === email && u.role === 'admin');
    } else if (role === 'worker') {
        user = users.find(u => u.email === email && (u.role === 'worker' || u.role === 'admin'));
    } else {
        user = users.find(u => u.email === email && u.role !== 'admin' && u.role !== 'worker');
    }

    if (user && user.password === password) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = `${role}_dashboard.html`;
    } else {
        if (errorEl) errorEl.textContent = 'Invalid email or password.';
    }
}

function handleRegister(role, form) {
    const inputs = form.querySelectorAll('input, select');
    const errorEl = form.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';

    let newUser = { role };
    let password, confirmPassword;

    if (role === 'admin') {
        newUser.name = inputs[0].value;
        newUser.email = inputs[1].value;
        newUser.bloodBankName = inputs[2].value;
        password = inputs[3].value;
        confirmPassword = inputs[4].value;
    } else if (role === 'user') {
        newUser.name = inputs[0].value;
        newUser.email = inputs[1].value;
        newUser.bloodGroup = inputs[2].value;
        newUser.phone = inputs[3].value;
        password = inputs[4].value;
        confirmPassword = inputs[5].value;
    } else { // For donor and patient
        newUser.name = inputs[0].value;
        newUser.email = inputs[1].value;
        newUser.bloodGroup = inputs[2].value;
        password = inputs[3].value;
        confirmPassword = inputs[4].value;
    }

    if (password !== confirmPassword) {
        if (errorEl) errorEl.textContent = 'Passwords do not match.';
        return;
    }
    newUser.password = password;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === newUser.email && u.role === newUser.role)) {
        if (errorEl) errorEl.textContent = 'An account with this email already exists.';
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration Successful! You can now log in.');
    toggleRegister(false); // Switch back to login view
}

function logout() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    sessionStorage.removeItem('currentUser');
    if (user && user.role === 'user') {
        window.location.href = 'user_login.html';
    } else if (user && user.role === 'worker') {
        window.location.href = 'worker_login.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Navigate from user dashboard to a specific portal
function navigateToPortal(portalType) {
    // The user is already authenticated; just redirect
    window.location.href = `${portalType}_dashboard.html`;
}

// Render the user dashboard hub page
function renderUserDashboard() {
    if (!currentUser) return;

    // Welcome message
    document.getElementById('user-welcome-name').textContent = `Welcome, ${currentUser.name}!`;

    // Profile details
    const profileEl = document.getElementById('user-profile-details');
    if (profileEl) {
        profileEl.innerHTML = `
            <div class="user-profile-item">
                <span class="user-profile-label">Full Name</span>
                <span class="user-profile-value">${currentUser.name}</span>
            </div>
            <div class="user-profile-item">
                <span class="user-profile-label">Email</span>
                <span class="user-profile-value">${currentUser.email}</span>
            </div>
            <div class="user-profile-item">
                <span class="user-profile-label">Blood Group</span>
                <span class="user-profile-value"><span class="status-badge status-available">${currentUser.bloodGroup || 'N/A'}</span></span>
            </div>
            <div class="user-profile-item">
                <span class="user-profile-label">Phone</span>
                <span class="user-profile-value">${currentUser.phone || 'Not provided'}</span>
            </div>
            <div class="user-profile-item">
                <span class="user-profile-label">Account Type</span>
                <span class="user-profile-value">User (Donor + Patient)</span>
            </div>
        `;
    }

    // Quick stats
    const statsEl = document.getElementById('user-quick-stats');
    const myDonations = mockData.donationHistory.filter(h => h.donor === currentUser.email);
    const myRequests = mockData.requests.filter(r => r.patient === currentUser.name);
    const myAppointments = mockData.appointments.filter(a => a.donor === currentUser.email);
    const upcomingCamps = mockData.campaigns.filter(c => c.status === 'Upcoming');

    if (statsEl) {
        statsEl.innerHTML = `
            <div class="card kpi-card"><div class="card-body"><h3>My Donations</h3><p>${myDonations.length}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>My Requests</h3><p>${myRequests.length}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>Appointments</h3><p>${myAppointments.length}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>Upcoming Camps</h3><p>${upcomingCamps.length}</p></div></div>
        `;
    }

    // Recent activity - combine donations and requests
    const activityEl = document.getElementById('user-recent-activity');
    if (activityEl) {
        let activities = [];
        myDonations.forEach(d => activities.push({ date: d.date, type: 'Donation', detail: d.location, status: 'completed' }));
        myRequests.forEach(r => activities.push({ date: r.date, type: 'Blood Request', detail: `${r.units} units (${r.group})`, status: r.status }));
        myAppointments.forEach(a => activities.push({ date: a.date, type: 'Appointment', detail: a.location, status: a.status.toLowerCase() }));
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));

        const activityHeaders = [
            { key: 'date', label: 'Date' },
            { key: 'type', label: 'Type' },
            { key: 'detail', label: 'Details' },
            { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }
        ];
        activityEl.innerHTML = createTable(activities, activityHeaders);
    }
}

// --- LOGIN PAGE UI FUNCTIONS ---

function toggleRegister(showRegister) {
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (showRegister) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

// --- ADMIN DASHBOARD UI FUNCTIONS ---

function showAdminSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.admin-nav-link').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.admin-nav-link[onclick="showAdminSection('${sectionId}')"]`).classList.add('active');
    const sidebar = document.getElementById('admin-sidebar');
    if (window.innerWidth < 768 && sidebar) sidebar.classList.remove('open');
}

function showModal() {
    document.getElementById('main-modal').classList.add('visible');
}

function hideModal() {
    document.getElementById('main-modal').classList.remove('visible');
}

// --- DATA RENDERING & TABLE CREATION ---

function createTable(data, headers) {
    let table = '<table><thead><tr>';
    headers.forEach(h => table += `<th>${h.label}</th>`);
    table += '</tr></thead><tbody>';
    if (data.length === 0) {
        table += `<tr><td colspan="${headers.length}" style="text-align:center; padding:1.5rem;">No data available.</td></tr>`;
    } else {
        data.forEach(row => {
            table += '<tr>';
            headers.forEach(h => {
                let value = row[h.key];
                if (h.render) value = h.render(row);
                table += `<td>${value || ''}</td>`;
            });
            table += '</tr>';
        });
    }
    table += '</tbody></table>';
    return table;
}

function renderAdminDashboard() {
    // KPI Cards
    const totalUnits = mockData.inventory.reduce((sum, item) => sum + item.units, 0);
    const pendingRequests = mockData.requests.filter(r => r.status === 'pending').length;
    document.getElementById('admin-kpi-cards').innerHTML = `<div class="card kpi-card"><div class="card-body"><h3>Total Units</h3><p>${totalUnits}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Pending Requests</h3><p>${pendingRequests}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Registered Donors</h3><p>${mockData.donors.length}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Campaigns</h3><p>${mockData.campaigns.length}</p></div></div>`;

    // Main Dashboard Tables
    const inventoryHeaders = [{ key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    document.getElementById('dashboard-inventory-table').innerHTML = createTable(mockData.inventory, inventoryHeaders);
    const trendsHeaders = [{ key: 'month', label: 'Month' }, { key: 'donations', label: 'Donations (Units)' }, { key: 'usage', label: 'Usage (Units)' }];
    document.getElementById('dashboard-trends-table').innerHTML = createTable(mockData.trends, trendsHeaders);

    // Inventory Page Table
    document.getElementById('admin-inventory-table').innerHTML = createTable(mockData.inventory, inventoryHeaders);

    // Requests Page Table
    const requestHeaders = [{ key: 'patient', label: 'Patient' }, { key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'date', label: 'Date' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }, { key: 'actions', label: 'Actions', render: (row) => row.status === 'pending' ? `<div style="display:flex; gap:0.5rem;"><button class="action-btn approve" onclick="handleRequestAction(${row.id}, 'approved')">Approve</button><button class="action-btn reject" onclick="handleRequestAction(${row.id}, 'rejected')">Reject</button></div>` : 'N/A' }];
    document.getElementById('admin-requests-table').innerHTML = createTable(mockData.requests, requestHeaders);

    // Management Page Tables
    const patientInfoHeaders = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'group', label: 'Blood Group' }, { key: 'phone', label: 'Contact' }];
    document.getElementById('admin-patients-info-table').innerHTML = createTable(mockData.patients, patientInfoHeaders);
    const donorInfoHeaders = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'group', label: 'Blood Group' }, { key: 'phone', label: 'Contact' }];
    document.getElementById('admin-donors-info-table').innerHTML = createTable(mockData.donors, donorInfoHeaders);
    const donorHistoryHeaders = [{ key: 'name', label: 'Donor Name' }, { key: 'group', label: 'Blood Group' }, { key: 'lastDonation', label: 'Last Donation' }, { key: 'totalDonations', label: 'Total Donations' }];
    document.getElementById('admin-donors-history-table').innerHTML = createTable(mockData.donors, donorHistoryHeaders);

    // User Management Table
    initializeUsers();
    const usersList = JSON.parse(localStorage.getItem('users')) || [];
    const usersHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'password', label: 'Password' },
        { key: 'role', label: 'Role', render: (row) => `<span class="status-badge status-upcoming" style="text-transform:capitalize;">${row.role}</span>` },
        { key: 'bloodGroup', label: 'Blood Group', render: (row) => row.bloodGroup || 'N/A' },
        { key: 'phone', label: 'Contact', render: (row) => row.phone || 'N/A' },
        { key: 'bloodBankName', label: 'Blood Bank', render: (row) => row.bloodBankName || 'N/A' }
    ];
    const usersTableEl = document.getElementById('admin-users-table');
    if (usersTableEl) {
        usersTableEl.innerHTML = createTable(usersList, usersHeaders);
    }

    // Campaigns Page Table
    const campaignHeaders = [{ key: 'name', label: 'Name' }, { key: 'location', label: 'Location' }, { key: 'date', label: 'Date' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status.toLowerCase()}">${row.status}</span>` }];
    document.getElementById('admin-campaigns-table').innerHTML = createTable(mockData.campaigns, campaignHeaders);

    // Reports Page Tables
    const approvedRequests = mockData.requests.filter(r => r.status === 'approved');
    const requestApprovalData = approvedRequests.map(req => {
        const patient = mockData.patients.find(p => p.name === req.patient);
        return {
            patientName: req.patient,
            email: patient ? patient.email : 'N/A',
            group: req.group,
            units: req.units,
            phone: patient ? patient.phone : 'N/A',
            requestDate: req.date,
            approvalDate: req.approvalDate || req.date,
            status: req.status
        };
    });
    const requestApprovalHeaders = [
        { key: 'patientName', label: 'Patient Name' },
        { key: 'email', label: 'Email' },
        { key: 'group', label: 'Blood Group' },
        { key: 'units', label: 'Units Approved' },
        { key: 'phone', label: 'Contact' },
        { key: 'requestDate', label: 'Request Date' },
        { key: 'approvalDate', label: 'Approval Date' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }
    ];
    const reportApprovalEl = document.getElementById('report-request-approval-table');
    if (reportApprovalEl) {
        reportApprovalEl.innerHTML = createTable(requestApprovalData, requestApprovalHeaders);
    }

    const donationLogData = mockData.donationHistory.map(log => {
        const donor = mockData.donors.find(d => d.email === log.donor);
        return {
            ...log,
            donorName: donor ? donor.name : 'Unknown'
        };
    });
    const donationLogHeaders = [{ key: 'donorName', label: 'Donor Name' }, { key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'units', label: 'Units Donated' }];
    document.getElementById('report-donation-log-table').innerHTML = createTable(donationLogData, donationLogHeaders);

    const campaignSummaryHeaders = [{ key: 'name', label: 'Campaign Name' }, { key: 'date', label: 'Date' }, { key: 'status', label: 'Status' }, { key: 'unitsCollected', label: 'Units Collected' }];
    document.getElementById('report-campaign-summary-table').innerHTML = createTable(mockData.campaigns, campaignSummaryHeaders);
}

function renderPatientDashboard() {
    document.getElementById('patient-welcome-message').textContent = `Welcome, ${currentUser.name}!`;
    const inventoryHeaders = [{ key: 'group', label: 'Blood Group' }, { key: 'status', label: 'Availability', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    document.getElementById('patient-inventory-table').innerHTML = createTable(mockData.inventory, inventoryHeaders);
    const requestHeaders = [{ key: 'date', label: 'Date' }, { key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    const myRequests = mockData.requests.filter(r => r.patient === currentUser.name);
    document.getElementById('patient-requests-table').innerHTML = createTable(myRequests, requestHeaders);
}

function renderDonorDashboard() {
    document.getElementById('donor-welcome-message').textContent = `Welcome, ${currentUser.name}!`;
    document.getElementById('donor-health-info').innerHTML = `<div><strong>Blood Type:</strong> <span style="color:var(--primary-color); font-weight:700;">${currentUser.bloodGroup}</span></div><div><strong>Last Iron Level:</strong> 14.2 g/dL</div><div><strong>Last Blood Pressure:</strong> 120/80 mmHg</div>`;
    const historyHeaders = [{ key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'units', label: 'Units Donated' }];
    const myHistory = mockData.donationHistory.filter(h => h.donor === currentUser.email);
    document.getElementById('donor-history-table').innerHTML = createTable(myHistory, historyHeaders);
    const campaignHeaders = [{ key: 'name', label: 'Campaign' }, { key: 'location', label: 'Location' }, { key: 'date', label: 'Date' }];
    document.getElementById('donor-campaigns-table').innerHTML = createTable(mockData.campaigns.filter(c => c.status === 'Upcoming'), campaignHeaders);
    const appointmentHeaders = [{ key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-approved">${row.status}</span>` }];
    const myAppointments = mockData.appointments.filter(a => a.donor === currentUser.email);
    document.getElementById('donor-appointments-table').innerHTML = createTable(myAppointments, appointmentHeaders);
}

// --- DYNAMIC ACTIONS & FORM HANDLING ---

function handleRequestAction(requestId, newStatus) {
    const request = mockData.requests.find(r => r.id === requestId);
    if (request) {
        request.status = newStatus;
        if (newStatus === 'approved') {
            request.approvalDate = new Date().toISOString().split('T')[0];
        }
        renderAdminDashboard();
    }
}

function handleAddCampaign(event) {
    event.preventDefault();
    const form = event.target;
    const newCampaign = { id: mockData.campaigns.length + 1, name: form.name.value, location: form.location.value, date: form.date.value, status: 'Upcoming', unitsCollected: 0 };
    mockData.campaigns.push(newCampaign);
    form.reset();
    hideModal();
    renderAdminDashboard();
}

function handleAddDonor(event) {
    event.preventDefault();
    const form = event.target;

    // Check if a donor with the same email already exists to prevent duplicates.
    if (mockData.donors.some(d => d.email === form.email.value)) {
        alert('A donor with this email already exists.');
        return;
    }

    const newDonor = {
        id: mockData.donors.length + 1,
        name: form.name.value,
        email: form.email.value,
        group: form.group.value,
        phone: form.phone.value,
        lastDonation: form.lastDonation.value,
        totalDonations: parseInt(form.totalDonations.value, 10)
    };
    mockData.donors.push(newDonor);

    // Also create a corresponding record in the donation history log.
    mockData.donationHistory.push({
        date: form.lastDonation.value,
        location: 'Admin Manual Entry',
        units: parseInt(form.totalDonations.value, 10),
        donor: form.email.value
    });

    // Also register user in users list so they appear in User Management
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(u => u.email === newDonor.email)) {
        users.push({
            email: newDonor.email,
            password: 'password',
            role: 'donor',
            name: newDonor.name,
            bloodGroup: newDonor.group,
            phone: newDonor.phone
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    form.reset();
    renderAdminDashboard(); // Re-render all admin tables to reflect the new data.
    alert('New donor added successfully!');
}

function handleAddPatient(event) {
    event.preventDefault();
    const form = event.target;

    // Check if a patient with the same email already exists to prevent duplicates.
    if (mockData.patients.some(p => p.email === form.email.value)) {
        alert('A patient with this email already exists.');
        return;
    }

    const newPatient = {
        id: mockData.patients.length + 1,
        name: form.name.value,
        email: form.email.value,
        group: form.group.value,
        phone: form.phone.value
    };
    mockData.patients.push(newPatient);

    // Optionally register user in users list so they can log in if needed
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(u => u.email === newPatient.email)) {
        users.push({
            email: newPatient.email,
            password: 'password',
            role: 'patient',
            name: newPatient.name,
            bloodGroup: newPatient.group,
            phone: newPatient.phone
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    form.reset();
    renderAdminDashboard(); // Re-render all admin tables to reflect the new data.
    alert('New patient added successfully!');
}

function handlePatientRequest(event) {
    event.preventDefault();
    if (!currentUser) return;
    const form = event.target;
    const newRequest = { id: mockData.requests.length + 1, patient: currentUser.name, group: form.group.value, units: parseInt(form.units.value), date: new Date().toISOString().split('T')[0], status: 'pending' };
    mockData.requests.push(newRequest);
    form.reset();
    renderPatientDashboard();
    alert('Your blood request has been submitted.');
}

function handleAppointmentSubmit(event) {
    event.preventDefault();
    if (!currentUser) return;
    const form = event.target;
    const newAppointment = { id: mockData.appointments.length + 1, date: form.date.value, location: form.location.value, status: 'Confirmed', donor: currentUser.email };
    mockData.appointments.push(newAppointment);
    form.reset();
    renderDonorDashboard();
    alert('Your donation appointment has been confirmed.');
}

function exportUsersToExcel() {
    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel encoding
    csvContent += "Full Name,Email Address,Password,Role,Blood Group,Phone Number,Blood Bank Name\n";
    
    users.forEach(user => {
        const name = `"${(user.name || '').replace(/"/g, '""')}"`;
        const email = `"${(user.email || '').replace(/"/g, '""')}"`;
        const password = `"${(user.password || '').replace(/"/g, '""')}"`;
        const role = `"${(user.role || '').replace(/"/g, '""')}"`;
        const bloodGroup = `"${(user.bloodGroup || 'N/A').replace(/"/g, '""')}"`;
        const phone = `"${(user.phone || 'N/A').replace(/"/g, '""')}"`;
        const bloodBankName = `"${(user.bloodBankName || 'N/A').replace(/"/g, '""')}"`;
        
        csvContent += `${name},${email},${password},${role},${bloodGroup},${phone},${bloodBankName}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Users_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- WORKER DASHBOARD FUNCTIONS ---

function showWorkerSection(sectionId) {
    document.querySelectorAll('.worker-section').forEach(section => section.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    document.querySelectorAll('.worker-nav-link').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.querySelector(`.worker-nav-link[onclick="showWorkerSection('${sectionId}')"]`);
    if (activeNav) activeNav.classList.add('active');
    const sidebar = document.getElementById('worker-sidebar');
    if (window.innerWidth < 768 && sidebar) sidebar.classList.remove('open');
}

function renderWorkerDashboard() {
    if (!currentUser) return;

    // Worker profile display in sidebar & banner
    const workerNameEl = document.getElementById('worker-user-name');
    if (workerNameEl) workerNameEl.textContent = currentUser.name || 'Staff Member';
    const workerDesigEl = document.getElementById('worker-user-designation');
    if (workerDesigEl) workerDesigEl.textContent = currentUser.designation || 'Blood Bank Staff';
    const workerTitleEl = document.getElementById('worker-welcome-title');
    if (workerTitleEl) workerTitleEl.textContent = `Welcome, ${currentUser.name}!`;

    // Users & Stats
    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const workers = users.filter(u => u.role === 'worker');
    const totalUnits = mockData.inventory.reduce((sum, item) => sum + item.units, 0);
    const pendingRequests = mockData.requests.filter(r => r.status === 'pending').length;
    const upcomingCamps = mockData.campaigns.filter(c => c.status === 'Upcoming').length;

    // KPI Cards
    const kpiContainer = document.getElementById('worker-kpi-cards');
    if (kpiContainer) {
        kpiContainer.innerHTML = `
            <div class="card kpi-card"><div class="card-body"><h3>Total Blood Units</h3><p>${totalUnits}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>Pending Requests</h3><p style="color:#EF6C00;">${pendingRequests}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>Upcoming Camps</h3><p style="color:#1976D2;">${upcomingCamps}</p></div></div>
            <div class="card kpi-card"><div class="card-body"><h3>Staff Workers</h3><p>${workers.length}</p></div></div>
        `;
    }

    // Inventory Tables
    const inventoryHeaders = [
        { key: 'group', label: 'Blood Group' },
        { key: 'units', label: 'Available Units' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` },
        { key: 'actions', label: 'Quick Adjust', render: (row) => `
            <div style="display:flex; gap:0.4rem;">
                <button class="action-btn" onclick="handleWorkerQuickStock('${row.group}', 1)" title="Add 1 unit" style="font-weight:700; color:var(--success-color);">+1</button>
                <button class="action-btn" onclick="handleWorkerQuickStock('${row.group}', -1)" title="Deduct 1 unit" style="font-weight:700; color:var(--primary-color);">-1</button>
            </div>
        ` }
    ];
    const dashboardInvEl = document.getElementById('worker-dashboard-inventory-table');
    if (dashboardInvEl) dashboardInvEl.innerHTML = createTable(mockData.inventory, inventoryHeaders);
    const workerInvEl = document.getElementById('worker-inventory-table');
    if (workerInvEl) workerInvEl.innerHTML = createTable(mockData.inventory, inventoryHeaders);

    // Requests Table
    const requestHeaders = [
        { key: 'patient', label: 'Patient Name' },
        { key: 'group', label: 'Blood Group' },
        { key: 'units', label: 'Units' },
        { key: 'date', label: 'Requested Date' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` },
        { key: 'actions', label: 'Actions', render: (row) => row.status === 'pending' ? `
            <div style="display:flex; gap:0.5rem;">
                <button class="action-btn approve" onclick="handleWorkerRequestAction(${row.id}, 'approved')">Approve</button>
                <button class="action-btn reject" onclick="handleWorkerRequestAction(${row.id}, 'rejected')">Reject</button>
            </div>
        ` : (row.approvalDate ? `<span style="font-size:0.8rem; color:#757575;">Date: ${row.approvalDate}</span>` : 'N/A') }
    ];
    const workerRequestsEl = document.getElementById('worker-requests-table');
    if (workerRequestsEl) workerRequestsEl.innerHTML = createTable(mockData.requests, requestHeaders);

    // Upcoming Campaigns Table
    const upcomingCampaigns = mockData.campaigns.filter(c => c.status === 'Upcoming');
    const upcomingCampaignHeaders = [
        { key: 'name', label: 'Campaign Name' },
        { key: 'location', label: 'Location' },
        { key: 'date', label: 'Scheduled Date' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-upcoming">${row.status}</span>` },
        { key: 'actions', label: 'Action', render: (row) => `
            <button class="action-btn complete" onclick="handleCompleteCampaign(${row.id})">Mark as Completed</button>
        ` }
    ];
    const upcomingCampEl = document.getElementById('worker-upcoming-campaigns-table');
    if (upcomingCampEl) upcomingCampEl.innerHTML = createTable(upcomingCampaigns, upcomingCampaignHeaders);

    // Completed Campaigns Table
    const completedCampaigns = mockData.campaigns.filter(c => c.status === 'Completed');
    const completedCampaignHeaders = [
        { key: 'name', label: 'Campaign Name' },
        { key: 'location', label: 'Location' },
        { key: 'date', label: 'Date Completed' },
        { key: 'unitsCollected', label: 'Units Collected', render: (row) => `<strong>${row.unitsCollected || 0} units</strong>` },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-completed">${row.status}</span>` }
    ];
    const completedCampEl = document.getElementById('worker-completed-campaigns-table');
    if (completedCampEl) completedCampEl.innerHTML = createTable(completedCampaigns, completedCampaignHeaders);

    // Worker Directory Table
    const workerHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'password', label: 'Password' },
        { key: 'designation', label: 'Designation / Role', render: (row) => `<span class="status-badge status-available">${row.designation || 'Blood Bank Staff'}</span>` },
        { key: 'phone', label: 'Contact Phone', render: (row) => row.phone || 'N/A' }
    ];
    const workerDirEl = document.getElementById('worker-directory-table');
    if (workerDirEl) workerDirEl.innerHTML = createTable(workers, workerHeaders);
}

function handleWorkerStockUpdate(event) {
    event.preventDefault();
    const form = event.target;
    const group = form.group.value;
    const actionType = form.actionType.value;
    const units = parseInt(form.units.value, 10);
    const notes = form.notes ? form.notes.value : '';

    const item = mockData.inventory.find(i => i.group === group);
    if (!item) return;

    if (actionType === 'add') {
        item.units += units;
    } else {
        if (item.units < units) {
            alert(`Cannot deduct ${units} units. Only ${item.units} units of ${group} are currently in stock.`);
            return;
        }
        item.units -= units;
    }

    // Recalculate status
    if (item.units >= 20) item.status = 'available';
    else if (item.units >= 10) item.status = 'low';
    else item.status = 'critical';

    form.reset();
    renderWorkerDashboard();
    alert(`Blood stock for ${group} updated successfully! Current units: ${item.units}`);
}

function handleWorkerQuickStock(group, delta) {
    const item = mockData.inventory.find(i => i.group === group);
    if (!item) return;

    if (delta < 0 && item.units <= 0) {
        alert(`No units of ${group} available to deduct.`);
        return;
    }

    item.units += delta;
    if (item.units >= 20) item.status = 'available';
    else if (item.units >= 10) item.status = 'low';
    else item.status = 'critical';

    renderWorkerDashboard();
}

function handleWorkerRequestAction(requestId, status) {
    const request = mockData.requests.find(r => r.id === requestId);
    if (!request) return;

    if (status === 'approved') {
        const item = mockData.inventory.find(i => i.group === request.group);
        if (item && item.units < request.units) {
            const proceed = confirm(`Warning: Available stock of ${request.group} is ${item.units} units, but request is for ${request.units} units. Proceed with approval?`);
            if (!proceed) return;
        }
        if (item && item.units >= request.units) {
            item.units -= request.units;
            if (item.units >= 20) item.status = 'available';
            else if (item.units >= 10) item.status = 'low';
            else item.status = 'critical';
        }
        request.status = 'approved';
        request.approvalDate = new Date().toISOString().split('T')[0];
        alert(`Request for ${request.patient} (${request.units} units of ${request.group}) approved successfully!`);
    } else {
        request.status = 'rejected';
        alert(`Request for ${request.patient} rejected.`);
    }

    renderWorkerDashboard();
}

function handleWorkerAddCampaign(event) {
    event.preventDefault();
    const form = event.target;
    const newCamp = {
        id: mockData.campaigns.length + 1,
        name: form.name.value,
        location: form.location.value,
        date: form.date.value,
        status: 'Upcoming',
        unitsCollected: 0
    };
    mockData.campaigns.push(newCamp);
    form.reset();
    renderWorkerDashboard();
    alert(`Campaign "${newCamp.name}" scheduled successfully!`);
}

function handleCompleteCampaign(campaignId) {
    const camp = mockData.campaigns.find(c => c.id === campaignId);
    if (!camp) return;

    const unitsStr = prompt(`Enter total blood units collected during "${camp.name}":`, "35");
    if (unitsStr === null) return; // User cancelled

    const collectedUnits = parseInt(unitsStr, 10) || 0;
    camp.status = 'Completed';
    camp.unitsCollected = collectedUnits;

    renderWorkerDashboard();
    alert(`Campaign "${camp.name}" marked as Completed with ${collectedUnits} units collected!`);
}

function handleAddWorker(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const designation = form.designation.value;
    const phone = form.phone.value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        alert('A user with this email address already exists.');
        return;
    }

    users.push({
        name,
        email,
        password,
        role: 'worker',
        designation,
        phone
    });
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    renderWorkerDashboard();
    alert(`New staff member "${name}" registered successfully! They can now log in using ${email}.`);
}

// --- EVENT LISTENERS & INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // Determine the current page type
    const isDashboard = document.body.id.includes('_dashboard');
    const isLoginPage = window.location.pathname.includes('_login.html');

    if (isDashboard) {
        const role = document.body.id.split('_')[0]; // e.g., 'admin', 'worker'
        checkAuth(role);
        if (role === 'admin') {
            renderAdminDashboard();
            showAdminSection('admin-dashboard-main');
            document.getElementById('admin-menu-btn').addEventListener('click', () => {
                document.getElementById('admin-sidebar').classList.toggle('open');
            });
        } else if (role === 'worker') {
            renderWorkerDashboard();
            showWorkerSection('worker-dashboard-main');
            const workerMenuBtn = document.getElementById('worker-menu-btn');
            if (workerMenuBtn) {
                workerMenuBtn.addEventListener('click', () => {
                    document.getElementById('worker-sidebar').classList.toggle('open');
                });
            }
        } else if (role === 'user') {
            renderUserDashboard();
        } else if (role === 'patient') {
            renderPatientDashboard();
        } else if (role === 'donor') {
            renderDonorDashboard();
        }
    } else if (isLoginPage) {
        initializeUsers();
    } else { // For index.html
        initializeUsers();
    }
});
