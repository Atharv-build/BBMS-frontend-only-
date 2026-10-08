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

// Portal Switcher toggle (for Admin & Worker dashboards)
function togglePortalSwitcher() {
    const menu = document.getElementById('portal-switcher-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}
// Close portal switcher when clicking outside
document.addEventListener('click', function (e) {
    const menu = document.getElementById('portal-switcher-menu');
    const btn = document.getElementById('portal-switcher-btn');
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
    ],
    destinations: [
        {
            id: 1,
            name: 'Central General Hospital',
            type: 'Hospital',
            city: 'Downtown Metro',
            contactPerson: 'Dr. Anita Roy',
            phone: '555-112-2334',
            address: '101 Healthcare Blvd, Central City'
        },
        {
            id: 2,
            name: 'Metro Trauma Center',
            type: 'Trauma Center',
            city: 'North District',
            contactPerson: 'Dr. Rajesh Sharma',
            phone: '555-223-3445',
            address: '45 Emergency Express Way, North District'
        },
        {
            id: 3,
            name: 'Sunrise Children & Maternity Clinic',
            type: 'Specialty Clinic',
            city: 'East Wing',
            contactPerson: 'Dr. Sunita Deshmukh',
            phone: '555-334-4556',
            address: '89 Hope Street, East Wing'
        },
        {
            id: 4,
            name: 'St. Jude Emergency Hospital',
            type: 'Hospital',
            city: 'South Zone',
            contactPerson: 'Dr. Kevin Mehta',
            phone: '555-445-5667',
            address: '12 Mercy Ave, South Zone'
        }
    ],
    destinationFlows: [
        // Central General Hospital
        { id: 1, destinationId: 1, type: 'request', patient: 'Shubham Hole', group: 'A-', units: 2, date: '2025-09-25', status: 'pending', notes: 'Emergency surgery dispatch' },
        { id: 2, destinationId: 1, type: 'request', patient: 'Yshodeep Khatate', group: 'O+', units: 4, date: '2025-09-24', status: 'approved', approvalDate: '2025-09-24', notes: 'Orthopedic replacement' },
        { id: 3, destinationId: 1, type: 'donation', donor: 'Atharv Gaikwad', group: 'A+', units: 3, date: '2025-07-15', status: 'completed', notes: 'Hospital voluntary drive' },
        { id: 4, destinationId: 1, type: 'donation', donor: 'Om Shinde', group: 'AB+', units: 4, date: '2025-09-01', status: 'completed', notes: 'Blood camp donation run' },
        { id: 5, destinationId: 1, type: 'request', patient: 'Karan Joshi', group: 'B+', units: 3, date: '2025-09-18', status: 'approved', approvalDate: '2025-09-19', notes: 'Cardiac unit' },
        { id: 6, destinationId: 1, type: 'request', patient: 'Pooja Nair', group: 'O-', units: 2, date: '2025-09-10', status: 'rejected', notes: 'Cross-match mismatch' },

        // Metro Trauma Center
        { id: 7, destinationId: 2, type: 'request', patient: 'Mangesh Darekar', group: 'B-', units: 1, date: '2025-09-22', status: 'rejected', notes: 'Dispatched from alternate branch' },
        { id: 8, destinationId: 2, type: 'request', patient: 'Amit Kulkarni', group: 'O-', units: 5, date: '2025-09-20', status: 'approved', approvalDate: '2025-09-20', notes: 'Trauma accident ICU' },
        { id: 9, destinationId: 2, type: 'donation', donor: 'Shreyash Shendage', group: 'O-', units: 2, date: '2025-08-02', status: 'completed', notes: 'Direct trauma replenishment' },
        { id: 10, destinationId: 2, type: 'donation', donor: 'Dharam Pote', group: 'B+', units: 2, date: '2025-06-20', status: 'completed', notes: 'Emergency staff drive' },
        { id: 11, destinationId: 2, type: 'request', patient: 'Neha Sharma', group: 'A+', units: 4, date: '2025-09-15', status: 'approved', approvalDate: '2025-09-16', notes: 'Neuro-surgery dispatch' },

        // Sunrise Children & Maternity Clinic
        { id: 12, destinationId: 3, type: 'request', patient: 'Sneha Tambe', group: 'AB-', units: 2, date: '2025-09-27', status: 'pending', notes: 'Pediatric transfusion' },
        { id: 13, destinationId: 3, type: 'request', patient: 'Aarav Patel', group: 'A+', units: 2, date: '2025-09-12', status: 'approved', approvalDate: '2025-09-12', notes: 'Postnatal ICU' },
        { id: 14, destinationId: 3, type: 'donation', donor: 'Vikas Mane', group: 'O+', units: 5, date: '2025-08-15', status: 'completed', notes: 'Community mothers drive' },
        { id: 15, destinationId: 3, type: 'request', patient: 'Geeta Shinde', group: 'B+', units: 1, date: '2025-09-05', status: 'rejected', notes: 'Transferred to general ward' },

        // St. Jude Emergency Hospital
        { id: 16, destinationId: 4, type: 'request', patient: 'Rohan Gupta', group: 'O+', units: 3, date: '2025-09-26', status: 'approved', approvalDate: '2025-09-26', notes: 'Emergency surgical ward' },
        { id: 17, destinationId: 4, type: 'request', patient: 'Vandana Salve', group: 'A-', units: 2, date: '2025-09-19', status: 'pending', notes: 'Kidney transplant backup' },
        { id: 18, destinationId: 4, type: 'donation', donor: 'Deepak More', group: 'AB-', units: 2, date: '2025-07-28', status: 'completed', notes: 'Voluntary blood run' },
        { id: 19, destinationId: 4, type: 'donation', donor: 'Suresh Patil', group: 'B-', units: 3, date: '2025-08-14', status: 'completed', notes: 'Annual donation camp' }
    ]
};

// --- CENTRALIZED DATA PERSISTENCE (LIVE INVENTORY) ---
// All data is stored in localStorage so changes made by any portal
// (Admin, Worker, Patient, Donor) are reflected everywhere.

function initializeData() {
    // Seed localStorage from mockData if not already present.
    const keys = ['inventory', 'donors', 'patients', 'requests', 'campaigns',
        'appointments', 'donationHistory', 'trends'];
    keys.forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(mockData[key]));
        }
    });
}

