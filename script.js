/* ============================================================
   CSC CRM — Dummy static UI
   Role-based sidebar / top-navbar / content switching.
   No backend. All data below is illustrative dummy data.
   ============================================================ */

/* ---------- Icon library (inline SVG, stroke = currentColor) ---------- */
const ICONS = {
  staff: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-1.6a3.6 3.6 0 0 0-3.6-3.6H7.6A3.6 3.6 0 0 0 4 18.4V20"/><circle cx="10.5" cy="7.5" r="3.5"/><path d="M19.5 20v-1.4a3.2 3.2 0 0 0-2.2-3"/><path d="M15.3 4.2a3.3 3.3 0 0 1 0 6.4"/></svg>`,
  leads: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/></svg>`,
  student: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8.5 12 4l9.5 4.5-9.5 4.5-9.5-4.5Z"/><path d="M6 11v4.2c0 1.2 2.7 2.8 6 2.8s6-1.6 6-2.8V11"/><path d="M21.5 8.5V15"/></svg>`,
  attendance: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2.4"/><path d="M3.5 9.5h17"/><path d="M8 3v3M16 3v3"/><path d="m8.4 14 2.1 2.1L15.6 12"/></svg>`,
  admission: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4.5h6.5a1.6 1.6 0 0 1 1.6 1.6V19a1.6 1.6 0 0 1-1.6 1.6H8A1.6 1.6 0 0 1 6.4 19V6.1A1.6 1.6 0 0 1 8 4.5Z"/><path d="M9.5 3.5h5v2.4h-5z"/><path d="M9.5 12h5M9.5 15.4h3.2"/><circle cx="11" cy="9" r="1.4"/></svg>`,
  leave: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2.4"/><path d="M3.5 9.5h17"/><path d="m8.5 14.5 2.2 2.2 4.3-4.3"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.6-3.6"/></svg>`,
  empty: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M4 11h16"/><path d="M9 4h6v3H9z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.6v.1"/></svg>`
};

/* ---------- Module registry (sidebar order) ---------- */
const MODULES = [
  { key: 'staff',      label: 'Staff Management', icon: ICONS.staff },
  { key: 'leads',      label: 'Leads Module',      icon: ICONS.leads },
  { key: 'student',    label: 'Student Module',    icon: ICONS.student },
  { key: 'attendance', label: 'Attendance Module', icon: ICONS.attendance },
  { key: 'admission',  label: 'Admission',         icon: ICONS.admission },
  { key: 'leave',      label: 'Leave Management',  icon: ICONS.leave }
];

/* Short subtitle shown under the page title, keyed by content-renderer id */
const BLURBS = {
  st_dashboard: 'A quick pulse on tasks, follow-ups and targets for the signed-in staff member.',
  st_staffmgmt: 'Manage employee records across departments and update employment status.',
  st_profile: 'Personal and employment details for the signed-in staff member.',
  st_leadscapture: 'Assign monthly lead-capture targets to the marketing / sales team.',
  ld_assign: 'Route freshly captured leads to the right sales executive.',
  ld_pipeline: 'Track leads as they move from new enquiry through to admission.',
  ld_calllogs: 'History of outbound and inbound calls logged against each lead.',
  ld_followups: 'Upcoming and overdue follow-up tasks across the lead base.',
  ld_conversion: 'Enquiry-to-admission conversion performance for the period.',
  sd_register: 'Capture a new student enquiry and convert it into an admission record.',
  sd_fee: 'Track fee instalments, dues and payment history per student.',
  sd_list: 'Master list of registered students across active batches.',
  sd_search: 'Locate a student record using filters across batch, course and status.',
  at_dashboard: "Today's attendance snapshot across all active batches.",
  at_batches: 'Batches and whether attendance has been marked for the day.',
  at_history: 'Day-wise attendance records for review and correction.',
  at_absent: 'Students currently marked absent, grouped by batch.',
  at_lowattendance: 'Students falling below the minimum attendance threshold.',
  at_reports: 'Attendance trends and exportable analytics.',
  lv_balance: 'Leave entitlement and balance for the signed-in staff member.',
  lv_apply: 'Submit a new leave request for approval.',
  lv_review: 'Review and act on leave requests raised by your team.',
  lv_history: 'Past leave requests and their outcomes.',
  lv_actionlogs: 'Audit trail of every leave action taken across the team.'
};

/* ============================================================
   Role configuration
   Each role: label, initials, viewOnly flag, sidebar module keys,
   and per-module tab lists: { id, label, content }
   `content` maps to a renderer in CONTENT_RENDERERS.
   ============================================================ */
const FULL_STAFF_TABS = [
  { id: 'dashboard',  label: 'Dashboard',        content: 'st_dashboard' },
  { id: 'staffmgmt',  label: 'Staff Management', content: 'st_staffmgmt' },
  { id: 'profile',    label: 'Staff Profile',    content: 'st_profile' },
  { id: 'leadscap',   label: 'Leads Capture',    content: 'st_leadscapture' }
];
const OWN_STAFF_TABS = [
  { id: 'dashboard', label: 'Dashboard',     content: 'st_dashboard' },
  { id: 'profile',   label: 'Staff Profile', content: 'st_profile' }
];
const FULL_LEADS_TABS = [
  { id: 'assign',     label: 'Lead Assign',        content: 'ld_assign' },
  { id: 'pipeline',   label: 'Pipeline View',      content: 'ld_pipeline' },
  { id: 'calllogs',   label: 'Call Logs',          content: 'ld_calllogs' },
  { id: 'followups',  label: 'Follow-ups',         content: 'ld_followups' },
  { id: 'conversion', label: 'Conversion Report',  content: 'ld_conversion' }
];
const FULL_STUDENT_TABS = [
  { id: 'register', label: 'Student Register',  content: 'sd_register' },
  { id: 'fee',      label: 'Fee Management',    content: 'sd_fee' },
  { id: 'list',     label: 'Student List',      content: 'sd_list' },
  { id: 'search',   label: 'Search & Filter',   content: 'sd_search' }
];
const FULL_ATTENDANCE_TABS = [
  { id: 'dashboard',      label: 'Dashboard',              content: 'at_dashboard' },
  { id: 'batches',        label: 'Batches',                content: 'at_batches' },
  { id: 'history',        label: 'Attendance History',     content: 'at_history' },
  { id: 'absent',         label: 'Absent Tracker',         content: 'at_absent' },
  { id: 'lowattendance',  label: 'Low Attendance Alert',   content: 'at_lowattendance' },
  { id: 'reports',        label: 'Report & Analytics',     content: 'at_reports' }
];
const FULL_LEAVE_TABS = [
  { id: 'balance',    label: 'My Balance',      content: 'lv_balance' },
  { id: 'apply',      label: 'Leave Apply',     content: 'lv_apply' },
  { id: 'review',     label: 'Student Review',  content: 'lv_review' },
  { id: 'history',    label: 'My History',      content: 'lv_history' },
  { id: 'actionlogs', label: 'Action Logs',     content: 'lv_actionlogs' }
];
const OWN_LEAVE_TABS = [
  { id: 'balance', label: 'My Balance',  content: 'lv_balance' },
  { id: 'apply',   label: 'Leave Apply', content: 'lv_apply' },
  { id: 'history', label: 'My History',  content: 'lv_history' }
];

