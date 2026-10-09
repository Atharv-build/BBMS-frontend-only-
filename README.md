# 🩸 Life Care - Blood Bank Management System (BBMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6+)-blue.svg)](#-technologies-used)
[![Portals](https://img.shields.io/badge/Portals-5%20Role--Based%20Dashboards-emerald.svg)](#-user-portals--role-capabilities)

**Life Care** is a modern, enterprise-grade, web-based Blood Bank Management System (BBMS). It is engineered to streamline, digitize, and automate blood bank operations—from voluntary donor appointments and hospital destination flow tracking to real-time stock management and emergency blood request processing.

Built as a lightweight, high-performance front-end application with a centralized `localStorage` dynamic data engine, **Life Care** delivers real-time data synchronisation across five specialized user portals without requiring complex server backends for local deployment.

---

## 🌟 Key Highlights & Core Features

- 🏥 **5 Dedicated Role-Based Portals**: Specialized interfaces built specifically for **Administrators**, **Blood Bank Staff Workers**, **Donors**, **Patients**, and **General Users**.
- 🩸 **Real-Time Inventory Engine**: Live blood unit tracking across all 8 blood groups (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) with automated status classification (`Available` ≥ 20 units, `Low` 10–19 units, `Critical` < 10 units).
- 🚚 **Destinations & Blood Flow Tracking**: Track blood shipments and dispatches to hospitals, trauma centers, maternity clinics, and research centers with deep flow analysis by blood group and facility.
- 📅 **Appointment & Campaign Management**: Schedule blood donation camps, book donor appointments at preferred locations, and maintain completed drive histories.
- ⚡ **Centralized State Persistence**: Utilizes browser `localStorage` and `sessionStorage` for instant data reflection across all open tabs and user logins.
- 📊 **Analytics & Reporting**: Interactive reports on donation and usage trends, request approval logs, campaign summaries, and deep destination blood flow.
- 📥 **Data Export (Excel/CSV)**: Export complete user accounts, inventory logs, and staff lists directly to Excel/CSV files in one click.
- 🎨 **Responsive Glassmorphism UI**: Styled with custom CSS, CSS variables, typography, dynamic sidebars, smooth modal dialogs, and mobile-ready hamburger navigation.

---

## 👥 User Portals & Role Capabilities

### 👨‍💼 1. Admin Portal (`admin_login.html` & `admin_dashboard.html`)
- **Executive Dashboard**: KPI overview tracking total inventory, pending emergency requests, registered donors, and active campaigns.
- **Live Inventory Monitor**: Monitor stock levels across all blood groups with automatic alert badges.
- **Request Approval System**: Review patient blood requests with single-click approval/rejection workflows.
- **Patient Management**: Directory of registered patients and form to add new patients directly.
- **Donor Management & History**: View donor records, track past donations, and register new donors.
- **User Account Management & Excel Export**: Full directory of system accounts with a 1-click **Export to Excel** feature (`exportUsersToExcel()`).
- **Campaign Management**: Create, schedule, and update blood donation drives.
- **Deep Analytics & Reports**: Access read-only reports for Destination Blood Flow, Request Approvals, Donation Logs, and Campaign Summaries.

### 👩‍⚕️ 2. Staff / Worker Portal (`worker_login.html` & `worker_dashboard.html`)
- **Staff On-Duty Overview**: Active shift overview and real-time inventory widget.
- **Stock Restock & Deduction**: Record incoming donation bags or deduct units (dispatches, expired units) with custom medical notes and reference IDs.
- **Blood Requests Processing**: Direct processing of emergency and standard patient requests.
- **Campaign Scheduling**: Schedule new blood donation camps and maintain completed drive logs.
- **Worker Management**: Staff registration tool for adding team members with assigned roles (e.g., *Blood Bank Officer*, *Lab Technician*, *Phlebotomist*, *Medical Officer*, *Inventory Supervisor*).
- **Destinations & Blood Flow Engine**: Add hospital facilities, update contact details via modal forms, and log detailed transfer dispatches or incoming drives.

### ❤️ 3. Donor Portal (`donor_login.html` & `donor_dashboard.html`)
- **Personalized Donor Portal**: Custom welcome screen displaying donor blood group and donor profile metrics.
- **Appointment Scheduler**: Book donation slots at designated donation centers (*Downtown Plaza*, *Greenwood Park*, *Central Hospital*).
- **My Appointments & Donation History**: Track upcoming scheduled appointments and review previous blood donations.
- **Camp Discovery**: View upcoming blood donation camps and locations.

### 🏥 4. Patient Portal (`patient_login.html` & `patient_dashboard.html`)
- **Emergency Blood Request Form**: Submit immediate blood requests selecting blood group, required units, and medical justification.
- **Request Status Tracker**: Real-time status updates (*Pending*, *Approved*, *Rejected*) on all submitted blood requests.
- **Available Stock View**: Check current blood bank availability to plan requests accordingly.

### 👤 5. User / General Portal (`user_login.html` & `user_dashboard.html`)
- **Universal Access Hub**: Unified dashboard for general users seeking both donation and request services.
- **User Profile & Quick Overview**: Quick stats on personal activity, total donations, and active requests.
- **Dual Portal Switcher**: Seamless 1-click navigation to either the Donor or Patient portals.
- **Recent Activity Feed**: Consolidated history of user interactions.

---

## 🔑 Demo Login Credentials

You can test any portal immediately using the following pre-configured credentials:

| Portal | Email Address | Password | Role / Designation |
| :--- | :--- | :--- | :--- |
| 👨‍💼 **Admin Portal** | `admin@lifecare.com` | `password` | System Administrator (*Tushar Shitole*) |
| 👩‍⚕️ **Staff / Worker Portal** | `worker@lifecare.com` | `password` | Blood Bank Officer (*Radha Patil*) |
| ❤️ **Donor Portal** | `viraj@gmail.com` | `password` | Registered Donor (*Viraj Dhumal - A+*) |
| 🏥 **Patient Portal** | `shubham@gmail.com` | `password` | Registered Patient (*Shubham Budhe - A-*) |
| 👤 **User Portal** | `user@lifecare.com` | `password` | General User (*Demo User - O+*) |

> 💡 **Note**: You can also register new accounts on any login page. Account data is dynamically stored in your browser's `localStorage`.

---

## 📂 Project Structure

```text
BBMS-frontend-only/
├── index.html                 # Main landing page with portal switcher & system overview
├── admin_login.html           # Administrator login portal
├── admin_dashboard.html       # Full admin dashboard & reporting center
├── worker_login.html          # Blood Bank Staff worker login portal
├── worker_dashboard.html      # Staff operations, stock updates & destination flow manager
├── donor_login.html           # Donor login portal
├── donor_dashboard.html       # Donor appointments & health portal
├── patient_login.html         # Patient login portal
├── patient_dashboard.html     # Patient request form & status tracker
├── user_login.html            # General user login portal
├── user_dashboard.html        # Unified user hub dashboard
├── script.js                  # Central logic, auth router, dynamic state & DOM rendering engine
├── style.css                  # Modern design system, themes, glassmorphism UI & responsive layouts
├── LICENSE                    # MIT Open Source License
└── README.md                  # Project documentation
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic web architecture, accessibility tags, SVG icon integration, responsive layouts.
- **CSS3**: Custom design system utilizing CSS Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, CSS keyframe animations, and custom scrollbars.
- **JavaScript (ES6+)**:
  - `localStorage` & `sessionStorage` for state management and multi-tab state sync.
  - Dynamic DOM manipulation and dynamic table/card rendering.
  - Role-based authorization guards (`checkAuth()`).
  - Modal management (Destination Edit Modal, Record Flow Modal, Campaign Modal).
  - Client-side CSV/Excel export generation (`exportUsersToExcel()`).
- **Google Fonts**: [Inter](https://fonts.google.com/specimen/Inter) font family for modern legibility.

---

## 🚀 Getting Started

Follow these steps to run **Life Care** locally on your computer.

### Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave, etc.). No backend server or database installation is required!

### Quick Run Instructions
1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/BBMS-frontend-only.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd BBMS-frontend-only
   ```
3. **Launch the Application**:
   - Double click `index.html` to open it in your default web browser, or start a local dev server (e.g. Live Server in VS Code).

---

## 🧪 Testing Workflows

1. **Restocking Blood Inventory as Staff**:
   - Log in as `worker@lifecare.com` / `password`.
   - Go to **Blood Records & Stock**.
   - Select a blood group (e.g. `AB-`), select `Add Units`, specify units count (e.g., `10`), add reference notes, and click **Update Blood Stock**.
   - Observe how `AB-` status updates automatically from `Critical` to `Available` across the system!

2. **Submitting & Approving Blood Requests**:
   - Log in as `shubham@gmail.com` / `password` (Patient Portal) and submit a request for `2` units of `A-`.
   - Log in as `admin@lifecare.com` or `worker@lifecare.com`, navigate to **Blood Requests**, and click **Approve**.
   - Return to the Patient Portal to verify the real-time status update to **Approved**!

3. **Hospital Destination & Blood Flow Transfers**:
   - Log in as `worker@lifecare.com`, select **Destinations & Blood Flow**.
   - Expand any hospital (e.g., *Central General Hospital*) to view deep flow breakdowns by blood group.
   - Click **Record Transfer** or **Edit Facility** to update hospital metadata and track blood delivery logs.

4. **Exporting Data**:
   - Log in to the **Admin Portal**, navigate to **Users**, and click **Export to Excel** to download the complete user registry file.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