// --- Getter helpers: always read from localStorage ---
function getInventory() {
    const stored = localStorage.getItem('inventory');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('inventory', JSON.stringify(mockData.inventory));
    return JSON.parse(JSON.stringify(mockData.inventory));
}

function getDonors() {
    const stored = localStorage.getItem('donors');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('donors', JSON.stringify(mockData.donors));
    return JSON.parse(JSON.stringify(mockData.donors));
}

function getPatients() {
    const stored = localStorage.getItem('patients');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('patients', JSON.stringify(mockData.patients));
    return JSON.parse(JSON.stringify(mockData.patients));
}

function getRequests() {
    const stored = localStorage.getItem('requests');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('requests', JSON.stringify(mockData.requests));
    return JSON.parse(JSON.stringify(mockData.requests));
}

function getCampaigns() {
    const stored = localStorage.getItem('campaigns');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('campaigns', JSON.stringify(mockData.campaigns));
    return JSON.parse(JSON.stringify(mockData.campaigns));
}

function getAppointments() {
    const stored = localStorage.getItem('appointments');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('appointments', JSON.stringify(mockData.appointments));
    return JSON.parse(JSON.stringify(mockData.appointments));
}

function getDonationHistory() {
    const stored = localStorage.getItem('donationHistory');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('donationHistory', JSON.stringify(mockData.donationHistory));
    return JSON.parse(JSON.stringify(mockData.donationHistory));
}

function getTrends() {
    const stored = localStorage.getItem('trends');
    if (stored) { try { return JSON.parse(stored); } catch (e) { } }
    localStorage.setItem('trends', JSON.stringify(mockData.trends));
    return JSON.parse(JSON.stringify(mockData.trends));
}

// --- Setter helpers: persist changes to localStorage ---
function saveInventory(data) { localStorage.setItem('inventory', JSON.stringify(data)); }
function saveDonors(data) { localStorage.setItem('donors', JSON.stringify(data)); }
function savePatients(data) { localStorage.setItem('patients', JSON.stringify(data)); }
function saveRequests(data) { localStorage.setItem('requests', JSON.stringify(data)); }
function saveCampaigns(data) { localStorage.setItem('campaigns', JSON.stringify(data)); }
function saveAppointments(data) { localStorage.setItem('appointments', JSON.stringify(data)); }
function saveDonationHistory(data) { localStorage.setItem('donationHistory', JSON.stringify(data)); }
function saveTrends(data) { localStorage.setItem('trends', JSON.stringify(data)); }