const ROLES = {
  admin: {
    label: 'Admin', initials: 'AD',
    sidebar: ['staff', 'leads', 'student', 'attendance', 'admission', 'leave'],
    tabs: { staff: FULL_STAFF_TABS, leads: FULL_LEADS_TABS, student: FULL_STUDENT_TABS, attendance: FULL_ATTENDANCE_TABS, leave: FULL_LEAVE_TABS }
  },
  manager: {
    label: 'Manager', initials: 'MG',
    sidebar: ['staff', 'leads', 'student', 'attendance', 'admission', 'leave'],
    tabs: { staff: FULL_STAFF_TABS, leads: FULL_LEADS_TABS, student: FULL_STUDENT_TABS, attendance: FULL_ATTENDANCE_TABS, leave: FULL_LEAVE_TABS }
  },
  hr: {
    label: 'HR', initials: 'HR', viewOnly: true,
    sidebar: ['staff', 'leads', 'student', 'attendance', 'admission', 'leave'],
    tabs: { staff: FULL_STAFF_TABS, leads: FULL_LEADS_TABS, student: FULL_STUDENT_TABS, attendance: FULL_ATTENDANCE_TABS, leave: FULL_LEAVE_TABS }
  },
  sales_lead: {
    label: 'Sales Lead', initials: 'SL',
    sidebar: ['staff', 'leads', 'student', 'leave'],
    tabs: {
      staff: OWN_STAFF_TABS,
      leads: [
        { id: 'assign',          label: 'Lead Assign',              content: 'ld_assign' },
        { id: 'pipeline_team',   label: 'Team Pipeline View',       content: 'ld_pipeline' },
        { id: 'calllogs_team',   label: 'Team Call Logs',           content: 'ld_calllogs' },
        { id: 'followups_team',  label: 'Team Follow-ups',          content: 'ld_followups' },
        { id: 'conversion_team', label: 'Team Conversion Report',   content: 'ld_conversion' },
        { id: 'pipeline_own',    label: 'My Pipeline View',         content: 'ld_pipeline' },
        { id: 'calllogs_own',    label: 'My Call Logs',             content: 'ld_calllogs' },
        { id: 'followups_own',   label: 'My Follow-ups',            content: 'ld_followups' },
        { id: 'conversion_own',  label: 'My Conversion Report',     content: 'ld_conversion' }
      ],
      student: FULL_STUDENT_TABS,
      leave: [
        { id: 'balance', label: 'My Balance',       content: 'lv_balance' },
        { id: 'apply',   label: 'Leave Apply',      content: 'lv_apply' },
        { id: 'review',  label: 'Team Leave Review', content: 'lv_review' },
        { id: 'history', label: 'My History',       content: 'lv_history' }
      ]
    }
  },
  sales_exec: {
    label: 'Sales Executive', initials: 'SE',
    sidebar: ['staff', 'leads', 'student', 'leave'],
    tabs: {
      staff: OWN_STAFF_TABS,
      leads: [
        { id: 'pipeline_own',   label: 'My Pipeline View',       content: 'ld_pipeline' },
        { id: 'calllogs_own',   label: 'My Call Logs',           content: 'ld_calllogs' },
        { id: 'followups_own',  label: 'My Follow-ups',          content: 'ld_followups' },
        { id: 'conversion_own', label: 'My Conversion Report',   content: 'ld_conversion' }
      ],
      student: [
        { id: 'register', label: 'Student Registration / Admission', content: 'sd_register' },
        { id: 'fee',      label: 'My Fee Management',                content: 'sd_fee' },
        { id: 'list',     label: 'My Student List',                  content: 'sd_list' },
        { id: 'search',   label: 'My Search & Filter',               content: 'sd_search' }
      ],
      leave: OWN_LEAVE_TABS
    }
  },
  marketing_lead: {
    label: 'Marketing Lead', initials: 'ML',
    sidebar: ['staff', 'leave'],
    tabs: {
      staff: [
        { id: 'dashboard',   label: 'Dashboard',            content: 'st_dashboard' },
        { id: 'profile',     label: 'Staff Profile',        content: 'st_profile' },
        { id: 'leadtarget',  label: 'Lead Target Assign',   content: 'st_leadscapture' }
      ],
      leave: [
        { id: 'balance', label: 'My Balance',       content: 'lv_balance' },
        { id: 'apply',   label: 'Leave Apply',      content: 'lv_apply' },
        { id: 'review',  label: 'Team Leave Review', content: 'lv_review' },
        { id: 'history', label: 'My History',       content: 'lv_history' }
      ]
    }
  },
  marketing_exec: {
    label: 'Marketing Executive', initials: 'ME',
    sidebar: ['staff', 'leave'],
    tabs: { staff: OWN_STAFF_TABS, leave: OWN_LEAVE_TABS }
  },
  developer: {
    label: 'Developer', initials: 'DV',
    sidebar: ['staff', 'leave'],
    tabs: { staff: OWN_STAFF_TABS, leave: OWN_LEAVE_TABS }
  },
  trainer: {
    label: 'Trainer', initials: 'TR',
    sidebar: ['staff', 'leave', 'attendance'],
    tabs: { staff: OWN_STAFF_TABS, leave: OWN_LEAVE_TABS, attendance: FULL_ATTENDANCE_TABS }
  }
};