// Recalculate inventory status thresholds after any stock change
function recalcInventoryStatus(inventory) {
    inventory.forEach(item => {
        if (item.units >= 20) item.status = 'available';
        else if (item.units >= 10) item.status = 'low';
        else item.status = 'critical';
    });
    return inventory;
}

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
    initializeData(); // Seed all data collections into localStorage
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
    const myDonations = getDonationHistory().filter(h => h.donor === currentUser.email);
    const myRequests = getRequests().filter(r => r.patient === currentUser.name);
    const myAppointments = getAppointments().filter(a => a.donor === currentUser.email);
    const upcomingCamps = getCampaigns().filter(c => c.status === 'Upcoming');

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
    // Read all data from persistent localStorage
    const inventory = getInventory();
    const requests = getRequests();
    const donors = getDonors();
    const patients = getPatients();
    const campaigns = getCampaigns();
    const trends = getTrends();
    const donationHistory = getDonationHistory();

    // KPI Cards
    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    document.getElementById('admin-kpi-cards').innerHTML = `<div class="card kpi-card"><div class="card-body"><h3>Total Units</h3><p>${totalUnits}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Pending Requests</h3><p>${pendingRequests}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Registered Donors</h3><p>${donors.length}</p></div></div><div class="card kpi-card"><div class="card-body"><h3>Campaigns</h3><p>${campaigns.length}</p></div></div>`;

    // Main Dashboard Tables
    const inventoryHeaders = [{ key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    document.getElementById('dashboard-inventory-table').innerHTML = createTable(inventory, inventoryHeaders);
    const trendsHeaders = [{ key: 'month', label: 'Month' }, { key: 'donations', label: 'Donations (Units)' }, { key: 'usage', label: 'Usage (Units)' }];
    document.getElementById('dashboard-trends-table').innerHTML = createTable(trends, trendsHeaders);

    // Inventory Page Table
    document.getElementById('admin-inventory-table').innerHTML = createTable(inventory, inventoryHeaders);

    // Requests Page Table
    const requestHeaders = [{ key: 'patient', label: 'Patient' }, { key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'date', label: 'Date' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }, { key: 'actions', label: 'Actions', render: (row) => row.status === 'pending' ? `<div style="display:flex; gap:0.5rem;"><button class="action-btn approve" onclick="handleRequestAction(${row.id}, 'approved')">Approve</button><button class="action-btn reject" onclick="handleRequestAction(${row.id}, 'rejected')">Reject</button></div>` : 'N/A' }];
    document.getElementById('admin-requests-table').innerHTML = createTable(requests, requestHeaders);

    // Management Page Tables
    const patientInfoHeaders = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'group', label: 'Blood Group' }, { key: 'phone', label: 'Contact' }];
    document.getElementById('admin-patients-info-table').innerHTML = createTable(patients, patientInfoHeaders);
    const donorInfoHeaders = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'group', label: 'Blood Group' }, { key: 'phone', label: 'Contact' }];
    document.getElementById('admin-donors-info-table').innerHTML = createTable(donors, donorInfoHeaders);
    const donorHistoryHeaders = [{ key: 'name', label: 'Donor Name' }, { key: 'group', label: 'Blood Group' }, { key: 'lastDonation', label: 'Last Donation' }, { key: 'totalDonations', label: 'Total Donations' }];
    document.getElementById('admin-donors-history-table').innerHTML = createTable(donors, donorHistoryHeaders);

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
    document.getElementById('admin-campaigns-table').innerHTML = createTable(campaigns, campaignHeaders);

    // Reports Page Tables
    const approvedRequests = requests.filter(r => r.status === 'approved');
    const requestApprovalData = approvedRequests.map(req => {
        const patient = patients.find(p => p.name === req.patient);
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

    const donationLogData = donationHistory.map(log => {
        const donor = donors.find(d => d.email === log.donor);
        return {
            ...log,
            donorName: donor ? donor.name : 'Unknown'
        };
    });
    const donationLogHeaders = [{ key: 'donorName', label: 'Donor Name' }, { key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'units', label: 'Units Donated' }];
    document.getElementById('report-donation-log-table').innerHTML = createTable(donationLogData, donationLogHeaders);

    const campaignSummaryHeaders = [{ key: 'name', label: 'Campaign Name' }, { key: 'date', label: 'Date' }, { key: 'status', label: 'Status' }, { key: 'unitsCollected', label: 'Units Collected' }];
    document.getElementById('report-campaign-summary-table').innerHTML = createTable(campaigns, campaignSummaryHeaders);

    // Deep Blood Flow Report to Destinations (Admin Read-Only)
    renderDestinationReport('admin-destination-report-container', false);
}

function renderPatientDashboard() {
    document.getElementById('patient-welcome-message').textContent = `Welcome, ${currentUser.name}!`;
    const inventory = getInventory();
    const inventoryHeaders = [{ key: 'group', label: 'Blood Group' }, { key: 'status', label: 'Availability', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    document.getElementById('patient-inventory-table').innerHTML = createTable(inventory, inventoryHeaders);
    const requestHeaders = [{ key: 'date', label: 'Date' }, { key: 'group', label: 'Blood Group' }, { key: 'units', label: 'Units' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` }];
    const myRequests = getRequests().filter(r => r.patient === currentUser.name);
    document.getElementById('patient-requests-table').innerHTML = createTable(myRequests, requestHeaders);
}

function renderDonorDashboard() {
    document.getElementById('donor-welcome-message').textContent = `Welcome, ${currentUser.name}!`;
    document.getElementById('donor-health-info').innerHTML = `<div><strong>Blood Type:</strong> <span style="color:var(--primary-color); font-weight:700;">${currentUser.bloodGroup}</span></div><div><strong>Last Iron Level:</strong> 14.2 g/dL</div><div><strong>Last Blood Pressure:</strong> 120/80 mmHg</div>`;
    const historyHeaders = [{ key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'units', label: 'Units Donated' }];
    const myHistory = getDonationHistory().filter(h => h.donor === currentUser.email);
    document.getElementById('donor-history-table').innerHTML = createTable(myHistory, historyHeaders);
    const campaignHeaders = [{ key: 'name', label: 'Campaign' }, { key: 'location', label: 'Location' }, { key: 'date', label: 'Date' }];
    document.getElementById('donor-campaigns-table').innerHTML = createTable(getCampaigns().filter(c => c.status === 'Upcoming'), campaignHeaders);
    const appointmentHeaders = [{ key: 'date', label: 'Date' }, { key: 'location', label: 'Location' }, { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-approved">${row.status}</span>` }];
    const myAppointments = getAppointments().filter(a => a.donor === currentUser.email);
    document.getElementById('donor-appointments-table').innerHTML = createTable(myAppointments, appointmentHeaders);
}

// --- DYNAMIC ACTIONS & FORM HANDLING ---

function handleRequestAction(requestId, newStatus) {
    const requests = getRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        if (newStatus === 'approved') {
            // Deduct from inventory on approval
            const inventory = getInventory();
            const item = inventory.find(i => i.group === request.group);
            if (item && item.units < request.units) {
                const proceed = confirm(`Warning: Only ${item.units} units of ${request.group} available, but request is for ${request.units}. Proceed?`);
                if (!proceed) return;
            }
            if (item) {
                item.units = Math.max(0, item.units - request.units);
            }
            recalcInventoryStatus(inventory);
            saveInventory(inventory);
            request.approvalDate = new Date().toISOString().split('T')[0];
        }
        request.status = newStatus;
        saveRequests(requests);
        renderAdminDashboard();
    }
}

function handleAddCampaign(event) {
    event.preventDefault();
    const form = event.target;
    const campaigns = getCampaigns();
    const newCampaign = { id: campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1, name: form.name.value, location: form.location.value, date: form.date.value, status: 'Upcoming', unitsCollected: 0 };
    campaigns.push(newCampaign);
    saveCampaigns(campaigns);
    form.reset();
    hideModal();
    renderAdminDashboard();
}

function handleAddDonor(event) {
    event.preventDefault();
    const form = event.target;

    // Check if a donor with the same email already exists to prevent duplicates.
    const donors = getDonors();
    if (donors.some(d => d.email === form.email.value)) {
        alert('A donor with this email already exists.');
        return;
    }

    const newDonor = {
        id: donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1,
        name: form.name.value,
        email: form.email.value,
        group: form.group.value,
        phone: form.phone.value,
        lastDonation: form.lastDonation.value,
        totalDonations: parseInt(form.totalDonations.value, 10)
    };
    donors.push(newDonor);
    saveDonors(donors);

    // Also create a corresponding record in the donation history log.
    const donationHistory = getDonationHistory();
    donationHistory.push({
        date: form.lastDonation.value,
        location: 'Admin Manual Entry',
        units: parseInt(form.totalDonations.value, 10),
        donor: form.email.value
    });
    saveDonationHistory(donationHistory);

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
    renderAdminDashboard();
    alert('New donor added successfully!');
}

function handleAddPatient(event) {
    event.preventDefault();
    const form = event.target;

    // Check if a patient with the same email already exists to prevent duplicates.
    const patients = getPatients();
    if (patients.some(p => p.email === form.email.value)) {
        alert('A patient with this email already exists.');
        return;
    }

    const newPatient = {
        id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
        name: form.name.value,
        email: form.email.value,
        group: form.group.value,
        phone: form.phone.value
    };
    patients.push(newPatient);
    savePatients(patients);

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
    renderAdminDashboard();
    alert('New patient added successfully!');
}

function handlePatientRequest(event) {
    event.preventDefault();
    if (!currentUser) return;
    const form = event.target;
    const requests = getRequests();
    const newRequest = { id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1, patient: currentUser.name, group: form.group.value, units: parseInt(form.units.value), date: new Date().toISOString().split('T')[0], status: 'pending' };
    requests.push(newRequest);
    saveRequests(requests);
    form.reset();
    renderPatientDashboard();
    alert('Your blood request has been submitted.');
}

function handleAppointmentSubmit(event) {
    event.preventDefault();
    if (!currentUser) return;
    const form = event.target;
    const appointments = getAppointments();
    const newAppointment = { id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1, date: form.date.value, location: form.location.value, status: 'Confirmed', donor: currentUser.email };
    appointments.push(newAppointment);
    saveAppointments(appointments);
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
    const inventory = getInventory();
    const allRequests = getRequests();
    const allCampaigns = getCampaigns();
    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
    const pendingRequests = allRequests.filter(r => r.status === 'pending').length;
    const upcomingCamps = allCampaigns.filter(c => c.status === 'Upcoming').length;

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
        {
            key: 'actions', label: 'Quick Adjust', render: (row) => `
            <div style="display:flex; gap:0.4rem;">
                <button class="action-btn" onclick="handleWorkerQuickStock('${row.group}', 1)" title="Add 1 unit" style="font-weight:700; color:var(--success-color);">+1</button>
                <button class="action-btn" onclick="handleWorkerQuickStock('${row.group}', -1)" title="Deduct 1 unit" style="font-weight:700; color:var(--primary-color);">-1</button>
            </div>
        ` }
    ];
    const dashboardInvEl = document.getElementById('worker-dashboard-inventory-table');
    if (dashboardInvEl) dashboardInvEl.innerHTML = createTable(inventory, inventoryHeaders);
    const workerInvEl = document.getElementById('worker-inventory-table');
    if (workerInvEl) workerInvEl.innerHTML = createTable(inventory, inventoryHeaders);

    // Requests Table
    const requestHeaders = [
        { key: 'patient', label: 'Patient Name' },
        { key: 'group', label: 'Blood Group' },
        { key: 'units', label: 'Units' },
        { key: 'date', label: 'Requested Date' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-${row.status}">${row.status}</span>` },
        {
            key: 'actions', label: 'Actions', render: (row) => row.status === 'pending' ? `
            <div style="display:flex; gap:0.5rem;">
                <button class="action-btn approve" onclick="handleWorkerRequestAction(${row.id}, 'approved')">Approve</button>
                <button class="action-btn reject" onclick="handleWorkerRequestAction(${row.id}, 'rejected')">Reject</button>
            </div>
        ` : (row.approvalDate ? `<span style="font-size:0.8rem; color:#757575;">Date: ${row.approvalDate}</span>` : 'N/A')
        }
    ];
    const workerRequestsEl = document.getElementById('worker-requests-table');
    if (workerRequestsEl) workerRequestsEl.innerHTML = createTable(allRequests, requestHeaders);

    // Upcoming Campaigns Table
    const upcomingCampaigns = allCampaigns.filter(c => c.status === 'Upcoming');
    const upcomingCampaignHeaders = [
        { key: 'name', label: 'Campaign Name' },
        { key: 'location', label: 'Location' },
        { key: 'date', label: 'Scheduled Date' },
        { key: 'status', label: 'Status', render: (row) => `<span class="status-badge status-upcoming">${row.status}</span>` },
        {
            key: 'actions', label: 'Action', render: (row) => `
            <button class="action-btn complete" onclick="handleCompleteCampaign(${row.id})">Mark as Completed</button>
        ` }
    ];
    const upcomingCampEl = document.getElementById('worker-upcoming-campaigns-table');
    if (upcomingCampEl) upcomingCampEl.innerHTML = createTable(upcomingCampaigns, upcomingCampaignHeaders);

    // Completed Campaigns Table
    const completedCampaigns = allCampaigns.filter(c => c.status === 'Completed');
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

    // Destinations & Blood Flow Report (Worker Editable)
    renderDestinationReport('worker-destination-report-container', true);
}

function handleWorkerStockUpdate(event) {
    event.preventDefault();
    const form = event.target;
    const group = form.group.value;
    const actionType = form.actionType.value;
    const units = parseInt(form.units.value, 10);
    const notes = form.notes ? form.notes.value : '';

    const inventory = getInventory();
    const item = inventory.find(i => i.group === group);
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

    recalcInventoryStatus(inventory);
    saveInventory(inventory);

    form.reset();
    renderWorkerDashboard();
    alert(`Blood stock for ${group} updated successfully! Current units: ${item.units}`);
}

function handleWorkerQuickStock(group, delta) {
    const inventory = getInventory();
    const item = inventory.find(i => i.group === group);
    if (!item) return;

    if (delta < 0 && item.units <= 0) {
        alert(`No units of ${group} available to deduct.`);
        return;
    }

    item.units += delta;
    recalcInventoryStatus(inventory);
    saveInventory(inventory);

    renderWorkerDashboard();
}

function handleWorkerRequestAction(requestId, status) {
    const requests = getRequests();
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    if (status === 'approved') {
        const inventory = getInventory();
        const item = inventory.find(i => i.group === request.group);
        if (item && item.units < request.units) {
            const proceed = confirm(`Warning: Available stock of ${request.group} is ${item.units} units, but request is for ${request.units} units. Proceed with approval?`);
            if (!proceed) return;
        }
        if (item) {
            item.units = Math.max(0, item.units - request.units);
        }
        recalcInventoryStatus(inventory);
        saveInventory(inventory);
        request.status = 'approved';
        request.approvalDate = new Date().toISOString().split('T')[0];
        alert(`Request for ${request.patient} (${request.units} units of ${request.group}) approved successfully!`);
    } else {
        request.status = 'rejected';
        alert(`Request for ${request.patient} rejected.`);
    }

    saveRequests(requests);
    renderWorkerDashboard();
}

function handleWorkerAddCampaign(event) {
    event.preventDefault();
    const form = event.target;
    const campaigns = getCampaigns();
    const newCamp = {
        id: campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1,
        name: form.name.value,
        location: form.location.value,
        date: form.date.value,
        status: 'Upcoming',
        unitsCollected: 0
    };
    campaigns.push(newCamp);
    saveCampaigns(campaigns);
    form.reset();
    renderWorkerDashboard();
    alert(`Campaign "${newCamp.name}" scheduled successfully!`);
}

function handleCompleteCampaign(campaignId) {
    const campaigns = getCampaigns();
    const camp = campaigns.find(c => c.id === campaignId);
    if (!camp) return;

    const unitsStr = prompt(`Enter total blood units collected during "${camp.name}":`, "35");
    if (unitsStr === null) return; // User cancelled

    const collectedUnits = parseInt(unitsStr, 10) || 0;
    camp.status = 'Completed';
    camp.unitsCollected = collectedUnits;
    saveCampaigns(campaigns);

    // Auto-increase inventory: distribute collected units across blood groups proportionally
    if (collectedUnits > 0) {
        const inventory = getInventory();
        const perGroup = Math.floor(collectedUnits / inventory.length);
        const remainder = collectedUnits % inventory.length;
        inventory.forEach((item, idx) => {
            item.units += perGroup + (idx < remainder ? 1 : 0);
        });
        recalcInventoryStatus(inventory);
        saveInventory(inventory);
    }

    renderWorkerDashboard();
    alert(`Campaign "${camp.name}" marked as Completed with ${collectedUnits} units collected! Inventory has been updated.`);
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

// --- DESTINATIONS & BLOOD FLOW REPORT FUNCTIONS ---

let selectedAdminDestinationId = 1;
let selectedWorkerDestinationId = 1;

function getDestinations() {
    const stored = localStorage.getItem('destinations');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) { }
    }
    localStorage.setItem('destinations', JSON.stringify(mockData.destinations));
    return mockData.destinations;
}

function saveDestinations(dests) {
    localStorage.setItem('destinations', JSON.stringify(dests));
}

function getDestinationFlows() {
    const stored = localStorage.getItem('destinationFlows');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) { }
    }
    localStorage.setItem('destinationFlows', JSON.stringify(mockData.destinationFlows));
    return mockData.destinationFlows;
}

function saveDestinationFlows(flows) {
    localStorage.setItem('destinationFlows', JSON.stringify(flows));
}

function selectDestination(destId, isWorker) {
    if (isWorker) {
        selectedWorkerDestinationId = destId;
        renderDestinationReport('worker-destination-report-container', true);
    } else {
        selectedAdminDestinationId = destId;
        renderDestinationReport('admin-destination-report-container', false);
    }
}

function renderDestinationReport(containerId, isWorker) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const destinations = getDestinations();
    const flows = getDestinationFlows();
    const currentId = isWorker ? selectedWorkerDestinationId : selectedAdminDestinationId;
    let activeDest = destinations.find(d => d.id === currentId) || destinations[0];
    if (!activeDest) {
        container.innerHTML = '<p style="padding:1rem; color:var(--text-light);">No destinations configured.</p>';
        return;
    }
    if (isWorker) selectedWorkerDestinationId = activeDest.id;
    else selectedAdminDestinationId = activeDest.id;

    // 1. Destination Selector Buttons (Tabs)
    let html = '<div class="destination-btn-grid">';
    destinations.forEach(dest => {
        const isActive = dest.id === activeDest.id;
        html += `
            <button type="button" class="destination-select-btn ${isActive ? 'active' : ''}" onclick="selectDestination(${dest.id}, ${isWorker})">
                <svg style="width:1.1rem; height:1.1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                <span>${dest.name}</span>
                <span class="destination-pill-type">${dest.type}</span>
            </button>
        `;
    });
    html += '</div>';

    // 2. Expanded Destination Deep Report Panel
    const destFlows = flows.filter(f => f.destinationId === activeDest.id);
    const totalDonationUnits = destFlows.filter(f => f.type === 'donation').reduce((sum, f) => sum + f.units, 0);
    const requestFlows = destFlows.filter(f => f.type === 'request');
    const totalRequestedUnits = requestFlows.reduce((sum, f) => sum + f.units, 0);
    const approvedUnits = requestFlows.filter(f => f.status === 'approved').reduce((sum, f) => sum + f.units, 0);
    const rejectedUnits = requestFlows.filter(f => f.status === 'rejected').reduce((sum, f) => sum + f.units, 0);
    const pendingUnits = requestFlows.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.units, 0);

    html += `
        <div class="destination-panel">
            <div class="destination-header-bar">
                <div>
                    <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                        <h2 style="font-size:1.4rem; font-weight:700; color:var(--text-dark); margin:0;">${activeDest.name}</h2>
                        <span class="status-badge status-upcoming">${activeDest.type}</span>
                    </div>
                    <div class="destination-info-tags">
                        <span><strong>City:</strong> ${activeDest.city || 'N/A'}</span>
                        <span><strong>Address:</strong> ${activeDest.address || 'N/A'}</span>
                        <span><strong>Contact Person:</strong> ${activeDest.contactPerson || 'N/A'}</span>
                        <span><strong>Phone:</strong> ${activeDest.phone || 'N/A'}</span>
                    </div>
                </div>
                <div>
                    ${isWorker ? `
                        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            <button type="button" class="btn" style="background:#e0e7ff; color:#3730a3; padding:8px 14px; font-size:0.85rem;" onclick="openEditDestinationModal(${activeDest.id})">
                                <svg style="width:1rem; height:1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                Edit Destination
                            </button>
                            <button type="button" class="btn btn-primary" style="padding:8px 14px; font-size:0.85rem;" onclick="openRecordFlowModal(${activeDest.id})">
                                <svg style="width:1rem; height:1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                Record Blood Flow
                            </button>
                        </div>
                    ` : `
                        <span style="font-size:0.85rem; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:6px 12px; border-radius:6px; font-weight:600; display:inline-flex; align-items:center; gap:0.4rem;">
                            <svg style="width:1rem; height:1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            Admin View (Worker Managed)
                        </span>
                    `}
                </div>
            </div>

            <!-- Destination Summary Metrics Cards -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
                <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:1rem;">
                    <div style="font-size:0.8rem; font-weight:600; color:#166534; text-transform:uppercase;">Donations Received</div>
                    <div style="font-size:1.75rem; font-weight:700; color:#15803d; margin-top:0.25rem;">${totalDonationUnits} <span style="font-size:0.85rem; font-weight:500;">units</span></div>
                </div>
                <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:1rem;">
                    <div style="font-size:0.8rem; font-weight:600; color:#1e40af; text-transform:uppercase;">Total Requests</div>
                    <div style="font-size:1.75rem; font-weight:700; color:#1d4ed8; margin-top:0.25rem;">${totalRequestedUnits} <span style="font-size:0.85rem; font-weight:500;">units</span></div>
                </div>
                <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:1rem;">
                    <div style="font-size:0.8rem; font-weight:600; color:#065f46; text-transform:uppercase;">Approved & Dispatched</div>
                    <div style="font-size:1.75rem; font-weight:700; color:#047857; margin-top:0.25rem;">${approvedUnits} <span style="font-size:0.85rem; font-weight:500;">units</span></div>
                </div>
                <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:1rem;">
                    <div style="font-size:0.8rem; font-weight:600; color:#991b1b; text-transform:uppercase;">Rejected Requests</div>
                    <div style="font-size:1.75rem; font-weight:700; color:#b91c1c; margin-top:0.25rem;">${rejectedUnits} <span style="font-size:0.85rem; font-weight:500;">units</span></div>
                </div>
                <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:1rem;">
                    <div style="font-size:0.8rem; font-weight:600; color:#92400e; text-transform:uppercase;">Pending Verification</div>
                    <div style="font-size:1.75rem; font-weight:700; color:#b45309; margin-top:0.25rem;">${pendingUnits} <span style="font-size:0.85rem; font-weight:500;">units</span></div>
                </div>
            </div>

            <!-- Blood Group-wise Breakdown Table -->
            <div style="margin-bottom:1.75rem;">
                <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.75rem; color:var(--text-dark);">
                    Blood Group-Wise Flow Breakdown (${activeDest.name})
                </h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Blood Group</th>
                                <th>Donations (Units)</th>
                                <th>Requests Total</th>
                                <th>Approved (Dispatched)</th>
                                <th>Rejected</th>
                                <th>Pending</th>
                                <th>Net Balance (Donations - Approved)</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    groups.forEach(grp => {
        const grpFlows = destFlows.filter(f => f.group === grp);
        const grpDonations = grpFlows.filter(f => f.type === 'donation').reduce((sum, f) => sum + f.units, 0);
        const grpRequests = grpFlows.filter(f => f.type === 'request');
        const grpReqTotal = grpRequests.reduce((sum, f) => sum + f.units, 0);
        const grpApproved = grpRequests.filter(f => f.status === 'approved').reduce((sum, f) => sum + f.units, 0);
        const grpRejected = grpRequests.filter(f => f.status === 'rejected').reduce((sum, f) => sum + f.units, 0);
        const grpPending = grpRequests.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.units, 0);
        const net = grpDonations - grpApproved;
        const netStr = net > 0 ? `+${net} units` : (net < 0 ? `${net} units` : '0 units');
        const netColor = net > 0 ? 'var(--success-color)' : (net < 0 ? 'var(--primary-color)' : 'var(--text-dark)');

        html += `
            <tr>
                <td><span class="group-breakdown-badge">${grp}</span></td>
                <td><strong>${grpDonations}</strong></td>
                <td>${grpReqTotal}</td>
                <td><span class="status-badge status-approved">${grpApproved}</span></td>
                <td><span class="status-badge status-rejected">${grpRejected}</span></td>
                <td><span class="status-badge status-pending">${grpPending}</span></td>
                <td style="font-weight:700; color:${netColor};">${netStr}</td>
            </tr>
        `;
    });

    html += `
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Detailed Transfer Logs for this Destination -->
            <div>
                <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.75rem; color:var(--text-dark);">
                    Detailed Blood Flow Transactions (${activeDest.name})
                </h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Patient / Donor</th>
                                <th>Blood Group</th>
                                <th>Units</th>
                                <th>Status</th>
                                <th>Notes / Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    if (destFlows.length === 0) {
        html += `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-light);">No blood transfer records found for this destination.</td></tr>`;
    } else {
        const sorted = [...destFlows].sort((a, b) => new Date(b.date) - new Date(a.date));
        sorted.forEach(f => {
            const isReq = f.type === 'request';
            const typeBadge = isReq
                ? '<span style="background:#e0f2fe; color:#0284c7; padding:2px 8px; border-radius:4px; font-weight:600; font-size:0.8rem;">Blood Request</span>'
                : '<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:4px; font-weight:600; font-size:0.8rem;">Donation</span>';
            const party = isReq ? (f.patient || 'Patient') : (f.donor || 'Donor');
            const statusBadge = `<span class="status-badge status-${f.status}">${f.status}</span>`;

            html += `
                <tr>
                    <td>${f.date}</td>
                    <td>${typeBadge}</td>
                    <td><strong>${party}</strong></td>
                    <td><span class="group-breakdown-badge">${f.group}</span></td>
                    <td><strong>${f.units}</strong></td>
                    <td>${statusBadge}</td>
                    <td>${f.notes || 'Routine transfer'}</td>
                </tr>
            `;
        });
    }

    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function openEditDestinationModal(destId) {
    const destinations = getDestinations();
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;

    document.getElementById('edit-dest-id').value = dest.id;
    document.getElementById('edit-dest-name').value = dest.name;
    document.getElementById('edit-dest-type').value = dest.type;
    document.getElementById('edit-dest-city').value = dest.city || '';
    document.getElementById('edit-dest-contact').value = dest.contactPerson || '';
    document.getElementById('edit-dest-phone').value = dest.phone || '';
    document.getElementById('edit-dest-address').value = dest.address || '';

    document.getElementById('edit-destination-modal').classList.add('visible');
}