/* Roles with access to the Admission sidebar item */
const ADMISSION_ACCESS = ['admin', 'manager', 'hr'];

/* ---------- App state ---------- */
const state = {
  role: 'admin',
  module: 'staff',
  tabId: null
};

/* ============================================================
   Render engine
   ============================================================ */
function getRole() { return ROLES[state.role]; }

function sidebarModulesForRole(role) {
  return MODULES.filter(m => {
    if (m.key === 'admission') return ADMISSION_ACCESS.includes(state.role);
    return role.sidebar.includes(m.key);
  });
}

function tabsForModule(role, moduleKey) {
  if (moduleKey === 'admission') return null; // no inner navbar
  return role.tabs[moduleKey] || [];
}

function renderAll() {
  const role = getRole();
  document.getElementById('userAvatar').textContent = role.initials;
  document.getElementById('userName').textContent = role.label + ' (Demo)';
  document.getElementById('userRoleLabel').textContent = role.label;
  renderSidebar(role);
  renderTopNav(role);
  renderHeaderAndBody(role);
}

function renderSidebar(role) {
  const nav = document.getElementById('sidebarNav');
  const mods = sidebarModulesForRole(role);
  nav.innerHTML = mods.map(m => `
    <div class="side-link ${m.key === state.module ? 'active' : ''}" data-module="${m.key}" tabindex="0" role="button" aria-current="${m.key === state.module}">
      <span class="icon">${m.icon}</span>
      <span class="label">${m.label}</span>
    </div>
  `).join('');
  nav.querySelectorAll('.side-link').forEach(el => {
    el.addEventListener('click', () => selectModule(el.dataset.module));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectModule(el.dataset.module); } });
  });
}

function selectModule(moduleKey) {
  state.module = moduleKey;
  const role = getRole();
  const tabs = tabsForModule(role, moduleKey);
  state.tabId = tabs && tabs.length ? tabs[0].id : null;
  closeMobileSidebar();
  renderAll();
}

function renderTopNav(role) {
  const bar = document.getElementById('moduleNavbar');
  const tabs = tabsForModule(role, state.module);
  if (!tabs) { bar.innerHTML = ''; bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  bar.innerHTML = tabs.map(t => `
    <div class="tab-link ${t.id === state.tabId ? 'active' : ''}" data-tab="${t.id}" tabindex="0" role="button">${t.label}</div>
  `).join('');
  bar.querySelectorAll('.tab-link').forEach(el => {
    el.addEventListener('click', () => {
      state.tabId = el.dataset.tab;
      renderTopNavActive();
      renderHeaderAndBody(getRole());
    });
  });
}

function renderTopNavActive() {
  document.querySelectorAll('.tab-link').forEach(el => el.classList.toggle('active', el.dataset.tab === state.tabId));
}

function currentModuleMeta() { return MODULES.find(m => m.key === state.module); }

function currentTabDef(role) {
  if (state.module === 'admission') return { id: 'register', label: 'Admission — Student Registration', content: 'sd_register' };
  const tabs = tabsForModule(role, state.module);
  return (tabs || []).find(t => t.id === state.tabId) || null;
}

function renderHeaderAndBody(role) {
  const header = document.getElementById('pageHeader');
  const content = document.getElementById('content');
  const mod = currentModuleMeta();
  const tabDef = currentTabDef(role);

  if (!tabDef) {
    header.innerHTML = `<div><p class="crumb">${mod.label}</p><h1>No accessible sections</h1></div>`;
    content.innerHTML = renderEmptyState('Nothing to show here', 'Your current role does not have any sections enabled for this module.');
    return;
  }

  header.innerHTML = `
    <div>
      <p class="crumb">${mod.label}${state.module !== 'admission' ? ' / ' + tabDef.label : ''}</p>
      <h1>${tabDef.label}</h1>
      <p class="desc">${BLURBS[tabDef.content] || ''}</p>
    </div>
  `;

  const renderer = CONTENT_RENDERERS[tabDef.content];
  const viewOnly = !!role.viewOnly;
  content.innerHTML = renderer ? renderer(tabDef.label, viewOnly, role) : renderEmptyState('Coming soon', 'This section has not been designed yet.');
}

function renderEmptyState(title, desc) {
  return `<div class="card"><div class="empty-state">${ICONS.empty}<h4>${title}</h4><p>${desc}</p></div></div>`;
}

function permNotice(viewOnly) {
  if (!viewOnly) return '';
  return `<div class="notice view-only">${ICONS.info}<span>You're viewing this page in <strong>view-only</strong> mode. Add and edit actions are disabled for your role.</span></div>`;
}

function disabledAttr(viewOnly) { return viewOnly ? 'disabled title="Not available in view-only mode"' : ''; }

/* ============================================================
   Dummy datasets
   ============================================================ */
const D_STAFF = [
  { id: 'EMP-2201', name: 'Karthika R', role: 'Sales Executive', dept: 'Admissions', status: 'Active' },
  { id: 'EMP-2202', name: 'Vignesh M', role: 'Marketing Executive', dept: 'Marketing', status: 'Active' },
  { id: 'EMP-2144', name: 'Priya Dharshini', role: 'Trainer', dept: 'Academics', status: 'Active' },
  { id: 'EMP-2098', name: 'Arun Kumar S', role: 'Developer', dept: 'IT', status: 'On Leave' },
  { id: 'EMP-2077', name: 'Suresh Babu', role: 'Sales Lead', dept: 'Admissions', status: 'Active' },
  { id: 'EMP-1998', name: 'Divya Shree', role: 'HR Executive', dept: 'Human Resources', status: 'Active' },
  { id: 'EMP-1950', name: 'Mohammed Irfan', role: 'Trainer', dept: 'Academics', status: 'Inactive' }
];

const D_STUDENTS = [
  { id: 'STU-4471', name: 'Abinaya K', course: 'Full Stack Dev.', batch: 'FSD-Morning-12', fee: 'Paid', status: 'Active' },
  { id: 'STU-4468', name: 'Ranjith S', course: 'Data Analytics', batch: 'DA-Evening-05', fee: 'Partial', status: 'Active' },
  { id: 'STU-4460', name: 'Meena Loshini', course: 'UI/UX Design', batch: 'UX-Morning-03', fee: 'Paid', status: 'Active' },
  { id: 'STU-4452', name: 'Dinesh Kumar', course: 'Full Stack Dev.', batch: 'FSD-Evening-09', fee: 'Overdue', status: 'On Hold' },
  { id: 'STU-4449', name: 'Yazhini P', course: 'Digital Marketing', batch: 'DM-Morning-02', fee: 'Paid', status: 'Active' },
  { id: 'STU-4431', name: 'Santhosh R', course: 'Data Analytics', batch: 'DA-Evening-05', fee: 'Partial', status: 'Active' }
];

const D_LEADS_NEW = [
  { name: 'Harini S', src: 'Instagram Ad', course: 'UI/UX Design' },
  { name: 'Gokul V', src: 'Walk-in', course: 'Full Stack Dev.' },
  { name: 'Preethi M', src: 'Referral', course: 'Data Analytics' }
];
const D_LEADS_CONTACTED = [
  { name: 'Bala Murugan', src: 'Google Ads', course: 'Full Stack Dev.' },
  { name: 'Nithya R', src: 'Instagram Ad', course: 'Digital Marketing' }
];
const D_LEADS_QUALIFIED = [
  { name: 'Sanjay K', src: 'Referral', course: 'Data Analytics' },
  { name: 'Deepika S', src: 'Walk-in', course: 'UI/UX Design' },
  { name: 'Ashwin T', src: 'Google Ads', course: 'Full Stack Dev.' }
];
const D_LEADS_DEMO = [
  { name: 'Revathi N', src: 'Instagram Ad', course: 'Digital Marketing' }
];
const D_LEADS_ADMITTED = [
  { name: 'Karthik R', src: 'Referral', course: 'Full Stack Dev.' },
  { name: 'Swetha B', src: 'Walk-in', course: 'Data Analytics' }
];

const D_CALLLOGS = [
  { name: 'Bala Murugan', time: 'Today, 11:20 AM', dur: '4m 12s', outcome: 'Interested' },
  { name: 'Nithya R', time: 'Today, 10:05 AM', dur: '1m 40s', outcome: 'Call back later' },
  { name: 'Harini S', time: 'Yesterday, 5:42 PM', dur: '6m 03s', outcome: 'Interested' },
  { name: 'Gokul V', time: 'Yesterday, 3:15 PM', dur: '0m 45s', outcome: 'Not reachable' }
];

const D_FOLLOWUPS = [
  { name: 'Sanjay K', due: 'Today, 4:00 PM', note: 'Share fee structure PDF', priority: 'High' },
  { name: 'Deepika S', due: 'Today, 6:00 PM', note: 'Confirm demo class slot', priority: 'Medium' },
  { name: 'Revathi N', due: 'Tomorrow, 11:00 AM', note: 'Post-demo follow-up call', priority: 'High' },
  { name: 'Ashwin T', due: 'Tomorrow, 2:00 PM', note: 'Send batch schedule', priority: 'Low' }
];

const D_ATTENDANCE_HISTORY = [
  { date: '05 Jul 2026', batch: 'FSD-Morning-12', present: 22, absent: 2, marked: true },
  { date: '05 Jul 2026', batch: 'DA-Evening-05', present: 18, absent: 3, marked: true },
  { date: '04 Jul 2026', batch: 'UX-Morning-03', present: 15, absent: 1, marked: true },
  { date: '04 Jul 2026', batch: 'FSD-Evening-09', present: 0, absent: 0, marked: false }
];

const D_LOW_ATTENDANCE = [
  { name: 'Dinesh Kumar', batch: 'FSD-Evening-09', pct: 58 },
  { name: 'Ranjith S', batch: 'DA-Evening-05', pct: 64 },
  { name: 'Santhosh R', batch: 'DA-Evening-05', pct: 71 }
];

const D_LEAVE_HISTORY = [
  { dates: '02 Jul – 03 Jul 2026', type: 'Casual Leave', days: 2, status: 'Approved' },
  { dates: '18 Jun 2026', type: 'Sick Leave', days: 1, status: 'Approved' },
  { dates: '05 Jun 2026', type: 'Permission', days: 0.5, status: 'Rejected' }
];

const D_LEAVE_REQUESTS = [
  { name: 'Priya Dharshini', dates: '08 Jul – 09 Jul 2026', type: 'Casual Leave', status: 'Pending' },
  { name: 'Arun Kumar S', dates: '10 Jul 2026', type: 'Sick Leave', status: 'Pending' },
  { name: 'Mohammed Irfan', dates: '12 Jul 2026', type: 'Permission', status: 'Pending' }
];

const D_ACTION_LOGS = [
  { who: 'Suresh Babu', action: 'Approved leave for Karthika R', time: 'Today, 9:40 AM' },
  { who: 'Divya Shree', action: 'Rejected leave for Vignesh M', time: 'Yesterday, 4:12 PM' },
  { who: 'Suresh Babu', action: 'Approved leave for Priya Dharshini', time: '2 days ago' }
];

function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}
function statusBadge(status) {
  const map = { Active: 'success', 'On Leave': 'warning', Inactive: 'danger', Paid: 'success', Partial: 'warning', Overdue: 'danger', 'On Hold': 'danger', Approved: 'success', Rejected: 'danger', Pending: 'warning' };
  return `<span class="badge ${map[status] || 'neutral'}">${status}</span>`;
}

/* ============================================================
   Content renderers — one per tab "content" key
   Signature: (label, viewOnly, role) => htmlString
   ============================================================ */