function closeEditDestinationModal() {
    const modal = document.getElementById('edit-destination-modal');
    if (modal) modal.classList.remove('visible');
}

function handleUpdateDestination(event) {
    event.preventDefault();
    const form = event.target;
    const destId = parseInt(form.destId.value, 10);
    const destinations = getDestinations();
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;

    dest.name = form.name.value;
    dest.type = form.type.value;
    dest.city = form.city.value;
    dest.contactPerson = form.contactPerson.value;
    dest.phone = form.phone.value;
    dest.address = form.address.value;

    saveDestinations(destinations);
    closeEditDestinationModal();

    renderDestinationReport('worker-destination-report-container', true);
    const adminCont = document.getElementById('admin-destination-report-container');
    if (adminCont) renderDestinationReport('admin-destination-report-container', false);

    alert(`Destination "${dest.name}" updated successfully!`);
}

function handleAddDestination(event) {
    event.preventDefault();
    const form = event.target;
    const destinations = getDestinations();

    const newDest = {
        id: destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1,
        name: form.name.value,
        type: form.type.value,
        city: form.city.value,
        contactPerson: form.contactPerson.value,
        phone: form.phone.value,
        address: form.address.value
    };

    destinations.push(newDest);
    saveDestinations(destinations);
    selectedWorkerDestinationId = newDest.id;

    form.reset();
    renderDestinationReport('worker-destination-report-container', true);
    const adminCont = document.getElementById('admin-destination-report-container');
    if (adminCont) renderDestinationReport('admin-destination-report-container', false);

    alert(`New destination "${newDest.name}" added successfully!`);
}

function openRecordFlowModal(destId) {
    const destinations = getDestinations();
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;

    document.getElementById('record-flow-dest-id').value = dest.id;
    document.getElementById('record-flow-title').textContent = `Record Blood Flow: ${dest.name}`;
    const dateInput = document.querySelector('#record-flow-form [name="date"]');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    document.getElementById('record-flow-modal').classList.add('visible');
}

function closeRecordFlowModal() {
    const modal = document.getElementById('record-flow-modal');
    if (modal) modal.classList.remove('visible');
}

function toggleFlowPartyLabel(flowType) {
    const label = document.getElementById('flow-party-label');
    if (label) {
        label.textContent = flowType === 'donation' ? 'Donor Full Name' : 'Patient / Recipient Name';
    }
}

function handleRecordDestinationFlow(event) {
    event.preventDefault();
    const form = event.target;
    const destId = parseInt(form.destId.value, 10);
    const flows = getDestinationFlows();

    const newFlow = {
        id: flows.length > 0 ? Math.max(...flows.map(f => f.id)) + 1 : 1,
        destinationId: destId,
        type: form.type.value,
        group: form.group.value,
        units: parseInt(form.units.value, 10),
        date: form.date.value,
        status: form.status.value,
        notes: form.notes.value || ''
    };

    if (newFlow.type === 'request') {
        newFlow.patient = form.partyName.value;
        if (newFlow.status === 'approved') {
            newFlow.approvalDate = newFlow.date;
        }
    } else {
        newFlow.donor = form.partyName.value;
    }

    flows.push(newFlow);
    saveDestinationFlows(flows);
    closeRecordFlowModal();
    form.reset();

    renderDestinationReport('worker-destination-report-container', true);
    const adminCont = document.getElementById('admin-destination-report-container');
    if (adminCont) renderDestinationReport('admin-destination-report-container', false);

    alert('Blood flow record saved successfully!');
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