const CONTENT_RENDERERS = {

  /* ---------------- STAFF MODULE ---------------- */
  st_dashboard: (label, viewOnly, role) => `
    ${permNotice(viewOnly)}
    <div class="grid grid-4">
      <div class="stat-card" style="--stat-accent:#262170"><span class="stat-label">My Tasks</span><span class="stat-value">7</span><span class="stat-delta flat">3 due today</span></div>
      <div class="stat-card" style="--stat-accent:#1d4fae"><span class="stat-label">Today Follow-ups</span><span class="stat-value">4</span><span class="stat-delta up">▲ 2 vs yesterday</span></div>
      <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Pending Leaves</span><span class="stat-value">1</span><span class="stat-delta flat">awaiting approval</span></div>
      <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Monthly Target</span><span class="stat-value">68%</span><span class="stat-delta up">▲ on track</span></div>
    </div>
    <div class="grid grid-2" style="margin-top:16px">
      <div class="card">
        <div class="card-head"><h3>Today's Follow-ups</h3><span class="hint">${D_FOLLOWUPS.length} scheduled</span></div>
        <div class="table-wrap"><table><thead><tr><th>Lead</th><th>Due</th><th>Note</th><th>Priority</th></tr></thead>
        <tbody>${D_FOLLOWUPS.slice(0, 3).map(f => `<tr><td class="cell-name">${f.name}</td><td>${f.due}</td><td>${f.note}</td><td><span class="badge ${f.priority === 'High' ? 'danger' : f.priority === 'Medium' ? 'warning' : 'neutral'}">${f.priority}</span></td></tr>`).join('')}</tbody></table></div>
      </div>
      <div class="card card-pad">
        <h3 style="margin-bottom:14px">Monthly Target Progress</h3>
        <p style="font-size:12.5px;color:var(--muted);margin-bottom:6px">Admissions target — 34 / 50</p>
        <div class="progress-track"><div class="progress-fill" style="width:68%"></div></div>
        <p style="font-size:12.5px;color:var(--muted);margin:16px 0 6px">Attendance marking compliance</p>
        <div class="progress-track"><div class="progress-fill" style="width:92%"></div></div>
      </div>
    </div>
  `,

  st_staffmgmt: (label, viewOnly) => `
    ${permNotice(viewOnly)}
    <div class="card">
      <div class="toolbar">
        <div class="search-field">${ICONS.search}<input placeholder="Search staff by name or ID"></div>
        <div class="filter-row">
          <select class="select-chip"><option>All departments</option><option>Admissions</option><option>Academics</option><option>Marketing</option><option>IT</option></select>
          <select class="select-chip"><option>All status</option><option>Active</option><option>On Leave</option><option>Inactive</option></select>
          <button class="btn btn-accent btn-sm" ${disabledAttr(viewOnly)}>+ Add Staff</button>
        </div>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Employee ID</th><th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${D_STAFF.map(s => `
          <tr>
            <td class="cell-id">${s.id}</td>
            <td class="row-flex"><span class="avatar-mini">${initials(s.name)}</span><span class="cell-name">${s.name}</span></td>
            <td>${s.role}</td><td>${s.dept}</td><td>${statusBadge(s.status)}</td>
            <td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Edit</button></td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  `,

  st_profile: (label, viewOnly, role) => `
    <div class="card">
      <div class="profile-card">
        <div class="profile-avatar">${role.initials}</div>
        <div class="profile-meta">
          <h3>${role.label} (Demo User)</h3>
          <p class="p-role">${role.label} · CSC Institute, Anna Nagar Campus</p>
        </div>
      </div>
      <div class="profile-grid">
        <div class="profile-item"><p class="label">Employee ID</p><p class="value">EMP-2077</p></div>
        <div class="profile-item"><p class="label">Department</p><p class="value">Admissions</p></div>
        <div class="profile-item"><p class="label">Reporting Manager</p><p class="value">Sathish Vishnu</p></div>
        <div class="profile-item"><p class="label">Date of Joining</p><p class="value">14 Feb 2023</p></div>
        <div class="profile-item"><p class="label">Contact Number</p><p class="value">+91 98xxxxx210</p></div>
        <div class="profile-item"><p class="label">Email</p><p class="value">demo.user@cscinstitute.in</p></div>
      </div>
    </div>
  `,

  st_leadscapture: (label, viewOnly) => `
    ${permNotice(viewOnly)}
    <div class="card">
      <div class="card-head"><h3>${label}</h3><span class="hint">July 2026 targets</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Executive</th><th>Assigned Target</th><th>Captured So Far</th><th>Progress</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td class="cell-name">Karthika R</td><td>50 leads</td><td>34</td><td><div class="progress-track" style="width:120px"><div class="progress-fill" style="width:68%"></div></div></td><td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Edit</button></td></tr>
          <tr><td class="cell-name">Vignesh M</td><td>60 leads</td><td>29</td><td><div class="progress-track" style="width:120px"><div class="progress-fill warn" style="width:48%"></div></div></td><td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Edit</button></td></tr>
          <tr><td class="cell-name">Suresh Babu</td><td>40 leads</td><td>37</td><td><div class="progress-track" style="width:120px"><div class="progress-fill" style="width:92%"></div></div></td><td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Edit</button></td></tr>
        </tbody>
      </table></div>
      <div class="toolbar"><span></span><button class="btn btn-accent btn-sm" ${disabledAttr(viewOnly)}>+ Assign New Target</button></div>
    </div>
  `,

  /* ---------------- LEADS MODULE ---------------- */
  ld_assign: (label, viewOnly) => `
    ${permNotice(viewOnly)}
    <div class="card">
      <div class="card-head"><h3>Unassigned Leads</h3><span class="hint">${D_LEADS_NEW.length} waiting</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Lead</th><th>Source</th><th>Interested Course</th><th>Assign To</th><th>Action</th></tr></thead>
        <tbody>${D_LEADS_NEW.map(l => `
          <tr><td class="cell-name">${l.name}</td><td>${l.src}</td><td>${l.course}</td>
          <td><select class="select-chip" ${disabledAttr(viewOnly)}><option>Karthika R</option><option>Vignesh M</option><option>Suresh Babu</option></select></td>
          <td><button class="btn btn-primary btn-sm" ${disabledAttr(viewOnly)}>Assign</button></td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  `,

  ld_pipeline: (label) => {
    const cols = [
      { title: 'New', data: D_LEADS_NEW }, { title: 'Contacted', data: D_LEADS_CONTACTED },
      { title: 'Qualified', data: D_LEADS_QUALIFIED }, { title: 'Demo Scheduled', data: D_LEADS_DEMO },
      { title: 'Admitted', data: D_LEADS_ADMITTED }
    ];
    return `<div class="pipeline-board">${cols.map(c => `
      <div class="pipeline-col">
        <div class="pipeline-col-head"><h4>${c.title}</h4><span class="pipeline-count">${c.data.length}</span></div>
        ${c.data.map(l => `<div class="lead-card"><p class="lead-name">${l.name}</p><p class="lead-meta">${l.src}</p><span class="lead-tag">${l.course}</span></div>`).join('') || '<p style="font-size:12px;color:var(--muted);padding:8px 2px">No leads</p>'}
      </div>`).join('')}</div>`;
  },

  ld_calllogs: () => `
    <div class="card">
      <div class="toolbar"><div class="search-field">${ICONS.search}<input placeholder="Search by lead name"></div></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Lead</th><th>Call Time</th><th>Duration</th><th>Outcome</th></tr></thead>
        <tbody>${D_CALLLOGS.map(c => `<tr><td class="cell-name">${c.name}</td><td>${c.time}</td><td>${c.dur}</td><td><span class="badge ${c.outcome === 'Interested' ? 'success' : c.outcome === 'Not reachable' ? 'danger' : 'warning'}">${c.outcome}</span></td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  ld_followups: () => `
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Lead</th><th>Due</th><th>Note</th><th>Priority</th><th>Action</th></tr></thead>
        <tbody>${D_FOLLOWUPS.map(f => `<tr><td class="cell-name">${f.name}</td><td>${f.due}</td><td>${f.note}</td><td><span class="badge ${f.priority === 'High' ? 'danger' : f.priority === 'Medium' ? 'warning' : 'neutral'}">${f.priority}</span></td><td><button class="btn btn-outline btn-sm">Mark Done</button></td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  ld_conversion: () => `
    <div class="grid grid-4">
      <div class="stat-card" style="--stat-accent:#262170"><span class="stat-label">Total Enquiries</span><span class="stat-value">142</span><span class="stat-delta flat">this month</span></div>
      <div class="stat-card" style="--stat-accent:#1d4fae"><span class="stat-label">Demos Conducted</span><span class="stat-value">58</span><span class="stat-delta up">▲ 12%</span></div>
      <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Admitted</span><span class="stat-value">34</span><span class="stat-delta up">▲ 6%</span></div>
      <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Conversion Rate</span><span class="stat-value">23.9%</span><span class="stat-delta down">▼ 1.2%</span></div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="card-head"><h3>Course-wise Conversion</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Course</th><th>Enquiries</th><th>Admitted</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td class="cell-name">Full Stack Development</td><td>52</td><td>16</td><td>30.8%</td></tr>
          <tr><td class="cell-name">Data Analytics</td><td>38</td><td>9</td><td>23.7%</td></tr>
          <tr><td class="cell-name">UI/UX Design</td><td>29</td><td>6</td><td>20.7%</td></tr>
          <tr><td class="cell-name">Digital Marketing</td><td>23</td><td>3</td><td>13.0%</td></tr>
        </tbody>
      </table></div>
    </div>
  `,

  /* ---------------- STUDENT / ADMISSION MODULE ---------------- */
  sd_register: (label, viewOnly) => `
    ${permNotice(viewOnly)}
    <div class="card card-pad">
      <div class="form-grid">
        <div class="field"><label>Full Name <span class="req">*</span></label><input placeholder="e.g. Abinaya K" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>Contact Number <span class="req">*</span></label><input placeholder="+91" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>Email Address</label><input placeholder="name@example.com" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>Date of Birth</label><input type="date" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>Interested Course <span class="req">*</span></label>
          <select ${disabledAttr(viewOnly)}><option>Full Stack Development</option><option>Data Analytics</option><option>UI/UX Design</option><option>Digital Marketing</option></select>
        </div>
        <div class="field"><label>Preferred Batch Timing</label><select ${disabledAttr(viewOnly)}><option>Morning</option><option>Evening</option><option>Weekend</option></select></div>
        <div class="field"><label>Source</label><select ${disabledAttr(viewOnly)}><option>Walk-in</option><option>Referral</option><option>Instagram Ad</option><option>Google Ads</option></select></div>
        <div class="field"><label>Referred By</label><input placeholder="Optional" ${disabledAttr(viewOnly)}></div>
        <div class="field span-2"><label>Address</label><textarea placeholder="Enter full address" ${disabledAttr(viewOnly)}></textarea></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-outline" ${disabledAttr(viewOnly)}>Save as Draft</button>
        <button class="btn btn-primary" ${disabledAttr(viewOnly)}>Register Student</button>
      </div>
    </div>
  `,

  sd_fee: (label, viewOnly) => `
    <div class="grid grid-3">
      <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Collected This Month</span><span class="stat-value">₹4.2L</span></div>
      <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Pending Dues</span><span class="stat-value">₹86K</span></div>
      <div class="stat-card" style="--stat-accent:#b8253f"><span class="stat-label">Overdue Accounts</span><span class="stat-value">4</span></div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="toolbar"><div class="search-field">${ICONS.search}<input placeholder="Search by student name or ID"></div><button class="btn btn-accent btn-sm" ${disabledAttr(viewOnly)}>+ Record Payment</button></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Student</th><th>Course</th><th>Total Fee</th><th>Paid</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td class="cell-name">Abinaya K</td><td>Full Stack Dev.</td><td>₹45,000</td><td>₹45,000</td><td>${statusBadge('Paid')}</td><td><button class="btn btn-outline btn-sm">View</button></td></tr>
          <tr><td class="cell-name">Ranjith S</td><td>Data Analytics</td><td>₹38,000</td><td>₹20,000</td><td>${statusBadge('Partial')}</td><td><button class="btn btn-outline btn-sm">View</button></td></tr>
          <tr><td class="cell-name">Dinesh Kumar</td><td>Full Stack Dev.</td><td>₹45,000</td><td>₹15,000</td><td>${statusBadge('Overdue')}</td><td><button class="btn btn-outline btn-sm">View</button></td></tr>
        </tbody>
      </table></div>
    </div>
  `,

  sd_list: (label, viewOnly) => `
    <div class="card">
      <div class="toolbar">
        <div class="search-field">${ICONS.search}<input placeholder="Search students"></div>
        <div class="filter-row">
          <select class="select-chip"><option>All courses</option><option>Full Stack Dev.</option><option>Data Analytics</option><option>UI/UX Design</option></select>
          <button class="btn btn-accent btn-sm" ${disabledAttr(viewOnly)}>+ Add Student</button>
        </div>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Student ID</th><th>Name</th><th>Course</th><th>Batch</th><th>Fee Status</th><th>Status</th></tr></thead>
        <tbody>${D_STUDENTS.map(s => `<tr><td class="cell-id">${s.id}</td><td class="row-flex"><span class="avatar-mini">${initials(s.name)}</span><span class="cell-name">${s.name}</span></td><td>${s.course}</td><td>${s.batch}</td><td>${statusBadge(s.fee)}</td><td>${statusBadge(s.status)}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  sd_search: () => `
    <div class="card card-pad">
      <div class="form-grid">
        <div class="field"><label>Student Name / ID</label><input placeholder="Search by name or ID"></div>
        <div class="field"><label>Course</label><select><option>Any</option><option>Full Stack Dev.</option><option>Data Analytics</option><option>UI/UX Design</option></select></div>
        <div class="field"><label>Batch</label><select><option>Any</option><option>FSD-Morning-12</option><option>DA-Evening-05</option><option>UX-Morning-03</option></select></div>
        <div class="field"><label>Fee Status</label><select><option>Any</option><option>Paid</option><option>Partial</option><option>Overdue</option></select></div>
      </div>
      <div class="form-actions"><button class="btn btn-outline">Clear</button><button class="btn btn-primary">Apply Filters</button></div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="table-wrap"><table>
        <thead><tr><th>Student ID</th><th>Name</th><th>Course</th><th>Batch</th><th>Status</th></tr></thead>
        <tbody>${D_STUDENTS.slice(0, 4).map(s => `<tr><td class="cell-id">${s.id}</td><td class="cell-name">${s.name}</td><td>${s.course}</td><td>${s.batch}</td><td>${statusBadge(s.status)}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  /* ---------------- ATTENDANCE MODULE ---------------- */
  at_dashboard: () => `
    <div class="grid grid-4">
      <div class="stat-card" style="--stat-accent:#262170"><span class="stat-label">Total Students</span><span class="stat-value">186</span></div>
      <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Present Today</span><span class="stat-value">162</span><span class="stat-delta up">87%</span></div>
      <div class="stat-card" style="--stat-accent:#b8253f"><span class="stat-label">Absent Today</span><span class="stat-value">18</span></div>
      <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Late Today</span><span class="stat-value">6</span></div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="card-head"><h3>Batch-wise Snapshot</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Batch</th><th>Total</th><th>Present</th><th>Absent</th><th>Marked</th></tr></thead>
        <tbody>${D_ATTENDANCE_HISTORY.map(a => `<tr><td class="cell-name">${a.batch}</td><td>${a.present + a.absent}</td><td>${a.present}</td><td>${a.absent}</td><td>${a.marked ? statusBadge('Active') : statusBadge('Pending')}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  at_batches: (label, viewOnly) => `
    <div class="grid grid-4">
      <div class="stat-card" style="--stat-accent:#262170"><span class="stat-label">Total Batches</span><span class="stat-value">12</span></div>
      <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Attendance Marked</span><span class="stat-value">9</span></div>
      <div class="stat-card" style="--stat-accent:#b8253f"><span class="stat-label">Not Marked</span><span class="stat-value">3</span></div>
      <div class="stat-card" style="--stat-accent:#1d4fae"><span class="stat-label">Total Students</span><span class="stat-value">186</span></div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="table-wrap"><table>
        <thead><tr><th>Batch</th><th>Course</th><th>Students</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td class="cell-name">FSD-Morning-12</td><td>Full Stack Dev.</td><td>24</td><td>${statusBadge('Active')}</td><td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Mark Attendance</button></td></tr>
          <tr><td class="cell-name">DA-Evening-05</td><td>Data Analytics</td><td>21</td><td>${statusBadge('Active')}</td><td><button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Mark Attendance</button></td></tr>
          <tr><td class="cell-name">FSD-Evening-09</td><td>Full Stack Dev.</td><td>19</td><td>${statusBadge('Pending')}</td><td><button class="btn btn-primary btn-sm" ${disabledAttr(viewOnly)}>Mark Attendance</button></td></tr>
        </tbody>
      </table></div>
    </div>
  `,

  at_history: () => `
    <div class="card">
      <div class="toolbar"><div class="filter-row">
        <select class="select-chip"><option>All batches</option><option>FSD-Morning-12</option><option>DA-Evening-05</option></select>
        <input class="select-chip" type="date">
      </div></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Date</th><th>Batch</th><th>Present</th><th>Absent</th><th>Status</th></tr></thead>
        <tbody>${D_ATTENDANCE_HISTORY.map(a => `<tr><td>${a.date}</td><td class="cell-name">${a.batch}</td><td>${a.present}</td><td>${a.absent}</td><td>${a.marked ? statusBadge('Active') : statusBadge('Pending')}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  at_absent: () => `
    <div class="card">
      <div class="card-head"><h3>Students Absent Today</h3><span class="hint">18 students</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Student</th><th>Batch</th><th>Consecutive Absences</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td class="cell-name">Dinesh Kumar</td><td>FSD-Evening-09</td><td><span class="badge danger">3 days</span></td><td><button class="btn btn-outline btn-sm">Notify Parent</button></td></tr>
          <tr><td class="cell-name">Ranjith S</td><td>DA-Evening-05</td><td><span class="badge warning">1 day</span></td><td><button class="btn btn-outline btn-sm">Notify Parent</button></td></tr>
          <tr><td class="cell-name">Santhosh R</td><td>DA-Evening-05</td><td><span class="badge warning">2 days</span></td><td><button class="btn btn-outline btn-sm">Notify Parent</button></td></tr>
        </tbody>
      </table></div>
    </div>
  `,

  at_lowattendance: () => `
    <div class="card">
      <div class="card-head"><h3>Below Minimum Threshold (75%)</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Student</th><th>Batch</th><th>Attendance %</th><th>Status</th></tr></thead>
        <tbody>${D_LOW_ATTENDANCE.map(s => `<tr><td class="cell-name">${s.name}</td><td>${s.batch}</td><td style="width:160px"><div class="progress-track"><div class="progress-fill ${s.pct < 65 ? 'danger' : 'warn'}" style="width:${s.pct}%"></div></div></td><td>${s.pct}%</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  at_reports: () => `
    <div class="card card-pad">
      <div class="toolbar" style="padding:0 0 16px"><h3>Monthly Attendance Trend</h3><button class="btn btn-outline btn-sm">Export CSV</button></div>
      <div class="grid grid-3">
        <div class="stat-card" style="--stat-accent:#14804a"><span class="stat-label">Avg. Attendance</span><span class="stat-value">86.4%</span></div>
        <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Chronic Absentees</span><span class="stat-value">3</span></div>
        <div class="stat-card" style="--stat-accent:#1d4fae"><span class="stat-label">Batches Tracked</span><span class="stat-value">12</span></div>
      </div>
    </div>
  `,

  /* ---------------- LEAVE MANAGEMENT MODULE ---------------- */
  lv_balance: () => `
    <div class="grid grid-3">
      <div class="stat-card" style="--stat-accent:#262170"><span class="stat-label">Casual Leave</span><span class="stat-value">8 / 12</span></div>
      <div class="stat-card" style="--stat-accent:#1d4fae"><span class="stat-label">Sick Leave</span><span class="stat-value">5 / 6</span></div>
      <div class="stat-card" style="--stat-accent:#a15c00"><span class="stat-label">Permission Hours</span><span class="stat-value">4 / 8</span></div>
    </div>
  `,

  lv_apply: (label, viewOnly) => `
    <div class="card card-pad">
      <div class="form-grid">
        <div class="field"><label>Leave Type <span class="req">*</span></label><select ${disabledAttr(viewOnly)}><option>Casual Leave</option><option>Sick Leave</option><option>Permission</option></select></div>
        <div class="field"><label>From Date <span class="req">*</span></label><input type="date" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>To Date <span class="req">*</span></label><input type="date" ${disabledAttr(viewOnly)}></div>
        <div class="field"><label>Half Day?</label><select ${disabledAttr(viewOnly)}><option>No</option><option>Yes</option></select></div>
        <div class="field span-2"><label>Reason <span class="req">*</span></label><textarea placeholder="Briefly describe the reason for leave" ${disabledAttr(viewOnly)}></textarea></div>
      </div>
      <div class="form-actions"><button class="btn btn-outline" ${disabledAttr(viewOnly)}>Cancel</button><button class="btn btn-primary" ${disabledAttr(viewOnly)}>Submit Request</button></div>
    </div>
  `,

  lv_review: (label, viewOnly) => `
    ${permNotice(viewOnly)}
    <div class="card">
      <div class="card-head"><h3>${label}</h3><span class="hint">${D_LEAVE_REQUESTS.length} pending</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Staff</th><th>Dates</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${D_LEAVE_REQUESTS.map(r => `<tr><td class="cell-name">${r.name}</td><td>${r.dates}</td><td>${r.type}</td><td>${statusBadge(r.status)}</td>
        <td><button class="btn btn-primary btn-sm" ${disabledAttr(viewOnly)}>Approve</button> <button class="btn btn-outline btn-sm" ${disabledAttr(viewOnly)}>Reject</button></td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  lv_history: () => `
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Dates</th><th>Type</th><th>Days</th><th>Status</th></tr></thead>
        <tbody>${D_LEAVE_HISTORY.map(h => `<tr><td>${h.dates}</td><td>${h.type}</td><td>${h.days}</td><td>${statusBadge(h.status)}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `,

  lv_actionlogs: () => `
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Actor</th><th>Action</th><th>Time</th></tr></thead>
        <tbody>${D_ACTION_LOGS.map(a => `<tr><td class="cell-name">${a.who}</td><td>${a.action}</td><td>${a.time}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  `
};

/* ============================================================
   Chrome: role selector, sidebar toggle, mobile behaviour
   ============================================================ */
function populateRoleSelect() {
  const sel = document.getElementById('roleSelect');
  sel.innerHTML = Object.keys(ROLES).map(key => `<option value="${key}">${ROLES[key].label}</option>`).join('');
  sel.value = state.role;
  sel.addEventListener('change', () => {
    state.role = sel.value;
    const role = getRole();
    state.module = role.sidebar[0];
    const tabs = tabsForModule(role, state.module);
    state.tabId = tabs && tabs.length ? tabs[0].id : null;
    renderAll();
  });
}

function isMobile() { return window.innerWidth <= 960; }

function closeMobileSidebar() {
  if (!isMobile()) return;
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebarScrim').classList.remove('show');
}

function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const mainArea = document.querySelector('.main-area');
  const scrim = document.getElementById('sidebarScrim');
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    if (isMobile()) {
      const open = sidebar.classList.toggle('mobile-open');
      scrim.classList.toggle('show', open);
    } else {
      sidebar.classList.toggle('collapsed');
      mainArea.classList.toggle('collapsed');
    }
  });
  scrim.addEventListener('click', closeMobileSidebar);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  populateRoleSelect();
  initSidebarToggle();
  state.tabId = tabsForModule(getRole(), state.module)[0].id;
  renderAll();
});
